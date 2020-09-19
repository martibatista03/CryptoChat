
const socket = io()

//elements trets del nostre html
let message = document.getElementById('message');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let carregant = document.getElementById('carregant');
let limit_caracters = document.getElementById('limit-caracters');

var username = localStorage.getItem("nomUsuari");
var sala = localStorage.getItem("sala");

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

function mcd(p, a) { // funció que calcula el mcd de dos valors que se li diguin (p = primer a testejar, a = valor per a la prova de Fermat)
    if (p == 0) { return a };
    return mcd(a % p, p);
}


// FER UN DELAY (per a asynchronous code)

function delay(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
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


// GENERACIÓ a

function generacio_a(q) {
    // nombre aleatori que determinarà la longitud de a
    var quantitat_fragments = parseInt(String(window.crypto.getRandomValues(new Uint8Array(1))).substring(0, 2)); 

    // Llista de fragments que componen el candidat
    var components_a = []; 

    // Generació de fragments
    for (let i = 0; i < quantitat_fragments; i++) { 
        var component_a = window.crypto.getRandomValues(new Uint32Array(1));
        components_a.push(component_a);
    };

    // Conversió de fragments a un sol valor
    var candidat_a = BigInt(components_a.reduce((a,b) => a + b, 0));

    // Validació del candidat
    if(candidat_a < q && candidat_a != 0n) {
        return candidat_a;
    } else {
        return generacio_a(q);
    }
}


// GENERACIÓ p_A i q_A

function generacio_pq_A() {
    // Llista de fragmenst que componen el candidat
    var components_primers = []; 

    // Generació de fragments
    for(let i = 0; i < 16; i++) {
        var fragment_primer = window.crypto.getRandomValues(new Uint32Array(1)); 
        components_primers.push(fragment_primer);
    }

    // Conversió de fragments a un sol valor
    var possible_primer = BigInt(components_primers.reduce((a,b) => a + b, 0)); 

    // Test de primialitat
    for(let i = 0; i < 50; i++) {
        // Valor per a testejar el possible primer, no cal de sigui un safe random 
        var tester = BigInt(Math.floor(Math.random() * (2 ** 53 - 2)) + 2); // no cal que sigui un safe random

        // Prova de primialitat en la corresponent iteració
        if((mcd(possible_primer, tester) != 1) || (exp_mod_bin(tester, possible_primer - 1n, possible_primer) != 1)) { // en cas de que qualssevold e les dues condicions falli ja podem dir que "possible_primer" no és primer
            return generacio_pq_A();
        }
        // En cas d'haver complert satisfactòriament totes les iteracions, molt possiblement es tracti d'un nombre primer
        if(i == 49) {
            return possible_primer;
        }
    }
}


// CONVERSOR MISSATGES A NÚMEROS

function conversor_ascii(m) { 
    // Llista que emmagatzema els valors ascii de les lletres que componen el missatge
    var llista_caracters = [];

    // Conversió a ascii de cada caràcter
    for (let i = 0; i < m.length; i++) {
        // Conversió a ascii del caràcter corresponent a cada iteració
        var caracter = String(m.charAt(i).charCodeAt(0));

        // pels nombres inferiors a 3 xifres se'ls afegeix un 0 per tal de que tots ells siguin de tres (essencial per al desxifratge)
        if (caracter.length < 3) {
            caracter = "0" + caracter;
        }

        // S'afegeix a la llista el caràcter ja convertit
        llista_caracters.push(caracter);
    }

    // Conversió a un sol BigInt dels caràcters que componen la llista
    return BigInt(llista_caracters.join(""));

    // NOTA: al primer valor se li treurà el 0 en cas de que sigui de 2 xifres (degut a BigInt), així que en el desxifratge haurem de començar comptant des del final
}                                             


// ENCRIPTACIÓ DE MISSATGES

function encripta(m, e, n) {
    // primerament  convertim el missatge a números
    var m_numeros = conversor_ascii(m);

    // Encriptació del missatge en sí
    return exp_mod_bin(m_numeros, e, n);
}


// DESENCRIPTACIÓ DE MISSATGES

function desencripta(m, d, n) {
    // Desxifratge del missatge en sí
    var missatge_desxifrat = String(exp_mod_bin(m, d, n));
    
    // Per si el primer dels nombres del missatge desxifrat és de només dues xifres.Se li afegeix el 0 corresponent
    if(parseInt(missatge_desxifrat.length) % 3 != 0) { // per si el primer dels nombres del missatge desxifrat és de només dues xifres.Se li afegeix el 0 corresponent
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
    return caracters_convertits.join(''); // es retornen tots els caracters de l'array però junts i en un sol string
}


// INICI DE LA CONNEXIÓ

socket.on('claus-server', (claus_publiques) => {
    // Claus públiques
    var p = BigInt(claus_publiques.p);
    var q = BigInt(claus_publiques.q);
    var g = BigInt(claus_publiques.g);

    // Valors Intercanvi h_A amb server
    var a = generacio_a(q);
    var h_A_server = exp_mod_bin(g, a, p);

    // Intercanvi h_A amb server
    socket.emit('intercanvi-h_A_server', String(h_A_server));

    // Globalització de paràmetres
    parametres_globals = [p, q, g, a];
    return parametres_globals;
});

socket.on('claus-xifratge-server', (data) => {
    // Claus Públiques
    var p = parametres_globals[0];
    var q = parametres_globals[1];
    var g = parametres_globals[2];

    // Paràmetre Privat
    var a = parametres_globals[3];

    // Paràmetres rebuts
    var h_B_server = BigInt(data.h_B_server);
    var n_B_server = BigInt(data.n_B);

    // Càlcul e_server
    var e_server = exp_mod_bin(h_B_server, a, p);

    // Encriptació de la sala
    var sala_encriptada = encripta(sala, e_server, n_B_server);

    // Solicitud entrada a sala
    socket.emit('join-room', String(sala_encriptada));

    // Globalització de paràmetres
    parametres_globals = [p, q, g];
    return parametres_globals;
});

// Generació del valor de Xifratge-Desxifratge en sí (n_A_user)
var p_A_user = generacio_pq_A();
var q_A_user = generacio_pq_A();

var n_A_user = p_A_user * q_A_user;
var phi_n_A_user = (p_A_user - 1n) * (q_A_user - 1n);

// Rebuda permís intercanvi de Claus usuaris
socket.on('permis-entrada-sala', function() {
    // Claus Públiques
    var p = parametres_globals[0];
    var q = parametres_globals[1];
    var g = parametres_globals[2];

    // Càlcul de h_A_user
    a_user = generacio_a(q);
    var h_A_user = exp_mod_bin(g, a_user, p);

    // Enviament h_A_user
    socket.emit('parametres-user', String(h_A_user));

    // Globalització de paràmetres
    return a_user;
});

socket.on('parametres-user', (h_B_user) => {
    // Claus Públiques
    var p = parametres_globals[0];
    var q = parametres_globals[1];
    var g = parametres_globals[2];

    // Paràmetre altre user
    var h_B_user = BigInt(h_B_user);

    // Càlcul clau comuna users
    e_user = exp_mod_bin(h_B_user, a_user, p);

    // Validació clau comuna
    if(mcd(phi_n_A_user, e_user) == 1) {
        socket.emit('validacio-e_user', 'true');

    } else {
        socket.emit('validacio-e_user', 'false');
    }

    // Globalització de paràmetres
    return e_user;
});

socket.on('validacio-e_user', (data) => {
    // Acceptació clau comuna users
    if(data == 'true' && mcd(e_user, phi_n_A_user) == 1) {
        // Enviament mòdul xifratge user
        socket.emit('modul-xifratge', String(n_A_user));

    // Clau comuna no vàlida
    } else {
        socket.emit('parametre-no-valid');
    }
});

socket.on('modul-xifratge', (n_B_user) => {
    // invers multiplicatiu clau comuna users
    var d_A_user = invers_multiplicatiu(e_user, phi_n_A_user);

    // Entrada al xat
    carregant.remove();

    // Benvinguda
    output.innerHTML += `<div class="benvinguda"> <p> Benvingut a la sala ${sala} </p> </div>`

    // Mòdul de xifratge 
    var n_B_user = BigInt(n_B_user);

    // Enviar missatges (botó)
    btn.addEventListener('click', function() {
        if(message.value.length > 0) {
            // Encriptació de valors
            var missatge_encriptat = encripta(message.value, e_user, n_B_user);
            var usuari_encriptat = encripta(username, e_user, n_B_user);

            // Enviament de valors encriptats
            socket.emit('chat-missatge', {
                missatge: String(missatge_encriptat),
                usuari: String(usuari_encriptat)
            });

            // Mostrar a l'emissor els missatges enviats
            output.innerHTML += `<div class="missatges-enviats"> 
                <strong> ${username} </strong>: ${message.value}
            </div>`;

            message.value = ""; // per a que es buidi el input del missatge
            limit_caracters.innerHTML = "&nbsp"; // treure l'avís

            // Autoscroll
            actions.scrollIntoView();
        }
    });

    // Enviar missatges (enter)
    document.addEventListener('keyup', function(event) {
        // Advertència per límit de caràcters
        if(message.value.length > 102 && (limit_caracters.innerHTML).indexOf("Límit de caràcters excedit (màxim 103)") == -1) {
            limit_caracters.innerHTML = `<div id="advertencia"> <div class="fas fa-exclamation-triangle"> </div> &nbsp Límit de caràcters excedit (màxim 103) </div>`;

        } else if(message.value.length < 103) {
            limit_caracters.innerHTML = "&nbsp";
        }

        if(event.key == 'Enter' && message.value.length > 0) {
            // Encriptació de valors
            var missatge_encriptat = encripta(message.value, e_user, n_B_user);
            var usuari_encriptat = encripta(username, e_user, n_B_user);

            // Enviament de valors encriptats
            socket.emit('chat-missatge', {
                missatge: String(missatge_encriptat),
                usuari: String(usuari_encriptat)
            });

            // Mostrar a l'emissor els missatges enviats
            output.innerHTML += `<div class="missatges-enviats"> 
                <strong> ${username} </strong>: ${message.value}
            </div>`;

            message.value = ""; // per a que es buidi el input del missatge
            limit_caracters.innerHTML = "&nbsp"; // treure l'avís

            // Autoscroll
            actions.scrollIntoView();
        }
    });

    // Rebre missatges
    socket.on('chat-missatge', (data) => {
        // Desencriptació + mostrar missatges en pantalla
        actions.innerHTML = "";
        output.innerHTML += `<div class="missatges-rebuts">
            <strong> ${desencripta(BigInt(data.usuari), d_A_user, n_A_user)} </strong>: ${desencripta(BigInt(data.missatge), d_A_user, n_A_user)}
        </div>`;

        // Autoscroll
        actions.scrollIntoView();
    });

    // Usuari està escribint
    message.addEventListener('keypress', function() {
        // Encriptació username
        var usuari_encriptat = encripta(username, e_user, n_B_user);

        // Enviament de l'event d'escriure
        socket.emit('usuari-escribint', String(usuari_encriptat));
    });

    // Rebuda event d'escriure
    socket.on('usuari-escribint', (usuari) => {
        actions.innerHTML = `<p> <em> <b> ${desencripta(BigInt(usuari), d_A_user, n_A_user)} està escribint... </b> </em> </p>`
    });
});

// 3 users en sala
socket.on('3-usuaris', () => {
    location.href = "index.html";
    alert("La sala ja està plena");
});

// Sortida d'un dels users
window.addEventListener('beforeunload', function(e) {
    // Sol·licitud de sortida
    socket.emit('sortida-sala');

    // Temps per a que pugui enviar-la
    delay(700);
});

// Reset de sala quan l'altre user surt
socket.on('reset-sala', () => {
    window.location.reload();
});
