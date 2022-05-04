
class Simbolo{

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