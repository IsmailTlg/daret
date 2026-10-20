//Partie de US-01
let inputName = document.getElementById("nom-cercle")
let errName = document.getElementById("nom-cercle-erreur")
let inputCotisation = document.getElementById("cotisation")
let errCotisation = document.getElementById("cotisation-erreur")
let inputDate = document.getElementById("date-debut")
let errDate = document.getElementById("date-debut-erreur")
let form = document.getElementById("daret-form")
let nameRegex = /^[A-Za-zÀ-ÿ0-9 \-]{3,40}$/
function validateForm() {
    if(!nameRegex.test(inputName.value)){
        errName.innerHTML = "cercle name invalide"
        return false;
    }
    else{
        errName.innerHTML = ""
    }
    if(inputCotisation.value < 100 || inputCotisation.value > 50000){
        errCotisation.innerHTML = "cotisation faut etre entre 100 et 50 000 MAD"
        return false;
    }
    else{
        errCotisation.innerHTML = ""
    }
    if(inputDate.value == ""){
        errDate.innerHTML = "entrer un date"
        return false;
    }
    else{
        errDate.innerHTML = ""
    }
    return true;
    //need to add validation when entering a participant for us-02
}
