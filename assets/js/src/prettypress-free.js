/*
@package PrettyPress

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

//The main prettypress function.
//Data for runtime should be passed to config in JSON format.
function prettypress( config ) {

	//Check to see see if config was passed to us.
	if ( config !== undefined ) {
		//Map the config to our private scope.
		this.config = config;
		this.config.selectorElements = {};
	} else {
		//Throw an error, we don't have any hooks or config.
		throw new Error("prettypress() called without any config json passed as argument 1.");
	}

	populateElements = function() {
		//Save all of the element objects for later use.
		for ( var prop in this.config.elements ) {
		  this.config.elements[prop].element = document.getElementById( this.config.elements[prop].id );
		}
	}

	createErrorBox = function( title, description ) {

		var errorBox = document.createElement("div");
		errorBox.className = "prettypress_errorbox";

		var errorHeading = document.createElement("h3");
		errorHeading.innerHTML = title;

		var errorDescription = document.createElement("div");
		errorDescription.className = "description";
		errorDescription.innerHTML = description;

		var errorButton = document.createElement("a");
		errorButton.className = "close";
		errorButton.innerHTML = "Got it";

		//Append the elements.
		errorBox.appendChild(errorHeading);
		errorBox.appendChild(errorDescription);
		errorBox.appendChild(errorButton);

		//Hook on close.
		jQuery(errorButton).on('click',function(){
			jQuery(errorBox).fadeTo(250,0,function(){
				errorBox.parentNode.removeChild(errorBox);
			});
		});

		//Append to prettypress.
		this.config.elements.external.element.appendChild(errorBox);

		jQuery(errorBox).fadeTo(250,1);

	}

	launchPrettyPress = function() {

		//Before launching, check if the post has been saved or published.
		if ( this.config.postActive === false ) {
			//There is an error.
			this.createErrorBox("No draft visible.","<p>Sorry, you need to enter a post title and save it as a draft before
				 PrettyPress can launch it's editor.</p>");
			return false;
		}

		//Check if values inside TinyMCE have changed since page load.
		//If they have, update the active PrettyPress editor to match.
		this.syncWpEditors();

		//Launch the PrettyPress window.
		jQuery(this.config.elements.wrapper.element).fadeIn(500, function(){

			//Trigger editor resize.
			prettypressHandleResize();

		});

	}

	syncWpEditors = function() {

		//Get the most recent content from Wordpress editors.
		var activeContent = this.getActiveWpEditorContent();
		var activeTitle = this.config.elements.wpTitle.element.value;

		//Filter it.
		activeContent = this.reverseFilter( this.config.activeEditor, activeContent );

		var changed = false;
		var element = null;


		//Compare it to the active PP editor.
		switch( this.config.activeEditor ) {
			case "markdown":
				if ( activeContent !== this.config.elements.markdown.element.value ) {
					changed = true;
					element = this.config.elements.markdown.element;
				}
			break;
			case "html":
				if ( activeContent !== this.config.elements.html.element.value ) {
					changed = true;
					element = this.config.elements.html.element;
				}
			break;
			case "visual":
				if ( activeContent !== this.getVisualValue() ) {
					changed = true;
					element = "visual";
				}
			break;
		}

		//If it differs, update the PP editor to reflect changes (through filters)
		if ( changed === true ) {

			//Update the active editor buffer.
			if ( element !== "visual" ) {
				element.value = activeContent;
			} else {
				this.setVisualValue( activeContent );
			}

		}

		if ( activeTitle !== window.config.elements.title.element.value ) {
			window.config.elements.title.element.value = activeTitle;
		}

	}


	getVisualValue = function() {
		//Grab the value of PrettyPress TinyMCE.

		var buffer = null;
		buffer = window.tinymce.get( this.config.elements.tinymce.id ).getContent();

		return buffer;

	}

	setVisualValue = function( buffer ) {

		//Set the value of PrettyPress TinyMCE.
		window.tinymce.get( this.config.elements.tinymce.id ).setContent( buffer );

	}


	getActiveWpEditorContent = function() {

		//Determines the active WP editor and returns its content.

		var tinyMceActive = false;

		if( jQuery("#wp-content-wrap").hasClass("tmce-active") ){
			tinyMceActive = true;
		}

		if ( tinyMceActive === true ) {
			//TinyMCE is active.
			return tinymce.get("content").getContent();
		} else {
			//Text editor is active.
			var canvas = document.getElementById("content");
			//Run the_content filter before returning to fake the output.
			return this.wpautop( canvas.value );
		}


	}

	wpautop = function( buffer ) {

		//JS function to match WP's wpauto() function in PHP.
		//Original function located in wp-includes/formatting.php.

		buffer = buffer + "\n"; // Pad the end.

		//Replace \n with <br />.
		//This shouldn't occure within <pre> or <code>
		//Fix this.
		buffer = buffer.replace( /(\r\n|\n|\r)/g, '<br />' );


		return buffer;

	}

	closePrettyPress = function() {

		//Close the PrettyPress window.
		jQuery(this.config.elements.wrapper.element).fadeOut(500);

	}

	tryFillContent = function() {

		//Try to fill the open editor with page content.

		//If we have raw, prefiltered content saved, use that.
		if ( this.config.postContentPP ) {

			var contentRaw = this.decodeContent( this.config.postContentPP );
			//This should be pre-filtered, no need to re-filter it.

		} else {

			//If not, fall back to the WP saved content from database.
			var contentRaw = this.decodeContent( this.config.postContent );
			//This is raw WP data. Run reverse filter.
			contentRaw = this.reverseFilter( this.config.activeEditor, contentRaw );

		}

		//Now that our content has been decoded and filtered, drop it into the active editor.
		switch( this.config.activeEditor ) {
			case "markdown":
				this.config.elements.markdown.element.value = contentRaw;
			break;
			case "html":
				this.config.elements.html.element.value = contentRaw;
			break;
			case "visual":
				this.setVisualValue( contentRaw );
			break;
		}

	}

	reverseFilter = function( type, content ) {

		switch( type ) {

			case "markdown":
				//Run HTML2Markdown here.
				return this.htmlToMarkdown( content );
			break;
			case "html":
				//Run through HTML beautify.
				return html_beautify(content);
			break;
			case "visual":
				//None required.
				return content;
			break;

		}

		return content;

	}

	decodeContent = function( buffer ) {
		return Base64.decode( buffer );
	}



	liveUpdate = function ( type, value ) {

		var iframe = this.config.elements.iframe.element;

		//This is usually called on key up event.
		switch ( type ) {
			case "title":
				//Update the title field with new value.
				//Title doesn't need to run any filters.

				//Find the title in the iFrame.
				jQuery( this.config.selectors.title, jQuery(iframe).contents() ).html( value );

				//Update the WP editor to prevent losing data.
				this.updateWpTitle( value );

			break;

			case "markdown":
				//Update the content field with new value.
				//Markdown should run md2html, and then shortcodes.
				value = this.markdownToHtml( value );

				var value_prefilters = value;

				//Run through shortcodes filter (pro only).
				if ( typeof(prettypressProActive) === "function" ) {
    			value = prettypressFilterShortcodes( value );
    			value = prettypressFilteroEmbeds( value );
				}

				//Find the content in the iFrame.
				jQuery( this.config.selectors.content, jQuery(iframe).contents() ).html( value );

				//Update the WP editor to prevent losing data.
				this.updateWpEditor( "content", value_prefilters );

			break;

			case "html":
				//Update the content field with new value.
				//HTML only runs shortcode filters.

				var value_prefilters = value;

				//Run through shortcodes filter (pro only).
				if ( typeof(prettypressProActive) === "function" ) {
    			value = prettypressFilterShortcodes( value );
    			value = prettypressFilteroEmbeds( value );
				}

				//Find the content in the iFrame.
				jQuery( this.config.selectors.content, jQuery(iframe).contents() ).html( value );

				//Update the WP editor to prevent losing data.
				this.updateWpEditor( "content", value_prefilters );

			break;

			case "visual":
				//Update the content field with new value.
				//HTML only runs shortcode filters.

				var value_prefilters = value;

				//Run through shortcodes filter (pro only).
				if ( typeof(prettypressProActive) === "function" ) {
    			value = prettypressFilterShortcodes( value );
    			value = prettypressFilteroEmbeds( value );
				}

				//Find the content in the iFrame.
				jQuery( this.config.selectors.content, jQuery(iframe).contents() ).html( value );

				//Update the WP editor to prevent losing data.
				this.updateWpEditor( "content", value_prefilters );
			break;
		}

	}

	updateWpTitle = function( value ) {

		//Update WP's default title via JS to prevent losses while typing.
		this.config.elements.wpTitle.element.value = value;

	}

	updateWpEditor = function( type, value ) {

		//Update WP's default editor via JS to prevent losses while typing.
		switch ( type ) {
			case "content":

				var canvas = document.getElementById("content");

				//TinyMCE.
				if( tinymce.hasOwnProperty("activeEditor") ) {
					if ( tinymce.get("content") !== null ) {
						tinymce.get("content").setContent( value );
						canvas.value = value;
					} else {
						canvas.value = value;
					}
				} else {
					canvas.value = value;
				}
			break;
		}

	}

	toggleMenu = function() {

		//Check current menu status.
		//Open or close menu.
		if ( jQuery(this.config.elements.menu.element).hasClass("prettypress_menu_active") ) {

			//Deactivate menu.
			jQuery(this.config.elements.menuTrigger.element).removeClass("prettypress_menuTrigger_active");
			jQuery(this.config.elements.menu.element).removeClass("prettypress_menu_active");

		} else {

			//Activate menu.
			jQuery(this.config.elements.menuTrigger.element).addClass("prettypress_menuTrigger_active");
			jQuery(this.config.elements.menu.element).addClass("prettypress_menu_active");

		}

	}

	updatePost = function() {

		var pp = this;

		window.setTimeout(function(){
			jQuery(pp.config.elements.publish.element).click();
		},500);
		this.closePrettyPress();

	}

	parseShortcodes = function( buffer ) {
		//Free version does nothing.
		return buffer;
	}

	markdownToHtml = function( buffer ) {

		//Convert buffer from markdown to html.
		return marked( buffer );

	}

	htmlToMarkdown = function( buffer ) {

		//Convert buffer from html to markdown.
		return toMarkdown( buffer );

	}

	syncPPEditors = function(){

		var theContent = this.getRawPPContent();

		//Synchronizes all of the PrettyPress editors together.
		switch ( this.config.activeEditor ) {

			case "markdown":
				//Convert markdown to html.
				theContent = this.markdownToHtml( theContent );

				//Write the results to the other editors.
				this.config.elements.html.element.value = html_beautify( theContent );
				this.setVisualValue( theContent );
			break;

			case "html":

				//Convert html back into markdown.
				markdownContent = this.htmlToMarkdown( theContent );

				//Write the results to the other editors.
				this.config.elements.markdown.element.value = markdownContent;
				this.setVisualValue( theContent );

			break;

			case "visual":

				//Convert html back into markdown.
				markdownContent = this.htmlToMarkdown( theContent );

				//Write the results to the other editors.
				this.config.elements.markdown.element.value = markdownContent;
				this.config.elements.html.element.value = html_beautify( theContent );

			break;

		}

	}

	getRawPPContent = function(){

		switch( this.config.activeEditor ) {
			case "markdown":
				return this.config.elements.markdown.element.value;
			break;
			case "html":
				return this.config.elements.html.element.value;
			break;
			case "visual":
				return this.getVisualValue();
			break;
		}

	}

	switchTabs = function( editor, element, tabelement ) {

		if ( this.config.activeEditor === editor) {
			//Editor already active.
			return false;
		}

		//Synchronize the editors.
		this.syncPPEditors();

		//Activate the new tab.
		jQuery(".prettypress_tab_active").removeClass("prettypress_tab_active");
		jQuery("#" + element).addClass("prettypress_tab_active");
		jQuery("#prettypress_tabs .active").removeClass("active");
		jQuery(tabelement).addClass("active");
		this.config.activeEditor = editor;

	}

	executeHooks = function() {
		//Execute all of the hooks related to this build.

		var pp = this;

		//PrettyPress launch hook.
		this.config.elements.trig.element.onclick = function(e){
			e.preventDefault();
			pp.launchPrettyPress();
		}

		//PrettyPress close hook.
		this.config.elements.close.element.onclick = function(e){
			e.preventDefault();
			pp.closePrettyPress();
		}

		//PrettyPress publish menu hook.
		this.config.elements.menuTrigger.element.onclick = function(e) {
			e.preventDefault();
			pp.toggleMenu();
		}

		this.config.elements.update.element.onclick = function(e) {
			e.preventDefault();
			pp.updatePost();
		}

		//PrettyPress title hook.
		this.config.elements.title.element.onkeyup = function(e) {
			//Do live preview update.
			pp.liveUpdate( 'title', this.value );
		}

		//PrettyPress markdown hook.
		if ( this.config.markdownEnabled === true ) {
			this.config.elements.markdown.element.onkeyup = function(e) {
				//Do live preview update on markdown.
				pp.liveUpdate( 'markdown', this.value );
			}
		}

		//PrettyPress html hook.
		this.config.elements.html.element.onkeyup = function(e) {
			//Do live preview update as html.
			pp.liveUpdate( 'html', this.value );
		}

		//PrettyPress pro hook.
		this.config.elements.proLink.element.onclick = function(e) {
			e.preventDefault();
			var win = window.open( this.href, '_blank' );
			win.focus();
		}

		//PrettyPress tinymce hook.
		tinymce.get( this.config.elements.tinymce.id ).onKeyUp.add(function(ed,e){
			//Do live preview update as visual.
			pp.liveUpdate( 'visual', pp.getVisualValue() );
		});

		//PrettyPress tab switch hook.
		//This requires jQuery for cross compatibility.
		jQuery("[data-click=activateTab]").on('click',function(e){
			e.preventDefault();
			if (! jQuery(this).hasClass("active") ) {
				var newEditorEl = jQuery(this).attr("data-rel");
				var newEditor = jQuery(this).attr("data-val");
				pp.switchTabs( newEditor, newEditorEl, this );
			}
		});

		//PrettyPress preview size hook.
		jQuery("[data-rel=prettypress_preview_size]").on('click',function(e){
			e.preventDefault();

			//Do the resize.
			var size = jQuery(this).attr("data-size");

			prettypressResizePre( size );

		});

	}

	window.onload = function() {
		//Startup.
		this.populateElements();
		this.tryFillContent();
		this.executeHooks();
	}

}
