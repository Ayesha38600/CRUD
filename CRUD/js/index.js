// alert()

//index="${index}" ...binding of index for delete

let Add_Employee = document.getElementById("Add_Employee");
let modal = document.querySelector(".modal");
let close_icon = document.querySelector(".close-icon");
let regList = document.querySelector(".reg-list");
let search = document.querySelector(".search");
let register_form = document.querySelector(".register-form");
let allBtn = register_form.querySelectorAll("BUTTON");
console.log(allBtn);

Add_Employee.addEventListener("click" , function name(params) {
    // alert()
    modal.style.opacity = 1; 
    
})
close_icon.addEventListener("click" , function name(params) {
    // alert()
    modal.style.opacity = 0; 
    
})


// 


let allInput = modal.querySelectorAll("input");
console.log(allInput);

let allRegisterData = [];


// for reload krny py v data na  jy .
// localStorage me data set k liye setItem and get k liye get 
if (localStorage.getItem("allRegisterData")!=null) {

    allRegisterData = JSON.parse(localStorage.getItem("allRegisterData"));
    console.log(allRegisterData);
}

// console.log(allRegisterData);

// ..........................



// adding data 
register_form.onsubmit = (e) =>{
    e.preventDefault();  //for no form reload
    let checkEmail = allRegisterData.find((data) =>data.email == allInput[4].value);
console.log(checkEmail);  // us email me undefined dega jo email ni hoga yani duplication ni hogy
if (checkEmail == undefined) {

       // console.log("success");

       allRegisterData.push({
        id : allInput[1].value , 
       name : allInput[2].value , 
        lastName : allInput[3].value , 
        email : allInput[4].value , 
        OfficeCode : allInput[5].value , 
        JobTitle : allInput[6].value , 
        prfile : url == "" ? "images.png" : url 
// profile ka index [0] ta and usko phly read krna hoga



    }) 

    localStorage.setItem("allRegisterData" , JSON.stringify(allRegisterData));
    swal.fire("Aysh Data Inserted" , "successfully !" , "success"); 
    register_form.reset("");
    getRegisterData();    //for inserting new data without reloading..
    allBtn[1].disabled = true
    allBtn[0].disabled = false





    
}else{
    swal.fire("Email Already Exists " , "Failed" , "Warning"); 
}


    
}

// read data 

const getRegisterData = () =>{    //this fn is for live update and del
    regList.innerHTML = "";   //+ hony sy phly uska innerhtml empty hojy data repeat na ho.
allRegisterData.forEach((data, index) =>{
    let  dataStr = JSON.stringify(data);
    let finalData = dataStr.replace(/"/g,"'");                //dual quote ko single quote sy  replace krdya q k data ni ara ta


    // console.log(data, index);   //poory array k index agy and data v ta k update and del ho
regList.innerHTML += `
<tr>
<td>${index+1}</td>
<td>${data.profile}</td>
<td>${data.id}</td>
<td>${data.name}</td>
<td>${data.lastName}</td>
<td>${data.email}</td>
<td>${data.OfficeCode}</td>
<td>${data.JobTitle}</td>
<td>
    <button ><i index="${index}"  data="${finalData}" class="edit-btn fas fa-edit"></i></button>         
    <button ><i index="${index}" class="del-btn fa fa-trash"></i></button>
</td>
</tr>



`




})
action();
}
// deletion

const action = () =>{
    //del coding

// alert()
let allDelBtn = regList.querySelectorAll(".del-btn");
// console.log(allDelBtn);
for(let btn of allDelBtn){
    btn.onclick =async() =>{


    let isConfirm = await confirm()
    if (isConfirm) {
        
let index = btn.getAttribute("index");
// alert(index)
allRegisterData.splice(index , 1)   //kitna del krna h jo k 1 h yani 1 del krna h
localStorage.setItem("allRegisterData" , JSON.stringify(allRegisterData)) 
getRegisterData(); //for live del
    }
    alert(isConfirm)
  
 
    }
}


//update coding
let allEditBtn = regList.querySelectorAll(".edit-btn");
for(let btn of allEditBtn) //q k multiple ediyt btn h isliyee chlya
{
    btn.onclick = () =>{
        let index = btn.getAttribute("index");
        let dataStr = btn.getAttribute("data");
     
        let finalData = dataStr.replace(/'/g,'"');    //json string dual quote me apply krty h isliye convert kia
        let data = JSON.parse(finalData);    //json obj bngya
        console.log(data);
        // alert(index)
        Add_Employee.click();

        allInput[1].value = data.id;   //is poory sy edit ka modal kholty hi sara enter kia hua data ajana h
        allInput[2].value = data.name;
        allInput[3].value = data.lastName;
        allInput[4].value = data.email;
        allInput[5].value = data.OfficeCode;
        allInput[6].value = data.JobTitle;
        url = data.prfile;
        allBtn[0].disabled = true
        allBtn[1].disabled = false


        allBtn[1].onclick = () =>{
            allRegisterData[index] = {
                id : allInput[1].value , 
               name : allInput[2].value , 
                lastName : allInput[3].value , 
                email : allInput[4].value , 
                OfficeCode : allInput[5].value , 
                JobTitle : allInput[6].value , 
                prfile : url == "" ? "images.png" : url 
        // profile ka index [0] ta and usko phly read krna hoga
        
        
        
            }
            localStorage.setItem("allRegisterData" , JSON.stringify(allRegisterData));
            swal.fire("Aysh Data Updated" , "successfully !" , "success"); 
            register_form.reset("");
            getRegisterData();    //for inserting new data without reloading

            allBtn[1].disabled = true
            allBtn[0].disabled = false
        }
       
    }
}
}




getRegisterData()










// reading profile
let url = "";
allInput[0].onchange = function (params) {
    // alert()
    // ab hum binary string of image save kry h url me
    let fileReader = new FileReader();  //instance of fileReader creat kia
    fileReader.readAsDataURL(allInput[0].files[0]);
    fileReader.onload = (e)=>{
        url = e.target.result;
        console.log(url);
        // ab isi ko upr push krdo 
    }
    
}












// let confirmation
const confirm =() =>{
  return new Promise((resolve, reject) =>{
   
    swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
          if (willDelete) {
            resolve(true)
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
            reject(false);
          swal("Your imaginary file is safe!");
        }
      });
  })

}





//searching data
search.oninput = () =>{
    searchh();

}
let searchh = () =>{
    // alert()
    let value = search.value.toLowerCase() ;
    // alert(value);
    let tr = regList.querySelectorAll("tr")
    console.log(tr);       //after serach tr will find
    for(i= 0 ; i<tr.length ; i++){
    let name = tr[i].querySelectorAll("td")[3].innerHTML; //name filtering bcx 3rd index is name
    let email = tr[i].querySelectorAll("td")[5].innerHTML; //email filtering bcx 5 index is email
    //   console.log(name);
    if (name.toLocaleLowerCase().indexOf(value)!=-1) {
        tr[i].style.display = "" 
        
    }
    else if (email.toLocaleLowerCase().indexOf(value)!=-1) {
        tr[i].style.display = "" 
        
    }
    else{
        tr[i].style.display = "none";   
    }

    }

}