

let outfits = []

const binID = '6574e4200574da7622d2b981'
const apiKey = '$2a$10$yMw6jGD8rgxHutZ46mif6upD3rW7bUaRLJMTw7z/GP7uJQT3d8mP.'
const url = `https://api.jsonbin.io/v3/b/${binID}`
const headers = {
    'secret-key': apiKey
}

fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
        console.log(data.record.outfits)
    });



