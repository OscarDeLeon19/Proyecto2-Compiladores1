
export class Columna{

    id:string;
    valor:any;
    tipo:any;
    fila:number;
    columna:number;

    constructor(id:string, valor:any, tipo:any, fila:number, columna:number){
        this.id = id;
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
}