task :server do
  sh("bundle exec jekyll server --watch")
end

task :deps do
  sh("bundle install --path vendor/bundle")
end

task :default => "server"
