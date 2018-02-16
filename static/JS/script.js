// function addToList() {
//   var inputValue = $('#myInput').val();
//   if (inputValue == "") {
//     alert("You must write something!");
//   } else {
//     var li = document.createElement("li");
//     li.appendChild(document.createTextNode(inputValue));
//     var span = document.createElement("span");
//     span.appendChild(document.createTextNode("\u00D7"));
//     span.className = 'close';
//     li.appendChild(span);
//     $("#myUL").append(li);
//     $('#myInput').val("");
//   }
// }

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

function saveData() {
  var newItem = $('#myInput').val()
  if (newItem == "") {
    alert("You must write something!");
  } else {
    $.ajax({
      url: '/todo/create',
      type: 'POST',
      data: $('form').serialize(),
      success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
    });
    $('#myInput').val("");
  }
}

function setup() {
  $('#add').click(saveData);
  $('#myInput').keypress(function(e){
      if(e.keyCode == 13){
        e.preventDefault();
        saveData();
      }
  });
  checkOff();
  removeFromList();
}

$(document).ready(setup);
