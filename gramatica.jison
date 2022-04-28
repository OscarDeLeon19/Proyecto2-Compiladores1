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
	var tabla = new Tabla(null);
	var salida = new Salida();
	var operaciones = [];
	var operaciones_funcion = [];
	var parametros_metodo = [];
	var valores_llamada = [];
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
.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

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
		/*
		for(var i = 0; i< $1.length; i++){
            if($1[i]){
                $1[i].operar(tabla, salida);
			}	
        }
		*/
		return salida;
		
	}
    | EOF
;

instrucciones
	: instrucciones instruccion SALTO {$$ = operaciones; operaciones.push($2);}
	| instruccion SALTO {operaciones.push($1);}
	| error {console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (yylineno) + ', en la columna: ' + this._$.first_column)}
;

instruccion
	: declaracion {if ($1!=null){$$ = $1}}
	| funcion {$$ = null}
	| mostrar {$$ = $1;}	
	| 
;

dibujar_EXP
	: DIBUJAREXP PARIZQ expresion PARDER
;

dibujar_TS
	: DIBUJARTS PARIZQ PARDER
;

dibujar_AST
	: DIBUJARAST PARIZQ ID PARDER
;

mostrar
	: MOSTRAR PARIZQ expresion PARDER {$$ = new Mostrar("Mostrar",$3,Tipo.VALOR,yylineno,this._$.first_column);}
;

mientras 
	: MIENTRAS PARIZQ expresion PARDER DOSPTS SALTO instrucciones_para
;

para
	: PARA PARIZQ declaracion PTCOMA expresion PTCOMA aumentar PARDER DOSPTS SALTO instrucciones_para
;

aumentar
	: INCREMENTO
	| DECREMENTO
;

instrucciones_para
	: instrucciones_para TAB TAB instruccion_para SALTO
	| TAB TAB instruccion_para SALTO
	;

instruccion_para
	:  declaracion
	|  asignacion
	|  llamada
	|  DETENER
	|  CONTINUAR
	|  mostrar
	|  dibujar_AST	
	| dibujar_EXP
	| dibujar_TS
	|
;


si
	: SI PARIZQ expresion PARDER DOSPTS SALTO instrucciones_if TAB SINO DOSPTS SALTO instrucciones_if
	| SI PARIZQ expresion PARDER DOSPTS SALTO instrucciones_if
;

instrucciones_if
	: instrucciones_if TAB TAB instruccion_if SALTO
	| TAB TAB instruccion_if SALTO
	;

instruccion_if
	:  declaracion
	|  asignacion
	|  llamada
	|  mostrar	
	|  dibujar_AST
	|  dibujar_EXP
	|  dibujar_TS
	|
	| error {console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (yylineno) + ', en la columna: ' + this._$.first_column)}
;

instrucciones_funcion
	: instrucciones_funcion TAB instruccion_funcion SALTO
	| TAB instruccion_funcion SALTO
;

instruccion_funcion
	:  declaracion
	|  asignacion
	|  llamada
	|  mostrar
	|  dibujar_AST
	|  dibujar_EXP
	|  dibujar_TS
	|  si	
	|  para	
	|  mientras	
	|
	| error {console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (yylineno) + ', en la columna: ' + this._$.first_column)}
;

funcion
	: tipo ID PARIZQ parametros PARDER DOSPTS SALTO instrucciones_funcion TAB retorno_metodo SALTO {$$ = new Funcion("Funcion",$2,$4,$8,$10,$1,Tipo.VALOR,yylineno,this._$.first_column);}
	| VOID ID PARIZQ parametros PARDER DOSPTS SALTO instrucciones_funcion retorno SALTO {$$ = new Funcion("Funcion",$2,$4,$8,$9,Tipo.VOID,Tipo.VALOR,yylineno,this._$.first_column);}
	| tipo ID PARIZQ PARDER DOSPTS SALTO instrucciones_funcion TAB retorno_metodo SALTO {$$ = new Funcion("Funcion",$2,null,$7,$9,$1,Tipo.VALOR,yylineno,this._$.first_column);}
	| VOID ID PARIZQ PARDER DOSPTS SALTO instrucciones_funcion retorno SALTO {$$ = new Funcion("Funcion",$2,null,$7,$8,Tipo.VOID,Tipo.VALOR,yylineno,this._$.first_column);}
	| VOID PRINCIPAL PARIZQ PARDER DOSPTS SALTO instruccion_funcion {$$ = new Funcion("Funcion","Principal",null,$7,null,Tipo.VOID,Tipo.VALOR,yylineno,this._$.first_column);}
;

retorno_metodo
	: RETORNO expresion {$$ = new Retorno("Retorno",$2, yylineno,this._$.first_column);}
	| RETORNO {$$ = new Retorno("Retorno",null, yylineno,this._$.first_column);}
;

retorno
	:TAB RETORNO {$$ = new Retorno("Retorno",null, yylineno,this._$.first_column);}
	| 
;

llamada
	: ID PARIZQ lista_valores PARDER {$$ = new Llamada("Llamada",$1,$3,Tipo.LLAMADA,Tipo.VALOR,yylineno,this._$.first_column);}
	| ID PARIZQ PARDER {$$ = new Llamada("Llamada",$1,null,Tipo.LLAMADA,Tipo.VALOR,yylineno,this._$.first_column);}
;

lista_valores
	: lista_valores COMA expresion {$$ = valores_llamada; valores_llamada.push($3);}
	| expresion {valores_llamada = []; valores_llamada.push($1);}
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
     | expresion_relacional_1 MAYOR_IGUAL expresion_relacional_1 {$$ = new Relacion("Relacion",$1,$3,Tipo.MAYOR_IGUAL,Tipo.VALOR,yylineno,this._$.first_column);}
     | expresion_relacional_1 MENOR_IGUAL expresion_relacional_1 {$$ = new Relacion("Relacion",$1,$3,Tipo.MENOR_IGUAL,Tipo.VALOR,yylineno,this._$.first_column);}
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
