// Esperamos a que el HTML esté listo para manipular el formulario y la vista previa.
document.addEventListener('DOMContentLoaded', function () {
    // Guardamos el input donde va el correo destino.
    var inputCorreo = document.getElementById('confirm-correo');
    // Guardamos el input del asunto.
    var inputAsunto = document.getElementById('confirm-asunto');
    // Guardamos el textarea del mensaje.
    var inputMensaje = document.getElementById('confirm-mensaje');

    // Guardamos los elementos que muestran la vista previa del correo.
    var previewCorreo = document.getElementById('preview-correo');
    var previewAsunto = document.getElementById('preview-asunto');
    var previewMensaje = document.getElementById('preview-mensaje');

    // Guardamos el formulario principal de confirmación.
    var formConfirmacion = document.getElementById('form-confirmacion');
    // Guardamos el bloque donde se muestran mensajes de estado.
    var statusConfirmacion = document.getElementById('confirmacion-status');
    // Guardamos el botón para guardar plantilla (si existe).
    var btnGuardarPlantilla = document.getElementById('btn-guardar-plantilla');
    // Guardamos todos los botones que insertan tokens.
    var tokenButtons = document.querySelectorAll('.token-btn');

    // Esta función pinta un estado visual con tipo y mensaje.
    function mostrarEstado(tipo, mensaje) {
        // Si no existe el bloque de estado, detenemos la función.
        if (!statusConfirmacion) {
            return;
        }

        // Definimos la clase final del contenedor de estado.
        statusConfirmacion.className = 'confirmacion-status show ' + tipo;
        // Mostramos el mensaje recibido.
        statusConfirmacion.textContent = mensaje;
    }

    // Esta función sincroniza los textos de la vista previa.
    function actualizarVistaPrevia() {
        // Si existen elementos, reflejamos el correo o texto por defecto.
        if (previewCorreo && inputCorreo) {
            previewCorreo.textContent = inputCorreo.value || 'sin-destinatario@correo.com';
        }

        // Si existen elementos, reflejamos el asunto o texto por defecto.
        if (previewAsunto && inputAsunto) {
            previewAsunto.textContent = inputAsunto.value || 'Sin asunto';
        }

        // Si existen elementos, reflejamos el mensaje o texto por defecto.
        if (previewMensaje && inputMensaje) {
            previewMensaje.textContent = inputMensaje.value || 'Sin contenido';
        }
    }

    // Esta función inserta un token en la posición actual del cursor.
    function insertarToken(token) {
        // Si no existe el textarea, no podemos insertar nada.
        if (!inputMensaje) {
            return;
        }

        // Detectamos el inicio de selección/cursor o usamos el final del texto.
        var start = (typeof inputMensaje.selectionStart === 'number') ? inputMensaje.selectionStart : inputMensaje.value.length;
        // Detectamos el final de selección/cursor o usamos el final del texto.
        var end = (typeof inputMensaje.selectionEnd === 'number') ? inputMensaje.selectionEnd : inputMensaje.value.length;

        // Tomamos la parte del texto antes del cursor.
        var before = inputMensaje.value.slice(0, start);
        // Tomamos la parte del texto después del cursor.
        var after = inputMensaje.value.slice(end);

        // Si corresponde, agregamos un salto de línea antes del token.
        var insertion = ((before && !before.endsWith('\n')) ? '\n' : '') + token;

        // Construimos el nuevo contenido del textarea con el token insertado.
        inputMensaje.value = before + insertion + after;
        // Devolvemos foco al textarea para seguir escribiendo.
        inputMensaje.focus();

        // Calculamos nueva posición del cursor después de insertar.
        var newCursor = before.length + insertion.length;
        // Ubicamos el cursor justo al final del token insertado.
        inputMensaje.setSelectionRange(newCursor, newCursor);

        // Actualizamos vista previa para reflejar el cambio.
        actualizarVistaPrevia();
    }

    // Si existe input de correo, sincronizamos vista previa al escribir.
    if (inputCorreo) {
        inputCorreo.addEventListener('input', actualizarVistaPrevia);
    }

    // Si existe input de asunto, sincronizamos vista previa al escribir.
    if (inputAsunto) {
        inputAsunto.addEventListener('input', actualizarVistaPrevia);
    }

    // Si existe textarea de mensaje, sincronizamos vista previa al escribir.
    if (inputMensaje) {
        inputMensaje.addEventListener('input', actualizarVistaPrevia);
    }

    // Recorremos cada botón de token para insertar texto en el mensaje.
    for (var i = 0; i < tokenButtons.length; i++) {
        // Guardamos el botón actual del ciclo.
        var button = tokenButtons[i];

        // Al hacer clic en el botón, insertamos su token.
        button.addEventListener('click', function () {
            // Leemos el token desde data-token.
            var token = this.getAttribute('data-token');

            // Si el token existe, lo insertamos en el mensaje.
            if (token) {
                insertarToken(token);
            }
        });
    }

    // Si existe el formulario, controlamos su envío para validar front-end.
    if (formConfirmacion) {
        formConfirmacion.addEventListener('submit', function (event) {
            // Evitamos recarga para validar y mostrar mensajes.
            event.preventDefault();

            // Si no hay correo de destino, mostramos aviso y detenemos.
            if (!inputCorreo || !inputCorreo.value.trim()) {
                mostrarEstado('info', 'Debes indicar el correo del cliente antes de enviar la confirmación.');
                return;
            }

            // Si pasa la validación básica, mostramos éxito.
            mostrarEstado('success', 'La confirmación quedó lista para envío al cliente.');
        });
    }

    // Si existe botón de guardar plantilla, mostramos mensaje al pulsarlo.
    if (btnGuardarPlantilla) {
        btnGuardarPlantilla.addEventListener('click', function () {
            // Mostramos mensaje informativo al usuario.
            mostrarEstado('info', 'La plantilla del correo fue guardada correctamente.');
        });
    }

    // Tomamos todos los enlaces del menú principal.
    var menuLinks = document.querySelectorAll('header nav ul li a');
    // Obtenemos el nombre de la página actual desde la URL.
    var currentPath = window.location.pathname.split('/').pop();

    // Recorremos cada enlace para activar visualmente el que corresponde.
    for (var j = 0; j < menuLinks.length; j++) {
        // Guardamos el enlace actual del ciclo.
        var link = menuLinks[j];
        // Leemos su href.
        var href = link.getAttribute('href');

        // Si coincide con la URL actual, marcamos como activo.
        if (href === currentPath || (href === 'index.html' && currentPath === '')) {
            link.classList.add('active-link');
        } else {
            // Si no coincide, removemos clase activa.
            link.classList.remove('active-link');
        }
    }

    // Al finalizar la carga, inicializamos la vista previa con el estado actual.
    actualizarVistaPrevia();
});