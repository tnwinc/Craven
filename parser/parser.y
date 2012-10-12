%start SQLStatement

%%

SQLStatement
  : OPERATION EOF
    {return $$;}
  ;

OPERATION
  : CRUDOPERATION
    { $$ = $1; }
  | CRUDOPERATION WHERESTATEMENT
    { $$ = $1; $1.filters = $2; }
  ;

CRUDOPERATION
  : SELECT PROPERTIES FROM IDENTIFIER
    { $$ = {type: 'SELECT', properties: $2, collection: $4}; }
  ;

PROPERTIES
  : ALLPROPERTIES
    { $$ = null; }
  | IDENTIFIERLIST
    { $$ = $1; }
  ;

IDENTIFIERLIST
  : IDENTIFIER
    { $$ = [$1]; }
  | IDENTIFIERLIST ',' IDENTIFIER
    { $$ = $1; $1.push($3); }
  ;

WHERESTATEMENT
  : WHERE WHERECLAUSELIST
    { $$ = $2; }
  ;

WHERECLAUSELIST
  : WHERECLAUSE
    { $$ = [$1]; }
  | WHERECLAUSELIST AND WHERECLAUSE
    { $$ = $1; $3.logicalOperator = 'AND'; $1.push($3); }
  | WHERECLAUSELIST OR WHERECLAUSE
    { $$ = $1; $3.logicalOperator = 'OR'; $1.push($3); }
  ;

WHERECLAUSE
  : IDENTIFIER OP VALUE
    { $$ = {key: $1, operator: $2, value: $3}; }
  | OPENGROUP WHERECLAUSELIST CLOSEGROUP
    { $$ = {group: $2}; }
  ;

VALUE
  : NUMBER
    { $$ = $1; }
  | STRING
    { $$ = $1; }
  ;
