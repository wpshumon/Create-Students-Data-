let form = document.getElementById('form');
let studentNo = document.getElementById('studentNo');
let names = document.getElementById('name');
let section = document.getElementById('section');
let branch = document.getElementById('branch');
let email = document.getElementById('email');
let addBtn = document.getElementById('btn');
let studentsData = document.getElementById('studentsData');
let url = "http://localhost:3000/data";

// Create student data from start

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(studentNo.value && names.value && section.value && branch.value && email.value) {
        let formData = new FormData(form);
        let formObj = Object.fromEntries(formData);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObj)
        })
    }
    
})

//  read crud data

window.onload = () => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
            // console.log(data);
            data.forEach(student => {
                let tr = document.createElement('tr');
                tr.setAttribute('data-id', student.id);
                studentsData.appendChild(tr);
                tr.innerHTML = `
                <td>${student.StudentNo}</td>
                <td>${student.Name}</td>
                <td>${student.Section}</td>
                <td>${student.Branch}</td>
                <td>${student.Email}</td>
                <td><button class="btn btn-primary" id ="edit">Edit</button>
                <button class="btn btn-danger" id="delete">Delete</button></td>
                `;
            })
        })
    }

    // update crud operation 
studentsData.addEventListener('click', (e)=>{
    e.preventDefault();
    let isEditPressBtn = e.target.id === 'edit';
    let isDeletePressBtn = e.target.id === 'delete';
    let id = e.target.parentElement.parentElement.dataset.id
    if(isEditPressBtn){
    studentNo.value = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    names.value = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    section.value = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    branch.value = e.target.parentElement.previousElementSibling.previousElementSibling.innerText;
    email.value = e.target.parentElement.previousElementSibling.innerText;
    addBtn.innerText = "Update";
    }
    addBtn.addEventListener('click', (e) =>{
        e.preventDefault();
        let formData = new FormData(form);
        let formObj = Object.fromEntries(formData);
        fetch(url + '/' + id ,{
            method : 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObj)
        })

    })
    if(isDeletePressBtn){
        fetch(url + '/' + id,{
            method : 'DELETE',
        })
    }

})