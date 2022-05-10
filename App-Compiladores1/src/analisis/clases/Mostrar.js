const Tipo = require('./Tipo');
const Salida = require('./Salida');
const Tabla = require('./Tabla');
const { collapseTextChangeRangesAcrossMultipleVersions } = require('typescript');

class Mostrar{
    /**
     * 
     * @param {*} id 
     * @param {string} cadena 
     * @param {array} parametros 
     * @param {*} cantidadParametros 
     * @param {*} tipoDato 
     * @param {*} tipoEstructura 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, cadena, parametros, cantidadParametros, tipoDato, tipoEstructura, fila, columna){
        this.id = id;
        this.cadena = String(cadena);
        this.parametros = [];
        if(parametros != null){
            this.parametros = parametros;
        }
        this.cantidadParametros = cantidadParametros;
        this.tipoDato = tipoDato;
        this.tipoEstructura = tipoEstructura;
        this.fila = fila+1;
        this.columna = columna;

    }

    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        /*
        var expresion = this.valor.operar(tablaSimbolos, salida);
        if (expresion != null){
            salida.agregarSalida(expresion.valor);
        } else {
            salida.agregarError(Tipo.SEMANTICO, "Error al imprimir", this.fila, this.columna);           
        }
        return null;
        */

        var nuevaCadena = "";
        for(var i = 0; i < this.cadena.length; i++){
            if(this.cadena.substring(i,i+1)=="{"){
                for(var j = i + 1; j < this.cadena.length; j++){
                    if(this.cadena.substring(j,j+1)=="}"){
                        try{
                            var number = Number(this.cadena.substring(i+1,j));                   
                            if(number>=this.parametros.length){
                                salida.agregarError(Tipo.SEMANTICO, "El parametro no existe. Error al imprimir", this.fila, this.columna); 
                                i = j;
                                break;
                            } else { 
                                var exp = this.parametros[number].operar(tablaSimbolos, salida);
                                if(exp != null){
                                    nuevaCadena += exp.valor;
                                    i = j;
                                    break;
                                } else {
                                    salida.agregarError(Tipo.SEMANTICO, "Error en un parametro al imprimir", this.fila, this.columna); 
                                }
                            }
                        } catch(error){
                            salida.agregarError(Tipo.SEMANTICO, "Error al imprimir", this.fila, this.columna);
                            i = j+1;
                        }
                    }
                }
            } else {
                if(this.cadena.substring(i,i+1)!="\""){
                    nuevaCadena += this.cadena.substring(i,i+1);
                }
            }
        }
        salida.agregarSalida(nuevaCadena);

    }

    /**
     * 
     * @param {Conteo} conteo 
     * @param {Salida} salida 
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "Mostrar"]';
        conteo.agregarEncabezado(nodo+label);

        var texto = nodo;
        return texto;

    }

}

module.exports = Mostrar;