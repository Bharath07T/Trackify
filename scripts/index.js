// Get stored expenses
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// ---------- TOTAL EXPENSES ----------
let total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
document.getElementById("totalExpenses").textContent = "₹" + total;

// ---------- TODAY SPENDING ----------
let today = new Date().toISOString().split("T")[0];
let todayAmount = expenses
    .filter(e => e.date === today)
    .reduce((s, e) => s + Number(e.amount), 0);

document.getElementById("todaySpending").textContent = "₹" + todayAmount;

// ---------- MONTH SPENDING ----------
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();

let monthAmount = expenses
    .filter(e => {
        let d = new Date(e.date);
        return d.getMonth() + 1 === month && d.getFullYear() === year;
    })
    .reduce((s, e) => s + Number(e.amount), 0);

document.getElementById("monthSpending").textContent = "₹" + monthAmount;

// ---------- REMAINING BUDGET ----------
let budget = Number(localStorage.getItem("monthlyBudget")) || 0;
let remaining = budget - monthAmount;

document.getElementById("remainingBudget").textContent =
    budget === 0 ? "No budget set" : "₹" + remaining;

// ---------- RECENT 5 TRANSACTIONS ----------
let recent = expenses.slice(-5).reverse();

let ul = document.getElementById("recentList");
ul.innerHTML = "";

recent.forEach(e => {
    let li = document.createElement("li");

    li.innerHTML = `
        <span><b>${e.title}</b> (${e.category})</span>
        <span>₹${e.amount}</span>
    `;

    ul.appendChild(li);
});

function loadCalendar() {
    const calendarGrid = document.getElementById("calendarGrid");
    calendarGrid.innerHTML = "";

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1).getDay(); 
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Load expenses
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Create blank cells before start day
    for (let i = 0; i < firstDay; i++) {
        calendarGrid.appendChild(document.createElement("div"));
    }

    // Create day cells
    for (let day = 1; day <= totalDays; day++) {
        let cell = document.createElement("div");
        cell.className = "calendar-cell slide-up";

        cell.innerHTML = `<strong>${day}</strong>`;

        // check if this date has expenses
        const dayStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

        let dayTotal = expenses
            .filter(e => e.date === dayStr)
            .reduce((sum, e) => sum + Number(e.amount), 0);

        if (dayTotal > 0) {
            cell.innerHTML += `<div class="expense-amount">₹${dayTotal}</div>`;
        }

        calendarGrid.appendChild(cell);
    }
}

loadCalendar();