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

    /**
     * 
     * @param {Conteo} conteo 
     * @param {Salida} salida 
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "Continuar"]';
        conteo.agregarEncabezado(nodo+label);

        var texto = nodo;
        return texto;

    }

}

module.exports = Continuar;