window.addEventListener('DOMContentLoaded', event => {
    const showSidebar = (btnToggleId, btnIconId, asideWidth, paddingChange) => { //Obtenemos los valores de los elementos que se modificaran

        const btnToggle = document.getElementById(btnToggleId),//Botón del menú
            btnIcon = document.getElementById(btnIconId),//Ícono del botón de menú
            elemAsideWidth = document.querySelector(asideWidth),//Elemento aside
            elemPaddingChange = document.getElementsByClassName(paddingChange);//Elementos a los que se les cambiará el padding
            btnToggle.addEventListener('click', () => {

                //Cambiamos el ícono del menú cuando está abierto
                btnIcon.classList.toggle('fa-xmark');

                //Abrimos el sidebar cuando se pulsa el botón de menú
                elemAsideWidth.classList.toggle('aside-change');

                //Cambiamos el padding del navbar, main y footer para adaptarse cuando el menú está abierto
                for (let i = 0; i < elemPaddingChange.length; i++) {
                    elemPaddingChange[i].classList.toggle('padding-change');
                }
            });
    }
    
    showSidebar('btn-sidebar-toggle', 'btn-sidebar-icon' , '.aside' ,'padding-base');// Llamamos a la función que muestra el sidebar con los valores de id o clases como parametros
});    

    