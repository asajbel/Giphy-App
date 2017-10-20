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

function addButton(button){
	var btn = new $("<button>").attr("data-name", button).text(button).addClass("btn-cartoon btn btn-primary");
	$("#buttons").append(btn);
}

function getGifs(event) {
	event.preventDefault();
	var cartoon = this.dataset.name;
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+cartoon+"&api_key="+API_KEY;
	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function gotCartoon(response){
		console.log(response);
		$("#gifs").empty();
		response.data.forEach(addGif);
	});
}

function addGif(element) {
	var gif = new $("<div>").addClass("gif-box clearfix");
	var img = new $("<img>").addClass("gif-img");
	var text = new $("<div>").addClass("gif-text");
	var anim = element.images.original.url;
	var still = element.images.original_still.url;
	img.attr("src", still)
	img.data("still", still);
	img.data("anim", anim);
	img.data("animating", false);
	text.append("<h3>Rating: "+element.rating+"</h3>");
	text.append("<h6>Source: "+element.source+"</h6>");
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
	var btnName = event.currentTarget[0].value;
	if ($.inArray(btnName, cartoons) === -1) {
		cartoons.push(btnName);
		addButton(btnName);
	}
	event.currentTarget[0].value = "";
}

function initialize() {
	cartoons.forEach(addButton);
}

$(document).ready(function go() {
	
	initialize();

	$("#addForm").on("submit", newButton);

	$(document).on("click", ".btn-cartoon", getGifs);
	$(document).on("click", ".gif-img", switchImage);
	
});