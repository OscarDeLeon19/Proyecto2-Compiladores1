const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');
const Conteo = require('../Conteo')

class DibujarEXP{
    /**
     * 
     * @param {*} id 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, expresion, fila, columna){
        this.id = id;
        this.expresion = expresion;
        this.fila = fila+1;
        this.columna = columna;
    }

    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        var textoGrafico = "";
        var conteo = new Conteo();
        if(this.expresion.id === "Operacion" || this.expresion.id === "Valor"){
            textoGrafico = textoGrafico + this.expresion.obtenerDot(salida, conteo);
        } else {
            salida.agregarError(Tipo.SEMANTICO, "Solo se pueden dibujar expresiones aritmeticas", this.fila, this.columna);
        }
        console.log(textoGrafico);
    }

}

module.exports = DibujarEXP;