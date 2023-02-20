const url = "http://localhost:3000"

function loadTable() {
    $.ajax({
        url: url + "/getDevTeam",
        type: 'GET',
        success: function (objects) {
            var trHTML = '';
            var num = 1;
            // console.log(objects.data);
            for (let object of objects.data) {
                trHTML += "<tr>";
                trHTML += "<td>" + object['teamID'] + "</td>";
                trHTML += "<td>" + object["teamName"] + "</td>";
                trHTML += "<td>" + object["amount"] + "</td>";
                trHTML += "<td>" + object["startDate"] + "</td>";
                trHTML += "<td>" + object["endDate"] + "</td>";
                trHTML += "<td>";
                trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="editData(\'' + object["teamID"] + '\')"><i class="fas fa-edit"></i></a>';
                trHTML += '<a type="button" class="btn btn-outline-danger" onclick="studentDelete(\'' + object["teamID"] + '\')"><i class="fas fa-trash"></i></a>';
                trHTML += "<tr>";
                num++;
            }

            document.getElementById("table").innerHTML = trHTML;

            // loadGraph()
        }
    });
}

function createData() {
    console.log("function createData() is called");

    Swal.fire({
        title: 'Multiple inputs',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Team Name">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Amount">' +
            '<input id="swal-input3" class="swal2-input" placeholder="Start Date eg.2006-07-01">' +
            '<input id="swal-input4" class="swal2-input" placeholder="End Date eg.2006-07-01">'
        ,
        focusConfirm: false,
        preConfirm: () => {
            const teamName = document.getElementById('swal-input1').value
            const amount = document.getElementById('swal-input2').value
            const startDate = document.getElementById('swal-input3').value
            const endDate = document.getElementById('swal-input4').value

            fetch(url + '/insertData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "teamID": null,
                    "teamName": teamName,
                    "amount": amount,
                    "startDate": startDate,
                    "endDate": endDate
                })
            }).then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
        }
    })

}

// function editData(id) {
//     console.log(id);
//     fetch(url + `/getDevTeam/${id}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             Swal.fire({
//                 title: `Edit username ${data['user']}`,
//                 html:
//                     `<input id="swal-input1" class="swal2-input" disabled value="${data['id']}">
//                             <input id="swal-input2" class="swal2-input" value="${data['user']}">
//                             <input id="swal-input3" class="swal2-input" value="${data['sname']}">
//                             <input id="swal-input4" class="swal2-input" value="${data['img']}">`,

//                 focusConfirm: false,
//                 preConfirm: () => {
//                     return [
//                         name = document.getElementById('swal-input2').value,
//                         sname = document.getElementById('swal-input3').value,
//                         img = document.getElementById('swal-input4').value,
//                         fetch(url + `/user/${id}`, {
//                             method: 'PUT',
//                             headers: {
//                                 'Content-Type': 'application/json'
//                             },
//                             body: JSON.stringify({
//                                 "id": id,
//                                 "user": name,
//                                 "sname": sname,
//                                 "img": img
//                             })
//                         }).then(response => response.json())
//                             .then(data => console.log(data))
//                             .catch(error => console.log(error))
//                     ]
//                 }
//             })


//         })
// }
// const url = 'http://localhost:3000'

// function loadData() {
//     console.log("function createData() is called");
//     var html = '<div class="row">'
//     fetch(url + '/getDevTeam')
//         .then(response => response.json())
//         .then(data => {
//             for (const x of data) {
//                 // console.log(x.id);
//                 html += `<h1>Test</h1>`
//             }
//             html += '</div>'
//             document.getElementById("table").innerHTML = html
//         })
// }