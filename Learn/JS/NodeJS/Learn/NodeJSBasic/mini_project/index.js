
const url = 'http://localhost:3000'

//############################################################
/*
    กำหนดสิทธิ์การเข้าถึงโดยใช้ username และ password ด้านล่างโดยใช้
        1. admin (สามารถ CRUD ได้)
        2. creator (สามารถ CRUD ได้)
        3. editor (สามารถ Edit ได้อย่างเดียว)
        4. viewer (สามารถดูข้อมูลได้อย่างเดียว)

        5. retirement (activeFlag = 0) *ไม่สามารถทำอะไรได้เลย*
*/
const user = "admin"
const password = "admin"    //password กับ username ใช้ข้อมูลเดียวกัน
//############################################################



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
    }).then((response) => response.json())
        .then((data) => {
            console.log(data.role);
            const role = data.role
            if (role){
                document.getElementById('role').innerHTML = `Logged in as : <b>${role}</b>`
            }
            else{
                document.getElementById('role').innerHTML = `Logged in as : <b>Unknown</b>`
            }
            
            if (data.status == 200) {
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
                    index++
                    document.getElementById('tableData').innerHTML = html
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `${data.msg}`,
                    confirmButtonText: 'OK',
                }).then((result) => {
                    window.location.reload()
                })

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
            '<input id="name" class="swal2-input" placeholder="Name (varchar)">' +
            '<br><br><center><label for="lastname"><b>Lastname</b></label></center>' +
            '<input id="lastName" class="swal2-input" placeholder="Lastname (varchar)">' +
            '<br><br><center><label for="dob"><b>Date of Birth</b></label></center>' +
            '<input id="dob" class="swal2-input" type="date" placeholder="Date of Birth (date)" style="width:59%">' +
            '<br><br><center><label for="email"><b>Email</b></label></center>' +
            '<input id="email" class="swal2-input" placeholder="email (varchar)">'
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
                }).then((response) => response.json())
                    .then((data) => {
                        if (data.status != 200) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: `${data.msg}`,
                                confirmButtonText: 'OK',
                            }).then((result) => {
                                window.location.reload()
                            })
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })

                Swal.fire({
                    icon: 'success',
                    title: 'Created!!',
                    text: `Your data has been created.`,
                    confirmButtonText: 'OK',
                }).then((result) => {
                    window.location.reload()
                })
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
                    `<input id="name" class="swal2-input" placeholder="Name (varchar)" value="${data.data[0].name}">` +
                    '<br><br><center><label for="lastname"><b>Lastname</b></label></center>' +
                    `<input id="lastName" class="swal2-input" placeholder="Lastname (varchar)" value="${data.data[0].lastname}">` +
                    '<br><br><center><label for="dob"><b>Date of Birth</b></label></center>' +
                    `<input id="dob" class="swal2-input" placeholder="Date of Birth (date)" style="width:59%" value="${data.data[0].DoB}" type="date">` +

                    '<br><br><center><label for="point"><b>Point</b></label></center>' +
                    `<input id="point" class="swal2-input" placeholder="Point (int)" style="width:59%" value="${data.data[0].point}">` +

                    '<br><br><center><label for="rank_id"><b>Rank ID</b></label></center>' +
                    `<input id="rank_id" class="swal2-input" placeholder="Rank ID (int)" style="width:59%" value="${data.data[0].rank_id}">` +

                    '<br><br><center><label for="email"><b>Email</b></label></center>' +
                    `<input id="email" class="swal2-input" placeholder="email (varchar)" value="${data.data[0].email}">`
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
                    }).then((response) => response.json())
                        .then((data) => {
                            console.log(data.status);
                            if (data.status == 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Updated!!',
                                    text: `Your data has been updated.`,
                                    confirmButtonText: 'OK',
                                }).then((result) => {
                                    window.location.reload()
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: `${data.msg}`,
                                    confirmButtonText: 'OK',
                                }).then((result) => {
                                    window.location.reload()
                                })

                            }
                        })

                }
            })
        }).catch(error => {
            console.error(error);
        })

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
            }).then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: `Your data has been deleted.`,
                            confirmButtonText: 'OK',
                        }).then((result) => {
                            window.location.reload()
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `${data.msg}`,
                            confirmButtonText: 'OK',
                        }).then((result) => {
                            window.location.reload()
                        })
                    }
                }).catch(error => {
                    console.error(error);
                })



        }
    })
}
