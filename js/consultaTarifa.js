async function obtenerTipoCambio() {
    const url = "https://api.exchangerate-api.com/v4/latest/CRC";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al obtener el tipo de cambio.");
        const datos = await response.json();
        return datos.rates.USD;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

function SeleccionarDias() {
    const dias = document.querySelectorAll(".dia");
    const totalDias = dias.length;

    let primerClick = null;
    let ultimoClick = null;

    dias.forEach((dia, index) => {
        dia.addEventListener("click", () => {
            if (primerClick === null || ultimoClick !== null) {
                dias.forEach(d => d.classList.remove("selected"));
                primerClick = index;
                ultimoClick = null;
                dia.classList.add("selected");
            } else {
                ultimoClick = index;

                if (primerClick <= ultimoClick) {
                    for (let i = primerClick; i <= ultimoClick; i++) {
                        dias[i].classList.add("selected");
                    }
                } else {
                    for (let i = primerClick; i < totalDias; i++) {
                        dias[i].classList.add("selected");
                    }
                    for (let i = 0; i <= ultimoClick; i++) {
                        dias[i].classList.add("selected");
                    }
                }
            }
        });
    });
}

function seleccionCabana() {
    const cabanas = document.querySelectorAll(".ecopod");
    let ultSelec = null;

    cabanas.forEach((cabana, index) => {
        cabana.addEventListener("click", () => {
            const isSelected = cabana.classList.contains("selected-ecopod");

            if (ultSelec === null || !isSelected) {
                cabanas.forEach(c => c.classList.remove("selected-ecopod")); 
                cabana.classList.add("selected-ecopod");
                ultSelec = index; 
            } else {
                cabana.classList.remove("selected-ecopod");
                ultSelec = null;
            }
        });
    });
}



async function calcularTarifa() {
    const diasSeleccionados = Array.from(document.querySelectorAll(".dia.selected"));
    
    const diasHospedaje = diasSeleccionados.length;
    const nochesHospedaje = diasHospedaje - 1;
    const mitipoCabana = tipoCabana();
    const cantPersonas = parseInt(document.querySelector(".numero").textContent);
    let Desayuno = 0;

    if(document.querySelector(".check").textContent !== '○'){
        Desayuno = 7000;
    }

    /*Precio por persona*/
    let precioxPersona = 0;

    if( mitipoCabana == "Ecopod Grande"){
        precioxPersona = 25500;
    }else if( mitipoCabana == "Ecopod Pequeño"){
        precioxPersona = 20500;
    }else{
        precioxPersona = 18000;
    }

    const totDesayuno = Desayuno * cantPersonas;
    const hospedaje = (cantPersonas * precioxPersona) * nochesHospedaje;

    const total = totDesayuno + hospedaje;
    
    document.getElementById("resultado-total").innerText = total;
    document.getElementById("res-precioPerssona").innerText = precioxPersona;
    document.getElementById("res-diasHospedaje").innerText = diasHospedaje;
    document.getElementById("res-nochesHospedaje").innerText = nochesHospedaje;
    document.getElementById("res-desayuno").innerText = totDesayuno;
    document.getElementById("res-precioNoche").innerText = hospedaje;
    document.getElementById("res-unitDesayuno").innerText = Desayuno;
    document.getElementById("res-cantPersonas").innerText = cantPersonas;

    const tasaCambio = await obtenerTipoCambio();
if (tasaCambio === null) {
    console.error("No se pudo obtener el tipo de cambio.");
    return;
}

    document.getElementById("cambioDolarPrecioPersona").innerText = " / " +(precioxPersona * tasaCambio).toFixed(2) + " USD";
    document.getElementById("cambioDolarDesayuno").innerText =" / "+ (totDesayuno * tasaCambio).toFixed(2) + " USD";
    document.getElementById("cambioDolarPrecioNoche").innerText = " / "+ (hospedaje * tasaCambio).toFixed(2) + " USD";
    document.getElementById("cambioDolarDesayunoTot").innerText = " / "+(Desayuno * tasaCambio).toFixed(2) + " USD";

}

function tipoCabana() {
    const cabanaSeleccionada = document.querySelector(".ecopod.selected-ecopod");
    
    if (cabanaSeleccionada) {
        const tipoCabana = cabanaSeleccionada.querySelector("p.nom-cabanan").innerText;
        return tipoCabana; 
    } else {
        console.log("No ha seleccionado un tipo de cabaña cabaña seleccionada");
        return null;
    }
}

function cantPersonas(){
        const numeroDiv = document.querySelector(".numero");
        const restar = document.querySelector(".restar");
        const sumar = document.querySelector(".sumar");
    
        sumar.addEventListener("click", () => {
            let numeroActual = parseInt(numeroDiv.textContent, 10);
            numeroDiv.textContent = numeroActual + 1;
        });
    
        restar.addEventListener("click", () => {
            let numeroActual = parseInt(numeroDiv.textContent, 10);
            if (numeroActual > 1) {
                numeroDiv.textContent = numeroActual - 1;
            }
        });
}

function marcarDesayuno(){
    const div = document.querySelector(".check");

    div.addEventListener("click", () => {
        if (div.textContent === "○") {
            div.textContent = "◉";
        } else {
            div.textContent = "○";
        }
    });
}
