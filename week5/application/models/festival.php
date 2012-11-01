<?php

require_once 'db.php';
/**
 * Description of festival
 *
 * @author Veneman
 */
class festival {
    
    public $db;
    
    public function __construct() {
        $this->db = new db();
    }
    
    /**
     * 
     * @return int  ID of last inserted item
     */
    function create($name) {
        return $this->db->insert('INSERT INTO festival (name) VALUES (' . $name . ');');
    }
    
    function read($id) {
        $query = $this->db->query('SELECT * FROM festival WHERE festivalID = ' . $id . ';');
        return $query[0];
    }
}