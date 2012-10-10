%%
\s+     /* skip whitespace */

"SELECT"       return 'SELECT'
"WHERE"        return 'WHERE'
"*"            return 'ALLPROPERTIES'
"FROM"         return 'FROM'
"AND"          return 'AND'
"IS UNDEFINED" return 'ISUNDEFINED'
","            return ','
[a-zA-Z_-]+    return 'IDENTIFIER'
\d+            return 'NUMBER'
['].*?[']      return 'STRING'
[><=]          return 'OP'

<<EOF>>        return 'EOF'
