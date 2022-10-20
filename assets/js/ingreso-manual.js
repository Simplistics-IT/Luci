/* Variables para conexión */
const URL = 'https://luci-data-api-oun4264ida-uc.a.run.app/';
const incrementId = "currentIncrement"
const portafolioId = "getPortfolio";
const createManualOrder = 'createManualOrder';
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
let dataToJson = {
    Quantity: 0,
    Total: 0
};

/* Variables para enviar la info */
const btnSendManualOrder = document.getElementById('btn-agregar-pedido');
const inputsIngresoManual = document.querySelectorAll('.input-ingreso-manual');
const inputDireccion = document.querySelectorAll('.direccion');
const inputProductos = document.getElementsByClassName('producto');

function sendManualOrder() {
    let direccion = [];//Array con los datos de la dirección para ser concatenada
    let productosToJson = [];//Array de objetos donde se almacenan los productos
    let objProducto = {};//Con este objeto almaceno cada producto recibido del formulario y luego lo guardo en el arreglo productosToJson

    inputDireccion.forEach( elem => {
        if (elem.value != '')
            direccion.push( elem.value );
        else
            console.warn('No dejes campos vacíos');
    });//Para almacenar los datos de la direccion

    inputsIngresoManual.forEach( input => {
        if (input.value != '' && input.name != '')
            dataToJson[input.name] = input.value;
        else
            console.warn('No dejes campos vacíos');
    });//Para recibir los datos de los campos del formulario

    for (const producto of inputProductos) {
        if (producto.name === 'UnitPrice' && producto.value != undefined) {
            objProducto[producto.name] = producto.value;
            productosToJson.push(objProducto);
            objProducto = {};
        } else if (producto.value != undefined) {
            objProducto[producto.name] = producto.value;
        }
    }//Para almacenar los productos como objetos dentro del array principal: dataToJson

    productosToJson.forEach( producto => {
        producto.Total = String( Number(producto.Quantity) * Number(producto.UnitPrice) );
    });//Calculamos el total de cada producto

    dataToJson['Address'] = direccion.join(' ');//Concatenamos la direccion y la guardamos
    dataToJson['Products'] = productosToJson;//Guardamos los productos en el array principal


    dataToJson.Products.map( producto => {
        dataToJson.Quantity += Number(producto.Quantity);
        dataToJson.Total += Number(producto.Total);
    });

    console.log(JSON.stringify(dataToJson));
}

function agregarProducto() {
    const content = `
        <div class="form-floating col-3">
            <input class="form-control producto" list="portafolio-opciones" id="SKU" name="SKU" placeholder="Nombre de producto" autocomplete="off" required>
            <datalist id="portafolio-opciones">
            </datalist>
            <label for="SKU" class="ms-3">Nombre de producto <span class="text-danger">*</span></label>
        </div> 
        <div class="form-floating col-4">
            <input type="number" class="form-control producto" name="Quantity" placeholder="Cantidad" min="0" required>
            <label for="Quantity" class="ms-3">Cantidad <span class="text-danger">*</span></label>
        </div>    
        <div class="form-floating col-4">
            <input type="number" class="form-control producto" name="UnitPrice" placeholder="Precio" required>
            <label for="UnitPrice" class="ms-3">Precio (Unitario) <span class="text-danger">*</span></label>
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
            id: item.SP_SKU,
            item: item.SP_DESCRIPCION
        });
    });
}

function buscarProducto() {
    portafolioList.forEach( producto => {
        let productoOpcion = document.createElement('option');
        productoOpcion.value = `${producto.id} | ${producto.item}`;
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
        console.log(portafolioData);
        console.log(incrementData);
        llenarPortafolio(portafolioData);
        llenarConsecutivo(incrementData);
    }
    buscarProducto();
}

window.addEventListener('load', getCurrentIncrement);
btnSendManualOrder.addEventListener('click', sendManualOrder);
btnAgregarProducto.addEventListener('click', agregarProducto);
