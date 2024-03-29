<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
* Get either a Gravatar URL or complete image tag for a specified email address.
*
* @param string $email The email address
* @param string $s Size in pixels, defaults to 80px [ 1 - 512 ]
* @param boolean $img True to return a complete IMG tag False for just the URL
* @param string $d Default imageset to use [ 404 | mm | identicon | monsterid | wavatar ]
* @param string $r Maximum rating (inclusive) [ g | pg | r | x ]
* @param array $atts Optional, additional key/value attributes to include in the IMG tag
* @return String containing either just a URL or a complete image tag
*/
if ( ! function_exists('gravatar'))
{
    function gravatar( $email, $s = 80, $img = true, $d = 'identicon', $r = 'x', $atts = array() )
    {
        $url = ( isset($_SERVER['HTTPS']) ) ? 'https://secure.' : 'http://www.';
        $url .= 'gravatar.com/avatar/';
        $url .= strtolower( trim( $email ) ); // email should be already md5() in database, else md5() this line
        $url .= "?s=$s&d=$d&r=$r";
        if ( $img )
        {
            $url = '<img src="' . $url . '"';
            foreach ( $atts as $key => $val )
                $url .= ' ' . $key . '="' . $val . '"';
            $url .= ' />';
        }
        return $url;
    }
} 