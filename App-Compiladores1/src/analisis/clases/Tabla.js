const Simbolo = require('./Simbolo');
const Funcion = require('./Funcion');
const Incerteza = require('./Incerteza');
const Tipo = require('./Tipo');

class Tabla{

    /**
     * 
     * @param {Tabla} _tablaSuperior 
     */
    constructor(_tablaSuperior){
        this.funciones = [];       
        this.simbolos = [];
        if (_tablaSuperior != null){
            this.funciones = _tablaSuperior.funciones;
        }
        this.tablaSuperior = _tablaSuperior;
    }

    comprobarIncerteza(){
        var comprobacion = this.buscarSimbolo("Incerteza");
        if(comprobacion == false){
            var incert = new Simbolo("Incerteza", Tipo.INCERTEZA, Tipo.VALOR, 0.5, 1, 1);
            this.agregarSimboloLocal(incert);
        }
    }

    /**
     * 
     * @param {Incerteza} incerteza 
     */
    agregarIncerteza(incerteza){
        var incert = new Simbolo("Incerteza", Tipo.INCERTEZA, Tipo.VALOR, incerteza.valor, incerteza.fila, incerteza.columna);
        this.agregarSimboloLocal(incert);
    }

    limpiarTabla(){
        this.funciones = [];
        this.simbolos = [];
        this.tablaSuperior = null;
    }

    /**
     * 
     * @param {Simbolo} simbolo 
     * @returns 
     */
    agregarSimbolo(simbolo){
        if (this.buscarSimbolo(simbolo.id) === false){
            this.simbolos.push(simbolo);
            return true;
        }
        return false;
    }

    /**
     * 
     * @param {Simbolo} simbolo 
     * @returns boolean
     */
    agregarSimboloLocal(simbolo){
        this.simbolos.push(simbolo);
        return true;        
    }
    
    /**
     * 
     * @param {string} nombre 
     * @returns Simbolo
     */
    obtenerSimbolo(nombre){
        for(let i = 0; i<this.simbolos.length; i++){
            if (nombre === this.simbolos[i].id){
                return this.simbolos[i];
            }
        }
        if (this.tablaSuperior != null){
            return this.tablaSuperior.obtenerSimbolo(nombre);
        }
    }
    /**
     * 
     * @param {*} nombre 
     * @returns Simbolo
     */
    buscarSimbolo(nombre){
        for(let i = 0; i<this.simbolos.length; i++){
            if (nombre === this.simbolos[i].id){
                return true;
            }
        }
        if (this.tablaSuperior != null){
            return this.tablaSuperior.buscarSimbolo(nombre);
        }
        return false;
    }
    /**
     * 
     * @param {*} nombre 
     * @returns boolean
     */
    buscarSimboloLocal(nombre){
        for(let i = 0; i<this.simbolos.length; i++){
            if (nombre === this.simbolos[i].id){
                return true;
            }
        }
        return false;
    }
    /**
     * 
     * @param {Funcion} funcion 
     */
    agregarFuncion(funcion, salida){
        if(this.buscarFuncion(funcion.identificador,funcion.cantidadParametros)===false){
            this.funciones.push(funcion);
            return true;
        } else {
            salida.agregarError(Tipo.SEMANTICO, "Funcion "+ funcion.identificador + "ya declarada", this.fila, this.columna);
            return false;
        }
    }

    devolverCantidad(){
        return this.funciones.length;
    }

    obtenerFuncion(nombre, cantidadParametros){
        for(var i = 0; i < this.funciones.length; i++){
            if(this.funciones[i].identificador === nombre && this.funciones[i].cantidadParametros === cantidadParametros){
                return this.funciones[i];
            }            
        }
        return null;
    }

    /**
     * 
     * @param {*} nombre 
     * @returns 
     */
    obtenerFunciones(nombre){
        var cantidadFunciones = [];
        for(var i = 0; i < this.funciones.length; i++){
            if(this.funciones[i].identificador === nombre){
                cantidadFunciones.push(this.funciones[i]);
            }            
        }
        return cantidadFunciones;
    }


    buscarFuncion(nombre, cantidadParametros){
        if (this.funciones != null){
            for(var i = 0; i < this.funciones.length; i++){
                if(this.funciones[i].identificador === nombre && this.funciones[i].cantidadParametros === cantidadParametros){
                    return true;
                }            
            }
            return false;
        } else {
            return false;
        }
    }
}

module.exports = Tabla;