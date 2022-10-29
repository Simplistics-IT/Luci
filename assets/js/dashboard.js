const URL = `https://luci-data-api-oun4264ida-uc.a.run.app/User/getUserInfo`;
const ApiKey = localStorage.getItem('token');
const userImgProfile = document.getElementById('user-img-profile');
const userName = document.getElementById('user-name');
const shopifyOrders = document.getElementById('shopify-orders');
const luciOrders = document.getElementById('luci-orders');
const programmedOrders = document.getElementById('programmed-orders');
const preparedOrders = document.getElementById('prepared-orders');


let authHeaders = new Headers();
authHeaders.append("Authorization", "Bearer " + ApiKey);

async function requestDashboard() {
    let userInfoRes = await fetch( URL, {
        method: "GET",
        headers: authHeaders
    });

    let userInfoData = await userInfoRes.json();
    if (userInfoRes.status === 200 && !localStorage.getItem('username') && !localStorage.getItem('imgUrl')) {
        localStorage.setItem('username', userInfoData.Username);
        localStorage.setItem('imgUrl', userInfoData.ImgUrl);
        shopifyOrders.textContent = userInfoData.ShopifyOrders;
        luciOrders.textContent = userInfoData.LuciOrders;
        programmedOrders.textContent = userInfoData.ProgrammedActual;
        preparedOrders.textContent = userInfoData.PreparedActual;
    } else if (userInfoRes.status === 200) {
        shopifyOrders.textContent = userInfoData.ShopifyOrders;
        luciOrders.textContent = userInfoData.LuciOrders;
        programmedOrders.textContent = userInfoData.ProgrammedActual;
        preparedOrders.textContent = userInfoData.PreparedActual;
    }
    userName.textContent = localStorage.getItem('username');
    userImgProfile.setAttribute('src', localStorage.getItem('imgUrl'));
}
requestDashboard();