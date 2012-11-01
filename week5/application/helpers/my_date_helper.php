<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('readable_date'))
{
    /**
     * Return a readable date string in the format "dd-mm-yyyy"
     * @param type $string
     * @param type $format
     * @return type 
     */
    function readable_date($string, $format = "%d %M %Y")
    {
        return mdate($format, mysql_to_unix($string));
    }
}


if(!function_exists("date_to_folder"))
{
    /**
     * Returns a string in the format "yyyy-mm"
     * 
     * @param type $mysql_date
     * @return type 
     */
    function date_to_folder($mysql_date)
    {
        return mdate("%Y-%m", mysql_to_unix($mysql_date));
    }
}

/* End of file MY_date_helper.php */
/* Location: /application/helpers/MY_date_helper.php */