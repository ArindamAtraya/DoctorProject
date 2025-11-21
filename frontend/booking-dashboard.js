// Booking Dashboard JavaScript
let currentBooking = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Booking dashboard loaded');
    initializeBookingDashboard();
});

function initializeBookingDashboard() {
    console.log('🔍 Initializing booking dashboard...');
    
    // Get booking data from sessionStorage - THIS IS REQUIRED
    const backup = sessionStorage.getItem('lastBooking');
    console.log('✅ Backup available:', !!backup);
    
    if (!backup) {
        console.error('❌ NO BOOKING DATA FOUND');
        document.body.innerHTML = '<div style="text-align:center; padding:50px;"><h2>No appointment found</h2><p>Please book an appointment first.</p><a href="index.html" style="color: #3B82F6; text-decoration: none;">← Go Back to Home</a></div>';
        return;
    }
    
    try {
        const bookingData = JSON.parse(backup);
        console.log('📦 Booking data:', bookingData);
        
        currentBooking = {
            _id: bookingData.id,
            doctorName: bookingData.doctorName,
            doctorSpecialty: 'Specialist',
            hospital: bookingData.providerName,
            fee: bookingData.consultationFee,
            date: bookingData.date,
            time: bookingData.time,
            patientName: 'You',
            patientId: 'N/A',
            queueNumber: bookingData.queueNumber,
            estimatedWait: 0
        };
        
        console.log('✨ Current booking set:', currentBooking);
        updateDashboardDisplay();
        
    } catch (error) {
        console.error('❌ Error parsing booking data:', error);
        document.body.innerHTML = '<div style="text-align:center; padding:50px;"><h2>Error loading appointment</h2><p>' + error.message + '</p><a href="index.html" style="color: #3B82F6; text-decoration: none;">← Go Back to Home</a></div>';
    }
}

function updateDashboardDisplay() {
    if (!currentBooking) {
        console.log('❌ No booking data available');
        return;
    }
    
    console.log('🎨 Updating dashboard display...');
    
    try {
        // Update all elements safely
        const updates = [
            ['dashboardDoctorName', currentBooking.doctorName || 'N/A'],
            ['dashboardSpecialty', currentBooking.doctorSpecialty || 'Specialist'],
            ['dashboardHospital', currentBooking.hospital || 'N/A'],
            ['dashboardFee', `₹${currentBooking.fee || 0}`],
            ['dashboardDate', new Date(currentBooking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
            ['dashboardTime', currentBooking.time || 'N/A'],
            ['dashboardBookingId', currentBooking._id || 'N/A'],
            ['dashboardPatientName', currentBooking.patientName || 'You'],
            ['dashboardPatientId', currentBooking.patientId || 'N/A'],
            ['dashboardQueuePosition', `#${currentBooking.queueNumber || 1}`],
            ['dashboardWaitTime', `${currentBooking.estimatedWait || 0} minutes`]
        ];
        
        updates.forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = value;
                console.log(`✅ Updated ${id}: ${value}`);
            } else {
                console.warn(`⚠️ Element not found: ${id}`);
            }
        });
        
        // Calculate estimated time
        if (currentBooking.time) {
            try {
                const timeParts = currentBooking.time.split(':');
                if (timeParts.length === 2) {
                    const [hours, minutes] = timeParts.map(Number);
                    const slotTime = new Date(currentBooking.date);
                    slotTime.setHours(hours, minutes, 0, 0);
                    
                    const estimatedTime = new Date(slotTime.getTime() + (currentBooking.estimatedWait || 0) * 60000);
                    const estimatedTimeStr = estimatedTime.toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                    });
                    
                    const estTimeEl = document.getElementById('dashboardEstimatedTime');
                    if (estTimeEl) {
                        estTimeEl.textContent = estimatedTimeStr;
                        console.log(`✅ Updated estimated time: ${estimatedTimeStr}`);
                    }
                }
            } catch (timeError) {
                console.error('⚠️ Error calculating estimated time:', timeError);
            }
        }
        
        console.log('✨ Dashboard display updated successfully!');
        
    } catch (error) {
        console.error('❌ Error updating dashboard display:', error);
    }
}

function rescheduleAppointment() {
    if (confirm('Do you want to reschedule this appointment?')) {
        alert('Rescheduling feature coming soon!');
    }
}

function cancelAppointment() {
    if (confirm('Are you sure you want to cancel this appointment? This action cannot be undone.')) {
        alert('Appointment cancelled successfully.');
        sessionStorage.removeItem('lastBooking');
        window.location.href = 'index.html';
    }
}

function downloadTicket() {
    if (!currentBooking) return;
    
    const ticketContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Appointment Ticket</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .ticket { border: 2px solid #000; padding: 20px; max-width: 500px; margin: 0 auto; }
                .header { text-align: center; margin-bottom: 20px; }
                .section { margin-bottom: 15px; }
                .section-title { font-weight: bold; margin-bottom: 5px; }
                .detail-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
                .barcode { text-align: center; margin-top: 20px; font-family: 'Courier New', monospace; }
            </style>
        </head>
        <body>
            <div class="ticket">
                <div class="header">
                    <h2>HealthConnect</h2>
                    <h3>Appointment Ticket</h3>
                </div>
                <div class="section">
                    <div class="section-title">Appointment Details</div>
                    <div class="detail-row"><span>Booking ID:</span><span>${currentBooking._id}</span></div>
                    <div class="detail-row"><span>Date:</span><span>${currentBooking.date}</span></div>
                    <div class="detail-row"><span>Time:</span><span>${currentBooking.time}</span></div>
                    <div class="detail-row"><span>Queue Position:</span><span>#${currentBooking.queueNumber}</span></div>
                </div>
                <div class="section">
                    <div class="section-title">Doctor Information</div>
                    <div class="detail-row"><span>Doctor:</span><span>${currentBooking.doctorName}</span></div>
                    <div class="detail-row"><span>Specialty:</span><span>${currentBooking.doctorSpecialty}</span></div>
                    <div class="detail-row"><span>Hospital:</span><span>${currentBooking.hospital}</span></div>
                </div>
                <div class="section">
                    <div class="section-title">Patient Information</div>
                    <div class="detail-row"><span>Patient:</span><span>${currentBooking.patientName}</span></div>
                </div>
                <div class="barcode">
                    ${currentBooking._id}
                    <br>
                    <small>Scan at reception</small>
                </div>
            </div>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(ticketContent);
    printWindow.document.close();
    printWindow.print();
}

function getPharmacyDirections() {
    const address = encodeURIComponent('Apollo Hospital, 123 Medical Avenue, City Center');
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
}
