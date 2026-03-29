// Esperar a que todo el DOM cargue
document.addEventListener('DOMContentLoaded', () => {

    // ==============================
    // 1. SELECTORES SEGUROS
    // ==============================
    const btnLista = document.getElementById('tab-lista');
    const btnRegistro = document.getElementById('tab-registro');
    const btnNuevoTop = document.querySelector('.nueva-orden');

    const sectionLista = document.getElementById('section-lista');
    const sectionRegistro = document.getElementById('section-registro');

    // Validación para evitar errores si algo no existe
    if (!btnLista || !btnRegistro || !sectionLista || !sectionRegistro) {
        console.warn("⚠️ Error: Tabs no encontrados en el DOM");
        return;
    }

    // ==============================
    // 2. FUNCIÓN DE CAMBIO DE TABS
    // ==============================
    function cambiarTab(seccionMostrar, seccionOcultar, botonActivo, botonInactivo) {
        seccionOcultar.classList.remove('active');
        seccionMostrar.classList.add('active');

        botonActivo.classList.add('active');
        botonInactivo.classList.remove('active');
    }

    // ==============================
    // 3. EVENTOS DE TABS
    // ==============================
    btnLista.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarTab(sectionLista, sectionRegistro, btnLista, btnRegistro);
    });

    btnRegistro.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarTab(sectionRegistro, sectionLista, btnRegistro, btnLista);
    });

    // ==============================
    // 4. BOTÓN SUPERIOR "+ NUEVO"
    // ==============================
    if (btnNuevoTop) {
        btnNuevoTop.addEventListener('click', (e) => {
            e.preventDefault();
            cambiarTab(sectionRegistro, sectionLista, btnRegistro, btnLista);

            // Scroll suave hacia el formulario
            sectionRegistro.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ==============================
    // 5. MARCAR LINK ACTIVO DEL NAVBAR
    // ==============================
    function markActiveNavLink() {
        const menuLinks = document.querySelectorAll('header nav ul li a');
        const currentPage = window.location.pathname.split('/').pop();

        menuLinks.forEach(link => {
            const href = link.getAttribute('href');

            if (href === currentPage) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    }

    markActiveNavLink();

    // ==============================
    // 6. OPCIONAL: MANTENER TAB ACTIVO TRAS RECARGA
    // ==============================
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');

    if (tab === 'registro') {
        cambiarTab(sectionRegistro, sectionLista, btnRegistro, btnLista);
    }

});