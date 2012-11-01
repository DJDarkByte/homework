'use strict';

/* Controllers */

function TableCtrl($scope) {   
    $scope.tables = [
        { name: '1', numSeats: 4, available: false, isCurrent: false, orders: ['cola', 'kratje bier'] },
        { name: '2', numSeats: 2, available: true, isCurrent: false, orders: [] },
        { name: '3', numSeats: 6, available: true, isCurrent: false, orders: [] },
        { name: '4a', numSeats: 3, available: true, isCurrent: false, orders: [] }
    ];
    
    $scope.message = '';
    
    $scope.setCurrent = function (newTable) {
        _.each($scope.tables, function(table) {
            if (newTable.name === table.name) {
                table.isCurrent = true;
            } else {
                table.isCurrent = false;
            }
        });
    };
    
    $scope.addOrder = function () {
        var table = _.find($scope.tables, function (table) {
            return table.isCurrent === true;
        });
        
        if (table === undefined) {
            alert('Please select a table');
        } else {
            table.orders.push($scope.order);
        }
    };
    
    $scope.getAvailableTables = function () {
        return _.filter($scope.tables, function (table) {
            return table.available === true;
        });
    };
    
    $scope.getNumTables = function () {
        return $scope.tables.length;
    };
    
    $scope.getNumAvailable = function () {
        return _.where($scope.tables, {available: true}).length;
    };
    
    $scope.bookTable = function () {
        var table = _.find($scope.tables, function (table) {
            return table.name === $scope.selected;
        });
        
        if (table === undefined) {
            alert("It seems like you have not selected a table.");
        } else {
            if (table.available) {
                $scope.message = "Thank you for booking!";
                table.available = false;
            } else {
                $scope.message = 'Table was already booked, we \'re sorry for the inconvenience.';
            }
        }
    };
}