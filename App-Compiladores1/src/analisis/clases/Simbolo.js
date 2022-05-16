
class Simbolo{

    /**
     * Constructror de la clase simbolo.
     * @param {*} _id 
     * @param {*} _tipoDato 
     * @param {*} _tipoEstructura 
     * @param {*} _valor 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(_id, _tipoDato, _tipoEstructura, _valor, fila, columna){
        this.tipoDato = _tipoDato;
        this.tipoEstructura = _tipoEstructura;
        this.id = _id;
        this.valor = _valor;
        this.fila = fila;
        this.columna = columna;
    }
}

module.exports = Simbolo;