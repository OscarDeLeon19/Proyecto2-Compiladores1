const {Error} = require("./Error");
const {DBTabla} = require("./DBTabla");

class Salida{
    
    constructor(){
        this.limpiarSalida();
    }

    /**
     * 
     * @param {Salida} anterior 
     */
    agregarParametros(anterior){
        this.salida = anterior.salida;
        this.tablaErrores = anterior.tablaErrores;
    }

    limpiarSalida(){
        this.salida = '';
        this.tablaErrores = [];
        this.cantidadTablas = [];
        this.graficos = [];
    }

    getSalida(){
        return this.salida;
    }

    getTablaErrores(){
        return this.tablaErrores;
    }

    getGraficos(){
        return this.graficos;
    }

    getTablasDibujadas(){
        return this.cantidadTablas;
    }

    agregarError(tipo, mensaje, fila, columna){
        var error = new Error(tipo, mensaje, fila, columna);
        this.tablaErrores.push(error);
    }

    agregarSalida(valor){
        this.salida = this.salida + valor + "\n";
    }

    /**
     * 
     * @param {DBTabla} tabla 
     */
    agregarTabla(tabla){
        this.cantidadTablas.push(tabla);
    }

    agregarGrafico(textoGrafico){
        var text = 'digraph G { ' + textoGrafico + ' }';
        this.graficos.push(text); 
    }
}

module.exports = Salida;