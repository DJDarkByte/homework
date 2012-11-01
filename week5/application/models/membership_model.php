<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Membership is used to work with users
 * @access public
 * @author Bart Veneman
 */
class Membership_model extends CI_Model {
    
    /**
     * Check if given user credentials match in the database
     * @return boolean 
     */
    function validate($username, $password)
    {
        $this->db->where("username", $username);
        $this->db->where("password", sha1($password));
        $query = $this->db->get("membership");
        
        if($query->num_rows() == 1)
            return true;
        
        return false;
    }
    
    /**
     * Change the password of a user in the database
     * @param string $username
     * @param string $newpassword 
     */
    function change_password($username, $newpassword)
    {
        $this->db->where("username", $username);
        $this->db->update("membership", array("password" => sha1($newpassword)));
    }
    
    /**
     * Get user info from the database based on given name
     * @param string $name
     * @return boolean 
     */
    function get_user_by_name($name)
    {
        $this->db->where("username", $name);
        $query= $this->db->get("membership");
        
        if($query->num_rows() == 1)
            return $query->row();
        return false;
    }
    
}

/* End of file membership_model.php */
/* Location: ./application/models/membership_model.php */