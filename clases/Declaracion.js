const Simbolo = require('./Simbolo');
const Valor = require('./Valor');
const Tipo = require('./Tipo');
const Salida = require('./Salida');
const Tabla = require('./Tabla');

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
        this.fila = fila;
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
                tablaSimbolos.agregarSimboloLocal(new Simbolo(this.identificador, this.tipoDato, this.tipoEstructura, null))             
                return true;
            }
            tablaSimbolos.agregarSimboloLocal(new Simbolo(this.identificador, this.tipoDato, this.tipoEstructura, valorExpresion.valor))
            return true;
        } else {
            salida.agregarError(Tipo.SEMANTICO, "La variable ya "+ this.identificador+"esta declarada en este ambito", this.fila, this.columna);
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

}

module.exports = Declaracion;