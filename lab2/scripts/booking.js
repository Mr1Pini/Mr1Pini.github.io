document.addEventListener("DOMContentLoaded", function () {
    const bookingContainer = document.querySelector(".content");

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    if (bookings.length === 0) {
        bookingContainer.innerHTML = "<p>No bookings yet.</p>";
    } else {
        bookings.forEach(booking => {
            const bookingElement = document.createElement("div");
            bookingElement.classList.add("booking");
            bookingElement.innerHTML = `
                <h3>Event: ${booking.event.title}</h3>
                <p><strong>Date:</strong> ${booking.event.date}</p>
                <p><strong>Location:</strong> ${booking.event.location}</p>
                <p><strong>Price:</strong> ${booking.event.price}</p>
                <p><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</p>
                <p><strong>Tickets:</strong> ${booking.ticketQuantity}</p>
                <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
            `;
            bookingContainer.appendChild(bookingElement);
        });
    }
});