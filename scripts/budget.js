document.getElementById("saveBudget").onclick=function(){
    let budget=Number(document.getElementById("monthlyBudget").value);

    if(!budget||budget<=0){
        alert("Enter a Valid budget Amount!");
        return;
    }

    localStorage.setItem("monthlyBudget",budget);
    updateBudgetUI();
    alert("Monthly Budget Saved!");
}

function getTotalSpent(){
    let expenses=JSON.parse(localStorage.getItem("expenses"))||[];
    let total=0;

    expenses.forEach(e=>{
        total+=Number(e.amount);
    });

    return total;
}

function updateBudgetUI(){
    let budget=Number(localStorage.getItem("monthlyBudget"))||0;
    let spent=getTotalSpent();
    let remaining=budget-spent;

    document.getElementById("budgetValue").innerText=budget;
    document.getElementById("spentValue").innerText=spent;
    document.getElementById("remainingValue").innerText=remaining>=0?remaining:0;

    let percent=budget>0?Math.min((spent/budget)*100,100):0;

    document.getElementById("progressFill").style.width=percent+"%";
    document.getElementById("progressPercent").innerText=Math.floor(percent)+"% Used";

    let status=document.getElementById("statusText");
    let alertBox=document.getElementById("budgetAlert");

    if(budget===0){
        status.innerText="No Budget set";
        alertBox.innerText="";
    }else if(spent<budget*0.8){
        status.innerText="Safe";
        alertBox.innerText="";
    }else if(spent<budget){
        status.innerText="Warning: Approaching limit!";
        alertBox.innerText="⚠ You've used more than 80% of your budget!";
    }else{
        status.innerText="Exceeded!";
        alertBox.innerText="❗ You have exceeded your monthly budget!";
    }

    loadRecentExpenses();
}

function loadRecentExpenses(){
    let expenses=JSON.parse(localStorage.getItem("expenses"))||[];

    expenses.sort((a,b)=>new Date(b.date)-new Date(a.date));

    let ul=document.getElementById("recentExpensesList");
    ul.innerHTML="";

    let lastFive=expenses.slice(0,5);

    lastFive.forEach(e=>{
        ul.innerHTML+=`<li>${e.title} -₹${e.amount} (${e.category}) on ${e.date}</li>`;
    });
}

document.getElementById("viewHistory").onclick=function(){
    window.location.href="./History.html";
}

updateBudgetUI();