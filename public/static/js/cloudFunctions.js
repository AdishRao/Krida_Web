// http request object
var Request = new XMLHttpRequest();

// Basic url template
var getURL = (functionName, params) => {
    return `https://us-central1-krida-db.cloudfunctions.net/${functionName}/params?${params}`
}

// for the xhttpReq
var RequestJSON = (functionName, params) => {
    Request.open("GET", 
    getURL(functionName, params),
    false);
    Request.send(null);
    return JSON.parse(Request.response);
}

// // for the xhttpReq
var RequestText = (functionName, params) => {
    Request.open("GET", 
    getURL(functionName, params),
    false);
    Request.send(null);
    return Request.responseText;
}
