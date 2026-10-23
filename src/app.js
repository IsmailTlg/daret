//Partie de US-01
let inputName = document.getElementById("nom-cercle")
let errName = document.getElementById("nom-cercle-erreur")
let inputCotisation = document.getElementById("cotisation")
let errCotisation = document.getElementById("cotisation-erreur")
let inputPeriode = document.getElementById("periodicite")
let inputDate = document.getElementById("date-debut")
let errDate = document.getElementById("date-debut-erreur")
let form = document.getElementById("daret-form")
let nameRegex = /^[A-Za-zÀ-ÿ0-9 \-]{3,40}$/
let listLength = 0;
let errParticipants = document.getElementById("participants-erreur")
let calendrier = document.getElementById("calendrier")
let participants = []
let participantsNames = [];
let btnTerminer;
//to stop the page from reloading after a submit
form.addEventListener("submit", function(a) {
    a.preventDefault();
})
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
    if(listLength < 2 || listLength > 20){
        errParticipants.innerHTML = "doit entrer 2 a 20 participants!"
        return false;
    }
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
        <label for="nomUtilisateur">Nom Complete: </label>
        <input id="nomUtilisateur" 
        name="nomUtilisateur" 
        type = "text"               
        class="mt-1 w-full rounded border border-daret-bordure px-3 py-2 focus:outline-2 focus:outline-offset-2 focus:outline-daret-vert"
        />
        <div>
            <button
              type = "button"
              id = "end-participants"
              class="mt-3 rounded border border-daret-vert px-4 py-2 font-medium text-daret-vert hover:bg-daret-vert-clair focus:outline-2 focus:outline-offset-2 focus:outline-daret-vert"
            >
            Terminer</button>
            <button 
              type = "button"
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
    let total = document.getElementById("participants-compteur");
    addBtn.addEventListener('click', () => {
        listLength++;
        total.innerHTML = `${listLength} participants`
        list.innerHTML += `
            <div class = "element flex justify-between items-center">
                <li class="name">${nomUtilisateur.value}</li> 
                <button 
                type = "button"
                class="retirerBtn mt-3 rounded border border-daret-vert px-4 py-2 font-medium text-daret-vert hover:bg-daret-vert-clair focus:outline-2 focus:outline-offset-2 focus:outline-daret-vert"
                >Retirer</button>
            </div>
        `
        let retirerBtn = document.querySelectorAll(".retirerBtn")      
        retirerBtn.forEach(function(a) {
            a.addEventListener('click', function(){
                this.parentElement.remove();
                listLength--;
                total.innerHTML = `${listLength} participants`
            })
        })
    })
}
/*Partie de US-03*/
function calculResultat(){
    let montantRecu = Number(inputCotisation.value) * listLength
    //total par participant est meme valeur que montant Recu
    //nombre des tures est meme valeur que nombre des participants
    let dateDe1ertour = inputDate.value;
    //cette list va retourn tous les resultats sous form : 
    //[montantRecu, totalParParticipant, nbrDeTour, date1erTour]
    let resultats = [montantRecu, montantRecu, listLength, dateDe1ertour]
    return resultats
}

/*Partie de US-04*/
function genererCalendrier(resultat, access, shuffeled = false){
    if(!access){
        return 0;
    }
    //counting the final date.
    let dateSeparee = resultat[3].split("-")
    let date = new Date(dateSeparee[0], dateSeparee[1]-1, dateSeparee[2])
    //this k is gonna be indicator which periode we have, 1=>weekly, 2=>every15days, 3=>monthly
    let k;
    let dateorigin = new Date(date)
    if(inputPeriode.value == "hebdomadaire"){
        date.setDate(date.getDate() + (7* (resultat[2] - 1)));
        k=1;
    }
    else if(inputPeriode.value == "quinzaine"){
        date.setDate(date.getDate() + (15 * (resultat[2] - 1)))
        k=2;
    }
    else{
        date.setMonth(date.getMonth() +  (resultat[2] - 1))
        k=3;
    }
    let day = String(date.getDate()).padStart(2, '0')
    let month = String(date.getMonth()+1).padStart(2, '0')
    let year = String(date.getFullYear())
    let dateDerniere = `${year}-${month}-${day}`
    //=========================================
    let etatVide = document.getElementById("etat-vide")
    etatVide.classList.add("hidden")
    let contenuResultat = document.getElementById("contenu-resultat")
    contenuResultat.querySelector("dl div dt").innerHTML = `Reçu par le bénéficiaire à chaque tour: ${resultat[0]} MAD`
    contenuResultat.querySelector("dl .div2 dt").innerHTML = `Total versé par participant sur le cycle: ${resultat[1]} MAD`
    contenuResultat.querySelector("dl .div3 dt").innerHTML = `Nombre de tours: ${resultat[2]} tours`
    contenuResultat.querySelector("dl .div4 dt").innerHTML = `Premier tour ${resultat[3]}· dernier tour ${dateDerniere}`
    contenuResultat.classList.remove("hidden") 

    participants = document.querySelectorAll("#participants-liste .name")
    if(!shuffeled){
        participantsNames = []
        participants.forEach(a => {
            participantsNames.push(a.textContent.trim())
            console.log("eneterd")
        })
    }
    let table = document.getElementById("calendrier-corps");
    //resultat [2] stocke nombre des tours
    table.innerHTML = ``
    for(let i = 0; i<resultat[2]; i++){
        if(k == 1 && i != 0){
            dateorigin.setDate(dateorigin.getDate() + 7)
        }
        else if(i == 0){
            dateorigin.setDate(dateorigin.getDate());
        }
        else if(k == 2){
            dateorigin.setDate(dateorigin.getDate() + 15)
        }
        else{
            dateorigin.setMonth(dateorigin.getMonth() + 1)
        }
        let date2 = `${String(dateorigin.getFullYear())}-${String(dateorigin.getMonth() + 1).padStart(2, '0')}-${String(dateorigin.getDate()).padStart(2, '0')}`
        console.log(date2)
        table.innerHTML += `
            <tr>
                <td scope="col" class="nbrTour px-4 py-3">${i+1}</td>
                <td scope="col" class="dateTour px-4 py-3">${date2}</td>
                <td scope="col" class="px-4 py-3"><a class = "benificiaire">${participantsNames[i]}</a></td>
                <td scope="col" class="montantRecu px-4 py-3">${resultat[0]}</td>
                <td scope="col" class="statut px-4 py-3">À venir</td>
                <td><button
                class="terminerBtn mt-3 mr-2 rounded border border-daret-vert px-4 py-2 font-medium text-daret-vert hover:bg-daret-vert-clair focus:outline-2 focus:outline-offset-2 focus:outline-daret-vert"                
                >Terminee</button></td>
            </tr>
        `
    }
    btnTerminer = document.querySelectorAll(".terminerBtn")
    console.log(dateorigin)
    /*US-06*/
    let toursCompletes = document.createElement('tfoot')
    btnTerminer.forEach(a=>{
        a.addEventListener('click', function(){
            let b;
            b = a.closest("tr")
            console.log("clicked")
            if(a.innerHTML == "Terminee"){
                b.children[b.children.length-2].innerHTML = "Terminé"
                a.innerHTML = "Annuler"
            }
            else{ 
                b.children[b.children.length-2].innerHTML = "À venir"
                a.innerHTML = "Terminee"
            }
            let nbrTerminer = 0;
            for(let i = 0; i<btnTerminer.length; i++){
                if(btnTerminer[i].innerHTML != "Terminee"){
                    nbrTerminer++;
                }
            }
            document.getElementById("calendrier").appendChild(toursCompletes)
            toursCompletes.innerHTML = ``
            toursCompletes.innerHTML = `${nbrTerminer} tours terminés sur ${resultat[2]}`
            console.log(nbrTerminer, resultat[2])
            console.log(calendrier)
        }) 
    })
    /*US-07*/
    let binificiares = document.querySelectorAll(".benificiaire")
    let dialogue = document.querySelector("#detail-tour")
    let fermerDialogue = document.querySelector("#detail-fermer")
    binificiares.forEach(a => {
        a.addEventListener('click', function(){
            dialogue.querySelector("div dd").textContent = a.parentElement.parentElement.querySelector(".dateTour").textContent
            dialogue.querySelector("#dialogueBenef dd").textContent = a.parentElement.parentElement.querySelector(".benificiaire").textContent
            dialogue.querySelector("#dialogueMontant").textContent = a.parentElement.parentElement.querySelector(".montantRecu").textContent + " MAD"
            dialogue.querySelector("#detail-contributeurs").innerHTML = ``;
            for(let i = 0; i<participantsNames.length; i++){
                if(participantsNames[i] != a.textContent){
                    dialogue.querySelector("#detail-contributeurs").innerHTML += `<li>${participantsNames[i]}</li>`
                }
                console.log(a.textContent)
                console.log(participantsNames[i])
            }
            dialogue.showModal()
        })
        ///closing when clicked on the button
        fermerDialogue.addEventListener('click', function(){
            dialogue.close()
        })
        ///closing when clicked outside
        dialogue.addEventListener('click', (event) => {
            if(event.target === dialogue){
                dialogue.close()
            }
        })
    })

}
//add a way to shuffle the list (us-05)
let btnSort = document.getElementById("tirage-au-sort")
btnSort.addEventListener('click', function(){
    let temp;
    let rndm1;
    let rndm2;
    for(let i = 0 ; i<50; i++){
        //participants length is the max index we can have
        rndm1 = Math.floor(Math.random() * (participantsNames.length));
        rndm2 = Math.floor(Math.random() * (participantsNames.length));
        temp = participantsNames[rndm1]
        participantsNames[rndm1] = participantsNames[rndm2];
        participantsNames[rndm2] = temp; 
        console.log(rndm1, rndm2)
        console.log(participantsNames)
    }
    console.log("clicked!")
    console.log(participantsNames)
    genererCalendrier(calculResultat(), validateForm(), true)
})
let btnNormal = document.getElementById("ordre-saisie")
btnNormal.addEventListener('click', function(){
    genererCalendrier(calculResultat(), validateForm())
})
let reinitialiser = document.getElementById("reinitialiser")
reinitialiser.addEventListener('click', function(){
    location.reload
})
