const listaProductos = document.getElementById('lista-productos');
const inputSku = document.getElementById('input-sku');
const inputCtd = document.getElementById('input-ctd');
const inputPrecio = document.getElementById('input-precio');
const btnAgregarProducto = document.getElementById('btn-agregar-producto');

function agregarProducto() {
    productosFieldset.innerHTML += `
    <div class="row d-flex align-items-center" id="producto-1">
        <div class="form-floating col-2">
            <input type="text" class="form-control" id="input-sku" name="input-sku" placeholder="SKU" required>
            <label for="input-sku" class="ms-3">SKU / Descripción <span class="text-danger">*</span></label>
        </div> 
        <div class="form-floating col-4">
            <input type="number" class="form-control" id="input-ctd" name="input-ctd" placeholder="CTD" min="0" required>
            <label for="input-ctd" class="ms-3">CTD <span class="text-danger">*</span></label>
        </div>    
        <div class="form-floating col-4">
            <input type="number" class="form-control" id="input-precio" name="input-precio" placeholder="Precio" required>
            <label for="input-precio" class="ms-3">Precio (Unitario) <span class="text-danger">*</span></label>
        </div>
        <div class="col-2">
            <button type="button" id="btn-eliminar-producto" class="btn btn-outline-danger btn-lg">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    </div>
    `
}

btnAgregarProducto.addEventListener('click', agregarProducto);