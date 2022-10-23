const ApiKey = localStorage.getItem('token');
const consultTable = document.getElementById('tabla-consulta');
const entries = document.getElementById('entradas-consulta');
const btnPreviousPage = document.getElementById('btn-previous-page');
const btnNextPage = document.getElementById('btn-next-page');
const consultInputSearch = document.getElementById('floatingInputSearch');
let defaultSize = 10;
let currentPage = 1;
let url = `https://luci-data-api-oun4264ida-uc.a.run.app/Orders/getOrders?`;
const URL2 = 'https://luci-data-api-oun4264ida-uc.a.run.app/'
const COMPLETE_ORDER = 'Orders/getCompleteOrder';
let authHeaders = new Headers();

authHeaders.append("Authorization", "Bearer " + ApiKey);

function clearTable() {
    consultTable.removeChild(consultTable.lastChild);
}

function renderTable(data) {
    console.log(data);
    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody');
    consultTable.appendChild(tbody);
    data.items.forEach(Element => {
        let row = document.createElement('tr');
        row.setAttribute('id', Element.OrderId);
        row.setAttribute('data-bs-toggle', 'modal');
        row.setAttribute('data-bs-target', '#staticBackdrop')
        tbody.appendChild(row);
        row.addEventListener('click', renderModal);

        //Data
        let OrderId             = document.createElement('td');
        let ClientName          = document.createElement('td');
        let Channel             = document.createElement('td');
        let Integration_Date    = document.createElement('td');
        let E_Commerce_Date     = document.createElement('td');
        let Guide_Numer         = document.createElement('td');
        let Shipping_Company    = document.createElement('td');
        let Status              = document.createElement('td');
        let Total               = document.createElement('td');

        //Nodes 
        row.appendChild(OrderId);
        row.appendChild(Integration_Date);
        row.appendChild(ClientName);
        row.appendChild(Channel)
        row.appendChild(Total);
        row.appendChild(E_Commerce_Date);
        row.appendChild(Status);
        row.appendChild(Shipping_Company);
        row.appendChild(Guide_Numer);
 
        //Data insertion
        OrderId.innerHTML = Element.OrderId;
        ClientName.innerHTML = Element.ClientName;
        Channel.innerHTML = Element.Channel;
        Integration_Date.innerHTML = Element.Integration_Date;
        E_Commerce_Date.innerHTML = Element.E_Commerce_Date;
        Guide_Numer.innerHTML = Element.Guide_Numer;
        Shipping_Company.innerHTML = Element.Shipping_Company;
        Status.innerHTML = Element.Status;
        Total.innerHTML = Element.Total;

    });
}

function getEntries() {
        defaultSize = entries.value;
        getData();
}

function nextPage() {
    if (currentPage === 1) {
        btnPreviousPage.classList.remove('disabled');
        currentPage +=1;
        getData();
    } else {
        currentPage +=1;
        getData();
    }
}

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
}

function searchFilter() {
    currentPage = 1;
    url = `${url}&filter=${consultInputSearch.value}`;
    getData();
}

async function renderModal (e) {
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
    const opcionEnvio = document.getElementById('opcion-envio');
    const notaDireccion = document.getElementById('nota-direccion');
    //Elementos para llenar datos de producto
    const padreListaProductos = document.getElementById('lista-productos');
    padreListaProductos.innerHTML = '';
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
    /*opcionEnvio.textContent = data.SP_OPCION_ENVIO;
    notaDireccion.textContent = data.SP_NOTAS_DIRECCION;*/

    data.products.forEach( producto => {
        padreListaProductos.innerHTML += `
        <div class="card mb-3" style="min-width: 10rem; max-width: 33rem;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${producto.ImageSource}" class="img-fluid rounded-start" alt="">
                </div>
                <div class="col-md-8 card-body-background">
                    <div class="card-body">
                    <h6 class="card-title">${producto.Description}</h6>
                    <p class="card-text" >SKU: ${producto.EAN}</p>
                    <p class="card-text" >$ ${producto.Value} x ${producto.Quantity}</p>
                    <p class="card-text" ><span class="fw-bold">Subtotal:</span> $ ${producto.Value * producto.Quantity}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    });


}

async function getData(){
    clearTable();
    let response = await fetch( `${url}&page=${currentPage}&size=${defaultSize}`, {
            method: "GET",
            headers: authHeaders
    });

    let data = await response.json();
    if (response.status === 200) {
        renderTable(data);
    }
}

window.addEventListener('load', getData);
entries.addEventListener('change', getEntries);
btnPreviousPage.addEventListener('click', previousPage);
btnNextPage.addEventListener('click', nextPage);
consultInputSearch.addEventListener('change', searchFilter); 



