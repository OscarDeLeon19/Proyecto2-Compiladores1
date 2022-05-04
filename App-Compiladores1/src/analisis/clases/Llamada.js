const Salida = require('./Salida');
const Simbolo = require('./Simbolo');
const Tabla = require('./Tabla');
const Valor = require('./Valor');
const Tipo = require('./Tipo');

class LLamada{
 
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
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} simbolos 
     */
    operar(tablaSimbolos, salida){
        var funcion = tablaSimbolos.obtenerFuncion(this.identificador, this.cantidadParametros);
        if (funcion == null){
            salida.agregarError(Tipo.SEMANTICO, "Funcion: "+ this.identificador + " no declarada", this.fila, this.columna);
            return null;
        }
        var nuevaTabla = new Tabla(tablaSimbolos);
        if (funcion.parametros != null){
            for(var i = 0; i < funcion.cantidadParametros; i++){
                if(nuevaTabla.buscarSimboloLocal(funcion.parametros[i].identificador)===false){
                    var expresion = this.parametros[i].operar(nuevaTabla, salida);
                    if(expresion === null){
                        salida.agregarError(Tipo.SEMANTICO, "Parametro Pos: "+ (i +1) + " invalido", this.fila, this.columna);
                        return null;
                    }
                    if(expresion.tipoDato !== funcion.parametros[i].tipoDato){
                        salida.agregarError(Tipo.SEMANTICO, "Los parametros tienen simbolos incompatibles en la posicion: " + (i+1), this.fila, this.columna);
                        return null;     
                    }
                    nuevaTabla.agregarSimboloLocal(new Simbolo(funcion.parametros[i].identificador, funcion.parametros[i].tipoDato, funcion.parametros[i].tipoEstructura, expresion.valor))
                }
            }
        }
        funcion.operar(nuevaTabla, salida);
        /*
        console.log("Error2: " + funcion.getCantidadCuerpo())
        var cuerpo = funcion.getCuerpo();
        for(var i = 0; i < funcion.getCantidadCuerpo(); i++){
            console.log("IDDD: " + cuerpo.id)
            cuerpo[i].operar(nuevaTabla, salida);
        }
        */
       
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

}

module.exports = LLamada;