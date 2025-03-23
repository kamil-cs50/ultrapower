# UltraPower - Sklep zaawansowanych technologii

UltraPower to sklep oferujący zaawansowane moduły i systemy technologiczne, które wspomagają i poprawiają ludzkie możliwości.

## Opis sklepu
Sklep UltraPower oferuje:
- Zaawansowane urządzenia i systemy takie jak Bio-Regeneracja, Chronos Mentis oraz inne, które zwiększają i optymalizują funkcje organizmu.
- Szeroki wybór specyfikacji, m.in. modele systemów (Standard, Advanced, Elite), różne tryby regeneracji oraz systemy kontroli (Automatyczny, Neuralny, Hybrydowy).
- Intuicyjny interfejs użytkownika zapewniający łatwość nawigacji oraz nowoczesną prezentację produktów.

## Informacje z dokumentacji
Sklep wykorzystuje następujące wytyczne:
- Strony produktów zawierają nazwę, cenę, krótki opis, pełny opis produktu oraz cechy/atrybuty.
- Strony koszyka wyświetlają produkty z nazwą, ceną, wybranymi modelami/atrybutami oraz ilością, z sumą częściową, kosztami dostawy oraz kwotą końcową.
- Produkty są opisane w ramach zaawansowanych urządzeń i systemów, mających na celu zwiększanie i optymalizację funkcji organizmu.

## Technologie i narzędzia
Projekt UltraPower wykorzystuje:
- **HTML** – struktura stron.
- **CSS** – stylowanie i wygląd interfejsu.
- **JavaScript** – logika biznesowa i interaktywność.
- **three.js** – renderowanie grafiki 3D.
- **Parcel-bundler** – narzędzie do szybkiego bundlingu aplikacji.
- **npm** – menadżer pakietów; informacje o zależnościach i skryptach znajdują się w plikach `package.json` oraz `package-lock.json`.

## Uruchomienie projektu
Aby rozpocząć pracę z projektem:
1. Zainstaluj zależności:
   ```
   npm install
   ```
2. Uruchom serwer deweloperski:
   ```
   npm run dev
   ```
Po uruchomieniu serwera deweloperskiego, otwórz przeglądarkę i przejdź do odpowiedniego adresu, podanego w logach serwera.

## Struktura projektu
Projekt jest podzielony na następujące moduły:
- **assets/** – zasoby takie jak skrypty, style i obrazy.
- **src/** – główny kod aplikacji.
- **products/** – strony produktowe.
- **cart/** – strona koszyka.

## Dodatkowe informacje
Projekt został stworzony aby przedstawić moje umiejętności projektowania i wdrażania interfejsów użytkownika.

## Wdrożenie na GitHub Pages
Aby wdrożyć projekt na GitHub Pages:

1. Zbuduj projekt:
   ```
   npm run build
   ```
   To utworzy zoptymalizowaną wersję w katalogu `dist/`.

2. Na GitHub, przejdź do ustawień repozytorium (Settings), następnie do sekcji "Pages".

3. W sekcji "Build and deployment":
   - Jako "Source" wybierz "Deploy from a branch"
   - Jako "Branch" wybierz branch główny (np. main lub master)
   - Jako folder wybierz `/dist`
   - Kliknij "Save"

4. Po kilku minutach strona będzie dostępna pod adresem:
   `https://<twoja-nazwa-uzytkownika>.github.io/<nazwa-repozytorium>/`

WAŻNE: Po każdej zmianie w kodzie, musisz ponownie zbudować projekt (`npm run build`) i wypchnąć zmiany na GitHub.

---
Projekt UltraPower - 2025