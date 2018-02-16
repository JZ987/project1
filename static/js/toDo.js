$(document).ready(function() {

	$("form").on("submit", function(event) {
		$.ajax({
			data: {
				toDo: $("#inputBox").val(),
			},
			type: "POST",
			url: "/todo/create"
		})
		.done(function(data) {

			if (data.error) {
				$alert("You must write something");
			} else {
				$("#toDoList").append("<li>" + data.toDo + "</li>");
			}

		});
		event.preventDefault();
	});
});