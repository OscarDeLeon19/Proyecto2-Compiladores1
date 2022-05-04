const {Error} = require("./Error");

class Salida{
    
    constructor(){
        this.limpiarSalida();
    }

    limpiarSalida(){
        this.salida = '';
        this.errores = '';
        this.tablaErrores = [];
    }

    getSalida(){
        return this.salida;
    }

    getTablaErrores(){
        return this.tablaErrores;
    }

    agregarError(tipo, mensaje, fila, columna){
        var error = new Error(tipo, mensaje, fila, columna);
        this.tablaErrores.push(error);
    }

    agregarSalida(valor){
        this.salida = this.salida + valor + "\n";
    }
}

module.exports = Salida;