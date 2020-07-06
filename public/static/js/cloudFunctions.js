// http request object
var Request = new XMLHttpRequest();

// Basic url template
var getURL = (functionName, params) => {
    return `https://us-central1-krida-db.cloudfunctions.net/${functionName}/params?${params}`
}

// async cloud function call
async function invokeCloudFunction(functionName, params){
    let functionURL = `https://us-central1-krida-db.cloudfunctions.net/${functionName}/params?${params}`;
    let response = await fetch(functionURL);
    response = await response.json();
    return response;
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
