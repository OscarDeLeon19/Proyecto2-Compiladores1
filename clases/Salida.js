const Type = require('./Tipo');

class Salida{
    
    constructor(){
        this.limpiarSalida();
    }

    limpiarSalida(){
        this.salida = '';
        this.errores = '';
        this.tablaErrores = '';
    }

    getSalida(){
        return this.salida;
    }

    getTablaErrores(){
        return this.tablaErrores;
    }

    agregarError(tipo, mensaje, fila, columna){
        this.tablaErrores.push({tipo: tipo, mensaje: mensaje, fila: fila, columna: columna});
    }
}

module.exports = Salida;