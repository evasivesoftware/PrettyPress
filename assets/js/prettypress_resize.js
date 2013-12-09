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

jQuery(document).ready(function() {
	var resize_active = 0;
	var resize_startx = 0;
	var element_resize = jQuery("#resize");
	var element_wp_content = jQuery("#wp-content-wrap");
	var element_title = jQuery("#title");
	var element_prettypress_container = jQuery("#prettypress_preview_container");
	var element_prettypress_iframe = jQuery("#prettypress_iframe");
	jQuery(element_resize).mousedown(function(e) {
		//Start following
		resize_active = 1;
		resize_startx = e.pageX;
		return false;
	});
	jQuery(window).mouseup(function() {
		//Stop following
		resize_active = 0;
		resize_startx = 0;
	});
	jQuery(window).mousemove(function(e) {
		if (resize_active === 1) {
			//Follow the mouse...
			var difference = e.pageX - resize_startx;
			jQuery(element_resize).css("left", e.pageX + "px");
			var offset_left = jQuery(element_resize).offset().left;
			offset_left = offset_left - 40;
			var jQuerysecond = jQuery(element_resize);
			var offset_right = (jQuery(window).width() - (jQuerysecond.offset().left + jQuerysecond.outerWidth()));
			offset_right = offset_right - 30;
			if (offset_left > 461 && offset_right > 240) {
				jQuery(element_wp_content).css("width", offset_left + "px");
				jQuery(element_title).css("width", offset_left + "px");
				jQuery(element_prettypress_container).css("width", offset_right + "px");
				jQuery(element_prettypress_iframe).css("width", offset_right + "px");
			}
		}
	});
});