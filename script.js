// ----------------- Variables -----------------
let currentUser = null;
let users = JSON.parse(localStorage.getItem("users")) || {}; 
// structure: { "doobla": { pin: "1234", balance: 0, transactions: [] } }

const loginSection = document.getElementById("loginSection");
const accountSection = document.getElementById("accountSection");

const usernameEl = document.getElementById("username");
const pinEl = document.getElementById("pin");
const loginBtn = document.getElementById("loginBtn");

const userDisplay = document.getElementById("userDisplay");
const balanceEl = document.getElementById("balance");
const descEl = document.getElementById("desc");
const amountEl = document.getElementById("amount");
const typeEl = document.getElementById("type");
const addBtn = document.getElementById("addBtn");
const listEl = document.getElementById("list");
const logoutBtn = document.getElementById("logoutBtn");

// ----------------- Login -----------------
loginBtn.addEventListener("click", () => {
  const username = usernameEl.value.trim();
  const pin = pinEl.value.trim();

  if (!username || !pin) {
    alert("Enter username and PIN");
    return;
  }

  // If new user, create account
  if (!users[username]) {
    users[username] = { pin: pin, balance: 0, transactions: [] };
  }

  // If existing user, check PIN
  if (users[username].pin !== pin) {
    alert("Wrong PIN!");
    return;
  }

  currentUser = username;
  localStorage.setItem("users", JSON.stringify(users));

  showAccount();
});

// ----------------- Show Account -----------------
function showAccount() {
  loginSection.style.display = "none";
  accountSection.style.display = "block";

  userDisplay.textContent = currentUser;
  renderAccount();
}

// ----------------- Render Account -----------------
function renderAccount() {
  const user = users[currentUser];
  balanceEl.textContent = user.balance;
  listEl.innerHTML = "";

  user.transactions.forEach(tx => {
    const li = document.createElement("li");
    li.textContent = `${tx.desc} : ${tx.amount} ₹`;
    li.classList.add(tx.type);
    listEl.appendChild(li);
  });
}

// ----------------- Add Transaction -----------------
addBtn.addEventListener("click", () => {
  const desc = descEl.value.trim();
  const amount = Number(amountEl.value);
  const type = typeEl.value;

  if (!desc || !amount) {
    alert("Enter description and amount");
    return;
  }

  const user = users[currentUser];

  if (type === "credit") {
    user.balance += amount;
  } else {
    user.balance -= amount;
  }

  user.transactions.push({ desc, amount, type });
  users[currentUser] = user;
  localStorage.setItem("users", JSON.stringify(users));

  renderAccount();

  descEl.value = "";
  amountEl.value = "";
});

// ----------------- Logout -----------------
logoutBtn.addEventListener("click", () => {
  currentUser = null;
  accountSection.style.display = "none";
  loginSection.style.display = "block";
  usernameEl.value = "";
  pinEl.value = "";
});
