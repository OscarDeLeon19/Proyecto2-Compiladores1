
const Tipo = require('./Tipo');
const Type = require('./Tipo');
const Valor = require('./Valor');

class Relacion{

    /**
     * 
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
    * 
    * @param {Tabla} tablaSimbolos 
    * @param {Salida} salida 
    */
    operar(tablaSimbolos, salida){
        var nodoIzquierdo = null;
        var nodoDerecho = null;
        if (this.valorIzquierdo != null){
            nodoIzquierdo = this.valorIzquierdo.operar(tablaSimbolos, salida)
        }
        if (this.valorDerecho != null){
            nodoDerecho = this.valorDerecho.operar(tablaSimbolos, salida)
        }
        if (nodoIzquierdo != null && nodoDerecho != null){
            if (nodoIzquierdo.tipoEstructura === Tipo.VALOR && nodoDerecho.tipoEstructura === Tipo.VALOR){
                if(nodoIzquierdo.tipoDato === nodoDerecho.tipoDato){
                    if(nodoIzquierdo.tipoDato == Tipo.CADENA){
                        var valorCadena1 = 0;
                        var valorCadena2 = 0;
                        for(var i = 0; i< nodoIzquierdo.valor.lenght(); i++){
                            valorCadena1 = valorCadena1 + nodoIzquierdo.valor.charCodeAt(i);
                        }
                        for(var i = 0; i< nodoDerecho.valor.lenght(); i++){
                            valorCadena2 = valorCadena2 + nodoDerecho.valor.charCodeAt(i);
                        }
                        if(this.tipoDato != null){
                            switch (this.tipoDato){
                                case Tipo.IGUAL:
                                    return new Valor(valorCadena1 === valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.DIFERENTE:
                                    return new Valor(valorCadena1 !== valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.MAYOR:
                                    return new Valor(valorCadena1 > valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.MENOR:
                                    return new Valor(valorCadena1 < valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.MAYORIGUAL:
                                    return new Valor(valorCadena1 >= valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);  
                                case Tipo.MENORIGUAL:
                                    return new Valor(valorCadena1 <= valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna); 
                                case Tipo.INCERTEZA:
                                    return new Valor(valorCadena1 <= valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                default:
                                    salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                    return null;                                
                            }
                        }
                    } else{
                        if(this.tipoDato != null){
                            switch (this.tipoDato){
                                case Tipo.IGUAL:
                                    return new Valor(nodoIzquierdo.valor === nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.DIFERENTE:
                                    return new Valor(nodoIzquierdo.valor !== nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.MAYOR:
                                    return new Valor(nodoIzquierdo.valor > nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.MENOR:
                                    return new Valor(nodoIzquierdo.valor < nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.MAYORIGUAL:
                                    return new Valor(nodoIzquierdo.valor >= nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);  
                                case Tipo.MENORIGUAL:
                                    return new Valor(nodoIzquierdo.valor <= nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.INCERTEZA:
                                    return new Valor(valorCadena1 <= valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                default:
                                    salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                    return null;                             
                            }
                        }
                    }
                } else {
                    salida.agregarError(Tipo.SEMANTICO, "Los tipos no son iguales, por lo que no se pueden comparar", this.fila, this.columna);
                    return null; 
                }
            }
        }
        salida.agregarError(Tipo.SEMANTICO, "Error al realizar la operacion", this.fila, this.columna);
        return null;         
    }
}

module.exports = Relacion;