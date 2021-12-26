import { words } from "./word.js";

const audioError = document.getElementById("audioError");
let result = document.getElementById("diag");
const bouton = document.getElementById("bouton");
const ecran = document.getElementById("ecran");
const count = document.getElementById("count");
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
    var dix = 10;
    display = document.querySelector('#bouton');
    startTimer(dix);
    setTimeout("window.location.reload()", 11000);
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
        let errorGen = `<b>Error 0x${error.code} :</b> ${diag.composant} ${diag.action}.<br /><br /> Veuillez ${diag.conseq}`;
        let genIncrement = `${diag.composant} ${diag.action}. Veuillez ${diag.conseq}`;
        result.innerHTML = errorGen;
        // increment count.csv
        increment(genIncrement);
    };
    displayDiag();
    bouton.style.pointerEvents = "none";
    bouton.style.backgroundColor = "grey";
    bouton.style.backgroundImage = "none";

    // print count
    parseData("./assets/count.csv", printCount);

    reload();
};
function debut(){
    display("desktop"); 
};
// Post data from record form
function increment(value){

    // GET FORM DATA
    let data = new FormData();
    data.append("value", value);
  
    // AJAX
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "./increment.php");
  
    // What to do when server responds
    //xhr.onload = function(){ console.log(feedValue); };
    xhr.send(data);
};
// Load and convert csv file to array
function parseData(url, callBack) {
    Papa.parse(url, {
        download: true,
        complete: function (result) {
            callBack(result.data);
        }
    });
};
// print counter
function printCount(data){
    count.innerHTML = `${data.length - 1} erreurs générées`;
};

//////////////////////////////////////////////////////////////////

debut();
bouton.addEventListener("click", function(){
    error();
});
