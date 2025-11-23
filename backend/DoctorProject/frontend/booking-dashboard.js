// Simple Booking Dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadAndDisplayBooking();
});

function loadAndDisplayBooking() {
    console.log('Loading booking dashboard...');
    
    // Get booking from localStorage
    const bookingJSON = localStorage.getItem('currentBooking');
    
    if (!bookingJSON) {
        console.error('No booking found');
        showErrorAndRedirect('No booking found. Please book an appointment first.');
        return;
    }
    
    try {
        const booking = JSON.parse(bookingJSON);
        console.log('Booking data:', booking);
        
        // Display the booking
        displayBooking(booking);
        
    } catch (error) {
        console.error('Error parsing booking:', error);
        showErrorAndRedirect('Error loading booking data.');
    }
}

function displayBooking(booking) {
    try {
        // Update all dashboard elements
        updateElement('dashboardDoctorName', booking.doctorName);
        updateElement('dashboardSpecialty', 'Specialist');
        updateElement('dashboardHospital', booking.providerName);
        updateElement('dashboardFee', `₹${booking.consultationFee}`);
        updateElement('dashboardDate', formatDate(booking.date));
        updateElement('dashboardTime', booking.time);
        updateElement('dashboardBookingId', booking.id);
        updateElement('dashboardPatientName', 'You');
        updateElement('dashboardPatientId', 'N/A');
        updateElement('dashboardQueuePosition', `#${booking.queueNumber}`);
        updateElement('dashboardWaitTime', '0 minutes');
        updateElement('dashboardEstimatedTime', booking.time);
        
        console.log('✅ Dashboard displayed successfully');
        
    } catch (error) {
        console.error('Error displaying booking:', error);
        showErrorAndRedirect('Error displaying booking information.');
    }
}

function updateElement(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = value;
    }
}

function formatDate(dateStr) {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    } catch (e) {
        return dateStr;
    }
}

function showErrorAndRedirect(message) {
    alert(message);
    window.location.href = 'index.html';
}

function rescheduleAppointment() {
    alert('Rescheduling feature coming soon!');
}

function cancelAppointment() {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        localStorage.removeItem('currentBooking');
        alert('Appointment cancelled.');
        window.location.href = 'index.html';
    }
}

function downloadTicket() {
    const bookingJSON = localStorage.getItem('currentBooking');
    if (!bookingJSON) return;
    
    const booking = JSON.parse(bookingJSON);
    const ticketHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Appointment Ticket</title>
            <style>
                body { font-family: Arial; padding: 20px; }
                .ticket { border: 2px solid #000; padding: 20px; max-width: 500px; margin: 0 auto; }
                .section { margin-bottom: 20px; }
                .row { display: flex; justify-content: space-between; margin: 10px 0; }
            </style>
        </head>
        <body>
            <div class="ticket">
                <h2 style="text-align:center;">Appointment Ticket</h2>
                <div class="section">
                    <h3>Doctor</h3>
                    <div class="row"><span>Name:</span><strong>${booking.doctorName}</strong></div>
                    <div class="row"><span>Hospital:</span><strong>${booking.providerName}</strong></div>
                </div>
                <div class="section">
                    <h3>Appointment</h3>
                    <div class="row"><span>Date:</span><strong>${booking.date}</strong></div>
                    <div class="row"><span>Time:</span><strong>${booking.time}</strong></div>
                    <div class="row"><span>Queue #:</span><strong>${booking.queueNumber}</strong></div>
                </div>
                <div class="section">
                    <h3>Fee</h3>
                    <div class="row"><span>Consultation:</span><strong>₹${booking.consultationFee}</strong></div>
                </div>
            </div>
        </body>
        </html>
    `;
    
    const w = window.open();
    w.document.write(ticketHTML);
    w.document.close();
    w.print();
}

function getPharmacyDirections() {
    window.open('https://www.google.com/maps', '_blank');
}
