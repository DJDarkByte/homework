var i,
    updateList = function (data) {
        'use strict';
        $("ol").empty();
        console.log(data);
        for (i = 0; i < data.results.length; i += 1) {
            var li = $("<li />");
            li.text(data.results[i].text);
            li.appendTo($("ol"));
        }
        return;
    };

$("button").on("click", function () {
    $.ajax({
        url : "http://search.twitter.com/search.json?q=windesheim&rpp=5&include_entities=true&result_type=mixed",
        type : "GET",
        dataType : "jsonp",
        success : function (data) {
            updateList(data);
        },
        error : function (msg) {
            alert("error: " + msg);
        }
    });
});