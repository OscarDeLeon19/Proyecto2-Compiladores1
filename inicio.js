
var fs = require('fs'); 
var parser = require('./gramatica.js');
const Salida = require('./clases/Salida');
var salida = new Salida();



fs.readFile('./Entrada.txt', (err, data) => {
    if (err) throw err;
    salida = parser.parse(data.toString());

    console.log(salida.getSalida());
    console.log(salida.getTablaErrores());
});

