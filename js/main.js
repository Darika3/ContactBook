// ! ---------- TODO List ------
let form = document.querySelector("form");
let inpName = document.querySelector("#name");
let inpNum = document.querySelector("#number");
let inpImg = document.querySelector("#img");
let listName = document.querySelector("#listName");
let listNum = document.querySelector("#listNum");
let listImg = document.querySelector("#listImg");
let inpTask = document.querySelectorAll(".inpts")
let list = document.querySelector("#list");

// ? read
createTask();
function createTask() {
  if (!localStorage.getItem("tasks-data")) {
    localStorage.setItem("tasks-data", "[]");
  }
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  list.innerHTML = "";
  data.forEach((elem, index) => {
    list.innerHTML += `
    <hr>
    <li>
      ${elem.name}
      

      <span>${elem.number}</span>
      
      <img style=max-width:10%; src="${elem.img}">
      <div id="btnsDiv"><button class="btns" id="btnDel" onclick="deleteTask(${index})">Delete</button>
      <button class="btns" onclick="editTask(${index})">Edit</button><div>
    </li>
    <hr>
    `;
  });
}

// ! create - добавление или чтение
form.addEventListener("submit", (event) => {
  event.preventDefault(); 
  if (!inpName.value.trim()||!inpNum.value.trim()||!inpImg.value.trim()) {
    alert("Заполните поле!");
    return;
  }
  let obj = { name: inpName.value, number: inpNum.value, img: inpImg.value }; 
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  data.push(obj);
  localStorage.setItem("tasks-data", JSON.stringify(data));

  inpName.value = ""; 
  inpNum.value = ""; 
  inpImg.value = ""; 
  createTask();
});

// ! Delete - удаление
function deleteTask(index) {
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  data.splice(index, 1);
  localStorage.setItem("tasks-data", JSON.stringify(data));
  createTask();
}

//  !Edit
let modal = document.querySelector("#modal");
let inpEditName = document.querySelector("#inpEditName");
let btnSave = document.querySelector("#modalBtn");
let inpEditNum = document.querySelector("#inpEditNum");
let inpEditImg = document.querySelector("#inpEditImg");

let closeModal = document.querySelector("#modalClose");
console.log(btnSave , inpEditNum , inpEditImg);

function editTask(index) {
  modal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  inpEditName.value = data[index].name;
  inpEditName.setAttribute("id", index)
  inpEditNum.value = data[index].number;
  inpEditNum.setAttribute("id", index)
  inpEditImg.value = data[index].img;
  inpEditImg.setAttribute("id", index)
}

closeModal.addEventListener("click", ()=>{
  modal.style.display="none"
});
btnSave.addEventListener("click", ()=>{
  let id1= inpEditName.id;
  let id2= inpEditNum.id;
  let id3= inpEditImg.id;
  let data = JSON.parse(localStorage.getItem("tasks-data"))
  let newObj = {
    name : inpEditName.value,
    number : inpEditNum.value,
    img : inpEditImg.value
  }
  data.splice(id1, 1, newObj);
  data.splice(id2, 1, newObj);
  data.splice(id3, 1, newObj);
  localStorage.setItem("tasks-data", JSON.stringify(data));
  modal.style.display = "none";
  createTask()
});

