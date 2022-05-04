const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');

class DibujarTS{
    /**
     * 
     * @param {*} id 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, fila, columna){
        this.id = id;
        this.fila = fila;
        this.columna = columna;
    }

    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        var simbolos = tablaSimbolos.simbolos;
        if(simbolos.length > 0){
            for(var i = 0; i < simbolos.length; i++){
                console.log("Variable: " + simbolos[i].id + " | Valor: " + simbolos[i].valor + " | Tipo de Dato: " + simbolos[i].tipoDato + " | Fila: " + simbolos[i].fila + " | " + simbolos[i].columna);           
            }
        }
    }

}

module.exports = DibujarTS;