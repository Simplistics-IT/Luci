/* Archivo principal del proyecto */
window.addEventListener('DOMContentLoaded', event => {

    //Variables para añadir el sidebar y el navbar

    /*const navbar = document.getElementById("navbar");
    const sidebar = document.getElementById("sidebar");

    async function includeHTML() {
        const dirNavbar = await fetch('../../componentes/navbar.html');
        const navbarElem = await dirNavbar.text();
        const dirSidebar = await fetch('../../componentes/sidebar.html');
        const sidebarElem = await dirSidebar.text();

        navbar.innerHTML = navbarElem;
        sidebar.innerHTML = sidebarElem;
    }

    includeHTML();
    */
    //Cambio de idioma
    const traduccion = {
        en : {
            navbar : [
                'Select language', 
                'Spanish', 
                'English',
                'Logout'
            ],
            sidebar : [ 
                'Dashboard', 
                'Orders', 
                'Guides', 
                'Inventory', 
                'Portfolio', 
                'Purchases', 
                'Returns', 
                'Downloads', 
                'Settings', 
                'Support', 
                'Luci © 2022 All rights reserved', 
                'Developed by Teclab',
                'Manual',
                'Consult',
                'Import'
            ],
            index : [
                'Dasboard', 
                'Welcome to Luci!', 
                'Quick Access', 
                'Here you can find some quick access', 
                'Insert order manually', 
                'Consult orders', 
                'Add portfolio manually', 
                'Consult portfolio', 
                'Consult Inventory', 
                'Recent Activity', 
                'Here you can see your activity', 
                'There is no activity yet', 
                'Consult guide', 
                'Type your guide number to make a quick consult', 
                'Shopify', 
                'Luci', 
                'Programmed', 
                'Prepared',
                'This month'
            ],
    
        },
        es : {
            navbar : [
                'Cambiar idioma', 
                'Español', 
                'Inglés',
                'Cerrar sesión'
            ],
            sidebar : [ 
                'Dashboard', 
                'Pedidos', 
                'Guías', 
                'Inventario', 
                'Portafolio', 
                'Compras', 
                'Devoluciones', 
                'Descargas', 
                'Configuración', 
                'Soporte', 
                'Luci © 2022 Todos los derechos reservados', 
                'Desarrollado por Teclab',
                'Manual',
                'Consultar',
                'Importar'
            ],
            index : [
                'Dasboard', 
                '¡Bienvenido a Luci!', 
                'Accesos rápidos', 
                'Aquí puedes encontrar algunos accesos directos', 
                'Insertar pedido manual', 
                'Consultar pedidos', 
                'Ingreso manual de portafolio', 
                'Consultar portafolio', 
                'Consultar inventario', 
                'Actividad Reciente', 
                'Aquí podrás ver tu actividad', 
                'Aún no hay ninguna actividad disponible', 
                'Consultar Guía', 
                'Ingresa un número de guía para hacer una consulta rápida', 
                'Shopify', 
                'Luci', 
                'Programado', 
                'Preparados',
                'Este mes'
            ],
    
        }
    }
    const moduloActual = document.querySelector('body');
    const selIdiomaEs = document.getElementById('es');//Variable idioma español
    const selIdiomaEn = document.getElementById('en');//Variable idioma inglés
    const textChange = document.querySelectorAll('.text-change');



    //Variables de conexión e información del usuario
    const URL = `https://luci-data-api-oun4264ida-uc.a.run.app/User/getUserInfo`;
    const ApiKey = localStorage.getItem('token');
    let authHeaders = new Headers();
    const userImgProfile = document.getElementById('user-img-profile');
    const userName = document.getElementById('user-name');

    function cambiaIdioma(e) {
            let idBoton = e.currentTarget.id;
            switch (idBoton) {
                case 'es':
                    cambiaIdiomaEs();
                    break;
                case 'en':
                    cambiaIdiomaEn(moduloActual.id);
                    break;
            }

        
    }

    function cambiaIdiomaEs() {
        location.reload();
    }

    function cambiaIdiomaEn(pagina) {

        traduccion.es.sidebar.map((elemento, index) => {
            textChange.forEach( texto => {
                if(texto.textContent === elemento) {
                    texto.textContent = traduccion.en.sidebar[index];
                }
            });
        });

        traduccion.es.navbar.map((elemento, index) => {
            textChange.forEach( texto => {
                if(texto.textContent === elemento) {
                    texto.textContent = traduccion.en.navbar[index];
                }
            });
        });

        traduccion.es[pagina].map((elemento, index) => {
            textChange.forEach( texto => {
                if(texto.textContent === elemento) {
                    texto.textContent = traduccion.en[pagina][index];
                }
            });
        });


    }

    //Función del sidebar
    function showSidebar(btnToggleId, btnIconId, asideWidth, paddingChange) { //Obtenemos los valores de los elementos que se modificaran
            const btnToggle = document.getElementById(btnToggleId),//Botón del menú
                btnIcon = document.getElementById(btnIconId),//Ícono del botón de menú
                elemAsideWidth = document.querySelector(asideWidth),//Elemento aside
                elemPaddingChange = document.getElementsByClassName(paddingChange);//Elementos a los que se les cambiará el padding
                btnToggle.addEventListener('click', () => {

                    //Cambiamos el ícono del menú cuando está abierto
                    btnIcon.classList.toggle('fa-bars');
                    btnIcon.classList.toggle('fa-arrow-left');

                    //Abrimos el sidebar cuando se pulsa el botón de menú
                    elemAsideWidth.classList.toggle('aside-change');

                    //Cambiamos el padding del navbar, main y footer para adaptarse cuando el menú está abierto
                    for (let i = 0; i < elemPaddingChange.length; i++) {
                        elemPaddingChange[i].classList.toggle('padding-change');
                    }
                });
    }
        
    authHeaders.append("Authorization", "Bearer " + ApiKey);


    //Función para asignar la foto del usuario y el nombre del perfil
    async function requestUserInfo() {
        let userInfoRes = await fetch( URL, {
            method: "GET",
            headers: authHeaders
        });

        let userInfoData = await userInfoRes.json();
        if (userInfoRes.status === 200 && !localStorage.getItem('username') && !localStorage.getItem('imgUrl')) {
            localStorage.setItem('username', userInfoData.Username);
            localStorage.setItem('imgUrl', userInfoData.ImgUrl);
        }

        userName.textContent = localStorage.getItem('username');
        userImgProfile.setAttribute('src', localStorage.getItem('imgUrl'));
    }

    function verifySession() {
        if ( localStorage.getItem('token') === null ) {
            location.href = '../../login.html' ;
        }
    }

    showSidebar('btn-sidebar-toggle', 'btn-sidebar-icon' , '.aside' ,'padding-base');
    verifySession();
    if (!localStorage.getItem('username') && !localStorage.getItem('imgUrl')) {
        requestUserInfo();
    } else {
        userName.textContent = localStorage.getItem('username');
        userImgProfile.setAttribute('src', localStorage.getItem('imgUrl'));
    }
    selIdiomaEn.addEventListener('click', cambiaIdioma);
    selIdiomaEs.addEventListener('click', cambiaIdioma);
});