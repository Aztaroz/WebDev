const url = "http://localhost:3000"

function loadTable() {
    $.ajax({
        url: url + "/getData",
        type: 'GET',
        success: function (objects) {
            var trHTML = '';
            var num = 1;
            // console.log(objects.data);
            for (let object of objects.data) {
                trHTML += "<tr>";
                trHTML += "<td>" + object['id'] + "</td>";
                trHTML += "<td>" + object["hashed_password"] + "</td>";
                trHTML += "<td>" + object["first_name"] + "</td>";
                trHTML += "<td>" + object["last_name"] + "</td>";
                trHTML += "<td>" + object["email"] + "</td>";
                trHTML += "<td>" + object["created"] + "</td>";
                trHTML += "<td>" + object["user_role_id"] + "</td>";
                trHTML += "<td>";
                trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="editData(\'' + object["id"] + '\')"><i class="fas fa-edit"></i></a>';
                trHTML += '<a type="button" class="btn btn-outline-danger" onclick="deleteData(\'' + object["id"] + '\')"><i class="fas fa-trash"></i></a>';
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
    let date = new Date();
    let isoDate = date.toISOString();


    // const currentTimestamp = new Date().getTime();
    // let dateFormat = new Date(currentTimestamp);
    // console.log(dateFormat.getDate() +
    // "/" + (dateFormat.getMonth() + 1) +
    // "/" + dateFormat.getFullYear() +
    // " " + dateFormat.getHours() +
    // ":" + dateFormat.getMinutes() +
    // ":" + dateFormat.getSeconds());
    Swal.fire({
        title: 'Multiple inputs',
        html:
            '<input id="swal-input2" class="swal2-input" placeholder="Hashed Password">' +
            '<input id="swal-input3" class="swal2-input" placeholder="First Name">' +
            '<input id="swal-input4" class="swal2-input" placeholder="Last Name">' +
            '<input id="swal-input5" class="swal2-input" placeholder="Email">' +
            '<input id="swal-input6" class="swal2-input" placeholder="User Role ID">'
        ,
        focusConfirm: false,
        preConfirm: () => {
            // const id = document.getElementById('swal-input1').value
            const hashedPassword = document.getElementById('swal-input2').value
            const firstName = document.getElementById('swal-input3').value
            const lastName = document.getElementById('swal-input4').value
            const email = document.getElementById('swal-input5').value
            const roleID = document.getElementById('swal-input6').value

            fetch(url + '/insertData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "hashed_password": hashedPassword,
                    "first_name": firstName,
                    "last_name": lastName,
                    "email": email,
                    "user_role_id": parseInt(roleID),
                })
            }).then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
            window.location.reload()
        }
    })
}

function editData(id) {
    $.ajax({
        url: url + "/getData",
        type: 'GET',
        success: function (objects) {
            for (let object of objects.data) {
                if (object['id'] == id) {
                    Swal.fire({
                        title: 'Multiple inputs',
                        showCancelButton: true,
                        html:
                            `<input id="swal-input1" class="swal2-input" placeholder="Hashed Password" value="${object['hashed_password']}">` +
                            `<input id="swal-input2" class="swal2-input" placeholder="First Name" value="${object['first_name']}">` +
                            `<input id="swal-input3" class="swal2-input" placeholder="Last Name" value="${object['last_name']}">` +
                            `<input id="swal-input4" class="swal2-input" placeholder="Email" value="${object['email']}">` +
                            `<input id="swal-input5" class="swal2-input" placeholder="User Role ID" value="${object['user_role_id']}">`
                        ,
                        focusConfirm: false,
                        preConfirm: () => {

                            let hashedPassword = document.getElementById('swal-input1').value
                            let firstName = document.getElementById('swal-input2').value
                            let lastName = document.getElementById('swal-input3').value
                            let email = document.getElementById('swal-input4').value
                            let roleID = document.getElementById('swal-input5').value

                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, edit it!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: 'Data edited!',
                                        html: 'I will close in <b></b> milliseconds.',
                                        icon: 'success',
                                        timer: 2000,
                                        timerProgressBar: false,
                                        didOpen: () => {

                                            const b = Swal.getHtmlContainer().querySelector('b')
                                            timerInterval = setInterval(() => {
                                                b.textContent = Swal.getTimerLeft()
                                            }, 100)
                                        },
                                        willClose: () => {
                                            clearInterval(timerInterval)
                                        }
                                    }).then((result) => {
                                        /* Read more about handling dismissals below */
                                        if (result.dismiss === Swal.DismissReason.timer) {
                                            fetch(url + `/updateData/${id}`, {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    "hashed_password": hashedPassword,
                                                    "first_name": firstName,
                                                    "last_name": lastName,
                                                    "email": email,
                                                    "user_role_id": parseInt(roleID),
                                                })
                                                // }).then(response => response.json())
                                            }).then(data => console.log(data))
                                                .catch(error => console.log(error))
                                            window.location.reload()
                                        }
                                        if (result.dismiss !== Swal.DismissReason.timer) {
                                            fetch(url + `/updateData/${id}`, {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    "hashed_password": hashedPassword,
                                                    "first_name": firstName,
                                                    "last_name": lastName,
                                                    "email": email,
                                                    "user_role_id": parseInt(roleID),
                                                })
                                                // }).then(response => response.json())
                                            }).then(data => console.log(data))
                                                .catch(error => console.log(error))
                                            window.location.reload()
                                        }
                                    })

                                }
                            })
                        }
                    })
                }
                else {
                    console.log(`Data not found! (id = ${id})`);
                }
            }
        }
    });
}


function deleteData(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Data Deleted!',
                html: 'I will close in <b></b> milliseconds.',
                icon: 'success',
                timer: 2000,
                timerProgressBar: false,
                didOpen: () => {

                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    fetch(url + `/deleteData/${id}`, {
                        method: 'DELETE',
                    })
                        .then(response => response.json())
                        .then(data => console.log(data))
                        .catch(error => console.log(error))
                    window.location.reload()
                }
                if (result.dismiss !== Swal.DismissReason.timer) {
                    fetch(url + `/deleteData/${id}`, {
                        method: 'DELETE',
                    })
                        .then(response => response.json())
                        .then(data => console.log(data))
                        .catch(error => console.log(error))
                    window.location.reload()
                }
            })

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