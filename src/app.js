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
    //for participants list
    
    else{
        errDate.innerHTML = ""
    }
    return true;
    //need to add validation when entering a participant for us-02

}
/*partie de US-02*/
let list = document.getElementById("participants-liste");
let participant = document.getElementById("input-participant");
function ajouterParticipant(){
    participant.innerHTML = `
        <label for="nomUtilisateur">Nom Completet: </label>
        <input id="nomUtilisateur" 
        name="nomUtilisateur" 
        type = "text"               
        class="mt-1 w-full rounded border border-daret-bordure px-3 py-2 focus:outline-2 focus:outline-offset-2 focus:outline-daret-vert"
        />
        <div>
            <button
              id = "end-participants"
              class="mt-3 rounded border border-daret-vert px-4 py-2 font-medium text-daret-vert hover:bg-daret-vert-clair focus:outline-2 focus:outline-offset-2 focus:outline-daret-vert"
            >
            Terminer</button>
            <button 
              id = "ajouter"
              class="rounded bg-daret-vert px-5 py-2 font-semibold text-white hover:bg-daret-vert/90 focus:outline-2 focus:outline-offset-2 focus:outline-daret-vert"
            >
            Ajouter</button>
        </div>

    `
    let endBtn = document.getElementById("end-participants");
    endBtn.addEventListener('click', () => {
        participant.innerHTML = ``;
    })
    let addBtn = document.getElementById("ajouter");
    addBtn.addEventListener('click', () => {
        list.innerHTML += `
            <li>${nomUtilisateur.value}</li>
        `
    })
}
