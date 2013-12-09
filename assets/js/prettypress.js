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
prettypress = new function() {
	//Set the status.
	this.status = 0;
	
	this.toggle = function() {
		//Toggles the visibility of preview window.
		if (this.status === 0) {
			//Enable window.
			//Make sure we have a URL to preview.
			if (this.findpageurl() === 1) {
				jQuery("#wp-content-wrap").addClass("prettypress_entry_field");
				jQuery("#titlewrap").addClass("prettypress_title");
				jQuery("#prettypress_wrapper").fadeIn(500);
				//Load the iframe.
				jQuery("#prettypress_iframe").load(function() {
					//Once the new frame has loaded.
					prettypress.frameload();
				});
				var current_source = jQuery("#prettypress_iframe").attr("src");
				if (this.src != current_source) {
					var source = this.src;
					jQuery("#prettypress_iframe").attr("src", source);
				}
				this.status = 1;
				prettypress.resize();
			} else {
				//No url visible.
				//Need to "save" draft?
				this.error("Couldn't find any page to draw original theme from. You may need to press 'save' if you have just created this post.", 5000);
			}
		} else {
			//Disable window.
			jQuery("#prettypress_wrapper").fadeOut(500);
			jQuery("#wp-content-wrap").removeClass("prettypress_entry_field");
			jQuery("#titlewrap").removeClass("prettypress_title");
			this.status = 0;
		}
	}
	
	this.resize = function() {
		//Resizes the PrettyPress preview window to fit parent container.
		//Firefox causes issues with this in native CSS.
		var padding = jQuery("#prettypress_wrapper").css("padding-top").replace(/[A-Za-z$-]/g, "");
		padding = parseInt(padding) * 2;
		var new_height = jQuery("#prettypress_wrapper").css("height").replace(/[A-Za-z$-]/g, "");
		new_height = parseInt(new_height) - padding;
		var editor_height = new_height - 190;
		new_height = new_height + padding;
		//Fix the preview window size.
		jQuery("#prettypress_iframe").css("width", jQuery("#prettypress_preview_container").css("width"));
		jQuery("#prettypress_iframe").css("height", new_height + "px");
		//Fix the editor size.
		jQuery("#content_ifr").css("height", editor_height + "px");
	}
	
	this.findpageurl = function() {
		//Get the page permalink to view.
		var permalink = jQuery("#prettypress_post_permalink").val();
		if (permalink) {
			this.src = permalink;
			return 1;
		} else {
			this.src = "";
			return 0;
		}
	}
	
	this.error = function(message, timeout) {
		if (!timeout) {
			timeout = 0;
		}
		//Add the error message.
		var id = this.generateUid("error");
		jQuery("#prettypress_warnings").append('<div id="' + id + '" class="prettypress_warning_box"><p><strong>PrettyPress error: </strong>' + message + '</p><p><small>Click this message to hide it</small></p></div>');
		if (timeout != 0) {
			//Fade the function out.
			window.setTimeout(function() {
				jQuery("#" + id).fadeOut(1000, function() {
					jQuery(this).remove();
				});
			}, timeout);
		}
	}
	
	this.generateUid = function(separator) {
		//Thanks to http://stackoverflow.com/questions/12223529/create-globally-unique-id-in-javascript
		var delim = separator || "-";

		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
	};
	
	this.frameload = function() {
		//Search for the content.
		var iframe = jQuery("#prettypress_iframe");
		//Look for attributes in the wrong location.
		jQuery('[title]', iframe.contents()).each(function() {
			var attrcontent = jQuery(this).attr("title");
			if (attrcontent === '<span data-rel=') {
				jQuery(this).removeAttr("title");
			}
		});
		//Remove the admin bar.
		jQuery('#wpadminbar', iframe.contents()).hide();
		jQuery('html', iframe.contents()).css("margin-top", "0!important");
		var title = jQuery("[data-rel=title]", iframe.contents()).html();
		if (title) {
			this.current_content_title = title;
		} else {
			this.error("Couldn't find a title on preview page. You need to add data-rel='title' to the element holding it.", 5000);
		}
		var content = jQuery("[data-rel=content]", iframe.contents()).html();
		if (title) {
			this.current_content = content;
		} else {
			this.error("Couldn't find the content on preview page. You need to add data-rel='content' to the element holding it.", 5000);
		}
		this.updatepreviewcontent("content");
	}
	
	this.updatepreviewcontent = function(type) {
		var iframe = jQuery("#prettypress_iframe");
		if (prettypress.status === 1) {
			//Only update for valid requests.
			if (type === "title") {
				var tmp_title = jQuery("#title").val();
				if (tmp_title != this.current_content_title) {
					//The title has changed.
					//Fix the iframe field.
					jQuery("[data-rel=title]", iframe.contents()).html(tmp_title);
					this.current_content_title = tmp_title;
				}
			} else if (type === "content") {
				var tmp_content = tinymce.activeEditor.getContent();
				if (tmp_content != this.current_content) {
					//Update the content.
					jQuery("[data-rel=content]", iframe.contents()).html(tmp_content);
					this.current_content = tmp_content;
				}
			}
		}
	}
}