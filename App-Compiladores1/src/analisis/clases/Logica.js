
const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');
const Valor = require('./Valor');

class Logica{

    /**
     * Clase de la instruccion Logica
     * @param {*} id 
     * @param {Valor} valorIzquierdo 
     * @param {Valor} valorDerecho 
     * @param {*} tipoDato 
     * @param {*} tipoEstructura 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, valorIzquierdo, valorDerecho, tipoDato, tipoEstructura, fila, columna){
        this.id = id;
        this.valorIzquierdo = valorIzquierdo;
        this.valorDerecho = valorDerecho;
        this.tipoDato = tipoDato;
        this.tipoEstructura = tipoEstructura;
        this.fila = fila;
        this.columna = columna;
    }

    /**
    * Opera una instruccion Logica
    * @param {Tabla} tablaSimbolos 
    * @param {Salida} salida 
    */
    operar(tablaSimbolos, salida){
        // Obtiene los valores de los nodos izquierdo y derecho.
        var nodoIzquierdo = null;
        var nodoDerecho = null;
        if (this.valorIzquierdo != null){
            nodoIzquierdo = this.valorIzquierdo.operar(tablaSimbolos, salida)
        }
        if (this.valorDerecho != null){
            nodoDerecho = this.valorDerecho.operar(tablaSimbolos, salida)
        }
        // Si estos son diferente de nulo entonces se opera.
        if (nodoIzquierdo != null && nodoDerecho != null){
            if (nodoIzquierdo.tipoEstructura === Tipo.VALOR && nodoDerecho.tipoEstructura === Tipo.VALOR){
                if(nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.BOOLEAN){                    
                    // Segun el tipo de dato entonces el valor retornara un valor diferente.
                    if(this.tipoDato != null){
                        switch (this.tipoDato){
                            case Tipo.AND:
                                return new Valor("Valor",nodoIzquierdo.valor && nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                            case Tipo.OR:
                                return new Valor("Valor",nodoIzquierdo.valor || nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                            case Tipo.XOR:
                                var valorNuevo;
                                if (nodoIzquierdo.valor == false && nodoDerecho.valor == false){
                                    valorNuevo =false;
                                } else if (nodoIzquierdo.valor == false && nodoDerecho.valor == true){
                                    valorNuevo =true;
                                } else if (nodoIzquierdo.valor == true && nodoDerecho.valor == false){
                                    valorNuevo =true;
                                }  else if (nodoIzquierdo.valor == true && nodoDerecho.valor == true){
                                    valorNuevo =false;
                                }
                                return new Valor("Valor",valorNuevo, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                            default:
                                salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                return null;                             
                        }
                    }                    
                } else {
                    salida.agregarError(Tipo.SEMANTICO, "Los tipos no son booleanos, por lo que no se pueden comparar", this.fila, this.columna);
                    return null; 
                }
            }
            // Si solo hay un solo valor quiere decir que se operara una instruccion NOT.
        } else if (nodoDerecho === null && nodoIzquierdo != null){
            if (nodoIzquierdo.tipoEstructura === Tipo.VALOR){
                if(nodoIzquierdo.tipoDato === Tipo.BOOLEAN){                    
                    if(this.tipoDato === Tipo.NOT){
                        if(nodoIzquierdo.valor === true){
                            return new Valor("Valor",false, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                        } else {
                            return new Valor("Valor",true, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                        }                      
                    }                    
                } else {
                    salida.agregarError(Tipo.SEMANTICO, "El tipo no es un booleano, por lo que no se pueden operar", this.fila, this.columna);
                    return null; 
                }
            }            
        }
        salida.agregarError(Tipo.SEMANTICO, "Error al realizar la operacion", this.fila, this.columna);
        return null;         
    }
}

module.exports = Logica