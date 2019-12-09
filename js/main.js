const $botonComenzar = document.querySelector('#comenzar');
let secuenciaUsuario = [];
let secuenciaMaquina = [];
let clicksUsuario = 0;
let ronda = 0;

bloquearCuadradoUsuario();

$botonComenzar.onclick = function (event) {
    ronda = 0;

    secuenciaUsuario = [];
    secuenciaMaquina = [];

    juegaMaquina();

    event.preventDefault();
}


function juegaMaquina() {
    document.querySelector('.estado').innerText = "TURNO DE LA MAQUINA";
    let aleatorio = obtenerNumeroAleatorio();
    let cuadradoResaltado = document.querySelector('#cuadrado-' + aleatorio);
    secuenciaMaquina.push(cuadradoResaltado.attributes.id.value);

    for (let i = 0; i < secuenciaMaquina.length; i++) {
        const RETRASO_MS = (i + 1) * 1000;
        setTimeout(function () {
            resaltar(document.querySelector('#' + secuenciaMaquina[i]));
        }, RETRASO_MS);
    }


    secuenciaUsuario = [];

    let retraso_turno_jugador = (secuenciaMaquina.length + 1) * 1000;

    setTimeout(function () { //para que le de la opción de jugar al usuario una vez que la máquina ha terminado de jugar
        desbloquearCuadradoUsuario();
    }, retraso_turno_jugador);

    clicksUsuario = 0;
    ronda++;
    document.querySelector('.numero-ronda').innerText = "Vas por la ronda: " + ronda;
}


function obtenerNumeroAleatorio() {
    return ((Math.floor(Math.random() * 4)) + 1);
}

function resaltar(cuadradoResaltado) {
    cuadradoResaltado.style.opacity = 1;

    setTimeout(function () {
        cuadradoResaltado.style.opacity = 0.5;
    }, 500);
}

function juegaUsuario(e) {
    let cuadradoSeleccionUsuario = e.target;
    secuenciaUsuario.push(cuadradoSeleccionUsuario.attributes.id.value);

    //console.log('el arreglo con las selecciones del usuario ' + secuenciaUsuario);
    //console.log('el usuario ha hecho ' + clicksUsuario + ' clicks');

    if (secuenciaUsuario.length === secuenciaMaquina.length) {

        if (comprobarSiPerdio(clicksUsuario)) {
            perder();
        } else {
            resaltar(cuadradoSeleccionUsuario);
            bloquearCuadradoUsuario();
            juegaMaquina();
        }
    } else {

        if (comprobarSiPerdio(clicksUsuario)) {
            perder();
        } else {
            resaltar(cuadradoSeleccionUsuario);
            desbloquearCuadradoUsuario();
            clicksUsuario++;
        }
    }

}

function comprobarSiPerdio(clicksUsuario) {
    if (secuenciaUsuario[clicksUsuario] !== secuenciaMaquina[clicksUsuario]) {
        return true;
    }
}

function perder() {
    document.querySelector('.estado').innerText = 'PERDISTE, haz click en comenzar para jugar nuevamente';
    bloquearCuadradoUsuario();
}

function bloquearCuadradoUsuario() {
    document.querySelectorAll('.cuadrado').forEach(function ($cuadro) {
        $cuadro.onclick = function () {};
    });
}

function desbloquearCuadradoUsuario() {
    document.querySelector('.estado').innerText = "ES TU TURNO";
    document.querySelectorAll('.cuadrado').forEach(function ($cuadro) {
        $cuadro.onclick = juegaUsuario;
    });

}
