<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of controller
 *
 * @author Veneman
 */
class controller {
    public $method;
    
    function __construct() {
        $this->method = $_GET['method'];
        
        if($this->method != "" && isset($this->method)) {
            switch($this->method) {
                case 'insertDay':
                    $this->insertDay();
                    break;
            }
        } else {
            exit('GET not set');
        }
    }
    
    function insertDay() {
        print('insertDay() called');
        if(!isset($_POST['dayname'])) {
            exit('No POST set');
        } else {
            print('hello');
        }
    }
}

?>
