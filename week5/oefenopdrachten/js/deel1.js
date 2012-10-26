$(document).keypress(function (e) {
    if (e.which === 13) {
        var req = new XMLHttpRequest(),
            input = $("#code").val();
        req.open("GET", "http://localhost/ISWTCLIENT/week5/dataserver.php?code=" + input + "", false);
        req.send();

        if (req.status === 200) {
            $("#name").text(req.responseText);  
        }
    }
});