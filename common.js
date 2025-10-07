// common.js - Shared functionality for all pages

// User authentication and profile management
function checkAuthentication() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!isLoggedIn || !currentUser) {
        window.location.href = 'login.html';
        return null;
    }
    
    return currentUser;
}

function updateUserProfile() {
    const currentUser = checkAuthentication();
    if (!currentUser) return;
    
    // Update dashboard welcome message
    if (document.getElementById('dashboard-username')) {
        document.getElementById('dashboard-username').textContent = currentUser.name;
    }
    
    // Update profile information on all pages
    const profileInfoElements = document.querySelectorAll('.profile-info');
    profileInfoElements.forEach(element => {
        if (element.querySelector('p')) {
            element.innerHTML = `
                <p><strong>Name:</strong> ${currentUser.name}</p>
                <p><strong>Roll No:</strong> ${currentUser.rollNo}</p>
                <p><strong>Program:</strong> ${currentUser.program}</p>
                <p><strong>Year:</strong> ${currentUser.year}</p>
                <p><strong>Date of Birth:</strong> ${currentUser.dob}</p>
                <p><strong>Gender:</strong> ${currentUser.gender}</p>
                <p><strong>Blood Group:</strong> ${currentUser.bloodGroup}</p>
            `;
        }
    });
    
    // Update contact information
    const contactInfoElements = document.querySelectorAll('.profile-info + .profile-info, .card .profile-info:nth-child(2)');
    contactInfoElements.forEach(element => {
        if (element.querySelector('p')) {
            element.innerHTML = `
                <p><strong>Hostel:</strong> ${currentUser.hostel}</p>
                <p><strong>Room No:</strong> ${currentUser.roomNo}</p>
                <p><strong>Mobile:</strong> ${currentUser.mobile}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
                <p><strong>Emergency Contact:</strong> ${currentUser.emergencyContact}</p>
            `;
        }
    });
    
    // Pre-fill edit form
    if (document.getElementById('edit-mobile')) {
        document.getElementById('edit-mobile').value = currentUser.mobile;
        document.getElementById('edit-email').value = currentUser.email;
        document.getElementById('edit-emergency').value = currentUser.emergencyContact.split(' ')[0];
    }
    
    // Update pass history with user-specific data
    updatePassHistory(currentUser);
}

function updatePassHistory(user) {
    // This would typically come from a database, but we'll use sample data
    const outPassHistory = [
        { date: "03-09-2023", outTime: "10:00 AM", returnTime: "06:00 PM", purpose: "Medical", status: "Approved" },
        { date: "01-09-2023", outTime: "02:00 PM", returnTime: "08:00 PM", purpose: "Personal", status: "Approved" },
        { date: "28-08-2023", outTime: "09:00 AM", returnTime: "04:00 PM", purpose: "Shopping", status: "Rejected" }
    ];
    
    const homePassHistory = [
        { from: "15-08-2023", to: "17-08-2023", destination: "Chennai", purpose: "Family Function", status: "Approved" },
        { from: "05-08-2023", to: "06-08-2023", destination: "Bangalore", purpose: "Personal", status: "Approved" },
        { from: "01-08-2023", to: "03-08-2023", destination: "Coimbatore", purpose: "Emergency", status: "Rejected" }
    ];
    
    // Update out pass table if it exists
    const outPassTable = document.querySelector('.card:first-child table tbody');
    if (outPassTable) {
        outPassTable.innerHTML = outPassHistory.map(pass => `
            <tr>
                <td>${pass.date}</td>
                <td>${pass.outTime}</td>
                <td>${pass.returnTime}</td>
                <td>${pass.purpose}</td>
                <td>${pass.status}</td>
            </tr>
        `).join('');
    }
    
    // Update home pass table if it exists
    const homePassTable = document.querySelector('.card:nth-child(2) table tbody');
    if (homePassTable) {
        homePassTable.innerHTML = homePassHistory.map(pass => `
            <tr>
                <td>${pass.from}</td>
                <td>${pass.to}</td>
                <td>${pass.destination}</td>
                <td>${pass.purpose}</td>
                <td>${pass.status}</td>
            </tr>
        `).join('');
    }
    
    // Update recent passes on out-pass and home-pass pages
    const recentOutPassTable = document.querySelector('.card:nth-child(2) table tbody');
    if (recentOutPassTable && document.querySelector('.card h3').textContent.includes('Recent')) {
        recentOutPassTable.innerHTML = outPassHistory.map(pass => `
            <tr>
                <td>${pass.date}</td>
                <td>${pass.outTime}</td>
                <td>${pass.returnTime}</td>
                <td>${pass.status}</td>
            </tr>
        `).join('');
    }
    
    const recentHomePassTable = document.querySelector('.card:nth-child(2) table tbody');
    if (recentHomePassTable && document.querySelector('.card h3').textContent.includes('Recent')) {
        recentHomePassTable.innerHTML = homePassHistory.map(pass => `
            <tr>
                <td>${pass.from}</td>
                <td>${pass.to}</td>
                <td>${pass.destination}</td>
                <td>${pass.status}</td>
            </tr>
        `).join('');
    }
}

function handleLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'login.html';
            }
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateUserProfile();
    handleLogout();
});