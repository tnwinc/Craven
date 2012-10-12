transformer = require('./transformer')
expect = require('chai').expect

describe 'Transforming SQL-like statements into HTTP requests', ->

  ensure_these_statements_map_correctly= [
      'SELECT Name,Id FROM People'
      'http://ravendb/indexes/dynamic/People?fetch=Name&fetch=Id'

      'SELECT * FROM People'
      'http://ravendb/indexes/dynamic/People'

      'Select * fRom People'
      'http://ravendb/indexes/dynamic/People'

      'SELECT [A.B] FROM People'
      'http://ravendb/indexes/dynamic/People?fetch=A.B'

      'SELECT [A,B] FROM People'
      'http://ravendb/indexes/dynamic/People?fetch=A,B'

      'SELECT * FROM People WHERE Id = 20'
      'http://ravendb/indexes/dynamic/People?query=Id:20'

      "SELECT * FROM People WHERE Name = 'Bill'"
      'http://ravendb/indexes/dynamic/People?query=Name:"Bill"'

      'SELECT * FROM People WHERE Name = "Bill"'
      'http://ravendb/indexes/dynamic/People?query=Name:"Bill"'

      "SELECT * FROM People WHERE Name = 'Bill' AND Id = 20"
      'http://ravendb/indexes/dynamic/People?query=Name:"Bill" AND Id:20'

      "SELECT * FROM People WHERE Name = 'Bill' OR Id = 20"
      'http://ravendb/indexes/dynamic/People?query=Name:"Bill" OR Id:20'

      "SELECT * FROM People WHERE (Name = 'Bill' OR Name= 'Mary') AND Age = 20"
      'http://ravendb/indexes/dynamic/People?query=(Name:"Bill" OR Name:"Mary") AND Age:20'

      "SELECT * FROM People WHERE C=5 AND ((A=2 OR A=3) AND (B=4 OR B=5))"
      'http://ravendb/indexes/dynamic/People?query=C:5 AND ((A:2 OR A:3) AND (B:4 OR B:5))'

      "SELECT * FROM People WHERE [Parent.Id] = 20"
      'http://ravendb/indexes/dynamic/People?query=Parent.Id:20'

      "SELECT * FROM People WHERE [Parents,Id] = 20"
      'http://ravendb/indexes/dynamic/People?query=Parents,Id:20'

      "SELECT * FROM People WHERE [Parents,] = 20"
      'http://ravendb/indexes/dynamic/People?query=Parents,:20'

      { sql: "SELECT * FROM People", database: 'db1' }
      'http://ravendb/databases/db1/indexes/dynamic/People'
  ]

  for i in [0..ensure_these_statements_map_correctly.length-2] by 2
    source = ensure_these_statements_map_correctly[i]
    result = ensure_these_statements_map_correctly[i+1]
    do (source, result)->
      sql = if source?.sql? then source.sql else source
      ravenUrl = if source?.ravenUrl? then source.ravenUrl else 'http://ravendb'
      database = if source?.database? then source.database

      it "should properly map [[#{sql}]]", ->

        out = transformer.transform sql, ravenUrl, database
        (expect out.url).to.equal result

  it 'should set the method to GET', ->
    request = transformer.transform("Select * From People", 'http://ravendb')
    (expect request.method).to.equal 'GET'
