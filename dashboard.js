function loadOrders() {
    const grid = document.getElementById('ordersGrid');
    const orders = JSON.parse(localStorage.getItem('oneShotOrders')) || [];

    if (orders.length === 0) {
        grid.innerHTML = '<div class="empty-state">Waiting for incoming orders...</div>';
        return;
    }

    grid.innerHTML = orders.slice().reverse().map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-id">${order.id}</span>
                <span class="order-time">${order.time}</span>
            </div>
            <div>
                ${order.items.map(item => `
                    <div class="item-row">
                        <div><span class="item-qty">${item.qty}x</span> ${item.name}</div>
                        <div>$${(item.price * item.qty).toFixed(2)}</div>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                <span>Total</span>
                <span>$${order.total.toFixed(2)}</span>
            </div>
            <div class="action-buttons">
                <button class="btn btn-print" onclick="printReceipt('${order.id}')">Print</button>
                <button class="btn btn-done" onclick="completeOrder('${order.id}')">Done</button>
            </div>
        </div>
    `).join('');
}

function completeOrder(orderId) {
    let orders = JSON.parse(localStorage.getItem('oneShotOrders')) || [];
    orders = orders.filter(order => order.id !== orderId);
    localStorage.setItem('oneShotOrders', JSON.stringify(orders));
    loadOrders();
}

function printReceipt(orderId) {
    const orders = JSON.parse(localStorage.getItem('oneShotOrders')) || [];
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;

    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);

    const printDocument = printFrame.contentWindow.document;

    const receiptHTML = `
        <html>
        <head>
            <style>
                body {
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 14px;
                    color: #000;
                    margin: 0;
                    padding: 10px;
                    width: 300px;
                }
                .center { text-align: center; }
                .dashed-line {
                    border-top: 1px dashed #000;
                    margin: 10px 0;
                }
                table { width: 100%; border-collapse: collapse; }
                td { padding: 4px 0; vertical-align: top; }
                .col-qty { width: 15%; font-weight: bold; }
                .col-item { width: 60%; }
                .col-price { width: 25%; text-align: right; }
                .total-row td { font-size: 16px; font-weight: bold; padding-top: 10px; }
            </style>
        </head>
        <body>
            <div class="center">
                <h2 style="margin:0;">ONE SHOT</h2>
                <p style="margin:5px 0;">Premium Dining</p>
                <p style="margin:5px 0; font-size:12px;">Phnom Penh, Cambodia</p>
            </div>
            
            <div class="dashed-line"></div>
            
            <p style="margin:5px 0;"><strong>Order #:</strong> ${order.id}</p>
            <p style="margin:5px 0;"><strong>Time:</strong> ${order.time}</p>
            
            <div class="dashed-line"></div>
            
            <table>
                ${order.items.map(item => `
                    <tr>
                        <td class="col-qty">${item.qty}x</td>
                        <td class="col-item">${item.name}</td>
                        <td class="col-price">$${(item.price * item.qty).toFixed(2)}</td>
                    </tr>
                `).join('')}
            </table>
            
            <div class="dashed-line"></div>
            
            <table>
                <tr class="total-row">
                    <td>TOTAL</td>
                    <td style="text-align: right;">$${order.total.toFixed(2)}</td>
                </tr>
            </table>
            
            <div class="dashed-line"></div>
            
            <div class="center">
                <p style="margin:5px 0;">Thank you for your order!</p>
                <p style="margin:5px 0; font-size: 12px;">Please come again.</p>
            </div>
        </body>
        </html>
    `;

    printDocument.open();
    printDocument.write(receiptHTML);
    printDocument.close();

    setTimeout(() => {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
        
        setTimeout(() => {
            document.body.removeChild(printFrame);
        }, 1000);
    }, 250);
}

window.addEventListener('storage', function(e) {
    if (e.key === 'oneShotOrders') {
        loadOrders();
    }
    if (e.key === 'oneShotAlert') {
        const banner = document.getElementById('alertBanner');
        banner.style.display = 'block';
        setTimeout(() => { banner.style.display = 'none'; }, 4000);
    }
});

loadOrders();