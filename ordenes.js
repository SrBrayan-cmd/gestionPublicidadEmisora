document.addEventListener('DOMContentLoaded', () => {
    const btnLista = document.getElementById('tab-lista');
    const btnRegistro = document.getElementById('tab-registro');
    const sectionLista = document.getElementById('lista');
    const sectionRegistro = document.getElementById('registro');

    function inicializarVista() {
        if (!btnLista || !btnRegistro || !sectionLista || !sectionRegistro) return;

        sectionLista.classList.add('active');
        sectionRegistro.classList.remove('active');
        btnLista.classList.add('active');
        btnRegistro.classList.remove('active');
    }

    function cambiarTab(seccionAMostrar, seccionAOcultar, botonActivo, botonInactivo) {
        if (!seccionAMostrar || !seccionAOcultar || !botonActivo || !botonInactivo) return;
        seccionAOcultar.classList.remove('active');
        seccionAMostrar.classList.add('active');
        botonActivo.classList.add('active');
        botonInactivo.classList.remove('active');
    }

    if (btnLista && btnRegistro && sectionLista && sectionRegistro) {
        inicializarVista();

        btnLista.addEventListener('click', () => {
            cambiarTab(sectionLista, sectionRegistro, btnLista, btnRegistro);
        });

        btnRegistro.addEventListener('click', () => {
            cambiarTab(sectionRegistro, sectionLista, btnRegistro, btnLista);
        });
    }

    const menuLinks = document.querySelectorAll('header nav ul li a');
    const currentPath = window.location.pathname.split('/').pop().toLowerCase();

    menuLinks.forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        if (href === currentPath || (href === 'index.html' && (currentPath === '' || currentPath === 'index.html'))) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
});