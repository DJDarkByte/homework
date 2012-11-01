function Day (name) {
    this.name = name;
    this.stages = [];
    this.dayID = null;
}

Day.prototype.persist = function () {
    $.ajax({
        type: 'POST',
        url: 'http://localhost/homework/week5/application/addday.php',
        data: {
            dayname : this.name
        },
        error: function () {
            throw {
                name: 'PersistDayToDatabaseError',
                message: 'Saving day to the database failed'
            }
        },
        success: function (data) {
            this.dayID = data;
        }
    });
    console.log(this.dayID);
    return this.dayID;
};