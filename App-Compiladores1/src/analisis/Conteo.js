

class Conteo{
    /**
     * Construcot de la clase conteo. Guarda el conteo de nodos para dibujar un AST.
     */
    constructor(){     
        this.conteoNodo = 0;
        this.encabezado = "";
        this.uniones = "";
        this.expresiones = 1;
    }

    /**
     * Suma una expresion a la cantidad de expresiones
     */
    sumarExpresion(){
        this.expresiones++;
    }

    /**
     * Suma el conteo de un nodo.
     */
    sumarConteo(){
        this.conteoNodo++;
    }

    /**
     * Agrega el encabezado de nodos para que posteriormente se impriman.
     * @param {*} texto 
     */
    agregarEncabezado(texto){
        this.encabezado = this.encabezado + texto + "\n";
    }

}

module.exports = Conteo;