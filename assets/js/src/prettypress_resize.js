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

jQuery(document).ready(function() {
	
	var resize_active = 0;
	var resize_startx = 0;
	var element_resize = jQuery("#resize");
	var element_wp_content = jQuery("#wp-content-wrap");
	var element_title = jQuery("#titlewrap");
	var element_markdown_container = jQuery("#prettypress_markdown_editor_wrapper");
	var element_prettypress_container = jQuery("#prettypress_preview_container");
	var element_prettypress_iframe = jQuery("#prettypress_iframe");
	var element_prettypress_menu = jQuery("#prettypress_menu");

	var element_overlay_left = jQuery("#prettypress_overlay_left");
	var element_overlay_right = jQuery("#prettypress_overlay_right");
	
	var prettypress_resized = 0;
	
	jQuery(element_resize).mousedown(function(e) {


		jQuery(".prettypress-hidden").fadeIn(50);
		//Start following
		resize_active = 1;
		resize_startx = e.pageX;
		return false;
		
	});

	jQuery(window).mouseup(function() {
		if ( prettypress.status === 1 && prettypress_resized === 1 ) {
			prettypress_resize_up();
		}
	});
	
	jQuery(window).mousemove(function(e) {
		if (resize_active === 1) {
			
			prettypress_resized = 1;

			var window_width = jQuery(window).width();

			new_left = e.pageX;
			new_right = window_width - new_left;

			//Add 1% padding to fit the spacing bar.
			var padding = ( window_width / 100 ) * 2;

			new_left_overlay = new_left;
			new_right_overlay = new_right;
			
			new_left = new_left - padding;
			new_right = new_right - padding;
			
			if ( new_left > 461 && new_right > 240 ) {

				jQuery(element_overlay_left).css("width", new_left_overlay + "px");
				jQuery(element_overlay_right).css("width", new_right_overlay + "px");
				
			}
		
		}
	});

	function prettypress_resize_up() {
		
		window_width = jQuery(window).width();
		var padding = ( window_width / 100 ) * 2;
		
		jQuery(".prettypress-hidden").fadeOut(50);
		//Stop following
		resize_active = 0;
		resize_startx = 0;
		max_preview_width = window_width - 461 - (padding  * 2);
		max_editor_width = window_width - 240 - (padding * 2);
		

		if ( new_left < 461 ) {
			new_left = 461;
		}
			
		if ( new_left > max_editor_width ) {
			new_left = max_editor_width;
		}
			
		
		if ( new_right < 240 ) {
			new_right = 240;
		}
		if ( new_right > max_preview_width ) {
			new_right = max_preview_width;
		}		

		var new_resize_left = new_left + padding;
	
		jQuery(element_wp_content).css("width", new_left + "px");
		jQuery(element_title).css("width", new_left + "px");
		jQuery(element_markdown_container).css("width", new_left + "px");
		jQuery(element_prettypress_menu).css("width", new_resize_left + "px");
		jQuery(element_prettypress_container).css("width", new_right + "px");
		jQuery(element_prettypress_iframe).css("width", new_right + "px");
		jQuery(element_resize).css("left", new_resize_left + "px");
		
	}
});
