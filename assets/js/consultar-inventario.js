const ApiKey = localStorage.getItem('token');
const consultTable = document.getElementById('tabla-consulta');
const entries = document.getElementById('entradas-consulta');
const btnPreviousPage = document.getElementById('btn-previous-page');
const btnNextPage = document.getElementById('btn-next-page');
const consultInputSearch = document.getElementById('floatingInputSearch');
//Elementos para ordenar
const thSKU = document.getElementById('SKU');
const thEAN = document.getElementById('EAN');
const thDescription = document.getElementById('Description');
const thEntries = document.getElementById('Entries');
const thOuts = document.getElementById('Outs');
const thInventory = document.getElementById('Inventory');
const thAvailable = document.getElementById('Available');
const thPSP = document.getElementById('PSP');
const thVD = document.getElementById('VD');
const thCoverage = document.getElementById('Coverage');

let defaultSize = 25;
let currentPage = 1;
let url = `https://luci-data-api-oun4264ida-uc.a.run.app/Inventory/getInventory?`;
const URL2 = 'https://luci-data-api-oun4264ida-uc.a.run.app/'
let authHeaders = new Headers();
authHeaders.append("Authorization", "Bearer " + ApiKey);

function clearTable() {
    const tbodyToDelete = document.querySelectorAll('#tbody');

    tbodyToDelete.forEach( tbody => {
        tbody.remove();
    });
}

function renderTable(data) {
    console.log(data);
    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody');
    consultTable.appendChild(tbody);
    data.items.forEach(Element => {
        let row = document.createElement('tr');
        tbody.appendChild(row);

        //Data
        let SKU             = document.createElement('td');
        let EAN             = document.createElement('td');
        let Description     = document.createElement('td');
        let Entries         = document.createElement('td');
        let Outs            = document.createElement('td');
        let Inventory       = document.createElement('td');
        let Available       = document.createElement('td');
        let PSP             = document.createElement('td');
        let VD              = document.createElement('td');
        let Coverage        = document.createElement('td');

        //Nodes 
        row.appendChild(SKU);
        row.appendChild(EAN);
        row.appendChild(Description);
        row.appendChild(Entries)
        row.appendChild(Outs);
        row.appendChild(Inventory);
        row.appendChild(Available);
        row.appendChild(PSP);
        row.appendChild(VD);
        row.appendChild(Coverage);
 
        //Data insertion
        SKU.innerHTML = Element.SKU;
        EAN.innerHTML = Element.EAN;
        Description.innerHTML = Element.Description;
        Entries.innerHTML = Element.Entries;
        Outs.innerHTML = Element.Outs;
        Inventory.innerHTML = Element.Inventory;
        Available.innerHTML = Element.Available;
        PSP.innerHTML = Element.PSP;
        VD.innerHTML = Element.VD;
        Coverage.innerHTML = Number(Element.Coverage).toFixed(2);

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

async function requestOrderBy(orderBy) {
    clearTable(consultTable);
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
    console.log(response);
}

window.addEventListener('load', getData);
entries.addEventListener('change', getEntries);
btnPreviousPage.addEventListener('click', previousPage);
btnNextPage.addEventListener('click', nextPage);
//Eventos de ordenar por
thSKU.addEventListener('click', orderByAction);
thEAN.addEventListener('click', orderByAction);
thDescription.addEventListener('click', orderByAction);
thEntries.addEventListener('click', orderByAction);
thOuts.addEventListener('click', orderByAction);
thInventory.addEventListener('click', orderByAction);
thAvailable.addEventListener('click', orderByAction);
thPSP.addEventListener('click', orderByAction);
thVD.addEventListener('click', orderByAction);
thCoverage.addEventListener('click', orderByAction);

consultInputSearch.addEventListener('change', searchFilter); 



