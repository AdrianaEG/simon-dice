let primero = document.querySelector('#primero');
let segundo = document.querySelector('#segundo');
let tercero = document.querySelector('#tercero');
let cuarto = document.querySelector('#cuarto');
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

