const response = await fetch( `../../assets/json/ciudades.json`);
const data = await response.json();
const inputDepartamento = document.getElementById('Department');
const inputCiudades = document.getElementById('City');

data.forEach( departamento => {
    let opt = document.createElement('option');
    opt.value = departamento.id;
    opt.textContent += departamento.departamento;
    inputDepartamento.appendChild(opt);
});

inputDepartamento.addEventListener( "change", function(e) {
    inputCiudades.innerHTML = '';
    data[e.target.value].ciudades.forEach( ciudad => {
        let opt = document.createElement('option');
        opt.value = ciudad;
        opt.textContent += ciudad;
        inputCiudades.append(opt);
    });
});
