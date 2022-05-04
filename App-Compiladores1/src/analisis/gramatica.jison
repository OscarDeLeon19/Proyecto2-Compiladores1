/**
 * Gramatica Proyecto 2 | Compiladores 1
 */

%{
	const Tipo = require('./clases/Tipo');
	const Tabla = require('./clases/Tabla');
	const Salida = require("./clases/Salida");
	const Valor = require('./clases/Valor');
	const Operacion = require('./clases/Operacion');
	const Relacion = require('./clases/Relacion');
	const Logica = require('./clases/Logica');
	const Declaracion = require('./clases/Declaracion');
	const Mostrar = require('./clases/Mostrar');
	const Asignacion = require('./clases/Asignacion');
	const Funcion = require('./clases/Funcion');
	const Retorno = require('./clases/Retorno');
	const Llamada = require('./clases/Llamada');
	const Si = require('./clases/Si');
	const Para = require('./clases/Para');
	const Mientras = require('./clases/Mientras');
	const Iteracion = require('./clases/Iteracion');
	const Detener = require('./clases/Detener');
	const Continuar = require('./clases/Continuar');
	const DibujarAST = require('./clases/DibujarAST');
	const DibujarEXP = require('./clases/DibujarEXP');
	const DibujarTS = require('./clases/DibujarTS');
	var tabla = new Tabla(null);
	var salida = new Salida();
	var operaciones = [];
	var operaciones_funcion = [];
	var operaciones_si = [];
	var operaciones_else = [];
	var parametros_metodo = [];
	var valores_llamada = [];
	var operaciones_ciclo = [];
%}

// Parte Lexica
%lex

%%

/* Espacios en blanco */
[ ]+				{}
[	]            	return 'TAB';
\n                 	return 'SALTO';
[\r]+				{}

"!!".*										// Comentario de una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

"Importar"			return 'IMPORTAR';
"Incerteza"			return 'INCERTEZA';
"Double"			return 'DOUBLE';
"Boolean"			return 'BOOLEAN';
"String"			return 'STRING';
"Int"				return 'INT';
"Char"				return 'CHAR';
"Void"			    return 'VOID';
"true"				return 'TRUE';
"false"				return 'FALSE';
"Retorno"			return 'RETORNO';
"Principal"			return 'PRINCIPAL';
"Si"				return 'SI';
"Sino"				return 'SINO';
"Para"				return 'PARA';
"Mientras"			return 'MIENTRAS';
"Detener"			return 'DETENER';
"Continuar"			return 'CONTINUAR';
"Mostrar"			return 'MOSTRAR';
"DibujarAST"		return 'DIBUJARAST';
"DibujarEXP"		return 'DIBUJAREXP';
"DibujarTS"			return 'DIBUJARTS';

","					return 'COMA';
":"					return 'DOSPTS';
";"					return 'PTCOMA';
"{"					return 'LLAVIZQ';
"}"					return 'LLAVDER';
"("					return 'PARIZQ';
")"					return 'PARDER';




"++"				return 'INCREMENTO';
"--"                return 'DECREMENTO';
"+"					return 'MAS';
"-"					return 'MENOS';
"*"					return 'POR';
"/"					return 'DIVIDIDO';
"%"					return 'MODULO';
"^"					return 'POTENCIA';

"<="				return 'MENOR_IGUAL';
">="				return 'MAYOR_IGUAL';
"=="				return 'DOBLE_IGUAL';
"!="				return 'DIFERENTE';
"<"					return 'MENOR';
">"					return 'MAYOR';
"="					return 'IGUAL';
"~"					return 'INCERT';

"&&"				return 'AND'
"||"				return 'OR';
"!&"				return 'XOR';
"!"					return 'NOT';

\'([^']|"\\n"|"\\r"|"\\t")\'             return 'CARACTER';
[0-9]+"."[0-9]+\b          			     return 'DECIMAL';
[0-9]+\b                   			     return 'ENTERO';
([\"]("\\\""|[^"])*[^\\][\"])|[\"][\"]   return 'CADENA';
([a-zA-Z"_"])[a-z0-9A-Z"_""ñ""Ñ"]*       return 'ID';


<<EOF>>				return 'EOF';
.					{salida.agregarError(Tipo.LEXICO, "Error en el lexema: " + yytext, yylloc.first_line,yylloc.first_column); console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex


%{

%}


/* Asociación de operadores y precedencia */

%right IGUAL
%left XOR
%left OR
%left AND
%left DOBLE_IGUAL, DIFERENTE
%left MAYOR, MENOR, MAYOR_IGUAL, MENOR_IGUAL, INCERT
%left MAS, MENOS
%left POR, DIVIDIDO, MODULO
%right POTENCIA 
%right NOT

%start ini

%% /* Definición de la gramática */

ini
	: instrucciones EOF {
	
		var nuevaTabla = new Tabla(tabla);
		for(var i = 0; i< $1.length; i++){
            if($1[i]){
                $1[i].operar(tabla, salida);
			}	
        }
		var funcionPrincipal = tabla.obtenerFuncion('Principal',0);
		if (funcionPrincipal != null){
			funcionPrincipal.operar(nuevaTabla, salida);		
		} else {
			console.log("error");
		}
		tabla = new Tabla(null);
		return salida;
		
	}
    | EOF
;

instrucciones
	: instrucciones instruccion SALTO {$$ = operaciones; if($2 != null){operaciones.push($2)};}
	| instruccion SALTO {if($1 != null){operaciones.push($1)};}
	| error {salida.agregarError(Tipo.SINTACTICO, "Error en el lexema: " + yytext, yylineno, this._$.first_column); console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (yylineno) + ', en la columna: ' + this._$.first_column)}
;

instruccion
	: declaracion {if ($1!=null){$$ = $1}}
	| funcion { $$ = null;}
	| VOID PRINCIPAL PARIZQ PARDER DOSPTS SALTO instrucciones_funcion {$$ = null; tabla.agregarFuncion(new Funcion("Funcion","Principal",null,operaciones_funcion,null,Tipo.VOID,Tipo.VALOR,yylineno,this._$.first_column)); operaciones_funcion = [];}	
	| {$$ = null}
;

dibujar_EXP
	: DIBUJAREXP PARIZQ expresion PARDER {$$ = new DibujarEXP("DibujarAST",$3,yylineno,this._$.first_column)}
;

dibujar_TS
	: DIBUJARTS PARIZQ PARDER {$$ = new DibujarTS("DibujarTS",yylineno,this._$.first_column)}
;

dibujar_AST
	: DIBUJARAST PARIZQ ID PARDER {$$ = new DibujarAST("DibujarAST",$3,yylineno,this._$.first_column)}
;

mostrar
	: MOSTRAR PARIZQ expresion PARDER {$$ = new Mostrar("Mostrar",$3,Tipo.VALOR,yylineno,this._$.first_column);}
;

mientras 
	: MIENTRAS PARIZQ expresion PARDER DOSPTS SALTO instrucciones_para {$$ = new Mientras("Mientras",$3,operaciones_ciclo,operaciones_ciclo.length,yylineno,this._$.first_column); operaciones_ciclo = [];}
;

para
	: PARA PARIZQ declaracion PTCOMA expresion PTCOMA aumentar PARDER DOSPTS SALTO instrucciones_para {$$ = new Para("Para",$3,$5,$7,operaciones_ciclo,operaciones_ciclo.length,yylineno,this._$.first_column); operaciones_ciclo = [];}
;

aumentar
	: INCREMENTO {$$ = new Iteracion("Iteracion",Tipo.INCREMENTO,yylineno,this._$.first_column);}
	| DECREMENTO {$$ = new Iteracion("Iteracion",Tipo.DECREMENTO,yylineno,this._$.first_column);}
;

instrucciones_para
	: instrucciones_para TAB TAB instruccion_para SALTO
	| TAB TAB instruccion_para SALTO
	| SALTO
	;

instruccion_para
	:  declaracion {if ($1!=null){operaciones_ciclo.push($1);}}
	|  asignacion {operaciones_ciclo.push($1);}
	|  llamada {operaciones_ciclo.push($1);}
	|  DETENER {operaciones_ciclo.push(new Detener("Detener",yylineno,this._$.first_column));}
	|  CONTINUAR {operaciones_ciclo.push(new Detener("Continuar",yylineno,this._$.first_column));}
	|  mostrar {operaciones_ciclo.push($1);}
	|  dibujar_AST {operaciones_ciclo.push($1);} 
	| dibujar_EXP {operaciones_ciclo.push($1);} 
	| dibujar_TS {operaciones_ciclo.push($1);} 
	| {$$ = null}
;


si
	: SI PARIZQ expresion PARDER DOSPTS SALTO instrucciones_if TAB SINO DOSPTS SALTO instrucciones_else {$$ = new Si("Si",$3,Tipo.SI,operaciones_si,operaciones_si.length,operaciones_else,operaciones_else.length,yylineno,this._$.first_column); console.log(operaciones_si.length);operaciones_si = []; operaciones_else = [];}
	| SI PARIZQ expresion PARDER DOSPTS SALTO instrucciones_if {$$ = new Si("Si",$3,Tipo.SI,operaciones_si,operaciones_si.length,null,0,yylineno,this._$.first_column); operaciones_si = [];}
;

instrucciones_if
	: instrucciones_if TAB TAB instruccion_if SALTO
	| TAB TAB instruccion_if SALTO
	| SALTO
	;

instruccion_if
	:  declaracion {if ($1!=null){operaciones_si.push($1);}}
	|  asignacion {operaciones_si.push($1);}
	|  llamada {operaciones_si.push($1);}
	|  mostrar	{operaciones_si.push($1);}
	|  dibujar_AST {operaciones_si.push($1);}
	|  dibujar_EXP {operaciones_si.push($1);}
	|  dibujar_TS  {operaciones_si.push($1);}
	| {$$ = null}
	| error {salida.agregarError(Tipo.SINTACTICO, "Error en el lexema: " + yytext, yylineno, this._$.first_column); console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (yylineno) + ', en la columna: ' + this._$.first_column)}
;

instrucciones_else
	: instrucciones_else TAB TAB instruccion_else SALTO
	| TAB TAB instruccion_else SALTO
	;

instruccion_else
	:  declaracion {if ($1!=null){operaciones_else.push($1);}}
	|  asignacion {operaciones_else.push($1);}
	|  llamada {operaciones_else.push($1);}
	|  mostrar {operaciones_else.push($1);}	
	|  dibujar_AST {operaciones_else.push($1);}
	|  dibujar_EXP {operaciones_else.push($1);}
	|  dibujar_TS {operaciones_else.push($1);}
	| {$$ = null}
	| error {salida.agregarError(Tipo.SINTACTICO, "Error en el lexema: " + yytext, yylineno, this._$.first_column); console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (yylineno) + ', en la columna: ' + this._$.first_column)}
;

funcion
	: tipo ID PARIZQ parametros PARDER DOSPTS SALTO instrucciones_funcion retorno_metodo SALTO {$$ = null; tabla.agregarFuncion(new Funcion("Funcion",$2,parametros_metodo,operaciones_funcion,$9,$1,Tipo.VALOR,yylineno,this._$.first_column)); operaciones_funcion = []; parametros_metodo = []; }
	| VOID ID PARIZQ parametros PARDER DOSPTS SALTO instrucciones_funcion retorno SALTO {$$ = null; tabla.agregarFuncion(new Funcion("Funcion",$2,parametros_metodo,operaciones_funcion,$9,Tipo.VOID,Tipo.VALOR,yylineno,this._$.first_column)); operaciones_funcion = []; parametros_metodo = [];}
	| tipo ID PARIZQ PARDER DOSPTS SALTO instrucciones_funcion retorno_metodo SALTO {$$ = null; tabla.agregarFuncion(new Funcion("Funcion",$2,null,operaciones_funcion,$8,$1,Tipo.VALOR,yylineno,this._$.first_column)); operaciones_funcion = [];}
	| VOID ID PARIZQ PARDER DOSPTS SALTO instrucciones_funcion retorno SALTO {$$ = null; tabla.agregarFuncion(new Funcion("Funcion",$2,null,operaciones_funcion,$8,Tipo.VOID,Tipo.VALOR,yylineno,this._$.first_column)); operaciones_funcion = []; }	
;

instrucciones_funcion
	: instrucciones_funcion TAB instruccion_funcion SALTO //{$$ = operaciones_funcion; if($3 != null){operaciones_funcion.push($3)};}
	| TAB instruccion_funcion SALTO //{if($2 != null){operaciones_funcion.push($2)};}
	| SALTO {}
;

instruccion_funcion
	:  declaracion {if ($1!=null){operaciones_funcion.push($1);}}
	|  asignacion {operaciones_funcion.push($1);}
	|  llamada {operaciones_funcion.push($1);}
	|  mostrar {operaciones_funcion.push($1);}
	|  si {operaciones_funcion.push($1);}
	|  para	{operaciones_funcion.push($1);}
	|  mientras	{operaciones_funcion.push($1);}
	|  dibujar_AST {operaciones_funcion.push($1);}
	|  dibujar_EXP {operaciones_funcion.push($1);}
	|  dibujar_TS {operaciones_funcion.push($1);}
	|  {$$ = null}
	| error {salida.agregarError(Tipo.SINTACTICO, "Error en el lexema: " + yytext, yylineno, this._$.first_column); console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (yylineno) + ', en la columna: ' + this._$.first_column)}
;

retorno_metodo
	: TAB RETORNO expresion {$$ = new Retorno("Retorno",$3, yylineno,this._$.first_column);}
	| TAB RETORNO {$$ = new Retorno("Retorno",null, yylineno,this._$.first_column);}
;

retorno
	:TAB RETORNO {$$ = new Retorno("Retorno",null, yylineno,this._$.first_column);}
	| {$$ = new Retorno("Retorno",null, yylineno,this._$.first_column);}
;

llamada
	: ID PARIZQ lista_valores PARDER {$$ = new Llamada("Llamada",$1,valores_llamada,Tipo.LLAMADA,Tipo.VALOR,yylineno,this._$.first_column); valores_llamada = []}
	| ID PARIZQ PARDER {$$ = new Llamada("Llamada",$1,null,Tipo.LLAMADA,Tipo.VALOR,yylineno,this._$.first_column);}
;

lista_valores
	: lista_valores COMA expresion {valores_llamada.push($3);}
	| expresion {valores_llamada.push($1);}
;

parametros
	: parametros COMA tipo ID {$$ = parametros_metodo; parametros_metodo.push(new Declaracion("Declaracion",$4,null,$3,Tipo.VALOR,yylineno,this._$.first_column));}
	| tipo ID {parametros_metodo.push(new Declaracion("Declaracion",$2,null,$1,Tipo.VALOR,yylineno,this._$.first_column));}
;

asignacion 
	: ID IGUAL expresion {$$ = new Asignacion("Asignacion",$1,$3,yylineno,this._$.first_column);}
;

declaracion
	:	tipo ID IGUAL expresion {$$ = new Declaracion("Declaracion",$2,$4,$1,Tipo.VALOR,yylineno,this._$.first_column);}
	| 	tipo ID {$$ = new Declaracion("Declaracion",$2,null,$1,Tipo.VALOR,yylineno,this._$.first_column);}
;

tipo
     : INT {$$ = Tipo.ENTERO;}
     | DOUBLE {$$ = Tipo.DECIMAL;}
     | BOOLEAN {$$ = Tipo.BOOLEAN;}
     | CHAR {$$ = Tipo.CARACTER;}
     | STRING {$$ = Tipo.CADENA;}
;

// Expresiones logicas

expresion
    : expresion OR expresion {$$ = new Logica("Logica",$1,$3,Tipo.OR,Tipo.VALOR,yylineno,this._$.first_column);}
	| expresion_1 {$$ = $1}
;

expresion_1
    : expresion_1 AND expresion_1 {$$ = new Logica("Logica",$1,$3,Tipo.AND,Tipo.VALOR,yylineno,this._$.first_column);}
    | expresion_relacional {$$ = $1}
;

// Expresiones Relacionales
expresion_relacional
	: expresion_relacional DOBLE_IGUAL  expresion_relacional {$$ = new Relacion("Relacion",$1,$3,Tipo.IGUAL,Tipo.VALOR,yylineno,this._$.first_column);}
    | expresion_relacional DIFERENTE expresion_relacional {$$ = new Relacion("Relacion",$1,$3,Tipo.DIFERENTE,Tipo.VALOR,yylineno,this._$.first_column);}
    | expresion_relacional_1 {$$ = $1;}
;

expresion_relacional_1
     : expresion_relacional_1 MAYOR expresion_relacional_1 {$$ = new Relacion("Relacion",$1,$3,Tipo.MAYOR,Tipo.VALOR,yylineno,this._$.first_column);}
     | expresion_relacional_1 MENOR expresion_relacional_1 {$$ = new Relacion("Relacion",$1,$3,Tipo.MENOR,Tipo.VALOR,yylineno,this._$.first_column);}
     | expresion_relacional_1 MAYOR_IGUAL expresion_relacional_1 {$$ = new Relacion("Relacion",$1,$3,Tipo.MAYORIGUAL,Tipo.VALOR,yylineno,this._$.first_column);}
     | expresion_relacional_1 MENOR_IGUAL expresion_relacional_1 {$$ = new Relacion("Relacion",$1,$3,Tipo.MENORIGUAL,Tipo.VALOR,yylineno,this._$.first_column);}
	 | expresion_relacional_1 INCERT expresion_relacional_1 {$$ = new Relacion("Relacion",$1,$3,Tipo.INCERTEZA,Tipo.VALOR,yylineno,this._$.first_column);}	
     | expresion_aritmetica {$$ = $1;}
;
//-----------------------------------------------------------------------------------------------------------
//producciones para operaciones aritmeticas
expresion_aritmetica 
	: expresion_aritmetica MAS expresion_aritmetica {$$ = new Operacion("Operacion",$1,$3,Tipo.SUMA,Tipo.VALOR,yylineno,this._$.first_column);}
    | expresion_aritmetica MENOS expresion_aritmetica {$$ = new Operacion("Operacion",$1,$3,Tipo.RESTA,Tipo.VALOR,yylineno,this._$.first_column);}
    | expresion_aritmetica_1 {$$ = $1;}
;

expresion_aritmetica_1 
	 : expresion_aritmetica_1 POR expresion_aritmetica_1 {$$ = new Operacion("Operacion",$1,$3,Tipo.MULTIPLICACION,Tipo.VALOR,yylineno,this._$.first_column);}
     | expresion_aritmetica_1 DIVIDIDO expresion_aritmetica_1 {$$ = new Operacion("Operacion",$1,$3,Tipo.DIVISION,Tipo.VALOR,yylineno,this._$.first_column);}
     | expresion_aritmetica_1 MODULO expresion_aritmetica_1 {$$ = new Operacion("Operacion",$1,$3,Tipo.MODULO,Tipo.VALOR,yylineno,this._$.first_column);}
     | expresion_aritmetica_1 POTENCIA expresion_aritmetica_1 {$$ = new Operacion("Operacion",$1,$3,Tipo.POTENCIA,Tipo.VALOR,yylineno,this._$.first_column);}
     | expresion_not {$$ = $1;}
;

expresion_not
	: NOT expresion_not {$$ = new Logica("Logica",$2,null,Tipo.NOT,Tipo.VALOR,yylineno,this._$.first_column);}
    | valores {$$ = $1;}
;

valores
     : DECIMAL {$$ = new Valor(Number($1),Tipo.DECIMAL,Tipo.VALOR,yylineno,this._$.first_column);}
     | ENTERO {$$ = new Valor(Number($1),Tipo.ENTERO,Tipo.VALOR,yylineno,this._$.first_column);}
     | MENOS DECIMAL {$$ = new Valor(-1*Number($2),Tipo.DECIMAL,Tipo.VALOR,yylineno,this._$.first_column);}
     | MENOS ENTERO {$$ = new Valor(-1*Number($2),Tipo.ENTERO,Tipo.VALOR,yylineno,this._$.first_column);}
     | PARIZQ expresion PARDER {$$ = $2;}
     | CADENA {$$ = new Valor($1,Tipo.CADENA,Tipo.VALOR,yylineno,this._$.first_column);}
     | CARACTER {$$ = new Valor($1,Tipo.CARACTER,Tipo.VALOR,yylineno,this._$.first_column);}
     | TRUE {$$ = new Valor(true,Tipo.BOOLEAN,Tipo.VALOR,yylineno,this._$.first_column);}
     | FALSE {$$ = new Valor(false,Tipo.BOOLEAN,Tipo.VALOR,yylineno,this._$.first_column);}
     | ID {$$ = new Valor($1,Tipo.ID,Tipo.VALOR,yylineno,this._$.first_column);}
	 | llamada {$$ = new Valor($1,Tipo.LLAMADA,Tipo.VALOR,yylineno,this._$.first_column);}
;  
