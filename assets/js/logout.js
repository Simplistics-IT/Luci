const btnLogout = document.getElementById('btn-logout');

function logout() {
    localStorage.clear();
    window.location.href = "../../login.html";
    console.log('Cerraste sesión correctamente');
}

btnLogout.addEventListener('click', logout);