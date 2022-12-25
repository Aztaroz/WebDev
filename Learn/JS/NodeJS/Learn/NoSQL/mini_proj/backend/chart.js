google.charts.load("current", { 'packages': ["corechart"] });
google.charts.load('current', { 'packages': ['bar'] });
google.charts.load('current', { 'packages': ['line'] });
google.charts.setOnLoadCallback(loadSort);

function loadSort() {
    const xhttp = new XMLHttpRequest();
    // var All = '<option selected>All</option>'
    var Year_option = ''
    var TOD_option = ''
    var AG_option = ''
    var Sex_option = ''

    var year = []
    var TOD = []
    // var AG = []
    var Sex = []

    xhttp.open("GET", "http://localhost:4596/sleepdata");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Call loadSort");
            const objects = JSON.parse(this.responseText);

            for (let object of objects) {
                year.push(parseInt(object["Year"]))
                TOD.push(object["Type of Days"])
                // AG.push(object["Age Group"])
                Sex.push(object["Sex"])
            }

            var uniqueYear_Arr = new Set(year)
            var uniqueTOD_Arr = new Set(TOD)
            // var uniqueAG_Arr = new Set(AG)
            var uniqueSex_Arr = new Set(Sex)

            var year_Array = [...uniqueYear_Arr]
            var TOD_Array = [...uniqueTOD_Arr]
            // var AG_Array = [...uniqueAG_Arr]
            var Sex_Array = [...uniqueSex_Arr]

            AG_option += '<option selected>All</option>'

            for (var x of year_Array) {
                Year_option += `<option  value='${x}'>` + x + "</option>";
            }
            for (var x of TOD_Array) {
                TOD_option += `<option  value='${x}'>` + x + "</option>";
            }
            // for (var x of AG_Array) {
            //     AG_option += `<option  value='${x}'>` + x + "</option>";
            // }
            for (var x of Sex_Array) {
                Sex_option += `<option  value='${x}'>` + x + "</option>";
            }

            document.getElementById("inputYear").innerHTML = Year_option;
            document.getElementById("inputTOD").innerHTML = TOD_option;
            // document.getElementById("inputAG").innerHTML = AG_option;
            document.getElementById("inputSex").innerHTML = Sex_option;

            drawChart()
        }
    }
}

function drawChart() {
    var year = document.getElementById("inputYear").value
    var tod = document.getElementById("inputTOD").value
    var sex = document.getElementById("inputSex").value
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:4596/sleepdata");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            console.log("Call drawChart");
            // 15 to 24 years
            // 25 to 34 years
            // 35 to 44 years
            // 45 to 54 years
            // 55 to 64 years
            // 65 years and over
            for (object of objects) {
                if (object['Year'] == year) {
                    if (object['Type of Days'] == tod) {
                        if (object['Sex'] == sex) {
                            switch (object['Age Group']) {
                                case "15 to 24 years":
                                    var a = parseFloat(object['Avg hrs per day sleeping'])
                                    break;
                                case "25 to 34 years":
                                    var b = parseFloat(object['Avg hrs per day sleeping'])
                                    break;
                                case "35 to 44 years":
                                    var c = parseFloat(object['Avg hrs per day sleeping'])
                                    break;
                                case "45 to 54 years":
                                    var d = parseFloat(object['Avg hrs per day sleeping'])
                                    break;
                                case "55 to 64 years":
                                    var e = parseFloat(object['Avg hrs per day sleeping'])
                                    break;
                                case "65 years and over":
                                    var f = parseFloat(object['Avg hrs per day sleeping'])
                                    break;
                                default:
                                    console.log("Error");
                                    break;
                            }
                            var data = google.visualization.arrayToDataTable([
                                ["Year", "Average hours per day sleeping", { role: "style" }],
                                ["15 to 24 years", a, "#9102F7"],
                                ["25 to 34 years", b, "#9C4EDC"],
                                ["35 to 44 years", c, "#7A2BBF"],
                                ["45 to 54 years", d, "color: #5A199B"],
                                ["55 to 64 years", e, "color: #3C0B6C"],
                                ["65 years and over", f, "color: #240147"]
                            ]);

                            var view = new google.visualization.DataView(data);
                            view.setColumns([0, 1,
                                {
                                    calc: "stringify",
                                    sourceColumn: 1,
                                    type: "string",
                                    role: "annotation"
                                },
                                2]);

                            var options = {
                                title: `Sleep Data in year : ${year}`,
                                width: 1300,
                                height: 660,
                                bar: { groupWidth: "95%" },
                                legend: { position: "none" },
                            }
                            var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
                            chart.draw(view, options);

                        }
                    }
                }
            }
            // var avg = sum / count
            // console.log(avg);



            // var data = google.visualization.arrayToDataTable([
            //     ['Year', '15 to 24 years', '25 to 34 years', '35 to 44 years', '45 to 54 years', '55 to 64 years', '65 years and over'],
            //     ['2003', a, b, c, d, e, f],
            // ]);

            // var options = {
            //     chart: {
            //         title: 'Company Performance',
            //         subtitle: 'Sales, Expenses, and Profit: 2014-2017',
            //     }
            // };

            // var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

            // chart.draw(data, google.charts.Bar.convertOptions(options));





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

// function loadQueryChart() {

//     const xhttp = new XMLHttpRequest();
//     xhttp.open("GET", "http://localhost:4596/sleepdata");
//     xhttp.send();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("Call loadQueryChart");
//             const objects = JSON.parse(this.responseText);
//             console.log("Hello From Query Chart");
//         }
//     }
// }

