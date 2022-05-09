const Simbolo = require('./Simbolo');
const Valor = require('./Valor');
const Tipo = require('./Tipo');
const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Conteo = require('../Conteo');

class Declaracion{
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
    constructor(id, identificador, valor, tipoDato, tipoEstructura, fila, columna){
        this.id = id;
        this.identificador = identificador;
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
        var valorExpresion = null;
        if (this.valor != null){
            valorExpresion = this.valor.operar(tablaSimbolos, salida);
            if (valorExpresion === null){
                salida.agregarError(Tipo.SEMANTICO, "Error en la expresion de la variable", this.fila, this.columna);
                return null;
            }
            if(this.comprobarTipo(valorExpresion,salida)===true){
                return null;
            }
        }

        var comprobacion = tablaSimbolos.buscarSimboloLocal(this.identificador);
        if (comprobacion === false){
            if (valorExpresion===null){
                tablaSimbolos.agregarSimboloLocal(new Simbolo(this.identificador, this.tipoDato, this.tipoEstructura, null, this.fila, this.columna))             
                return true;
            }
            tablaSimbolos.agregarSimboloLocal(new Simbolo(this.identificador, this.tipoDato, this.tipoEstructura, valorExpresion.valor,  this.fila, this.columna))
            return true;
        } else {
            salida.agregarError(Tipo.SEMANTICO, "La variable ya "+ this.identificador+" esta declarada en este ambito", this.fila, this.columna);
            return null;
        }


    }

    comprobarTipo(variable, salida){
        if (this.tipoDato !== variable.tipoDato){
            salida.agregarError(Tipo.SEMANTICO, "No se puede asignar un " + variable.tipoDato + " a una variable " + this.tipoDato, this.fila, this.columna);
            return true;
        } else {
            return false;
        }       
    }

    /**
     * 
     * @param {Conteo} conteo 
     * @param {Salida} salida 
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "Declaracion"]';
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

module.exports = Declaracion;