connector = require('./connector').connector
expect = require('chai').expect
mockSender = undefined

describe 'RavenDB Connector', ->
  beforeEach ->
    connector.useSender mockSender =
      send: (request)-> @sent = request

  describe 'handling connection string', ->

    describe 'calling send before connection string is set', ->
      it 'should throw an error', ->
        (expect -> connector.send url: 'test', method: 'get').to.throw /connection string/

    describe 'when the connection string is set', ->
      it 'should prefix all sends', ->
        connector.connectionString 'http://localhost:8080/databases/mydb'
        connector.send url: 'test', method: 'get'
        (expect mockSender.sent.url).to.equal 'http://localhost:8080/databases/mydb/test'

      describe 'with a trailing slash', ->
        it 'should ignore the trailing slash', ->
          connector.connectionString 'http://localhost:8080/databases/mydb/'
          connector.send url: 'test', method: 'get'
          (expect mockSender.sent.url).to.equal 'http://localhost:8080/databases/mydb/test'
