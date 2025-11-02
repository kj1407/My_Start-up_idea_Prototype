// App State Management
const AppState = {
    currentScreen: 'splash',
    userType: null, // 'customer', 'expert', 'admin'
    currentUser: null,
    selectedService: null,
    selectedExpert: null,
    selectedTimeSlot: null,
    selectedDate: null,
    cart: [],
    selectedPaymentMethod: null,
    bookings: [],
    experts: [],
    customers: [],
    pendingVerifications: [],
    deliveryLocation: { lat: 0, lng: 0 },
    driverLocation: { lat: 100, lng: 100 }
};

// Sample Data
const SAMPLE_DATA = {
    experts: [
        { id: 1, name: "Rajesh Kumar", category: "Plumber", rating: 4.8, services_completed: 156, price_range: "₹300-800", distance: "2.3 km", phone: "+91-9876543210", avatar: "👨‍🔧" },
        { id: 2, name: "Amit Sharma", category: "Electrician", rating: 4.9, services_completed: 203, price_range: "₹400-1000", distance: "1.8 km", phone: "+91-9876543211", avatar: "👨‍🔬" },
        { id: 3, name: "Suresh Patel", category: "Carpenter", rating: 4.7, services_completed: 142, price_range: "₹500-1500", distance: "3.1 km", phone: "+91-9876543212", avatar: "👨‍🏭" },
        { id: 4, name: "Fresh Mart Distributors", category: "Groceries", rating: 4.6, services_completed: 89, price_range: "Free delivery", distance: "1.2 km", phone: "+91-9876543213", avatar: "🏪" }
    ],
    groceryItems: [
        { id: 1, name: "Tomatoes", category: "Vegetables", price: 40, unit: "kg", icon: "🍅" },
        { id: 2, name: "Onions", category: "Vegetables", price: 30, unit: "kg", icon: "🧅" },
        { id: 3, name: "Milk", category: "Dairy", price: 60, unit: "liter", icon: "🥛" },
        { id: 4, name: "Rice", category: "Grains", price: 55, unit: "kg", icon: "🌾" },
        { id: 5, name: "Apples", category: "Fruits", price: 120, unit: "kg", icon: "🍎" },
        { id: 6, name: "Potatoes", category: "Vegetables", price: 25, unit: "kg", icon: "🥔" },
        { id: 7, name: "Bread", category: "Bakery", price: 40, unit: "loaf", icon: "🍞" },
        { id: 8, name: "Eggs", category: "Dairy", price: 6, unit: "piece", icon: "🥚" }
    ],
    serviceCategories: [
        { name: "Plumber", icon: "fa-wrench", description: "Pipe fitting, leak repair, bathroom installation", class: "plumber" },
        { name: "Electrician", icon: "fa-bolt", description: "Wiring, appliance repair, installation", class: "electrician" },
        { name: "Carpenter", icon: "fa-hammer", description: "Furniture repair, woodwork, installation", class: "carpenter" },
        { name: "Groceries", icon: "fa-shopping-cart", description: "Fresh produce, daily essentials, home delivery", class: "grocery" }
    ],
    timeSlots: [
        "09:00 AM - 12:00 PM",
        "12:00 PM - 03:00 PM",
        "03:00 PM - 06:00 PM",
        "06:00 PM - 09:00 PM"
    ],
    locations: [
        "Mumbai - Andheri",
        "Mumbai - Bandra",
        "Mumbai - Powai",
        "Delhi - Connaught Place",
        "Delhi - Dwarka",
        "Bangalore - Koramangala",
        "Bangalore - Whitefield",
        "Pune - Kothrud"
    ],
    paymentMethods: [
        { name: "Credit/Debit Card", icon: "fa-credit-card" },
        { name: "UPI", icon: "fa-mobile-alt" },
        { name: "Net Banking", icon: "fa-university" },
        { name: "Wallet", icon: "fa-wallet" }
    ]
};

// Initialize sample data
AppState.experts = [...SAMPLE_DATA.experts];
AppState.pendingVerifications = [
    { id: 1, name: "Vikram Singh", category: "Plumber", phone: "+91-9876543220", email: "vikram@example.com", aadhaar: "1234-5678-9012", pan: "ABCDE1234F", location: "Mumbai - Andheri", status: "pending" }
];

// Utility Functions
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    
    toast.innerHTML = `
        <i class="fas ${icon} toast-icon"></i>
        <div class="toast-message">${message}</div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showScreen(screenName) {
    AppState.currentScreen = screenName;
    const app = document.getElementById('app');
    
    const screens = {
        'splash': renderSplashScreen,
        'customer-register': renderCustomerRegister,
        'customer-login': renderCustomerLogin,
        'expert-register': renderExpertRegister,
        'expert-login': renderExpertLogin,
        'customer-dashboard': renderCustomerDashboard,
        'service-selection': renderServiceSelection,
        'booking': renderBookingScreen,
        'payment': renderPaymentScreen,
        'groceries': renderGroceriesScreen,
        'tracking': renderTrackingScreen,
        'rating': renderRatingScreen,
        'customer-profile': renderCustomerProfile,
        'expert-dashboard': renderExpertDashboard,
        'expert-requests': renderExpertRequests,
        'expert-profile': renderExpertProfile,
        'admin-dashboard': renderAdminDashboard,
        'admin-verifications': renderAdminVerifications,
        'admin-users': renderAdminUsers
    };
    
    if (screens[screenName]) {
        app.innerHTML = screens[screenName]();
        attachEventListeners();
    }
}

function renderSplashScreen() {
    return `
        <div class="splash-screen screen">
            <div class="splash-logo">
                <!-- Inline SVG logo (wrench inside circle) to replace emoji -->
                <img width="84" height="84" viewBox="0 0 24 24" fill="none" src="./asset/logo/logo.png" aria-hidden="true">
                    <circle cx="12" cy="12" r="11" stroke="var(--primary-blue, #2B6CB0)" stroke-width="1.2" fill="var(--white, #ffffff)" />
                    <path d="M21.7 8.3l-2-2a1 1 0 0 0-1.4 0l-1 1-2.6-2.6a3 3 0 1 0-1.4 1.4L16.3 8l-1 1a1 1 0 0 0 0 1.4l2 2a1 1 0 0 0 1.4 0l2-2a1 1 0 0 0 0-1.4zM3 21l6-6"
                        stroke="var(--primary-blue, #2B6CB0)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </img>
            </div>
            <h1 class="splash-title">MIHY</h1>
            <p class="splash-tagline">Connect with Local Service Experts</p>
            <div class="splash-buttons">
                <button class="btn btn-secondary" onclick="handleUserTypeSelection('customer')">
                    <i class="fas fa-user"></i>
                    I'm a Customer
                </button>
                <button class="btn btn-secondary" onclick="handleUserTypeSelection('expert')">
                    <i class="fas fa-user-tie"></i>
                    I'm an Expert
                </button>
                <button class="btn btn-outline" onclick="handleAdminLogin()">
                    <i class="fas fa-user-shield"></i>
                    Admin Login
                </button>
            </div>
        </div>
    `;
}

function handleUserTypeSelection(type) {
    AppState.userType = type;
    if (type === 'customer') {
        showScreen('customer-login');
    } else {
        showScreen('expert-login');
    }
}

function handleAdminLogin() {
    // Simulate admin login
    AppState.userType = 'admin';
    AppState.currentUser = { name: 'Admin', email: 'admin@localconnect.com' };
    showToast('Admin logged in successfully!', 'success');
    showScreen('admin-dashboard');
}

function renderCustomerRegister() {
    return `
        <div class="screen">
            <div class="header">
                <button class="header-back" onclick="showScreen('splash')"><i class="fas fa-arrow-left"></i></button>
                <h1 class="header-title">Customer Registration</h1>
                <div></div>
            </div>
            <div class="content">
                <form id="customer-register-form">
                    <div class="form-group">
                        <label class="form-label required">Phone Number</label>
                        <input type="tel" class="form-input" id="phone" placeholder="+91-XXXXXXXXXX" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Email</label>
                        <input type="email" class="form-input" id="email" placeholder="your@email.com" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Location</label>
                        <select class="form-select" id="location" required>
                            <option value="">Select Location</option>
                            ${SAMPLE_DATA.locations.map(loc => `<option value="${loc}">${loc}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Password</label>
                        <input type="password" class="form-input" id="password" placeholder="Enter password" required>
                        <div class="password-strength">
                            <div class="password-strength-bar" id="password-strength"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Profile Photo (Optional)</label>
                        <input type="file" class="form-input" id="profile-photo" accept="image/*">
                    </div>
                    <div class="form-group">
                        <label class="form-checkbox">
                            <input type="checkbox" required>
                            <span>I agree to Terms & Conditions</span>
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                    <button type="button" class="btn btn-ghost mt-2" onclick="showScreen('customer-login')">Already have an account? Login</button>
                </form>
            </div>
        </div>
    `;
}

function renderCustomerLogin() {
    return `
        <div class="screen">
            <div class="header">
                <button class="header-back" onclick="showScreen('splash')"><i class="fas fa-arrow-left"></i></button>
                <h1 class="header-title">Customer Login</h1>
                <div></div>
            </div>
            <div class="content">
                <form id="customer-login-form">
                    <div class="form-group">
                        <label class="form-label">Phone Number</label>
                        <input type="tel" class="form-input" id="login-phone" placeholder="+91-XXXXXXXXXX" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-input" id="login-password" placeholder="Enter password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                    <button type="button" class="btn btn-ghost mt-2" onclick="showScreen('customer-register')">New user? Register</button>
                </form>
            </div>
        </div>
    `;
}

function renderExpertRegister() {
    return `
        <div class="screen">
            <div class="header">
                <button class="header-back" onclick="showScreen('splash')"><i class="fas fa-arrow-left"></i></button>
                <h1 class="header-title">Expert Registration</h1>
                <div></div>
            </div>
            <div class="content">
                <form id="expert-register-form">
                    <div class="form-group">
                        <label class="form-label required">Aadhaar Number</label>
                        <input type="text" class="form-input" placeholder="XXXX-XXXX-XXXX" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Phone Number</label>
                        <input type="tel" class="form-input" placeholder="+91-XXXXXXXXXX" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Email</label>
                        <input type="email" class="form-input" placeholder="your@email.com" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Service Category</label>
                        <select class="form-select" required>
                            <option value="">Select Category</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Electrician">Electrician</option>
                            <option value="Carpenter">Carpenter</option>
                            <option value="Grocery Distributor">Grocery Distributor</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Proof of Profession</label>
                        <input type="file" class="form-input" accept="image/*" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Profile Photo</label>
                        <input type="file" class="form-input" accept="image/*" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">PAN Card Number</label>
                        <input type="text" class="form-input" placeholder="ABCDE1234F" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Location</label>
                        <select class="form-select" required>
                            <option value="">Select Location</option>
                            ${SAMPLE_DATA.locations.map(loc => `<option value="${loc}">${loc}</option>`).join('')}
                        </select>
                    </div>
                    <button type="submit" class="btn btn-success">Submit for Verification</button>
                    <div class="card mt-4">
                        <p class="text-center" style="color: var(--gray-600); font-size: var(--font-size-sm);">
                            <i class="fas fa-info-circle"></i> Your details will be verified by admin. You'll receive login credentials after approval.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function renderExpertLogin() {
    return `
        <div class="screen">
            <div class="header">
                <button class="header-back" onclick="showScreen('splash')"><i class="fas fa-arrow-left"></i></button>
                <h1 class="header-title">Expert Login</h1>
                <div></div>
            </div>
            <div class="content">
                <form id="expert-login-form">
                    <div class="form-group">
                        <label class="form-label">Username</label>
                        <input type="text" class="form-input" placeholder="Enter username" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-input" placeholder="Enter password" required>
                    </div>
                    <button type="submit" class="btn btn-success">Login</button>
                    <button type="button" class="btn btn-ghost mt-2" onclick="showScreen('expert-register')">New expert? Register</button>
                </form>
            </div>
        </div>
    `;
}

function renderCustomerDashboard() {
    const user = AppState.currentUser || { name: 'Customer' };
    return `
        <div class="screen">
            <div class="content">
                <div class="welcome">
                    <div class="welcome-text">Welcome back,</div>
                    <div class="welcome-name">${user.name}</div>
                </div>
                
                <div class="search-bar">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" class="search-input" placeholder="Search services...">
                </div>
                
                <div class="section-header">Services</div>
                <div class="grid grid-2">
                    ${SAMPLE_DATA.serviceCategories.map(service => `
                        <div class="service-card" onclick="handleServiceSelect('${service.name}')">
                            <div class="service-icon ${service.class}">
                                <i class="fas ${service.icon}"></i>
                            </div>
                            <div class="service-name">${service.name}</div>
                            <div class="service-desc">${service.description}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="section-header mt-6">Recent Bookings</div>
                ${AppState.bookings.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-icon"><i class="fas fa-calendar-times"></i></div>
                        <div class="empty-text">No bookings yet</div>
                    </div>
                ` : AppState.bookings.slice(0, 3).map(booking => `
                    <div class="card">
                        <div class="flex justify-between items-center">
                            <div>
                                <div style="font-weight: 600;">${booking.expertName}</div>
                                <div style="font-size: var(--font-size-sm); color: var(--gray-600);">${booking.service}</div>
                                <div style="font-size: var(--font-size-xs); color: var(--gray-500); margin-top: 4px;">${booking.date} • ${booking.time}</div>
                            </div>
                            <span class="badge badge-${booking.status === 'completed' ? 'success' : 'warning'}">${booking.status}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="bottom-nav">
                <div class="nav-item active" onclick="showScreen('customer-dashboard')">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </div>
                <div class="nav-item" onclick="showScreen('customer-bookings')">
                    <i class="fas fa-calendar"></i>
                    <span>Bookings</span>
                </div>
                <div class="nav-item" onclick="showScreen('customer-profile')">
                    <i class="fas fa-user"></i>
                    <span>Profile</span>
                </div>
            </div>
        </div>
    `;
}

function handleServiceSelect(serviceName) {
    AppState.selectedService = serviceName;
    if (serviceName === 'Groceries') {
        showScreen('groceries');
    } else {
        showScreen('service-selection');
    }
}

function renderServiceSelection() {
    const experts = AppState.experts.filter(e => e.category === AppState.selectedService);
    return `
        <div class="screen">
            <div class="header">
                <button class="header-back" onclick="showScreen('customer-dashboard')"><i class="fas fa-arrow-left"></i></button>
                <h1 class="header-title">${AppState.selectedService}</h1>
                <div></div>
            </div>
            <div class="content">
                <div class="section-header">Available Experts</div>
                ${experts.map(expert => `
                    <div class="expert-card">
                        <div class="expert-avatar">${expert.avatar}</div>
                        <div class="expert-info">
                            <div class="expert-name">${expert.name}</div>
                            <div class="expert-rating">
                                <span class="stars">${'⭐'.repeat(Math.floor(expert.rating))}</span>
                                <span style="font-size: var(--font-size-sm);">${expert.rating}</span>
                            </div>
                            <div class="expert-meta">
                                <span><i class="fas fa-briefcase"></i> ${expert.services_completed} services</span>
                                <span><i class="fas fa-map-marker-alt"></i> ${expert.distance}</span>
                            </div>
                            <div class="expert-meta">
                                <span style="color: var(--secondary-green); font-weight: 600;">${expert.price_range}</span>
                            </div>
                        </div>
                        <div class="expert-actions">
                            <button class="btn btn-primary btn-sm" onclick="handleExpertSelect(${expert.id})">
                                Book Now
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function handleExpertSelect(expertId) {
    AppState.selectedExpert = AppState.experts.find(e => e.id === expertId);
    showScreen('booking');
}

function renderBookingScreen() {
    const expert = AppState.selectedExpert;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    
    return `
        <div class="screen">
            <div class="header">
                <button class="header-back" onclick="showScreen('service-selection')"><i class="fas fa-arrow-left"></i></button>
                <h1 class="header-title">Book Appointment</h1>
                <div></div>
            </div>
            <div class="content">
                <div class="card">
                    <div class="flex gap-3">
                        <div class="expert-avatar">${expert.avatar}</div>
                        <div>
                            <div style="font-weight: 600; font-size: var(--font-size-lg);">${expert.name}</div>
                            <div style="color: var(--gray-600);">${expert.category}</div>
                            <div style="color: var(--secondary-green); font-weight: 600; margin-top: 4px;">${expert.price_range}</div>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Select Date</label>
                    <input type="date" class="date-input" id="booking-date" min="${minDate}" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Select Time Slot</label>
                    <div class="time-slots">
                        ${SAMPLE_DATA.timeSlots.map(slot => `
                            <div class="time-slot" onclick="handleTimeSlotSelect('${slot}')">${slot}</div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Service Description</label>
                    <textarea class="form-textarea" id="service-description" placeholder="Describe your requirement..."></textarea>
                </div>
                
                <div class="card">
                    <div class="flex justify-between">
                        <span style="font-weight: 600;">Estimated Cost</span>
                        <span style="font-size: var(--font-size-xl); font-weight: 700; color: var(--secondary-green);">₹500</span>
                    </div>
                </div>
                
                <button class="btn btn-primary" onclick="handleProceedToPayment()">Proceed to Payment</button>
            </div>
        </div>
    `;
}

function handleTimeSlotSelect(slot) {
    AppState.selectedTimeSlot = slot;
    document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
    event.target.classList.add('selected');
}

function handleProceedToPayment() {
    const date = document.getElementById('booking-date').value;
    const description = document.getElementById('service-description').value;
    
    if (!date) {
        showToast('Please select a date', 'error');
        return;
    }
    
    if (!AppState.selectedTimeSlot) {
        showToast('Please select a time slot', 'error');
        return;
    }
    
    AppState.selectedDate = date;
    showScreen('payment');
}

function renderPaymentScreen() {
    return `
        <div class="screen">
            <div class="header">
                <button class="header-back" onclick="showScreen('booking')"><i class="fas fa-arrow-left"></i></button>
                <h1 class="header-title">Payment</h1>
                <div></div>
            </div>
            <div class="content">
                <div class="card">
                    <div class="card-header">Order Summary</div>
                    <div class="detail-row">
                        <span class="detail-label">Service</span>
                        <span class="detail-value">${AppState.selectedService}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Expert</span>
                        <span class="detail-value">${AppState.selectedExpert.name}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Date</span>
                        <span class="detail-value">${AppState.selectedDate}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Time</span>
                        <span class="detail-value">${AppState.selectedTimeSlot}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Amount</span>
                        <span class="detail-value" style="color: var(--secondary-green); font-size: var(--font-size-lg);">₹500</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Select Payment Method</label>
                    <div class="payment-methods">
                        ${SAMPLE_DATA.paymentMethods.map(method => `
                            <div class="payment-method" onclick="handlePaymentMethodSelect('${method.name}')">
                                <i class="fas ${method.icon} payment-icon"></i>
                                <span class="payment-name">${method.name}</span>
                                <i class="fas fa-check" style="color: var(--primary-blue);"></i>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div id="card-details" class="hidden">
                    <div class="form-group">
                        <label class="form-label">Card Number</label>
                        <input type="text" class="form-input" placeholder="1234 5678 9012 3456">
                    </div>
                    <div class="grid grid-2">
                        <div class="form-group">
                            <label class="form-label">Expiry</label>
                            <input type="text" class="form-input" placeholder="MM/YY">
                        </div>
                        <div class="form-group">
                            <label class="form-label">CVV</label>
                            <input type="text" class="form-input" placeholder="123">
                        </div>
                    </div>
                </div>
                
                <button class="btn btn-success" onclick="handlePayNow()">Pay Now</button>
            </div>
        </div>
    `;
}

function handlePaymentMethodSelect(method) {
    AppState.selectedPaymentMethod = method;
    document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
    event.target.closest('.payment-method').classList.add('selected');
    
    const cardDetails = document.getElementById('card-details');
    if (method === 'Credit/Debit Card') {
        cardDetails.classList.remove('hidden');
    } else {
        cardDetails.classList.add('hidden');
    }
}

function handlePayNow() {
    if (!AppState.selectedPaymentMethod) {
        showToast('Please select a payment method', 'error');
        return;
    }
    
    showToast('Processing payment...', 'info');
    
    setTimeout(() => {
        const booking = {
            id: Date.now(),
            expertName: AppState.selectedExpert.name,
            service: AppState.selectedService,
            date: AppState.selectedDate,
            time: AppState.selectedTimeSlot,
            status: 'upcoming',
            amount: 500
        };
        AppState.bookings.push(booking);
        
        showToast('Booking confirmed! Expert will be notified.', 'success');
        setTimeout(() => {
            showScreen('customer-dashboard');
        }, 1500);
    }, 2000);
}

function renderGroceriesScreen() {
    const categories = [...new Set(SAMPLE_DATA.groceryItems.map(item => item.category))];
    const activeCategory = categories[0];
    
    return `
        <div class="screen">
            <div class="header">
                <button class="header-back" onclick="showScreen('customer-dashboard')"><i class="fas fa-arrow-left"></i></button>
                <h1 class="header-title">Groceries</h1>
                <div></div>
            </div>
            <div class="content">
                <div class="grocery-categories">
                    ${categories.map((cat, i) => `
                        <div class="grocery-category ${i === 0 ? 'active' : ''}" onclick="handleGroceryCategory('${cat}')">${cat}</div>
                    `).join('')}
                </div>
                
                <div class="grid grid-2" id="grocery-items">
                    ${SAMPLE_DATA.groceryItems.map(item => `
                        <div class="grocery-item" data-category="${item.category}">
                            <div class="grocery-item-icon">${item.icon}</div>
                            <div class="grocery-item-name">${item.name}</div>
                            <div class="grocery-item-price">₹${item.price}/${item.unit}</div>
                            <div class="quantity-control">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span class="quantity-value" id="qty-${item.id}">0</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div id="cart-summary-container"></div>
            <div class="bottom-nav">
                <div class="nav-item" onclick="showScreen('customer-dashboard')">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </div>
                <div class="nav-item active">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Cart</span>
                </div>
                <div class="nav-item" onclick="showScreen('customer-profile')">
                    <i class="fas fa-user"></i>
                    <span>Profile</span>
                </div>
            </div>
        </div>
    `;
}

function updateQuantity(itemId, delta) {
    const item = SAMPLE_DATA.groceryItems.find(i => i.id === itemId);
    const qtyElement = document.getElementById(`qty-${itemId}`);
    let qty = parseInt(qtyElement.textContent) + delta;
    
    if (qty < 0) qty = 0;
    qtyElement.textContent = qty;
    
    // Update cart
    const cartItem = AppState.cart.find(i => i.id === itemId);
    if (cartItem) {
        if (qty === 0) {
            AppState.cart = AppState.cart.filter(i => i.id !== itemId);
        } else {
            cartItem.quantity = qty;
        }
    } else if (qty > 0) {
        AppState.cart.push({ ...item, quantity: qty });
    }
    
    updateCartSummary();
}

function updateCartSummary() {
    const container = document.getElementById('cart-summary-container');
    if (AppState.cart.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    const total = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    
    container.innerHTML = `
        <div class="cart-summary" onclick="handleGroceryCheckout()">
            <div>
                <div class="cart-info">${itemCount} items</div>
                <div class="cart-total">₹${total}</div>
            </div>
            <div>
                <i class="fas fa-arrow-right" style="font-size: var(--font-size-xl);"></i>
            </div>
        </div>
    `;
}

function handleGroceryCheckout() {
    if (AppState.cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }
    
    showToast('Processing payment...', 'info');
    
    setTimeout(() => {
        showToast('Order placed successfully!', 'success');
        AppState.cart = [];
        setTimeout(() => {
            showScreen('tracking');
        }, 1500);
    }, 2000);
}

function renderTrackingScreen() {
    return `
        <div class="screen">
            <div class="header">
                <button class="header-back" onclick="showScreen('customer-dashboard')"><i class="fas fa-arrow-left"></i></button>
                <h1 class="header-title">Track Delivery</h1>
                <div></div>
            </div>
            <div class="content">
                <div class="map-container">
                    <div class="map-marker customer">🏠</div>
                    <div class="map-marker driver" id="driver-marker">🚚</div>
                    <div class="map-route">━━━━━━━━━━━</div>
                </div>
                
                <div class="card">
                    <div class="card-header">Delivery Status</div>
                    <div class="detail-row">
                        <span class="detail-label">Driver Name</span>
                        <span class="detail-value">Ramesh Kumar</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Phone</span>
                        <span class="detail-value">+91-9876543214</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Estimated Arrival</span>
                        <span class="detail-value" id="eta">25 mins</span>
                    </div>
                </div>
                
                <button class="btn btn-outline">
                    <i class="fas fa-phone"></i>
                    Call Driver
                </button>
                
                <button class="btn btn-primary mt-4" onclick="handleDeliveryComplete()">Mark as Delivered (Demo)</button>
            </div>
        </div>
    `;
}

function handleDeliveryComplete() {
    showToast('Delivery completed!', 'success');
    setTimeout(() => {
        showScreen('rating');
    }, 1000);
}

function renderRatingScreen() {
    return `
        <div class="screen">
            <div class="header">
                <button class="header-back" onclick="showScreen('customer-dashboard')"><i class="fas fa-arrow-left"></i></button>
                <h1 class="header-title">Rate Service</h1>
                <div></div>
            </div>
            <div class="content">
                <div class="text-center mb-6">
                    <div class="profile-avatar" style="width: 80px; height: 80px; margin: 0 auto var(--space-4);">🚚</div>
                    <div style="font-size: var(--font-size-xl); font-weight: 600;">Ramesh Kumar</div>
                    <div style="color: var(--gray-600);">Delivery Driver</div>
                </div>
                
                <div class="rating-stars">
                    ${[1,2,3,4,5].map(star => `
                        <i class="fas fa-star rating-star" onclick="handleRatingSelect(${star})"></i>
                    `).join('')}
                </div>
                
                <div class="form-group">
                    <label class="form-label">Write a Review</label>
                    <textarea class="form-textarea" id="review-text" placeholder="Share your experience..."></textarea>
                </div>
                
                <button class="btn btn-primary" onclick="handleSubmitRating()">Submit Rating</button>
                <button class="btn btn-ghost mt-2" onclick="showScreen('customer-dashboard')">Skip</button>
            </div>
        </div>
    `;
}

function handleRatingSelect(rating) {
    document.querySelectorAll('.rating-star').forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function handleSubmitRating() {
    showToast('Thank you for your feedback!', 'success');
    setTimeout(() => {
        showScreen('customer-dashboard');
    }, 1000);
}

function renderCustomerProfile() {
    const user = AppState.currentUser || { name: 'John Doe', email: 'john@example.com', phone: '+91-9876543210', location: 'Mumbai - Andheri' };
    return `
        <div class="screen">
            <div class="profile-header">
                <div class="profile-avatar">👤</div>
                <div class="profile-name">${user.name}</div>
                <div class="profile-email">${user.email}</div>
            </div>
            <div class="profile-details">
                <div class="detail-row">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${user.phone}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Location</span>
                    <span class="detail-value">${user.location}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total Bookings</span>
                    <span class="detail-value">${AppState.bookings.length}</span>
                </div>
            </div>
            <div class="content">
                <button class="btn btn-outline">
                    <i class="fas fa-edit"></i>
                    Edit Profile
                </button>
                <button class="btn btn-danger mt-4" onclick="handleLogout()">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </button>
            </div>
            <div class="bottom-nav">
                <div class="nav-item" onclick="showScreen('customer-dashboard')">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </div>
                <div class="nav-item">
                    <i class="fas fa-calendar"></i>
                    <span>Bookings</span>
                </div>
                <div class="nav-item active">
                    <i class="fas fa-user"></i>
                    <span>Profile</span>
                </div>
            </div>
        </div>
    `;
}

function renderExpertDashboard() {
    const user = AppState.currentUser || { name: 'Rajesh Kumar', category: 'Plumber' };
    const completedServices = 156;
    const avgRating = 4.8;
    const pendingRequests = 3;
    
    return `
        <div class="screen">
            <div class="content">
                <div class="welcome">
                    <div class="welcome-text">Welcome,</div>
                    <div class="welcome-name">${user.name}</div>
                </div>
                
                <div class="card">
                    <div class="flex gap-3">
                        <div class="expert-avatar">👨‍🔧</div>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; font-size: var(--font-size-lg);">${user.name}</div>
                            <div style="color: var(--gray-600);">${user.category}</div>
                            <div style="margin-top: var(--space-2);">
                                <span class="stars">${'⭐'.repeat(Math.floor(avgRating))}</span>
                                <span style="font-weight: 600; margin-left: var(--space-1);">${avgRating}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${completedServices}</div>
                        <div class="stat-label">Services Completed</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${avgRating}</div>
                        <div class="stat-label">Average Rating</div>
                    </div>
                    <div class="stat-card" style="position: relative;" onclick="showScreen('expert-requests')">
                        <div class="stat-value">${pendingRequests}</div>
                        <div class="stat-label">Pending Requests</div>
                        ${pendingRequests > 0 ? `<span class="stat-badge">${pendingRequests}</span>` : ''}
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">₹45,200</div>
                        <div class="stat-label">Earnings</div>
                    </div>
                </div>
                
                <div class="section-header">Recent Completed Services</div>
                <div class="card">
                    <div class="detail-row">
                        <div>
                            <div style="font-weight: 600;">Priya Sharma</div>
                            <div style="font-size: var(--font-size-sm); color: var(--gray-600);">Pipe leak repair</div>
                        </div>
                        <span class="badge badge-success">Completed</span>
                    </div>
                </div>
                <div class="card">
                    <div class="detail-row">
                        <div>
                            <div style="font-weight: 600;">Amit Verma</div>
                            <div style="font-size: var(--font-size-sm); color: var(--gray-600);">Bathroom installation</div>
                        </div>
                        <span class="badge badge-success">Completed</span>
                    </div>
                </div>
            </div>
            <div class="bottom-nav">
                <div class="nav-item active" onclick="showScreen('expert-dashboard')">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </div>
                <div class="nav-item" onclick="showScreen('expert-requests')">
                    <i class="fas fa-bell"></i>
                    <span>Requests</span>
                </div>
                <div class="nav-item" onclick="showScreen('expert-profile')">
                    <i class="fas fa-user"></i>
                    <span>Profile</span>
                </div>
            </div>
        </div>
    `;
}

function renderExpertRequests() {
    const requests = [
        { id: 1, customer: "Priya Sharma", location: "Andheri West", service: "Pipe leak repair", date: "Oct 28, 2025", time: "09:00 AM - 12:00 PM", distance: "2.3 km" },
        { id: 2, customer: "Amit Verma", location: "Bandra East", service: "Bathroom renovation", date: "Oct 29, 2025", time: "12:00 PM - 03:00 PM", distance: "3.5 km" },
        { id: 3, customer: "Rahul Singh", location: "Powai", service: "Kitchen sink installation", date: "Oct 30, 2025", time: "03:00 PM - 06:00 PM", distance: "4.1 km" }
    ];
    
    return `
        <div class="screen">
            <div class="header">
                <button class="header-back" onclick="showScreen('expert-dashboard')"><i class="fas fa-arrow-left"></i></button>
                <h1 class="header-title">Service Requests</h1>
                <div></div>
            </div>
            <div class="content">
                ${requests.map(req => `
                    <div class="request-card">
                        <div class="request-header">
                            <div class="request-customer">${req.customer}</div>
                            <div class="request-distance">${req.distance}</div>
                        </div>
                        <div class="request-details">
                            <div class="request-row">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${req.location}</span>
                            </div>
                            <div class="request-row">
                                <i class="fas fa-wrench"></i>
                                <span>${req.service}</span>
                            </div>
                            <div class="request-row">
                                <i class="fas fa-calendar"></i>
                                <span>${req.date}</span>
                            </div>
                            <div class="request-row">
                                <i class="fas fa-clock"></i>
                                <span>${req.time}</span>
                            </div>
                        </div>
                        <div class="request-actions">
                            <button class="btn btn-success" style="flex: 1;" onclick="handleAcceptRequest(${req.id})">
                                <i class="fas fa-check"></i> Accept
                            </button>
                            <button class="btn btn-danger" style="flex: 1;" onclick="handleDeclineRequest(${req.id})">
                                <i class="fas fa-times"></i> Decline
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="bottom-nav">
                <div class="nav-item" onclick="showScreen('expert-dashboard')">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </div>
                <div class="nav-item active">
                    <i class="fas fa-bell"></i>
                    <span>Requests</span>
                </div>
                <div class="nav-item" onclick="showScreen('expert-profile')">
                    <i class="fas fa-user"></i>
                    <span>Profile</span>
                </div>
            </div>
        </div>
    `;
}

function handleAcceptRequest(requestId) {
    showToast('Request accepted! Customer details sent to your phone.', 'success');
    setTimeout(() => {
        showScreen('expert-dashboard');
    }, 1500);
}

function handleDeclineRequest(requestId) {
    showToast('Request declined. Forwarded to next available expert.', 'info');
    event.target.closest('.request-card').remove();
}

function renderExpertProfile() {
    const user = AppState.currentUser || { name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91-9876543210', category: 'Plumber' };
    return `
        <div class="screen">
            <div class="profile-header">
                <div class="profile-avatar">👨‍🔧</div>
                <div class="profile-name">${user.name}</div>
                <div class="profile-email">${user.email}</div>
            </div>
            <div class="profile-details">
                <div class="detail-row">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${user.phone}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Category</span>
                    <span class="detail-value">${user.category}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Aadhaar</span>
                    <span class="detail-value">XXXX-XXXX-9012</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">PAN</span>
                    <span class="detail-value">XXXXX1234F</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Services Completed</span>
                    <span class="detail-value">156</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Average Rating</span>
                    <span class="detail-value">4.8 ⭐</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total Earnings</span>
                    <span class="detail-value" style="color: var(--secondary-green);">₹45,200</span>
                </div>
            </div>
            <div class="content">
                <button class="btn btn-outline">
                    <i class="fas fa-edit"></i>
                    Edit Profile
                </button>
                <button class="btn btn-danger mt-4" onclick="handleLogout()">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </button>
            </div>
            <div class="bottom-nav">
                <div class="nav-item" onclick="showScreen('expert-dashboard')">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </div>
                <div class="nav-item">
                    <i class="fas fa-bell"></i>
                    <span>Requests</span>
                </div>
                <div class="nav-item active">
                    <i class="fas fa-user"></i>
                    <span>Profile</span>
                </div>
            </div>
        </div>
    `;
}

function renderAdminDashboard() {
    return `
        <div class="screen">
            <div class="header">
                <div></div>
                <h1 class="header-title">Admin Dashboard</h1>
                <button class="header-back" onclick="handleLogout()"><i class="fas fa-sign-out-alt"></i></button>
            </div>
            <div class="content">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">1,247</div>
                        <div class="stat-label">Total Customers</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">189</div>
                        <div class="stat-label">Total Experts</div>
                    </div>
                    <div class="stat-card" style="position: relative; cursor: pointer;" onclick="showScreen('admin-verifications')">
                        <div class="stat-value">7</div>
                        <div class="stat-label">Pending Verifications</div>
                        <span class="stat-badge">7</span>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">34</div>
                        <div class="stat-label">Active Bookings</div>
                    </div>
                </div>
                
                <div class="section-header">Quick Actions</div>
                <button class="btn btn-primary mb-4" onclick="showScreen('admin-verifications')">
                    <i class="fas fa-check-circle"></i>
                    View Pending Verifications
                </button>
                <button class="btn btn-outline" onclick="showScreen('admin-users')">
                    <i class="fas fa-users"></i>
                    Manage Users
                </button>
                
                <div class="section-header mt-6">Recent Activities</div>
                <div class="card">
                    <div style="font-size: var(--font-size-sm); color: var(--gray-600); margin-bottom: var(--space-1);">2 hours ago</div>
                    <div>New expert registration: <strong>Vikram Singh</strong></div>
                </div>
                <div class="card">
                    <div style="font-size: var(--font-size-sm); color: var(--gray-600); margin-bottom: var(--space-1);">5 hours ago</div>
                    <div>Booking completed: <strong>Rajesh Kumar</strong> - Customer: <strong>Priya Sharma</strong></div>
                </div>
            </div>
        </div>
    `;
}

function renderAdminVerifications() {
    return `
        <div class="screen">
            <div class="header">
                <button class="header-back" onclick="showScreen('admin-dashboard')"><i class="fas fa-arrow-left"></i></button>
                <h1 class="header-title">Pending Verifications</h1>
                <div></div>
            </div>
            <div class="content">
                ${AppState.pendingVerifications.map(expert => `
                    <div class="card">
                        <div class="flex justify-between items-center mb-4">
                            <div>
                                <div style="font-weight: 600; font-size: var(--font-size-lg);">${expert.name}</div>
                                <div style="color: var(--gray-600);">${expert.category}</div>
                            </div>
                            <span class="badge badge-warning">Pending</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Phone</span>
                            <span class="detail-value">${expert.phone}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Email</span>
                            <span class="detail-value">${expert.email}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Aadhaar</span>
                            <span class="detail-value">${expert.aadhaar}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">PAN</span>
                            <span class="detail-value">${expert.pan}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Location</span>
                            <span class="detail-value">${expert.location}</span>
                        </div>
                        <div class="flex gap-3 mt-4">
                            <button class="btn btn-success" style="flex: 1;" onclick="handleApproveExpert(${expert.id})">
                                <i class="fas fa-check"></i> Approve
                            </button>
                            <button class="btn btn-danger" style="flex: 1;" onclick="handleRejectExpert(${expert.id})">
                                <i class="fas fa-times"></i> Reject
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function handleApproveExpert(expertId) {
    showToast('Expert approved! Login credentials sent via SMS and email.', 'success');
    AppState.pendingVerifications = AppState.pendingVerifications.filter(e => e.id !== expertId);
    setTimeout(() => {
        showScreen('admin-dashboard');
    }, 1500);
}

function handleRejectExpert(expertId) {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
        showToast('Expert application rejected. Notification sent.', 'info');
        AppState.pendingVerifications = AppState.pendingVerifications.filter(e => e.id !== expertId);
        setTimeout(() => {
            showScreen('admin-verifications');
        }, 1000);
    }
}

function renderAdminUsers() {
    return `
        <div class="screen">
            <div class="header">
                <button class="header-back" onclick="showScreen('admin-dashboard')"><i class="fas fa-arrow-left"></i></button>
                <h1 class="header-title">User Management</h1>
                <div></div>
            </div>
            <div class="content">
                <div class="search-bar">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" class="search-input" placeholder="Search users...">
                </div>
                
                <div class="tabs">
                    <div class="tab active">All Users</div>
                    <div class="tab">Customers</div>
                    <div class="tab">Experts</div>
                </div>
                
                <div class="card">
                    <div class="flex justify-between items-center">
                        <div>
                            <div style="font-weight: 600;">Priya Sharma</div>
                            <div style="font-size: var(--font-size-sm); color: var(--gray-600);">Customer</div>
                            <div style="font-size: var(--font-size-xs); color: var(--gray-500); margin-top: 4px;">+91-9876543215</div>
                        </div>
                        <div class="flex gap-2">
                            <button class="btn btn-sm btn-outline">View</button>
                            <button class="btn btn-sm btn-danger">Block</button>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="flex justify-between items-center">
                        <div>
                            <div style="font-weight: 600;">Rajesh Kumar</div>
                            <div style="font-size: var(--font-size-sm); color: var(--gray-600);">Expert - Plumber</div>
                            <div style="font-size: var(--font-size-xs); color: var(--gray-500); margin-top: 4px;">+91-9876543210</div>
                        </div>
                        <div class="flex gap-2">
                            <button class="btn btn-sm btn-outline">View</button>
                            <button class="btn btn-sm btn-danger">Block</button>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="flex justify-between items-center">
                        <div>
                            <div style="font-weight: 600;">Amit Sharma</div>
                            <div style="font-size: var(--font-size-sm); color: var(--gray-600);">Expert - Electrician</div>
                            <div style="font-size: var(--font-size-xs); color: var(--gray-500); margin-top: 4px;">+91-9876543211</div>
                        </div>
                        <div class="flex gap-2">
                            <button class="btn btn-sm btn-outline">View</button>
                            <button class="btn btn-sm btn-danger">Block</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleLogout() {
    AppState.currentUser = null;
    AppState.userType = null;
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
        showScreen('splash');
    }, 1000);
}

// Event Listeners
function attachEventListeners() {
    // Customer Registration Form
    const customerRegisterForm = document.getElementById('customer-register-form');
    if (customerRegisterForm) {
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                const password = e.target.value;
                const strengthBar = document.getElementById('password-strength');
                
                if (password.length === 0) {
                    strengthBar.className = 'password-strength-bar';
                } else if (password.length < 6) {
                    strengthBar.className = 'password-strength-bar weak';
                } else if (password.length < 10) {
                    strengthBar.className = 'password-strength-bar medium';
                } else {
                    strengthBar.className = 'password-strength-bar strong';
                }
            });
        }
        
        customerRegisterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Sending OTP...', 'info');
            setTimeout(() => {
                showToast('Registration successful!', 'success');
                const phone = document.getElementById('phone').value;
                const email = document.getElementById('email').value;
                AppState.currentUser = { name: 'Customer', phone, email };
                setTimeout(() => {
                    showScreen('customer-dashboard');
                }, 1000);
            }, 1500);
        });
    }
    
    // Customer Login Form
    const customerLoginForm = document.getElementById('customer-login-form');
    if (customerLoginForm) {
        customerLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Logging in...', 'info');
            setTimeout(() => {
                const phone = document.getElementById('login-phone').value;
                AppState.currentUser = { name: 'John Doe', phone, email: 'john@example.com' };
                showToast('Login successful!', 'success');
                setTimeout(() => {
                    showScreen('customer-dashboard');
                }, 1000);
            }, 1000);
        });
    }
    
    // Expert Registration Form
    const expertRegisterForm = document.getElementById('expert-register-form');
    if (expertRegisterForm) {
        expertRegisterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Application submitted for verification!', 'success');
            setTimeout(() => {
                showScreen('splash');
            }, 2000);
        });
    }
    
    // Expert Login Form
    const expertLoginForm = document.getElementById('expert-login-form');
    if (expertLoginForm) {
        expertLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Logging in...', 'info');
            setTimeout(() => {
                AppState.currentUser = { name: 'Rajesh Kumar', category: 'Plumber' };
                showToast('Login successful!', 'success');
                setTimeout(() => {
                    showScreen('expert-dashboard');
                }, 1000);
            }, 1000);
        });
    }
    
    // Animate delivery tracking
    const driverMarker = document.getElementById('driver-marker');
    if (driverMarker) {
        let position = 100;
        const interval = setInterval(() => {
            position -= 2;
            driverMarker.style.top = position + 'px';
            driverMarker.style.right = position + 'px';
            
            const eta = Math.max(5, Math.floor(position / 4));
            const etaElement = document.getElementById('eta');
            if (etaElement) {
                etaElement.textContent = eta + ' mins';
            }
            
            if (position <= 20) {
                clearInterval(interval);
            }
        }, 100);
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    showScreen('splash');
});