var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function() {
    var ourRequest = new XMLHttpRequest();
    var requestURL = 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json';
    console.log(requestURL)
    ourRequest.open('GET', requestURL);
    ourRequest.onload = function() {
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);           
        } else {
            console.log("We connected to the server, but it returned an error.");
        }

    }
    
    ourRequest.onerror = function() {
        console.log("Connection error");
    }
    
    ourRequest.send();
    pageCounter++;
    if (pageCounter > 3) {
        btn.classList.add("hide-me");
    }
});

function renderHTML (data) {
    var htmlString = "";
    
    // loop through array of pet objects
    for (var i=0; i < data.length; ++i) {


/* FOOD - Likes */

        var likesString = "";
        var dislikesString = "";

        likesString += "<ul>";
        for (ii = 0; ii < data[i].foods.likes.length; ++ii) {
            likesString += "    <li>" + data[i].foods.likes[ii] + "</li>";
        }
        likesString += "</ul>";

/* FOOD - Dislikes */

        dislikesString += "<ul>";
        for (ii = 0; ii < data[i].foods.dislikes.length; ++ii) {
            dislikesString += "    <li>" + data[i].foods.dislikes[ii] + "</li>";
        }
        dislikesString += "</ul>";

        
htmlString += "<section class='animal_profile'>";
        
/* NAME */
        
htmlString += "    <h3>" + data[i].name + "</h3>";
htmlString += "    <table id='tbl_" + data[i].name + "'>";
        
/* SPECIES */

htmlString += "        <tr>";
htmlString += "            <td><h4>Species:</h4></td>";
htmlString += "            <td>" + data[i].species + "</td>";
htmlString += "        </tr>";        
htmlString += "        <tr>";
htmlString += "            <td colspan='2'><h4>Foods:</h4></td>";
htmlString += "        </tr>";
htmlString += "        <tr>";
htmlString += "            <td><h5>Likes</h5></td>";
htmlString += "            <td><h5>Dislikes</h5></td>";
htmlString += "        </tr>";
htmlString += "        <tr>";
htmlString += "            <td>" + likesString + "</td>";        
htmlString += "            <td>" + dislikesString + "</td>";        
htmlString += "        </tr>";
htmlString += "    </table>";
htmlString += "</section>";
        
        
    }
    
    animalContainer.insertAdjacentHTML('beforeend', htmlString);
}
