parser = require('parser').parser

urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

exports.transform = (sql, ravenUrl, database, index)->

  throw Error 'ravenUrl must be defined' unless ravenUrl?.length
  throw Error 'ravenUrl must be a valid URL' unless ravenUrl.match urlRegex

  ravenUrl = ravenUrl.replace /\/+$/, ''
  database = if database?.length > 0 then "databases/#{database}/" else ''
  index = undefined if index?.length is 0

  statement = parser.parse sql

  request = {}

  if statement.type is 'SELECT'
    request.url = "#{ravenUrl}/#{database}indexes/dynamic/#{statement.collection}"

    params = []

    if statement.filters?.length
      filters = []
      filters.push "#{filter.key}:#{filter.value}" for filter in statement.filters
      params.push "query=#{filters.join ' AND '}"

    if statement.properties?.length
      params.push "fetch=#{property}" for property in statement.properties

    request.url += "?#{params.join '&'}" if params.length

  return request
