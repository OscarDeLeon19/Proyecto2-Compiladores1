const Simbolo = require('./Simbolo');
const Valor = require('./Valor');
const Tipo = require('./Tipo');
const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Conteo = require('../Conteo');

class Declaracion{
    /**
     * Guarda una declaracion de una variable
     * @param {*} id 
     * @param {Array} identificadores 
     * @param {*} valor 
     * @param {*} tipoDato 
     * @param {*} tipoEstructura 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, identificadores, valor, tipoDato, tipoEstructura, fila, columna){
        this.id = id;
        this.identificadores = [];
        if(identificadores != null){
            this.identificadores = identificadores;
        }
        this.valor = valor;
        this.tipoDato = tipoDato;
        this.tipoEstructura = tipoEstructura;
        this.fila = fila;
        this.columna = columna;
    }

    /**
     * Opera la instruccion
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        var error = false;
        var valorExpresion = null;
        // Si el valor no es nulo lo opera para obtener el valor final
        if (this.valor != null){
            valorExpresion = this.valor.operar(tablaSimbolos, salida);
            // Si es nulo quiere decir que hay un error
            if (valorExpresion === null){
                salida.agregarError(Tipo.SEMANTICO, "Error en la expresion de la variable", this.fila, this.columna);
                return null;
            }
            // Comprueba que se tengan los mismos tipos de datos
            if(this.comprobarTipo(valorExpresion,salida)===true){
                return null;
            }
        }
        // Comienza a asignar los valores y crear los simbolos en la tabla.
        for(var i = 0; i < this.identificadores.length; i++){
            var nuevoID = this.identificadores[i];
            var comprobacion = tablaSimbolos.buscarSimboloLocal(nuevoID);
            // Si el simbolo no se encuentra en la tabla genera un error
            if (comprobacion === false){
                // Si el valor de la expresion es nula asigna una variable sin valor
                if (valorExpresion===null){
                    tablaSimbolos.agregarSimboloLocal(new Simbolo(nuevoID, this.tipoDato, this.tipoEstructura, null, this.fila, this.columna))             
                } else {
                    tablaSimbolos.agregarSimboloLocal(new Simbolo(nuevoID, this.tipoDato, this.tipoEstructura, valorExpresion.valor,  this.fila, this.columna))
                }
            } else {
                salida.agregarError(Tipo.SEMANTICO, "La variable ya "+ this.nuevoID+" esta declarada en este ambito", this.fila, this.columna);
                error = true;
            }
        }  
        // Si hay un error retorna un valor nulo
        if(error == true){
            return null;
        } else {
            return true;
        }       
    }

    /**
     * Comprueba que el tipo de la variable sea igual a la del tipo de dato de la expresion
     * @param {*} variable 
     * @param {*} salida 
     * @returns 
     */
    comprobarTipo(variable, salida){
        if (this.tipoDato !== variable.tipoDato){
            salida.agregarError(Tipo.SEMANTICO, "No se puede asignar un " + variable.tipoDato + " a una variable " + this.tipoDato, this.fila, this.columna);
            return true;
        } else {
            return false;
        }       
    }

    /**
     * Crea los nodos para graficar un AST.
     * @param {Conteo} conteo 
     * @param {Salida} salida 
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "Declaracion"]';
        conteo.agregarEncabezado(nodo+label);
        
        var texto = "";
        for(var i = 0; i < this.identificadores.length; i++){
            var nodoID = "node" + conteo.conteoNodo;
            conteo.sumarConteo();
            var labelID = '[label = "'+this.identificadores[i]+'"]';
            conteo.agregarEncabezado(nodoID+labelID);
            texto += nodo + "->" + nodoID + "\n";
        }

        var nodoEXP = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelEXP = '[label = "Expresion"]';
        conteo.agregarEncabezado(nodoEXP+labelEXP);

        texto += nodo +"->"+ nodoEXP;
        return texto;

    }

}

module.exports = Declaracion;