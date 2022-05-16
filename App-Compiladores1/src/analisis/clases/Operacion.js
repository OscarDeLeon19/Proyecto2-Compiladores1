const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');
const Valor = require('./Valor');
const Conteo = require('../Conteo');

class Operacion{

    /**
     * Clase de la instrucion Operacion
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
     * Opera la instruccion operacion.
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        // Obtiene los valores de los nodos
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
                if(this.tipoDato != null){
                    // Ejecuta diferentes operaciones segun el tipo de operacion que se va a realizar.
                    switch(this.tipoDato){
                        case Tipo.SUMA:
                            if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor("Valor",Number(nodoIzquierdo.valor + nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor", nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.CADENA){
                                var nuevoValor;
                                if (nodoIzquierdo.valor === true){
                                    nuevoValor = 1;
                                } else {
                                    nuevoValor = 0;
                                }
                                return new Valor("Valor",nuevoValor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CADENA){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CADENA && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                var nuevoValor;
                                if (nodoDerecho.valor === true){
                                    nuevoValor = 1;
                                } else {
                                    nuevoValor = 0;
                                }
                                return new Valor("Valor",nodoIzquierdo.valor + nuevoValor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CADENA && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CADENA && nodoDerecho.tipoDato === Tipo.CADENA){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CADENA && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CADENA && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CADENA){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CADENA){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor + nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else {
                                salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                return null;
                            }
                        case Tipo.RESTA:
                            if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor - nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor("Valor",nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor("Valor",nodoIzquierdo.valor - nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor - nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor - nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor - nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor - nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else {
                                salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                return null;
                            }
                        case Tipo.MULTIPLICACION:
                            if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor * nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor("Valor",nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor("Valor",nodoIzquierdo.valor * nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor * nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor * nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor * nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor * nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else {
                                salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                return null;
                            } 
                        case Tipo.DIVISION:
                            if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor("Valor",nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor("Valor",nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else {
                                salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                return null;
                            }   
                        case Tipo.MODULO:
                            if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor("Valor",nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor("Valor",nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else {
                                salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                return null;
                            } 
                        case Tipo.POTENCIA:  
                            if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor("Valor",Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor("Valor",Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor("Valor",Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor("Valor",Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor("Valor",Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else {
                                salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                return null;
                            }   
                        default:
                            salida.agregarError(Tipo.SEMANTICO, "La operacion es invalida", this.fila, this.columna);
                            return null;           
                    }
                }
            }
        }
        salida.agregarError(Tipo.SEMANTICO, "Faltan valores o no se pudo operar", this.fila, this.columna);
        return null;     
    }
    
    /**
     * 
     * @param {Salida} salida 
     * @param {Conteo} conteo
     * @returns 
     */
    obtenerDot(salida, conteo){
        var nombre = "";
        switch(this.tipoDato){
            case Tipo.SUMA:
                nombre = "Suma";
                break;
            case Tipo.RESTA:
                nombre = "Resta";
                break;
            case Tipo.MULTIPLICACION:
                nombre = "Multiplicacion";
                break;  
            case Tipo.DIVISION:
                nombre = "Division";
                break;
            case Tipo.MODULO:
                nombre = "Modulo";
                break;  
            case Tipo.POTENCIA:
                nombre = "Potencia";
                break;                                 
        }
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "' + nombre +'"]';
        conteo.agregarEncabezado(nodo+label);
        var textoGrafico = "";
        if(this.valorIzquierdo.id === "Operacion" || this.valorIzquierdo.id === "Valor"){
            textoGrafico = nodo + "->" + this.valorIzquierdo.obtenerDot(salida, conteo) + "\n";
        } else {
            salida.agregarError(Tipo.SEMANTICO, "Solo se pueden dibujar expresiones aritmeticas", this.fila, this.columna);
        }
        if(this.valorDerecho.id === "Operacion" || this.valorDerecho.id === "Valor"){
            textoGrafico += nodo + "->" + this.valorDerecho.obtenerDot(salida, conteo) + "\n";
        } else {
            salida.agregarError(Tipo.SEMANTICO, "Solo se pueden dibujar expresiones aritmeticas", this.fila, this.columna);
        }
        return textoGrafico;
    }
}

module.exports = Operacion;