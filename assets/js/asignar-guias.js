//Variables de las URLs
const URL_SUBMIT_GUIDE = 'https://luciapi-oun4264ida-uw.a.run.app/test/uploadGuides';
const URL_SUBMIT_WRONG_GUIDE = 'https://luciapi-oun4264ida-uw.a.run.app/test/uploadCorrectedGuide';

//Variables de los elementos 
const inputGuias = document.getElementById('guias');
const inputGuiasMalas = document.getElementById('guias-malas');
const campoAlerta = document.getElementById('alerta');
const btnSubirGuias = document.getElementById('btn-subir-guias');
const btnSubirGuiasMalas = document.getElementById('btn-subir-guias-malas');

function mensajesDeAlerta(mensaje, tipo, elementoPadre) {
    let elementoAlerta = document.createElement('div');
    elementoAlerta.innerHTML = `<div class="alert alert-${tipo} alert-dismissible" role="alert">${mensaje}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
    elementoPadre.appendChild(elementoAlerta);
}//Función que muestra un mensaje si hay un error o si se envía correctamente la info

async function subirGuias(URL, form) {
    let respuestaSubida = await fetch(URL, {
    method : 'POST',
    body : form
    })
    .then(( respuesta ) => {
        if ( respuesta.status === 200 ) {
            mensajesDeAlerta('¡Información ingresada correctamente!', 'success', campoAlerta);
            setTimeout(() => {
                location.reload();
            }, 700);
        } else {
            mensajesDeAlerta('Algo salió mal, revisa los campos faltantes', 'danger', campoAlerta);
        }
    })
    .then(( respuesta ) => blob = respuesta.blob())
    .then(( resultado ) => {
        let elm = document.createElement('a')
        elm.href = URL.createObjectURL( resultado )
        elm.setAttribute('download', "guias_y_rotulos")
        elm.click()
    });
    
}

function eventoBtnSubirGuias() {
    if(btnSubirGuias) {
        const formGuias = new FormData();
        formGuias.append('file', inputGuias.files[0]);
        subirGuias(URL_SUBMIT_GUIDE, formGuias);
    }
}
function eventoBtnSubirGuiasMalas() {
    if(btnSubirGuiasMalas) {
        const formGuiasMalas = new FormData();
        formGuiasMalas.append('file', inputGuiasMalas.files[0]);
        subirGuias(URL_SUBMIT_WRONG_GUIDE, formGuiasMalas);
    }
}

btnSubirGuias.addEventListener('click', eventoBtnSubirGuias);
btnSubirGuiasMalas.addEventListener('click', eventoBtnSubirGuiasMalas);