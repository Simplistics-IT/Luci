var ciudades;

const res = await fetch('../Ciudades.json')

ciudades = await res.json()



var depart = document.querySelector('[name="departamentos"]')
var ciud   = document.querySelector('[name="ciudades"]')


ciudades.forEach(departamento => {
    let opt = document.createElement('option')
    opt.value = departamento.id
    opt.textContent += departamento.departamento
    depart.appendChild(opt)
})

depart.addEventListener("change", function(e) {
    ciud.innerHTML = ''
    ciudades[e.target.value].ciudades.forEach(ciudad => {
        let opt = document.createElement('option')
        opt.value = ciudad
        opt.textContent += ciudad
        ciud.append(opt)
    })})
