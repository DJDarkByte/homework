<?php
 require_once 'db.php';
 
/**
 * Description of day
 *
 * @author Veneman
 */
class Day {
    
    private $db;
    
    function __construct() {
        $this->db = new db();
    }
    
    function create($dayname) {
        return $this->db->insert('INSERT INTO day (name) VALUES (' . $dayname . ');');
    }
}