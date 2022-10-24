const ApiKey = localStorage.getItem('token');
const consultTable = document.getElementById('tabla-consulta');
const entries = document.getElementById('entradas-consulta');
const btnPreviousPage = document.getElementById('btn-previous-page');
const btnNextPage = document.getElementById('btn-next-page');
const consultInputSearch = document.getElementById('floatingInputSearch');
let defaultSize = 10;
let currentPage = 1;
let url = `https://luci-data-api-oun4264ida-uc.a.run.app/Inventory/getInventory?`;
const URL2 = 'https://luci-data-api-oun4264ida-uc.a.run.app/'
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
consultInputSearch.addEventListener('change', searchFilter); 



