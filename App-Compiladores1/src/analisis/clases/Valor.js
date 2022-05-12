const Tipo = require('./Tipo')
const Salida = require('./Salida');
const Tabla = require('./tabla');
const Conteo = require('../Conteo');

class Valor{

    constructor(id, valor, tipoDato, tipoEstructura, fila, columna){
        this.id = id;
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
     * @returns 
     */
    operar(tablaSimbolos, salida){
        
        switch(this.tipoDato){
            
            case Tipo.ENTERO:
                return new Valor("Valor",Number(this.valor), this.tipoDato, this.tipoEstructura, this.fila, this.columna);
            case Tipo.DECIMAL:    
                return new Valor("Valor",Number(this.valor), this.tipoDato, this.tipoEstructura, this.fila, this.columna);
            case Tipo.CADENA:
                if (this.valor.toString().startsWith("\"")){
                    this.valor = this.valor.toString().substring(1, this.valor.toString().length - 1);
                }
                return new Valor("Valor",this.valor, this.tipoDato, this.tipoEstructura, this.fila, this.columna); 
            case Tipo.CARACTER:
                var caracter = this.valor.replace(/'/g,'');  
                return new Valor("Valor",caracter.charCodeAt(0), this.tipoDato, this.tipoEstructura, this.fila, this.columna); 
            case Tipo.BOOLEAN:
                if (this.valor === true){
                    return new Valor("Valor",true, this.tipoDato, this.tipoEstructura, this.fila, this.columna); 
                }
                return new Valor("Valor",false, this.tipoDato, this.tipoEstructura, this.fila, this.columna); 
            case Tipo.ID:
                var a = tablaSimbolos.buscarSimbolo(this.valor);
                if (a){
                    var r = tablaSimbolos.obtenerSimbolo(this.valor);
                    return new Valor("Valor",r.valor, r.tipoDato, r.tipoEstructura, r.fila, r.columna);
                }  else {
                    salida.agregarError(Tipo.SEMANTICO, "La variable " + this.valor + " no esta definida", this.fila, this.columna);
                }
                break;
            case Tipo.LLAMADA:
                var a = tablaSimbolos.buscarFuncion(this.valor.identificador, this.valor.cantidadParametros);
                if(a === true){
                    return this.valor.operar(tablaSimbolos, salida);
                }  else {
                    salida.agregarError(Tipo.SEMANTICO, "La funcion "+this.valor.identificador+" no esta definida", this.fila, this.columna);
                    return new Valor("Valor",null, Tipo.ERROR, Tipo.ERROR, this.fila, this.columna);   
                } 
            default:  
                salida.agregarError(Tipo.SEMANTICO, "Tipo " + this.tipoDato + " no es aceptado por la gramatica", this.fila, this.columna);
                return new Valor("Valor",null, Tipo.ERROR, Tipo.ERROR, this.fila, this.columna);    
        }
    }

    /**
     * 
     * @param {Salida} salida 
     * @param {Conteo} conteo 
     * @returns 
     */
    obtenerDot(salida, conteo){
        var textoGrafico = "";
        switch(this.tipoDato){          
            case Tipo.ENTERO:
                textoGrafico = "Int | " + this.valor;
                break;
            case Tipo.DECIMAL: 
                textoGrafico = "Double | " + this.valor;
                break;   
            case Tipo.CADENA:
                if (this.valor.toString().startsWith("\"")){
                    this.valor = this.valor.toString().substring(1, this.valor.toString().length - 1);
                }
                textoGrafico = "String | " + this.valor;
                break;
            case Tipo.CARACTER:
                var caracter = this.valor.replace(/'/g,'');
                textoGrafico = "Caracter | " + caracter.charCodeAt(0);
                break;  
            case Tipo.BOOLEAN:
                textoGrafico = "Boolean | " + this.valor;
                break;
            case Tipo.ID:
                textoGrafico = "ID | " + this.valor;
                break;
            case Tipo.LLAMADA:
                textoGrafico = "Llamada | " + this.valor.identificador;
                break;         
        }
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "' + textoGrafico +'"]';
        conteo.agregarEncabezado(nodo+label);
        return nodo;
    }

}

module.exports = Valor;