//start value
var startVal = {
    searchFont: "",
    /* TypeSomething: "Champions", */
	TypeSomething: "Treasure",
    /* fontSize: "30px", */
	fontSize: "170%",
    listType: "list",
    loadIndex: 0,
    mode: "white",
    searching: false
}

// Display fontFamily ic console
$(document).on('click', '.sample-text', function() {
	var fontFamily = $(this).css('font-family');
	//document.getElementById("myBtn").innerText;
	//console.log(fontFamily)
	//console.log(fontFamily.replace(/\"/g, "")); 
	//console.log(fontFamily.replace(/['"]+/g, ''));	
	console.log(fontFamily.replace(/^"(.*)"$/, '$1'));
});


// google fonts api
fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD2XlgdSV2aMaFApwYwRZPGty_5PDSUaZA')
const fontsData = [];
const fontsCategoryData = [];
const APIKey = "AIzaSyA8j6SJmPPFHXEXswmlu9aoD6LYJA3z70s";
const apiUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key=" + APIKey;

fetch(apiUrl)
    .then(res => {
        return res.json();
    })
    .then(data => {
		//for (var i = 0; i < fonts.items.length; i++) {
        for (var i=0; i<data.items.length; i++){
            var font = data.items[i];
            var url = font.files.regular;
            if(!url) continue; //if url is 404
            newFont = new FontFace(font.family, "url(" + url + ")");
            document.fonts.add(newFont);
            fontsData.push(font.family);
			fontsCategoryData.push(font.category);
			
            if(i==20) {
                loadMore(fontsData.slice(startVal.loadIndex),fontsCategoryData.slice(startVal.loadIndex));
				//loadMore(fontsData.slice(startVal.loadIndex));
				startVal.loadIndex += 20;
            }
        }
    })
/*     .catch(error => {
        console.log("error");
    }) */

//font loader
function loadMore(data,categoryName) {
    for (var i=0; i<20; i++) {
        var fontfamily = data[i];
		var fontcategory = categoryName[i];
		
        displayFont(fontfamily,fontcategory);
		
    }
}

const fontArea = document.querySelector(".fonts");
function displayFont(name,categoryList) {
    var fontStyle = "style='font-family: " + name + ";'";
    var fontSizeAndStyle = "style='font-size: " + startVal.fontSize + "; font-family: " + name + ";'";
    //var codeBlock = "<div class='font-holder'>" + "<div class='font-placeHolder'>" + "<div class='sample-text' " + fontSizeAndStyle + ">" + name + "</div>" + "</div>" + "</div>";
	var codeBlock = "<div class='font-holder'>" + 
	"<div class='font-placeHolder'>" + 
	"<div class='sample-text' " + fontSizeAndStyle + ">" + startVal.TypeSomething + 
	"</div>" +

	"<h3 class='my-font-categories'>" + categoryList + "</h3>" +

	"<div class='sample-lbl-text'>" + 
	
	"<div class='vl'>" + "</div>" +
	
	"<h3 class='fontstyle-title' " + fontStyle + ">" + name + "</h3>" +
	
	"</div>" +	
	"</div>" + 
	"</div>";
	
    fontArea.insertAdjacentHTML("beforeend", codeBlock);
}


//scroll checking
var scrollDetection = function() {
    var mainContainer = document.querySelector("#main-container");
    var containerHeight = mainContainer.offsetHeight;
    var windowOffset = window.pageYOffset;
    var y = windowOffset + window.innerHeight;
    return (y>=containerHeight)
}



var scrollLoading = function() {
    window.addEventListener("scroll", function() {
        if(scrollDetection()) {
		
		loadMore(fontsData.slice(startVal.loadIndex),fontsCategoryData.slice(startVal.loadIndex));
		
        }
    })
}
scrollLoading();