const Simbolo = require('./Simbolo');
const Type = require('./Tipo');
const Funcion = require('./Funcion');

class Tabla{

    /**
     * 
     * @param {Tabla} _tablaSuperior 
     */
    constructor(_tablaSuperior){
        this.funciones = [];       
        this.simbolos = [];
        if (_tablaSuperior != null){
            this.funciones = _tablaSuperior.funciones
            this.simbolos = _tablaSuperior.simbolos;
        }
        this.tablaSuperior = _tablaSuperior;
        this.salida = null;
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
    agregarFuncion(funcion){
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