const algorithmia = require('algorithmia');
const fs = require('fs');

const apiKey = "simJsfTIRQXG0pwayRklahVH2sh1";

const client = algorithmia.client(apiKey);

client.algo("demo/Hello")
    .pipe("HAL 9000")
    .then(function(response) {
        console.log(response.get());
    });

const jsonInput = {
    "docsList": [
        "It's apple picking season",
        "The apples are ready for picking"
    ]
}

algoJSON = client.algo("nlp/LDA/1.0.0");

algoJSON.pipe(jsonInput)
    .then(function(response) {
        console.log(response.get());
    });

client.algo("util/WhoopsWrongAlgo")
    .pipe("Hello World")
    .then(function(response) {
        console.log(response.error);
    });

client.algo("demo/Hello?timeout=60&stdout=false")
    .pipe("HAL 9000")
    .then(function(response) {
        console.log(response.get());
    });

const img_directory = client.dir('data://noahcrowley/img_directory');

img_directory.exists(function(exists) {
    if (exists) {
        console.log("Directory already exists");
    } else {
        img_directory.create();
    }
});

const img_file = "data://.my/img_directory/friends.jpg";

client.file(img_file).exists(function(exists) {
    // Check if file exists, if it doesn't create it
    if (exists) {
        console.log("Your file already exists.")
    } else {
        img_directory.putFile("data/friends.jpg");
    }
});

algoCV = client.algo("dlib/FaceDetection/0.2.1");

const input = {
    "images": [
        {
            "url": "data://.my/img_directory/friends.jpg",
            "output": "data://.algo/temp/detected_faces.png"
        }
    ]
}

algoCV.pipe(input)
    .then(function(response) {
        if (response.error) {
            console.log(response.error);
        } else {
            console.log(response.get());
        }
    });

const download_uri = "data://.algo/dlib/FaceDetection/temp/detected_faces.png";

client.file(download_uri).exists(function(exists) {
    if (exists) {
        client.file(download_uri).get(function(err, data) {
            if (err) {
                console.log("Failed to download file.");
                console.log(err);
            } else {
                fs.writeFileSync("data/detected_faces.png", data);
                console.log("Successfully downloaded data.")
            }
        });
    }
});