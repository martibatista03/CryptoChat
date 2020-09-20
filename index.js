// ---------------------------------- CONFIGURACIÓ SERVIDOR --------------------------------- //

const path = require('path');
const express = require('express');
const getRandomValues = require('get-random-values');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// arxius estàtics
app.use(express.static(path.join(__dirname, 'public')));

// inicialitzar el servidor
const server = app.listen(app.get('port'));

// configuració websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

// ------------------------------ FINAL CONFIGURACIÓ SERVIDOR ---------------------------- //


// EXPONENCIACIÓ MODULAR BINÀRIA (b = base, e = exponent, m = mòdul)

function exp_mod_bin(b, e, m) { 
    // Conversió de l'exponent a forma binària
    var e_bin = e.toString(2);

    // Paràmetre inicialitzador
    var x = 1n;
    
    // Codi executat tantes vegades com xifres té e_bin
    for (let i = 0; i < e_bin.length; i++) {
        // Cas on la xifra és 1
        if (e_bin.charAt(i) == 1) {
            x = ((x ** 2n) * b) % m;

        // Cas on la xifra és 0
        } else {
            x = (x ** 2n) % m;
        }
    } 
    return x;
}


// MÀXIM COMÚ DIVISOR

function mcd(a, b) { 
    if (a == 0) { return b };
    return mcd(b % a, a);
}


// INVERS MULTIPLICATIU MODULAR

function invers_multiplicatiu(a, m) { // a = nombre del que es calcula l'invers  m = mòdul
    // llisten on s'emmagatzemaran quocients/residus (els paràmetres ja posats són els inicials)
    var quocient = [a];
    var residu = [m % a];

    // Paràmetres per a executar els càlculs
    var resultats_invers = [];
    var i = 0;

    // Bucle que s'executa fins que trobem el MCD = 1 
    while (residu[residu.length - 1] != 1n) {
        // Cadascun dels valors es corre cap a l'esquerra
        var nou_dividend = quocient[quocient.length - 1];
        var nou_quocient = residu[residu.length - 1];
        var nou_residu = nou_dividend % nou_quocient;

        // Càlculs de la primera iteració
        if (i == 0) { 
            var calcul_invers = (m / a) * (a / (m % a)) + 1n 

        // Càlculs de la segona iteració
        } else if (i == 1) {
            var calcul_invers = resultats_invers[resultats_invers.length - 1] * ((m % a) / (a % (m % a))) + (m / a) 
        
        // Càlculs de la resta d'iteracions
        } else if (i > 1) { 
            var calcul_invers = (resultats_invers[resultats_invers.length - 1] * (quocient[quocient.length - 1] / residu[residu.length - 1])) + resultats_invers[resultats_invers.length - 2];
            // Eliminar els paràmetres de la llista que ja no són necessaris
            resultats_invers.shift();
        }

        // Eliminar els paràmetres de la llista que ja no són necessaris
        quocient.pop();
        residu.pop();

        // Assignar els nous valors a cada llista, per a la propera iteració
        quocient.push(nou_quocient);
        residu.push(nou_residu);

        // Determinar el nou candidat a resultat
        resultats_invers.push(calcul_invers);

        // Actualització del paràmetre que ens permet discernir en quina iteració ens trobem
        i = i + 1;
    }

    // Un cop obtingut el resultat, podem trobar-nos amb una excepció
    if ((resultats_invers[resultats_invers.length - 1] * a) % m == m - 1n) {
        resultats_invers[resultats_invers.length - 1] = -resultats_invers[resultats_invers.length - 1] + m
    }

    // Assignació del resultat
    return resultats_invers[resultats_invers.length - 1];
}


// GENERADOR DEL PRIMER p = 2q + 1

function generador_p() {

    // En primer lloc, el que farem serà generar un valor primer q aleatori de 1024 bits 
    function generador_q() {
        // Llista de fragments que componen el candidat
        var components_primer = [];

        // Generació dels fragments
        for (let i = 0; i < 32; i++) {
            var fragment_primer = getRandomValues(new Uint8Array(1));
            components_primer.push(fragment_primer);
        }

        // conversió de fragments a un sol valor
        var candidat_q = BigInt(components_primer.reduce((a,b) => a + b, 0));

        // Verificació a través del test de Fermat (50 proves)
        for (let i = 0; i < 50; i++) {
            // Valor per a testejar el possible primer, no cal de sigui un safe random 
            var tester = BigInt(Math.floor(Math.random() * (2 ** 53 - 2)) + 2); 

            // Prova de primialitat en la corresponent iteració
            if((mcd(candidat_q, tester) != 1) || (exp_mod_bin(tester, candidat_q - 1n, candidat_q) != 1)) { 
                return generador_q();
            }

            // En cas d'haver complert satisfactòriament totes les iteracions, molt possiblement es tracti d'un nombre primer
            if(i == 49) {
                return candidat_q;
            }
        }
    }

    // A partir del primer generat crear el candidat a p = 2q + 1
    var q = generador_q();
    var candidat_p = 2n * q + 1n;
    
    // Test de primialitat a aquest nou p
    for (let i = 0; i < 50; i++) {
        // Valor per a testejar el possible primer, no cal de sigui un safe random 
        var tester = BigInt(Math.floor(Math.random() * (2 ** 53 - 2)) + 2); 

        // Prova de primialitat en la corresponent iteració
        if((mcd(candidat_p, tester) != 1) || (exp_mod_bin(tester, candidat_p - 1n, candidat_p) != 1)) {
            return generador_p();
        }

        // En cas d'haver complert satisfactòriament totes les iteracions, molt possiblement es tracti d'un nombre primer
        if(i == 49) {
            return candidat_p;
        }
    }
}


// GENERADOR CÍCLIC DE C_q

function generador_Cq(p, q) {
    // Candidat a crear el generador g d'ordre q
    var creador_generador = BigInt(Math.floor(Math.random() * (2 ** 53 - 2)) + 2);

    // Creació del candidat a partir del valor prèviament descrit
    var candidat_generador = exp_mod_bin(creador_generador, 2n, p);

    // Si el candidat a generador != 1, sabrem que serà generador d'ordre q
    if(candidat_generador != 1n) {
        return candidat_generador;

    // En cas contrari, tornarem a començar
    } else {
        generador_Cq(p, q);
    }
}


// VARIABLE b

function generacio_b(q) {
    // nombre aleatori que determinarà la longitud de b
    var quantitat_fragments = parseInt(String(getRandomValues(new Uint8Array(1))).substring(0, 2)); 

    // Llista de fragments que componen el candidat
    var components_b = [];

    // Generació de fragments
    for (let i = 0; i < quantitat_fragments; i++) { 
        var component_b = getRandomValues(new Uint8Array(1));
        components_b.push(component_b);
    };

    // Conversió de fragments a un sol valor
    var candidat_b = BigInt(components_b.reduce((a,b) => a + b, 0));

    // Validació del candidat
    if(candidat_b < q && candidat_b != 0n) {
        return candidat_b;
    } else {
        return generacio_b(q);
    }
}


// GENERACIÓ p_B i q_B

function generador_pq_B() {
    // Llista de fragmenst que componen el candidat
    var components_primers = [];

    // Generació de fragments
    for (let i = 0; i < 64; i++) { 
        var fragment_primer = getRandomValues(new Uint8Array(1));
        components_primers.push(fragment_primer);
    }

    // Conversió de fragments a un sol valor
    var possible_primer = BigInt(components_primers.reduce((a,b) => a + b, 0));
    
    // Test de primialitat
    for (let i = 0; i < 50; i++) {
        // Valor per a testejar el possible primer, no cal de sigui un safe random 
        var tester = BigInt(Math.floor(Math.random() * (2 ** 53 - 2)) + 2); // no cal que sigui un safe random

        // Prova de primialitat en la corresponent iteració
        if ((mcd(possible_primer, tester) != 1) || (exp_mod_bin(tester, possible_primer - 1n, possible_primer) != 1)) {
            return generador_pq_B();
        }

        // En cas d'haver complert satisfactòriament totes les iteracions, molt possiblement es tracti d'un nombre primer
        if (i == 49) {
            return possible_primer;
        }
    }
}


// DESENCRIPTACIÓ

function desencripta(m, d, n) {
    // Desxifratge del missatge en sí
    var missatge_desxifrat = String(exp_mod_bin(m, d, n));

    // Per si el primer dels nombres del missatge desxifrat és de només dues xifres.Se li afegeix el 0 corresponent
    if(parseInt(missatge_desxifrat.length) % 3 != 0) {
        missatge_desxifrat = "0" + missatge_desxifrat;
    }

    // Separació del missatge desxifrat en blocs de 3
    var missatge_desxifrat_dividit = missatge_desxifrat.match(/.{1,3}/g);

    // Llista dels caràcters que componen el missatge en sí
    var caracters_convertits = [];

    // Conversió (de ascii a caràcters) i assignació a la llista del missatge
    for(let i = 0; i < missatge_desxifrat_dividit.length; i++) {
        caracters_convertits.push(String.fromCharCode(parseInt(missatge_desxifrat_dividit[i])));
    }

    // Retorn del missatge + conversió a string
    return caracters_convertits.join('');
}


// GENERACIÓ DE PARÀMETRES INICIALS (p, q, g)

var p = generador_p();
var q = (p - 1n) / 2n;
var g = generador_Cq(p, q);


// WEBSOCKETS

io.on('connection', (socket) => {
    // el server envia els valors inicials al user
    socket.emit('claus-server', { 
        p: String(p),
        q: String(q),
        g: String(g)
    });

    // Generació del valor de Xifratge-Desxifratge en sí (n_B)
    var p_B = generador_pq_B();
    var q_B = generador_pq_B();

    var n_B = p_B * q_B;
    var phi_n_B = (p_B - 1n) * (q_B - 1n);

    // Rebuda de h_A del User
    socket.on('intercanvi-h_A_server', (h_A_server) => {
        // Valors per a càlcular e => Vlors Diffie-Hellman del server
        var b_server = generacio_b(q);
        var h_B_server = exp_mod_bin(g, b_server, p);

        // Càlcul e_server
        var e_server = exp_mod_bin(BigInt(h_A_server), b_server, p);

        // Validació de e_server
        if(mcd(phi_n_B, e_server) == 1) {
            // Càlcul de l'invers d_B_server de e_server
            var d_B_server = invers_multiplicatiu(e_server, phi_n_B);
            
            // Enviament de les claus per a poder xifrar la sala
            socket.emit('claus-xifratge-server', {
                h_B_server: String(h_B_server),
                n_B: String(n_B)
            });

            // Rebuda solicitud entrada a sala
            socket.on('join-room', (sala_encriptada) => {
                // Obtenció/desencriptació de la sala
                var sala_desencriptada = desencripta(BigInt(sala_encriptada), d_B_server, n_B);

                // Entrada a sala
                socket.join(sala_desencriptada);

                // Correcta gestió de d'entrada a sales
                function usuarisEnSala() {
                    try {
                        // En cas de ser el primer user en entrar
                        if(io.sockets.adapter.rooms[sala_desencriptada].length < 2) {
                            setTimeout(usuarisEnSala, 1); // chequeja cada 0.001 segons i torna a provar

                        // En cas de ser el segon user en entrar
                        } else if(io.sockets.adapter.rooms[sala_desencriptada].length == 2) {
                            // socket.broadcast.to(sala_desencriptada).emit('permis-entrada-sala');
                            socket.emit('permis-entrada-sala');
      
                        // En cas de ser el tercer user en entrar
                        } else if (io.sockets.adapter.rooms[sala_desencriptada].length > 2) {
                            socket.emit('3-usuaris');
                        }

                    } catch(err) {return}
                }

                usuarisEnSala();

                // Intercanvi claus users
                socket.on('parametres-user', (h_A_user) => {
                    socket.broadcast.to(sala_desencriptada).emit('parametres-user', h_A_user);
                });

                // Validació de la clau comuna per part dels users
                socket.on('validacio-e_user', (data) => {
                    socket.broadcast.to(sala_desencriptada).emit('validacio-e_user', data);
                });

                // Clau comuna users no vàlida
                socket.on('parametre-no-valid', () => {
                    socket.broadcast.to(sala_desencriptada).emit('permis-entrada-sala');
                });

                // Enviament mutuu entre users de les claus de xifratge de missatges en sí
                socket.on('modul-xifratge', (n_A_user) => {
                    socket.broadcast.to(sala_desencriptada).emit('modul-xifratge', n_A_user);
                });

                // Missatges users
                socket.on('chat-missatge', (data) => {
                    socket.broadcast.to(sala_desencriptada).emit('chat-missatge', {
                        missatge: data.missatge,
                        usuari: data.usuari
                    });
                });

                // Usuari està escribint...
                socket.on('usuari-escribint', (usuari) => {
                    socket.broadcast.to(sala_desencriptada).emit('usuari-escribint', usuari);
                });

                // Sortida d'un dels users
                socket.once('sortida-sala', () => {
                    // Optimitzar velocitat per al server
                    socket.disconnect();

                    // Per a que l'entrada d'un 3r user no rebenti la sala
                    function gestioSortida() {
                        try {
                            if(io.sockets.adapter.rooms[sala_desencriptada].length == 1) {
                                socket.broadcast.to(sala_desencriptada).emit('reset-sala');

                            } else if(io.sockets.adapter.rooms[sala_desencriptada].length == 2) {
                                setTimeout(gestioSortida, 100);
                            }

                        } catch(err) {return}
                    }

                    gestioSortida();
                });
            });

        // En cas de que la e_server no sigui vàlida => tornem a començar
        } else {
            socket.emit('claus-server', { 
                p: String(p),
                q: String(q),
                g: String(g)
            });
        }
    });
});
    


















/*

socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
io.emit('message', "this is a test"); //sending to all clients, include sender

io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender

io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.

*/ 
