async function generateCities() {
    const response = await fetch( `../../assets/json/ciudades.json`);
    const data = await response.json();
    const inputDepartamento = document.getElementById('Department');
    const inputCiudades = document.getElementById('City');

    for (const departamento in data) {
        let opt = document.createElement('option');
        opt.value = departamento;
        opt.textContent += departamento;
        inputDepartamento.appendChild(opt);
    }

    inputDepartamento.addEventListener( "change", function(e) {
        inputCiudades.innerHTML = '';
        for (const ciudad in data[e.target.value]) {
            let opt = document.createElement('option');
            opt.value = ciudad;
            opt.textContent += ciudad;
            inputCiudades.append(opt);
        }
    });
}

generateCities();
