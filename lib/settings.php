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

//Register the menu hook.
add_action('admin_menu', 'prettypress_settings_menu');

function prettypress_settings_menu() {

	//Add the menu
	add_submenu_page( 'options-general.php', 'PrettyPress settings', 'PrettyPress', 'administrator', 'prettypress-settings', 'prettypress_settings_page' );

	//Hook and register settings.
	add_action( 'admin_init', 'prettypress_register_settings' );
}


function prettypress_register_settings() {

	//Register settings.
	register_setting( 'prettypress-settings-group', 'prettypress_enabled' );
	register_setting( 'prettypress-settings-group', 'prettypress_markdown_enabled' );
	register_setting( 'prettypress-settings-group', 'prettypress_api' );

}

function prettypress_settings_page() {

	require_once PLUGINPATH . '/view/prettypress-settings.php';

}

function prettypress_pro_version_js( $hook ) {

	//Hook pro version JS.
	if ( 'settings_page_prettypress-settings' != $hook ) {
		return;
	}

	wp_register_script( 'prettypress_pro_version_js', PRETTYPRESS_BASE_URL . "/assets/js/build/prettypress-pro-version.min.js?v=" . PLUGINVERSION, false );
	wp_enqueue_script( 'prettypress_pro_version_js' );

}

if ( prettypress_pro_active() ) {
	add_action( 'admin_enqueue_scripts', 'prettypress_pro_version_js' );
}

function prettypress_pro_active() {

	global $prettypress_config;

	if (! empty($prettypress_config['apikey']) ) {
		if ( $prettypress_config['apikey'] == true ) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

?>
