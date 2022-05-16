
export class Error{

    tipo:any;
    mensaje:string;
    fila:number;
    columna:number;
    /**
     * Guarda un error del programa.
     * @param tipo 
     * @param mensaje 
     * @param fila 
     * @param columna 
     */
    constructor(tipo:any, mensaje:string, fila:number, columna:number){
        this.tipo = tipo;
        this.mensaje = mensaje;
        this.fila = fila;
        this.columna = columna;
    }
}