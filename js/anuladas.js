// Esperamos a que el HTML cargue completo.
document.addEventListener('DOMContentLoaded', function () {

    // Buscamos botón de pestaña "lista".
    var btnLista = document.getElementById('tab-lista');

    // Buscamos botón de pestaña "gestión".
    var btnGestion = document.getElementById('tab-gestion');

    // Buscamos sección de contenido "lista".
    var sectionLista = document.getElementById('section-lista');

    // Buscamos sección de contenido "gestión".
    var sectionGestion = document.getElementById('section-gestion');

    // Esta función cambia entre dos pestañas.
    function cambiarTab(seccionAMostrar, seccionAOcultar, botonActivo, botonInactivo) {
        // Quitamos clase active de la sección que se oculta.
        seccionAOcultar.classList.remove('active');

        // Agregamos clase active a la sección que se muestra.
        seccionAMostrar.classList.add('active');

        // Marcamos el botón activo.
        botonActivo.classList.add('active');

        // Quitamos active del botón inactivo.
        botonInactivo.classList.remove('active');
    }

    // Si existen todos los elementos, agregamos eventos.
    if (btnLista && btnGestion && sectionLista && sectionGestion) {
        // Al hacer click en Lista, mostramos Lista.
        btnLista.addEventListener('click', function () {
            cambiarTab(sectionLista, sectionGestion, btnLista, btnGestion);
        });

        // Al hacer click en Gestión, mostramos Gestión.
        btnGestion.addEventListener('click', function () {
            cambiarTab(sectionGestion, sectionLista, btnGestion, btnLista);
        });
    }

    // Esta función marca el link activo en el menú superior.
    function markActiveNavLink() {
        // Tomamos todos los enlaces del menú.
        var menuLinks = document.querySelectorAll('header nav ul li a');

        // Tomamos el archivo actual de la URL.
        var currentPath = window.location.pathname.split('/').pop();

        // Recorremos todos los enlaces.
        for (var i = 0; i < menuLinks.length; i++) {
            // Guardamos el enlace actual.
            var link = menuLinks[i];

            // Leemos su href.
            var href = link.getAttribute('href');

            // Si coincide, agregamos clase activa.
            if (href === currentPath || (href === 'index.html' && currentPath === '')) {
                link.classList.add('active-link');
            } else {
                // Si no coincide, quitamos clase activa.
                link.classList.remove('active-link');
            }
        }
    }

    // Ejecutamos el marcado de link activo.
    markActiveNavLink();
});