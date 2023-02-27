const url = 'http://localhost:3000'

const user = "viewer"
const password = "viewer"

function loadTable() {
    fetch(url + '/getUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": user,
            "password": password
        })
    }).then((response) => {
        if (response.status == 400) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `${response.statusText}`,
                confirmButtonText: 'OK',
            }).then((result) => {
                window.location.reload()
            })
        }
        else {
            return response.json()
        }
    }).then((data) => {
        console.log(data.data);
        let index = 0
        let html = ''
        for (object in data.data[index]) {
            html += `<tr>
                <td>${data.data[index].customer_id}</td>
                <td>${data.data[index].name}</td>
                <td>${data.data[index].lastname}</td>
                <td>${data.data[index].DoB}</td>
                <td>${data.data[index].point}</td>
                <td>${data.data[index].rank_id}</td>
                <td>${data.data[index].email}</td>
                <td>${data.data[index].regist_date}</td>
                <td><button type="button" class="btn btn-warning"
                onclick="editData(${data.data[index].customer_id})"><i class="fa-regular fa-pen-to-square"></i></button></td>
                <td><button type="button" class="btn btn-danger"
                onclick="deleteData(${data.data[index].customer_id})"><i class="fa-solid fa-trash"></i></i></button></td>
                </tr>`

            // console.log(html);
            index++
            document.getElementById('tableData').innerHTML = html
        }
    }).catch(error => {
        console.error(error);
    })
}

function createData() {
    Swal.fire({
        title: 'Create Data',
        html:
            '<center><label for="name"><b>Name</b></label></center>' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<br><br><center><label for="lastname"><b>Lastname</b></label></center>' +
            '<input id="lastName" class="swal2-input" placeholder="Lastname">' +
            '<br><br><center><label for="dob"><b>Date of Birth</b></label></center>' +
            '<input id="dob" class="swal2-input" type="date" placeholder="Date of Birth" style="width:59%">' +
            '<br><br><center><label for="email"><b>Email</b></label></center>' +
            '<input id="email" class="swal2-input" placeholder="email">'
        ,
        focusConfirm: false,
        preConfirm: () => {
            const name = document.getElementById('name').value
            const lastName = document.getElementById('lastName').value
            const dob = document.getElementById('dob').value
            const email = document.getElementById('email').value

            if (name && lastName && dob && email) {
                fetch(url + '/insertData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "username": user,
                        "password": password,
                        "name": name,
                        "lastname": lastName,
                        "DoB": dob,
                        "email": email,
                    })
                }).then((response) => {
                    if (response.status == 400 || response.status == 401) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `${response.statusText}`,
                            confirmButtonText: 'OK',
                        }).then((result) => {
                            window.location.reload()
                        })
                    } else {
                        return response.json()
                    }
                }).catch(error => {
                    console.error(error);
                })

                // Old Fetch
                // fetch(url + '/insertData', {
                //     method: 'POST',
                //     headers: {
                //         // 'Accept' : 'application/json, text/plain, /',
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         "name": name,
                //         "lastname": lastName,
                //         "DoB": dob,
                //         "email": email,
                //     })
                // }).then(data => console.log(data))
                //     .then(response => response.json())
                //     .catch(error => console.log(error))
                Swal.fire({
                    icon: 'success',
                    title: 'Created!!',
                    text: `Your data has been created.`,
                    confirmButtonText: 'OK',
                }).then((result) => {
                    window.location.reload()
                })
                // window.location.reload()
            }
        }
    })

}


function editData(id) {
    console.log(id);
    fetch(url + '/getData/' + id)
        .then((response) => response.json())
        .then((data) => {
            Swal.fire({
                title: 'Edit Data',
                html:
                    '<center><label for="name"><b>Name</b></label></center>' +
                    `<input id="name" class="swal2-input" placeholder="Name" value="${data.data[0].name}">` +
                    '<br><br><center><label for="lastname"><b>Lastname</b></label></center>' +
                    `<input id="lastName" class="swal2-input" placeholder="Lastname" value="${data.data[0].lastname}">` +
                    '<br><br><center><label for="dob"><b>Date of Birth</b></label></center>' +
                    `<input id="dob" class="swal2-input" placeholder="Date of Birth" style="width:59%" value="${data.data[0].DoB}" type="date">` +

                    '<br><br><center><label for="point"><b>Point</b></label></center>' +
                    `<input id="point" class="swal2-input" placeholder="Point" style="width:59%" value="${data.data[0].point}">` +

                    '<br><br><center><label for="rank_id"><b>Rank ID</b></label></center>' +
                    `<input id="rank_id" class="swal2-input" placeholder="Rank ID" style="width:59%" value="${data.data[0].rank_id}">` +

                    '<br><br><center><label for="email"><b>Email</b></label></center>' +
                    `<input id="email" class="swal2-input" placeholder="email" value="${data.data[0].email}">`
                ,
                focusConfirm: false,
                preConfirm: () => {
                    const name = document.getElementById('name').value
                    const lastName = document.getElementById('lastName').value
                    let dob = document.getElementById('dob').value
                    const point = document.getElementById('point').value
                    const rank_id = document.getElementById('rank_id').value
                    const email = document.getElementById('email').value

                    if (dob == '') {
                        dob = data.data[0].DoB
                        dob = dob.slice(0, 10)
                    }
                    console.log(`name : ${name}
                    lastname : ${lastName}
                    dob : ${dob}
                    email : ${email}`);


                    fetch(url + '/updateData/' + id, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "username": user,
                            "password": password,
                            "name": name,
                            "lastname": lastName,
                            "DoB": dob,
                            "point": point,
                            "rank_id": rank_id,
                            "email": email,
                        })
                    }).then((response) => {
                        if (response.status == 400 || response.status == 401) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `${response.statusText}`,
                                confirmButtonText: 'OK',
                            }).then((result) => {
                                window.location.reload()
                            })
                        } else {
                            return response.json()
                        }
                    }).catch(error => {
                        console.error(error);
                    })

                    Swal.fire({
                        icon: 'success',
                        title: 'Updated!!',
                        text: `Your data has been updated.`,
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        window.location.reload()
                    })

                    // window.location.reload()

                    // Old Update
                    // fetch(url + '/updateData/' + id, {
                    //     method: 'PUT',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     }, // right here <<<<<<<<<<<<
                    //     body: JSON.stringify({
                    //         "name": name,
                    //         "lastname": lastName,
                    //         "DoB": dob,
                    //         "point": point,
                    //         "rank_id": rank_id,
                    //         "email": email
                    //     })
                    // }).then(response => response.json())
                    //     .then(data => console.log(data))
                    //     .catch(error => console.log(error))
                    // Swal.fire('Saved!', '', 'success')
                    // window.location.reload()
                }
            })
        }).catch(error => {
            console.error(error);
        })

    // fetch(url + '/updateData/' + id, {
    //     method
    // })
}

function deleteData(id) {
    console.log(id);
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

            // Old Delete
            // fetch(url + `/deleteData/${id}`, {
            //     method: 'DELETE',
            //     body: JSON.stringify({
            //         "customer_id": id
            //     })
            // }).then(response => response.json())
            //     .then(data => console.log(data))
            //     .catch(error => console.log(error))


            fetch(url + `/deleteData/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": user,
                    "password": password,
                    "customer_id": id
                })
            }).then((response) => {
                if (response.status == 400 || response.status == 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `${response.statusText}`,
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        window.location.reload()
                    })
                } else {
                    return response.json()
                }
            }).catch(error => {
                console.error(error);
            })

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: `Your data has been deleted.`,
                confirmButtonText: 'OK',
            }).then((result) => {
                window.location.reload()
            })

        }
    })
}

function authen() {
    fetch(url + '/getUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": "kasidit",
            "password": "kasidit"
        })
    }).then((response) => response.json())
        .then((data) => console.log(data));
}