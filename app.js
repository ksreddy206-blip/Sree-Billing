let menu = [
  { name: "Veg Pizza", price: 99, qty: 0 },
  { name: "Chicken Pizza", price: 149, qty: 0 },
  { name: "Burger", price: 79, qty: 0 },
  { name: "French Fries", price: 69, qty: 0 }
];

let discount = 0;
let printerDevice = null;

function renderMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  menu.forEach((item, index) => {
    menuDiv.innerHTML += `
      <div class="card">
        <div>
          <b>${item.name}</b><br>
          ₹${item.price}
        </div>
        <div class="qty">
          <button onclick="changeQty(${index}, -1)">-</button>
          ${item.qty}
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
    `;
  });

  updateTotal();
}

function changeQty(index, value) {
  menu[index].qty = Math.max(0, menu[index].qty + value);
  renderMenu();
}

function updateTotal() {
  let subtotal = menu.reduce((sum, item) => sum + item.price * item.qty, 0);
  let discountAmount = subtotal * (discount / 100);
  let total = subtotal - discountAmount;

  document.getElementById("subtotal").innerText = subtotal.toFixed(0);
  document.getElementById("discount").innerText = discount;
  document.getElementById("total").innerText = total.toFixed(0);
}

function openKeypad() {
  document.getElementById("keypad").style.display = "block";
}

function press(val) {
  document.getElementById("discountInput").value += val;
}

function applyDiscount() {
  discount = parseFloat(document.getElementById("discountInput").value) || 0;
  document.getElementById("discountInput").value = "";
  document.getElementById("keypad").style.display = "none";
  updateTotal();
}

async function connectPrinter() {
  alert("Select your Bluetooth printer");
  printerDevice = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true
  });
}

function printBill() {
  let receipt = "SREE BILLING\n----------------\n";

  menu.forEach(item => {
    if (item.qty > 0) {
      receipt += `${item.name} ${item.qty} x ${item.price}\n`;
    }
  });

  receipt += "----------------\n";
  receipt += `TOTAL: ₹${document.getElementById("total").innerText}\n`;
  receipt += "Thank You\n";

  alert("Printer connected.\n\n" + receipt);
}

renderMenu();
