const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');

class Continuar{
    /**
     * 
     * @param {*} id 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id,fila, columna){
        this.id = id;
        this.fila = fila+1;
        this.columna = columna;
    }

    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        return null;
    }

}

module.exports = Continuar;