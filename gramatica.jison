/**
 * Gramatica Proyecto 2 | Compiladores 1
 */

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
	: instrucciones EOF 
    | EOF
;

instrucciones
	: instrucciones instruccion SALTO
	| instruccion SALTO
	| error {console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (this._$.first_line) + ', en la columna: ' + this._$.first_column)}
;

instruccion
	: declaracion
	| asignacion
	| funcion
	| llamada
	| sentencia_si	
	| para	
	| mientras
	| mostrar
	| dibujar_AST
	| dibujar_EXP
	| dibujar_TS
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
	: MOSTRAR PARIZQ expresion PARDER
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
	: instrucciones_para TAB instruccion_para SALTO
	| TAB instruccion_para SALTO
	| error {console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (this._$.first_line) + ', en la columna: ' + this._$.first_column)}
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

sentencia_si
	: si sino
	| si
;

si
	: SI PARIZQ expresion PARDER DOSPTS SALTO instrucciones_if
;

sino
	: SINO DOSPTS SALTO instrucciones_if
;

instrucciones_if
	: instrucciones_if TAB instruccion_if SALTO
	| TAB instruccion_if SALTO
	| error {console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (this._$.first_line) + ', en la columna: ' + this._$.first_column)}
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
;

instrucciones_funcion
	: instrucciones_funcion TAB instruccion_funcion SALTO
	| TAB instruccion_funcion SALTO
;

instruccion_funcion
	:  declaracion
	|  asignacion
	|  llamada
	|  retorno
	|  mostrar
	|  dibujar_AST
	| dibujar_EXP
	| dibujar_TS	
	|
;

funcion
	: tipo ID PARIZQ parametros PARDER DOSPTS SALTO instrucciones_funcion
	| VOID ID PARIZQ parametros PARDER DOSPTS SALTO instrucciones_funcion
	| tipo ID PARIZQ PARDER DOSPTS SALTO instrucciones_funcion
	| VOID ID PARIZQ PARDER DOSPTS SALTO instrucciones_funcion
	| VOID PRINCIPAL PARIZQ PARDER DOSPTS SALTO instruccion_funcion
;

retorno
	: RETORNO expresion
	| RETORNO
;

llamada
	: ID PARIZQ lista_valores PARDER
	| ID PARIZQ PARDER
;

lista_valores
	: lista_valores COMA expresion
	| expresion
;

parametros
	: parametros COMA tipo ID
	| tipo ID
;

asignacion 
	: ID IGUAL expresion
;

declaracion
	:	tipo ID IGUAL expresion
	| 	tipo ID 
;

tipo
     : INT 
     | DOUBLE 
     | BOOLEAN 
     | CHAR 
     | STRING
;

// Expresiones logicas

expresion
    : expresion OR expresion 
	| expresion_1
;

expresion_1
    : expresion_1 AND expresion_1 
    | expresion_relacional
;

// Expresiones Relacionales
expresion_relacional
	: expresion_relacional DOBLE_IGUAL  expresion_relacional
    | expresion_relacional DIFERENTE expresion_relacional
    | expresion_relacional_1 {$$ = $1;}
;

expresion_relacional_1
     : expresion_relacional_1 MAYOR expresion_relacional_1
     | expresion_relacional_1 MENOR expresion_relacional_1 
     | expresion_relacional_1 MAYOR_IGUAL expresion_relacional_1 
     | expresion_relacional_1 MENOR_IGUAL expresion_relacional_1 
	 | expresion_relacional_1 INCERT expresion_relacional_1 	
     | expresion_aritmetica {$$ = $1;}
;
//-----------------------------------------------------------------------------------------------------------
//producciones para operaciones aritmeticas
expresion_aritmetica 
	: expresion_aritmetica MAS expresion_aritmetica 
    | expresion_aritmetica MENOS expresion_aritmetica 
    | expresion_aritmetica_1 {$$ = $1;}
;

expresion_aritmetica_1 
	 : expresion_aritmetica_1 POR expresion_aritmetica_1
     | expresion_aritmetica_1 DIVIDIDO expresion_aritmetica_1 
     | expresion_aritmetica_1 MODULO expresion_aritmetica_1 
     | expresion_aritmetica_1 POTENCIA expresion_aritmetica_1
     | expresion_not {$$ = $1;}
;

expresion_not
	: NOT expresion_not
    | valores {$$ = $1;}
;

valores
     : DECIMAL 
     | ENTERO 
     | MENOS DECIMAL 
     | MENOS ENTERO 
     | PARIZQ expresion PARDER 
     | CADENA 
     | CARACTER 
     | TRUE 
     | FALSE 
     | ID 
;  

*/