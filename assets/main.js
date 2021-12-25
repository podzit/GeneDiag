import { words } from "./word.js";

const audioError = document.getElementById("audioError");
let result = document.getElementById("diag");
const bouton = document.getElementById("bouton");
const ecran = document.getElementById("ecran");
function display (color){
    let url = `url("./assets/img/${color}.jpg")`
    ecran.style.backgroundImage = url;
};
function startTimer(duration) {
    var timer = duration, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = seconds;
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function reload(){
    var quinze = 15;
    display = document.querySelector('#bouton');
    startTimer(quinze);
    setTimeout("window.location.reload()", 16000);
};
function error(){
    // BSOD
    display("bsod");

    // sound
    audioError.play();

    // random error code
    let error = { 
        code: [Math.floor(Math.random() * 16777215).toString(16).toUpperCase()]
    };
    // Random text choice
    let diag = {
        composant: [ words.composant[Math.floor(Math.random() * words.composant.length)] ],
        action: [ words.action[Math.floor(Math.random() * words.action.length)] ],
        conseq: [ words.conseq[Math.floor(Math.random() * words.conseq.length)] ]
    };
    function displayDiag(){
        result.innerHTML = `<b>Error 0x${error.code} :</b> ${diag.composant} ${diag.action}.<br /><br /> Veuillez ${diag.conseq}`;
    };
    displayDiag();
    bouton.style.pointerEvents = "none";
    bouton.style.backgroundColor = "grey";
    bouton.style.backgroundImage = "none";
};
function debut(){
    display("desktop"); 
}
debut();
bouton.addEventListener("click", function(){
    error();
    reload();
});
