const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');
const Conteo = require('../Conteo');

class DibujarAST{
    /**
     * Clase de la instruccion para dibujar AST
     * @param {*} id 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, identificador, fila, columna){
        this.id = id;
        this.identificador = identificador;
        this.fila = fila;
        this.columna = columna;
    }

    /**
     * Opera la instruccion del AST.
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        // Obtiene las funciones con identificador buscado
        var funciones = tablaSimbolos.obtenerFunciones(this.identificador);
        if(funciones.length > 0){          
            // Opera todos los nodos para graficar un AST.
            for(var i = 0; i < funciones.length; i++){
                funciones[i].graficarAST(salida);              
            }
        } else {
            // Si no hay funciones se agrega un error.
            salida.agregarError(Tipo.SEMANTICO, "No hay funciones con el identificador: "+ this.identificador, this.fila, this.columna);
            return null;
        }
    }

    /**
     * Grafica sus nodos del AST.
     * @param {Conteo} conteo 
     * @param {Salida} salida 
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "DibujarAST"]';
        conteo.agregarEncabezado(nodo+label);
        
        var nodoID = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelID = '[label = "Funcion: '+this.identificador+'"]';
        conteo.agregarEncabezado(nodoID+labelID);

        var texto = nodo + "->" + nodoID;
        return texto;

    }

}

module.exports = DibujarAST;