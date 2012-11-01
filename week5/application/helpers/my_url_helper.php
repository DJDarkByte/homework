<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if(!function_exists("page_link")) 
{
    /**
     * Return the base_url() with or without the index.php, depending on the workstation
     * @param type $uri
     * @return type 
     */
    function page_link($uri = "") 
    {
        switch(WORKSTATION) {
            case "windows":
            case "live":
                return base_url($uri);
                break;

            case "ubuntu":
                return base_url("index.php/" . $uri);
                break;
            
            default:
                return base_url("index.php" . $uri);
        }
    }
}

/* End of file my_url_helper.php */
/* Location: /application/helpers/my_url_helper.php */