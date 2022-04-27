const Tipo = require('./Tipo')
const Salida = require('./Salida');
const Tabla = require('./tabla');

class Valor{

    constructor(valor, tipoDato, tipoEstructura, fila, columna){
        this.valor = valor;
        this.tipoDato = tipoDato;
        this.tipoEstructura = tipoEstructura;
        this.fila = fila;
        this. columna = columna;
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
                return new Valor(Number(this.valor), this.tipoDato, this.tipoEstructura, this.fila, this.columna);
            case Tipo.DECIMAL:    
                return new Valor(Number(this.valor), this.tipoDato, this.tipoEstructura, this.fila, this.columna);
            case Tipo.CADENA:
                if (this.valor.toString().startsWith("\"")){
                    this.valor = this.valor.toString().substring(1, this.valor.toString().length - 1);
                }
                return new Valor(this.valor, this.tipoDato, this.tipoEstructura, this.fila, this.columna); 
            case Tipo.CARACTER:
                var caracter = this.valor.replace(/'/g,'');  
                return new Valor(caracter.charCodeAt(0), this.tipoDato, this.tipoEstructura, this.fila, this.columna); 
            case Tipo.BOOLEAN:
                if (this.valor === true){
                    return new Valor(true, this.tipoDato, this.tipoEstructura, this.fila, this.columna); 
                }
                return new Valor(false, this.tipoDato, this.tipoEstructura, this.fila, this.columna); 
            case Tipo.ID:
                var a = tablaSimbolos.buscarSimbolo(this.valor);
                if (a){
                    var r = tablaSimbolos.obtenerSimbolo(this.valor);
                    return new Valor(r.valor, r.tipoDato, r.tipoEstructura, r.fila, r.columna);
                }  else {
                    salida.agregarError(Tipo.SEMANTICO, "La variable " + this.valor + " no esta definida", this.fila, this.columna);
                }
            default:  
                salida.agregarError(Tipo.SEMANTICO, "Tipo " + this.tipoDato + " no es aceptado por la gramatica", this.fila, this.columna);
                return new Valor(null, Tipo.ERROR, Tipo.ERROR, this.fila, this.columna);    
        }
    }

}

module.exports = Valor;