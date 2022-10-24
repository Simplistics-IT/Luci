const ApiKey = localStorage.getItem('token');
const URL = `https://luci-data-api-oun4264ida-uc.a.run.app`;
const consultarPedido = `/Orders/getOrders?`;
let defaultSize = 10;
let currentPage = 1;
