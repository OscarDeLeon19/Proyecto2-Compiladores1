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
        this.fila = fila+1;
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
            var detener = false;
            for(var i = 0; i < this.cantOperaciones; i++){
                if (this.cuerpo[i].id === "Detener") {
                    detener = true;
                    break;
                } else if (this.cuerpo[i].id === "Continuar") {
                    break;
                } else {
                    this.cuerpo[i].operar(nuevaTabla, salida);
                }
            }
            if(detener === true){
                break;
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

    /**
     * 
     * @param {Conteo} conteo 
     * @param {Salida} salida 
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "Mientras"]';
        conteo.agregarEncabezado(nodo+label);

        var nodoEXP = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelEXP = '[label = "Expresion"]';
        conteo.agregarEncabezado(nodoEXP+labelEXP);

        var nodoCuerpo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelCuerpo = '[label = "Cuerpo"]';
        conteo.agregarEncabezado(nodoCuerpo+labelCuerpo);

        var texto = nodo + "->" + nodoEXP +"\n";
        texto += nodo + "->" + nodoCuerpo + "\n";

        for(var i = 0; i < this.cuerpo.length; i++){        
            if(this.cuerpo[i].id == "Declaracion"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Asignacion"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Mostrar"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Llamada"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "DibujarAST"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            }  else if(this.cuerpo[i].id  == "DibujarEXP"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "DibujarTS"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Si"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Para"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Mientras"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else {
                console.log("ERror")
            }           
        }
       return texto;
    }

}

module.exports = Mientras;