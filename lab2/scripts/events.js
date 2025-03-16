// document.addEventListener("DOMContentLoaded", function () {
//     const events = [
//         { 
//             title: "Концерт 'Океан Ельзи'", date: "2025-03-15", location: "Київ, Палац Спорту", price: "1200 грн" 
//         },
//         { 
//             title: "Театральна вистава 'Гамлет'", date: "2025-04-20", location: "Львів, Театр ім. Марії Заньковецької", price: "800 грн" 
//         },
//         { 
//             title: "Фестиваль 'Atlas Weekend 2025'", date: "2025-07-05", location: "Київ, ВДНГ", price: "2500 грн" 
//         },
//         { 
//             title: "Stand-up вечір", date: "2025-03-25", location: "Харків, Comedy Club", price: "600 грн" 
//         },
//         { 
//             title: "Концерт 'Клавдія Петрівна'", date: "2025-04-15", location: "Львів, Малевич", price: "1099 грн" 
//         },
//         { 
//             title: "Фестиваль 'Respublica 2025'", date: "2025-09-10", location: "Кам'янець-Подільський", price: "1500 грн" 
//         },
//         { 
//             title: "Кінофестиваль 'Molodist'", date: "2025-05-30", location: "Київ, кінотеатр 'Жовтень'", price: "200 грн" 
//         },
//         { 
//             title: "Оперна вистава 'Травіата'", date: "2025-06-15", location: "Одеса, Оперний театр", price: "900 грн" 
//         }
//     ];

//     const today = new Date(); // Отримуємо поточну дату
//     const eventsGrid = document.querySelector(".events-grid");
    
//     let i = 0;
//     while (i < events.length) {
//         let eventDate = new Date(events[i].date);
        
//         if (eventDate >= today) { // Перевіряємо, чи подія ще не відбулася
//             const eventElement = document.createElement("div");
//             eventElement.classList.add("event");

//             eventElement.innerHTML = `
//                 <h3>${events[i].title}</h3>
//                 <p><strong>Дата:</strong> ${events[i].date}</p>
//                 <p><strong>Місце:</strong> ${events[i].location}</p>
//                 <p><strong>Ціна:</strong> ${events[i].price}</p>
//                 <button>Забронювати</button>
//             `;

//             eventsGrid.appendChild(eventElement);
//         }

//         i++;
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
    const events = [
        { title: "Концерт 'Океан Ельзи'", date: "2025-03-15", location: "Київ, Палац Спорту", price: "1200 грн" },
        { title: "Театральна вистава 'Гамлет'", date: "2025-04-20", location: "Львів, Театр ім. Марії Заньковецької", price: "800 грн" },
        { title: "Фестиваль 'Atlas Weekend 2025'", date: "2025-07-05", location: "Київ, ВДНГ", price: "2500 грн" },
        { title: "Stand-up вечір", date: "2025-03-25", location: "Харків, Comedy Club", price: "600 грн" },
        { title: "Концерт 'Клавдія Петрівна'", date: "2025-04-15", location: "Львів, Малевич", price: "1099 грн" },
        { title: "Фестиваль 'Respublica 2025'", date: "2025-09-10", location: "Кам'янець-Подільський", price: "1500 грн" },
        { title: "Кінофестиваль 'Molodist'", date: "2025-05-30", location: "Київ, кінотеатр 'Жовтень'", price: "200 грн" },
        { title: "Оперна вистава 'Травіата'", date: "2025-06-15", location: "Одеса, Оперний театр", price: "900 грн" }
    ];

    const today = new Date();
    const eventsGrid = document.querySelector(".events-grid");
    const modal = document.getElementById("booking-modal");
    const closeModal = document.getElementById("close-modal");
    const bookingForm = document.getElementById("booking-form");
    const totalPriceElement = document.getElementById("total-price");
    let currentBookButton = null; // Кнопка, яка викликала бронювання

    // Завантажуємо заброньовані квитки з localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const bookedEvents = bookings.map(booking => booking.event.title);

    events.forEach(event => {
        let eventDate = new Date(event.date);

        if (eventDate >= today) {
            const eventElement = document.createElement("div");
            eventElement.classList.add("event");
            eventElement.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>Дата:</strong> ${event.date}</p>
                <p><strong>Місце:</strong> ${event.location}</p>
                <p><strong>Ціна:</strong> ${event.price}</p>
                <button class="book-btn">Забронювати</button>
            `;

            const bookButton = eventElement.querySelector(".book-btn");

            // Якщо подія вже заброньована, змінюємо кнопку
            if (bookedEvents.includes(event.title)) {
                bookButton.textContent = "Заброньовано";
                bookButton.disabled = true;
                bookButton.classList.add("booked");
            } else {
                bookButton.addEventListener("click", function () {
                    openBookingForm(event, this);
                });
            }

            eventsGrid.appendChild(eventElement);
        }
    });

    function updateTotalPrice(event, quantity) {
        const price = parseFloat(event.price.replace(/\D/g, ''));
        totalPriceElement.textContent = (price * quantity).toLocaleString() + ' грн';
    }

    function openBookingForm(event, bookButton) {
        modal.style.display = "block";
        currentBookButton = bookButton; // Запам'ятовуємо кнопку, яка викликала бронювання

        bookingForm.dataset.eventTitle = event.title;
        bookingForm.dataset.eventDate = event.date;
        bookingForm.dataset.eventLocation = event.location;
        bookingForm.dataset.eventPrice = event.price;

        document.getElementById("ticket-quantity").addEventListener("input", function () {
            updateTotalPrice(event, this.value);
        });
    }

    bookingForm.onsubmit = function (e) {
        e.preventDefault();

        const event = {
            title: bookingForm.dataset.eventTitle,
            date: bookingForm.dataset.eventDate,
            location: bookingForm.dataset.eventLocation,
            price: bookingForm.dataset.eventPrice
        };

        const formData = new FormData(bookingForm);
        const bookingData = {
            event: event,
            firstName: formData.get("first-name"),
            lastName: formData.get("last-name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            ticketQuantity: formData.get("ticket-quantity"),
            totalPrice: totalPriceElement.textContent
        };

        bookings.push(bookingData);
        localStorage.setItem("bookings", JSON.stringify(bookings));

        if (currentBookButton) {
            currentBookButton.textContent = "Заброньовано";
            currentBookButton.disabled = true;
            currentBookButton.classList.add("booked");
        }

        modal.style.display = "none";
        alert("Бронювання підтверджено!");
        window.location.href = "booking.html";
    };

    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});
