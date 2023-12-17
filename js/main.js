
// AJAX JSON fecth jsonbin.io


    // let outfits = []

    // const binID = '6574e4200574da7622d2b981'
    // const apiKey = '$2a$10$yMw6jGD8rgxHutZ46mif6upD3rW7bUaRLJMTw7z/GP7uJQT3d8mP.'
    // const url = `https://api.jsonbin.io/v3/b/${binID}`
    // const headers = {
    //     'secret-key': apiKey
    // }

    // fetch(url, { headers })
    //     .then(response => response.json())
    //     .then(data => {
    //         outfits = data.record.outfits;
    //         console.log(outfits);
    //         renderProducts(outfits);
    //     })
    //     .catch(error => {
    //         console.error('Error al cargar datos desde JSONBin.io:', error);
    //     });



// AJAX JSON fetch consumo local

let outfits = [];

// Ruta al archivo JSON local
const jsonFile = '../outfits.json';

// Realizar la solicitud usando fetch
fetch(jsonFile)
    .then(response => {
    if (!response.ok) {
        throw new Error(`Error al cargar el archivo JSON. Estado de la respuesta: ${response.status}`);
    }
    return response.json();
    })
  . then(data => {
    outfits = data.outfits; 
    console.log(outfits);
    renderProducts(outfits);
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

