$(document).ready(function go() {
	
	var API_KEY = "Z8dEN7kW1ecleJDyNfL6IxfZKOQaiRaH";
	var cartoons = [
		"The Simpsons",
		"Family Guy",
		"South Park",
		"The Critic",
		"Duckman",
		"Futurama",
		"Ren and Stimpy"
	];

	function addButton(button, limit = 10){
		var btn = new $("<button>").attr("data-name", button).text(button).addClass("btn-cartoon btn btn-primary");
		btn.attr("data-limit", limit);
		$("#buttons").append(btn);
	}

	function getGifs(event) {
		event.preventDefault();
		var cartoon = this.dataset.name;
		var limit = this.dataset.limit;
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+cartoon+"&api_key="+API_KEY+"&limit="+limit;

		$.ajax({
			url: queryURL,
			method: "GET",
		}).done(function gotCartoon(response){
			console.log(response);
			$("#gifs").empty();
			if (response.data.length !== 0) {
				response.data.forEach(addGif);
			} else {
				$("#gifs").append("<div class='col-auto'><h2>   No Gifs Found</h2></div>");
			}
		});
	}

	function addGif(element) {
		var gif = $("<div>").addClass("gif-box col-auto");
		var img = $("<img>").addClass("gif-img");
		var text = $("<div>").addClass("gif-text");
		var anim = element.images.original.url;
		var still = element.images.original_still.url;

		gif.css("width", parseInt(element.images.original.width) + 12);

		img.attr("src", still)
		img.data("still", still);
		img.data("anim", anim);
		img.data("animating", false);

		text.append("<h3>Rating: "+element.rating+"</h3>");
		text.append("<h6>Source: <a href="+element.source+" target='_blank'>"+element.source+"</a></h6>");
		text.append("<h6>ID: "+element.id+"</h6>");

		gif.append(img).append(text);
		$("#gifs").append(gif);
	}

	function switchImage(event) {
		if($(this).data().animating){
			$(this).attr("src", $(this).data().still);
			$(this).data().animating = false;
		} else {
			$(this).attr("src", $(this).data().anim);
			$(this).data().animating = true;
		}
	}

	function newButton(event) {
		event.preventDefault();
		var btnName = event.currentTarget[0].value.trim();

		if (!buttonMade(btnName, cartoons) && btnName !== "") {
			cartoons.push(btnName);
			addButton(btnName);
		}
		event.currentTarget[0].value = "";
	}

	function buttonMade(name, list) {
		for (var i = 0; i < list.length; i++) {
			if (name.toLowerCase() === list[i].toLowerCase()) {
				return true;
			}
		}
		return false;
	}

	function initialize() {
		cartoons.forEach(function fillButtons(element, index) {
			addButton(element)
		});
	}

	initialize();

	$("#addForm").on("submit", newButton);

	$(document).on("click", ".btn-cartoon", getGifs);
	$(document).on("click", ".gif-img", switchImage);
	
});