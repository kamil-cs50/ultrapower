/**
 * Główny moduł aplikacji
 */
import * as THREE from 'three';
import vertexShader from '../assets/js/vertex.js';
import fragmentShader from '../assets/js/fragment.js';

class App {
    constructor() {
        this.initialize();
    }

    /**
     * Inicjalizacja aplikacji
     */
    initialize() {
        this.initializeModules();
        this.setupUIComponents();
        this.setupEventListeners();
        this.setupMobileMenu();
    }

    /**
     * Menu mobilne
     */
    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mainNav = document.querySelector('.main-nav');

        if (menuToggle && mainNav) {
            menuToggle.addEventListener('click', () => {
                mainNav.classList.toggle('show');
            });
        }
    }

    /**
     * Inicjalizacja głównych modułów
     */
    initializeModules() {
        // Inicjalizacja menedżera koszyka jako singleton
        this.cartManager = CartManager.getInstance();
    }

    /**
     * Konfiguracja komponentów UI
     */
    setupUIComponents() {
        this.setupHeader();
        this.setupAnimations();
        this.setupGlassEffects();
        this.setupInteractiveElements();
    }

    /**
     * Konfiguracja zachowania nagłówka
     */
    setupHeader() {
        const header = document.querySelector('.main-header');
        if (!header) return;

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 50) {
                header.style.background = 'rgba(18, 18, 26, 0.95)';
                header.style.backdropFilter = 'blur(16px)';
            } else {
                header.style.background = 'var(--color-bg-secondary)';
                header.style.backdropFilter = 'blur(12px)';
            }

            // Dodanie klasy kierunku przewijania
            header.classList.toggle('scrolling-up', currentScroll < lastScroll);
            lastScroll = currentScroll;
        });

        // Ustawienie aktywnego elementu menu
        this.setActiveMenuItem();
    }

    /**
     * Ustawienie aktywnego elementu menu na podstawie bieżącego adresu URL
     */
    setActiveMenuItem() {
        const currentPath = window.location.pathname;
        document.querySelectorAll('.main-nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath ||
                (currentPath.includes('/products/') && href.includes('/products/'))) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Konfiguracja animacji
     */
    setupAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    /**
     * Konfiguracja efektów szkła (glass morphism)
     */
    setupGlassEffects() {
        document.querySelectorAll('.glass').forEach(element => {
            element.style.backdropFilter = 'blur(16px)';
            element.style.webkitBackdropFilter = 'blur(16px)';
        });
    }

    /**
     * Konfiguracja interaktywnych elementów
     */
    setupInteractiveElements() {
        document.querySelectorAll('.glass.interactive').forEach(element => {
            this.addInteractiveEffect(element);
        });

        document.querySelectorAll('.cta-button').forEach(button => {
            this.addButtonEffect(button);
        });
    }

    /**
     * Dodanie interaktywnego efektu do elementu
     */
    addInteractiveEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / 15) * -1;
            const rotateY = (x - centerX) / 15;

            element.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.02, 1.02, 1.02)
            `;

            const gradientX = (x / rect.width) * 100;
            const gradientY = (y / rect.height) * 100;

            element.style.background = `
                radial-gradient(
                    circle at ${gradientX}% ${gradientY}%,
                    rgba(255, 255, 255, 0.1) 0%,
                    rgba(255, 255, 255, 0.05) 25%,
                    var(--color-glass) 50%
                )
            `;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            element.style.background = 'var(--color-glass)';
        });
    }

    /**
     * Dodanie efektu hover do przycisku
     */
    addButtonEffect(button) {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            button.style.setProperty('--mouse-x', `${x}px`);
            button.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    /**
     * Konfiguracja globalnych nasłuchiwaczy zdarzeń
     */
    setupEventListeners() {
        // Obsługa aktualizacji koszyka między kartami
        window.addEventListener('storage', (e) => {
            if (e.key === 'cart') {
                this.cartManager.loadCart();
            }
        });
    }

    /**
     * Wyświetlenie powiadomienia
     */
    static showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} glass`;
        notification.textContent = message;

        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Inicjalizacja aplikacji
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();

    // Interaktywne tło z cząsteczkami dla sekcji hero (WebGL)
    (function () {
        const canvas = document.querySelector('.hero-canvas');
        if (!canvas) return;

        let scene, camera, renderer, mesh;
        let mouseX = 0,
            mouseY = 0;

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(
                75,
                canvas.offsetWidth / canvas.offsetHeight,
                0.1,
                1000
            );
            camera.position.z = 5;
            camera.position.x = 0; // Wyśrodkowanie kamery w poziomie
            camera.position.y = 0;

            renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
            renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0x000000, 0); // Ustawienie tła jako przezroczystego

            // Autor: Thomas Cullen
            // Źródło: https://codesandbox.io/p/sandbox/4r6ef8?file=%2Fsrc%2FApp.js%3A1%2C1-93%2C1
            // Utworzenie geometrii ikosaedru
            const geometry = new THREE.IcosahedronGeometry(2, 20);

            // Utworzenie materiału shaderowego
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    u_time: { value: 0.0 },
                    u_speed: { value: 1.00 },
                    u_intensity: { value: 0.17 },
                    u_partical_size: { value: 26.0 },
                    u_color_a: { value: new THREE.Color('#372448') },
                    u_color_b: { value: new THREE.Color('#60ff7c') },
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                transparent: true,
            });

            // Utworzenie siatki
            mesh = new THREE.Points(geometry, material);
            mesh.position.set(0, 0, 0);
            scene.add(mesh);

            // Interakcja z myszą
            window.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
            });

            // Obsługa zmiany rozmiaru
            function resizeCanvas() {
                camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
            }
            window.addEventListener('resize', resizeCanvas);
        }

        function animate() {
            requestAnimationFrame(animate);

            // Aktualizacja uniformów
            mesh.material.uniforms.u_time.value += 0.01;
            mesh.material.uniforms.u_speed.value = 0.3 + (mouseX / canvas.width) * 0.2; // Przykład interakcji
            mesh.material.uniforms.u_intensity.value = 0.15 + (mouseY / canvas.height) * 0.1; // Przykład interakcji

            // Obracanie siatki
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.005;

            renderer.render(scene, camera);
        }

        init();
        animate();
    })();
});

export default App;
