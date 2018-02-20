$(document).ready(function() {
    var oriText = "";
    var $MyList = $("#MyList");
    $("form").on("submit", function(event) {
        $.ajax({
            data: {
                InputData: $("#myInput").val(),
            },
            type: "POST",
            url: "/todo/create"
        })
        .done(function(data) {
            if (data.error) {
                alert("You must write something");
            } else {
                console.log(data.success);
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(data.success));
                var span = document.createElement("span");
                span.appendChild(document.createTextNode("\u00D7"));
                span.className = 'close';
                li.appendChild(span);

                $MyList.append(li);
                $("#myInput").val("");
            }
        });
        event.preventDefault();
    });



    $.ajax({
        type: "GET",
        url: "/todo/read"
    })
    .done(function(todo) {
        $.each(todo, function(index, item) { 
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(item));
                var span = document.createElement("span");
                span.appendChild(document.createTextNode("\u00D7"));
                span.className = 'close';
                li.appendChild(span);
                $MyList.append(li);
        });

    });

    $("#MyList").on("click", ".close", function() {
        var task = $(this).parent().html().slice(0,-28);
        console.log(task);
        $.ajax({
            data: task,
            contentType: "application/json; charset=utf-8",
            type: "DELETE",
            url: "/todo/delete"
        })
        .done(function(data) {
            $("#MyList").empty();
            $.each(data, function(index, item) { 
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(item));
                var span = document.createElement("span");
                span.appendChild(document.createTextNode("\u00D7"));
                span.className = 'close';
                li.appendChild(span);
                $MyList.append(li);
            });
        });
        event.preventDefault();
    });


    $("#MyList").on('click', 'li' , function() {
      if (oriText == "") {
        oriText = $(this).text().slice(0, -1);
        $(this).text("");
        $("<input id='newContent'type='text' style='width:50%;background:rgba(255,255,255,0.7);text-color:white;'>").appendTo(this).focus().val(oriText);
      }
    });
    $("#MyList").on('keypress', 'input', function (e) {
      if (e.keyCode == 13) {
        if ($("#newContent").val() == "") {
          li = oriText + "<span class='close'>×</span>";
        } else {
          var task = $("#newContent").val()
          li = task + "<span class='close'>×</span>";
          var url = "/todo/update";
          var settings = {type : "PUT",
                          data : {item : task, old : oriText},
                          success : function(response) {
                            console.log(response.success);
                          },
                          error : function(error) {
                            console.log(error);
                          }};
          $.ajax(url, settings);
        }
        $(this).parent().html(li);
        oriText = "";
      }
    });
    $("#MyList").on('focusout', 'li > input', function() {
      $(this).parent().html(oriText + "<span class='close'>×</span>");
      oriText = "";
    });









});