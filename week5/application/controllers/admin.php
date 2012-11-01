<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * The admin class handles all functions that require a user to be logged in
 * @access public
 * @author Bart Veneman
 */
class Admin extends CI_Controller {
        
    /**
     * Create an instance of Admin and check if a user is logged in 
     */
    function __construct()
    {
        parent::__construct();
        $this->is_logged_in();
    }
    
    
    /**
     * Check if a user is logged in
     * @return boolean 
     */
    function is_logged_in()
    {
        $is_logged_in = $this->session->userdata("is_logged_in");
        if(!isset($is_logged_in) || $is_logged_in != true)
            redirect("login"); // Please redirect the user to a login page
        return true;
    }
    
}

/* End of file admin.php */
/* Location: ./application/controllers/admin.php */