transformer = require('./transformer')
expect = require('chai').expect

describe 'Transforming SQL-like statements into HTTP requests', ->

  describe 'Select Statements', ->

    it 'should handle itemized properties', ->
      request = transformer.transform("SELECT Name,Id FROM People")
      (expect request.url).to.equal "/indexes/dynamic/People?fetch=Name&fetch=Id"

    it 'should handle "All" properties', ->
      request = transformer.transform("SELECT * FROM People")
      (expect request.url).to.equal "/indexes/dynamic/People"

    describe 'with Where clauses', ->

      describe 'single, numeric where clause', ->
        it 'should build the right query', ->
          request = transformer.transform("SELECT * FROM People WHERE Id = 20")
          (expect request.url).to.contain '?query=Id:20'

      describe 'single, string where clause', ->
        it 'should build the right query', ->
          request = transformer.transform("SELECT * FROM People WHERE Name = 'Bill'")
          (expect request.url).to.contain '?query=Name:\'Bill\''

      describe 'multiple where clauses joined by And', ->
        it 'should build the right query', ->
          request = transformer.transform("SELECT * FROM People WHERE Name = 'Bill' AND Id = 20")
          (expect request.url).to.contain '?query=Name:\'Bill\' AND Id:20'
