const Salida = require('./Salida');
const Tabla = require('./Tabla');
const {DBTabla} = require('./DBTabla');

class DibujarTS{
    /**
     * Clase de la intruccion DibujarTS
     * @param {*} id 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, fila, columna){
        this.id = id;
        this.fila = fila;
        this.columna = columna;
    }

    /**
     * Opera la instruccion DibujarTS
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        // Obtiene los simbolos de la tabla solicitada
        var simbolos = tablaSimbolos.simbolos;
        var nuevaTabla = new DBTabla(this.fila+1, this.columna);
        if(simbolos.length > 0){
            // Agrega cada simbolo a una clase para exportarla.
            for(var i = 0; i < simbolos.length; i++){
                nuevaTabla.agregarColumna(simbolos[i].id, simbolos[i].valor, simbolos[i].tipoDato, simbolos[i].fila, simbolos[i].columna);
                //console.log("Variable: " + simbolos[i].id + " | Valor: " + simbolos[i].valor + " | Tipo de Dato: " + simbolos[i].tipoDato + " | Fila: " + simbolos[i].fila + " | " + simbolos[i].columna);           
            }
        }
        salida.agregarTabla(nuevaTabla);
    }

    /**
     * Crea el nodo y etiqueta de el AST.
     * @param {Conteo} conteo 
     * @param {Salida} salida 
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "DibujarTS"]';
        conteo.agregarEncabezado(nodo+label);

        var texto = nodo;
        return texto;

    }

}

module.exports = DibujarTS;