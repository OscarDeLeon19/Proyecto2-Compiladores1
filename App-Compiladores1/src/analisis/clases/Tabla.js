const Simbolo = require('./Simbolo');
const Funcion = require('./Funcion');
const Incerteza = require('./Incerteza');
const Tipo = require('./Tipo');

class Tabla{

    /**
     * Constructor de la clase Tabla de la tabla de simbolos.
     * @param {Tabla} _tablaSuperior 
     */
    constructor(_tablaSuperior){
        this.funciones = [];       
        this.simbolos = [];
        this.ambito = "";
        if (_tablaSuperior != null){
            this.funciones = _tablaSuperior.funciones;
        }
        this.tablaSuperior = _tablaSuperior;
    }

    setAmbito(texto){
        this.ambito = texto;
    }

    /**
     * Comprueba si hay una incerteza asignada. Sino asigna 0.5 como valor por defecto.
     */
    comprobarIncerteza(){
        var comprobacion = this.buscarSimbolo("Incerteza");
        if(comprobacion == false){
            var incert = new Simbolo("Incerteza", Tipo.INCERTEZA, Tipo.VALOR, 0.5, 1, 1);
            this.agregarSimboloLocal(incert);
        }
    }

    /**
     * Agrega una incerteza a la tabla de simbolos.
     * @param {Incerteza} incerteza 
     */
    agregarIncerteza(incerteza){
        var incert = new Simbolo("Incerteza", Tipo.INCERTEZA, Tipo.VALOR, incerteza.valor, incerteza.fila, incerteza.columna);
        this.agregarSimboloLocal(incert);
    }

    /**
     * Limpia la tabla de todos los simbolos y funcionan que contienen.
     */
    limpiarTabla(){
        this.funciones = [];
        this.simbolos = [];
        this.tablaSuperior = null;
    }

    /**
     * Agrega un simbolo a la tabla de simbolos
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
     * Agrega una variable a la tabla del entorno local.
     * @param {Simbolo} simbolo 
     * @returns boolean
     */
    agregarSimboloLocal(simbolo){
        this.simbolos.push(simbolo);
        return true;        
    }
    
    /**
     * Devuelve un simbolo por su nombre.
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
     * Busca un simbolo en la tabla de simbolos.
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
     * Busca un simbolo en la tabla de simbolos globales.
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
     * Agrega una funcion a la lista de funciones. Comprueba que esta no este repetida.
     * @param {Funcion} funcion 
     */
    agregarFuncion(funcion, salida){
        if(this.buscarFuncion(funcion.identificador,funcion.cantidadParametros)===false){
            this.funciones.push(funcion);
            return true;
        } else {
            salida.agregarError(Tipo.SEMANTICO, "Funcion "+ funcion.identificador + " ya declarada", funcion.fila, funcion.columna);
            return false;
        }
    }

    /**
     * Devuelve la cantidad de funciones
     * @returns 
     */
    devolverCantidad(){
        return this.funciones.length;
    }

    /**
     * Devuelve una funcion segun su nombre y cantidad de parametros.
     * @param {*} nombre 
     * @param {*} cantidadParametros 
     * @returns 
     */
    obtenerFuncion(nombre, cantidadParametros){
        for(var i = 0; i < this.funciones.length; i++){
            if(this.funciones[i].identificador === nombre && this.funciones[i].cantidadParametros === cantidadParametros){
                return this.funciones[i];
            }            
        }
        return null;
    }

    /**
     * Devuelve las funciones unicamente por su nombre.
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

    /**
     * Busca una funcion en la tabla de funciones y devuelve true si existe.
     * @param {*} nombre 
     * @param {*} cantidadParametros 
     * @returns 
     */
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