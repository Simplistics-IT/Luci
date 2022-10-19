const btnLogout = document.getElementById('btn-logout');

function logout() {
    localStorage.clear();
    window.location.href = "../../modulos/login.html";
    console.log('Cerraste sesión correctamente');
}




btnLogout.addEventListener('click', logout);