current_path = File.realpath(File.dirname(__FILE__))

task :default => :build

task :build do
  sh 'jison parser/parser.y parser/parser.l'
  sh 'coffee -c **/*.coffee'
  sh "NODE_PATH=$NODE_PATH:#{current_path}:#{current_path}/fake_modules_for_web_build node_modules/.bin/webmake --name=transformer transformer/transformer.js public/js/transformer.js"
end

task :test => [:build] do
  sh "NODE_PATH=$NODE_PATH:#{current_path} node_modules/.bin/mocha **/*.spec.js"
end

task :clean do
  sh 'rm -f {./,parser/,transformer/}*.js'
end
