---
title: Develop with Adblock on
layout: post
date: 2015-02-09- 15:50
comments: true
---
Everyone knows Adblock or some other web content blocker. Many use it, and a great & growing number are starting to do so every day. There is ad- and ad-blockers for every desktop browser nowadays, and it's even available on some mobile browsers. I know I have it installed. Not to kill profits for content creators, but because without it you will be spied on, and your eyes will burn when you browse the web. In my filter lists I block all social media buttons & comment fields, I block many analytics scripts as well ad not keeping advertisement cookies (I use [µBlock](https://github.com/gorhill/uBlock) for this).

## How widespread are content blockers?
For obvious reasons I can't check my website analytics for this number ;-), but according to Tech Cheat Sheet it was about [5% of users who were using ad-blockers by 2014](http://wallstcheatsheet.com/technology/why-5-of-the-internet-uses-an-adblocker.html/?a=viewall). According to Forbes sources, [22.7% of web users are blocking ads and the use of ad blockers have risen 43% per year](http://www.forbes.com/sites/kashmirhill/2013/08/21/use-of-ad-blocking-is-on-the-rise/). For as long as I can remember, ad blockers have been [number 1 popular in the Firefox extensions list](https://addons.mozilla.org/en-US/firefox/extensions/?sort=users). Whatever your opinion is about it, people are not gonna load things they don't want in their browsers anymore. 

## How does it (sometimes) impair user experience? 
But while using content blockers on the web might just be *so much nicer*, filtering can breaks things. Some things you'd consider privacy invading has a JS function that the website uses to render some vital component. Those who use stricter filtering than others know that web sites sometimes break thanks to this, and that can make for a pretty crappy experience. 

## This one weird trick will make your site work for users with content blockers.
There is one easy way to never have your web project impaired by content blockers. If you are someone who publishes code or content on the web, and if you're reading this I assume you are, **you should never develop without these content blockers running.** If you want to make sure your website works for this big & growing number of your users (and you want), you must set the bar so they will jump it. 
