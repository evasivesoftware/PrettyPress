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
	
	//Register a couple of UX interactions.
	jQuery("#prettypress_enable").click(function(e) {
		//Enable prettypress.
		e.preventDefault();
		prettypress.resize();
		prettypress.toggle();
	});
	
	jQuery("#prettypress_exit").click(function(e) {
		//Enable prettypress.
		e.preventDefault();
		prettypress.resize();
		prettypress.toggle();
	});
	
	jQuery(window).resize(function() {
		//Resize the prettypress window.
		prettypress.resize();
	});
	
	jQuery(".prettypress_warning_box").live('click', function(e) {
		e.preventDefault();
		jQuery(this).remove();
	});
	
	jQuery("#title").on('input', function() {
		prettypress.updatepreviewcontent("title");
	});
	
	//Publish menu.
	jQuery("#prettypress_publish").click(function(e){
		e.preventDefault();
		prettypress.publishmenutoggle();
	});
	
	//Publish menu save button.
	jQuery("#pp-btn-save").click(function(e){
		prettypress.prelaunchsave();
	});
	
	//Publish menu publish button.
	jQuery("#pp-btn-publish").click(function(e){
		prettypress.publish();
	});
	
});

jQuery(window).load(function() {

	prettypress.bootuphooks();
	prettypress.recursinghnd = window.setInterval( function() {
		prettypress.recursivehooks();
	}, 500);
	
});
