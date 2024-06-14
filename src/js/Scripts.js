// app.js
import { Grafo } from "../models/grafo.js";

const laberintoElement = document.getElementById('laberinto');

// Crear el grafo y nodos
const grafo = new Grafo();
const filas = 5;
const columnas = 5;

const obstaculos = new Set(['1-1', '2-2', '3-3']); 
//Definir algunas celdas como obstáculos

// Crear el laberinto visual y agregar nodos al grafo
for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        const clave = `${i}-${j}`;
        grafo.agregarNodo(clave);

        const celda = document.createElement('div');
        celda.classList.add('celda');
        celda.setAttribute('id', clave);

        // Marcar celdas de inicio y fin

        if (clave === '0-0') {
            celda.classList.add('inicio');
            const jugador = document.createElement('div');
            jugador.classList.add('jugador');
            celda.appendChild(jugador);
            jugador.style.display = 'block';
        } else if (clave === '4-4') {
            celda.classList.add('fin');
        }

        // Marcar los obstáculos
        if (obstaculos.has(clave)) {
            celda.classList.add('obstaculo');
            grafo.nodos.get(clave).esObstaculo = true;
        }

        laberintoElement.appendChild(celda);
    }
}

// Agregar aristas al grafo

const direcciones = [
    [0, 1], // Derecha
    [1, 0], // Abajo
    [0, -1], // Izquierda
    [-1, 0] // Arriba
];

const esValido = (x, y) => x >= 0 && x < filas && y >= 0 && y < columnas;

for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        for (const [dx, dy] of direcciones) {
            const x = i + dx;
            const y = j + dy;
            if (esValido(x, y)) {
                grafo.agregarArista(`${i}-${j}`, `${x}-${y}`);
            }
        }
    }
}

// Posición del jugador
let posicionJugador = { x: 0, y: 0 };

// Manejar el movimiento del jugador
window.addEventListener('keydown', (e) => {
    const { x, y } = posicionJugador;
    let nuevoX = x;
    let nuevoY = y;

    switch (e.key) {
        case 'ArrowUp':
            nuevoX = x - 1;
            break;
        case 'ArrowDown':
            nuevoX = x + 1;
            break;
        case 'ArrowLeft':
            nuevoY = y - 1;
            break;
        case 'ArrowRight':
            nuevoY = y + 1;
            break;
        default:
            return;
    }

    if (esValido(nuevoX, nuevoY)) {
        const nuevaPosicion = `${nuevoX}-${nuevoY}`;
        const nodo = grafo.nodos.get(nuevaPosicion);

        if (nodo && !nodo.esObstaculo) {
            moverJugador(nuevaPosicion);
            posicionJugador = { x: nuevoX, y: nuevoY };
        }
    }
});

function moverJugador(nuevaPosicion) {
    const jugador = document.querySelector('.jugador');
    const nuevaCelda = document.getElementById(nuevaPosicion);
    nuevaCelda.appendChild(jugador);
}

// Mostrar la ruta más corta
window.verRuta = function() {
    const rutaMasCorta = grafo.dfsCaminoMasCorto('0-0', '4-4');
    if (rutaMasCorta) {
        for (const celda of rutaMasCorta) {
            const celdaElemento = document.getElementById(celda);
            if (!celdaElemento.classList.contains('inicio') && !celdaElemento.classList.contains('fin')) {
                celdaElemento.classList.add('ruta');
            }
        }
    } else {
        alert('No hay camino disponible.');
    }
}
