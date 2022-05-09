const Simbolo = require('./Simbolo');
const Valor = require('./Valor');
const Tipo = require('./Tipo');
const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Conteo = require('../Conteo');

class Asignacion{
    /**
     * 
     * @param {*} id 
     * @param {*} identificador 
     * @param {*} valor 
     * @param {*} tipoDato 
     * @param {*} tipoEstructura 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, identificador, valor, fila, columna){
        this.id = id;
        this.identificador = identificador;
        this.valor = valor;
        this.fila = fila +1;
        this.columna = columna;
    }

    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){

        var a = tablaSimbolos.obtenerSimbolo(this.identificador);

        if (a === null){
            salida.agregarError(Tipo.SEMANTICO, "Variable "+ this.id + "no encontrada", this.fila, this.columna);
            return null;
        }

        var expresion = this.valor.operar(tablaSimbolos, salida);

        if (expresion == null){
            salida.agregarError(Tipo.SEMANTICO, "No se pudo realizar la asignacion de la variable " + this.identificador , this.fila, this.columna);
            return null;
        }

        if(this.comprobarTipo(expresion, a.tipoDato, salida) == true){
            salida.agregarError(Tipo.SEMANTICO, "El tipo no se puede asignar a la variable: " + this.identificador , this.fila, this.columna);
            return null;
        }
        a.tipoEstructura = expresion.tipoEstructura;
        a.tipoDato = expresion.tipoDato;
        a.valor = expresion.valor;
    }

    comprobarTipo(expresion, tipo, salida){
        if(tipo !== expresion.tipoDato){
            salida.agregarError(Tipo.SEMANTICO, "No se pudo realizar la asignacion de la variable " + this.identificador , this.fila, this.columna);
            return true;
        }
        return false;
    }

    /**
     * 
     * @param {Conteo} conteo 
     * @param {Salida} salida 
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "Asignacion"]';
        conteo.agregarEncabezado(nodo+label);
        
        var nodoID = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelID = '[label = "'+this.identificador+'"]';
        conteo.agregarEncabezado(nodoID+labelID);

        var nodoEXP = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelEXP = '[label = "Expresion"]';
        conteo.agregarEncabezado(nodoEXP+labelEXP);

        var texto = nodo + "->" + nodoID +"->"+ nodoEXP;
        return texto;

    }
}

module.exports = Asignacion;