%%
\s+     /* skip whitespace */

[Ss][Ee][Ll][Ee][Cc][Tt]      return 'SELECT'
[Ww][Hh][Ee][Rr][Ee]          return 'WHERE'
[Ff][Rr][Oo][Mm]              return 'FROM'
[Aa][Nn][Dd]                  return 'AND'
[Oo][Rr]                      return 'OR'
"("            return 'OPENGROUP'
")"            return 'CLOSEGROUP'
"*"            return 'ALLPROPERTIES'
","            return ','
[a-zA-Z_-]+    return 'BASICIDENTIFIER'
\[[.,a-zA-Z_-]+\]   return 'COMPLEXIDENTIFIER'
\d+            return 'NUMBER'
['].*?[']      return 'STRING'
["].*?["]      return 'STRING'
[><=]          return 'OP'

<<EOF>>        return 'EOF'
