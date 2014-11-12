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



//Build a list of resizable editors.
var editorResizeList = [];

//Resize width
var resizeLeftGlobal = null;
var resizeRightGlobal = null;

//Resize switch.
var resizeActive = false;

jQuery(document).ready(function(){

	//Hook resize click.
	jQuery("#prettypress_resize_handle").on('mousedown',function(e){
		e.preventDefault();
		prettypressStartResize();
	});
	jQuery(window).on("mouseup",function(e){
		prettypressStopResize();
	});

});

//Self wrapper function to handle the PrettyPress layout.
jQuery(window).load(function(){

	//Build a list of elements.
	jQuery("[data-resize=editor]").each(function(){
		editorResizeList.push( this );
	});

	editorResizeList.push( jQuery("#prettypress_tinymce_ifr") );

	//Resize the window.
	prettypressHandleResize();

});

jQuery(window).resize(function(){
	prettypressHandleResize();
});

function prettypressHandleResize() {

	//Resize the PP window.
	//Grab the window height and width.
	var winWidth = jQuery(window).width();
	var winHeight = jQuery(window).height();
	var prettypressLeftColumn = jQuery("#prettypress_leftcolumn");
	var prettypressResizeHandle = jQuery("#prettypress_resize_handle");
	var editorOffset = jQuery("#prettypress_tabs").offset().top;
	var editorOffsetHeight = jQuery("#prettypress_tabs").outerHeight();
	editorOffset = editorOffset + editorOffsetHeight;

	//Loop through editors that need stretching.
	for( i=0;i<editorResizeList.length;i++ ) {

		//var editorOffset = jQuery(editorResizeList[i]).offset().top;
		var padding = parseInt( jQuery(prettypressLeftColumn).css("padding-left"), 10 );
		var editorHeight = winHeight - padding - editorOffset;

		if ( jQuery(editorResizeList[i]).attr("id") === "prettypress_tinymce_ifr" ) {
			editorHeight -= 130;
			jQuery(editorResizeList[i]).css("min-height", editorHeight + "px");
		} else {
			jQuery(editorResizeList[i]).css("height", editorHeight + "px");
		}



	}

	//Fix the resize bar position.
	var barwidth = jQuery(prettypressLeftColumn).width();
	var barpadding = parseInt( jQuery(prettypressLeftColumn).css("padding-left"), 10 );
	var resizeWidth = jQuery(prettypressResizeHandle).width();
	var barLeft = barwidth + barpadding + (resizeWidth / 2);

	jQuery(prettypressResizeHandle).css("left", barLeft + "px");

}

function prettypressStartResize() {

	if ( resizeActive === false ) {
		resizeActive = true;
	} else {
		return;
	}

	//Show the preview windows.
	jQuery("#prettypress_resize_leftcolumn").show();
	jQuery("#prettypress_resize_rightcolumn").show();

	//Hook on mouse move.
	jQuery(window).on("mousemove",function(e){

		var leftColumn = document.getElementById("prettypress_resize_leftcolumn");
		var rightColumn = document.getElementById("prettypress_resize_rightcolumn");

		var width = jQuery(window).width();
		var mouseX = e.clientX;

		var leftColumnWidth = mouseX;
		var rightColumnWidth = width - leftColumnWidth;

		if ( leftColumnWidth > 500 && rightColumnWidth  > 320 ) {

			leftColumn.style.width = leftColumnWidth + "px";
			rightColumn.style.width = rightColumnWidth + "px";

			resizeLeftGlobal = leftColumnWidth;
			resizeRightGlobal = rightColumnWidth;

		}

	});

}

function prettypressStopResize() {

	if ( resizeActive === true ) {
		resizeActive = false;
	} else {
		return;
	}

	//Hide the preview windows.
	jQuery("#prettypress_resize_leftcolumn").hide();
	jQuery("#prettypress_resize_rightcolumn").hide();

	if ( resizeLeftGlobal !== null && resizeRightGlobal !== null ) {

		var width = jQuery(window).width();
		var percLeft = (resizeLeftGlobal / width) * 100;
		var percRight = (resizeRightGlobal / width) * 100;

		jQuery("[data-prettypress_column=left]").css("width", percLeft + "%");
		jQuery("[data-prettypress_column=right]").css("width", percRight + "%");
		window.setTimeout(function(){
			prettypressHandleResize();
		}, 750);

}
	//Detach mouse move hook.
	jQuery(window).unbind('mousemove');

}

function prettypressResizePre( size ) {

	var width = jQuery(window).width();

	switch( size ) {
		case "desktop":
			if ( width > 1350 ) {
				prettypressResizePreview(1280);
			} else {
				prettypressResizePreview(1024);
			}
		break;
		case "tablet":
			prettypressResizePreview(768);
		break;
		case "mobile":
			prettypressResizePreview(320);
		break;
	}

}

function prettypressResizePreview(size) {

	var width = jQuery(window).width();
	var right = size;
	var left = width - right;


	var percLeft = (left / width) * 100;
	var percRight = (right / width) * 100;
	resizeLeftGlobal = left;
	resizeRightGlobal = right;

	jQuery("[data-prettypress_column=left]").css("width", percLeft + "%");
	jQuery("[data-prettypress_column=right]").css("width", percRight + "%");
	window.setTimeout(function(){
		prettypressHandleResize();
	}, 750);

}
