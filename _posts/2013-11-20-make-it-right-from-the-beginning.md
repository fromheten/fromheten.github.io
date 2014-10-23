---
title: Make it right from the beginning
layout: post
date: 2013-11-20- 19:34
comments: true
---

Say you're working in a team making a web app. There is a very tight deadline.

* Backend guy has a nice setup with a bit of mongo, redis and a hand rolled node server.
* New design and stylesheet guy joins the project. Backend guy is not at work today.
* Design guy is not familiar with databases. You, the client programmer helps.
* You write the start-servers script the backend guy should have made. It takes you half a day to write a script that fits the custom setup and works on every machine.
* Could have used a staging server or simpler setup, or just have a script to do it.
* Leave work with little productive done and deadline even closer.

## Make it right from the beginning, and you'll save more than double time later

* You are assigned to a project halfway in. The deadline is coming close.
* The first front-end dev did not have time to write tests, or to put things in some kind of MVC pattern.
* You can either take 5x time to write code because you have to figure out how everything fits together and test manually
* Or you can rewrite the code in a way that is testable and structured, also taking too much time.

## Make it right from the beginning, and you'll save more than double time later
