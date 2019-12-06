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

    for (let i = 0; i < secuenciaMaquina.length; i++) {
        const RETRASO_MS = (i + 1) * 1000;
        setTimeout(function () {
            resaltar(document.querySelector('#' + secuenciaMaquina[i]));
        }, RETRASO_MS);
    }


    console.log('el array con la secuencia maquina es ' + secuenciaMaquina);
    secuenciaUsuario = [];
    desbloquearCuadradoUsuario();

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
    resaltar(cuadradoSeleccionUsuario);
    secuenciaUsuario.push(cuadradoSeleccionUsuario.attributes.id.value);

    console.log('el arreglo con las selecciones del usuario ' + secuenciaUsuario);
    


    if (secuenciaUsuario.length === secuenciaMaquina.length) {
        bloquearCuadradoUsuario();//para que no me ocurra lo que está sucediendo (que mientras la máquina juega el usuario puede seguir haciendo click debo usar un setTimeOut, ver luego)
        juegaMaquina();
    } else {
        desbloquearCuadradoUsuario();
    }
}

function bloquearCuadradoUsuario() {
    document.querySelectorAll('.cuadrado').forEach(function ($cuadro) {
        $cuadro.onclick = function () {};
    });
}

function desbloquearCuadradoUsuario() {
    document.querySelectorAll('.cuadrado').forEach(function ($cuadro) {
        $cuadro.onclick = juegaUsuario;
    });

}
