parser = require('./parser').parser

exports.transform = (sql)->

  statement = parser.parse sql

  request = {}

  if statement.type is 'SELECT'
    request.url = "/indexes/dynamic/#{statement.collection}"

    params = []

    if statement.filters?.length
      filters = []
      filters.push "#{filter.key}:#{filter.value}" for filter in statement.filters
      params.push "query=#{filters.join ' AND '}"

    if statement.properties?.length
      params.push "fetch=#{property}" for property in statement.properties

    request.url += "?#{params.join '&'}" if params.length

  return request
