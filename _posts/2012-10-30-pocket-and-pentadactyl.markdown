---
layout: post
title: "Pocket and Pentadactyl"
date: 2012-10-30 11:54
---
Browsing the web without [Pentadactyl](http://5digits.org/pentadactyl/) or [Uzbl](http://uzbl.org/) is a pain that I would not wish upon my worst enemy. The only downside (except for Firefox frequent updates that break pentadactyl) is that few addons really integrate with them. 

I recently started using [Pocket](http://getpocket.com) instead of just having a lot of tabs open for weeks. It seems like a nice service. To use it with pentadactyl is not too hard. They [provide a bookmarklet](http://getpocket.com/add) (press 'Or install the bookmarklet'). In Pentadactyl, right-click and copy the link location. 

To add the command to pentadactyl, type this is your shell:

~~~ sh
$echo "command! pocket -description "Save to Pocket" open #PASTE YOUR PERSONAL BOOKMARKLET LINK# >> ~/.pentadactylrc
~~~

For me it looks like this:

~~~
$echo "command! pocket -description "Save to Pocket" open javascript:(function(){ISRIL_H='d862';PKT_D='getpocket.com';ISRIL_SCRIPT=document.createElement('SCRIPT');ISRIL_SCRIPT.type='text/javascript';ISRIL_SCRIPT.src='http://'+PKT_D+'/b/r.js';document.getElementsByTagName('head')[0].appendChild(ISRIL_SCRIPT)})();" >> ~/.pentadactylrc
~~~

Then in pentadactyl, do the command `:source ~/.pentadactylrc`. Your should now be able to run the command `:pocket` from penta, and the current page will be saved to your pocket. 

If you found this helpful, share it with someone else who uses penta/uzbl and pocket! 
