const algorithmia = require('algorithmia');

let client = algorithmia.client("simJsfTIRQXG0pwayRklahVH2sh1");

client.algo("demo/Hello")
    .pipe("HAL 9000")
    .then(function(response) {
        console.log(response.get());
    });
