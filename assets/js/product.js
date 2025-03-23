/**
 * Funkcjonalność galerii produktów
 */
class ProductGallery {
    constructor() {
        // Główny obraz produktu
        this.mainImage = document.querySelector('.main-image img');
        // Miniatury obrazów produktu
        this.thumbnails = document.querySelectorAll('.thumbnail');
        // Aktualny indeks wyświetlanego obrazu
        this.currentIndex = 0;
        // Flaga informująca, czy trwa przejście między obrazami
        this.isTransitioning = false;

        // Inicjalizacja galerii, jeśli istnieją elementy obrazu głównego i miniatur
        if (this.mainImage && this.thumbnails.length > 0) {
            this.initGallery();
        }
    }

    initGallery() {
        // Dodanie przejść CSS do głównego obrazu
        if (this.mainImage) {
            this.mainImage.style.opacity = '1'; // Ustawienie początkowej opopacity na 1
            this.mainImage.style.transition = 'opacity 0.3s ease-in-out'; // Dodanie przejścia opacity
        }

        // Obsługa kliknięć miniatur
        this.thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', (e) => {
                e.preventDefault(); // Zapobieganie domyślnej akcji linku
                if (this.isTransitioning) return; // Przerwanie, jeśli trwa już przejście

                const newImage = thumbnail.querySelector('img'); // Pobranie elementu img z miniatury
                // Sprawdzenie, czy nowy obraz istnieje i czy jego źródło jest różne od aktualnego obrazu głównego
                if (newImage && newImage.src !== this.mainImage.src) {
                    this.switchImage(newImage.src, index); // Przełączenie obrazu
                }
            });
        });

        // Ustawienie początkowego aktywnego stanu dla pierwszej miniatury
        if (this.thumbnails[0]) {
            this.thumbnails[0].classList.add('active'); // Dodanie klasy 'active' do pierwszej miniatury
        }

        // Dodanie nawigacji klawiaturą
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousImage(); // Przejście do poprzedniego obrazu
            } else if (e.key === 'ArrowRight') {
                this.nextImage(); // Przejście do następnego obrazu
            }
        });

        // Dodanie obsługi dotyku
        this.setupTouchEvents();
    }

    // Funkcja do przełączania obrazu
    switchImage(newSrc, newIndex) {
        if (this.isTransitioning || newIndex === this.currentIndex) return; // Przerwanie, jeśli trwa przejście lub indeks jest taki sam

        this.isTransitioning = true; // Ustawienie flagi przejścia na true

        // Wyciszenie aktualnego obrazu
        this.mainImage.style.opacity = '0'; // Ustawienie opacity na 0

        // Aktualizacja obrazu po wyciszeniu
        setTimeout(() => {
            this.mainImage.src = newSrc; // Zmiana źródła obrazu głównego
            this.mainImage.classList.add('fade-in'); // Dodanie klasy 'fade-in' dla efektu pojawiania się
            this.mainImage.style.opacity = '1'; // Ustawienie opacity na 1, aby obraz był widoczny

            // Aktualizacja aktywnej miniatury
            this.thumbnails[this.currentIndex].classList.remove('active'); // Usunięcie klasy 'active' z poprzedniej miniatury
            this.thumbnails[newIndex].classList.add('active'); // Dodanie klasy 'active' do nowej miniatury

            this.currentIndex = newIndex; // Aktualizacja aktualnego indeksu

            // Usunięcie klasy fade-in i reset blokady przejścia po pojawieniu się obrazu
            setTimeout(() => {
                this.mainImage.classList.remove('fade-in'); // Usunięcie klasy 'fade-in'
                this.isTransitioning = false; // Reset flagi przejścia
            }, 300); // Czas trwania animacji przejścia
        }, 300); // Opóźnienie przed zmianą źródła obrazu, odpowiadające czasowi wyciszania
    }

    // Funkcja do przełączania na poprzedni obraz
    previousImage() {
        if (this.isTransitioning) return; // Przerwanie, jeśli trwa przejście

        // Obliczenie indeksu poprzedniego obrazu
        const newIndex = (this.currentIndex - 1 + this.thumbnails.length) % this.thumbnails.length;
        const newImage = this.thumbnails[newIndex].querySelector('img'); // Pobranie elementu img poprzedniej miniatury

        if (newImage) {
            this.switchImage(newImage.src, newIndex); // Przełączenie obrazu na poprzedni
        }
    }

    // Funkcja do przełączania na następny obraz
    nextImage() {
        if (this.isTransitioning) return; // Przerwanie, jeśli trwa przejście

        // Obliczenie indeksu następnego obrazu
        const newIndex = (this.currentIndex + 1) % this.thumbnails.length;
        const newImage = this.thumbnails[newIndex].querySelector('img'); // Pobranie elementu img następnej miniatury

        if (newImage) {
            this.switchImage(newImage.src, newIndex); // Przełączenie obrazu na następny
        }
    }

    // Konfiguracja obsługi zdarzeń dotykowych
    setupTouchEvents() {
        let touchStartX = 0; // Początkowa pozycja X dotyku
        let touchEndX = 0; // Końcowa pozycja X dotyku

        // Detektor zdarzenia rozpoczęcia dotyku na głównym obrazie
        this.mainImage.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX; // Zapisanie pozycji X dotknięcia
        }, { passive: true }); // Opcja passive: true dla lepszej responsywności przewijania

        // Detektor zdarzenia zakończenia dotyku na głównym obrazie
        this.mainImage.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX; // Zapisanie pozycji X po zakończeniu dotyku
            const difference = touchStartX - touchEndX; // Obliczenie różnicy między początkową a końcową pozycją

            if (Math.abs(difference) > 50) { // Sprawdzenie, czy przesunięcie jest większe niż 50px (minimalna odległość swipe)
                if (difference > 0) {
                    this.nextImage(); // Przejście do następnego obrazu (swipe w lewo)
                } else {
                    this.previousImage(); // Przejście do poprzedniego obrazu (swipe w prawo)
                }
            }
        }, { passive: true }); // Opcja passive: true dla lepszej responsywności przewijania
    }
}

/**
 * Funkcjonalność strony produktu
 */
class ProductPage {
    constructor() {
        // Galeria produktu
        this.gallery = null;
        this.initialize(); // Inicjalizacja strony produktu
    }

    initialize() {
        // Inicjalizacja galerii
        this.gallery = new ProductGallery();

        // Inicjalizacja kontrolek ilości
        this.setupQuantityControls();

        // Inicjalizacja dodawania do koszyka
        this.setupAddToCart();
    }

    // Konfiguracja kontrolek ilości produktu
    setupQuantityControls() {
        const controls = document.querySelector('.quantity-controls'); // Znalezienie kontrolek ilości
        if (!controls) return; // Przerwanie, jeśli kontrolki nie istnieją

        const input = controls.querySelector('input'); // Znalezienie inputa ilości
        const minus = controls.querySelector('.minus'); // Znalezienie przycisku minus
        const plus = controls.querySelector('.plus'); // Znalezienie przycisku plus

        // Obsługa kliknięcia przycisku minus
        if (minus && input) {
            minus.addEventListener('click', () => {
                const currentValue = parseInt(input.value); // Pobranie aktualnej wartości z inputa
                if (currentValue > 1) {
                    input.value = currentValue - 1; // Zmniejszenie wartości o 1, jeśli jest większa niż 1
                }
            });
        }

        // Obsługa kliknięcia przycisku plus
        if (plus && input) {
            plus.addEventListener('click', () => {
                const currentValue = parseInt(input.value); // Pobranie aktualnej wartości z inputa
                if (currentValue < 99) {
                    input.value = currentValue + 1; // Zwiększenie wartości o 1, jeśli jest mniejsza niż 99
                }
            });
        }

        // Obsługa zmiany wartości w inpucie ilości
        if (input) {
            input.addEventListener('change', () => {
                let value = parseInt(input.value); // Parsowanie wartości z inputa
                if (isNaN(value) || value < 1) value = 1; // Ustawienie wartości na 1, jeśli jest NaN lub mniejsza niż 1
                if (value > 99) value = 99; // Ustawienie wartości na 99, jeśli jest większa niż 99
                input.value = value; // Aktualizacja wartości inputa
            });
        }
    }

    // Konfiguracja dodawania produktu do koszyka
    setupAddToCart() {
        const addToCartBtn = document.querySelector('.add-to-cart'); // Znalezienie przycisku "Dodaj do koszyka"
        if (!addToCartBtn) return; // Przerwanie, jeśli przycisk nie istnieje

        // Obsługa kliknięcia przycisku "Dodaj do koszyka"
        addToCartBtn.addEventListener('click', () => {
            const productElement = document.querySelector('[data-product-id]'); // Znalezienie elementu produktu po data-product-id
            if (!productElement) return; // Przerwanie, jeśli element produktu nie istnieje

            // Pobranie danych produktu
            const quantity = parseInt(document.querySelector('.quantity-controls input')?.value || 1); // Pobranie ilości z inputa lub domyślnie 1
            const productData = {
                id: productElement.dataset.productId, // ID produktu z dataset
                name: document.querySelector('.product-header h1')?.textContent, // Nazwa produktu z nagłówka
                price: document.querySelector('.price')?.textContent, // Cena produktu
                image: document.querySelector('.main-image img')?.src, // Źródło głównego obrazu
                quantity: quantity // Ilość produktu
            };

            this.addToCart(productData); // Dodanie produktu do koszyka
        });
    }

    // Funkcja dodająca produkt do koszyka
    addToCart(productData) {
        import('./cart.js').then(module => {
            const cartManager = module.default;
            if (cartManager.addToCart(productData)) {
                this.showNotification(); // Wyświetlenie powiadomienia o dodaniu do koszyka
            }
        }).catch(error => {
            console.error("Error loading CartManager:", error);
        });
    }

    // Wyświetlenie powiadomienia o dodaniu do koszyka
    showNotification() {
        const notification = document.createElement('div'); // Utworzenie elementu div dla powiadomienia
        notification.className = 'added-to-cart-notification glass'; // Dodanie klas CSS
        notification.textContent = 'Dodano do koszyka'; // Ustawienie tekstu powiadomienia

        document.body.appendChild(notification); // Dodanie powiadomienia do body

        // Animacja pojawiania się powiadomienia
        requestAnimationFrame(() => {
            notification.classList.add('show'); // Dodanie klasy 'show', aby rozpocząć animację
        });

        // Ukrycie i usunięcie powiadomienia po 2 sekundach
        setTimeout(() => {
            notification.classList.remove('show'); // Usunięcie klasy 'show', aby rozpocząć animację znikania
            setTimeout(() => notification.remove(), 300); // Usunięcie elementu powiadomienia z DOM po zakończeniu animacji znikania
        }, 2000); // Czas wyświetlania powiadomienia (2 sekundy)
    }
}

// Inicjalizacja strony produktu po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    // Sprawdzenie, czy na stronie znajduje się element .product-details (co sugeruje stronę produktu)
    if (document.querySelector('.product-details')) {
        new ProductPage(); // Utworzenie nowej instancji ProductPage, inicjalizując funkcjonalność strony produktu
    }
});
