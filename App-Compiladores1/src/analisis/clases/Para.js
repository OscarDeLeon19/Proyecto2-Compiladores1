const Salida = require('./Salida');
const Tabla = require('./Tabla');
const Tipo = require('./Tipo');
const Iteracion = require('./Iteracion');


class Para {

    /**
     * Clase de la instruccion Para
     * @param {*} id 
     * @param {*} declaracion 
     * @param {*} relacion 
     * @param {Iteracion} iterador 
     * @param {*} cuerpo 
     * @param {*} cantOperaciones 
     * @param {*} fila 
     * @param {*} columna 
     */
    constructor(id, declaracion, relacion, iterador, cuerpo, cantOperaciones, fila, columna) {
        this.id = id;
        this.relacion = relacion;
        this.declaracion = declaracion;
        this.cuerpo = [];
        if (this.cuerpo != null) {
            this.cuerpo = cuerpo;
        }
        this.iterador = iterador;
        this.fila = fila;
        this.columna = columna;
        this.cantOperaciones = cantOperaciones;
    }
    /**
     * Opera la instruccion para
     * @param {Tabla} tablaSimbolos 
     * @param {Salida} salida 
     */
    operar(tablaSimbolos, salida) {
        // Crea una nueva tabla para este scope.
        var nuevaTabla = new Tabla(tablaSimbolos);
        // Opera la declaracion del ciclo
        if (this.declaracion.operar(nuevaTabla, salida) == null) {
            salida.agregarError(Tipo.SEMANTICO, "Error en la declaracion del ciclo", this.fila-1, this.columna);
            return null;
        }
        // Asigna la variable del ciclo a la de iteracion
        var variableIteracion = this.declaracion.identificadores[0];
        // Opera la expresion relacional del ciclo.
        var expresion = this.relacion.operar(nuevaTabla, salida);
        if (expresion == null) {
            salida.agregarError(Tipo.SEMANTICO, "Error en la expresion relacional del ciclo", this.fila-1, this.columna);
            return null;
        }
        if (expresion.tipoDato != Tipo.BOOLEAN) {
            salida.agregarError(Tipo.SEMANTICO, "La expresion del for debe ser booleana", this.fila-1, this.columna);
            return null;
        }

        // Asigna la variable al iterador
        this.iterador.setIdentificador(variableIteracion);
        // Inicia un while que se ejecutara mientras la relacion se cumpla.
        while (expresion.valor === true) {
            var detener = false;
            for (var i = 0; i < this.cantOperaciones; i++) {
                if (this.cuerpo[i].id === "Detener") {
                    detener = true;
                    break;
                } else if (this.cuerpo[i].id === "Continuar") {
                    break;
                } else {
                    this.cuerpo[i].operar(nuevaTabla, salida);
                    if(this.cuerpo[i].id === "Si"){
                        if(this.cuerpo[i].valorCiclo === "Detener"){
                            detener = true;
                            break;
                        } else if(this.cuerpo[i].valorCiclo === "Continuar"){
                            break;
                        }
                    }
                }
            }
            // Si se encuentra una instruccion detener el ciclo se termina
            if(detener === true){
                break;
            }
            // Si hay un error en el iterador se termina el ciclo.
            if (this.iterador.operar(nuevaTabla, salida) == null) {
                salida.agregarError(Tipo.SEMANTICO, "Error al realizar la iteracion", this.fila-1, this.columna);
                return null;
            }

            expresion = this.relacion.operar(nuevaTabla, salida);
            if (expresion == null) {
                salida.agregarError(Tipo.SEMANTICO, "Error en la expresion relacional del ciclo", this.fila-1, this.columna);
                return null;
            }
            if (expresion.tipoDato != Tipo.BOOLEAN) {
                salida.agregarError(Tipo.SEMANTICO, "La expresion del for debe ser booleana", this.fila-1, this.columna);
                return null;
            }
        }
        return true;
    }

    /**
     * Grafica los nodos del AST del ciclo.
     * @param {Conteo} conteo 
     * @param {Salida} salida 
     */
     graficarAST(conteo, salida){
        var nodo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var label = '[label = "Para"]';
        conteo.agregarEncabezado(nodo+label);

        var nodoDecla = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelDecla = '[label = "Declaracion"]';
        conteo.agregarEncabezado(nodoDecla+labelDecla);

        var nodoEXP = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelEXP = '[label = "Expresion"]';
        conteo.agregarEncabezado(nodoEXP+labelEXP);

        var nodoIter = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelIter = '[label = "Iteracion"]';
        conteo.agregarEncabezado(nodoIter+labelIter);

        var nodoCuerpo = "node" + conteo.conteoNodo;
        conteo.sumarConteo();
        var labelCuerpo = '[label = "Cuerpo"]';
        conteo.agregarEncabezado(nodoCuerpo+labelCuerpo);

        var texto = nodo + "->" + nodoDecla +"\n";
        texto += nodo + "->" + nodoEXP +"\n";
        texto += nodo + "->" + nodoIter +"\n";
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
            } else if(this.cuerpo[i].id  == "Continuar"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else if(this.cuerpo[i].id  == "Detener"){
                texto += nodoCuerpo+ "->"+ this.cuerpo[i].graficarAST(conteo, salida) + "\n";
            } else {
                console.log("ERror")
            }           
        }
       return texto;
    }

}

module.exports = Para;