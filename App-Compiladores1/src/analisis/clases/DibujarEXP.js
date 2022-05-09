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
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "Grafica de Expresion No.'+salida.expresiones+'" shape="rectangle"]';
        conteo.agregarEncabezado(nodo+label);
        if(this.expresion.id === "Operacion" || this.expresion.id === "Valor"){
            textoGrafico = textoGrafico + this.expresion.obtenerDot(salida, conteo);
        } else {
            salida.agregarError(Tipo.SEMANTICO, "Solo se pueden dibujar expresiones aritmeticas", this.fila, this.columna);
        }
        //console.log(conteo.encabezado + textoGrafico);
        salida.agregarGrafico(conteo.encabezado + textoGrafico);
        salida.sumarExpresion();
    }

    /**
     * 
     * @param {Conteo} conteo 
     * @param {Salida} salida 
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "DibujarEXP"]';
        conteo.agregarEncabezado(nodo+label);

        var nodoEXP = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelEXP = '[label = "Expresion"]';
        conteo.agregarEncabezado(nodoEXP+labelEXP);

        var texto = nodo + "->" + nodoEXP;
        return texto;

    }

}

module.exports = DibujarEXP;