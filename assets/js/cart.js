/**
 * System zarządzania koszykiem
 */
class CartManager {
    constructor() {
        this.initializeElements();
        this.initialize();
    }

    /**
     * Inicjalizacja elementów DOM
     */
    initializeElements() {
        // Elementy koszyka
        this.cartItems = document.getElementById('cartItems');
        // Licznik koszyka w nagłówku
        this.cartCount = document.querySelector('.cart-count');
        // Element wyświetlający sumę częściową
        this.subtotalElement = document.querySelector('.subtotal');
        // Element wyświetlający całkowitą sumę koszyka
        this.totalElement = document.querySelector('.cart-total');
        // Sekcja pustego koszyka
        this.cartEmptyElement = document.querySelector('.cart-empty');
        // Sekcja zawartości koszyka
        this.cartContent = document.querySelector('.cart-content');
        // Szablon wiersza koszyka
        this.template = document.getElementById('cart-item-template');
    }

    /**
     * Implementacja wzorca Singleton
     * Zapewnia, że istnieje tylko jedna instancja CartManager
     */
    static getInstance() {
        if (!CartManager.instance) {
            CartManager.instance = new CartManager();
        }
        return CartManager.instance;
    }

    /**
     * Inicjalizacja systemu koszyka
     */
    initialize() {
        // Załaduj koszyk z localStorage
        this.loadCart();
        // Skonfiguruj detektory zdarzeń
        this.setupEventListeners();
        // Aktualizuj wyświetlanie koszyka
        this.updateCartDisplay();
    }

    /**
     * Załaduj koszyk z localStorage
     */
    loadCart() {
        try {
            // Pobierz koszyk z localStorage lub zainicjuj pusty koszyk
            this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        } catch (error) {
            console.error('Błąd ładowania koszyka:', error);
            this.cart = []; // W przypadku błędu zainicjuj pusty koszyk
        }
        this.updateCartCount(); // Aktualizuj licznik koszyka po załadowaniu
    }

    /**
     * Zapisz koszyk w localStorage
     */
    saveCart() {
        try {
            // Zapisz koszyk w localStorage
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.updateCartCount(); // Aktualizuj licznik koszyka po zapisaniu
            this.updateCartDisplay(); // Aktualizuj wyświetlanie koszyka po zapisaniu
        } catch (error) {
            console.error('Błąd zapisywania koszyka:', error);
        }
    }

    /**
     * Aktualizacja licznika koszyka w nagłówku
     */
    updateCartCount() {
        // Oblicz całkowitą liczbę przedmiotów w koszyku
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);

        // Aktualizuj wszystkie liczniki koszyka na stronie
        document.querySelectorAll('.cart-count').forEach(counter => {
            if (counter) {
                counter.textContent = totalItems; // Ustaw tekst licznika na całkowitą liczbę przedmiotów
                counter.style.display = totalItems > 0 ? 'flex' : 'none'; // Pokaż licznik, jeśli są przedmioty
                counter.classList.toggle('show', totalItems > 0); // Dodaj/usuń klasę 'show'
            }
        });
    }

    /**
     * Aktualizacja wyświetlania koszyka
     */
    updateCartDisplay() {
        if (this.cart.length === 0) {
            this.showEmptyCart(); // Pokaż pusty koszyk, jeśli koszyk jest pusty
            return;
        }

        this.showCartContent(); // Pokaż zawartość koszyka, jeśli koszyk nie jest pusty
        if (this.cartItems) {
            this.renderCartItems(); // Renderuj przedmioty koszyka
        }
        this.updateTotals(); // Aktualizuj sumy koszyka
    }

    /**
     * Renderowanie przedmiotów koszyka
     */
    renderCartItems() {
        if (!this.cartItems || !this.template) return;

        this.cartItems.innerHTML = ''; // Wyczyść aktualną zawartość koszyka

        this.cart.forEach(item => {
            const cartItem = this.template.content.cloneNode(true); // Sklonuj szablon wiersza koszyka
            const itemElement = cartItem.querySelector('.cart-row'); // Znajdź element wiersza koszyka

            if (!itemElement) return;

            itemElement.dataset.productId = item.id; // Ustaw atrybut data-product-id

            // Ustaw obraz przedmiotu
            const img = itemElement.querySelector('.product-image img');
            if (img) {
                img.src = item.image; // Ustaw źródło obrazu
                img.alt = item.name; // Ustaw tekst alternatywny obrazu
            }

            // Ustaw szczegóły przedmiotu
            const nameElement = itemElement.querySelector('.product-details h3');
            if (nameElement) nameElement.textContent = item.name; // Ustaw nazwę produktu

            const priceElement = itemElement.querySelector('.price');
            if (priceElement) priceElement.textContent = item.price; // Ustaw cenę produktu

            // Ustaw ilość
            const quantityInput = itemElement.querySelector('.quantity-controls input');
            if (quantityInput) quantityInput.value = item.quantity; // Ustaw wartość ilości

            // Oblicz i ustaw sumę
            const priceValue = this.extractPrice(item.price); // Wyodrębnij wartość ceny
            const total = (priceValue * item.quantity).toFixed(2); // Oblicz sumę
            const totalElement = itemElement.querySelector('.total');
            if (totalElement) totalElement.textContent = `${total} PLN`; // Ustaw sumę w formacie PLN

            // Skonfiguruj kontrolki przedmiotu
            this.setupItemControls(itemElement, item.id);

            this.cartItems.appendChild(itemElement); // Dodaj element przedmiotu do koszyka
        });
    }

    /**
     * Konfiguracja kontrolek przedmiotu
     */
    setupItemControls(itemElement, productId) {
        const quantityInput = itemElement.querySelector('.quantity-controls input');
        const minusBtn = itemElement.querySelector('.minus');
        const plusBtn = itemElement.querySelector('.plus');
        const removeBtn = itemElement.querySelector('.remove-item');

        if (minusBtn) {
            minusBtn.addEventListener('click', () => this.updateQuantity(productId, -1)); // Zmniejsz ilość
        }

        if (plusBtn) {
            plusBtn.addEventListener('click', () => this.updateQuantity(productId, 1)); // Zwiększ ilość
        }

        if (quantityInput) {
            quantityInput.addEventListener('change', (e) =>
                this.setQuantity(productId, parseInt(e.target.value))); // Ustaw ilość z pola input
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', () => this.removeItem(productId)); // Usuń przedmiot
        }
    }

    /**
     * Aktualizacja ilości przedmiotu
     */
    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId); // Znajdź przedmiot w koszyku
        if (!item) return;

        const newQuantity = item.quantity + change; // Oblicz nową ilość
        if (newQuantity >= 1 && newQuantity <= 99) {
            // Sprawdź, czy nowa ilość jest w prawidłowym zakresie
            item.quantity = newQuantity; // Aktualizuj ilość przedmiotu
            this.saveCart(); // Zapisz koszyk
        }
    }

    /**
     * Ustawienie określonej ilości
     */
    setQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId); // Znajdź przedmiot w koszyku
        if (!item) return;

        quantity = Math.max(1, Math.min(99, quantity)); // Ogranicz ilość do zakresu 1-99
        item.quantity = quantity; // Ustaw ilość przedmiotu
        this.saveCart(); // Zapisz koszyk
    }

    /**
     * Dodanie przedmiotu do koszyka
     */
    addToCart(productData) {
        const existingItem = this.cart.find(item => item.id === productData.id); // Sprawdź, czy przedmiot już istnieje

        if (existingItem) {
            existingItem.quantity += productData.quantity; // Zwiększ ilość istniejącego przedmiotu
        } else {
            this.cart.push(productData); // Dodaj nowy przedmiot do koszyka
        }

        this.saveCart(); // Zapisz koszyk
        return true; // Zwróć true po dodaniu do koszyka
    }

    /**
     * Usunięcie przedmiotu z koszyka
     */
    removeItem(productId) {
        const itemElement = document.querySelector(`[data-product-id="${productId}"]`); // Znajdź element przedmiotu w DOM

        if (itemElement) {
            itemElement.style.animation = 'slideOut 0.3s ease-out'; // Dodaj animację usunięcia

            setTimeout(() => {
                this.cart = this.cart.filter(item => item.id !== productId); // Filtruj koszyk, usuwając przedmiot
                this.saveCart(); // Zapisz koszyk
            }, 300); // Opóźnienie na animację
        }
    }

    /**
     * Wyodrębnienie wartości ceny z ciągu znaków
     */
    extractPrice(priceString) {
        return parseFloat(priceString.replace(/[^0-9.-]+/g, '')); // Usuń znaki inne niż cyfry, kropki i minusy
    }

    /**
     * Aktualizacja sum koszyka
     */
    updateTotals() {
        if (!this.subtotalElement || !this.totalElement) return;

        const subtotal = this.cart.reduce((sum, item) => {
            return sum + (this.extractPrice(item.price) * item.quantity); // Oblicz sumę częściową
        }, 0);

        this.subtotalElement.textContent = `${subtotal.toFixed(2)} PLN`; // Ustaw sumę częściową
        this.totalElement.textContent = `${subtotal.toFixed(2)} PLN`; // Ustaw sumę całkowitą
    }

    /**
     * Wyświetlenie komunikatu o pustym koszyku
     */
    showEmptyCart() {
        if (this.cartContent) this.cartContent.style.display = 'none'; // Ukryj zawartość koszyka
        if (this.cartEmptyElement) this.cartEmptyElement.style.display = 'flex'; // Pokaż komunikat o pustym koszyku
    }

    /**
     * Wyświetlenie zawartości koszyka
     */
    showCartContent() {
        if (this.cartContent) this.cartContent.style.display = 'grid'; // Pokaż zawartość koszyka
        if (this.cartEmptyElement) this.cartEmptyElement.style.display = 'none'; // Ukryj komunikat o pustym koszyku
    }

    /**
     * Konfiguracja detektorów zdarzeń
     */
    setupEventListeners() {
        // Detektor zdarzenia storage dla aktualizacji koszyka między kartami/oknami
        window.addEventListener('storage', (e) => {
            if (e.key === 'cart') {
                // Jeśli klucz to 'cart', załaduj i zaktualizuj koszyk
                this.loadCart();
                this.updateCartDisplay();
            }
        });
    }
}

// Eksport do użycia w innych modułach
export default CartManager;

// Inicjalizacja po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    window.app = window.app || {}; // Inicjalizacja przestrzeni nazw aplikacji, jeśli nie istnieje
    window.app.cartManager = CartManager.getInstance(); // Inicjalizacja CartManager po załadowaniu strony
});
