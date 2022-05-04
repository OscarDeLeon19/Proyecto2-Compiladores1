const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');

class DibujarEXP{
    /**
     * 
     * @param {*} id 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, expresion, fila, columna){
        this.id = id;
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
    }

    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        console.log(this.expresion);
    }

}

module.exports = DibujarEXP;