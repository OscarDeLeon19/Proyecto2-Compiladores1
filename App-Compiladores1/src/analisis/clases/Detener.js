const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');

class Detener{
    /**
     * Clase de la instruccion detener
     * @param {*} id 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id,fila, columna){
        this.id = id;
        this.fila = fila;
        this.columna = columna;
    }

    /**
     * No opera ninguna funcion
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        return null;
    }

    /**
     * Crea un nodo para la graficacion del AST.
     * @param {Conteo} conteo 
     * @param {Salida} salida 
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "Detener"]';
        conteo.agregarEncabezado(nodo+label);

        var texto = nodo;
        return texto;

    }

}

module.exports = Detener;