const jugadores = [
    {
        nombre: "Edinson Cavani",
        imagen: "img/jugadores/Cavani.png"
    },
    {
        nombre: "Marcos Rojo",
        imagen: "img/jugadores/Rojo.png"
    },
    {
        nombre: "Miguel Merentiel",
        imagen: "img/jugadores/Merentiel.jpeg"
    }
];

const imagenJugador = document.getElementById("imagen-jugador");
const nombreJugador = document.getElementById("nombre-jugador");
const contadorJugador = document.getElementById("contador-jugador");
const botonAnterior = document.getElementById("anterior");
const botonSiguiente = document.getElementById("siguiente");

let indiceActual = 0;

function mostrarJugador() {
    const jugador = jugadores[indiceActual];

    imagenJugador.src = jugador.imagen;
    imagenJugador.alt = jugador.descripcion;
    nombreJugador.textContent = jugador.nombre;

    const numero = String(indiceActual + 1);
    const total = String(jugadores.length);

    contadorJugador.textContent = `${numero} / ${total}`;
}

botonAnterior.addEventListener("click", () => {
    indiceActual = (indiceActual - 1 + jugadores.length) % jugadores.length;
    mostrarJugador();
});

botonSiguiente.addEventListener("click", () => {
    indiceActual = (indiceActual + 1) % jugadores.length;
    mostrarJugador();
});
