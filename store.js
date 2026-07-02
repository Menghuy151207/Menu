import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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

// 1. Start with completely empty arrays (No default menu)
window.menuData = []; 
window.cart = [];
let currentCategory = 'all';

// 2. Fetch Real-time Menu from Firebase
onValue(ref(db, 'menu/'), (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
        // If items exist in Firebase, convert them to an array
        window.menuData = Object.keys(data).map(key => {
            return { id: key, ...data[key] };
        });
    } else {
        // If the database is totally empty, make sure the array is empty
        window.menuData = [];
    }
    
    // Refresh the screen
    const activeBtn = document.querySelector('.tab-btn.active');
    window.filterCategory(currentCategory, activeBtn);
});

// 3. Render Menu UI
window.renderMenu = function(items) {
    const grid = document.getElementById('menuGrid');
    
    // Improved Empty State Message
    if (!items || items.length === 0) {
        grid.innerHTML = `
            <p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-gray); font-size: 1.1rem;">
                No items available right now.
            </p>`;
        return;
    }

    grid.innerHTML = items.map(item => `
        <div class="card">
            <img src="${item.img || 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&q=80'}" alt="${item.name}">
            <div class="card-body">
                <div>
                    <div class="card-title">${item.name}</div>
                    <div class="card-desc">${item.desc || ''}</div>
                </div>
                <div class="card-footer">
                    <span class="price">$${parseFloat(item.price).toFixed(2)}</span>
                    <button class="add-btn" onclick="window.add('${item.id}')"><i class="fas fa-plus"></i> Add</button>
                </div>
            </div>
        </div>
    `).join('');
}

window.filterCategory = function(category, btnElement) {
    currentCategory = category;
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');

    let filteredItems = window.menuData;
    if (category !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === category);
    }

    const searchTerm = document.getElementById('search').value.toLowerCase();
    if (searchTerm) {
        filteredItems = filteredItems.filter(i => 
            i.name.toLowerCase().includes(searchTerm) || 
            (i.desc && i.desc.toLowerCase().includes(searchTerm))
        );
    }
    
    window.renderMenu(filteredItems);
}

document.getElementById('search').addEventListener('input', () => {
    const activeBtn = document.querySelector('.tab-btn.active');
    window.filterCategory(currentCategory, activeBtn);
});

window.toggleCart = function() {
    document.getElementById('cartPanel').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
}

window.add = function(id) {
    const item = window.menuData.find(i => String(i.id) === String(id)); 
    if (!item) return;
    
    const exists = window.cart.find(c => String(c.id) === String(id));
    if (exists) {
        exists.qty++; 
    } else {
        window.cart.push({...item, qty: 1});
    }
    
    window.updateCart();
    
    if(!document.getElementById('cartPanel').classList.contains('open')) {
        window.toggleCart();
    }
}

window.updateQty = function(id, change) {
    const item = window.cart.find(c => String(c.id) === String(id));
    if(item) {
        item.qty += change;
        if(item.qty <= 0) {
            window.cart = window.cart.filter(c => String(c.id) !== String(id));
        }
        window.updateCart();
    }
}

window.updateCart = function() {
    const body = document.getElementById('cartBody');
    let total = 0;
    let count = 0;
    
    if(window.cart.length === 0) {
        body.innerHTML = `<p style="text-align:center; color:#8E8E93; margin-top:20px;">Cart is empty.</p>`;
    } else {
        body.innerHTML = window.cart.map(item => {
            total += parseFloat(item.price) * item.qty;
            count += item.qty;
            return `
                <div class="cart-item">
                    <img src="${item.img || 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&q=80'}">
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price">$${parseFloat(item.price).toFixed(2)} each</div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:5px;">
                            <div style="font-weight:bold; color:#1C1C1E;">$${(item.price * item.qty).toFixed(2)}</div>
                            <div class="qty-controls">
                                <button onclick="window.updateQty('${item.id}', -1)">-</button>
                                <span>${item.qty}</span>
                                <button onclick="window.updateQty('${item.id}', 1)">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    document.getElementById('cartTotal').innerText = `$${total.toFixed(2)}`;
    
    const badge = document.getElementById('cartBadge');
    badge.style.display = count > 0 ? 'flex' : 'none';
    badge.innerText = count;
}

// -----------------------------------------------------
// CHECKOUT LOGIC (2-DIGIT TABLE NUMBER)
// -----------------------------------------------------
document.getElementById('btnCheckout').addEventListener('click', () => {
    
    if (window.cart.length === 0) {
        return alert("Cart is empty!");
    }
    
    let tableNumber = prompt("Enter your Table Number:");
    if (tableNumber === null) return;

    while (!/^\d{1,2}$/.test(tableNumber)) {
        tableNumber = prompt("Invalid input! Please enter a valid Table Number using numbers only (e.g., 5 or 12):");
        if (tableNumber === null) return;
    }

    const rawTotal = document.getElementById('cartTotal').innerText;
    const totalValue = parseFloat(rawTotal.replace('$', ''));

    const newOrder = {
        id: "ORD-" + Math.floor(Math.random() * 9000 + 1000),
        customer: tableNumber, 
        items: window.cart.map(i => {
            return { 
                name: i.name, 
                qty: i.qty, 
                price: i.price 
            };
        }),
        total: totalValue,
        time: new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        })
    };

    push(ref(db, 'orders/'), newOrder)
        .then(() => {
            alert(`Order for Table ${tableNumber} success!`);
            window.cart.length = 0; 
            window.updateCart();
            window.toggleCart();
        })
        .catch(err => {
            alert("Error: " + err);
        });
});

// Initial render (Will show "No items available" until Firebase loads)
window.renderMenu(window.menuData);