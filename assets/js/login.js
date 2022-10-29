const btnSubmit = document.getElementById("btn-submit");
const inputEmail = document.getElementById("input-email");
const inputPassword = document.getElementById("input-password");
alertify.set('notifier','position', 'top-center');

async function login() {
    const url= "https://luci-data-api-oun4264ida-uc.a.run.app/login";
    const formData = new FormData();
    if(inputEmail.value === '' || inputPassword.value === '') {
        alertify.error('No dejes espacios en blanco');
    } else {
        formData.append("username", inputEmail.value);
        formData.append("password", inputPassword.value);
    
        let loginResponse = await fetch( url, {
                method: "POST",
                body: formData,
        });
        let loginData = await loginResponse.json();

        if (loginResponse.status === 200) {
            await alertify.notify(`Bienvenido, ${loginData.Name}`, 'success', 3, function(){  console.log('dismissed'); });
            localStorage.setItem('token', loginData.Token);
            localStorage.setItem('name', loginData.Name);
            localStorage.setItem('email', loginData.Email);
            location.href = "index.html";
        } else {
            alertify.error('Usuario o contraseña incorrectos');
            throw Error("Daniel es gei");
        }
    }
}
btnSubmit.addEventListener( 'click', login );