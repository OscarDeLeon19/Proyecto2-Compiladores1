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
    }

    getSalida(){
        return this.salida;
    }

    getTablaErrores(){
        return this.tablaErrores;
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
}

module.exports = Salida;