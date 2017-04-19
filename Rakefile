task :server do
  sh("bundle exec jekyll server --watch")
end

task :deps do
  sh("bundle install --path vendor/bundle")
end

namespace :posts do
  desc "Post management tasks"
  task :new do
    # Make a file name of YYYY-MM-DD-title-in-kebab-case.md
    t = Time.now.gmtime
    timestamp = (t.strftime "%Y-%m-%d")
    template = %{---
layout: post
title: #{ENV['title'] || "untitled"}
date: #{timestamp} #{t.strftime "%H:%M"}
comments: true
categories: #{ENV['categories']}
---
}

    filename = "_posts/#{timestamp}-#{ENV['title']}.md"
    puts "#{__dir__}/#{filename}"
    File.open("#{__dir__}/#{filename}", "w") do |file|
      file.puts template
    end
  end
end

task :default => "server"
