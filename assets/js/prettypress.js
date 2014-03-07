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

prettypress = new function() {
	
	//Set the status.
	this.status = 0;
	this.hooked_tinymce = "no";
	this.hooked_text = "no";
	this.markdown_active = "no";
	this.publish_menu_active = "no";
	this.initial_editor_width = jQuery("#wp-content-wrap").width();

	this.toggle = function() {
		
		//Check if the post has been saved before launching.
		var requires_save = jQuery("[name=auto_draft]").val();
		if ( requires_save === "1" ) {
			//Save the post before publishing.
			this.prelaunchsave();
			return false;
		}
		
		//Toggles the visibility of preview window.
		if (this.status === 0) {
			//Enable window.
			//Make sure we have a URL to preview.
			if (this.findpageurl() === 1) {
				
				jQuery("#content-markdown").show();
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
			jQuery("#content-markdown").hide();
			jQuery("#prettypress_wrapper").fadeOut(500);
			jQuery("#wp-content-wrap").removeClass("prettypress_entry_field");
			jQuery("#wp-content-wrap").css("width", prettypress.initial_editor_width + "px");
			jQuery("#titlewrap").removeClass("prettypress_title");
			jQuery("#titlewrap").css("width", prettypress.initial_editor_width + "px");
			
			if ( prettypress.markdown_active === "yes" ) {
				//Hide the markdown window.
				prettypress.togglemarkdown();
			}
			
			this.status = 0;
		}
		
	}
	
	this.prelaunchsave = function() {
		
		//Before we launch PrettyPress, we need to save a post draft to have something to display.
		//Ensure we have at least a title before doing this.
		var tmp_title = this.getactivetitle();
		if ( tmp_title ) {
			
			//There is a title. Perform the auto-save.
			//But first, add a prettypress hidden post field.
			jQuery("form#post").append('<input type="hidden" name="prettypress_active" value="1" />');
			
			//Get the current post data and set it to TinyMCE to ensure a clean save.
			var rawhtml = this.getactivecontent();
			
			if ( typeof tinymce != "undefined" ) {
				if ( tinymce.activeEditor != null ) {
					tinymce.activeEditor.setContent( rawhtml );
				} else {
					jQuery("textarea#content").val( rawhtml );
				}
			} else {
				jQuery("textarea#content").val( rawhtml );
			}
			
			//Now, submit the form.
			jQuery("#save-post").click();
			return true;
			
		} else {
			
			this.error( "Sorry, you need to enter a post title before PrettyPress can provide a live preview.", 5000 );
			return true;
			
		}
		
	}
	
	this.publish = function() {
		
		//Ensure we set the data to TinyMCE so we don't lose posts.
		var rawhtml = this.getactivecontent();
		
		if ( typeof tinymce != "undefined" ) {
			if ( tinymce.activeEditor != null ) {
				tinymce.activeEditor.setContent( rawhtml );
			} else {
				jQuery("textarea#content").val( rawhtml );
			}
		} else {
			jQuery("textarea#content").val( rawhtml );
		}
		
		jQuery("#publish").click();
		
		
	}
	
	this.resize = function() {
		
		//Resizes the PrettyPress preview window to fit parent container.
		//Firefox causes issues with this in native CSS.
		var padding = jQuery("#prettypress_wrapper").css("padding-top").replace(/[A-Za-z$-]/g, "");
		padding = parseInt(padding) * 2;
		
		var new_height = jQuery("#prettypress_wrapper").css("height").replace(/[A-Za-z$-]/g, "");
		new_height = parseInt(new_height) - padding;
		
		var editor_height = new_height - 230;
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
				var tmp_title = this.getactivetitle();
				if (tmp_title != this.current_content_title) {
					//The title has changed.
					//Fix the iframe field.
					jQuery("[data-rel=title]", iframe.contents()).html(tmp_title);
					this.current_content_title = tmp_title;
				}
			} else if (type === "content") {
				var tmp_content = this.getactivecontent();
				if (tmp_content != this.current_content) {
					//Update the content.
					jQuery("[data-rel=content]", iframe.contents()).html(tmp_content);
					this.current_content = tmp_content;
				}
			}
			
		}
		
	}
	
	this.getactivetitle = function() {
		//Get the current title.
		return jQuery("#title").val();
	}

	this.getactivecontent = function() {

		//Find the active editor, and pull the value from it.
		//Is the raw text editor visible?
		
		if ( prettypress.markdown_active === "yes" ) {
			//Grab Markdown RAW, convert it.
			var rawmd = prettypress.getmarkdownvalue();
			return marked( rawmd );
			
		} else if ( jQuery("textarea#content").css("display") === "none" ) {
			//TinyMCE is active.
			return tinymce.activeEditor.getContent();
		} else {
			//Raw text editor is active.
			return jQuery("textarea#content").val();
		}
		
	}


	this.hooktinymce = function() {

		//Hook TinyMCE.
		//Do not call this unless you have verified TinyMCE is active.

		tinymce.activeEditor.onKeyUp.add(function(activeEditor, l) {
			prettypress.updatepreviewcontent("content");
		});
	
		tinymce.activeEditor.onChange.add(function(activeEditor, l) {
			prettypress.updatepreviewcontent("content");
		});
		
	}

	this.bootuphooks = function() {

		//Hook tinymce / textarea at startup.
		//This lets the "live update" feature work.
		if ( prettypress.tinymceexists() ) {
			if ( tinymce.activeEditor != null ) {
				prettypress.hooktinymce();
				prettypress.hooked_tinymce = "yes";
			}
		}
		
		//Hook textarea.
		jQuery("textarea#content").keyup(function(){
			prettypress.updatepreviewcontent("content");
		});
		prettypress.hooked_text = "yes";
		
		//Hook markdown.
		jQuery("textarea#prettypress_markdown").keyup(function(){
			prettypress.updatepreviewcontent("content");
		});
		
	}

	this.recursivehooks = function() {

		//This function is called every half a second on the chance the bootup hooks had an error.
		//This occurs when a user had tinymce disabled / inactive by default.
		//This allows PP to hook TinyMCE once its active.
		if ( prettypress.tinymceexists() ) {
			
			if ( prettypress.hooked_tinymce === "yes" && prettypress.hooked_text === "yes" ) {
				clearInterval(prettypress.recursinghnd);
				return false;
			} else {

				if ( prettypress.hooked_tinymce === "no" ) {
					//Attempt to hook tinymce.
					if ( tinymce.activeEditor != null ) {
						prettypress.hooktinymce();
						prettypress.hooked_tinymce = "yes";
					}
				}
				
			}
		
		} else {
			//No TinyMCE.
			//Quit recursing to find it.
			clearInterval(prettypress.recursinghnd);
			return false;
		}
		
	}
	
	this.tinymceexists = function() {
		//Check for a TinyMCE session.
		if ( typeof tinymce === 'undefined' ) {
			return false;
		} else {
			return true;
		}
	}
	
	this.togglemarkdown = function() {
		
		//Toggle the Markdown editor.
		if ( prettypress.markdown_active === "yes" ) {
			//Turn off Markdown.
			
			//Grab the markdown value.
			var rawhtml = prettypress.getactivecontent();
			
			if ( prettypress.tinymceexists() ) {
				if ( tinymce.activeEditor != null ) {
					tinymce.activeEditor.setContent( rawhtml );
				}
			}
			
			jQuery("textarea#content").val( rawhtml );
			
			jQuery("#prettypress_markdown_editor_wrapper").hide();
			
			//Show wordpress code elements.
			jQuery("#wp-content-editor-container").show();
			jQuery("#content-resize-handle").show();
			jQuery("#insert-media-button").show();
			
			prettypress.markdown_active = "no";
			
		}  else {
			//Turn on Markdown.
			
			//Grab the existing content.
			var rawhtml = prettypress.getactivecontent();
			
			//Convert the raw HTML to Markdown.
			var rawmd = toMarkdown( rawhtml );
			
			//Set it to the Markdown content.
			jQuery("#prettypress_markdown").val( rawmd );
			
			//Hide wordpress core elements.
			jQuery("#wp-content-editor-container").hide();
			jQuery("#content-resize-handle").hide();
			jQuery("#insert-media-button").hide();

			
			//Show prettypress markdown editor
			jQuery("#prettypress_markdown_editor_wrapper").show();
			prettypress.markdown_active = "yes";
			
		}
		
	}
	
	this.getmarkdownvalue = function() {
		
		if ( prettypress.markdown_active === "yes" ) {
			return jQuery("#prettypress_markdown").val();
		}
		
	}
	
	this.publishmenutoggle = function() {
		
		if ( prettypress.publish_menu_active === "no" ) {
			jQuery("#prettypress_publish_menu").show();
			prettypress.publish_menu_active = "yes";
		} else {
			jQuery("#prettypress_publish_menu").hide();
			prettypress.publish_menu_active = "no";
		}
	}
}
