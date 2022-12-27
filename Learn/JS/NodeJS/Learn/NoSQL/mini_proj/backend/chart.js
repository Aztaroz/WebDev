google.charts.load("current", { 'packages': ["corechart"] });
google.charts.load('current', { 'packages': ['bar'] });
google.charts.load('current', { 'packages': ['line'] });
google.charts.setOnLoadCallback(loadSort);

function loadSort() {
    const xhttp = new XMLHttpRequest();
    // var All = '<option selected>All</option>'
    var Year_option = ''
    var TOD_option = ''
    // var AG_option = ''
    var Sex_option = ''

    var year = []
    var TOD = []
    // var AG = []
    var Sex = []

    var sumA = 0
    var sumB = 0
    var sumC = 0
    var sumD = 0
    var sumE = 0
    var sumF = 0

    var sumASE = 0
    var sumBSE = 0
    var sumCSE = 0
    var sumDSE = 0
    var sumESE = 0
    var sumFSE = 0

    var countA = 0
    var countB = 0
    var countC = 0
    var countD = 0
    var countE = 0
    var countF = 0

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

            Year_option += '<option selected disabled value="null">Please Select Year</option>'
            TOD_option += '<option selected disabled value="null">Please Select Type of Days</option>'
            Sex_option += '<option selected disabled value="null">Please Select Sex</option>'


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


            console.log("Called data_AllTime");
            for (var y of year_Array) {
                for (let object of objects) {
                    if (object['Year'] == y) {
                        if (object['Type of Days'] == "All days") {
                            if (object['Sex'] == "Both") {
                                switch (object['Age Group']) {
                                    case "15 to 24 years":
                                        var a = parseFloat(object['Avg hrs per day sleeping'])
                                        var ase = parseFloat(object['Standard Error'])

                                        sumASE = sumASE + ase
                                        sumA = sumA + a
                                        countA += 1
                                        
                                        break;
                                    case "25 to 34 years":
                                        var b = parseFloat(object['Avg hrs per day sleeping'])
                                        var bse = parseFloat(object['Standard Error'])

                                        sumBSE = sumBSE + bse
                                        sumB = sumB + b
                                        countB += 1
                                        break;
                                    case "35 to 44 years":
                                        var c = parseFloat(object['Avg hrs per day sleeping'])
                                        var cse = parseFloat(object['Standard Error'])

                                        sumCSE = sumCSE + cse
                                        sumC = sumC + c
                                        countC += 1
                                        break;
                                    case "45 to 54 years":
                                        var d = parseFloat(object['Avg hrs per day sleeping'])
                                        var dse = parseFloat(object['Standard Error'])

                                        sumDSE = sumDSE + dse
                                        sumD = sumD + d
                                        countD += 1
                                        break;
                                    case "55 to 64 years":
                                        var e = parseFloat(object['Avg hrs per day sleeping'])
                                        var ese = parseFloat(object['Standard Error'])

                                        sumESE = sumESE + ese
                                        sumE = sumE + e
                                        countE += 1
                                        break;
                                    case "65 years and over":
                                        var f = parseFloat(object['Avg hrs per day sleeping'])
                                        var fse = parseFloat(object['Standard Error'])

                                        sumFSE = sumFSE + fse
                                        sumF = sumF + f
                                        countF += 1
                                        break;
                                    default:
                                        console.log("Error");
                                        break;
                                }
                            }
                        }
                    }
                }
            }

            var avgA = sumA / countA
            var avgB = sumB / countB
            var avgC = sumC / countC
            var avgD = sumD / countD
            var avgE = sumE / countE
            var avgF = sumF / countF

            var avgASE = sumASE / countA
            var avgBSE = sumBSE / countB
            var avgCSE = sumCSE / countC
            var avgDSE = sumDSE / countD
            var avgESE = sumESE / countE
            var avgFSE = sumFSE / countF

            avgA = parseFloat(avgA.toFixed(2))
            avgB = parseFloat(avgB.toFixed(2))
            avgC = parseFloat(avgC.toFixed(2))
            avgD = parseFloat(avgD.toFixed(2))
            avgE = parseFloat(avgE.toFixed(2))
            avgF = parseFloat(avgF.toFixed(2))

            var data = google.visualization.arrayToDataTable([
                ["Year", "Average hours per day sleeping", { role: "style" }],
                [`15 to 24 years\nStandard Error : ${avgASE.toFixed(2)}`, avgA, "#9102F7"],
                [`25 to 34 years\nStandard Error : ${avgBSE.toFixed(2)}`, avgB, "#9C4EDC"],
                [`35 to 44 years\nStandard Error : ${avgCSE.toFixed(2)}`, avgC, "#7A2BBF"],
                [`45 to 54 years\nStandard Error : ${avgDSE.toFixed(2)}`, avgD, "color: #5A199B"],
                [`55 to 64 years\nStandard Error : ${avgESE.toFixed(2)}`, avgE, "color: #3C0B6C"],
                [`65 years and over\nStandard Error : ${avgFSE.toFixed(2)}`, avgF, "color: #240147"]
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
                title: `Sleep Data by age group in year : All Time`,
                width: 1300,
                height: 660,
                bar: { groupWidth: "95%" },
                legend: { position: "none" },
            }
            var chart = new google.visualization.BarChart(document.getElementById("barchart_alltime_values"));
            chart.draw(view, options);


        }
    }
}

function drawChart() {

    // var yearArray = []
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

            // for (let object of objects) {
            //     yearArray.push(parseInt(object["Year"]))
            // }
            // var uniqueYear_Arr = new Set(yearArray)
            // var year_Array_Sort = [...uniqueYear_Arr]

            // 15 to 24 years
            // 25 to 34 years
            // 35 to 44 years
            // 45 to 54 years
            // 55 to 64 years
            // 65 years and over
            if (year == "null" || tod == "null" || sex == "null") {
                console.log("error");
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Select Option Required',
                })
            } else {
                for (object of objects) {
                    if (object['Year'] == year) {
                        if (object['Type of Days'] == tod) {
                            if (object['Sex'] == sex) {
                                switch (object['Age Group']) {
                                    case "15 to 24 years":
                                        var a = parseFloat(object['Avg hrs per day sleeping'])
                                        var ase = parseFloat(object['Standard Error'])
                                        break;
                                    case "25 to 34 years":
                                        var b = parseFloat(object['Avg hrs per day sleeping'])
                                        var bse = parseFloat(object['Standard Error'])
                                        break;
                                    case "35 to 44 years":
                                        var c = parseFloat(object['Avg hrs per day sleeping'])
                                        var cse = parseFloat(object['Standard Error'])
                                        break;
                                    case "45 to 54 years":
                                        var d = parseFloat(object['Avg hrs per day sleeping'])
                                        var dse = parseFloat(object['Standard Error'])
                                        break;
                                    case "55 to 64 years":
                                        var e = parseFloat(object['Avg hrs per day sleeping'])
                                        var ese = parseFloat(object['Standard Error'])
                                        break;
                                    case "65 years and over":
                                        var f = parseFloat(object['Avg hrs per day sleeping'])
                                        var fse = parseFloat(object['Standard Error'])
                                        break;
                                    default:
                                        console.log("Error");
                                        break;
                                }
                            }
                        }
                    }
                }
                var data = google.visualization.arrayToDataTable([
                    ["Year", "Average hours per day sleeping", { role: "style" }],
                    [`15 to 24 years\nStandard Error : ${ase.toFixed(2)}`, a, "#9102F7"],
                    [`25 to 34 years\nStandard Error : ${bse.toFixed(2)} `, b, "#9C4EDC"],
                    [`35 to 44 years\nStandard Error : ${cse.toFixed(2)}`, c, "#7A2BBF"],
                    [`45 to 54 years\nStandard Error : ${dse.toFixed(2)}`, d, "color: #5A199B"],
                    [`55 to 64 years\nStandard Error : ${ese.toFixed(2)}`, e, "color: #3C0B6C"],
                    [`65 years and over\nStandard Error : ${fse.toFixed(2)}`, f, "color: #240147"]
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
                    title: `Sleep Data by age group in year : ${year}`,
                    width: 1300,
                    height: 660,
                    bar: { groupWidth: "95%" },
                    legend: { position: "none" },

                }
                var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
                chart.draw(view, options);

                Swal.fire(
                    'Done!',
                    'Chart has been loaded',
                    'success'
                )
            }
        }




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

