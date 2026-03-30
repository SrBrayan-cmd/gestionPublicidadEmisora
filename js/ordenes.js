// Esperamos a que el HTML esté cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Botón de pestaña Lista.
    var btnLista = document.getElementById('tab-lista');

    // Botón de pestaña Registro.
    var btnRegistro = document.getElementById('tab-registro');

    // Botón de pestaña Factura.
    var btnFactura = document.getElementById('tab-factura');

    // Botón de pestaña Certificación.
    var btnCertificacion = document.getElementById('tab-certificacion');

    // Sección Lista.
    var sectionLista = document.getElementById('lista');

    // Sección Registro.
    var sectionRegistro = document.getElementById('registro');

    // Sección Factura.
    var sectionFactura = document.getElementById('factura');

    // Sección Certificación.
    var sectionCertificacion = document.getElementById('certificacion');

    // Botón interno para ir a Factura.
    var btnGoFactura = document.getElementById('btn-go-factura');

    // Botón interno para ir a Certificación.
    var btnGoCertificacion = document.getElementById('btn-go-certificacion');

    // Arreglo con pestañas existentes.
    var tabs = [];
    if (btnLista) {
        tabs.push(btnLista);
    }
    if (btnRegistro) {
        tabs.push(btnRegistro);
    }
    if (btnFactura) {
        tabs.push(btnFactura);
    }
    if (btnCertificacion) {
        tabs.push(btnCertificacion);
    }

    // Arreglo con secciones existentes.
    var sections = [];
    if (sectionLista) {
        sections.push(sectionLista);
    }
    if (sectionRegistro) {
        sections.push(sectionRegistro);
    }
    if (sectionFactura) {
        sections.push(sectionFactura);
    }
    if (sectionCertificacion) {
        sections.push(sectionCertificacion);
    }

    // Activa una sección y su pestaña.
    function activarTab(seccionActiva, botonActivo) {
        // Si falta algo, salimos.
        if (!seccionActiva || !botonActivo) {
            return;
        }

        // Quitamos active de todas las secciones.
        for (var i = 0; i < sections.length; i++) {
            sections[i].classList.remove('active');
        }

        // Quitamos active de todas las pestañas.
        for (var j = 0; j < tabs.length; j++) {
            tabs[j].classList.remove('active');
        }

        // Activamos la sección elegida.
        seccionActiva.classList.add('active');

        // Activamos la pestaña elegida.
        botonActivo.classList.add('active');
    }

    // Al cargar, dejamos Lista activa por defecto.
    if (btnLista && sectionLista) {
        activarTab(sectionLista, btnLista);
    }

    // Evento de pestaña Lista.
    if (btnLista && sectionLista) {
        btnLista.addEventListener('click', function () {
            activarTab(sectionLista, btnLista);
        });
    }

    // Evento de pestaña Registro.
    if (btnRegistro && sectionRegistro) {
        btnRegistro.addEventListener('click', function () {
            activarTab(sectionRegistro, btnRegistro);
        });
    }

    // Evento de pestaña Factura.
    if (btnFactura && sectionFactura) {
        btnFactura.addEventListener('click', function () {
            activarTab(sectionFactura, btnFactura);
        });
    }

    // Evento de pestaña Certificación.
    if (btnCertificacion && sectionCertificacion) {
        btnCertificacion.addEventListener('click', function () {
            activarTab(sectionCertificacion, btnCertificacion);
        });
    }

    // Evento del botón interno "ir a factura".
    if (btnGoFactura && btnFactura && sectionFactura) {
        btnGoFactura.addEventListener('click', function () {
            activarTab(sectionFactura, btnFactura);
        });
    }

    // Evento del botón interno "ir a certificación".
    if (btnGoCertificacion && btnCertificacion && sectionCertificacion) {
        btnGoCertificacion.addEventListener('click', function () {
            activarTab(sectionCertificacion, btnCertificacion);
        });
    }

    // Tomamos links del menú superior.
    var menuLinks = document.querySelectorAll('header nav ul li a');

    // Archivo actual en minúsculas.
    var currentPath = window.location.pathname.split('/').pop().toLowerCase();

    // Recorremos links y marcamos el activo.
    for (var k = 0; k < menuLinks.length; k++) {
        // Link actual.
        var link = menuLinks[k];

        // Href del link actual en minúsculas.
        var href = (link.getAttribute('href') || '').toLowerCase();

        // Si coincide con la ruta actual, activamos clase.
        if (href === currentPath || (href === 'index.html' && (currentPath === '' || currentPath === 'index.html'))) {
            link.classList.add('active-link');
        } else {
            // Si no coincide, quitamos clase.
            link.classList.remove('active-link');
        }
    }
});