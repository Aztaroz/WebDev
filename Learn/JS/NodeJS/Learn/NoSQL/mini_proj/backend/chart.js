google.charts.load("current", {'packages': ["corechart"]});
google.charts.setOnLoadCallback(loadGraph);

function loadGraph() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:4596/sleepdata");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("connected");
            const objects = JSON.parse(this.responseText);

            for(let object of objects){
                if (object["Year"] == "2003"){
                    if(object["Type of Days"] == "All days"){
                        if(object["Age Group"] == "15 years and over"){
                            if(object["Sex"] == "Both"){
                                const test = object["Year"]
                                x = parseFloat(test)
                                x+= 10
                                console.log(x);
                                
                            }
                        }
                    }
                }
            }
        }
    }
}