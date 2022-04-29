const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');
const Iteracion = require('./Iteracion');


class Mientras{
    
    /**
     * 
     * @param {*} id 
     * @param {*} relacion 
     * @param {*} cuerpo 
     * @param {*} cantOperaciones 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, relacion, cuerpo, cantOperaciones, fila, columna){
        this.id = id;
        this.relacion = relacion;
        this.cuerpo = [];
        if(this.cuerpo != null){
            this.cuerpo = cuerpo;
        }
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

        var expresion = this.relacion.operar(nuevaTabla, salida);
        if (expresion == null){
            salida.agregarError(Tipo.SEMANTICO, "Error en la expresion relacional del ciclo", this.fila, this.columna);
            return null;
        }
        if(expresion.tipoDato != Tipo.BOOLEAN){
            salida.agregarError(Tipo.SEMANTICO, "La expresion del for debe ser booleana", this.fila, this.columna);
            return null;
        }      
        while(expresion.valor === true){
            for(var i = 0; i < this.cantOperaciones; i++){
                this.cuerpo[i].operar(nuevaTabla,salida);
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

module.exports = Mientras;