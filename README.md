# PROEDITION

Strona PROEDITION – backend systems, APIs and integrations for business (Python, Django, FastAPI).

## Zawartość

- **index.html** – strona główna (EN, jednostronicowa)
- **css/style.css** – style w kolorystyce logotypu (ciemny motyw, akcenty niebiesko-fioletowe)
- **js/main.js** – menu mobilne (burger)
- **logo.png** – logotyp PROEDITION (w katalogu głównym)
- **photo.jpg** – zdjęcie założyciela (małe, sekcja „O założycielu”)
- **technologies.png** – logotypy technologii (sekcja „Technologie”)

## Sekcje

- **Hero** – headline, opis, Technology. Architecture. Delivery., CTA „Let’s talk about your project”
- **About PROEDITION** – kim jest firma, łączenie inżynierii z liderstwem, cel (rozwiązania użyteczne dla biznesu)
- **Services** – 5 usług ze scope: Backend development, Systems integration, API design, Development and modernization, Technical support and consulting
- **Who I work with** – typy klientów
- **The value I deliver** – Business value + Technical value
- **Technologies** – `technologies.png`, pasek ikon AI/automation (SVG), siatka: Backend, Integrations, AI & automation, Project domains
- **Portfolio / Experience** – projekty i domeny, role
- **Why work with me** – 5 punktów
- **Cooperation model** – B2B, project-based, long-term, consulting
- **Contact** – CTA + LinkedIn + e-mail

## Uruchomienie

Otwórz `index.html` w przeglądarce lub serwuj katalog lokalnie, np.:

```bash
python -m http.server 8000
```

Potem wejdź na: http://localhost:8000

## Języki i motyw

- **PL/EN:** przełącznik w headerze, treść w `data-lang="en"` / `data-lang="pl"`, zapis w localStorage (`proedition-lang`). Treść PL w wersji alternatywnej (m.in. „O PROEDITION”, „O założycielu”, usługi, „Dlaczego warto ze mną współpracować”).
- **Light / Dark mode:** przełącznik w headerze (◐ / ☀), zapis w localStorage (`proedition-theme`). Domyślnie dark; light — jasne tła, ciemny tekst.

## SEO

Meta (description, keywords, author, canonical), Open Graph, Twitter Card, JSON-LD (Organization, Person, WebSite, ProfessionalService), semantyka (ARIA, skip link), opisowe alt i lazy loading obrazów. Przy wdrożeniu na inną domenę zaktualizuj w `index.html` wszystkie URL (canonical, og:url, og:image, JSON-LD).

## Wymagania

Przeglądarka z obsługą CSS Grid, Flexbox, zmiennych CSS i `backdrop-filter`. Bez zewnętrznych zależności poza fontami Google (Fraunces, Plus Jakarta Sans).

## Dokumentacja

Szczegóły struktury i treści: [docs/strona.md](docs/strona.md).
