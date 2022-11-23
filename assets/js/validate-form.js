/* Variables para conexión */
const URL = 'https://luci-data-api-oun4264ida-uc.a.run.app/';
const createManualPortfolio = "Portfolio/createManualPortfolio?";
const APIKEY = localStorage.getItem('token');

/* Variables para enviar la info */
const inputImagen = document.getElementById('input-imagen');
const btnSendManualOrder = document.getElementById('btn-agregar-pedido');
const fileCustom = document.querySelector('.file-custom');
const invalidImgFeedback = document.querySelector('.invalid-img-feedback');
const inputsIngresoManual = document.querySelectorAll('.input-ingreso-manual');
const formData = new FormData();
let dataToSend = '';

function cargaImagen() {
    const archivoSeleccionado = inputImagen.files[0];
    if (archivoSeleccionado.type === 'image/png' || archivoSeleccionado.type === 'image/jpeg' || archivoSeleccionado.type === 'image/jpg') {
        invalidImgFeedback.style.display = 'none';
        fileCustom.setAttribute('data-content', archivoSeleccionado.name);
        formData.append(inputImagen.name, archivoSeleccionado);
    } else {
        invalidImgFeedback.style.display = 'block';
    }

}

async function sendManualOrder(e) {
    e.preventDefault();
    inputsIngresoManual.forEach( input => {
        if (input.value != '' && input.name != '') {
            dataToSend += `${input.name}=${input.value}&`;
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
        } else {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        }
            
    });//Para recibir los datos de los campos del formulario
    console.log(dataToSend);

    let manualFormSend = await fetch( `${URL}${createManualPortfolio}${dataToSend}`, {
        method: "POST",
        headers: {
            "Authorization" : "Bearer " + APIKEY
        },
        body: formData
    }).then( serverResponse => console.log( serverResponse ));
}

inputImagen.addEventListener('change', cargaImagen);
btnSendManualOrder.addEventListener('click', sendManualOrder);
