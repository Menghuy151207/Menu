const menu = [
    // Local & Asian Favorites (Food)
    { id: 1, name: "Beef Lok Lak", desc: "Stir-fried marinated beef with peppery lime dip and rice.", price: 6.50, img: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&q=80" },
    { id: 2, name: "Fish Amok", desc: "Traditional steamed coconut fish curry in banana leaves.", price: 7.00, img: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&q=80" },
    { id: 3, name: "Kuy Teav", desc: "Pork broth noodle soup with minced meat and herbs.", price: 4.50, img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&q=80" },
    { id: 4, name: "Bai Sach Chrouk", desc: "Grilled pork over broken rice with pickled cucumbers.", price: 4.00, img: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&q=80" },
    { id: 5, name: "Nom Banh Chok", desc: "Khmer noodles topped with traditional green fish gravy.", price: 3.50, img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&q=80" },
    { id: 6, name: "Fried Spring Rolls", desc: "Crispy rolls stuffed with pork, taro, and glass noodles.", price: 3.00, img: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&q=80" },
    { id: 7, name: "Fresh Summer Rolls", desc: "Shrimp and fresh veggies wrapped in rice paper.", price: 3.50, img: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&q=80" },
    { id: 8, name: "Lemongrass Chicken", desc: "Stir-fried chicken with lemongrass and chili.", price: 5.50, img: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&q=80" },
    { id: 9, name: "Basil Fried Rice", desc: "Spicy fried rice with holy basil and topped with a fried egg.", price: 5.00, img: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=500&q=80" },
    { id: 10, name: "Tom Yum Soup", desc: "Spicy and sour prawn soup with mushrooms and herbs.", price: 6.50, img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&q=80" },

    // Burgers & Sandwiches (Food)
    { id: 11, name: "Classic Cheeseburger", desc: "Beef patty, cheddar, lettuce, tomato, and house sauce.", price: 8.99, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
    { id: 12, name: "Double Smashburger", desc: "Two smashed beef patties, double cheese, pickles.", price: 11.99, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
    { id: 13, name: "Spicy Volcano Burger", desc: "Premium beef, habanero aioli, pepper jack cheese.", price: 12.50, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
    { id: 14, name: "BBQ Bacon Burger", desc: "Beef patty, crispy bacon, onion rings, BBQ sauce.", price: 13.00, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
    { id: 15, name: "Crispy Chicken Sandwich", desc: "Fried chicken breast, spicy mayo, pickles.", price: 9.50, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
    { id: 16, name: "Chicken Nuggets (10pc)", desc: "Golden fried nuggets with a choice of dipping sauce.", price: 6.00, img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80" },
    { id: 17, name: "French Fries", desc: "Classic salted crispy potato fries.", price: 3.50, img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80" },
    { id: 18, name: "Sweet Potato Fries", desc: "Crispy sweet potato fries with garlic aioli.", price: 4.50, img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80" },
    { id: 19, name: "Onion Rings", desc: "Thick-cut, beer-battered onion rings.", price: 4.00, img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80" },
    { id: 20, name: "Loaded Nachos", desc: "Tortilla chips topped with cheese, jalapeños, and beef.", price: 8.50, img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80" },

    // Pizza & Pasta (Food)
    { id: 21, name: "Margherita Pizza", desc: "Fresh tomatoes, mozzarella, basil, and olive oil.", price: 12.00, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80" },
    { id: 22, name: "Pepperoni Pizza", desc: "Classic mozzarella pizza loaded with crispy pepperoni.", price: 14.50, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80" },
    { id: 23, name: "BBQ Chicken Pizza", desc: "Grilled chicken, red onions, cilantro, and BBQ sauce.", price: 15.00, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80" },
    { id: 24, name: "Truffle Mushroom Pizza", desc: "Mixed forest mushrooms with white truffle oil.", price: 16.50, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80" },
    { id: 25, name: "Hawaiian Pizza", desc: "Ham, pineapple chunks, and extra mozzarella.", price: 13.50, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80" },
    { id: 26, name: "Spaghetti Bolognese", desc: "Slow-cooked beef ragu over al dente spaghetti.", price: 11.00, img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&q=80" },
    { id: 27, name: "Fettuccine Alfredo", desc: "Creamy parmesan and butter sauce with grilled chicken.", price: 12.50, img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&q=80" },
    { id: 28, name: "Spicy Rigatoni", desc: "Rigatoni pasta in a spicy vodka tomato cream sauce.", price: 13.00, img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&q=80" },
    { id: 29, name: "Pesto Pasta", desc: "Penne pasta tossed in fresh basil pesto with pine nuts.", price: 11.50, img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&q=80" },
    { id: 30, name: "Garlic Bread", desc: "Toasted baguette slices with garlic herb butter.", price: 4.50, img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&q=80" },

    // Drinks & Cafe
    { id: 31, name: "One Shot Signature Espresso", desc: "Our house blend double shot espresso.", price: 2.50, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80" },
    { id: 32, name: "Iced Latte", desc: "Espresso with cold milk and ice.", price: 3.50, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80" },
    { id: 33, name: "Caramel Macchiato", desc: "Vanilla syrup, steamed milk, espresso, caramel drizzle.", price: 4.50, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80" },
    { id: 34, name: "Mocha Frappuccino", desc: "Blended coffee, chocolate syrup, milk, and whipped cream.", price: 5.00, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80" },
    { id: 35, name: "Matcha Green Tea Latte", desc: "Premium Japanese matcha with steamed milk.", price: 4.50, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80" },
    { id: 36, name: "Thai Iced Tea", desc: "Sweetened Thai tea topped with evaporated milk.", price: 3.00, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80" },
    { id: 37, name: "Brown Sugar Boba", desc: "Milk tea with brown sugar syrup and tapioca pearls.", price: 4.00, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80" },
    { id: 38, name: "Passionfruit Soda", desc: "Refreshing sparkling water with real passionfruit.", price: 3.50, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80" },
    { id: 39, name: "Iced Americano", desc: "Chilled water topped with rich espresso.", price: 3.00, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80" },
    { id: 40, name: "Fresh Coconut Water", desc: "Served chilled straight from the coconut.", price: 2.50, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80" }
];

let cart = [];
let currentCategory = 'all';

function renderMenu(items) {
    document.getElementById('menuGrid').innerHTML = items.map(item => `
        <div class="card">
            <img src="${item.img}" alt="${item.name}">
            <div class="card-body">
                <div>
                    <div class="card-title">${item.name}</div>
                    <div class="card-desc">${item.desc}</div>
                </div>
                <div class="card-footer">
                    <span class="price">$${item.price.toFixed(2)}</span>
                    <button class="add-btn" onclick="add(${item.id})">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterCategory(category, btnElement) {
    currentCategory = category;
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    let filteredItems = menu;
    
    if (category === 'food') {
        filteredItems = menu.filter(item => item.id >= 1 && item.id <= 30);
    } else if (category === 'drinks') {
        filteredItems = menu.filter(item => item.id >= 31 && item.id <= 40);
    }

    const searchTerm = document.getElementById('search').value.toLowerCase();
    if (searchTerm) {
        filteredItems = filteredItems.filter(i => 
            i.name.toLowerCase().includes(searchTerm) || 
            i.desc.toLowerCase().includes(searchTerm)
        );
    }

    renderMenu(filteredItems);
}

document.getElementById('search').addEventListener('input', () => {
    const activeBtn = document.querySelector('.tab-btn.active');
    filterCategory(currentCategory, activeBtn);
});

function toggleCart() {
    document.getElementById('cartPanel').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
}

function add(id) {
    const item = menu.find(i => i.id === id);
    const exists = cart.find(c => c.id === id);
    if (exists) exists.qty++; else cart.push({...item, qty: 1});
    updateCart();
    if(!document.getElementById('cartPanel').classList.contains('open')) toggleCart();
}

function updateQty(id, change) {
    const item = cart.find(c => c.id === id);
    if(item) {
        item.qty += change;
        if(item.qty <= 0) cart = cart.filter(c => c.id !== id);
        updateCart();
    }
}

function updateCart() {
    const body = document.getElementById('cartBody');
    let total = 0, count = 0;
    
    if(cart.length === 0) {
        body.innerHTML = '<p style="text-align:center; color:#8E8E93; margin-top:20px;">Cart is empty.</p>';
    } else {
        body.innerHTML = cart.map(item => {
            total += item.price * item.qty;
            count += item.qty;
            return `
                <div class="cart-item">
                    <img src="${item.img}">
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price">$${item.price.toFixed(2)} each</div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:5px;">
                            <div style="font-weight:bold; color:#1C1C1E;">$${(item.price * item.qty).toFixed(2)}</div>
                            <div class="qty-controls">
                                <button onclick="updateQty(${item.id}, -1)">-</button>
                                <span>${item.qty}</span>
                                <button onclick="updateQty(${item.id}, 1)">+</button>
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

function checkout() {
    if(cart.length === 0) return alert("Add items to your cart first.");
    
    const newOrder = {
        id: 'ORD-' + Math.floor(Math.random() * 9000 + 1000),
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
    };

    let existingOrders = JSON.parse(localStorage.getItem('oneShotOrders')) || [];
    existingOrders.push(newOrder);
    
    localStorage.setItem('oneShotOrders', JSON.stringify(existingOrders));
    localStorage.setItem('oneShotAlert', Date.now().toString());
    
    alert("Order placed successfully!");
    cart = [];
    updateCart();
    toggleCart();
}

renderMenu(menu);
updateCart();