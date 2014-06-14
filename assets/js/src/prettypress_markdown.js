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
	
	//On featured image click.
	//TBA
	/*
	jQuery("#prettypress_featured_image").click(function(e){
		e.preventDefault();
		jQuery("#set-post-thumbnail").click();
	});*/
	
	//Add the markdown tab.
	jQuery(".wp-editor-tabs").html( 
		'<a id="content-markdown" class="wp-switch-editor switch-markdown">Markdown</a>'
	 + jQuery(".wp-editor-tabs").html() 
	);
	
	//For legacy WP < 3.8
	/*
	 * Creates a double up
	 * Fix this
	jQuery("#wp-content-editor-tools").html( 
		'<a id="content-markdown" class="wp-switch-editor switch-markdown">Markdown</a>'
	 + jQuery("#wp-content-editor-tools").html() 
	);*/
	
	jQuery("#content-markdown").hide();
	
	jQuery(document).on("click", "a.wp-switch-editor", function(e){
		var buttonval = jQuery(this).html();
		
		if ( buttonval === "Markdown" ) {
			
			if ( prettypress.markdown_active === "no" ) {
				
				//Enable markdown.
				e.preventDefault();
				prettypress.togglemarkdown();
				
				//Add active class for markdown button
				jQuery("#content-markdown").addClass("prettypress_markdownactive");
				
				//Deactivate other buttons.
				jQuery("#content-tmce").css("background", "#eeeeee");
				jQuery("#content-html").css("background", "#eeeeee");
				
			} else {
				e.preventDefault();
				return false;
			}
			
		} else {
			
			if ( prettypress.markdown_active === "yes" ) {
				
				//Disable markdown.
				prettypress.togglemarkdown();
				
				//Remove class
				jQuery("#content-markdown").removeClass("prettypress_markdownactive");
				
				//Deactivate other buttons.
				jQuery("#content-tmce").css("background", "");
				jQuery("#content-html").css("background", "");
				
				return true;
			}
			
		}
		
	});
	
});
