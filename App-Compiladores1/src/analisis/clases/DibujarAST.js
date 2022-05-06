const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');

class DibujarAST{
    /**
     * 
     * @param {*} id 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, identificador, fila, columna){
        this.id = id;
        this.identificador = identificador;
        this.fila = fila+1;
        this.columna = columna;
    }

    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        var funciones = tablaSimbolos.obtenerFunciones(this.identificador);
        if(funciones.length > 0){
            console.log("Funciones:" + funciones.length);
            for(var i = 0; i < funciones.length; i++){
                console.log(funciones[i]);           
            }
        } else {
            salida.agregarError(Tipo.SEMANTICO, "No hay funciones con el identificador: "+ this.identificador, this.fila, this.columna);
            return null;
        }
    }

}

module.exports = DibujarAST;