var url = 'http://localhost:4596'

// function createData(){
//     console.log("function createData() is called");
//     var name = document.getElementById('name').value
//     var sname = document.getElementById('lname').value

//     var xhttp = new XMLHttpRequest()

//     xhttp.open('POST',url+'/user')
//     xhttp.setRequestHeader('Content-Type', 
//     'application/json')

//     xhttp.send(JSON.stringify({
//         id:'',"Firstname":name,"Lastname": sname
//     }))
// }

function createData() {
    console.log("function createData() is called");
    var name = document.getElementById('name').value
    var sname = document.getElementById('lname').value
    var img = document.getElementById('imglink').value

    fetch(url + '/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": null,
            "user": name,
            "sname": sname,
            "img": img
        })
    }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
}

// old
// function readData() {
//     console.log("function createData() is called");
//     var html = ''

//     fetch(url + '/user')
//         .then(response => response.json())
//         .then(data => {
//             for (const x of data) {
//                 console.log(x.id);
//                 html += `<h1>${x.user} ${x.sname}</h1><br>`
//             }
//             document.getElementById("showdata").innerHTML = html
//         })
// }

function readData() {
    console.log("function createData() is called");
    var html = '<div class="row">'

    fetch(url + '/user')
        .then(response => response.json())
        .then(data => {
            for (const x of data) {
                console.log(x.id);
                html += `<div class="card" style="width: 18rem;">
                <img src="${x.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${x.id}</h5>
                    <p class="card-text">รายการจองของ ${x.user} ${x.sname}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>`
            }
            html += '</div>'
            document.getElementById("showdata").innerHTML = html
        })
}

function deleteData() {
    var deletetb = document.getElementById('deletetb').value
    console.log(deletetb);
    
    fetch(url + `/user/${deletetb}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "_id": deletetb
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
}
