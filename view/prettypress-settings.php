<?php
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


//Defend our stuff!
if ( ! defined('ABSPATH') ) { exit; } ?>

<div class="wrap">
	<div id="icon-options-general" class="icon32"><br /><br /></div>
	<h2><?php echo PLUGINNAME; ?> settings</h2>

	<form method="post" action="options.php">
		<?php settings_fields( 'prettypress-settings-group' ); ?>
		<?php do_settings_sections( 'prettypress-settings-group' ); ?>
		
		<table class="form-table">
			<tr valign="top">
				<th scope="row">Enable the PrettyPress editing screen?</th>
				<td>
					<?php
						$enabled = get_option('prettypress_enabled');
					?>
					<select name="prettypress_enabled">
						<option value="enabled"<?php if ( $enabled == "enabled" ) { ?> selected="selected"<?php } ?>>Enabled</option>
						<option value="disabled"<?php if ( $enabled == "disabled" ) { ?> selected="selected"<?php } ?>>Disabled</option>
					</select>
					<p class="description">The standard Wordpress composition screen remains available when PrettyPress is enabled. You should only need to disable PrettyPress if your theme experiences serious incompatibility issues.</p>
				</td>
			</tr>
		</table>
		
		<?php submit_button(); ?>

	</form>


	<h3 class="title">Found an issue?</h3>
	<p>PrettyPress is still in early development, meaning you may encounter bugs.</p>
	<p>If you've found a bug, consider sending us a pull request via Github to resolve the issue.</p>
	<p><a href="https://www.github.com/emarketeer/PrettyPress" target="_blank" rel="nofollow">PrettyPress on Github</a></p>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<p><small>PrettyPress, a project by eMarketeer Australia.</small></p>
	
</div>