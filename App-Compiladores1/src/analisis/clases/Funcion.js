const Salida = require('./Salida');
const { IGUAL } = require('./Tipo');

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
    constructor(id, identificador, parametros, cuerpo, retorno, tipoDato, tipoEstructura, fila, columna){
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
        this.fila = fila+1;
        this.columna = columna;
        this.retorno = retorno;
    }
    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     * @returns 
     */
    operar(tablaSimbolos, salida){
        var a = Array.isArray(this.cuerpo);
        if (a){
            var cantidad = this.cuerpo.length;
            for(var i = 0; i < cantidad; i++){           
                this.cuerpo[i].operar(tablaSimbolos, salida);           
            }
        }
        return null;
    }

}

module.exports = Funcion;