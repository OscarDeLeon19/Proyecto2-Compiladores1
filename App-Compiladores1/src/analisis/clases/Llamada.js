const Salida = require('./Salida');
const Simbolo = require('./Simbolo');
const Tabla = require('./Tabla');
const Valor = require('./Valor');
const Tipo = require('./Tipo');
const Conteo = require('../Conteo');

class LLamada{
    /**
     * Clase de la instruccion llamada.
     * @param {*} id 
     * @param {*} identificador 
     * @param {*} parametros 
     * @param {*} tipoDato 
     * @param {*} tipoEstructura 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, identificador, parametros, tipoDato, tipoEstructura, fila, columna){
        this.id = id;
        this.identificador = identificador;
        if (parametros == null){
            this.parametros = [];
            this.cantidadParametros = 0;
        } else {
            this.parametros = parametros;
            this.cantidadParametros = parametros.length;
        }
        this.tipoDato = tipoDato;
        this.tipoEstructura = tipoEstructura;
        this.fila = fila;
        this.columna = columna;
    }

    /**
     * Opera la instruccion de una llamada.
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} simbolos 
     */
    operar(tablaSimbolos, salida){
        // Obtiene la funcion de la tabla de simbolos
        var funcion = tablaSimbolos.obtenerFuncion(this.identificador, this.cantidadParametros);
        // Si no hay funcionse agrega un error.
        if (funcion == null){
            salida.agregarError(Tipo.SEMANTICO, "Funcion: "+ this.identificador + " no declarada", this.fila, this.columna);
            return null;
        }
        // Crea una nueva tabla para este ambito.
        var nuevaTabla = new Tabla(tablaSimbolos);
        // Si hay parametros entonces asigna sus valores a la tabla de simbolos
        if (funcion.parametros != null){
            for(var i = 0; i < funcion.cantidadParametros; i++){
                if(nuevaTabla.buscarSimboloLocal(funcion.parametros[i].identificadores[0])===false){
                    var expresion = this.parametros[i].operar(nuevaTabla, salida);
                    if(expresion === null){
                        salida.agregarError(Tipo.SEMANTICO, "Parametro Pos: "+ (i +1) + " invalido", this.fila, this.columna);
                        return null;
                    }
                    if(expresion.tipoDato !== funcion.parametros[i].tipoDato){
                        salida.agregarError(Tipo.SEMANTICO, "Los parametros tienen simbolos incompatibles en la posicion: " + (i+1), this.fila, this.columna);
                        return null;     
                    }
                    nuevaTabla.agregarSimboloLocal(new Simbolo(funcion.parametros[i].identificadores[0], funcion.parametros[i].tipoDato, funcion.parametros[i].tipoEstructura, expresion.valor, funcion.fila, funcion.columna))
                }
            }
        }
        // Opera el cuerpo de la funcion
        funcion.operar(nuevaTabla, salida);
        // Si la funcion es diferente de Void. Se obtiene el valor del retorno y se devuelve.
        if (funcion.tipoDato != Tipo.VOID){
            var valorRetorno = funcion.retorno.operar(nuevaTabla, salida);
            if(valorRetorno === null){
                salida.agregarError(Tipo.SEMANTICO, "Error al evaluar el retorno de la funcion: " + funcion.identificador, this.fila, this.columna);
                return null;
            }
            return valorRetorno;
        } else {
            return null;
        }
    }

    /**
     * Grafica el ast de la salida
     * @param {Conteo} conteo 
     * @param {Salida} salida 
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "Llamada"]';
        conteo.agregarEncabezado(nodo+label);
        
        var nodoID = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelID = '[label = "'+this.identificador+'"]';
        conteo.agregarEncabezado(nodoID+labelID);

        var nodoEXP = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelEXP = '[label = "Parametros: '+this.cantidadParametros+'"]';
        conteo.agregarEncabezado(nodoEXP+labelEXP);

        var texto = nodo + "->" + nodoID +"->"+ nodoEXP;
        return texto;

    }

}

module.exports = LLamada;