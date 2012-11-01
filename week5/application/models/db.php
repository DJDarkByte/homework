<?php

/**
 * Description of db
 *
 * @author Veneman
 */
class db {
    
    private $dbh;
    
    public function __construct() {
        try {
            $this->dbh = new PDO('mysql:host=localhost;dbname=iswtclient', 'root', '', array(PDO::ATTR_PERSISTENT => true));
        } catch (PDOException $e) {
            exit($e->getMessage());
        }
    }
    
    public function get($table_name) {
        $rows = array();
        
        foreach($this->dbh->query('SELECT * FROM ' . $table_name) as $row) {
            $rows[] = $row;
        }
        
        return $rows;
    }
    
    public function insert($qry) {
        $this->dbh->query($qry);
        return $this->dbh->lastInsertId();
    }
    
    public function query($query) {
        $rows = array();
        
        foreach($this->dbh->query($query) as $row) {
            $rows[] = $row;
        }
        
        return $rows;
    }
}