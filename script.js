document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Gestion des dates (Empêcher de choisir une date passée)
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });

    // 2. Filtres de la Flotte
    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Ajouter au bouton cliqué
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

    // 3. Gestion de la fenêtre Modale (Popup de réservation)
    const modal = document.getElementById('bookingModal');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalCarName = document.getElementById('modalCarName');
    const modalCarPrice = document.getElementById('modalCarPrice');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Récupérer les données de la voiture depuis le bouton
            const carName = btn.getAttribute('data-car');
            const carPrice = btn.getAttribute('data-price');
            
            // Mettre à jour le texte dans la modale
            modalCarName.textContent = carName;
            modalCarPrice.textContent = carPrice;
            
            // Afficher la modale
            modal.style.display = 'flex';
        });
    });

    // Fermer la modale avec la croix
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fermer la modale si on clique en dehors du contenu
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 4. Soumission du formulaire (Simulation pour l'instant)
    const bookingForm = document.getElementById('finalBookingForm');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Demande envoyée avec succès ! Nous vous contacterons sur WhatsApp rapidement.");
        modal.style.display = 'none';
        bookingForm.reset();
    });
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
