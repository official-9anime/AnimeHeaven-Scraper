const search = require("./endpoints/search");
const info = require("./endpoints/info");

const query = 'j2np5';
info(query)
    .then((results) => {
        console.log('Info:', JSON.stringify(results, null, 2));
    })
    .catch((error) => {
        console.error('Error occurred while searching:', error);
    });