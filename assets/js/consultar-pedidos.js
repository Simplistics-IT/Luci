const ApiKey = localStorage.getItem('token');
const consultTable = document.getElementById('tabla-consulta');
const productTable = document.getElementById('tabla-productos');
const entries = document.getElementById('entradas-consulta');
const btnPreviousPage = document.getElementById('btn-previous-page');
const btnNextPage = document.getElementById('btn-next-page');
const consultInputSearch = document.getElementById('floatingInputSearch');

//Elementos de la cabecera de la tabla para ordenar
const thOrderId = document.getElementById('OrderId');
const thClientName = document.getElementById('ClientName');
const thIntegrationDate = document.getElementById('Integration_Date');
const thGuideNumber = document.getElementById('Guide_Numer');
const thShippingCompany = document.getElementById('Shipping_Company');
const thStatus = document.getElementById('Status');

//Elementos para exportar consultas
const btnExportar = document.getElementById('btn-exportar');
const switchExportarPorPagina = document.getElementById('exportar-por-pagina');
const exportarPorPaginaTexto = document.getElementById('exportar-pagina-texto');

//Valores por defecto del sitio
let defaultSize = 25;
let currentPage = 1;
let exportarPorPagina = true;
let currentOrder = 'Integration_Date!desc';

//URLs para consumo de la API
const URL_EXPORT = `https://luci-data-api-oun4264ida-uc.a.run.app/Orders/export?`;
const URL_ORDERS = `https://luci-data-api-oun4264ida-uc.a.run.app/Orders/getOrders?`;
const URL_COMPLETE_ORDER = 'https://luci-data-api-oun4264ida-uc.a.run.app/Orders/getCompleteOrder?';
let urlFilter = '';
let authHeaders = new Headers();

authHeaders.append("Authorization", "Bearer " + ApiKey);

function clearTableConsult() {
    const tbodyToDelete = document.querySelectorAll('#tbody');

    tbodyToDelete.forEach( tbody => {
        tbody.remove();
    });
}//Función para limpiar la tabla de consultas

function clearTableProducts() {
    const childToDelete = productTable.lastChild;
    productTable.removeChild(childToDelete);
}//Función para limpiar el modal de productos

function asignarEnlaceTransportadora(elemento, transportadora, guia) {
    let enlace = document.createElement('a');
    switch (transportadora) {
        case 'Coordinadora':
            enlace.setAttribute('href', `https://www.coordinadora.com/portafolio-de-servicios/servicios-en-linea/rastrear-guias/?guia=${guia}`);
            enlace.setAttribute('target', '_blank');
            enlace.classList.add('link-dark');
            enlace.textContent = guia;
            elemento.appendChild(enlace);
            break;
        default:
            break;
    }
}

function renderTable(data) {
    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody');
    consultTable.appendChild(tbody);
    data.items.forEach(Element => {
        let row = document.createElement('tr');
        tbody.appendChild(row);

        //Data
        let OrderId             = document.createElement('td');
        let ClientName          = document.createElement('td');
        let Integration_Date    = document.createElement('td');
        let Guide_Numer         = document.createElement('td');
        let Shipping_Company    = document.createElement('td');
        let Status              = document.createElement('td');

        changeOrderStateColor(Element.Status, Status);

        //Insertamos los elementos creados en la fila
        row.appendChild(OrderId);
        row.appendChild(ClientName);
        row.appendChild(Integration_Date);
        row.appendChild(Status);
        row.appendChild(Shipping_Company);
        row.appendChild(Guide_Numer);
 
        //Inserción de los datos dentro de las filas
        OrderId.innerHTML = Element.OrderId;//Le asignamos el valor del elemento
        OrderId.setAttribute('id', Element.OrderId);//Asignamos un ID para saber la información que se mostrará en el modal
        OrderId.addEventListener('click', renderModal);//Asignamos el evento que mostrará el modal
        OrderId.style.cursor = 'pointer';//Le damos estilo de puntero
        OrderId.setAttribute('data-bs-toggle', 'modal');//Asignamos los valores para que el modal pueda mostrarse
        OrderId.setAttribute('data-bs-target', '#staticBackdrop');//Asignamos el ID relacionado con el modal que se va a mostrar

        ClientName.classList.add('text-start');
        ClientName.innerHTML = Element.ClientName;
        Integration_Date.innerHTML = Element.Integration_Date;
        asignarEnlaceTransportadora(Guide_Numer, Element.Shipping_Company, Element.Guide_Numer);
        Shipping_Company.innerHTML = Element.Shipping_Company;

    });
}//Función para renderizar la tabla de consultas

function changeOrderStateColor(orderStatus, statusElem) {
    const spanStatus = document.createElement('span');
    const orderStatusLowerCase = orderStatus.toLowerCase();
    const orderStatusFirstLetterCap = orderStatusLowerCase[0].toUpperCase() + orderStatusLowerCase.slice(1);
    statusElem.appendChild( spanStatus );
    spanStatus.textContent = orderStatusFirstLetterCap;
    if (orderStatus === 'ENTREGADO' || orderStatus === 'ENTREGADA') {
        spanStatus.classList.add('estado-entregado');
    } else if (orderStatus === 'Preparado') {
        spanStatus.classList.add('estado-preparado');
    } else if (orderStatus === 'Programado') {
        spanStatus.classList.add('estado-programado');
    } else {
        spanStatus.classList.add('estado-transportadora');
    }
}//Función para validar los estados de los pedidos

/* Las siguientes son funciones para el filtrado de los datos en la tabla de consulta */

function getEntries() {
        defaultSize = entries.value;
        getData();
}//Función para cambiar la cantidad de datos a mostrar en la tabla

function nextPage() {
    if (currentPage === 1) {
        btnPreviousPage.classList.remove('disabled');
        currentPage +=1;
        getData();
    } else {
        currentPage +=1;
        getData();
    }
}//Función para el cambio de página dentro de las consultas a la siguiente

function previousPage() {
    if (currentPage === 2) {
        btnPreviousPage.classList.add('disabled');//Validamos para desactivar el retroseso en la primera página
        currentPage -= 1;
        getData();
    }
    if (currentPage > 1) {
        currentPage -= 1;
        getData();
    } 
}//Función para el cambio de página dentro de las consultas a la anterior

function searchFilter() {
    currentPage = 1;
    urlFilter = `${URL_ORDERS}filter=${consultInputSearch.value}`;
    getData();
}//Función para el campo de busqueda

/* La siguiente es la función para la exportación de datos */

function cambiarTipoDeExportacion() {
    if(exportarPorPaginaTexto.textContent === 'Exportar por página') {
        exportarPorPagina = false;
        exportarPorPaginaTexto.textContent = "Exportar todo";
    } else {
        exportarPorPagina = true;
        exportarPorPaginaTexto.textContent = "Exportar por página";
    }
}

async function exportConsult() {
    let urlUnida = `${URL_EXPORT}per_page=${exportarPorPagina}&filter=${consultInputSearch.value}&page=${currentPage}&size=${defaultSize}&order_by=${currentOrder}`;
    console.log(urlUnida);
    let response = await fetch( urlUnida, {
        method: "GET",
        headers: authHeaders
    });

    let data = await response.blob();
    if (response.status === 200) {
        let a = document.createElement("a");
        let fileNameDate = new Date();
        a.href = window.URL.createObjectURL(data);
        a.download = `exported-${fileNameDate.getFullYear()}-${fileNameDate.getMonth()}-${fileNameDate.getDate()}-${fileNameDate.getSeconds()}`;
        a.click();
    }
}

async function requestOrderBy(orderBy) {
    clearTableConsult();
    currentOrder = orderBy;
    let response = await fetch( `${URL_ORDERS}filter=${consultInputSearch.value}&page=${currentPage}&size=${defaultSize}&order_by=${currentOrder}`, {
        method: "GET",
        headers: authHeaders
    });

    let data = await response.json();
    if (response.status === 200) {
        renderTable(data);
    }
}

function orderByAction(e) {
    const elemSelected = e.target;
    (elemSelected.classList[1] === 'fa-arrow-up') ? requestOrderBy(`${elemSelected.id}!asc`) : requestOrderBy(`${elemSelected.id}!desc`);
    elemSelected.classList.toggle('fa-arrow-up');
    elemSelected.classList.toggle('fa-arrow-down');
}

async function renderModal (e) {
    clearTableProducts();
    //Order ID del elemento seleccionado
    const idElement = e.currentTarget.id;
    //Elementos para llenar datos del cliente
    const idCliente = document.getElementById('id-cliente');
    const idOrder = document.getElementById('id-order');
    const nombreCliente = document.getElementById('nombre-cliente');
    const telefonoCliente = document.getElementById('telefono-cliente');
    const emailCliente = document.getElementById('email-cliente');
    const departamentoDir = document.getElementById('departamento-dir');
    const municipioDir = document.getElementById('municipio-dir');
    const direccionDir = document.getElementById('direccion-dir');
    //Elementos para llenar datos de producto
    const tbody = document.createElement('tbody');
    let response = await fetch( `${URL_COMPLETE_ORDER}orderNumber=${idElement}`, {
        method: "GET",
        headers: authHeaders
    });
    let data = await response.json();
    idOrder.textContent = data.OrderNumber;
    nombreCliente.textContent = data.ClientName;
    telefonoCliente.textContent = data.PhoneNumber;
    emailCliente.textContent = data.Email;
    departamentoDir.textContent = data.Departament;
    municipioDir.textContent = data.City;
    direccionDir.textContent = data.Address;

    productTable.appendChild(tbody);
    data.products.forEach( product => {
        let row = document.createElement('tr');
        //Data
        let productImg          = document.createElement('td');
        let productSKU          = document.createElement('td');
        let productDescription  = document.createElement('td');
        let productPrice        = document.createElement('td');
        let productAmount       = document.createElement('td');
        let productTotal        = document.createElement('td');

        //Nodes 
        tbody.appendChild(row);
        row.appendChild(productImg);
        row.appendChild(productSKU);
        row.appendChild(productDescription);
        row.appendChild(productPrice);
        row.appendChild(productAmount);
        row.appendChild(productTotal);
 
        //Data insertion
        if(product.ImageSource === null || product.ImageSource === '') {
            productImg.innerHTML = `
            <div class="img-round">
                <img src="https://via.placeholder.com/120.png?text=No+hay+imagen" alt="">
            </div>
            `
        } else {
            productImg.innerHTML = `
            <div class="img-round">
                <img src="${product.ImageSource}" alt="">
            </div>
            `
        }

        productSKU.innerHTML = product.EAN;
        productDescription.innerHTML = product.Description;
        productPrice.innerHTML = product.Value;
        productAmount.classList.add('text-center');
        productAmount.innerHTML = product.Quantity;
        productTotal.innerHTML = `$ ${product.Value * product.Quantity}`;

    });


}

async function getData(){
    clearTableConsult();
    let response = await fetch( `${URL_ORDERS}filter=${consultInputSearch.value}&page=${currentPage}&size=${defaultSize}&order_by=${currentOrder}`, {
            method: "GET",
            headers: authHeaders
    });

    let data = await response.json();
    if (response.status === 200) {
        renderTable(data);
    }
}


//Evento de request de datos
window.addEventListener('load', getData);
//Evento de entradas
entries.addEventListener('change', getEntries);
//Eventos de paginación
btnPreviousPage.addEventListener('click', previousPage);
btnNextPage.addEventListener('click', nextPage);
//Eventos de ordenar por
thOrderId.addEventListener('click', orderByAction);
thClientName.addEventListener('click', orderByAction);
thIntegrationDate.addEventListener('click', orderByAction);
thGuideNumber.addEventListener('click', orderByAction);
thShippingCompany.addEventListener('click', orderByAction);
thStatus.addEventListener('click', orderByAction);
//Evento de busqueda por filtro
consultInputSearch.addEventListener('change', searchFilter);
//Evento de exportar
switchExportarPorPagina.addEventListener('change', cambiarTipoDeExportacion);
btnExportar.addEventListener('click', exportConsult);




