<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('get_first_paragraph'))
{
    /**
     * Get the first paragraph of a block of text with <p> tags.
     * @param type $string
     * @return type 
     */
    function get_first_paragraph($string)
    {
        //removes anchors and other tags from the intro
		return strip_tags(substr($string,0, strpos($string, "</p>")+4));
    }
}


/* End of file MY_text_helper.php */
/* Location: /application/helpers/MY_text_helper.php */