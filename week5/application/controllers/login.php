<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * The Login class handles the user's session data
 * @access public
 * @author Bart Veneman
 */
class Login extends CI_Controller {
    
    /**
     * Display the login page 
     */
    function index()
    {
        $data["main_content"] = "login_view";
        $this->load->view("admin/template", $data);
    }
    
    
    /**
     * Check the credentials passed from the login form
     */
    function validate_credentials()
    {
        $query = $this->membership_model->validate($this->input->post("username"), $this->input->post("password"));
        if($query) // If the user's credentials are valid
        {
            $data = array(
                "username" => $this->input->post("username"),
                "is_logged_in" => TRUE
            );
            $this->session->set_userdata($data);
            redirect("admin");
        }
        else
        {
            redirect("login");
        }
    }
    
    
    /**
     * Log the user out and show the login page again
     */
    function logout()
    {  
        $this->session->sess_destroy();
        redirect("login");
    }
    
    
    /**
     * Reset the user's password. 
     * Send an email with the new password to the user and go back to the login page
     */
    function reset_password()
    {
        
    }
    
}

/* End of file login.php */
/* Location: ./application/controllers/login.php */