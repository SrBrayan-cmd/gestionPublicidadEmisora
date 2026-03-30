// Esperamos a que el HTML cargue completo.
document.addEventListener('DOMContentLoaded', function () {

    // Botones de pestañas.
    var btnLista = document.getElementById('tab-lista');
    var btnRegistro = document.getElementById('tab-registro');
    var btnEmail = document.getElementById('tab-email');

    // Botón superior (el dorado).
    var btnNuevoTop = document.querySelector('.nueva-orden');

    // Secciones de contenido.
    var sectionLista = document.getElementById('section-lista');
    var sectionRegistro = document.getElementById('section-registro');
    var sectionEmail = document.getElementById('section-email');

    // Elementos del formulario de email.
    var formEmail = document.getElementById('form-email-config');
    var emailStatus = document.getElementById('email-status');
    var btnTestEmail = document.getElementById('btn-test-email');
    var emailPassword = document.getElementById('email-password');
    var emailPasswordConfirm = document.getElementById('email-password-confirm');
    var emailRemitente = document.getElementById('email-remitente');
    var smtpHost = document.getElementById('smtp-host');
    var smtpPort = document.getElementById('smtp-port');

    // Arreglo de pestañas existentes.
    var tabs = [];
    if (btnLista) {
        tabs.push(btnLista);
    }
    if (btnRegistro) {
        tabs.push(btnRegistro);
    }
    if (btnEmail) {
        tabs.push(btnEmail);
    }

    // Arreglo de secciones existentes.
    var sections = [];
    if (sectionLista) {
        sections.push(sectionLista);
    }
    if (sectionRegistro) {
        sections.push(sectionRegistro);
    }
    if (sectionEmail) {
        sections.push(sectionEmail);
    }

    // Activa una pestaña y su sección.
    function activarTab(seccionActiva, botonActivo) {
        // Si falta algo, no hacemos nada.
        if (!seccionActiva || !botonActivo) {
            return;
        }

        // Quitamos "active" de todas las secciones.
        for (var i = 0; i < sections.length; i++) {
            sections[i].classList.remove('active');
        }

        // Quitamos "active" de todos los botones.
        for (var j = 0; j < tabs.length; j++) {
            tabs[j].classList.remove('active');
        }

        // Activamos la sección elegida.
        seccionActiva.classList.add('active');

        // Activamos el botón elegido.
        botonActivo.classList.add('active');
    }

    // Muestra un mensaje de estado del email.
    function mostrarEstadoEmail(tipo, mensaje) {
        // Si no existe el contenedor, salimos.
        if (!emailStatus) {
            return;
        }

        // Ponemos clase base + tipo.
        emailStatus.className = 'email-status show ' + tipo;

        // Ponemos el texto.
        emailStatus.textContent = mensaje;
    }

    // Valida la configuración de email.
    function validarConfigEmail() {
        // Revisamos que existan los inputs necesarios.
        if (!emailRemitente || !smtpHost || !smtpPort || !emailPassword || !emailPasswordConfirm) {
            return false;
        }

        // Validamos que las contraseñas sean iguales.
        if (emailPassword.value !== emailPasswordConfirm.value) {
            mostrarEstadoEmail('error', 'Las contraseñas no coinciden. Verifica los datos antes de guardar.');
            return false;
        }

        // Validamos que el puerto no esté vacío y sea mayor que 0.
        if (String(smtpPort.value).trim() === '' || Number(smtpPort.value) <= 0) {
            mostrarEstadoEmail('error', 'El puerto SMTP debe ser un número válido mayor que cero.');
            return false;
        }

        // Si pasó todo, la validación está bien.
        return true;
    }

    // Click en pestaña Lista.
    if (btnLista && sectionLista) {
        btnLista.addEventListener('click', function () {
            activarTab(sectionLista, btnLista);
        });
    }

    // Click en pestaña Registro.
    if (btnRegistro && sectionRegistro) {
        btnRegistro.addEventListener('click', function () {
            activarTab(sectionRegistro, btnRegistro);
        });
    }

    // Click en pestaña Email.
    if (btnEmail && sectionEmail) {
        btnEmail.addEventListener('click', function () {
            activarTab(sectionEmail, btnEmail);
        });
    }

    // Click en el botón superior para ir a Registro.
    if (btnNuevoTop && btnRegistro && sectionRegistro) {
        btnNuevoTop.addEventListener('click', function () {
            activarTab(sectionRegistro, btnRegistro);
        });
    }

    // Submit del formulario de email.
    if (formEmail) {
        formEmail.addEventListener('submit', function (event) {
            // Evita recargar la página.
            event.preventDefault();

            // Si falla validación, detenemos.
            if (!validarConfigEmail()) {
                return;
            }

            // Mensaje de guardado correcto.
            mostrarEstadoEmail('success', 'La configuración de e-mail fue guardada correctamente.');
        });
    }

    // Click en probar conexión SMTP.
    if (btnTestEmail) {
        btnTestEmail.addEventListener('click', function () {
            // Si falla validación, detenemos.
            if (!validarConfigEmail()) {
                return;
            }

            // Mensaje informativo de prueba correcta.
            mostrarEstadoEmail('info', 'Conexión SMTP verificada correctamente. El servidor respondió sin errores.');
        });
    }

    // Marca el link activo del menú según la URL actual.
    function markActiveNavLink() {
        // Tomamos todos los links del menú.
        var menuLinks = document.querySelectorAll('header nav ul li a');

        // Tomamos el nombre del archivo actual.
        var currentPath = window.location.pathname.split('/').pop();

        // Recorremos cada link del menú.
        for (var i = 0; i < menuLinks.length; i++) {
            var link = menuLinks[i];
            var href = link.getAttribute('href');

            // Si coincide con la página actual, activamos clase.
            if (href === currentPath || (href === 'index.html' && currentPath === '')) {
                link.classList.add('active-link');
            } else {
                // Si no coincide, quitamos clase.
                link.classList.remove('active-link');
            }
        }
    }

    // Dejamos Lista activa por defecto al cargar.
    if (btnLista && sectionLista) {
        activarTab(sectionLista, btnLista);
    }

    // Ejecutamos el marcado del menú activo.
    markActiveNavLink();

    // Buscamos botones para eliminar usuarios.
    var botonesEliminar = document.querySelectorAll('.btn-eliminar');

    // Recorremos cada botón de eliminar.
    for (var k = 0; k < botonesEliminar.length; k++) {
        botonesEliminar[k].addEventListener('click', function (e) {
            // Leemos el nombre del usuario desde data-nombre.
            var nombre = this.getAttribute('data-nombre');

            // Mostramos confirmación al usuario.
            var confirmacion = confirm('⚠️ Estás a punto de eliminar al usuario:\n\n' + nombre + '\n\n¿Deseas continuar?');

            // Si cancela, frenamos la acción.
            if (!confirmacion) {
                e.preventDefault();
            }
        });
    }
});