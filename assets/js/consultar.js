const ApiKey = localStorage.getItem('token');
const consultTable = document.getElementById('tabla-consulta');
const entries = document.getElementById('entradas-consulta');
const btnPreviousPage = document.getElementById('btn-previous-page');
const btnNextPage = document.getElementById('btn-next-page');
const consultInputSearch = document.getElementById('floatingInputSearch');
let defaultSize = 10;
let currentPage = 1;
let url = `https://ce98-186-97-138-162.ngrok.io/getOrders?`;
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



