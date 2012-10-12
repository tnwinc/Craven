transformer = require('./transformer')
expect = require('chai').expect

describe 'Transforming SQL-like statements into HTTP requests', ->

  describe 'Select Statements', ->

    it 'should handle itemized properties', ->
      request = transformer.transform("SELECT Name,Id FROM People", 'http://ravendb')
      (expect request.url).to.equal "http://ravendb/indexes/dynamic/People?fetch=Name&fetch=Id"

    it 'should handle "All" properties', ->
      request = transformer.transform("SELECT * FROM People", 'http://ravendb')
      (expect request.url).to.equal "http://ravendb/indexes/dynamic/People"

    it 'should handle keywords case insensitive', ->
      request = transformer.transform("Select * fRom People", 'http://ravendb')
      (expect request.url).to.equal "http://ravendb/indexes/dynamic/People"

    it 'should set the method to GET', ->
      request = transformer.transform("Select * From People", 'http://ravendb')
      (expect request.method).to.equal 'GET'

    describe 'Complex identifiers in projection', ->
      it 'indexing into objects', ->
        request = transformer.transform("SELECT [A.B] FROM People", 'http://ravendb')
        (expect request.url).to.equal "http://ravendb/indexes/dynamic/People?fetch=A.B"

      it 'indexing into objects in arrays', ->
        request = transformer.transform("SELECT [A,B] FROM People", 'http://ravendb')
        (expect request.url).to.equal "http://ravendb/indexes/dynamic/People?fetch=A,B"

    describe 'with Where clauses', ->

      describe 'single, numeric where clause', ->
        it 'should build the right query', ->
          request = transformer.transform("SELECT * FROM People WHERE Id = 20", 'http://ravendb')
          (expect request.url).to.equal 'http://ravendb/indexes/dynamic/People?query=Id:20'

      describe 'single, string where clause', ->
        it 'should build the right query', ->
          request = transformer.transform("SELECT * FROM People WHERE Name = 'Bill'", 'http://ravendb')
          (expect request.url).to.equal 'http://ravendb/indexes/dynamic/People?query=Name:"Bill"'

      describe 'single, string where clause using double quotes', ->
        it 'should build the right query', ->
          request = transformer.transform('SELECT * FROM People WHERE Name = "Bill"', 'http://ravendb')
          (expect request.url).to.equal 'http://ravendb/indexes/dynamic/People?query=Name:"Bill"'

      describe 'multiple where clauses joined by And', ->
        it 'should build the right query', ->
          request = transformer.transform("SELECT * FROM People WHERE Name = 'Bill' AND Id = 20", 'http://ravendb')
          (expect request.url).to.equal 'http://ravendb/indexes/dynamic/People?query=Name:"Bill" AND Id:20'

      describe 'multiple where clauses joined by Or', ->
        it 'should build the right query', ->
          request = transformer.transform("SELECT * FROM People WHERE Name = 'Bill' OR Id = 20", 'http://ravendb')
          (expect request.url).to.equal 'http://ravendb/indexes/dynamic/People?query=Name:"Bill" OR Id:20'

      describe 'grouped where clause', ->
        it 'should handle a single simple group', ->
          request = transformer.transform("SELECT * FROM People WHERE (Name = 'Bill' OR Name= 'Mary') AND Age = 20", 'http://ravendb')
          (expect request.url).to.equal 'http://ravendb/indexes/dynamic/People?query=(Name:"Bill" OR Name:"Mary") AND Age:20'

        it 'should handle a more complex grouping', ->
          request = transformer.transform("SELECT * FROM People WHERE C=5 AND ((A=2 OR A=3) AND (B=4 OR B=5))", 'http://ravendb')
          (expect request.url).to.equal 'http://ravendb/indexes/dynamic/People?query=C:5 AND ((A:2 OR A:3) AND (B:4 OR B:5))'

      describe 'Complex identifiers in clauses', ->

        describe 'indexing into objects', ->
          it 'should build the right query', ->
            request = transformer.transform("SELECT * FROM People WHERE [Parent.Id] = 20", 'http://ravendb')
            (expect request.url).to.equal 'http://ravendb/indexes/dynamic/People?query=Parent.Id:20'

        describe 'indexing into arrays of objects', ->
          it 'should build the right query', ->
            request = transformer.transform("SELECT * FROM People WHERE [Parents,Id] = 20", 'http://ravendb')
            (expect request.url).to.equal 'http://ravendb/indexes/dynamic/People?query=Parents,Id:20'

          it 'should build the right query', ->
            request = transformer.transform("SELECT * FROM People WHERE [Parents,] = 20", 'http://ravendb')
            (expect request.url).to.equal 'http://ravendb/indexes/dynamic/People?query=Parents,:20'



    describe 'with a database selected', ->
      it 'should insert the build the right query', ->
        request = transformer.transform("SELECT * FROM People", 'http://ravendb/', 'db1')
        (expect request.url).to.equal 'http://ravendb/databases/db1/indexes/dynamic/People'
