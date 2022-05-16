const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');

class Iteracion{
    /**
     * Clase de la instruccion Iteracion.
     * @param {*} id 
     * @param {*} relacion 
     * @param {*} tipoDato 
     * @param {*} cuerpo 
     * @param {*} cuerpo_else 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id,tipoDato, fila, columna){
        this.id = id;
        this.identificador = null;
        this.tipoDato = tipoDato;
        this.fila = fila;
        this.columna = columna;
    }
    /**
     * Agrega el valor del identificador para poder iterar.
     * @param {*} identificador 
     */
    setIdentificador(identificador){
        this.identificador = identificador;
    }
    /**
     * Opera la instruccion de iteracion.
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        // Obtiene la variable de la tabla de simbolos.
        var variable = tablaSimbolos.obtenerSimbolo(this.identificador);
        // Si es nula se agrega un error.
        if (variable == null){
            salida.agregarError(Tipo.SEMANTICO, "No se encontro la variable del ciclo", this.fila, this.columna);
            return null;
        } 
        /**
         * Si la variable es diferente de un entero saldra un error.
         */
        if(variable.tipoDato != Tipo.ENTERO){
            salida.agregarError(Tipo.SEMANTICO, "Solo se pueden iterar valores enteros", this.fila, this.columna);
            return null;
        }
        // Itera la operacion en funcion de que tipo de iteracion es.
        if(this.tipoDato == Tipo.INCREMENTO){
            variable.valor = variable.valor + 1;
            return true;
        } else {
            variable.valor = variable.valor - 1;
            return true;
        }
    }

}

module.exports = Iteracion;