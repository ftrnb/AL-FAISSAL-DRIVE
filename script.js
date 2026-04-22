document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // --- Header Background on Scroll ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const icon = item.querySelector('i');
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.style.padding = '0 20px';
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.padding = '0 20px 20px 20px';
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        });
    });

    // --- Fleet Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            carCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- High Conversion Booking Modal ---
    const modal = document.getElementById('bookingModal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalCarName = document.getElementById('modalCarName');
    const modalCarPrice = document.getElementById('modalCarPrice');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const carName = btn.getAttribute('data-car');
            const carPrice = btn.getAttribute('data-price');
            
            modalCarName.textContent = carName;
            modalCarPrice.textContent = `€${carPrice}`;
            modal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

   // --- GESTION RÉELLE DES RÉSERVATIONS VIA WHATSAPP ---
const finalForm = document.getElementById('finalBookingForm');

if (finalForm) {
    finalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Récupération des données saisies par le client
        const carName = document.getElementById('modalCarName').innerText;
        const customerName = finalForm.querySelector('input[type="text"]').value;
        const customerPhone = finalForm.querySelector('input[type="tel"]').value;
        
        // Récupération des dates (on prend le premier et deuxième champ date)
        const dates = finalForm.querySelectorAll('input[type="date"]');
        const datePick = dates[0].value;
        const dateReturn = dates[1].value;

        // 2. Création du message WhatsApp (formaté pour être lisible)
        const message = `Bonjour Al Faissal Drive !%0A` + 
                        `Je souhaite faire une réservation :%0A%0A` +
                        `🚗 *Véhicule* : ${carName}%0A` +
                        `👤 *Client* : ${customerName}%0A` +
                        `📞 *Téléphone* : ${customerPhone}%0A` +
                        `📅 *Prise en charge* : ${datePick}%0A` +
                        `📅 *Retour* : ${dateReturn}`;

        // 3. Lien WhatsApp avec votre numéro (212661689659)
        const whatsappUrl = `https://wa.me/212661689659?text=${message}`;

        // 4. Action ! Ferme la fenêtre et ouvre WhatsApp
        const modal = document.getElementById('bookingModal');
        if(modal) modal.style.display = 'none';
        
        window.open(whatsappUrl, '_blank');
        
        // Reset du formulaire pour le prochain client
        finalForm.reset();
    });
}
});
