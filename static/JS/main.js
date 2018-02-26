$(document).ready(function() {
    var oriText = "";
    var keys = 0;
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
                var li = $("<li>" + data.success + "</li>");
                var span = $("<span class='close'>×</span>");
                var key = $("<p style='display:none;'>" + data.key + "</p>");
                var duplicate = $("<p style='display:none;'>" + data.success + "</p>");
                li.append(duplicate);
                li.append(key);
                $MyList.append(li.append(span));
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
                var li = $("<li>" + item[1] + "</li>");
                var duplicate = $("<p style='display:none;'>" + item[1] + "</p>");
                var span = $("<span class='close'>×</span>");
                var key = $("<p style='display:none;'>" + item[0] + "</p>");
                li.append(duplicate);
                li.append(key);
                $MyList.append(li.append(span));
        });
    });



    $("#MyList").on('click', '.close', function () {
      var task = $(this).parent().children();
      var url = "/todo/delete";
      var settings = {type : "DELETE",
                      data : {data : task[0].innerHTML, key:task[1].innerHTML,},
                      success : function(response) {
                        oriText = "";
                        console.log(response.success);
                      },
                      error : function(error) {
                        console.log(error);
                      }};
      $.ajax(url, settings);
      $(this).parent().remove();
    });





    $("#MyList").on('click', 'li' , function() {
      if (oriText == "") {
        var task = $(this).children();
        oriText = task[0].innerHTML;
        keys = task[1].innerHTML;
        $(this).text("");
        $("<input id='newContent'type='text' style='background:transparent;color:white;'>").appendTo(this).focus().val(oriText);
      }
    });
    $("#MyList").on('keypress', 'input', function (e) {
      if (e.keyCode == 13) {
        if ($("#newContent").val() == "") {
          $(this).parent().html(oriText + "<p style='display:none;'>" + oriText + "</p>" +"<p style='display:none;'>" + keys + "</p>" + "<span class='close'>×</span>");
        } else {
          var task = $("#newContent").val()
          $(this).parent().html(task + "<p style='display:none;'>" + task + "</p>" +"<p style='display:none;'>" + keys + "</p>" + "<span class='close'>×</span>");
          var url = "/todo/update";
          var settings = {type : "PUT",
                          data : {item : task, old : oriText, key : keys},
                          success : function(response) {
                            console.log(response.success);
                          },
                          error : function(error) {
                            console.log(error);
                          }};
          $.ajax(url, settings);
        }
        oriText = "";
      }
    });
    $("#MyList").on('focusout', 'li > input', function() {
      $(this).parent().html(oriText +"<p style='display:none;'>" + oriText + "</p>" +"<p style='display:none;'>" + keys + "</p>"+ "<span class='close'>×</span>");
      oriText = "";
  });


});