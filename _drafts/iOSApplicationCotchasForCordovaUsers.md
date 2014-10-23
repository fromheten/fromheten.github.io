---
layout: post
title: "Gotchas when developing iOS apps with Cordova"
---
My first ios application written with Cordova is just ready. That means, I write html, css and javascript to make a native iOS application. During development, there has been some problems that I found no documentation nor discussion about.

##Changing the splash screen
When an iOS app is run the device shows an image while it loads the program. Developers usually have a screen shot of the initial state of the app here, so that it feels like the app is instantly starting.

When creating an iOS app with Cordova, you have to do this manually, preferably in xCode. 
In the projects root, run `$open platforms/ios/<ProjectName>.xcodeproj`. In the file menu to the left [ADD SCREENSHOT], chose the projects root. Scroll down to launch images. Drag and drop the appropriate screen shots to the different Launch Images squares. Voila!

##Fastclick
In mobile webkit, a short delay is set on the click and tap. The delay is 300ms. Enough to make people think your app sucks. The Financial Times wrote a nice polyfill to remove this feature.

Using it is easy.

``` html
<script type='application/javascript' src='/path/to/fastclick.js'></script>
```

And anywhere below that tag this Javascript should run

``` javascript
window.addEventListener('load', function() {
  FastClick.attach(document.body);
}, false);
```
Make sure you [read up on how it works](https://github.com/ftlabs/fastclick). Get the latest version [from github](https://github.com/ftlabs/fastclick).

## Shouldn't I just write a native app?
Wether or not to develop your app with the different platform vendors different build tools or to make it cross-platform with Cordova has already been discussed more than enough. After making my first Cordova app, I can share my experiences.

The idea of making apps cross platform with Cordova really appeals to me. Simply because getting a greater output for a lesser work input is more effective. But after developing an app in this way, I have to say that my experience is far from satisfactory.

There are so many platform specific hacks you have to employ, many undocumented, that it maybe would be equally fast to make at least one iOS and one Android app. If your app is really big, logic-wise, it may still be worth it. Otherwise I would as of now not reccomend going down this path at this moment.
