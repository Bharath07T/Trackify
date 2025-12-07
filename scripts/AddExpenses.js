let expensesform=document.getElementById("expensesform");

expensesform.addEventListener('submit',(evnt)=>{
    evnt.preventDefault();

    let title=document.getElementById("title").value.trim();
    let amount=document.getElementById("amount").value.trim();
    let category=document.getElementById("category").value.trim();
    let date=document.getElementById("date").value.trim();
    let notes=document.getElementById("notes").value.trim();

    let titleEr=document.getElementById("titleEr");
    let amountEr=document.getElementById("amountEr");
    let categoryEr=document.getElementById("categoryEr");
    let dateEr=document.getElementById("dateEr");

    let titlePattern=/^[A-Za-z]{2,}$/;
    let isValid=true;

    if(title===""){
        titleEr.innerText="Please enter a Title";
        isValid=false;
    }else if(!titlePattern.test(title)){
        titleEr.innerText="Please enter a valid Title";
        isValid=false;
    }else titleEr.innerText="";

    if(amount===""){
        amountEr.innerText="Please enter the amount";
        isValid=false;
    }else amountEr.innerText="";

    if(category==="select a category"){
        categoryEr.innerText="Please select a category";
        isValid=false;
    }else categoryEr.innerText="";

    if(date===""){
        dateEr.innerText="Please select a Date"
        isValid=false;
    }else dateEr.innerText="";

    if(isValid){
        let expenses=JSON.parse(localStorage.getItem("expenses"))||[];
        let editIndex=localStorage.getItem("editIndex");

        if(editIndex!==null){
            expenses[editIndex]={
                title,
                amount,
                category,
                date,
                notes
            };

            localStorage.removeItem("editIndex");
            alert("Expense Updated Successfuly!");
        }else{
        expenses.push({
        title:title,
        amount:amount,
        category:category,
        date:date,
        notes:notes
        });

        alert("Expense Stored");
    }

    localStorage.setItem("expenses",JSON.stringify(expenses));

    window.location.href="./History.html";
    }
});

window.onload=function(){
    let editIndex=localStorage.getItem("editIndex");

    if(editIndex!=null){
        let expenses=JSON.parse(localStorage.getItem("expenses"))||[];
        let expense=expenses[editIndex];

        document.getElementById("title").value=expense.title;
        document.getElementById("amount").value=expense.amount;
        document.getElementById("category").value=expense.category;
        document.getElementById("date").value=expense.date;
        document.getElementById("notes").value=expense.notes;

        document.getElementById("submitbtn").innerText="Update Expense";
    }
}

const categorySelect = document.getElementById("category");
let defaultCategories = ["Food", "Travel", "Shopping", "Bills", "Others"];
let customCategories = JSON.parse(localStorage.getItem("categories")) || [];

function loadCategories() {
    categorySelect.innerHTML = `<option value="">-- Select a Category --</option>`;

    [...defaultCategories, ...customCategories].forEach(cat => {
        let option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

loadCategories();