// Esperamos a que el HTML cargue completo.
document.addEventListener('DOMContentLoaded', function () {

    // Botón de la pestaña Lista.
    var btnLista = document.getElementById('tab-lista');

    // Botón de la pestaña Registro.
    var btnRegistro = document.getElementById('tab-registro');

    // Botón dorado de arriba.
    var btnNuevoTop = document.querySelector('.nueva-orden');

    // Sección de la pestaña Lista.
    var sectionLista = document.getElementById('section-lista');

    // Sección de la pestaña Registro.
    var sectionRegistro = document.getElementById('section-registro');

    // Función para cambiar entre pestañas.
    function cambiarTab(seccionAMostrar, seccionAOcultar, botonActivo, botonInactivo) {
        // Ocultamos la sección anterior.
        seccionAOcultar.classList.remove('active');

        // Mostramos la nueva sección.
        seccionAMostrar.classList.add('active');

        // Marcamos el botón activo.
        botonActivo.classList.add('active');

        // Quitamos marca del botón inactivo.
        botonInactivo.classList.remove('active');
    }

    // Si existen botones y secciones, agregamos eventos.
    if (btnLista && btnRegistro && sectionLista && sectionRegistro) {
        // Al hacer click en Lista, mostramos Lista.
        btnLista.addEventListener('click', function () {
            cambiarTab(sectionLista, sectionRegistro, btnLista, btnRegistro);
        });

        // Al hacer click en Registro, mostramos Registro.
        btnRegistro.addEventListener('click', function () {
            cambiarTab(sectionRegistro, sectionLista, btnRegistro, btnLista);
        });

        // Si existe el botón dorado, también abre Registro.
        if (btnNuevoTop) {
            btnNuevoTop.addEventListener('click', function () {
                cambiarTab(sectionRegistro, sectionLista, btnRegistro, btnLista);
            });
        }
    }

    // Función que marca el link activo del menú superior.
    function markActiveNavLink() {
        // Tomamos todos los links del menú.
        var menuLinks = document.querySelectorAll('header nav ul li a');

        // Tomamos el archivo actual de la URL.
        var currentPath = window.location.pathname.split('/').pop();

        // Recorremos cada link.
        for (var i = 0; i < menuLinks.length; i++) {
            // Link actual.
            var link = menuLinks[i];

            // Valor href del link actual.
            var href = link.getAttribute('href');

            // Si coincide, lo marcamos como activo.
            if (href === currentPath || (href === 'index.html' && currentPath === '')) {
                link.classList.add('active-link');
            } else {
                // Si no coincide, quitamos activo.
                link.classList.remove('active-link');
            }
        }
    }

    // Ejecutamos la función de menú activo.
    markActiveNavLink();
});