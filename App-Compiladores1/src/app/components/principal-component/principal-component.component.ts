import { Component, OnInit } from '@angular/core';
import {Error} from "../../../analisis/clases/Error";
import {DBTabla} from "../../../analisis/clases/DBTabla";
import {graphviz} from 'd3-graphviz';

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
  UploadfileText:string = "";
  UploadfileName:string = "";
  resultado:string = "";
  hiddenEditor:boolean = false;
  hiddenErrores:boolean = true;
  hiddenTablas:boolean = true;
  hiddenGraficos:boolean = true;
  hiddenUpload:boolean = true;
  errores:Error[] = [];
  tablas:DBTabla[] = [];


  constructor() { }

  ngOnInit(): void {
    
  }

  graficar(){
    graphviz("#reporteGrafico").renderDot('digraph G { node0[label="Suma"] node0 -> b,c,d,a}');
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

  limpiarEditor(){
    this.texto = '';
  }

  descargarCRL(){
    const file = new Blob([this.texto], {type: "text/plain"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    if(this.UploadfileName === ""){
      link.download = "archivo.crl";
    } else {
      link.download = this.UploadfileName;
    }
    link.click();
    link.remove();
  }

  async subirCRL(event:any){
      const file:File = event.target.files[0];
      this.UploadfileName = file.name;
      this.UploadfileText = await file.text();
  }

  importarCRL(){
    this.texto = this.UploadfileText;
    this.hiddenUpload = true;
  }

  mostrarUpload(){
    this.hiddenUpload = false;
  }

  mostrarEditor(){
    this.hiddenEditor = false;
    this.hiddenErrores = true;
    this.hiddenTablas = true;
    this.hiddenGraficos = true;
  }

  mostrarErrores(){
    this.hiddenEditor = true;
    this.hiddenErrores = false;
    this.hiddenTablas = true;
    this.hiddenGraficos = true;
  }

  mostrarTablas(){
    this.hiddenEditor = true;
    this.hiddenErrores = true;
    this.hiddenTablas = false;
    this.hiddenGraficos = true;
  }

  mostrarGraficos(){
    this.hiddenEditor = true;
    this.hiddenErrores = true;
    this.hiddenTablas = true;
    this.hiddenGraficos = false;
  }

  limpiarConsola(){
    this.resultado = "";
  }

}
