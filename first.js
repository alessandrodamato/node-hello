// al lancio del file in terminale fs crea un file text.txt in cui scrive al suo interno Node Hello
const fs = require('fs');
fs.writeFileSync('text.txt', 'Node Hello');