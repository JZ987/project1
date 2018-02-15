function addToList() {
  var inputValue = $('#myInput').val();
  if (inputValue == "") {
    alert("You must write something!");
  } else {
      $.ajax({
        url: '/todo/create',
        type: 'POST',
        data: $('form').serialize(),
        success: function(response){
          console.log(response);
        },s
        error: function(error){
          console.log(error);
        }
      });
    $('#myInput').val("");
  }
}


function checkOff() {
  $('#myUL').click(function(e) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle("checked");
    }
  });
}

function removeFromList() {
  $("#myUL").click(function(e) {
    if (e.target.tagName === 'SPAN') {
      e.target.parentElement.remove();
    }
  })
}

function setup() {
  $('#add').click(addToList);
  $('#myInput').keypress(function(e){
      if(e.keyCode == 13){
        e.preventDefault();
        addToList();
      }
  });
  checkOff();
  removeFromList();
}

function getData() {
  $.ajax({
    url: '/todo/read',
    type: "GET",
    success: function(response){
      $('#myUL').empty();
      for (var i = 0; i < response.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(response[i]));
        var span = document.createElement("span");
        span.appendChild(document.createTextNode("\u00D7"));
        span.className = 'close';
        li.appendChild(span);
        $("#myUL").append(li);
      }
    }
  });
}

$(document).ready(setup);
