var currentDay = 1,
    doIt = function (days) {
    "use strict";
    console.log("var days: " + days);
    $.ajax({
        url : "http://localhost/ISWTCLIENT/week5/dataserver2.php",
        type : "POST",
        data: { day : days },
        success : function (data) {
            $("#numDays").text(currentDay);
            $("#weather").text(data[0]);
            $("#temp").text(data[1]);
            $("#rain").text(data[2]);
        }
    });
};

$("#prevDay").on("click", function () {
    "use strict";
    currentDay -= 1;
    doIt(currentDay);
});
$("#nextDay").on("click", function () {
    "use strict";
    currentDay += 1;
    doIt(currentDay);
});
