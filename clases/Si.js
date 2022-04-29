const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');

class Si{
    /**
     * 
     * @param {*} id 
     * @param {*} relacion 
     * @param {*} tipoDato 
     * @param {*} cuerpo 
     * @param {*} cuerpo_else 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, relacion, tipoDato, cuerpo, cantOperaciones, cuerpo_else, cantElse, fila, columna){
        this.id = id;
        this.relacion = relacion;
        this.tipoDato = tipoDato;
        this.cuerpo = [];
        if(this.cuerpo != null){
            this.cuerpo = cuerpo;
        }
        this.cuerpo_else = [];
        if(cuerpo_else != null){
            this.cuerpo_else = cuerpo_else;
        }
        this.fila = fila;
        this.columna = columna;
        this.cantOperaciones = cantOperaciones;
        this.cantElse = cantElse;
        console.log("OPS: " + cantOperaciones);
        console.log("ELSE: " + cantElse);
    }
    /**
     * 
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida){
        var expresion = this.relacion.operar(tablaSimbolos, salida);
        if (expresion == null){
            salida.agregarError(Tipo.SEMANTICO, "No se puede ejecutar la funcion porque se necesita una condicion", this.fila, this.columna);
            return null;
        }
        if(expresion.tipoDato !== Tipo.BOOLEAN){
            salida.agregarError(Tipo.SEMANTICO, "La condicion debe ser booleana", this.fila, this.columna);
            return null;
        }
        //console.log(expresion)
        if(expresion.valor === true){
            var nuevaTabla = new Tabla(tablaSimbolos);
            //console.log(this)
            for(var i = 0; i<this.cantOperaciones; i++){
                this.cuerpo[i].operar(nuevaTabla, salida);
            }
            return true;
        } else {
            if(this.cuerpo_else != null){
                var nuevaTabla = new Tabla(tablaSimbolos);
                for(var i = 0; i<this.cantElse; i++){
                    this.cuerpo_else[i].operar(nuevaTabla, salida);
                }
                return true;
            }
        }
    }

}

module.exports = Si;