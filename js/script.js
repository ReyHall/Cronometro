const cronometro = document.querySelector(".cronometro");
const buttonIniciar = document.querySelector(".iniciar");
const buttonResetar = document.querySelector(".resetar");
let isActive = true;
let dataCronometro = JSON.parse(localStorage.getItem("dataCronometro")) || {
    horas: 0,
    minutos: 0,
    segundos: 0,
    milesimos: 0
}

let intervalo;

function formattedTime(time){
    return time < 10 ? "0" + time : time;
}

function updateCronometro(){
    cronometro.innerHTML = `
    <span class="horas">${formattedTime(dataCronometro.horas)} :</span>
    <span class="minutos">${formattedTime(dataCronometro.minutos)} :</span>
    <span class="segundos">${formattedTime(dataCronometro.segundos)} :</span>
    <span class="milesimos">${dataCronometro.milesimos < 100 ? "0" + formattedTime(dataCronometro.milesimos) : formattedTime(dataCronometro.milesimos)}</span>
    `
}

function handleIniciar(){
    buttonIniciar.classList.replace("fa-play", "fa-pause");
    if(isActive){
        isActive = false;
        intervalo = setInterval(() =>{
            dataCronometro.milesimos += 10;
            dataCronometro.segundos += Math.floor(dataCronometro.milesimos / 1000); dataCronometro.milesimos %= 1000;
            dataCronometro.minutos += Math.floor(dataCronometro.segundos / 60); dataCronometro.segundos %= 60;
            dataCronometro.horas += Math.floor(dataCronometro.minutos / 60); dataCronometro.minutos %= 60;
            updateCronometro();
        }, 10)

    } else if(!isActive){
        isActive = true;
        clearInterval(intervalo);
        buttonIniciar.classList.replace("fa-pause", "fa-play");
    }
}


function handleResetar(){
    cronometro.classList.remove("active");
    isActive = true;
    buttonIniciar.classList.replace("fa-pause", "fa-play");
    clearInterval(intervalo);
    dataCronometro.horas = 0; dataCronometro.minutos = 0;
    dataCronometro.segundos = 0; dataCronometro.milesimos = 0;
    updateCronometro();
}

buttonIniciar.onclick = (handleIniciar);
buttonResetar.onclick = (handleResetar);

updateCronometro();

window.addEventListener("beforeunload", () => {
    localStorage.setItem("dataCronometro", JSON.stringify(dataCronometro));
});