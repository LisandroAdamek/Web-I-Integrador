const formulario = document.getElementById("formulario-contacto");
const estadoFormulario = document.getElementById("estado-formulario");
const resumen = document.getElementById("resumen");
const resumenDatos = document.getElementById("resumen-datos");
const botonVolver = document.getElementById("volver-formulario");

const campos = {
    nombre: document.getElementById("nombre"),
    email: document.getElementById("email"),
    telefono: document.getElementById("telefono"),
    asunto: document.getElementById("asunto"),
    mensaje: document.getElementById("mensaje")
};

const errores = {
    nombre: document.getElementById("error-nombre"),
    email: document.getElementById("error-email"),
    telefono: document.getElementById("error-telefono"),
    asunto: document.getElementById("error-asunto"),
    mensaje: document.getElementById("error-mensaje")
};

function validarCampo(campo) {
    const valor = campo.value.trim();
    let mensaje = "";

    switch (campo.name) {
        case "nombre":
            if (valor === "") {
                mensaje = "El nombre es obligatorio.";
            } else if (valor.length < 3 || valor.length > 80) {
                mensaje = "El nombre debe tener entre 3 y 80 caracteres.";
            } else if (/\s{2,}/.test(valor)) {
                mensaje = "No ingreses varios espacios seguidos.";
            } else if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u.test(valor)) {
                mensaje = "Ingresa un nombre valido, sin numeros ni simbolos.";
            }
            break;

        case "email":
            if (valor === "") {
                mensaje = "El correo electronico es obligatorio.";
            } else if (valor.length > 50) {
                mensaje = "El correo no puede superar los 100 caracteres.";
            } else if (/\s/.test(valor)) {
                mensaje = "El correo no puede contener espacios.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                mensaje = "Ingresa un correo valido, por ejemplo nombre@dominio.com.";
            }
            break;

        case "telefono": {
            if (valor === "") {
                mensaje = "El telefono es obligatorio.";
            } else if (valor.length < 8 || valor.length > 20) {
                mensaje = "El telefono debe tener entre 8 y 20 caracteres.";
            } else if (/\s{2,}/.test(valor)) {
                mensaje = "No ingreses varios espacios seguidos.";
            } else if (!/^\+?[0-9 ()-]+$/.test(valor)) {
                mensaje = "Usa solamente numeros, espacios, +, parentesis o guiones.";
            } else {
                const cantidadDigitos = valor.replace(/\D/g, "").length;

                if (cantidadDigitos < 8 || cantidadDigitos > 15) {
                    mensaje = "El telefono debe contener entre 8 y 15 digitos.";
                }
            }
            break;
        }

        case "asunto":
            if (valor === "") {
                valor = "Otro";
            }
            break;

        case "mensaje":
            if (valor === "") {
                mensaje = "El mensaje es obligatorio.";
            } else if (valor.length < 10 || valor.length > 500) {
                mensaje = "El mensaje debe tener entre 10 y 500 caracteres.";
            } else if (!/[^\s]/.test(valor)) {
                mensaje = "El mensaje no puede contener solamente espacios.";
            }
            break;
    }

    errores[campo.name].textContent = mensaje;
    campo.classList.toggle("invalido", mensaje !== "");
    campo.classList.toggle("valido", mensaje === "" && valor !== "");
    campo.setAttribute("aria-invalid", mensaje !== "" ? "true" : "false");

    return mensaje === "";
}

function validarFormulario() {
    let formularioValido = true;
    let primerCampoInvalido = null;

    Object.values(campos).forEach((campo) => {
        const campoValido = validarCampo(campo);

        if (!campoValido) {
            formularioValido = false;

            if (!primerCampoInvalido) {
                primerCampoInvalido = campo;
            }
        }
    });

    if (primerCampoInvalido) {
        primerCampoInvalido.focus();
    }

    return formularioValido;
}

function agregarDatoResumen(etiqueta, valor) {
    const linea = document.createElement("div");
    linea.classList.add("resumen-linea");

    const titulo = document.createElement("strong");
    titulo.textContent = etiqueta;

    const contenido = document.createElement("p");
    contenido.textContent = valor;

    linea.appendChild(titulo);
    linea.appendChild(contenido);
    resumenDatos.appendChild(linea);
}

function mostrarResumen() {
    resumenDatos.replaceChildren();

    agregarDatoResumen("Nombre completo", campos.nombre.value.trim());
    agregarDatoResumen("Correo electronico", campos.email.value.trim());
    agregarDatoResumen("Telefono", campos.telefono.value.trim());
    agregarDatoResumen("Asunto", campos.asunto.value);
    agregarDatoResumen("Mensaje", campos.mensaje.value.trim());

    resumen.hidden = false;
    estadoFormulario.textContent = "Todos los datos son validos.";
    estadoFormulario.style.color = "#68d6a0";

    resumen.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    estadoFormulario.textContent = "";
    estadoFormulario.style.color = "";

    if (!validarFormulario()) {
        estadoFormulario.textContent = "Revisa los campos señalados antes de continuar.";
        resumen.hidden = true;
        return;
    }

    mostrarResumen();
});

Object.values(campos).forEach((campo) => {
    campo.addEventListener("input", () => {
        if (errores[campo.name].textContent !== "") {
            validarCampo(campo);
        }

        estadoFormulario.textContent = "";
    });

    campo.addEventListener("change", () => {
        if (errores[campo.name].textContent !== "") {
            validarCampo(campo);
        }
    });
});

botonVolver.addEventListener("click", function () {
    resumen.hidden = true;
    campos.nombre.focus();
});
