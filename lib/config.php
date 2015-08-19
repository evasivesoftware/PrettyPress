<?php
/**
 * @package PrettyPress
 */

/*
The MIT License (MIT)

Copyright (c) 2014 evasivesoftware.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


//Defend our stuff!
if ( ! defined('ABSPATH') ) { exit; }

//Define some options.
$prettypress_config = Array();
$prettypress_config['data-identifiers']['title'] = "[data-rel=title]";
$prettypress_config['data-identifiers']['content'] = "[data-rel=content]";
$prettypress_config['enabled'] = "enabled";

//Check for settings from the settings page to override these defaults.
$tmp_enabled = get_option( 'prettypress_enabled', null );
$tmp_markdown_enabled = get_option( 'prettypress_markdown_enabled', "enabled" );


if ( get_bloginfo('version') < 3.8 ) {
	$prettypress_config['legacy'] = "enabled";
} else {
	$prettypress_config['legacy'] = "disabled";
}

if ( $tmp_enabled ) {
	$prettypress_config['enabled'] = $tmp_enabled;
}

if ( $tmp_markdown_enabled ) {
	$prettypress_config['markdown_enabled'] = $tmp_markdown_enabled;
}

?>
