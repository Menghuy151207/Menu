import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, onValue, remove, push } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDJMI-adoL5fYq8Fdkb1uTimjoDmMYK_Dg",
    authDomain: "food-menu-fd176.firebaseapp.com",
    databaseURL: "https://food-menu-fd176-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "food-menu-fd176",
    storageBucket: "food-menu-fd176.firebasestorage.app",
    messagingSenderId: "575355197591",
    appId: "1:575355197591:web:261ebf2437cdc32daef1d2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// --- SECURITY & LOGIN LOGIC ---
const loginOverlay = document.getElementById('loginOverlay');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const btnLogout = document.getElementById('btnLogout');

// Check if user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in -> Hide login screen & load data
        loginOverlay.classList.add('hidden');
        loadDashboardData(); 
    } else {
        // User is NOT logged in -> Show login screen
        loginOverlay.classList.remove('hidden');
    }
});

// Handle Login Button Click
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                loginError.style.display = 'none'; // Clear error on success
            })
            .catch((error) => {
                loginError.style.display = 'block'; // Show error message
                console.error("Login error:", error.message);
            });
    });
}

// Handle Logout Button Click
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        signOut(auth).then(() => {
            // It will automatically trigger onAuthStateChanged and show the login screen
            window.location.reload(); 
        });
    });
}

// --- STATE VARIABLES ---
let globalOrders = {};
let isFirstLoad = true;
let existingOrderKeys = new Set();

function showNewOrderAlert(tableInfo) {
    const banner = document.getElementById('alertBanner');
    if (!banner) return;
    banner.innerText = `🚨 NEW ORDER! Table: ${tableInfo}`;
    banner.style.display = 'block';
    setTimeout(() => { banner.style.display = 'none'; }, 6000);
}

// --- MAIN DASHBOARD LOGIC (Runs only after login) ---
function loadDashboardData() {
    
    // 1. LIVE ORDERS LISTENER
    onValue(ref(db, 'orders/'), (snapshot) => {
        const data = snapshot.val();
        const grid = document.getElementById('ordersGrid');
        if (grid) grid.innerHTML = '';
        
        let pendingCount = 0;
        let revenue = 0;
        globalOrders = data || {};

        if (!data) {
            document.getElementById('pendingCount').innerText = "0";
            document.getElementById('revenueTotal').innerText = "0.00";
            isFirstLoad = false;
            return;
        }

        Object.keys(data).forEach(key => {
            const order = data[key];
            pendingCount++;
            revenue += parseFloat(order.total || 0);

            if (!isFirstLoad && !existingOrderKeys.has(key)) {
                showNewOrderAlert(order.customer || 'Unknown');
            }
            existingOrderKeys.add(key);

            const itemsHtml = (order.items || []).map(item => `
                <div class="item-row">
                    <div>
                        <span class="item-qty">${item.qty}x</span> 
                        ${item.name}
                    </div>
                    <div>
                        $${(parseFloat(item.price) * item.qty).toFixed(2)}
                    </div>
                </div>
            `).join('');

            if (grid) {
                grid.innerHTML = `
                    <div class="order-card">
                        <div class="order-header">
                            <span class="order-id">
                                ${order.id} <br>
                                <small style="color:var(--primary)">Table: ${order.customer || 'Unknown'}</small>
                            </span>
                            <span class="order-time">${order.time || 'New'}</span>
                        </div>
                        <div>${itemsHtml}</div>
                        <div class="order-total">
                            <span>Total</span>
                            <span>$${parseFloat(order.total).toFixed(2)}</span>
                        </div>
                        <div class="action-buttons">
                            <button class="btn btn-print" data-key="${key}">Print</button>
                            <button class="btn btn-done" data-key="${key}">Done</button>
                        </div>
                    </div>
                ` + grid.innerHTML;
            }
        });

        document.getElementById('pendingCount').innerText = pendingCount;
        document.getElementById('revenueTotal').innerText = revenue.toFixed(2);
        isFirstLoad = false; 
    });

    // 2. ORDER BUTTONS (DONE / PRINT)
    const ordersGrid = document.getElementById('ordersGrid');
    if (ordersGrid) {
        ordersGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-done')) {
                const key = e.target.getAttribute('data-key');
                if(confirm("Mark order as done?")) {
                    remove(ref(db, 'orders/' + key));
                    existingOrderKeys.delete(key); 
                }
            }
            
            if (e.target.classList.contains('btn-print')) {
                const key = e.target.getAttribute('data-key');
                const order = globalOrders[key];
                if(!order) return;

                const itemsHtml = (order.items || []).map(item => `
                    <tr>
                        <td style="width: 15%; font-weight: bold;">${item.qty}x</td>
                        <td style="width: 60%;">${item.name}</td>
                        <td style="text-align: right;">$${(parseFloat(item.price) * item.qty).toFixed(2)}</td>
                    </tr>
                `).join('');

                const receiptHTML = `
                    <div class="receipt-center">
                        <h2 style="margin:0;">ONE SHOT</h2>
                        <p style="margin:5px 0;">Table: ${order.customer || 'Unknown'}</p>
                        <p style="margin:5px 0;">Order #: ${order.id}</p>
                        <p style="margin:5px 0;">Time: ${order.time}</p>
                    </div>
                    <div class="receipt-dashed"></div>
                    <table>${itemsHtml}</table>
                    <div class="receipt-dashed"></div>
                    <table>
                        <tr>
                            <td style="font-weight:bold; font-size:16px;">TOTAL</td>
                            <td style="text-align:right; font-weight:bold; font-size:16px;">$${parseFloat(order.total).toFixed(2)}</td>
                        </tr>
                    </table>
                    <div class="receipt-center" style="margin-top:20px; font-size:12px;">
                        Thank you! Please come again.
                    </div>
                `;

                document.getElementById('printArea').innerHTML = receiptHTML;
                setTimeout(() => { window.print(); }, 150);
            }
        });
    }

    // 3. IMAGE UPLOAD PROCESSING
    const itemImgInput = document.getElementById('itemImg');
    const fileNameDisplay = document.getElementById('fileName');
    const imgPreview = document.getElementById('imgPreview');
    const previewImage = document.getElementById('previewImage');
    let currentBase64Image = "";

    if (itemImgInput) {
        itemImgInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                fileNameDisplay.textContent = file.name;
                const reader = new FileReader();
                reader.onload = function(e) {
                    currentBase64Image = e.target.result;
                    previewImage.src = currentBase64Image;
                    imgPreview.style.display = 'block';
                }
                reader.readAsDataURL(file); // Converts image to Base64 string
            } else {
                fileNameDisplay.textContent = 'Choose an image from gallery...';
                currentBase64Image = "";
                imgPreview.style.display = 'none';
            }
        });
    }

    // 4. ADD MENU ITEM LOGIC
    const addMenuForm = document.getElementById('addMenuForm');
    if (addMenuForm) {
        addMenuForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newItem = {
                name: document.getElementById('itemName').value,
                price: parseFloat(document.getElementById('itemPrice').value),
                img: currentBase64Image, // Save the base64 string to database
                category: document.getElementById('itemCategory').value
            };

            push(ref(db, 'menu/'), newItem)
                .then(() => {
                    alert("Menu item added successfully to Firebase!");
                    document.getElementById('addMenuForm').reset();
                    // Reset image UI after successful upload
                    fileNameDisplay.textContent = 'Choose an image from gallery...';
                    currentBase64Image = "";
                    imgPreview.style.display = 'none';
                })
                .catch(err => {
                    alert("Error adding item: " + err);
                });
        });
    }

    // 5. MANAGE MENU LISTENER
    onValue(ref(db, 'menu/'), (snapshot) => {
        const data = snapshot.val();
        const menuList = document.getElementById('adminMenuList');
        
        if (!menuList) return; 

        if (!data) {
            menuList.innerHTML = '<p style="color: var(--text-muted);">No items in database yet.</p>';
            return;
        }

        menuList.innerHTML = Object.keys(data).map(key => {
            const item = data[key];
            return `
                <div class="admin-menu-item">
                    <div class="admin-menu-info">
                        <span class="admin-menu-name">${item.name}</span>
                        <span class="admin-menu-price">$${parseFloat(item.price).toFixed(2)} - ${item.category}</span>
                    </div>
                    <button class="btn-delete-menu" data-menukey="${key}">Delete</button>
                </div>
            `;
        }).join('');
    });

    // 6. DELETE MENU ITEM BUTTON
    const adminMenuListElement = document.getElementById('adminMenuList');
    if (adminMenuListElement) {
        adminMenuListElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-delete-menu')) {
                const key = e.target.getAttribute('data-menukey');
                
                if(confirm("Are you sure you want to permanently delete this item from the menu?")) {
                    remove(ref(db, 'menu/' + key))
                        .then(() => alert("Item removed from database."))
                        .catch(err => alert("Error removing item: " + err));
                }
            }
        });
    }
}