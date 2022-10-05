const navbar = document.getElementById("navbar");
const sidebar = document.getElementById("sidebar");
const footer = document.getElementById("footer");
const dirNavbar = '../components/navbar.html';
const dirSidebar = '../components/sidebar.html';
const dirFooter = '../components/footer.html';

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
includeHtml(footer, dirFooter);