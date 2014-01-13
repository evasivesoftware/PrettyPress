<?php
/**
 * @package PrettyPress
 */

/*
The MIT License (MIT)

Copyright (c) 2013 evasivesoftware.com

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

//Register the menu hook.
add_action('admin_menu', 'prettypress_settings_menu');

function prettypress_settings_menu() {

	//Add the menu
	//add_menu_page('PrettyPress Settings', 'PrettyPress Settings', 'administrator', __FILE__, 'prettypress_settings_page',plugins_url('/images/icon.png', __FILE__));
	add_submenu_page( 'options-general.php', 'PrettyPress settings', 'PrettyPress', 'administrator', 'prettypress-settings', 'prettypress_settings_page' );

	//Hook and register settings.
	add_action( 'admin_init', 'prettypress_register_settings' );
}


function prettypress_register_settings() {

	//Register settings.
	register_setting( 'prettypress-settings-group', 'prettypress_enabled' );
	register_setting( 'prettypress-settings-group', 'prettypress_markdown' );

}

function prettypress_settings_page() {

	require_once PLUGINPATH . '/view/prettypress-settings.php';
	
}

?>
