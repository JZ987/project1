var oriText = "";

function saveData() {
  var newItem = $('#myInput').val();
  if (newItem == "") {
    alert("You must write something!");
  } else {
    var url = "/todo/create";
    var settings = {type : "POST",
                    data : {"newItem" : newItem},
                    success: function(response) {
                      var li = $("<li>" + newItem + "</li>");
                      var span = $("<span class='close'>×</span>");
                      $('#myUL').append(li.append(span));
                    },
                    error: function(error) {
                      console.log(error);
                    }};
    $.ajax(url, settings);
    $('#myInput').val("");
  }
}

function deleteItem() {
  $("#myUL").on('click', 'span', function () {
    var task = $(this).parent().text().slice(0, -1);
    var url = "/todo/delete";
    var settings = {type : "DELETE",
                    data : {item : task},
                    success : function(response) {
                      oriText = "";
                      console.log(response.result);
                    },
                    error : function(error) {
                      console.log(error);
                    }};
    $.ajax(url, settings);
    $(this).parent().remove();
  });
}

function getList() {
  var url = "/todo/read";
  var settings = {type : "GET",
                  success : function(response) {
                    for(var i = 0; i < response.data.length; i++) {
                      var li = $("<li>" + response.data[i] + "</li>");
                      var span = $("<span class='close'>×</span>");
                      $('#myUL').append(li.append(span));
                    }
                  },
                  error : function(error) {
                    console.log(error);
                  }};
  $.ajax(url, settings);
}

function modifyItem() {
  $("#myUL").on('click', 'li' , function() {
    if (oriText == "") {
      oriText = $(this).text().slice(0, -1);
      $(this).text("");
      $("<input id='newContent'type='text'>").appendTo(this).focus().val(oriText);
    }
  });
  $("#myUL").on('keypress', 'input', function (e) {
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
                          console.log(response.result);
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
  $("#myUL").on('focusout', 'li > input', function() {
    $(this).parent().html(oriText + "<span class='close'>×</span>");
    oriText = "";
  });
}

function setup() {
  getList();
  $('#add').click(saveData);
  $('#myInput').keypress(function(e){
      if(e.keyCode == 13){
        e.preventDefault();
        saveData();
      }
  });
  deleteItem();
  modifyItem();
}

$(document).ready(setup);
