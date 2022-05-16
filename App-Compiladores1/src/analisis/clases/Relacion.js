
const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');
const Valor = require('./Valor');

class Relacion{

    /**
     * Clase de la instruccion Relacion
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
    * Opera la instruccion de una relacion
    * @param {Tabla} tablaSimbolos 
    * @param {Salida} salida 
    */
    operar(tablaSimbolos, salida){
        // Comprueba que ambos nodos tengan un valor
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
                // Comprueba que ambos nodos tengan un tipo de dato igual.
                if(nodoIzquierdo.tipoDato === nodoDerecho.tipoDato){
                    if(nodoIzquierdo.tipoDato == Tipo.CADENA){
                        // Si son cadenas se realiza una comprobacion segun los valores de los caracteres en la tabla ASSCII
                        var valorCadena1 = 0;
                        var valorCadena2 = 0;
                        for(var i = 0; i< String(nodoIzquierdo.valor.length); i++){
                            valorCadena1 = valorCadena1 + nodoIzquierdo.valor.charCodeAt(i);
                        }
                        for(var i = 0; i< String(nodoDerecho.valor.length); i++){
                            valorCadena2 = valorCadena2 + nodoDerecho.valor.charCodeAt(i);
                        }
                        if(this.tipoDato != null){
                            switch (this.tipoDato){
                                case Tipo.IGUAL:
                                    return new Valor("Valor",valorCadena1 === valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.DIFERENTE:
                                    return new Valor("Valor",valorCadena1 !== valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.MAYOR:
                                    return new Valor("Valor",valorCadena1 > valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.MENOR:
                                    return new Valor("Valor",valorCadena1 < valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.MAYORIGUAL:
                                    return new Valor("Valor",valorCadena1 >= valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);  
                                case Tipo.MENORIGUAL:
                                    return new Valor("Valor",valorCadena1 <= valorCadena2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna); 
                                case Tipo.INCERTEZA:
                                    // Si es una incerteza se evalua de manera diferente
                                    var cadena1 = String(nodoIzquierdo.valor.toUpperCase());
                                    var cadena2 = String(nodoDerecho.valor.toUpperCase());
                                    var nuevaCadena1;
                                    var inicioCad = 0;
                                    var finCad = 0;
                                    for(var i = 0; i< cadena1.length; i++){
                                        if(cadena1.substring(i, i+1) != " "){
                                            inicioCad = i;
                                            break;
                                        }
                                    }
                                    for(var i = cadena1.length; i > 0; i--){
                                        if(cadena1.substring(i - 1, i) != " "){
                                            finCad = i;
                                            break;
                                        }
                                    }

                                    nuevaCadena1 = cadena1.substring(inicioCad, finCad);

                                    var nuevaCadena2;
                                    inicioCad = 0;
                                    finCad = 0;
                                    for(var i = 0; i< cadena2.length; i++){
                                        if(cadena2.substring(i, i+1) != " "){
                                            inicioCad = i;
                                            break;
                                        }
                                    }
                                    for(var i = cadena2.length; i > 0; i--){
                                        if(cadena2.substring(i - 1, i) != " "){
                                            finCad = i;
                                            break;
                                        }
                                    }
                                    nuevaCadena2 = cadena2.substring(inicioCad, finCad);
                                    var valorIncerteza1 = 0;
                                    var valorIncerteza2 = 0;
                                    for(var i = 0; i< String(nuevaCadena1.length); i++){
                                        valorIncerteza1 = valorIncerteza1 + nuevaCadena1.charCodeAt(i);
                                    }
                                    for(var i = 0; i< String(nuevaCadena1.length); i++){
                                        valorIncerteza2 = valorIncerteza2 + nuevaCadena2.charCodeAt(i);
                                    }
                                    return new Valor("Valor",valorIncerteza1 === valorIncerteza2, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                default:
                                    salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                    return null;                                
                            }
                        }
                    } else{
                        if(this.tipoDato != null){
                            switch (this.tipoDato){
                                case Tipo.IGUAL:
                                    return new Valor("Valor",nodoIzquierdo.valor === nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.DIFERENTE:
                                    return new Valor("Valor",nodoIzquierdo.valor !== nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.MAYOR:
                                    return new Valor("Valor",nodoIzquierdo.valor > nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.MENOR:
                                    return new Valor("Valor",nodoIzquierdo.valor < nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.MAYORIGUAL:
                                    return new Valor("Valor",nodoIzquierdo.valor >= nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);  
                                case Tipo.MENORIGUAL:
                                    return new Valor("Valor",nodoIzquierdo.valor <= nodoDerecho.valor, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                case Tipo.INCERTEZA:
                                    // La incerteza solo se puede evaluar entre numeros
                                    if(nodoIzquierdo.tipoDato === Tipo.ENTERO || nodoIzquierdo.tipoDato === Tipo.DECIMAL){
                                        var valorIncerteza;
                                        var resultado = Math.abs(nodoIzquierdo.valor - nodoDerecho.valor);
                                        var incerteza = tablaSimbolos.obtenerSimbolo("Incerteza");
                                        if(incerteza.valor > resultado){
                                            valorIncerteza = true;
                                        } else {
                                            valorIncerteza = false;
                                        }
                                        return new Valor("Valor",valorIncerteza, Tipo.BOOLEAN, Tipo.VALOR, this.fila, this.columna);
                                    } else {
                                        return null;
                                    }
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