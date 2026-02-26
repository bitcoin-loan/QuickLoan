// REGISTER FUNCTION
const registerForm = document.querySelector("form");

if (window.location.pathname.includes("register.html")) {

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = registerForm.querySelectorAll("input");

        const fullName = inputs[0].value;
        const email = inputs[1].value;
        const phone = inputs[2].value;
        const password = inputs[3].value;
        const confirmPassword = inputs[4].value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = {
            fullName,
            email,
            phone,
            password,
            balance: 0,
            loan: null
        };

        localStorage.setItem(email, JSON.stringify(user));

        alert("Registration successful! Please login.");
        window.location.href = "login.html";
    });
}
// REGISTER LOGIC
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent page reload

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        firebaseRegister(email, password);
    });
}

// Function to register user with Firebase
function firebaseRegister(email, password) {
    import("https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js").then(({ getAuth, createUserWithEmailAndPassword }) => {
        const auth = window.auth; // we initialized this in register.html
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Registration successful! Please login.");
                window.location.href = "login.html";
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}

// LOGIN FUNCTION
if (window.location.pathname.includes("login.html")) {

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = registerForm.querySelectorAll("input");

        const email = inputs[0].value;
        const password = inputs[1].value;

        const storedUser = localStorage.getItem(email);

        if (!storedUser) {
            alert("User not found!");
            return;
        }

        const user = JSON.parse(storedUser);

        if (user.password !== password) {
            alert("Incorrect password!");
            return;
        }

        localStorage.setItem("loggedInUser", email);

        alert("Login successful!");
        window.location.href = "dashboard.html";
    });
}


// DASHBOARD DISPLAY
if (window.location.pathname.includes("dashboard.html")) {

    const loggedInEmail = localStorage.getItem("loggedInUser");

    if (!loggedInEmail) {
        window.location.href = "login.html";
    }

    const user = JSON.parse(localStorage.getItem(loggedInEmail));

    document.querySelector(".dashboard h1").innerText =
        "Welcome, " + user.fullName;

    const cards = document.querySelectorAll(".card p");

    cards[0].innerText = "$" + user.balance.toFixed(2);

    if (user.loan) {
        cards[1].innerText = "$" + user.loan.amount + " - Active";
    } else {
        cards[1].innerText = "No active loan";
    }
}
const loanHistoryBody = document.getElementById("loanHistoryBody");
if (loanHistoryBody) {
    loanHistoryBody.innerHTML = ""; // Clear table first

    if (user.loans && user.loans.length > 0) {
        user.loans.forEach((loan, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>$${loan.principal}</td>
                <td>$${(loan.amount - loan.principal).toFixed(2)}</td>
                <td>$${loan.amount}</td>
                <td>${loan.duration}</td>
                <td>${loan.status}</td>
            `;
            loanHistoryBody.appendChild(row);
        });
    }
}

<!-- LOAN HISTORY -->
<section class="loan-history">
    <h2>Your Loan History</h2>
    <table>
        <thead>
            <tr>
                <th>Amount (USD)</th>
                <th>Interest (5%)</th>
                <th>Total to Repay</th>
                <th>Duration (Days)</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody id="loanHistoryBody">
            <!-- Loan history dynamically added here -->
        </tbody>
    </table>
</section>
// LOAN APPLICATION FUNCTIONALITY
if (window.location.pathname.includes("apply-loan.html")) {

    const applyForm = document.querySelector("form");
    const loggedInEmail = localStorage.getItem("loggedInUser");

    if (!loggedInEmail) {
        window.location.href = "login.html";
    }

    applyForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = applyForm.querySelectorAll("input, select, textarea");

        const amount = parseFloat(inputs[0].value);
        const duration = parseInt(inputs[1].value); // days
        const purpose = inputs[2].value;

        if (isNaN(amount) || amount <= 0) {
            alert("Enter a valid loan amount!");
            return;
        }
const calcAmount = document.getElementById("calcAmount");
const calcDuration = document.getElementById("calcDuration");
const totalRepayEl = document.getElementById("totalRepay");

function updateTotal() {
    const amount = parseFloat(calcAmount.value);
    if (!amount || !calcDuration.value) {
        totalRepayEl.innerText = "$0.00";
        return;
    }
    const interest = amount * 0.05;
    const total = amount + interest;
    totalRepayEl.innerText = "$" + total.toFixed(2);
}

if (calcAmount && calcDuration) {
    calcAmount.addEventListener("input", updateTotal);
    calcDuration.addEventListener("change", updateTotal);
}
        if (window.location.pathname.includes("apply-loan.html")) {

    const applyForm = document.querySelector("form");
    const loggedInEmail = localStorage.getItem("loggedInUser");
    if (!loggedInEmail) window.location.href = "login.html";

    applyForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = applyForm.querySelectorAll("input, select, textarea");
        const amount = parseFloat(inputs[0].value);
        const duration = parseInt(inputs[1].value);
        const purpose = inputs[2].value;

        if (isNaN(amount) || amount <= 0) { alert("Enter a valid amount!"); return; }

        const interestRate = 0.05;
        const totalRepay = amount + amount * interestRate;

        const user = JSON.parse(localStorage.getItem(loggedInEmail));
        if (!user.loans) user.loans = [];

        const newLoan = {
            principal: amount.toFixed(2),
            amount: totalRepay.toFixed(2),
            duration: duration,
            purpose: purpose,
            status: "Active",
            date: new Date().toLocaleDateString()
        };

        user.loans.push(newLoan);
        user.balance += amount;
        localStorage.setItem(loggedInEmail, JSON.stringify(user));

        alert("Loan approved! Amount added to your account.");
        window.location.href = "dashboard.html";
    });
}
        // Simple interest rate: 5%
        const interestRate = 0.05;
        const totalRepay = amount + amount * interestRate;

        const user = JSON.parse(localStorage.getItem(loggedInEmail));

        if (user.loan) {
            alert("You already have an active loan!");
            return;
        }

        user.loan = {
            amount: totalRepay.toFixed(2),
            principal: amount.toFixed(2),
            duration: duration,
            purpose: purpose,
            status: "Active"
        };

        // Update user balance with loan amount
        user.balance += amount;

        localStorage.setItem(loggedInEmail, JSON.stringify(user));

        alert("Loan approved! Amount added to your account.");
        window.location.href = "dashboard.html";
    });
}
// LOGOUT FUNCTIONALITY
const logoutLinks = document.querySelectorAll('a[href="index.html"], a[href="login.html"]');

logoutLinks.forEach(link => {
    link.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
    });
});


// DASHBOARD REPAYMENT FUNCTIONALITY
if (window.location.pathname.includes("dashboard.html")) {

    const loggedInEmail = localStorage.getItem("loggedInUser");
    if (!loggedInEmail) {
        window.location.href = "login.html";
    }

    const user = JSON.parse(localStorage.getItem(loggedInEmail));

    document.querySelector(".dashboard h1").innerText =
        "Welcome, " + user.fullName;

    const cards = document.querySelectorAll(".card p");
    cards[0].innerText = "$" + user.balance.toFixed(2);

    if (user.loan) {
        cards[1].innerHTML = `$${user.loan.amount} - Active <button id="repayBtn" class="btn" style="margin-top:10px;">Repay Loan</button>`;
    } else {
        cards[1].innerText = "No active loan";
    }
    // Repay Loan Button
    const repayBtn = document.getElementById("repayBtn");
    if (repayBtn) {
        repayBtn.addEventListener("click", () => {

            if (user.balance < user.loan.amount) {
                alert("Insufficient balance to repay loan!");
                return;
            }

            user.balance -= parseFloat(user.loan.amount);
            user.loan = null;

            localStorage.setItem(loggedInEmail, JSON.stringify(user));

            alert("Loan repaid successfully!");
            location.reload();
        });
    }
}
