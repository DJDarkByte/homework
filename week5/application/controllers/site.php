<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Site extends CI_Controller {
    
    /**
     * The website landing page 
     */
    function index()
    {
        $this->load->view("scheme");
    }
        
}


/* End of file site.php */
/* Location: ./application/controllers/site.php */