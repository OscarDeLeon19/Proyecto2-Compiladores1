const Tipo = require('./Tipo');
const Salida = require('./Salida');
const Tabla = require('./Tabla');

class Mostrar{
    /**
     * 
     * @param {*} id 
     * @param {*} valor 
     * @param {*} tipoDato 
     * @param {*} tipoEstructura 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, valor, tipoDato, tipoEstructura, fila, columna){
        this.id = id;
        this.valor = valor;
        this.tipoDato = tipoDato;
        this.tipoEstructura = tipoEstructura;
        this.fila = fila+1;
        this.columna = columna;
    }

    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        var expresion = this.valor.operar(tablaSimbolos, salida);
        if (expresion != null){
            salida.agregarSalida(expresion.valor);
        } else {
            salida.agregarError(Tipo.SEMANTICO, "Error al imprimir", this.fila, this.columna);           
        }
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
        var label = '[label = "Mostrar"]';
        conteo.agregarEncabezado(nodo+label);

        var texto = nodo;
        return texto;

    }

}

module.exports = Mostrar;