parser = require('parser').parser
singleQuotedStringPattern = /^'(.*)'$/

urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

processFilters = (filters)->
  stack = []
  for filter in filters
    if filter.group
      logicalOperator = if filter.logicalOperator then "#{filter.logicalOperator} " else ''
      stack.push "#{logicalOperator}(#{processFilters filter.group})"
    else
      filter.value = if filter.value?.match? singleQuotedStringPattern then filter.value.replace singleQuotedStringPattern, '"$1"' else filter.value
      logicalOperator = if filter.logicalOperator then "#{filter.logicalOperator} " else ''
      stack.push "#{logicalOperator}#{filter.key}:#{filter.value}"
  return stack.join ' '

exports.transform = (sql, ravenUrl, database, index)->

  throw Error 'ravenUrl must be defined' unless ravenUrl?.length
  throw Error 'ravenUrl must be a valid URL' unless ravenUrl.match urlRegex

  ravenUrl = ravenUrl.replace /\/+$/, ''
  database = if database?.length > 0 then "databases/#{database}/" else ''
  index = undefined if index?.length is 0

  statement = parser.parse sql

  request = {}

  if statement.type is 'SELECT'
    request.method = 'GET'

    request.url = "#{ravenUrl}/#{database}indexes/dynamic/#{statement.collection}"
    params = []
    if statement.filters?.length
      params.push "query=#{processFilters statement.filters}"

    if statement.properties?.length
      params.push "fetch=#{property}" for property in statement.properties

    request.url += "?#{params.join '&'}" if params.length

  return request
