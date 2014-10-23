---
layout: post
title: "Fun things to do in telnet"
date: 2012-09-30- 17:14
comments: true
categories: telnet cli network
---
<div class="warning">This article is aimed at people who have rarely, if ever, used telnet. If that doesn't apply to you, this is not the right page to read. Head on to <a href='/'>the root</a>.</div>
Don't we all remember that day when mum or dad showed us the terminal on their Debian server down in the cellar? They typed `vi /home/any/file` to edit something, and you could not even begin to comprehend why someone would use a program that requires you to press `i` before it can be used. 

It was `lynx`, `samba` and `perl`. It was `nc`, `dig` and `ssh`. It was glorious. 

In this article I'll show you around some fun things you can do with one of the most fun utils of them all, `telnet`. If you are not used to telneting, you'll have a blast. Telnet is a protocol for connecting a client to a host. Back before I was even born, it was used to check school email from home (assuming you had a private modem, as many here in Sweden did) amongst many things. Nowadays, we use the web for [things that were more complicated in the past](http://programmers.stackexchange.com/questions/165041/why-did-the-web-win-the-space-of-remote-applications-and-x-not). But the old ways of telnet, irc and mail still lives. 

Connecting to old bulletin boards and [MUD's](https://en.wikipedia.org/wiki/MUD) feels like trespassing in old (and sometimes abandoned) houses, filled with archieves and stories. 

##Ok, let's connect already!

Assuming you are in a graphical session right now, open a terminal emulator. On Windows you hit super+r and type `cmd`. Users of Linux and BSD (yes, Ubuntu and Mac OS X) should be able to easily open a terminal. 

### The Bastard Operator From Hell Excuse Server
The BOFH Excuse Server is quite the straightforward type; on each connect they give you a good excuse for anything. Your boss wondering why you are siting here reading a blog about how they sent data back in 1973? Quick, type `$telnet towel.blinkenlights.nl 666` and you'll have a great one-liner to serve them. 

### Surf the web!
We all know that cool people use [curl](https://en.wikipedia.org/wiki/CURL)|[less](https://en.wikipedia.org/wiki/Less_(Unix)) as a web browser, but you can get the same results with telnet. When connected to a telnet host you can simply send a HTTP command to it (you know, GET, POST, CONNECT, etc).

`$telnet www.csua.berkeley.edu 80`
Wait for it to connect. This is the Computer Science Undergraduate Association of Berkeley University in the Americas. 

Send the HTTP request.
`GET / HTTP/1.1`
This means 'send GET request to root with HTTP 1.1'. It should return the html of their site. Many hosts dicriminate against incomplete HTTP headers such as this one, for good reasons. So this won't always work. 

This is an easy way to experiment with http headers. Play around!

### Watch Star Wars IV
Who says piracy needs some fancy schmancy Torrents or Usenet? Sten@blinkenlights.nl, who made #1, also hosts the whole fourth episode of Star Wars as ascii. To connect, you need to pop some corn, get a soda and do $`telnet towel.blinkenlights.nl`. The sound is not that good, though. And I don't think it comes in 720p. 

### Socialize
The web is nice, we all spend much time reading and writing here. But the BBS's of the old day still live. There are [a lot of them, acually](http://synchro.net/sbbslist.html). If you want to try one random one out, [fatcats](telnet://fatcatsbbs.com) is fun. They [have a website too](http://fatcatsbbs.com/).

### Forget all about Azeroth
All of this has been at least almost useful. But for forgetting your woes, there is only three things that help: time, alcohol or multi-user dungeons. To connect to one of the many muds avaliable, $`telnet` to `stonia.ttu.ee 4000`. [This particular one](http://www.mudconnect.com/mud-bin/adv_search.cgi?Mode=MUD&mud=Stonia+(The+Cruel+and+Lost+World+of+Stonia)) is newbie friendly, but remember that role-playing is encouraged. Be wary though, muds can be very fun and distracting! 

## There is more to find
There is a whole world out there for you to find! You can even watch [the Nyan cat](telnet:miku.acm.uiuc.edu) at $`telnet miku.acm.uiuc.edu`. I hope you found this article entertaining, and keep an interest in the treasures that is the more basic computing software, like `sh`, `telnet` with friends. 

In another post I'll go thru how to set up your own telnet service. We'll write it in C or Ruby or something. It'll be fun. 
