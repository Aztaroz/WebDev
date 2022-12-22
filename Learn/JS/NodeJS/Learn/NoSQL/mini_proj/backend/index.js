//done
function loadTable() {
  $.ajax({
    url: "http://localhost:4596/sleepdata",
    type: 'GET',
    success: function (objects) {
      var trHTML = '';
      var num = 1;
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + num + "</td>";
        trHTML += "<td>" + object["Year"] + "</td>";
        trHTML += "<td>" + object["Avg hrs per day sleeping"] + "</td>";
        trHTML += "<td>" + object["Type of Days"] + "</td>";
        trHTML += "<td>" + object["Age Group"] + "</td>";
        trHTML += "<td>" + object["Sex"] + "</td>";
        // trHTML += "<td>" + object[""] + "</td>";
        // trHTML += "<td>" + object[""] + "</td>";
        // trHTML += "<td>" + object[""] + "</td>";
        trHTML += "<td>";
        trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showStudentUpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
        trHTML += '<a type="button" class="btn btn-outline-danger" onclick="studentDelete(\'' + object["_id"] + '\')"><i class="fas fa-trash"></i></a>';
        trHTML += "<tr>";

        num++;
      }

      document.getElementById("mytable").innerHTML = trHTML;

      // loadGraph()
    }
  });
}

// function loadTable() {
//   const xhttp = new XMLHttpRequest();
//   xhttp.open("GET", "http://localhost:3000/slist");
//   xhttp.send();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       var trHTML = "";
//       var num = 1;
//       const objects = JSON.parse(this.responseText);
//       console.log(objects);

//       for (let object of objects) {
//         trHTML += "<tr>";
//         trHTML += "<td>" + num + "</td>";
//         trHTML += "<td>" + object["StudentID"] + "</td>";
//         trHTML += "<td>" + object["Title"] + "</td>";
//         trHTML += "<td>" + object["Name"] + "</td>";
//         trHTML += "<td>" + object["Surname"] + "</td>";
//         trHTML += "<td>" + object["Project"] + "</td>";
//         trHTML += "<td>" + object["Savings"] + "</td>";
//         trHTML += "<td>" + object["GPA"] + "</td>";
//         trHTML += "<td>" + object["Salary"] + "</td>";
//         trHTML += "<td>";
//         trHTML +='<a type="button" class="btn btn-outline-secondary" onclick="showStudentUpdateBox(\'' +object["_id"] +'\')"><i class="fas fa-edit"></i></a>';
//         trHTML +='<a type="button" class="btn btn-outline-danger" onclick="studentDelete(\'' +object["_id"] +'\')"><i class="fas fa-trash"></i></a>';
//         trHTML += "<tr>";

//         num++;
//       }
//       document.getElementById("mytable").innerHTML = trHTML;

//       loadGraph();
//     }
//   };
// }

//done
function loadQueryTable() {
  document.getElementById("mytable").innerHTML = "<tr><th scope=\"row\" colspan=\"5\">Loading...</th></tr>";
  const searchText = document.getElementById('searchTextBox').value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:4596/sleepdata/search/" + searchText);

  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = '';
      var num = 1;
      const objects = JSON.parse(this.responseText).Complaint;
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + num + "</td>";
        trHTML += "<td>" + object["Year"] + "</td>";
        trHTML += "<td>" + object["Avg hrs per day sleeping"] + "</td>";
        trHTML += "<td>" + object["Type of Days"] + "</td>";
        trHTML += "<td>" + object["Age Group"] + "</td>";
        trHTML += "<td>" + object["Sex"] + "</td>";
        // trHTML += "<td>" + object["Savings"] + "</td>";
        // trHTML += "<td>" + object["GPA"] + "</td>";
        // trHTML += "<td>" + object["Salary"] + "</td>";
        trHTML += "<td>";
        trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showStudentUpdateBox(\'' + object["_id"] + '\')"><i class="fas fa-edit"></i></a>';
        trHTML += '<a type="button" class="btn btn-outline-danger" onclick="studentDelete(\'' + object['_id'] + '\')"><i class="fas fa-trash"></i></a></td>';
        trHTML += "<tr>";
        num++;

      }
      console.log(trHTML);
      document.getElementById("mytable").innerHTML = trHTML;

    }
  };
}

//Do it later
// function loadGraph() {
//   var mlCount = 0;
//   var fullsCount = 0;
//   var sysCount = 0;
//   var netwCount = 0;

//   var mrCount = 0;
//   var missCount = 0;
//   var drCount = 0;
//   var pfCount = 0;

//   const xhttp = new XMLHttpRequest();
//   xhttp.open("GET", "http://localhost:4956/sleepdata");
//   xhttp.send();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       const objects = JSON.parse(this.responseText);


//       //Pie chart
//       for (let object of objects) {
//         switch (object["Project"]) {
//           case "Machine Learning":
//             mlCount = mlCount + 1;
//             break;
//           case "Fullstack":
//             fullsCount = fullsCount + 1;
//             break;

//           case "System Design":
//             sysCount = sysCount + 1;
//             break;

//           case "Networks":
//             netwCount = netwCount + 1;
//             break;
//         }

//         switch (object["Title"]) {
//           case "นาย":
//             mrCount = mrCount + 1;
//             break;
//           case "นางสาว":
//             missCount = missCount + 1;
//             break;

//           case "ดร.":
//             drCount = drCount + 1;
//             break;

//           case "ศ.ดร":
//             pfCount = pfCount + 1;
//             break;
//         }
//       }

//       var TimelyResponseData = google.visualization.arrayToDataTable([
//         ["Project", "Field"],
//         ["Machine Learning", mlCount],
//         ["Fullstack", fullsCount],
//         ["System Design", sysCount],
//         ["Networks", netwCount],
//       ]);

//       var optionsTimelyResponse = { Titil: "Overall Project Fields" };
//       var chartTimelyResponse = new google.visualization.PieChart(document.getElementById("piechartTimelyResponse"));
//       chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);

//       //barchart
//       var dataSubmitted = google.visualization.arrayToDataTable([
//         [
//           "Student Titile",
//           "Number",
//           {
//             role: "style",
//           },
//           {
//             role: "annotation",
//           },
//         ],
//         ["นาย", mrCount, "gold", "นาย"],
//         ["นางสาว", missCount, "color: #F65A83", "นางสาว"],
//         ["ดร.", drCount, "color: #F9F5EB", "ดร."],
//         ["ศ.ดร", pfCount, "color: #607EAA", "ศ.ดร"]
//       ]);

//       var optionSubmitted = {
//         title: "Staff' Title",
//         legend: { position: "none" },
//       };

//       var chartSubmitted = new google.visualization.BarChart(document.getElementById("barchartSubmitted"));
//       chartSubmitted.draw(dataSubmitted, optionSubmitted);
//     }
//   };
// }

// function loadGraph() {

//   const xhttp = new XMLHttpRequest();
//   xhttp.open("GET", "http://localhost:4596/sleepdata");
//   xhttp.send();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       const objects = JSON.parse(this.responseText);

      
//         var data = google.visualization.arrayToDataTable([
//           ['Year', 'Sales', 'Expenses'],
//           ['2004', 1000, 400],
//           ['2005', 1170, 460],
//           ['2006', 660, 1120],
//           ['2007', 1030, 540]
//         ]);


//         var options = {
//           title: 'Company Performance',
//           curveType: 'function',
//           legend: { position: 'bottom' }
//         };

//         var chart = new google.visualization.LineChart(document.getElementById('piechartTimelyResponse'));

//         chart.draw(data, options);

//     }

//   }
// }

function showStudentCreateBox() {
  var d = new Date();
  const date = d.toISOString().split('T')[0];
  Swal.fire({
    title: 'Create Sleep Transaction',
    html:
      // '<div class="mb-3"><label for="Created_Date" class="form-label">Created Date</label>' +
      //   '<input id="Created_Date" class="swal2-input" placeholder="Created_Date" type="hidden" value="' + date + '">' +
      '<div class="mb-3"><label for="Year" class="form-label">Recorded Year</label>' +
      '<input class="form-control" id="Year" placeholder="Year (eg.2002)"></div>' +

      '<div class="mb-3"><label for="Avg" class="form-label">Average Sleeping Hours / Day</label>' +
      '<input class="form-control" id="Avg" placeholder="Hours (eg.8)"></div>' +

      '<div class="mb-3"><label for="TOD" class="form-label">Type of Day</label>' +
      // '<input class="form-control" id="TOD" placeholder="Name"></div>' +
      `<select class="form-control" id="TOD">
        <option value="" disabled selected>Please Select...</option>
        <option value="All days">All days</option>
        <option value="Nonholiday weekdays">Nonholiday weekdays</option>
        <option value="Weekend days and holidays">Weekend days and holidays</option>
      </select></div>` +

      '<div class="mb-3"><label for="age_group" class="form-label">Age Group</label>' +
      // '<input class="form-control" id="age_group" placeholder="Surname"></div>' 
      `<select class="form-control" id="age_group">
        <option value="" disabled selected>Please Select...</option>
        <option value="15 years and over">	15 years and over</option>
        <option value="15 to 24 years">15 to 24 years</option>
        <option value="25 to 34 years">25 to 34 years</option>
        <option value="35 to 44 years">35 to 44 years</option>
        <option value="45 to 54 years">45 to 54 years</option>
      </select></div>`
      +

      '<div class="mb-3"><label for="sex" class="form-label">Sex</label>' +
      // '<input class="form-control" id="sex" placeholder="Sex"></div>' 
      `<select class="form-control" id="sex">
        <option value="" disabled selected>Please Select...</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Both">Both</option>
      </select></div>`
    ,

    focusConfirm: false,
    preConfirm: () => {
      slistCreate();
    }
  });
}

function slistCreate() {

  // const Created_Date = document.getElementById('Created_Date').value;
  const Year = document.getElementById('Year').value;
  const Avg = document.getElementById('Avg').value;
  const TOD = document.getElementById('TOD').value;
  const age_group = document.getElementById('age_group').value;
  const sex = document.getElementById('sex').value;
  // const Project = document.getElementById('Project').value;
  // const Savings = document.getElementById('Savings').value;
  // const GPA = document.getElementById('GPA').value;
  // const Salary = document.getElementById('Salary').value;

  console.log(JSON.stringify({
    // Created_Date: Created_Date,
    // StudentID: StudentID,
    // Title: Title,
    // Name: Name,
    // Surname: Surname,
    // Field: Field,
    // Project: Project,
    // Savings: Savings,
    // GPA: GPA,
    // Salary: Salary,
    "Year": Year,
    "Avg hrs per day sleeping": Avg,
    "Type of Days": TOD,
    "Age Group": age_group,
    "Sex": sex

  }));

  //pass
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:4596/sleepdata/create");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    // Created_Date: Created_Date,
    // StudentID: StudentID,
    // Title: Title,
    // Name: Name,
    // Surname: Surname,
    // Field: Field,
    // Project: Project,
    // Savings: Savings,
    // GPA: GPA,
    // Salary: Salary,
    "Year": Year,
    "Avg hrs per day sleeping": Avg,
    "Type of Days": TOD,
    "Age Group": age_group,
    "Sex": sex

  }));

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        'Good job!',
        'Create Student Information Successfully!',
        'success'
      );
      loadTable();
    }
  };
}

function studentDelete(id) {
  console.log("Delete: ", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:4596/sleepdata/delete");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "_id": id
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        'Good job!',
        'Delete Student Information Successfully!',
        'success'
      );
      loadTable();
    }
  };
}


function showStudentUpdateBox(id) {
  console.log("edit", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:4596/sleepdata/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const object = JSON.parse(this.responseText).Complaint;
      console.log("showStudentUpdateBox", object);

      switch (object['Type of Days']) {
        case "All days":
          TOD = `<option value="" disabled >Please Select...</option>
                <option value="All days" selected>All days</option>
                <option value="Nonholiday weekdays">Nonholiday weekdays</option>
                <option value="Weekend days and holidays">Weekend days and holidays</option>`
          console.log("case :" + object['Type of Days']);
          break;
        case "Nonholiday weekdays":
          TOD = `<option value="" disabled >Please Select...</option>
                <option value="All days">All days</option>
                <option value="Nonholiday weekdays" selected>Nonholiday weekdays</option>
                <option value="Weekend days and holidays">Weekend days and holidays</option>`
          console.log("case :" + object['Type of Days']);
          break;
        case "Weekend days and holidays":
          TOD = `<option value="" disabled >Please Select...</option>
                <option value="All days">All days</option>
                <option value="Nonholiday weekdays" >Nonholiday weekdays</option>
                <option value="Weekend days and holidays"selected>Weekend days and holidays</option>`
          console.log("case :" + object['Type of Days']);
          break;
      }

      switch (object['Age Group']) {
        case "15 years and over":
          AOG = `<option value="" disabled>Please Select...</option>
                <option value="15 years and over" selected>	15 years and over</option>
                <option value="15 to 24 years">15 to 24 years</option>
                <option value="25 to 34 years">25 to 34 years</option>
                <option value="35 to 44 years">35 to 44 years</option>
                <option value="45 to 54 years">45 to 54 years</option>
                <option value="55 to 64 years">55 to 64 years</option>
                <option value="65 years and over">65 years and over</option>`
          console.log("case :" + object['Age Group']);
          break;

        case "15 to 24 years":
          AOG = `<option value="" disabled>Please Select...</option>
                <option value="15 years and over">15 years and over</option>
                <option value="15 to 24 years" selected>15 to 24 years</option>
                <option value="25 to 34 years">25 to 34 years</option>
                <option value="35 to 44 years">35 to 44 years</option>
                <option value="45 to 54 years">45 to 54 years</option>
                <option value="55 to 64 years">55 to 64 years</option>
                  <option value="65 years and over">65 years and over</option>`
          console.log("case :" + object['Age Group']);
          break;

        case "25 to 34 years":
          AOG = `<option value="" disabled>Please Select...</option>
                  <option value="15 years and over">15 years and over</option>
                  <option value="15 to 24 years">15 to 24 years</option>
                  <option value="25 to 34 years" selected>25 to 34 years</option>
                  <option value="35 to 44 years">35 to 44 years</option>
                  <option value="45 to 54 years">45 to 54 years</option>
                  <option value="55 to 64 years">55 to 64 years</option>
                  <option value="65 years and over">65 years and over</option>`
          console.log("case :" + object['Age Group']);
          break;

        case "35 to 44 years":
          AOG = `<option value="" disabled>Please Select...</option>
                  <option value="15 years and over">15 years and over</option>
                  <option value="15 to 24 years">15 to 24 years</option>
                  <option value="25 to 34 years">25 to 34 years</option>
                  <option value="35 to 44 years" selected>35 to 44 years</option>
                  <option value="45 to 54 years">45 to 54 years</option>
                  <option value="55 to 64 years">55 to 64 years</option>
                  <option value="65 years and over">65 years and over</option>`
          console.log("case :" + object['Age Group']);
          break;

        case "45 to 54 years":
          AOG = `<option value="" disabled>Please Select...</option>
                  <option value="15 years and over">15 years and over</option>
                  <option value="15 to 24 years">15 to 24 years</option>
                  <option value="25 to 34 years">25 to 34 years</option>
                  <option value="35 to 44 years">35 to 44 years</option>
                  <option value="45 to 54 years" selected>45 to 54 years</option>
                  <option value="55 to 64 years">55 to 64 years</option>
                  <option value="65 years and over">65 years and over</option>`
          console.log("case :" + object['Age Group']);
          break;

        case "55 to 64 years":
          AOG = `<option value="" disabled>Please Select...</option>
                  <option value="15 years and over">15 years and over</option>
                  <option value="15 to 24 years">15 to 24 years</option>
                  <option value="25 to 34 years">25 to 34 years</option>
                  <option value="35 to 44 years">35 to 44 years</option>
                  <option value="45 to 54 years">45 to 54 years</option>
                  <option value="55 to 64 years" selected>55 to 64 years</option>
                  <option value="65 years and over">65 years and over</option>`
          console.log("case :" + object['Age Group']);
          break;

        case "65 years and over":
          AOG = `<option value="" disabled>Please Select...</option>
                  <option value="15 years and over">15 years and over</option>
                  <option value="15 to 24 years">15 to 24 years</option>
                  <option value="25 to 34 years">25 to 34 years</option>
                  <option value="35 to 44 years">35 to 44 years</option>
                  <option value="45 to 54 years">45 to 54 years</option>
                  <option value="55 to 64 years">55 to 64 years</option>
                  <option value="65 years and over"selected>65 years and over</option>`
          console.log("case :" + object['Age Group']);
          break;
      }

      switch (object['Sex']) {
        case "Men":
          SEX = `<option value="" disabled>Please Select...</option>
                <option value="Men" selected>Men</option>
                <option value="Women">Women</option>
                <option value="Both">Both</option>`
          console.log("case :" + object['Sex']);
          break;

        case "Women":
          SEX = `<option value="" disabled>Please Select...</option>
                <option value="Men">Men</option>
                <option value="Women" selected>Women</option>
                <option value="Both">Both</option>`
          console.log("case :" + object['Sex']);
          break;

        case "Both":
          SEX = `<option value="" disabled>Please Select...</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Both"selected>Both</option>`
          console.log("case :" + object['Sex']);
          break;

      }


      Swal.fire({
        title: 'Update Student Transaction',
        // html: '<input id="id" class="swal2-input" placeholder="OID" type="hidden" value="' + object['_id'] + '"><br>' +

        //   '<div class="mb-3"><label for="Created_Date" class="form-label">Created Date</label>' +
        //   '<input class="form-control" id="Created_Date" placeholder="Created_Date" value="' + object['Created_Date'] + '"></div>' +

        //   '<div class="mb-3"><label for="StudentID" class="form-label">Student ID</label>' +
        //   '<input class="form-control" id="StudentID" placeholder="StudentID" value="' + object['StudentID'] + '"></div>' +

        //   '<div class="mb-3"><label for="Title" class="form-label">Title</label>' +
        //   '<input class="form-control" id="Title" placeholder="Title" value="' + object['Title'] + '"></div>' +

        //   '<div class="mb-3"><label for="Name" class="form-label">Name</label>' +
        //   '<input class="form-control" id="Name" placeholder="Name" value="' + object['Name'] + '"></div>' +

        //   '<div class="mb-3"><label for="Surname" class="form-label">Surname</label>' +
        //   '<input class="form-control" id="Surname" placeholder="Surname" value="' + object['Surname'] + '"></div>' +

        //   '<div class="mb-3"><label for="Field" class="form-label">Field</label>' +
        //   '<input class="form-control" id="Field" placeholder="Field" value="' + object['Field'] + '"></div>' +

        //   '<div class="mb-3"><label for="Project" class="form-label">Project</label>' +
        //   '<input class="form-control" id="Project" placeholder="Project" value="' + object['Project'] + '"></div>' +

        //   '<div class="mb-3"><label for="Savings" class="form-label">Savings</label>' +
        //   '<input class="form-control" id="Savings" placeholder="Savings" value="' + object['Savings'] + '"></div>' +


        //   '<div class="mb-3"><label for="GPA" class="form-label">GPA</label>' +
        //   '<input class="form-control" id="GPA" placeholder="GPA" value="' + object['GPA'] + '"></div>' +

        //   '<div class="mb-3"><label for="Salary" class="form-label">Salary</label>' +
        //   '<input class="form-control" id="Salary" placeholder="Salary" value="' + object['Salary'] + '"></div>'

        html:
          // '<div class="mb-3"><label for="Created_Date" class="form-label">Created Date</label>' +
          // '<input id="Created_Date" class="swal2-input" placeholder="Created_Date" type="hidden" value="' + date + '">' +
          '<input id="id" class="swal2-input" placeholder="OID" type="hidden" value="' + object['_id'] + '"><br>' +
          '<div class="mb-3"><label for="Year" class="form-label">Recorded Year</label>' +
          '<input class="form-control" id="Year" placeholder="Year (eg.2002)" value="' + object['Year'] + '"></div>' +

          '<div class="mb-3"><label for="Avg" class="form-label">Average Sleeping Hours / Day</label>' +
          '<input class="form-control" id="Avg" placeholder="Hours (eg.8)" value="' + object['Avg hrs per day sleeping'] + '"></div>' +


          '<div class="mb-3"><label for="TOD" class="form-label">Type of Day</label>' +

          // '<input class="form-control" id="TOD" placeholder="Name"></div>' +

          // '<script>'+
          //   'var selectElement = document.getElementById("TOD").value;'+
          //   'selectElement.value = object["Type of Days"];'+
          //    element.setAttribute("class", "democlass");
          // '</script>'+


          '<select class="form-control" id="TOD">' +
          // '<option value="" disabled >Please Select...</option>'+
          // '<option value="All days">All days</option>'+
          // '<option value="Nonholiday weekdays">Nonholiday weekdays</option>'+
          // '<option value="Weekend days and holidays">Weekend days and holidays</option>'+
          TOD +
          '</select></div>' +


          '<div class="mb-3"><label for="age_group" class="form-label">Age Group</label>' +
          // '<input class="form-control" id="age_group" placeholder="Surname"></div>' 
          '<select class="form-control" id="age_group">' +
          AOG +
          '</select></div>' +


          '<div class="mb-3"><label for="sex" class="form-label">Sex</label>' +
          // '<input class="form-control" id="sex" placeholder="Sex"></div>' 
          '<select class="form-control" id="sex">' +
          SEX +
          '</select></div>'
        ,

        focusConfirm: false,
        preConfirm: () => {
          studentUpdate();
        }
      });
    }
  };
}


function studentUpdate() {

  // const id = document.getElementById("id").value;
  // const Created_Date = document.getElementById('Created_Date').value;
  // const StudentID = document.getElementById('StudentID').value;
  // const Title = document.getElementById('Title').value;
  // const Name = document.getElementById('Name').value;
  // const Surname = document.getElementById('Surname').value;
  // const Field = document.getElementById('Field').value;
  // const Project = document.getElementById('Project').value;
  // const Savings = document.getElementById('Savings').value;
  // const GPA = document.getElementById('GPA').value;
  // const Salary = document.getElementById('Salary').value;

  const id = document.getElementById("id").value;
  const Year = document.getElementById('Year').value;
  const Avg = document.getElementById('Avg').value;
  const TOD = document.getElementById('TOD').value;
  const age_group = document.getElementById('age_group').value;
  const sex = document.getElementById('sex').value;

  console.log(JSON.stringify({
    "_id": id,
    // Created_Date: Created_Date,
    // StudentID: StudentID,
    // Title: Title,
    // Name: Name,
    // Surname: Surname,
    // Field: Field,
    // Project: Project,
    // Savings: Savings,
    // GPA: GPA,
    // Salary: Salary,
    "Year": Year,
    "Avg hrs per day sleeping": Avg,
    "Type of Days": TOD,
    "Age Group": age_group,
    "Sex": sex
  }));


  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:4596/sleepdata/update");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "_id": id,
    // Created_Date: Created_Date,
    // StudentID: StudentID,
    // Title: Title,
    // Name: Name,
    // Surname: Surname,
    // Field: Field,
    // Project: Project,
    // Savings: Savings,
    // GPA: GPA,
    // Salary: Salary,
    "Year": Year,
    "Avg hrs per day sleeping": Avg,
    "Type of Days": TOD,
    "Age Group": age_group,
    "Sex": sex
  }));



  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
        'Good job!',
        'Update Student Information Successfully!',
        'success'
      );
      loadTable();
    }
  };
}