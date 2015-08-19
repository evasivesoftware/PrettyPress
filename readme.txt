=== Plugin Name ===
Contributors: evasivesoftware
Donate link: http://pro.evasivesoftware.com/
Tags: publishing, posting, live, preview, post interface, ghost, markdown
Requires at least: 3.5
Tested up to: 4.3
Stable tag: 1.2.0
License: MIT
License URI: http://opensource.org/licenses/MIT

Version 1.2 - Torturous Tortoise
PrettyPress adds a sleek, modern publishing interface to Wordpress to help you write better articles in less time. Write in markdown, with a real-time live preview of how your post looks right next to your editor.

The visual editor and html is also supported.

[PrettyPress Pro][http://pro.evasivesoftware.com] users can unlock real-time shortcode previews to really enhance your work flow.

== Description ==

#PrettyPress - Real-time Wordpress publishing and previews in markdown.

PrettyPress is a Wordpress plugin that simplifies and smartens the way you write online.
It rids distractions and bloated features, to give you exactly what you need to write posts quickly:

* A markdown editor and parser
* A real-time live preview of your post
* A distraction free environment

[PrettyPress Pro][http://pro.evasivesoftware.com] users also have shortcodes executed and previewed in real-time.

##Live preview window, as you type

PrettyPress provides you with a live "front-end" preview of the post you are writing. This means you can write your
post remaining confident it will look as intended by the end.

##Write in markdown

PrettyPress ships out of the box as a markdown editor. All markdown is converted on the fly, giving you instant previews of your post, as you type.

== Installation ==


PrettyPress can be installed like any other WordPress plugin.

1. Download the .zip file from either Github, EvasiveSoftware.com directly or Wordpress.org
1. Log into your WordPress website
1. Go to Plugins -> Add new
1. Click Upload
1. Select the PrettyPress-master.zip file you downloaded previously
1. Press upload
1. Press “Activate”


== Frequently Asked Questions ==

= PrettyPress breaks the front end preview of my site, what should I do? =

Check that your theme is correctly using the_title_attribute for title="" attributes. If your theme is incorrectly using the_title(), PrettyPress hooks will automatically be applied here, thus breaking your theme.

= My shortcodes don't execute in the preview window =

Live shortcode previews are only available to [PrettyPress Pro][http://pro.evasivesoftware.com] users.

== Screenshots ==

1. The PrettyPress live preview layout.
2. PrettyPress live preview is resizable.
3. PrettyPress in markdown mode

== Changelog ==

= 1.1.1 =
* Fixed bug where quick edit wouldn't escape HTML characters on title (Thanks Jake Jackson).
* Modified markd.js to prevent automatic URL additions, which breaks shortcode previews.
* Added automatic update checking (Pro only).
* Fixed TinyMCE auto resizing bug.
* Fixed composition / preview window resizing bug.
* "Disable markdown" option has been restored.
* Fixed various TinyMCE css bugs

= 1.1.0 =
* New version release, major changes
* Complete javascript rewrite. Dropped 95% of jQuery reliance for speed and performance benefits.
* 24+ bug fixes, mostly related to swapping between editors.
* [PrettyPress Pro][http://pro.evasivesoftware.com] launched.
* Added live shortcode previews (Pro only).
* Compatibility with Wordpress 4.0.
* Now delivering minified css/js.

= 1.0.9 =
* Fixed another bug where https was not loaded on https powered site

= 1.0.8 =
* Minor future proofing for 3.9 release
* Fixed CSS z-indexing to override wordpress sidebar in 3.9RC1

= 1.0.7 =
* Minor future proofing for 3.9 Beta 1

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

= 1.1.0 =
The latest release of PrettyPress has a ground up re-write of the core javascript, aimed at speed and performance enhancements. Live shortcode previews are now supported for PrettyPress Pro users.

= 1.0.0 =
Our latest shipment of PrettyPress now includes a markdown editor, publishing menu from inside PrettyPress, performance enhancements and bug fixes.

= 0.2 =
This version fixed styling issues with Wordpress 3.8, as well as window resizing performance.

== Arbitrary section ==

List of PrettyPress contributors

Richard Denton - @richard_ddenton
Richard Tape - @richardtape

eMarketeer Australia
http://www.emarketeer.com.au

Evasive Software
http://www.evasivesoftware.com

Other libraries used in this project.

Marked.js - Copyright (c) 2011-2013, Christopher Jeffrey. (MIT License)
https://github.com/chjj/marked

to-markdown is copyright © 2011 Dom Christie and released under the MIT license.
https://github.com/domchristie/to-markdown

js-beautify - Copyright (c) 2007-2013 Einar Lielmanis and contributors. (MIT License)
https://github.com/beautify-web/js-beautify
