task :default => :build

task :build do
  sh 'jison parser.y parser.l'
  sh 'coffee -c *.coffee'
end

task :test => [:build] do
  sh 'node_modules/mocha/bin/mocha *.spec.js'
end

task :clean do
  sh 'rm -f *.js'
end
