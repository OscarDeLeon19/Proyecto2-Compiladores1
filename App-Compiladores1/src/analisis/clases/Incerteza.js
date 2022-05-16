const Salida = require('./Salida');
const Simbolo = require('./Simbolo');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');

class Incerteza{
    
    /**
     * Clase de la instruccion incerteza.
     * @param {string} id 
     * @param {number} valor 
     * @param {number} fila 
     * @param {number} columna 
     */
    constructor(id, valor, fila, columna){
        this.id = id;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;
    }

    /**
     * Ingresa la incerteza a la tabla de simbolos.
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        var incert = new Simbolo("Incerteza", Tipo.INCERTEZA, Tipo.VALOR, this.valor, this.fila, this.columna);
        tablaSimbolos.agregarSimboloLocal(incert);
        return null;
    }

}

module.exports = Incerteza;