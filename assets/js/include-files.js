const navbar = document.getElementById("navbar");
const sidebar = document.getElementById("sidebar");
const dirNavbar = '../../componentes/navbar.html';
const dirSidebar = '../../componentes/sidebar.html';

function includeHtml(elem, dir) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', dir);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send();
    xhr.onload = function (data) {
        elem.innerHTML = data.currentTarget.response;
        
    };
} //Hace una petición xmlhttp para incluir un archivo HTML dentro de otro

includeHtml(navbar, dirNavbar);
includeHtml(sidebar, dirSidebar);