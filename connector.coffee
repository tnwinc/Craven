_ = require 'underscore'

connectionString = undefined
sender = undefined

exports.connector =
  connectionString: (cs)->
    connectionString = cs.replace /\/+$/, ''

  send: (request)->
    throw Error 'request must specify url' unless request.url? and request.url.length
    throw Error 'request must specify HTTP `method`' unless request.method? and request.method.toLowerCase?() in ['get', 'post', 'put', 'delete']
    throw Error 'connection string for RavenDB instance must be set before sending a request' unless connectionString?
    throw Error 'cannot send without a registered sender' unless sender?
    sender.send _.extend {}, request, url: "#{connectionString}/#{request.url}"

  useSender: (s)->
    throw Error 'sender must implement a `send` method' unless s.send? and typeof s.send is 'function'
    sender = s
