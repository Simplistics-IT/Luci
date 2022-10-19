/* Variables para conexión */
const URL = 'https://luci-data-api-oun4264ida-uc.a.run.app/';
const incrementId = "currentIncrement"
const portafolioId = "getPortfolio";
const APIKEY = localStorage.getItem('token');
let authHeaders = new Headers();
authHeaders.append("Authorization", "Bearer " + APIKEY);

/* Variables para traer consecutivo */
const consecutivo = document.getElementById('input-numero-orden');

/* Variables para sección productos */
const listaProductos = document.getElementById('lista-productos');// Aquí se agregan los productos
const portafolioOpciones = document.getElementById('portafolio-opciones');
const inputCantidad = document.getElementById('input-cantidad');
const inputPrecio = document.getElementById('input-precio');
const btnEliminarProducto = document.querySelector('.btn-eliminar-producto');
const btnAgregarProducto = document.getElementById('btn-agregar-producto');
let portafolioList = [];



function agregarProducto() {
    const content = `
        <div class="form-floating col-3">
            <input class="form-control" list="portafolio-opciones" id="input-nombre-producto" name="input-nombre-producto" placeholder="Nombre de producto" autocomplete="off" required>
            <datalist id="portafolio-opciones">
            </datalist>
            <label for="input-nombre-producto" class="ms-3">Nombre de producto <span class="text-danger">*</span></label>
        </div> 
        <div class="form-floating col-4">
            <input type="number" class="form-control" name="input-cantidad" placeholder="Cantidad" min="0" required>
            <label for="input-cantidad" class="ms-3">Cantidad <span class="text-danger">*</span></label>
        </div>    
        <div class="form-floating col-4">
            <input type="number" class="form-control" name="input-precio" placeholder="Precio" required>
            <label for="input-precio" class="ms-3">Precio (Unitario) <span class="text-danger">*</span></label>
        </div>
        <div class="col-1">
            <button type="button" class="btn btn-outline-danger btn-lg btn-eliminar-producto">
                <i class="fas fa-trash"></i>
            </button>
        </div>`
    const nuevoProducto = document.createElement('div');
    nuevoProducto.classList.add('row', 'd-flex', 'align-items-center', 'mb-2', 'producto');
    nuevoProducto.innerHTML = content;
    listaProductos.append(nuevoProducto);
    nuevoProducto.querySelector('.btn-eliminar-producto').addEventListener('click', eliminarProducto);
}

function eliminarProducto(e) {
    const btnEliminar = e.target;
    const producto = btnEliminar.closest('.producto');
    producto.remove();
}

function llenarConsecutivo(data) {
    if (data) {
        consecutivo.value = data;
        consecutivo.classList('disabled');
    }
}

function llenarPortafolio(data) {
    data.forEach( item => {
        portafolioList.push({
            id: item.EAN,
            item: item.Description
        });
    });
}

function buscarProducto() {
    portafolioList.forEach( producto => {
        let productoOpcion = document.createElement('option');
        productoOpcion.value = producto.item;
        portafolioOpciones.appendChild(productoOpcion);
    });
}

async function getCurrentIncrement() {
    let portafolioResponse = await fetch( `${URL}${portafolioId}`, {
        method: "GET",
        headers: authHeaders
    });
    let incrementResponse = await fetch( `${URL}${incrementId}`, {
            method: "GET",
            headers: authHeaders
    });
    let portafolioData = await portafolioResponse.json();
    let incrementData = await incrementResponse.json();
    if (incrementResponse.status === 200 && portafolioResponse.status === 200) {
        llenarPortafolio(portafolioData);
        llenarConsecutivo(incrementData);
    }
    buscarProducto();
}

window.addEventListener('load', getCurrentIncrement);
btnAgregarProducto.addEventListener('click', agregarProducto);