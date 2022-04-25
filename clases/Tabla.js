const Simbolo = require('./Simbolo');
const Type = require('./Tipo');

class Tabla{

    constructor(_tablaSuperior){
        if (_tsuperior != null){
            this.funciones = _tsuperior.funciones
        }
        this.simbolos = [];
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
    
    
}