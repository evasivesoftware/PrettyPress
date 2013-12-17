=== Plugin Name ===
Contributors: evasivesoftware
Donate link: http://evasivesoftware.com/
Tags: publishing, posting, live, preview, post interface, ghost
Requires at least: 3.5
Tested up to: 3.8
Stable tag: 0.3
License: MIT
License URI: http://opensource.org/licenses/MIT

PrettyPress simplifies the default publishing layout, showing users a live front-end preview of their post, as they type.

== Description ==

#PrettyPress - Making Wordpress composition simple and beautiful.

PrettyPress is an MIT licensed Wordpress plugin that focuses on simplifying the default Wordpress publishing layout.
It aims to be simple and encourage users to focus on writing - without other un-necessary distractions.

##Live preview window as you type

PrettyPress provides you with a live preview of how your post will look on the front end of the site, as you type.
It uses some little javascript and jQuery hacks to do this - Bigger posts may be plagued by performance issues.
This is an issue to be worked on in the near future.

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

== Changelog ==

= 0.3 =
* Fixed raw text / html hooks and support
* Live preview should now support raw text and html
* Fixed bug where live preview would not execute if page was loaded without TinyMCE as default active editor

= 0.2 =
* Added Wordpress 3.8 style support
* Fixed live preview window resize speed

== Upgrade Notice ==

= 0.2 =
This version fixed styling issues with Wordpress 3.8, as well as window resizing performance.

== Arbitrary section ==

