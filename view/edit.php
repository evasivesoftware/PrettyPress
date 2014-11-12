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

//This is the edit post / page hooking page.
//Everything on this page will appear on the admin back end.

global $post, $prettypress_config, $wp_version;
?>
<div id="prettypress_external"></div>
<div id="prettypress" class="prettypress">
	<div id="prettypress_resize_handle" class="prettypress_resize_handle"></div>

	<div id="prettypress_header_menu" class="prettypress_header_menu" data-resize="left-column" data-prettypress_column="left">
		<div id="prettypress_exit" class="prettypress_exit"><div class="dashicons dashicons-no-alt"></div></div>
		<div id="prettypress_menu_trigger" class="prettypress_menu_trigger"><div class="dashicons dashicons-welcome-write-blog"></div>
			<div id="prettypress_menu" class="prettypress_menu">
				<a<?php if ( prettypress_pro_active() ) { ?> class="hidden" <?php } ?> href="http://pro.evasivesoftware.com" target="_blank" id="prettypress_pro_shortcode_link">Shortcode previews</a>
				<a href="#" class="heading" id="prettypress_screen_trigger">Preview size</a>
					<a href="#" class="sub-item" id="prettypress_screen_desktop" data-rel="prettypress_preview_size" data-size="desktop">Desktop</a>
					<a href="#" class="sub-item" id="prettypress_screen_tablet" data-rel="prettypress_preview_size" data-size="tablet">Tablet</a>
					<a href="#" class="sub-item" id="prettypress_screen_mobile" data-rel="prettypress_preview_size" data-size="mobile">Mobile</a>
				<a href="#" id="prettypress_update"><?php
					$anchor = ( $post->post_status != null && $post->post_status == "publish" || $post->post_status == "future" ? "Update" : "Publish" );
					echo $anchor;
				?></a>
			</div>
		</div>
	</div>

	<div id="prettypress_leftcolumn" class="prettypress_leftcolumn" data-resize="left-column" data-prettypress_column="left">

		<div id="prettypress_meta" class="prettypress_meta">
			<input id="prettypress_title" class="prettypress_title" placeholder="Enter title here" value="<?php echo $post->post_title; ?>" />
		</div>
		<div id="prettypress_tabs" class="prettypress_tabs">
			<?php if ( $prettypress_config['markdown_enabled'] == "enabled" ) { ?>
			<a href="#" class="active" data-click="activateTab" data-rel="prettypress_tab_markdown" data-val="markdown">Markdown</a>
			<?php } ?>
			<a href="#"<?php
								if ( $prettypress_config['markdown_enabled'] == "disabled" ) { ?>
									class="active"
								<?php } ?> data-click="activateTab" data-rel="prettypress_tab_visual" data-val="visual">Visual</a>
			<a href="#" data-click="activateTab" data-rel="prettypress_tab_html" data-val="html">HTML</a>
		</div>
		<div id="prettypress_content" class="prettypress_content">

			<div id="prettypress_tab_markdown" class="prettypress_tab <?php
				if ( $prettypress_config['markdown_enabled'] == "enabled" ) {
					?>prettypress_tab_active<?php } else { ?>prettypress_disabled_editor<?php	}
					?>">
				<textarea id="prettypress_markdown" data-resize="editor" class="prettypress_markdown"></textarea>
			</div>

			<div id="prettypress_tab_html" class="prettypress_tab">
				<textarea id="prettypress_html" data-resize="editor" class="prettypress_html"></textarea>
			</div>

			<div id="prettypress_tab_visual" class="prettypress_tab prettypress_tab_visual<?php
				if ( $prettypress_config['markdown_enabled'] == "disabled" ) {
					?> prettypress_tab_active<?php } ?>">
				<?php
					wp_editor('', 'prettypress_tinymce',
						array(
							'textarea_name' => 'prettypress_tinymce_textarea',
							'quicktags' => false,
							'wp_autoresize_on' => false,
							'resize' => true
						)
					);
				?>
			</div>

		</div>


	</div>
	<div id="prettypress_rightcolumn" class="prettypress_rightcolumn" data-prettypress_column="right">
		<iframe id="prettypress_preview" class="prettypress_preview" src="<?php if (! prettypress_post_isnew() ) { echo get_permalink( $post->ID ); } ?>"></iframe>
	</div>

	<div id="prettypress_resize_leftcolumn" class="prettypress_resize_leftcolumn"></div>
	<div id="prettypress_resize_rightcolumn" class="prettypress_resize_rightcolumn"></div>

</div>
<?php prettypress_do_pro(); ?>
<script>

	var prettypress = prettypress({
		postID: 	<?php echo $post->ID; ?>,
		postActive: <?php if ( prettypress_post_isnew() ) { ?>false<?php } else { ?>true<?php } ?>,
		postContent: "<?php echo base64_encode($post->post_content); ?>",
		postContentPP: "<?php echo base64_encode(get_post_meta( $post->ID, 'prettypress_content', true )); ?>",
		elements: {
			wrapper: {
				id: "prettypress"
			},
			external: {
				id: "prettypress_external"
			},
			trig: {
				id: "prettypress_enable"
			},
			close: {
				id: "prettypress_exit"
			},
			publish: {
				id: "publish"
			},
			menuTrigger: {
				id: "prettypress_menu_trigger"
			},
			menu: {
				id: "prettypress_menu"
			},
			update: {
				id: "prettypress_update"
			},
			title: {
				id: "prettypress_title"
			},
			iframe: {
				id: "prettypress_preview"
			},
			markdown: {
				id: "prettypress_markdown"
			},
			html: {
				id: "prettypress_html"
			},
			tinymce: {
				id: "prettypress_tinymce"
			},
			wpTitle: {
				id: "title"
			},
			wpContent: {
				id: "content"
			},
			wpContentClone: {
				id: "content-textarea-clone"
			},
			proLink: {
				id: "prettypress_pro_shortcode_link"
			}
		},
		selectors: {
			title: "[data-rel=title]",
			content: "[data-rel=content]"
		},
		activeEditor: "<?php if ( $prettypress_config['markdown_enabled'] == "enabled" ) { ?>markdown<?php } else { ?>visual<?php } ?>",
		markdownEnabled: <?php if ( $prettypress_config['markdown_enabled'] == "enabled" ) { ?>true<?php } else { ?>false<?php } ?>
	});

</script>
