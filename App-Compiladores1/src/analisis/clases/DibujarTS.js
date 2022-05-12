const Salida = require('./Salida');
const Tabla = require('./Tabla');
const {DBTabla} = require('./DBTabla');

class DibujarTS{
    /**
     * 
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
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        var simbolos = tablaSimbolos.simbolos;
        var nuevaTabla = new DBTabla(this.fila, this.columna);
        if(simbolos.length > 0){
            for(var i = 0; i < simbolos.length; i++){
                nuevaTabla.agregarColumna(simbolos[i].id, simbolos[i].valor, simbolos[i].tipoDato, simbolos[i].fila, simbolos[i].columna);
                //console.log("Variable: " + simbolos[i].id + " | Valor: " + simbolos[i].valor + " | Tipo de Dato: " + simbolos[i].tipoDato + " | Fila: " + simbolos[i].fila + " | " + simbolos[i].columna);           
            }
        }
        salida.agregarTabla(nuevaTabla);
    }

    /**
     * 
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