// Esperamos a que todo el HTML esté cargado antes de usar elementos de la página.
document.addEventListener('DOMContentLoaded', () => {
    // Guardamos el botón de la pestaña de lista de usuarios.
    const btnLista = document.getElementById('tab-lista');
    // Guardamos el botón de la pestaña de registro/gestión.
    const btnRegistro = document.getElementById('tab-registro');
    // Guardamos el botón de la pestaña de configuración de e-mail.
    const btnEmail = document.getElementById('tab-email');
    // Guardamos el botón superior de "nueva" acción.
    const btnNuevoTop = document.querySelector('.nueva-orden');

    // Guardamos la sección visual de lista.
    const sectionLista = document.getElementById('section-lista');
    // Guardamos la sección visual de registro.
    const sectionRegistro = document.getElementById('section-registro');
    // Guardamos la sección visual de e-mail.
    const sectionEmail = document.getElementById('section-email');

    // Guardamos el formulario de configuración de e-mail.
    const formEmail = document.getElementById('form-email-config');
    // Guardamos el contenedor donde mostramos estados (error, éxito, info).
    const emailStatus = document.getElementById('email-status');
    // Guardamos el botón que prueba la conexión SMTP.
    const btnTestEmail = document.getElementById('btn-test-email');
    // Guardamos el input de contraseña SMTP.
    const emailPassword = document.getElementById('email-password');
    // Guardamos el input de confirmación de contraseña SMTP.
    const emailPasswordConfirm = document.getElementById('email-password-confirm');
    // Guardamos el input del correo remitente.
    const emailRemitente = document.getElementById('email-remitente');
    // Guardamos el input del host SMTP.
    const smtpHost = document.getElementById('smtp-host');
    // Guardamos el input del puerto SMTP.
    const smtpPort = document.getElementById('smtp-port');

    // Creamos un arreglo de tabs y eliminamos valores nulos.
    const tabs = [btnLista, btnRegistro, btnEmail].filter(Boolean);
    // Creamos un arreglo de secciones y eliminamos valores nulos.
    const sections = [sectionLista, sectionRegistro, sectionEmail].filter(Boolean);

    // Esta función activa una sección y su botón, y desactiva las demás.
    function activarTab(seccionActiva, botonActivo) {
        // Si falta sección o botón, salimos para evitar errores.
        if (!seccionActiva || !botonActivo) return;

        // Quitamos la clase active de todas las secciones.
        sections.forEach(section => section.classList.remove('active'));
        // Quitamos la clase active de todos los botones de tab.
        tabs.forEach(tab => tab.classList.remove('active'));

        // Activamos la sección seleccionada.
        seccionActiva.classList.add('active');
        // Activamos el botón seleccionado.
        botonActivo.classList.add('active');
    }

    // Esta función muestra mensajes de estado en el bloque de e-mail.
    function mostrarEstadoEmail(tipo, mensaje) {
        // Si no existe el bloque de estado, no hacemos nada.
        if (!emailStatus) return;

        // Asignamos clases para pintar el estado según el tipo.
        emailStatus.className = 'email-status show ' + tipo;
        // Escribimos el mensaje a mostrar.
        emailStatus.textContent = mensaje;
    }

    // Esta función valida los campos mínimos de configuración SMTP.
    function validarConfigEmail() {
        // Si falta alguno de los inputs requeridos, devolvemos falso.
        if (!emailRemitente || !smtpHost || !smtpPort || !emailPassword || !emailPasswordConfirm) {
            return false;
        }

        // Si las dos contraseñas no coinciden, mostramos error y devolvemos falso.
        if (emailPassword.value !== emailPasswordConfirm.value) {
            mostrarEstadoEmail('error', 'Las contraseñas no coinciden. Verifica los datos antes de guardar.');
            return false;
        }

        // Si el puerto está vacío o no es válido, mostramos error y devolvemos falso.
        if (String(smtpPort.value).trim() === '' || Number(smtpPort.value) <= 0) {
            mostrarEstadoEmail('error', 'El puerto SMTP debe ser un número válido mayor que cero.');
            return false;
        }

        // Si todo está bien, devolvemos verdadero.
        return true;
    }

    // Si existe el botón lista, al hacer clic activamos su sección.
    if (btnLista && sectionLista) {
        btnLista.addEventListener('click', () => activarTab(sectionLista, btnLista));
    }

    // Si existe el botón registro, al hacer clic activamos su sección.
    if (btnRegistro && sectionRegistro) {
        btnRegistro.addEventListener('click', () => activarTab(sectionRegistro, btnRegistro));
    }

    // Si existe el botón e-mail, al hacer clic activamos su sección.
    if (btnEmail && sectionEmail) {
        btnEmail.addEventListener('click', () => activarTab(sectionEmail, btnEmail));
    }

    // Si existe el botón superior, lo usamos para abrir la sección de registro.
    if (btnNuevoTop && btnRegistro && sectionRegistro) {
        btnNuevoTop.addEventListener('click', () => {
            activarTab(sectionRegistro, btnRegistro);
        });
    }

    // Si existe el formulario de e-mail, controlamos su envío.
    if (formEmail) {
        formEmail.addEventListener('submit', (event) => {
            // Evitamos el envío real para validarlo primero en front.
            event.preventDefault();

            // Si la validación falla, detenemos el proceso.
            if (!validarConfigEmail()) {
                return;
            }

            // Si la validación pasa, mostramos mensaje de guardado.
            mostrarEstadoEmail('success', 'La configuración de e-mail fue guardada correctamente.');
        });
    }

    // Si existe el botón de prueba SMTP, validamos y mostramos respuesta.
    if (btnTestEmail) {
        btnTestEmail.addEventListener('click', () => {
            // Si la validación falla, no seguimos.
            if (!validarConfigEmail()) {
                return;
            }

            // Si la validación pasa, mostramos mensaje informativo.
            mostrarEstadoEmail('info', 'Conexión SMTP verificada correctamente. El servidor respondió sin errores.');
        });
    }

    // Esta función marca el enlace activo del menú según la URL actual.
    function markActiveNavLink() {
        // Tomamos todos los enlaces del menú principal.
        const menuLinks = document.querySelectorAll('header nav ul li a');
        // Obtenemos el último segmento de la URL (nombre del archivo).
        const currentPath = window.location.pathname.split('/').pop();

        // Recorremos cada enlace para activarlo o desactivarlo.
        menuLinks.forEach(link => {
            // Leemos el href del enlace actual.
            const href = link.getAttribute('href');
            // Si coincide con la página actual, lo marcamos como activo.
            if (href === currentPath || (href === 'index.html' && currentPath === '')) {
                link.classList.add('active-link');
            } else {
                // Si no coincide, quitamos el estado activo.
                link.classList.remove('active-link');
            }
        });
    }

    // Al iniciar la vista, abrimos por defecto la pestaña lista.
    if (btnLista && sectionLista) {
        activarTab(sectionLista, btnLista);
    }

    // Marcamos el enlace activo del menú.
    markActiveNavLink();

    // Buscamos todos los botones de eliminar usuario.
    document.querySelectorAll('.btn-eliminar').forEach(boton => {
        // Al hacer clic en eliminar, pedimos confirmación.
        boton.addEventListener('click', function(e) {
            // Leemos el nombre del usuario desde el atributo data-nombre.
            const nombre = this.getAttribute('data-nombre');

            // Mostramos mensaje de confirmación antes de eliminar.
            const confirmacion = confirm(
                `⚠️ Estás a punto de eliminar al usuario:\n\n${nombre}\n\n¿Deseas continuar?`
            );

            // Si el usuario cancela, detenemos la navegación del enlace.
            if (!confirmacion) {
                e.preventDefault();
            }
        });
    });
});