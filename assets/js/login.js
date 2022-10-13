const btnSubmit = document.getElementById("btn-submit");
const inputEmail = document.getElementById("input-email");
const inputPassword = document.getElementById("input-password");

async function login() {
    alertify.set('notifier','position', 'top-center');
    const url= "https://ce98-186-97-138-162.ngrok.io/login";
    const formData = new FormData();
    formData.append("username", inputEmail.value);
    formData.append("password", inputPassword.value);

    let response = await fetch( url, {
            method: "POST",
            body: formData,
    });
    let data = await response.json();

    if (response.status === 200) {
        await alertify.notify(`Bienvenido, ${data.Name}`, 'success', 3, function(){  console.log('dismissed'); });
        localStorage.setItem('token', data.Token);
        localStorage.setItem('name', data.Name);
        localStorage.setItem('email', data.Email);
        location.href = "../../modulos/index.html";
    } else {
        throw Error("Daniel es gei");
    }
}

btnSubmit.addEventListener( 'click', login );