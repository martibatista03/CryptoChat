
// Usos comunicació
let sala = document.getElementById("sala");
let nom_usuari = document.getElementById("nom");
let btn = document.getElementById("btn");

// Usos estilístics
let advertencia_username = document.getElementById("nom-usuari-curt");
let advertencia_sala = document.getElementById("nom-sala-curt");

// Entrada per botó
btn.addEventListener('click', function () {
    if(nom_usuari.value.length > 2 && sala.value.length > 4) {
        // Guardant paràmetres en memòria local
        localStorage.setItem("nomUsuari", nom_usuari.value); 
        localStorage.setItem("sala", sala.value);

        // Entrada al xat
        location.href = "chat.html";

    } else {
        // Nom d'usuari massa curt
        if(nom_usuari.value.length < 3 && (advertencia_username.innerHTML).indexOf("Nom d'usuari massa curt (mínim 3 caràcters)") == -1) {
            advertencia_username.innerHTML = `<div class="contingut-curt"> <div class="fas fa-exclamation-triangle"> </div> &nbsp Nom d'usuari massa curt (mínim 3 caràcters) </div>`;

        // Per si es falla amb la sala quan es torna a provar i username és correcte
        } else if(nom_usuari.value.length > 2) {
            advertencia_username.innerHTML = `<div class="contingut-curt-base"> &nbsp </div>`;
        }
        
        // Nom de sala massa curt
        if(sala.value.length < 5 && (advertencia_sala.innerHTML).indexOf("Nom de sala massa curt (mínim 5 caràcters)") == -1) {
            advertencia_sala.innerHTML = `<div class="contingut-curt"> <div class="fas fa-exclamation-triangle"> </div> &nbsp Nom de sala massa curt (mínim 5 caràcters) </div>`;
        
        // Per si es falla amb el username quan es torna a provar i sala és correcte
        } else if(sala.value.length > 4) {
            advertencia_sala.innerHTML = `<div class="contingut-curt-base"> &nbsp </div>`;
        }
    }
});

// Entrada per Enter
document.addEventListener('keyup', function(event) {
    if(event.key == 'Enter' && nom_usuari.value.length > 2 && sala.value.length > 4) {
        // Guardant paràmetres en memòria local
        localStorage.setItem("nomUsuari", nom_usuari.value); 
        localStorage.setItem("sala", sala.value);

        // Entrada al xat
        location.href = "chat.html";

    } else if(event.key == 'Enter') {
        // Nom d'usuari massa curt
        if(nom_usuari.value.length < 3 && (advertencia_username.innerHTML).indexOf("Nom d'usuari massa curt (mínim 3 caràcters)") == -1) {
            advertencia_username.innerHTML = `<div class="contingut-curt"> <div class="fas fa-exclamation-triangle"> </div> &nbsp Nom d'usuari massa curt (mínim 3 caràcters) </div>`;

        // Per si es falla amb la sala quan es torna a provar i username és correcte
        } else if(nom_usuari.value.length > 2) {
            advertencia_username.innerHTML = `<div class="contingut-curt-base"> &nbsp </div>`;
        }
        
        // Nom de sala massa curt
        if(sala.value.length < 5 && (advertencia_sala.innerHTML).indexOf("Nom de sala massa curt (mínim 5 caràcters)") == -1) {
            advertencia_sala.innerHTML = `<div class="contingut-curt"> <div class="fas fa-exclamation-triangle"> </div> &nbsp Nom de sala massa curt (mínim 5 caràcters) </div>`;
        
        // Per si es falla amb el username quan es torna a provar i sala és correcte
        } else if(sala.value.length > 4) {
            advertencia_sala.innerHTML = `<div class="contingut-curt-base"> &nbsp </div>`;
        }
    }
});
