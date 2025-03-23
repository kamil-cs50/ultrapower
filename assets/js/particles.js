// Poczekaj na załadowanie DOM
document.addEventListener('DOMContentLoaded', () => {
    // Pobierz element canvas i kontekst WebGL
    const canvas = document.querySelector("#particles-canvas");
    if (!canvas) return;

    const gl = canvas.getContext("webgl");

    // Sprawdź, czy WebGL jest wspierany
    if (!gl) {
        console.warn("WebGL nie jest wspierany przez Twoją przeglądarkę.");
        return;
    }

    // Ustawienie rozmiarów canvas na cały ekran
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    resizeCanvas();

    // Konfigurowalne parametry
    const config = {
        particleCount: 5000, // Liczba cząsteczek
        textArray: ["UltraPower", "Super Moce"], // Tablica tekstów do wyświetlenia
        mouseRadius: 0.1, // Promień interakcji myszy
        particleSize: 2, // Rozmiar cząsteczek
        forceMultiplier: 0.001, // Mnożnik siły odpychania
        returnSpeed: 0.005, // Prędkość powrotu cząsteczek do pozycji bazowej
        velocityDamping: 0.95, // Tłumienie prędkości cząsteczek
        colorMultiplier: 40000, // Mnożnik koloru (wpływa na hue)
        saturationMultiplier: 1000, // Mnożnik nasycenia koloru
        textChangeInterval: 10000, // Interwał zmiany tekstu (ms)
        rotationForceMultiplier: 0.5 // Mnożnik siły rotacji
    };

    // Inicjalizacja indeksu aktualnego tekstu
    let currentTextIndex = 0;
    // Zmienna dla timeoutu zmiany tekstu
    let nextTextTimeout;
    // Tablica współrzędnych tekstu
    let textCoordinates = [];

    // Obiekt reprezentujący mysz
    const mouse = {
        x: -500, // Pozycja X myszy (poza ekranem na początku)
        y: -500, // Pozycja Y myszy (poza ekranem na początku)
        radius: config.mouseRadius // Promień interakcji myszy
    };

    // Tablica cząsteczek
    const particles = [];
    // Inicjalizacja cząsteczek
    for (let i = 0; i < config.particleCount; i++) {
        particles.push({ x: 0, y: 0, baseX: 0, baseY: 0, vx: 0, vy: 0 });
    }

    // Vertex shader - odpowiedzialny za pozycję i rozmiar cząsteczek
    const vertexShaderSource = `
    attribute vec2 a_position; // Atrybut - pozycja cząsteczki
    attribute float a_hue; // Atrybut - hue (odcień) koloru
    attribute float a_saturation; // Atrybut - nasycenie koloru
    varying float v_hue; // Zmienna wariacyjna - hue przekazywane do fragment shader'a
    varying float v_saturation; // Zmienna wariacyjna - nasycenie przekazywane do fragment shader'a
    void main() {
        gl_PointSize = ${config.particleSize.toFixed(1)}; // Ustawienie rozmiaru punktu (cząsteczki)
        gl_Position = vec4(a_position, 0.0, 1.0); // Ustawienie pozycji cząsteczki
        v_hue = a_hue; // Przekazanie hue do fragment shader'a
        v_saturation = a_saturation; // Przekazanie nasycenia do fragment shader'a
    }
`;

    // Fragment shader - odpowiedzialny za kolor cząsteczek
    const fragmentShaderSource = `
    precision mediump float; // Ustawienie precyzji na średnią
    varying float v_hue; // Zmienna wariacyjna - hue otrzymane z vertex shader'a
    varying float v_saturation; // Zmienna wariacyjna - nasycenie otrzymane z vertex shader'a
    void main() {
        // Definicje kolorów (zielony i fioletowy)
        vec3 green = vec3(0.0, 1.0, 0.62); // #00FF9F - zielony
        vec3 purple = vec3(0.61, 0.0, 1.0); // #9D00FF - fioletowy

        // Mieszanie kolorów w zależności od v_hue (prędkości)
        float mixValue = mod(v_hue, 1.0); // Używamy mod, aby wartości były między 0 a 1
        vec3 color = mix(green, purple, mixValue); // Mieszanie zielonego i fioletowego

        // Mieszanie koloru z białym w zależności od nasycenia
        vec3 finalColor = mix(vec3(1.0), color, v_saturation);
        gl_FragColor = vec4(finalColor, 1.0); // Ustawienie koloru fragmentu
    }
`;

    // Funkcja do tworzenia shader'a
    function createShader(gl, type, source) {
        const shader = gl.createShader(type); // Utworzenie shader'a danego typu
        gl.shaderSource(shader, source); // Ustawienie źródła shader'a
        gl.compileShader(shader); // Kompilacja shader'a
        // Sprawdzenie statusu kompilacji
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader)); // Wyświetlenie logu błędów kompilacji
            gl.deleteShader(shader); // Usunięcie shader'a w przypadku błędu
            return null; // Zwrócenie null
        }
        return shader; // Zwrócenie skompilowanego shader'a
    }

    // Funkcja do tworzenia programu shader'owego
    function createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram(); // Utworzenie programu shader'owego
        gl.attachShader(program, vertexShader); // Dołączenie vertex shader'a
        gl.attachShader(program, fragmentShader); // Dołączenie fragment shader'a
        gl.linkProgram(program); // Linkowanie programu
        // Sprawdzenie statusu linkowania
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program)); // Wyświetlenie logu błędów linkowania
            gl.deleteProgram(program); // Usunięcie programu w przypadku błędu
            return null; // Zwrócenie null
        }
        return program; // Zwrócenie zlinkowanego programu
    }

    // Utworzenie vertex shader'a
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    // Utworzenie fragment shader'a
    const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
    );
    // Utworzenie programu shader'owego
    const program = createProgram(gl, vertexShader, fragmentShader);

    // Pobranie lokalizacji atrybutów w programie shader'owym
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const hueAttributeLocation = gl.getAttribLocation(program, "a_hue");
    const saturationAttributeLocation = gl.getAttribLocation(
        program,
        "a_saturation"
    );

    // Utworzenie buforów dla pozycji, hue i nasycenia
    const positionBuffer = gl.createBuffer();
    const hueBuffer = gl.createBuffer();
    const saturationBuffer = gl.createBuffer();

    // Utworzenie tablic dla danych pozycji, hue i nasycenia
    const positions = new Float32Array(config.particleCount * 2);
    const hues = new Float32Array(config.particleCount);
    const saturations = new Float32Array(config.particleCount);

    // Funkcja do pobierania współrzędnych tekstu na canvas
    function getTextCoordinates(text) {
        const ctx = document.createElement("canvas").getContext("2d"); // Utworzenie tymczasowego canvas 2D
        ctx.canvas.width = canvas.width; // Ustawienie szerokości canvas
        ctx.canvas.height = canvas.height; // Ustawienie wysokości canvas
        const fontSize = Math.min(canvas.width / 6, canvas.height / 6); // Obliczenie rozmiaru czcionki
        ctx.font = `900 ${fontSize}px Arial`; // Ustawienie czcionki
        ctx.fillStyle = "white"; // Ustawienie koloru tekstu na biały
        ctx.textAlign = "center"; // Ustawienie wyrównania tekstu na środek
        ctx.textBaseline = "middle"; // Ustawienie linii bazowej tekstu na środek
        ctx.fillText(text, canvas.width / 2, canvas.height / 2); // Wypełnienie tekstem na canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data; // Pobranie danych obrazu z canvas
        const coordinates = []; // Tablica na współrzędne
        // Iteracja po danych obrazu co 4 piksele (R, G, B, A)
        for (let y = 0; y < canvas.height; y += 4) {
            for (let x = 0; x < canvas.width; x += 4) {
                const index = (y * canvas.width + x) * 4; // Obliczenie indeksu piksela
                // Sprawdzenie, czy kanał alfa jest większy niż 128 (próg przezroczystości)
                if (imageData[index + 3] > 128) {
                    coordinates.push({
                        x: (x / canvas.width) * 2 - 1, // Normalizacja współrzędnej X do zakresu -1 do 1
                        y: (y / canvas.height) * -2 + 1 // Normalizacja współrzędnej Y do zakresu -1 do 1
                    });
                }
            }
        }
        return coordinates; // Zwrócenie tablicy współrzędnych
    }

    // Funkcja do tworzenia cząsteczek na podstawie tekstu
    function createParticles() {
        textCoordinates = getTextCoordinates(config.textArray[currentTextIndex]); // Pobranie współrzędnych tekstu
        // Ustawienie pozycji bazowych cząsteczek na współrzędne tekstu
        for (let i = 0; i < config.particleCount; i++) {
            const randomIndex = Math.floor(Math.random() * textCoordinates.length); // Losowy indeks współrzędnej
            const { x, y } = textCoordinates[randomIndex]; // Pobranie losowej współrzędnej
            particles[i].x = particles[i].baseX = x; // Ustawienie pozycji X i bazowej pozycji X
            particles[i].y = particles[i].baseY = y; // Ustawienie pozycji Y i bazowej pozycji Y
        }
    }

    // Funkcja do aktualizacji pozycji cząsteczek
    function updateParticles() {
        // Iteracja po wszystkich cząsteczkach
        for (let i = 0; i < config.particleCount; i++) {
            const particle = particles[i]; // Pobranie cząsteczki
            const dx = mouse.x - particle.x; // Obliczenie różnicy X między myszą a cząsteczką
            const dy = mouse.y - particle.y; // Obliczenie różnicy Y między myszą a cząsteczką
            const distance = Math.sqrt(dx * dx + dy * dy); // Obliczenie odległości między myszą a cząsteczką
            const forceDirectionX = dx / distance; // Kierunek siły w osi X
            const forceDirectionY = dy / distance; // Kierunek siły w osi Y
            const maxDistance = mouse.radius; // Maksymalna odległość interakcji myszy
            const force = (maxDistance - distance) / maxDistance; // Siła odpychania (maleje z odległością)
            const directionX = forceDirectionX * force * config.forceMultiplier; // Składowa X siły
            const directionY = forceDirectionY * force * config.forceMultiplier; // Składowa Y siły
            const angle = Math.atan2(dy, dx); // Kąt między cząsteczką a myszą

            // Siła rotacji cząsteczek wokół myszy
            const rotationForceX = Math.sin(
                -Math.cos(angle * -1) *
                Math.sin(config.rotationForceMultiplier * Math.cos(force)) *
                Math.sin(distance * distance) *
                Math.sin(angle * distance)
            );
            const rotationForceY = Math.sin(
                Math.cos(angle * 1) *
                Math.sin(config.rotationForceMultiplier * Math.sin(force)) *
                Math.sin(distance * distance) *
                Math.cos(angle * distance)
            );

            // Jeśli cząsteczka jest blisko myszy, odepchnij ją
            if (distance < mouse.radius) {
                particle.vx -= directionX + rotationForceX; // Zmiana prędkości X
                particle.vy -= directionY + rotationForceY; // Zmiana prędkości Y
            } else {
                // W przeciwnym razie, przyciągaj cząsteczkę do pozycji bazowej
                particle.vx += (particle.baseX - particle.x) * config.returnSpeed; // Powrót do pozycji bazowej X
                particle.vy += (particle.baseY - particle.y) * config.returnSpeed; // Powrót do pozycji bazowej Y
            }

            // Aktualizacja pozycji cząsteczki
            particle.x += particle.vx;
            particle.y += particle.vy;
            // Tłumienie prędkości cząsteczek
            particle.vx *= config.velocityDamping;
            particle.vy *= config.velocityDamping;
            // Obliczenie prędkości i hue na podstawie prędkości
            const speed = Math.sqrt(
                particle.vx * particle.vx + particle.vy * particle.vy
            );
            const hue = (speed * config.colorMultiplier) % 360; // Hue zależy od prędkości

            // Ustawienie hue i nasycenia dla cząsteczki
            hues[i] = hue / 360; // Normalizacja hue do zakresu 0-1
            saturations[i] = Math.min(speed * config.saturationMultiplier, 1); // Nasycenie zależy od prędkości, max 1
            positions[i * 2] = particle.x; // Ustawienie pozycji X w tablicy pozycji
            positions[i * 2 + 1] = particle.y; // Ustawienie pozycji Y w tablicy pozycji
        }
        // Aktualizacja buforów pozycji, hue i nasycenia
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW); // Dynamiczne rysowanie - dane mogą się zmieniać
        gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, hues, gl.DYNAMIC_DRAW); // Dynamiczne rysowanie - dane mogą się zmieniać
        gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, saturations, gl.DYNAMIC_DRAW); // Dynamiczne rysowanie - dane mogą się zmieniać
    }

    // Funkcja animacji
    function animate() {
        updateParticles(); // Aktualizacja pozycji cząsteczek
        gl.clear(gl.COLOR_BUFFER_BIT); // Czyszczenie canvas
        // Ustawienie atrybutów pozycji, hue i nasycenia
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0); // Ustawienie wskaźnika na dane pozycji
        gl.enableVertexAttribArray(positionAttributeLocation); // Włączenie atrybutu pozycji
        gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
        gl.vertexAttribPointer(hueAttributeLocation, 1, gl.FLOAT, false, 0, 0); // Ustawienie wskaźnika na dane hue
        gl.enableVertexAttribArray(hueAttributeLocation); // Włączenie atrybutu hue
        gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
        gl.vertexAttribPointer(saturationAttributeLocation, 1, gl.FLOAT, false, 0, 0); // Ustawienie wskaźnika na dane nasycenia
        gl.enableVertexAttribArray(saturationAttributeLocation); // Włączenie atrybutu nasycenia
        gl.useProgram(program); // Użycie programu shader'owego
        gl.drawArrays(gl.POINTS, 0, config.particleCount); // Rysowanie punktów (cząsteczek)
        requestAnimationFrame(animate); // Wywołanie animacji w następnej klatce
    }

    // Detektor zdarzeń dla ruchu myszy
    canvas.addEventListener("mousemove", (event) => {
        mouse.x = (event.clientX / canvas.width) * 2 - 1; // Normalizacja pozycji X myszy
        mouse.y = (event.clientY / canvas.height) * -2 + 1; // Normalizacja pozycji Y myszy
    });

    // Detektor zdarzeń dla opuszczenia canvas przez mysz
    canvas.addEventListener("mouseleave", () => {
        mouse.x = -500; // Ustawienie pozycji X myszy poza ekran
        mouse.y = -500; // Ustawienie pozycji Y myszy poza ekran
    });

    // Detektor zdarzeń dla zmiany rozmiaru okna
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth; // Aktualizacja szerokości canvas
        canvas.height = window.innerHeight; // Aktualizacja wysokości canvas
        gl.viewport(0, 0, canvas.width, canvas.height); // Aktualizacja viewport WebGL
        createParticles(); // Ponowne utworzenie cząsteczek dla nowego rozmiaru
    });

    // Funkcja do zmiany tekstu
    function changeText() {
        currentTextIndex = (currentTextIndex + 1) % config.textArray.length; // Przejście do następnego tekstu w tablicy
        const newCoordinates = getTextCoordinates(config.textArray[currentTextIndex]); // Pobranie współrzędnych nowego tekstu
        // Aktualizacja pozycji bazowych cząsteczek na nowe współrzędne tekstu
        for (let i = 0; i < config.particleCount; i++) {
            const randomIndex = Math.floor(Math.random() * newCoordinates.length); // Losowy indeks współrzędnej
            const { x, y } = newCoordinates[randomIndex]; // Pobranie losowej współrzędnej
            particles[i].baseX = x; // Ustawienie bazowej pozycji X
            particles[i].baseY = y; // Ustawienie bazowej pozycji Y
        }
        nextTextTimeout = setTimeout(changeText, config.textChangeInterval); // Ustawienie timeoutu dla następnej zmiany tekstu
    }

    // Ustawienie koloru czyszczenia canvas na czarny
    gl.clearColor(0, 0, 0, 1);
    // Utworzenie cząsteczek
    createParticles();
    // Rozpoczęcie animacji
    animate();
    // Uruchomienie zmiany tekstu po pierwszym interwale
    nextTextTimeout = setTimeout(changeText, config.textChangeInterval);
});
