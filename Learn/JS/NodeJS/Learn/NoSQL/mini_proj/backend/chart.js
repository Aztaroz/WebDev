// google.charts.load("current", { 'packages': ["corechart"] });
google.charts.load('current', { 'packages': ['bar'] });
google.charts.setOnLoadCallback(loadSort);

function loadSort() {
    const xhttp = new XMLHttpRequest();
    var All = '<option selected>All</option>'
    var Year_option = ''
    var TOD_option = ''
    var AG_option = ''
    var Sex_option = ''

    var year = []
    var TOD = []
    var AG = []
    var Sex = []

    xhttp.open("GET", "http://localhost:4596/sleepdata");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("connected");
            const objects = JSON.parse(this.responseText);

            for (let object of objects) {
                year.push(parseInt(object["Year"]))
                TOD.push(object["Type of Days"])
                AG.push(object["Age Group"])
                Sex.push(object["Sex"])
            }

            var uniqueYear_Arr = new Set(year)
            var uniqueTOD_Arr = new Set(TOD)
            var uniqueAG_Arr = new Set(AG)
            var uniqueSex_Arr = new Set(Sex)

            var year_Array = [...uniqueYear_Arr]
            var TOD_Array = [...uniqueTOD_Arr]
            var AG_Array = [...uniqueAG_Arr]
            var Sex_Array = [...uniqueSex_Arr]

            AG_option += '<option selected>All</option>'

            for (var x of year_Array) {
                Year_option += `<option  value='${x}'>` + x + "</option>";
            }
            for (var x of TOD_Array) {
                TOD_option += `<option  value='${x}'>` + x + "</option>";
            }
            for (var x of AG_Array) {
                AG_option += `<option  value='${x}'>` + x + "</option>";
            }
            for (var x of Sex_Array) {
                Sex_option += `<option  value='${x}'>` + x + "</option>";
            }

            document.getElementById("inputYear").innerHTML = Year_option;
            document.getElementById("inputTOD").innerHTML = TOD_option;
            document.getElementById("inputAG").innerHTML = AG_option;
            document.getElementById("inputSex").innerHTML = Sex_option;




            drawChart()
        }
    }
}

function drawChart() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:4596/sleepdata");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            var count = 1
            var sum = 0
            // 15 to 24 years
            // 25 to 34 years
            // 35 to 44 years
            // 45 to 54 years
            // 55 to 64 years
            // 65 years and over
            for (object of objects) {
                if (object['Year'] == "2003") {
                    if (object['Type of Days'] == 'All days') {
                        if (object['Sex'] == 'Both') {
                            

                            switch (object['Age Group']) {
                                case "15 to 24 years":
                                    console.log(object['Avg hrs per day sleeping'])
                                    break;
                            
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
            var avg = sum / count
            console.log(avg);


            var data = google.visualization.arrayToDataTable([
                ['Year', '15 to 24 years', '25 to 34 years', '35 to 44 years','45 to 54 years','55 to 64 years','65 years and over'],
                ['2003', 1000, 400, 200, 300, 700, 900],
            ]);

            var options = {
                chart: {
                    title: 'Company Performance',
                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                }
            };

            var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

            chart.draw(data, google.charts.Bar.convertOptions(options));

            // var data = google.visualization.arrayToDataTable([
            //     ['Year', 'Sales', 'Expenses', 'Profit'],
            //     ['2014', 1000, 400, 200],
            //     ['2015', 1170, 460, 250],
            //     ['2016', 660, 1120, 300],
            //     ['2017', 1030, 540, 350]
            //   ]);

            //   var options = {
            //     chart: {
            //       title: 'Company Performance',
            //       subtitle: 'Sales, Expenses, and Profit: 2014-2017',
            //     },
            //     bars: 'horizontal' // Required for Material Bar Charts.
            //   };

            //   var chart = new google.charts.Bar(document.getElementById('barchart_material'));

            //   chart.draw(data, google.charts.Bar.convertOptions(options));




        }

    }
}

function loadGraph() {
    var year = document.getElementById("inputYear").value
    var tod = document.getElementById("inputTOD").value
    var ag = document.getElementById("inputAG").value
    var sex = document.getElementById("inputSex").value

    console.log(year)
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:4596/sleepdata");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("connected");
            const objects = JSON.parse(this.responseText);

            for (let object of objects) {
                if (object["Year"] == year) {

                    if (object["Type of Days"] == tod) {
                        if (object["Age Group"] == ag) {
                            if (object["Sex"] == sex) {
                            }
                        }
                    }
                }
            }
        }
    }
}

