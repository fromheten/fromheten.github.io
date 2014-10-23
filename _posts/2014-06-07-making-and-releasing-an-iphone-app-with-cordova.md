---
title: Making and releasing an iPhone app with Cordova
layout: post
date: 2014-06-07- 15:50
comments: true
---
Last summer I made a small webapp to run on phone screens. I was just starting to study Japanese, and wanted to have something handy to look up the Kana (their phonetic alphabet). So I hacked together a small Angular.js [app](https://itunes.apple.com/se/app/kana-reference/id821507723?l=en&mt=8) (with some css help from [Riccardo](http://creativespooks.com)) for the purpose. 

![Kana Reference Screenshot](/images/kana-ref-screenshot.png)

Having heard many a good thing about Cordova (PhoneGap), I decided to make a native app of it.

## Cordova sounds like a dream coming true
Cordova premise is simple - you write a web app, and Cordova wraps it in a webview, and produces binaries for iOS, Android, Windows Phone and other mobile operating systems. 

## Its good sides

Since my day job is making Javascript single page apps, creating this one was a breeze. If you wish you can just import another app, and it will run. Cordova is nothing but a WebView wrapper with some JS api's to native features.

## Its bad sides
In making Kana Reference there was never really one thing that didn't work - but there were a million of them. The Cordova builds failed at seemingly random, and you have to scourge the net for undocumented fixes (hacks). My hope was to make an iPhone app without opening XCode, but after working on the app for a week or two the build process started to failed after an update. I never got it working again, and after a while I settled for building it, then running OSX `$open` on the build (a `.xcodeproj` package). To run the emulator from command-line was a feature that seemed unrecoverable.

For this small app there is no real difference in the UI because it's built on web technologies. But for any app that involves multiple views, a navigation header, etc. a web app will simple not suffice. Anyone who has been using CocoaTouch knows how nice it is, and that it's actually not that hard to get into for a beginner. Not even initatives such as <a href="http://ionicframework.com">Ionic Framework</a> that try to mimic the native phone interfaces actually come close the same look and feel. And they do not even come a mile close to how easy CocoaTouch is.

I will make many mobile apps. But I will not go for Cordova/PhoneGap again. The bad documentation, the buggy build process and the product lacking in native UI controls is just not worth it.
