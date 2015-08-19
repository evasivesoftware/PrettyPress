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

define( "PLUGINNAME",									"PrettyPress" );
define( "PLUGINVERSION", 							"1.2.0" );
define( "PLUGINCODENAME", 						"Torturous Tortoise" );
define( "PLUGINPATH",									dirname(__FILE__) );
define( "PRETTYPRESS_BASE_URL",				plugins_url( "", __FILE__ ) );
define( "PRETTYPRESSPRO_SALES_URL",		"http://pro.evasivesoftware.com" );
define( "PRETTYPRESSPRO_VERSION_URL",	"http://pp.evasivesoftware.com/version.txt" );

//Load our requirements.
require_once 'lib/config.php';
require_once 'lib/settings.php';
require_once 'lib/hooks.php';

//Pro only.
require_once 'lib/ajax.php';
