/* Archivo principal del proyecto */

//Variables para añadir el sidebar y el navbar
const navbar = document.getElementById("navbar");
const sidebar = document.getElementById("sidebar");

async function includeHTML() {
    const dirNavbar = await fetch('../../componentes/navbar.html');
    const navbarElem = await dirNavbar.text();
    const dirSidebar = await fetch('../../componentes/sidebar.html');
    const sidebarElem = await dirSidebar.text();

    navbar.innerHTML = navbarElem;
    sidebar.innerHTML = sidebarElem;
}

includeHTML();

