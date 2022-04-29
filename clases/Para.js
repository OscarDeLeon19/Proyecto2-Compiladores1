const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');
const Iteracion = require('./Iteracion');


class Para{
    
    /**
     * 
     * @param {*} id 
     * @param {*} declaracion 
     * @param {*} relacion 
     * @param {Iteracion} iterador 
     * @param {*} cuerpo 
     * @param {*} cantOperaciones 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, declaracion, relacion, iterador, cuerpo, cantOperaciones, fila, columna){
        this.id = id;
        this.relacion = relacion;
        this.declaracion = declaracion;
        this.cuerpo = [];
        if(this.cuerpo != null){
            this.cuerpo = cuerpo;
        }
        this.iterador = iterador;
        this.fila = fila;
        this.columna = columna;
        this.cantOperaciones = cantOperaciones;
    }
    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        var nuevaTabla = new Tabla(tablaSimbolos);
        if(this.declaracion.operar(nuevaTabla, salida) == null){
            salida.agregarError(Tipo.SEMANTICO, "Error en la declaracion del ciclo", this.fila, this.columna);
            return null;
        }
        var variableIteracion = this.declaracion.identificador;

        var expresion = this.relacion.operar(nuevaTabla, salida);
        if (expresion == null){
            salida.agregarError(Tipo.SEMANTICO, "Error en la expresion relacional del ciclo", this.fila, this.columna);
            return null;
        }
        if(expresion.tipoDato != Tipo.BOOLEAN){
            salida.agregarError(Tipo.SEMANTICO, "La expresion del for debe ser booleana", this.fila, this.columna);
            return null;
        }
        this.iterador.setIdentificador(variableIteracion);        
        while(expresion.valor === true){
            for(var i = 0; i < this.cantOperaciones; i++){
                this.cuerpo[i].operar(nuevaTabla,salida);
            }

            if(this.iterador.operar(nuevaTabla, salida) == null){
                salida.agregarError(Tipo.SEMANTICO, "Error al realizar la iteracion", this.fila, this.columna);
                return null;
            }

            expresion = this.relacion.operar(nuevaTabla, salida);
            if (expresion == null){
                salida.agregarError(Tipo.SEMANTICO, "Error en la expresion relacional del ciclo", this.fila, this.columna);
                return null;
            }
            if(expresion.tipoDato != Tipo.BOOLEAN){
                salida.agregarError(Tipo.SEMANTICO, "La expresion del for debe ser booleana", this.fila, this.columna);
                return null;
            }
        }
        return true;
    }

}

module.exports = Para;