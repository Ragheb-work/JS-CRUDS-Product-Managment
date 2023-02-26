let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tBody = document.getElementById("tbody");

let mood = "create";
let index;

//get total
function getTotal() {
  if (price.value != "") {
    total.innerHTML =
      +price.value + +taxes.value + +ads.value - +discount.value;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#e91e63";
  }
}

// create Product
//save localStorage
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.getItem("product"));
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  // count
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value < 101
  ) {
    if (mood == "create") {
      if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[index] = newPro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearInputs();
  }

  localStorage.setItem("product", JSON.stringify(dataPro));

  showData();
};

//clear inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  category.value = "";
  count.value = "";
  discount.value = "";
  getTotal();
}

// read

function showData() {
  let table;
  tBody.innerHTML = "";
  for (let i = 0; i < dataPro.length; i++) {
    table = `<tr>
             <td>${i + 1}</td>
             <td>${dataPro[i].title}</td>
             <td>${dataPro[i].price}</td>
             <td>${dataPro[i].taxes}</td>
             <td>${dataPro[i].ads}</td>
             <td>${dataPro[i].discount}</td>
             <td>${dataPro[i].total}</td>
             <td>${dataPro[i].category}</td>
              <td><button onclick="updateProduct(${i})" id="update">update</button></td>
              <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>`;
    tBody.innerHTML += table;
  }
  // Delete All
  let delBtn = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    delBtn.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
  } else {
    delBtn.innerHTML = "";
  }
}
showData();

// delete
function deleteProduct(id) {
  dataPro.splice(id, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
// delete All
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// update
function updateProduct(id) {
  title.value = dataPro[id].title;
  price.value = dataPro[id].price;
  taxes.value = dataPro[id].taxes;
  ads.value = dataPro[id].ads;
  category.value = dataPro[id].category;
  getTotal();
  count.style.display = "none";

  discount.value = dataPro[id].discount;
  submit.innerHTML = "Update";
  mood = "update";
  index = id;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = `Search by ${searchMood}`;
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value)) {
        table += `<tr>
               <td>${i}</td>
               <td>${dataPro[i].title}</td>
               <td>${dataPro[i].price}</td>
               <td>${dataPro[i].taxes}</td>
               <td>${dataPro[i].ads}</td>
               <td>${dataPro[i].discount}</td>
               <td>${dataPro[i].total}</td>
               <td>${dataPro[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
              </tr>`;
      }
    } else {
      if (dataPro[i].category.includes(value)) {
        table += `<tr>
               <td>${i}</td>
               <td>${dataPro[i].title}</td>
               <td>${dataPro[i].price}</td>
               <td>${dataPro[i].taxes}</td>
               <td>${dataPro[i].ads}</td>
               <td>${dataPro[i].discount}</td>
               <td>${dataPro[i].total}</td>
               <td>${dataPro[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
              </tr>`;
      }
    }
  }

  tBody.innerHTML = table;
}
