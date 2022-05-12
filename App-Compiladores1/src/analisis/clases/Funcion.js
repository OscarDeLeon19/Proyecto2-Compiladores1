const Salida = require('./Salida');
const Conteo = require('../Conteo');

class Funcion{
    /**
     * 
     * @param {*} id 
     * @param {*} identificador 
     * @param {*} parametros 
     * @param {[]} cuerpo 
     * @param {*} retorno 
     * @param {*} tipoDato 
     * @param {*} tipoEstructura 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, identificador, parametros, cuerpo, tipoDato, tipoEstructura, fila, columna){
        this.id = id;
        this.identificador = identificador;
        if (parametros == null){
            this.parametros = [];
            this.cantidadParametros = 0;
        } else {
            this.parametros = parametros;
            this.cantidadParametros = parametros.length;
        }
        this.cuerpo = cuerpo;
        this.tipoDato = tipoDato;
        this.tipoEstructura = tipoEstructura;
        this.fila = fila;
        this.columna = columna;
        this.retorno = null;
    }
    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     * @returns 
     */
    operar(tablaSimbolos, salida){
        this.retorno = null;
        var a = Array.isArray(this.cuerpo);
        if (a){
            var cantidad = this.cuerpo.length;
            for(var i = 0; i < cantidad; i++){   
                if(this.cuerpo[i].id == "Retorno"){
                    this.retorno = this.cuerpo[i];
                    break;
                } else {        
                    this.cuerpo[i].operar(tablaSimbolos, salida); 
                    if(this.cuerpo[i].id == "Si"){
                        if(this.cuerpo[i].retorno != null){
                            this.retorno = this.cuerpo[i].retorno;
                            break;
                        }
                    }
                }          
            }
        }
        return null;
    }

    /**
     * 
     * @param {Salida} salida 
     */
     graficarAST(salida){
        
        var textoGrafico = "";    
        var conteo = new Conteo();
        var titulo = 'node[shape = "rectangle"]';
        conteo.agregarEncabezado(titulo);
        var nodoFuncion = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelFuncion = '[label = "AST de Funcion: '+this.identificador+'"]';
        conteo.agregarEncabezado(nodoFuncion+labelFuncion);        
        for(var i = 0; i < this.cuerpo.length; i++){        
            if(this.cuerpo[i].id == "Declaracion"){
                textoGrafico += nodoFuncion+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Asignacion"){
                textoGrafico += nodoFuncion+ "->"+this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Mostrar"){
                textoGrafico += nodoFuncion+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Llamada"){
                textoGrafico += nodoFuncion+ "->" + this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "DibujarAST"){
                textoGrafico += nodoFuncion+ "->"+  this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            }  else if(this.cuerpo[i].id  == "DibujarEXP"){
                textoGrafico += nodoFuncion+ "->"+ nodo + "->" + this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "DibujarTS"){
                textoGrafico += nodoFuncion+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Si"){
                textoGrafico += nodoFuncion+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Para"){
                textoGrafico += nodoFuncion+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Mientras"){
                textoGrafico += nodoFuncion+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Retorno"){
                textoGrafico += nodoFuncion+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else {
                console.log("ERror")
            }           
        }   
        salida.agregarGrafico(conteo.encabezado + textoGrafico);
    }

}

module.exports = Funcion;