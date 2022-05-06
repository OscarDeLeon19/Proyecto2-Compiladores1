const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');

class Iteracion{
    /**
     * 
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
        this.fila = fila+1;
        this.columna = columna;
    }

    setIdentificador(identificador){
        this.identificador = identificador;
    }
    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        var variable = tablaSimbolos.obtenerSimbolo(this.identificador);
        if (variable == null){
            salida.agregarError(Tipo.SEMANTICO, "No se encontro la variable del ciclo", this.fila, this.columna);
            return null;
        } 

        if(variable.tipoDato != Tipo.ENTERO){
            salida.agregarError(Tipo.SEMANTICO, "Solo se pueden iterar valores enteros", this.fila, this.columna);
            return null;
        }

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