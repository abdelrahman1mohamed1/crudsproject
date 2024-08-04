let names = document.getElementById('name');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let total = document.querySelector('.total');
let count = document.getElementById('count');
let createbtn = document.getElementById('createbtn');
let search = document.getElementById('search');
let searchbynm = document.getElementById('searchbynm');
let searchbyct = document.getElementById('searchbyct');
let tmp;

let mood = 'create';

//get total//
function getTotal() {
    if(price.value != ''){
        let result = price.value - (price.value * discount.value / 100);
        total.innerHTML = result;
        document.getElementById('total').style.background = 'green';
    }else if(price.value = '') {
        total.innerHTML = '';
        document.getElementById('total').style.background = 'red';

    }
}
//create products//
let datapro;
if(localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
}else {
     datapro = [];
}


createbtn.onclick = function() {
    let newpro = {
            names: names.value,
            price: price.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
        }

    localStorage.setItem('product' , JSON.stringify(datapro));
    if(names.value != '' && newpro.count <= 99){
        if (mood == 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                    
                }
            }else {
                datapro.push(newpro);
            }
        }else {
            datapro[ tmp ] = newpro;
            mood = 'create';
            count.style.display= 'block';
            createbtn.innerHTML= 'create';
        }
        clearinputs()
    }
        
 

    
    showdata()


}

//read//

function showdata() {
    let table = '';

    for(let i = 0; i< datapro.length;i++){
        table += `
                          <tr>
                          <td>${i + 1}</td>
                        <td> ${datapro[i].names} </td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td><button onclick="updateObj( ${i})" >update</button></td>
                        <td><button onclick="deleteobj( ${i})" >delete</button></td> 
                    </tr>
 `;

    }

    document.getElementById('tbody').innerHTML = table;

    let deleteALL = document.getElementById('deleteALL');
    if (datapro.length > 2) {
        deleteALL.innerHTML = `
        <button onclick="deleteAll()"> delete all (${datapro.length}) </button>
        `;
       }else {
        deleteALL.innerHTML = '';
       }


}

//clear inputs//
function clearinputs(){
    names.value= '';
    price.value= '';
    discount.value= '';
    total.innerHTML= '';
    count.value= '';
}

//count//
//delete//
function deleteobj(i) {
    datapro.splice(i,1);
    localStorage.product = JSON.stringify( datapro);
    showdata();
}
function deleteAll() {
    datapro.splice(0);
    localStorage.clear();
    showdata()

}
//update//
function updateObj(i) {
    names.value = datapro[i].names;
    price.value = datapro[i].price;
    discount.value = datapro[i].discount;
    count.style.display= 'none';
    createbtn.innerHTML= 'update';
    getTotal();
    mood = 'update';
    tmp = i;
    scroll (
        {
            top:0,
        behavior:'smooth',
            }
    )
}
//search//
function searcho() {
    search.focus()
}
function searchdata(value) {
    let table = '';

    for (let i = 0; i < datapro.length; i++) {
        if (datapro[i].names.includes(value)){
            table += `
            <tr>
            <td>${i + 1}</td>
          <td> ${datapro[i].names} </td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td><button onclick="updateObj( ${i})" >update</button></td>
          <td><button onclick="deleteobj( ${i})" >delete</button></td> 
      </tr>
`;

        }
        
    }
    document.getElementById('tbody').innerHTML = table;
}
//clean data//
