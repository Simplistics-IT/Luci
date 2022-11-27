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
const UrlExportar = `https://luci-data-api-oun4264ida-uc.a.run.app/Orders/export?`;

//Valores por defecto del sitio
let defaultSize = 25;
let currentPage = 1;
let url = `https://luci-data-api-oun4264ida-uc.a.run.app/Orders/getOrders?`;
const URL2 = 'https://luci-data-api-oun4264ida-uc.a.run.app/'
const COMPLETE_ORDER = 'Orders/getCompleteOrder';
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

function renderTable(data) {
    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody');
    consultTable.appendChild(tbody);
    data.items.forEach(Element => {
        let row = document.createElement('tr');
        row.setAttribute('id', Element.OrderId);
        row.setAttribute('data-bs-toggle', 'modal');
        row.setAttribute('data-bs-target', '#staticBackdrop');
        tbody.appendChild(row);
        row.addEventListener('click', renderModal);

        //Data
        let OrderId             = document.createElement('td');
        let ClientName          = document.createElement('td');
        let Integration_Date    = document.createElement('td');
        let Guide_Numer         = document.createElement('td');
        let Shipping_Company    = document.createElement('td');
        let Status              = document.createElement('td');

        changeOrderStateColor(Element.Status, Status);

        //Nodes 
        row.appendChild(OrderId);
        row.appendChild(ClientName);
        row.appendChild(Integration_Date);
        row.appendChild(Status);
        row.appendChild(Shipping_Company);
        row.appendChild(Guide_Numer);
 
        //Data insertion
        OrderId.innerHTML = Element.OrderId;
        ClientName.classList.add('text-start');
        ClientName.innerHTML = Element.ClientName;
        Integration_Date.innerHTML = Element.Integration_Date;
        Guide_Numer.innerHTML = Element.Guide_Numer;
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
        btnPreviousPage.classList.add('disabled');
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
    url = `${url}&filter=${consultInputSearch.value}`;
    getData();
}//Función para el campo de busqueda

/* Las siguiente es la función para la exportación de datos */

async function exportConsult() {
    let urlUnida = `${UrlExportar}per_page=true&filter=${consultInputSearch.value}&page=${currentPage}&size=${defaultSize}`;
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
    let response = await fetch( `${url}&order_by=${orderBy}`, {
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
    let response = await fetch( `${URL2}${COMPLETE_ORDER}?orderNumber=${idElement}`, {
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
    let response = await fetch( `${url}&page=${currentPage}&size=${defaultSize}`, {
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
btnExportar.addEventListener('click', exportConsult);




