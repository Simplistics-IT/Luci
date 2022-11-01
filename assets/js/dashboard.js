//Variables para los elementos del dashboard
const shopifyOrders = document.getElementById('shopify-orders');
const luciOrders = document.getElementById('luci-orders');
const programmedOrders = document.getElementById('programmed-orders');
const preparedOrders = document.getElementById('prepared-orders');

//Variables de conexión e información del usuario
const URL = `https://luci-data-api-oun4264ida-uc.a.run.app/User/getUserInfo`;
const ApiKey = localStorage.getItem('token');
let authHeaders = new Headers();
authHeaders.append("Authorization", "Bearer " + ApiKey);

async function requestDashboard() {
    let userInfoRes = await fetch( URL, {
        method: "GET",
        headers: authHeaders
    });

    let userInfoData = await userInfoRes.json();
    if (userInfoRes.status === 200) {
        shopifyOrders.textContent = userInfoData.ShopifyOrders;
        luciOrders.textContent = userInfoData.LuciOrders;
        programmedOrders.textContent = userInfoData.ProgrammedActual;
        preparedOrders.textContent = userInfoData.PreparedActual;
    }
}

requestDashboard()