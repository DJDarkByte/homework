var i,
    updateList = function (data) {
        'use strict';
        data = JSON.parse(data);
        $("ol").empty();
        for(i = 0; i < data.results; i += 1) {
            var li = $("<li />");
            li.text(data.results[i].text);
            li.appendTo($("ol"));
        }
        return;
    };

$("button").on("click", function () {
    $.ajax({
        url : "http://search.twitter.com/search.json?q=hbo&rpp=5&include_entities=true&result_type=mixed&callback=updateList",
        crossDomain : true,
        error : function (msg) {
            alert("error: " + msg);
            console.log(msg);
        },
        success : function (data) {
            updateList();
        }
    });
});