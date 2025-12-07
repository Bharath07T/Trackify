let historycard = document.getElementById("displaycard");

document.getElementById("applyFilters").onclick = displayExpenses;
document.getElementById("sortType").onchange = displayExpenses;

function getFilteredExpenses() {
    const all = JSON.parse(localStorage.getItem("expenses")) || [];

    let expenses = all.map((e, i) => ({ ...e, _origIndex: i }));

    const category = document.getElementById("filterCategory").value;
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;
    const maxAmount = document.getElementById("maxAmount").value;
    const minAmount = document.getElementById("minAmount").value;

    if (category) {
        expenses = expenses.filter(e => e.category === category);
    }

    if (fromDate) {
        let from = new Date(fromDate);
        expenses = expenses.filter(e => {
            if (!e.date) return false;
            return new Date(e.date) >= from;
        });
    }
    if (toDate) {
        let to = new Date(toDate);
        expenses = expenses.filter(e => {
            if (!e.date) return false;
            return new Date(e.date) <= to;
        });
    }

    if (minAmount !== "" && minAmount !== null && minAmount !== undefined) {
        const min = Number(minAmount);
        if (!Number.isNaN(min)) {
            expenses = expenses.filter(e => Number(e.amount) >= min);
        }
    }
    if (maxAmount !== "" && maxAmount !== null && maxAmount !== undefined) {
        const max = Number(maxAmount);
        if (!Number.isNaN(max)) {
            expenses = expenses.filter(e => Number(e.amount) <= max);
        }
    }

    return expenses;
}

document.getElementById("resetFilters").onclick = resetFilters;

function resetFilters() {
    document.getElementById("filterCategory").value = "";
    document.getElementById("fromDate").value = "";
    document.getElementById("toDate").value = "";
    document.getElementById("minAmount").value = "";
    document.getElementById("maxAmount").value = "";

    displayExpenses();
}

function applySorting(list) {
    const sortType = document.getElementById("sortType").value;

    const copy = list.slice();

    if (sortType === "newest") {
        return copy.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    if (sortType === "oldest") {
        return copy.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    if (sortType === "high") {
        return copy.sort((a, b) => Number(b.amount) - Number(a.amount));
    }
    if (sortType === "low") {
        return copy.sort((a, b) => Number(a.amount) - Number(b.amount));
    }

    return copy;
}

function displayExpenses() {
    const ul = document.getElementById("historylist");
    ul.innerHTML = "";

    let expenses = getFilteredExpenses();
    expenses = applySorting(expenses);

    if (expenses.length === 0) {
        ul.innerHTML = "<li>No expenses found.</li>";
        return;
    }

    expenses.forEach((e) => {
        ul.innerHTML += `
            <li>
                <div>
                  <strong>${escapeHtml(e.title)}</strong> &nbsp; ₹${escapeHtml(e.amount)} &nbsp;
                  <em>${escapeHtml(e.category)}</em> &nbsp; (${escapeHtml(e.date)})
                </div>
                <div>${escapeHtml(e.notes)}</div>
                <div style="margin-top:6px;">
                  <button class="delete-btn" onclick="deleteExpense(${e._origIndex})">Del</button>
                  <button class="edit-btn" onclick="editExpenses(${e._origIndex})">Edit</button>
                </div>
            </li>
        `;
    });
}

displayExpenses();

function deleteExpense(origIndex) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    if (origIndex < 0 || origIndex >= expenses.length) return;
    expenses.splice(origIndex, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}

function editExpenses(origIndex) {
    localStorage.setItem("editIndex", origIndex);
    window.location.href = "./AddExpense.html";
}

function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
