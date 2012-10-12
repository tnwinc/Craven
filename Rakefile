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

task :publish do
  published = '_published_do_not_edit_directly_'
  Dir.chdir current_path do
    status = `git status`
    abort "I can't let you publish with uncommitted changes. Sorry." unless status.include? 'nothing to commit'
    `rm -rf #{published}`
    `git clone git@github.com:tnwinc/Craven.git #{published} --branch gh-pages`
    `cp -R public/* #{published}`
    Dir.chdir published do
      status = `git status`
      if status.include? 'nothing to commit'
        puts 'No updates to publish'
      else
        puts 'Publishing updates'
        `git commit -am 'publishing updates'`
        `git push`
      end
    end
    `rm -rf #{published}`
  end
end
