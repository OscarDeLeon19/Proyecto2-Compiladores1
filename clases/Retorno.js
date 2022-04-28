const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Valor = require('./Valor');

class Retorno{
    
    constructor(id, valor, fila, columna){
        this.id = id;
        this.valor = valor;
        this.fila = fila;
        this.columna = columna;

    }

    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     * @returns 
     */
    operar(tablaSimbolos, salida){
        var expresion = null;
        if (valor !== null){
            expresion == this.valor.operar(tablaSimbolos, salida);
            return null;
        }
        if (expresion === null){
            salida.agregarError(Tipo.SEMANTICO, "Error en la expresion", this.fila, this.columna);
            return null;
        }
        return new Valor(expresion.valor, expresion.tipoDato, Tipo.Valor, this.fila, this.columna);
    }

}

module.exports = Retorno;