const Salida = require('./Salida');
const Tabla = require('./Tabla');

class Funcion{
    /**
     * 
     * @param {*} id 
     * @param {*} identificador 
     * @param {*} parametros 
     * @param {*} cuerpo 
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
            parametros = [];
        } else {
            this.parametros = parametros;
        }
        this.cuerpo = cuerpo;
        this.tipoDato = tipoDato;
        this.tipoEstructura = tipoEstructura;
        this.fila = fila;
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
        return null;
    }

}

module.exports = Funcion;