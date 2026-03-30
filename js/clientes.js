// Esperamos a que el contenido HTML esté cargado antes de leer elementos.
document.addEventListener('DOMContentLoaded', () => {
    // Guardamos el botón que abre la pestaña de lista.
    const btnLista = document.getElementById('tab-lista');
    // Guardamos el botón que abre la pestaña de registro.
    const btnRegistro = document.getElementById('tab-registro');
    // Guardamos el botón superior de acción rápida (si existe).
    const btnNuevoTop = document.querySelector('.nueva-orden');

    // Guardamos la sección de listado de clientes.
    const sectionLista = document.getElementById('section-lista');
    // Guardamos la sección de registro de clientes.
    const sectionRegistro = document.getElementById('section-registro');

    // Esta función cambia visualmente entre lista y registro.
    function cambiarTab(seccionAMostrar, seccionAOcultar, botonActivo, botonInactivo) {
        // Ocultamos la sección anterior.
        seccionAOcultar.classList.remove('active');
        // Mostramos la sección seleccionada.
        seccionAMostrar.classList.add('active');

        // Marcamos el botón activo.
        botonActivo.classList.add('active');
        // Quitamos estado activo del botón inactivo.
        botonInactivo.classList.remove('active');
    }

    // Si todos los elementos existen, configuramos eventos de tabs.
    if (btnLista && btnRegistro && sectionLista && sectionRegistro) {
        // Al hacer clic en lista, mostramos la sección lista.
        btnLista.addEventListener('click', () => {
            cambiarTab(sectionLista, sectionRegistro, btnLista, btnRegistro);
        });

        // Al hacer clic en registro, mostramos la sección registro.
        btnRegistro.addEventListener('click', () => {
            cambiarTab(sectionRegistro, sectionLista, btnRegistro, btnLista);
        });
    }

    // Si existe el botón superior, también lo usamos para abrir registro.
    if (btnNuevoTop && btnLista && btnRegistro && sectionLista && sectionRegistro) {
        // Al hacer clic en el botón superior, abrimos la pestaña de registro.
        btnNuevoTop.addEventListener('click', () => {
            cambiarTab(sectionRegistro, sectionLista, btnRegistro, btnLista);
        });
    }
});