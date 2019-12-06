const $botonComenzar = document.querySelector('#comenzar');
let secuenciaUsuario = [];
let secuenciaMaquina = [];
let movimientos = 0;

bloquearCuadradoUsuario();

$botonComenzar.onclick = function (event) {
    let ronda = 0;
    secuenciaUsuario = [];
    secuenciaMaquina = [];

    juegaMaquina();
    
    event.preventDefault();
}


function juegaMaquina() {
    let aleatorio = obtenerNumeroAleatorio();
    let cuadradoResaltado = document.querySelector('#cuadrado-' + aleatorio);
    //console.log(cuadradoResaltado.attributes.id.value);
    secuenciaMaquina.push(cuadradoResaltado.attributes.id.value);    
    
    for(let i=0; i<secuenciaMaquina.length; i++){
        const RETRASO_MS = (i + 1) * 1000;
      setTimeout(function() {
          resaltar(document.querySelector('#' + secuenciaMaquina[i]));
      }, RETRASO_MS);
    }
    
