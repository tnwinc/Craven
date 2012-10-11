%%
\s+     /* skip whitespace */

[Ss][Ee][Ll][Ee][Cc][Tt]      return 'SELECT'
[Ww][Hh][Ee][Rr][Ee]        return 'WHERE'
[Ff][Rr][Oo][Mm]         return 'FROM'
[Aa][Nn][Dd]          return 'AND'
"*"            return 'ALLPROPERTIES'
","            return ','
[a-zA-Z_-]+    return 'IDENTIFIER'
\d+            return 'NUMBER'
['].*?[']      return 'STRING'
[><=]          return 'OP'

<<EOF>>        return 'EOF'