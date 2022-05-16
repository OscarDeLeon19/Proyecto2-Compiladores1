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
        this.fila = fila;
        this.columna = columna;
    }

    /**
     * Opera la asignacion
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        // Obtiene el valor de la tabla de simbolos. Si es nulo marca un error
        var a = tablaSimbolos.obtenerSimbolo(this.identificador);
        if (a == null){
            salida.agregarError(Tipo.SEMANTICO, "Variable "+ this.identificador + " no encontrada", this.fila, this.columna);
            return null;
        }
        // Obtiene el valor de la expresion de la asignacion. Si es nula marca un error.
        var expresion = this.valor.operar(tablaSimbolos, salida);

        if (expresion == null){
            salida.agregarError(Tipo.SEMANTICO, "No se pudo realizar la asignacion de la variable " + this.identificador , this.fila, this.columna);
            return null;
        }

        // Asigna los valores nuevos a la variable
        switch(a.tipoDato){
            case Tipo.CADENA:
                if(expresion.tipoDato == Tipo.CADENA){
                    a.valor = expresion.valor;
                } else if (expresion.tipoDato == Tipo.DECIMAL){
                    a.valor = String(expresion.valor);
                }  else if (expresion.tipoDato == Tipo.BOOLEAN){
                    var val;
                    if(expresion.valor == true){
                        val = 1;
                    } else {
                        val = 0;
                    }
                    a.valor = String(val);
                } else if (expresion.tipoDato == Tipo.ENTERO){
                    a.valor = String(expresion.valor);
                } else if (expresion.tipoDato == Tipo.CARACTER){
                    a.valor = String.fromCharCode(expresion.valor);
                }
                break;
            case Tipo.DECIMAL:
                if (expresion.tipoDato == Tipo.DECIMAL){
                    a.valor = expresion.valor;
                }  else if (expresion.tipoDato == Tipo.BOOLEAN){
                    if(expresion.valor == true){
                        a.valor = 1.0;
                    } else {
                        a.valor = 0;
                    }
                } else if (expresion.tipoDato == Tipo.ENTERO){
                    a.valor = parseFloat(expresion.valor);
                } else if (expresion.tipoDato == Tipo.CARACTER){
                    a.valor = parseFloat(expresion.valor);
                } else {
                    salida.agregarError(Tipo.SEMANTICO, "El tipo "+expresion.tipoDato+" no se puede asignar a la variable: " + this.identificador , this.fila, this.columna);
                    return null;
                }   
                break;
            case Tipo.BOOLEAN:
                if (expresion.tipoDato == Tipo.BOOLEAN){
                    a.valor = expresion.valor;
                } else {
                    salida.agregarError(Tipo.SEMANTICO, "El tipo "+expresion.tipoDato+" no se puede asignar a la variable: " + this.identificador , this.fila, this.columna);
                    return null;
                }    
                break; 
            case Tipo.ENTERO:
                if (expresion.tipoDato == Tipo.DECIMAL){
                    a.valor = parseInt(expresion.valor);
                }  else if (expresion.tipoDato == Tipo.BOOLEAN){
                    if(expresion.valor == true){
                        a.valor = 1;
                    } else {
                        a.valor = 0;
                    }
                } else if (expresion.tipoDato == Tipo.ENTERO){
                    a.valor = expresion.valor;
                } else if (expresion.tipoDato == Tipo.CARACTER){
                    a.valor = expresion.valor;
                } else {
                    salida.agregarError(Tipo.SEMANTICO, "El tipo "+expresion.tipoDato+" no se puede asignar a la variable: " + this.identificador , this.fila, this.columna);
                    return null;
                }   
                break;   
            case Tipo.CARACTER:
                if (expresion.tipoDato == Tipo.ENTERO){
                    if(expresion.valor > 0 && expresion.valor < 128){
                        a.valor = expresion.valor;
                    } else{
                        salida.agregarError(Tipo.SEMANTICO, "El valor supera la tablas ASSCII", this.fila, this.columna);
                        return null;
                    }
                } else if (expresion.tipoDato == Tipo.CARACTER){
                    a.valor = expresion.valor;
                } else {
                    salida.agregarError(Tipo.SEMANTICO, "El tipo "+expresion.tipoDato+" no se puede asignar a la variable: " + this.identificador , this.fila, this.columna);
                    return null;
                }   
                break;   
        }
        a.tipoEstructura = expresion.tipoEstructura;
    }
    /**
     * Comprueba que la variable y la expresion tengan el mismo tipo de dato.
     * @param {*} expresion 
     * @param {*} tipo 
     * @param {*} salida 
     * @returns 
     */
    comprobarTipo(expresion, tipo, salida){
        if(tipo !== expresion.tipoDato){
            salida.agregarError(Tipo.SEMANTICO, "No se pudo realizar la asignacion de la variable " + this.identificador , this.fila, this.columna);
            return true;
        }
        return false;
    }

    /**
     * Crea los nodos del ast de la instruccion.
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