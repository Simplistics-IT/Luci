const ApiKey = localStorage.getItem('token');
const consultTable = document.getElementById('tabla-consulta');
const entries = document.getElementById('entradas-consulta');
const btnPreviousPage = document.getElementById('btn-previous-page');
const btnNextPage = document.getElementById('btn-next-page');
const consultInputSearch = document.getElementById('floatingInputSearch');

//Elementos para exportar consultas
const btnExportar = document.getElementById('btn-exportar');

//Valores por defecto del sitio
let defaultSize = 25;
let currentPage = 1;
let currentOrder = 'Description!asc';

//URLs para consumo de la API
const URL_EXPORT = `https://luci-data-api-oun4264ida-uc.a.run.app/Portfolio/export?`;
const URL_PORTFOLIO = `https://luci-data-api-oun4264ida-uc.a.run.app/Portfolio/getPortfolio/Complete?`;
let urlFilter = '';

let authHeaders = new Headers();
authHeaders.append("Authorization", "Bearer " + ApiKey);

function clearTable() {
    const tbodyToDelete = document.querySelectorAll('#tbody');

    tbodyToDelete.forEach( tbody => {
        tbody.remove();
    });
}

function renderTable(data) {
    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody');
    consultTable.appendChild(tbody);
    data.items.forEach(Element => {
        let row = document.createElement('tr');
        tbody.appendChild(row);
        tbody.classList.add('align-middle');

        //Data
        let ImgSource       = document.createElement('td');
        let ImgElem         = document.createElement('img');
        let EAN             = document.createElement('td');
        let SKU             = document.createElement('td');
        let Description     = document.createElement('td');
        let Status          = document.createElement('td');

        //Nodes
        row.appendChild(ImgSource);
        ImgSource.appendChild(ImgElem);
        row.appendChild(SKU);
        row.appendChild(EAN);
        row.appendChild(Description);
        row.appendChild(Status);
        
        //Data insertion
        if (Element.ImgSource === null || Element.ImgSource === '' ) {
            ImgElem.setAttribute('src', 'https://via.placeholder.com/120.png?text=No+hay+imagen');
        } else {
            ImgElem.setAttribute('src', `${Element.ImgSource}`);
            ImgElem.setAttribute('width', '120px');
            ImgElem.setAttribute('height', '120px');
        }
        SKU.innerHTML = Element.SKU;
        EAN.innerHTML = Element.EAN;
        Description.innerHTML = Element.Description;
        Status.innerHTML = Element.Status;

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
    urlFilter = `${URL_PORTFOLIO}&filter=${consultInputSearch.value}`;
    getData();
}

async function exportConsult() {
    let urlUnida = `${URL_EXPORT}per_page=true&filter=${consultInputSearch.value}&page=${currentPage}&size=${defaultSize}`;
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

async function getData(){
    clearTable();
    let response = await fetch( `${URL_PORTFOLIO}filter=${consultInputSearch.value}&page=${currentPage}&size=${defaultSize}`, {
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
//Evento de busqueda por filtro
consultInputSearch.addEventListener('change', searchFilter);
//Evento de exportar
btnExportar.addEventListener('click', exportConsult);



