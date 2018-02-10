// // Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
//
// // Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
//
// // Create a new list item when clicking on the "Add" button
// function newElement() {
//   var li = document.createElement("li");
//   var inputValue = document.getElementById("myInput").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//   document.getElementById("myInput").value = "";
//
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   li.appendChild(span);
//
//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// }

function addToList() {
  var inputValue = $('#myInput').val();
  if (inputValue == "") {
    alert("You must write something!");
  } else {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(inputValue));
    var span = document.createElement("span");
    span.appendChild(document.createTextNode("\u00D7"));
    span.className = 'close';
    li.appendChild(span);
    $("#myUL").append(li);
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

$(document).ready(setup);
