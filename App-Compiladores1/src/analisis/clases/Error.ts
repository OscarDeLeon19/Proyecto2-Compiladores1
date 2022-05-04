
export class Error{

    tipo:any;
    mensaje:string;
    fila:number;
    columna:number;

    constructor(tipo:any, mensaje:string, fila:number, columna:number){
        this.tipo = tipo;
        this.mensaje = mensaje;
        this.fila = (fila+1);
        this.columna = columna;
    }
}