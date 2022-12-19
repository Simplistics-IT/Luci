const selPaisCol = document.getElementById('es');//Variable idioma español
const selPaisUsa = document.getElementById('en');//Variable idioma inglés
const inputDepartamento = document.getElementById('Department');
const inputCiudades = document.getElementById('City');
const URL_COL= `../../assets/json/ciudades.json`;
const URL_USA = `../../assets/json/us_cities.json`;


function limpiarDepartamentos(input) {
    console.log(input.length);
    while (input.lastChild) {
        input.removeChild(input.lastChild);
    }
}

function cambiaCiudades() {
    if(localStorage.getItem('idioma')  === 'en') {
        generateCitiesUsa();
    } else {
        generateCities();
    }

}

async function generateCities() {
    const response = await fetch( URL_COL );
    const data = await response.json();

    for (const departamento in data) {
        let opt = document.createElement('option');
        opt.value = departamento;
        opt.textContent = departamento;
        inputDepartamento.appendChild(opt);
    }

    inputDepartamento.addEventListener( "change", function(e) {
        inputCiudades.innerHTML = '';
        for (const ciudad in data[e.target.value]) {
            console.log(e.target.value);
            let opt = document.createElement('option');
            opt.value = ciudad;
            opt.textContent += ciudad;
            inputCiudades.append(opt);
        }
    });
}

async function generateCitiesUsa() {
    const response = await fetch( URL_USA );
    const data = await response.json();
    limpiarDepartamentos(inputDepartamento);
    for (const departamento in data) {
        let opt = document.createElement('option');
        opt.value = departamento;
        opt.textContent = departamento;
        inputDepartamento.appendChild(opt);
    }

    inputDepartamento.addEventListener( "change", function(e) {
        const departamentos = e.target.value;
        inputCiudades.innerHTML = '';
        data[departamentos].forEach(element => {
            console.log(departamentos);
            let opt = document.createElement('option');
            opt.value = element;
            opt.textContent = element;
            inputCiudades.append(opt);
        });
    });
}

window.addEventListener('DOMContentLoaded', cambiaCiudades);
selPaisCol.addEventListener('click', generateCities);
selPaisUsa.addEventListener('click', generateCitiesUsa);