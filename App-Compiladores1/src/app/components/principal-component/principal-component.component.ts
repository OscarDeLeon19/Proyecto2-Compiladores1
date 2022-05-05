import { Component, OnInit } from '@angular/core';
import {Error} from "../../../analisis/clases/Error";
import {DBTabla} from "../../../analisis/clases/DBTabla";
import {Columna} from "../../../analisis/clases/Columna";

declare var require:any;
const gramatica = require("../../../analisis/gramatica.js");
const Salida = require("../../../analisis/clases/Salida.js")

//import { Salida } from 'src/analisis/clases/Salida';
//import { Error } from 'src/analisis/clases/Error';
@Component({
  selector: 'app-principal-component',
  templateUrl: './principal-component.component.html',
  styleUrls: ['./principal-component.component.css']
})
export class PrincipalComponentComponent implements OnInit {

  texto:string = "";
  resultado:string = "";
  hiddenEditor:boolean = false;
  hiddenErrores:boolean = true;
  hiddenTablas:boolean = true;
  errores:Error[] = [];
  tablas:DBTabla[] = [];


  constructor() { }

  ngOnInit(): void {
    
  }

  compilarProyecto(){
    var outPUT = new Salida();
    outPUT = gramatica.parse(this.texto);
    this.resultado = outPUT.getSalida();
    this.errores = outPUT.getTablaErrores();
    this.tablas = outPUT.getTablasDibujadas();
    if(this.errores.length > 0){
      alert("Hay errores en el programa");
    }
    
    

  }

  descargarCRL(){
    const file = new Blob([this.texto], {type: "text/plain"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "archivo.txt";
    link.click();
    link.remove();
  }

  async subirCRL(event:any){
    
      const file:File = event.target.files[0];
      var t = file.name;
      this.texto = await file.text();
  
  
  }

  mostrarEditor(){
    this.hiddenEditor = false;
    this.hiddenErrores = true;
    this.hiddenTablas = true;
  }

  mostrarErrores(){
    this.hiddenEditor = true;
    this.hiddenErrores = false;
    this.hiddenTablas = true;
  }

  mostrarTablas(){
    this.hiddenEditor = true;
    this.hiddenErrores = true;
    this.hiddenTablas = false;
  }


  limpiarConsola(){
    this.resultado = "";
  }

}
