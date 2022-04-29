const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');
const Valor = require('./Valor');

class Operacion{

    /**
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
                if(this.tipoDato != null){
                    switch(this.tipoDato){
                        case Tipo.SUMA:
                            if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor(Number(nodoIzquierdo.valor + nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.CADENA){
                                var nuevoValor;
                                if (nodoIzquierdo.valor === true){
                                    nuevoValor = 1;
                                } else {
                                    nuevoValor = 0;
                                }
                                return new Valor(nuevoValor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CADENA){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CADENA && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                var nuevoValor;
                                if (nodoDerecho.valor === true){
                                    nuevoValor = 1;
                                } else {
                                    nuevoValor = 0;
                                }
                                return new Valor(nodoIzquierdo.valor + nuevoValor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CADENA && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CADENA && nodoDerecho.tipoDato === Tipo.CADENA){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CADENA && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CADENA && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CADENA){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CADENA){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.CADENA, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor + nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else {
                                salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                return null;
                            }
                        case Tipo.RESTA:
                            if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor - nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor(nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor(nodoIzquierdo.valor - nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor - nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor - nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor - nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor - nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor - nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else {
                                salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                return null;
                            }
                        case Tipo.MULTIPLICACION:
                            if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor * nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor(nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor(nodoIzquierdo.valor * nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor * nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor * nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor * nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor * nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor * nodoDerecho.valor, Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else {
                                salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                return null;
                            } 
                        case Tipo.DIVISION:
                            if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor(nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor(nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor / nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else {
                                salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                return null;
                            }   
                        case Tipo.MODULO:
                            if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor(nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor(nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(nodoIzquierdo.valor % nodoDerecho.valor, Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else {
                                salida.agregarError(Tipo.SEMANTICO, "La operacion " + this.tipoDato + " no se puede realizar", this.fila, this.columna);
                                return null;
                            } 
                        case Tipo.POTENCIA:  
                            if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.BOOLEAN && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor(Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.DECIMAL && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.BOOLEAN){
                                return new Valor(Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.ENTERO && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.ENTERO, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.DECIMAL){
                                return new Valor(Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.ENTERO){
                                return new Valor(Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
                            } else if (nodoIzquierdo.tipoDato === Tipo.CARACTER && nodoDerecho.tipoDato === Tipo.CARACTER){
                                return new Valor(Math.pow(nodoIzquierdo.valor, nodoDerecho.valor), Tipo.DECIMAL, Tipo.VALOR, this.fila, this.columna);
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

}

module.exports = Operacion;