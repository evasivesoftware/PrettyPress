=== Plugin Name ===
Contributors: evasivesoftware
Donate link: http://evasivesoftware.com/
Tags: publishing, posting, live, preview, post interface, ghost, markdown
Requires at least: 3.5
Tested up to: 3.8.1
Stable tag: 1.0.6
License: MIT
License URI: http://opensource.org/licenses/MIT

Version 1.0.x - Evasive Eel
PrettyPress simplifies the default publishing layout, showing users a live front-end preview of their post, as they type.
You're free to write in WYSIWYG, HTML or Markdown.

== Description ==

#PrettyPress - Making Wordpress composition simple and beautiful.

PrettyPress is an MIT licensed Wordpress plugin that focuses on simplifying the default Wordpress publishing layout.
It aims to be simple and encourage users to focus on writing - without other un-necessary distractions.

##Live preview window as you type

PrettyPress provides you with a live preview of how your post will look on the front end of the site, as you type.
It uses some little javascript and jQuery hacks to do this - Bigger posts may be plagued by performance issues.
This is an issue to be worked on in the near future.

##Markdown composition

PrettyPress allows users to compose in Markdown mode for speedy writing and excellent html conversion.

== Installation ==

PrettyPress can be installed like any other WordPress plugin.


1. Download the .zip file from either Github or EvasiveSoftware.com directly
1. Log into your WordPress website
1. Go to Plugins -> Add new
1. Click Upload
1. Select the PrettyPress-master.zip file you downloaded previously
1. Press upload
1. Press “Activate”


== Frequently Asked Questions ==

= PrettyPress breaks the front end preview of my site, what should I do? =

Check that your theme is correctly using the_title_attribute for title="" attributes. If your theme is incorrectly using the_title(),
PrettyPress hooks will automatically be applied here.

= My shortcodes don't execute in the preview window =

We're working on that.

== Screenshots ==

1. The PrettyPress live preview layout.
2. PrettyPress live preview is resizable.
3. PrettyPress in markdown mode

== Changelog ==

= 1.0.6 =
* Further bug fixes that affected losing posts whilst markdown tab was active
* Fixed javascript and stylesheet links to prevent caching issues on updates
* Changed javascript from local embeds, to utilize wp_register_script.

= 1.0.5 =
* Fixed bug where pressing "save" from PrettyPress screen on markdown tab would lose post.

= 1.0.0 =
* Markdown mode has been added and is considered in beta mode.
* Fixed various hooks for custom post types
* Added "publish" menu to PrettyPress screen - save and publish posts directly from PrettyPress
* General bug fixes

= 0.4 =
* Fixed bug where live preview would not update if PrettyPress was executed before the post was saved.
* Fixed bug where PrettyPress would not launch if TinyMCE has been disabled in Wordpress user options

= 0.3 =
* Fixed raw text / html hooks and support
* Live preview should now support raw text and html
* Fixed bug where live preview would not execute if page was loaded without TinyMCE as default active editor

= 0.2 =
* Added Wordpress 3.8 style support
* Fixed live preview window resize speed

== Upgrade Notice ==

= 1.0.0 =
Our latest shipment of PrettyPress now includes a markdown editor, publishing menu from inside PrettyPress, performance enhancements and bug fixes.

= 0.2 =
This version fixed styling issues with Wordpress 3.8, as well as window resizing performance.

== Arbitrary section ==

Other libraries used in this project.

Marked.js - Copyright (c) 2011-2013, Christopher Jeffrey. (MIT License)
https://github.com/chjj/marked

to-markdown is copyright © 2011 Dom Christie and released under the MIT license.
https://github.com/domchristie/to-markdown
