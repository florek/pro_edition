# Dokumentacja strony PROEDITION

## Cel

Strona PROEDITION: przekaz sprzedażowy po angielsku – backend, API, integracje dla biznesu (Python, Django, FastAPI). Technology. Architecture. Delivery.

## Struktura plików

| Plik / folder | Opis |
|---------------|------|
| `index.html` | Jednostronicowa strona (EN/PL): hero, about, services (5), AI for business, who I work with, value, technologies, experience, why, cooperation, contact |
| `css/style.css` | Style globalne, hero (headline/sub/tag), karty usług (scope), listy, value-grid, tech-grid, responsywność |
| `js/main.js` | Menu mobilne (burger), aria-expanded |
| `logo.png` | Logotyp PROEDITION (katalog główny) |
| `photo.jpg` | Zdjęcie założyciela – małe, w sekcji „O założycielu” |
| `technologies.png` | Obraz z logotypami technologii – sekcja „Technologie” |
| `docs/strona.md` | Ten plik |

## Treść (EN)

- **Hero:** logo, headline „I build modern backend systems, APIs, and integrations for business”, opis, Technology. Architecture. Delivery., CTA „Let’s talk about your project”.
- **About PROEDITION:** firma = solid backend, integracje, partner technologiczny; inżynieria + liderstwo; cel = rozwiązania czyste, utrzymywalne, skalowalne, użyteczne dla biznesu. **O założycielu:** zdjęcie (photo.jpg), imię i nazwisko, opis.
- **Services:** 5 usług z listami Scope (Backend development, Systems integration, API design, Development and modernization, Technical support and consulting).
- **Who I work with:** 5 typów firm (produkt cyfrowy, backend, integracje, restrukturyzacja, partner technologiczny).
- **The value I deliver:** Business value (4 punkty), Technical value (4 punkty).
- **Technologies:** obraz z logotypami (technologies.png), pod spodem pasek ikon SVG (AI: LLM APIs, Agents, RAG/vectors, Evals & ops, Workflow automation), siatka: Backend; Integrations and architecture; **AI & automation**; Project domains.
- **Portfolio / Experience:** project and domain experience + Roles (Python Developer, Team Leader, Head of Python Development, technical consultant).
- **Why work with me:** 5 punktów (inżynier + lider, technologia wspiera biznes, nowe/istniejące projekty, komunikacja i dostawa, brak zbędnej złożoności).
- **Cooperation model:** B2B, project-based, long-term support, consulting; scope indywidualnie.
- **Contact:** CTA (strong backend, integrations, restructuring) + „Get in touch…” + LinkedIn + pawel.florczak87net@gmail.com.

## Przełącznik języka (PL / EN)

- W headerze przyciski EN i PL; aktywny język podświetlony.
- Treść PL zaktualizowana (alternatywna wersja: „O PROEDITION”, „Działalność skoncentrowana…”, „O założycielu”, usługi z „mikroserwisy”, „webhooki”, „Obszary projektowe”, „Dlaczego warto ze mną współpracować”, „terminowe dowożenie efektów” itd.).
- Treść w dwóch wersjach: `data-lang="en"` i `data-lang="pl"`. CSS ukrywa niewybrany język (`body.lang-en` / `body.lang-pl`).
- Wybór w `localStorage` (klucz `proedition-lang`). Atrybut `lang` na `<html>` ustawiany na `pl` lub `en`.

## Tryb jasny / ciemny (Light / Dark mode)

- W headerze przełącznik: przycisk ciemny (◐) i jasny (☀). Aktywny motyw podświetlony (`aria-pressed`).
- `body.theme-dark` (domyślny) — ciemna paleta; `body.theme-light` — jasne tła, ciemny tekst, te same akcenty (niebieski, fiolet).
- Wybór w `localStorage` (klucz `proedition-theme`). Meta `theme-color` aktualizowana przy zmianie (pasek przeglądarki).

## Design

- Ciemny motyw, gradient tła (navy, fiolet), delikatna tekstura (noise).
- Kolory akcentów: niebieski (`#4da6ff`), fiolet (`#8b5cf6`), pośredni (`#6d7ee8`) – spójne z logotypem.
- Czcionki: Plus Jakarta Sans (body), Fraunces (nagłówki).
- Responsywność: menu hamburger na wąskich ekranach, grid/flex dostosowane do szerokości.

## SEO

- **Meta:** description, keywords, author, robots (index, follow), theme-color, canonical (https://proedition.pl/).
- **Open Graph:** og:type, og:site_name, og:title, og:description, og:url, og:image, og:locale, og:locale:alternate.
- **Twitter Card:** summary_large_image, title, description, image.
- **JSON-LD (@graph):** Organization (PROEDITION), Person (Paweł Florczak), WebSite, ProfessionalService — powiązane przez @id.
- **Semantyka:** role (banner, main, contentinfo, navigation), aria-labelledby na sekcjach, aria-label na linkach, skip link „Przejdź do treści”.
- **Obrazy:** alt opisowe, fetchpriority="high" na logo w hero/header, loading="lazy" na logo w stopce.

Przy zmianie domeny zaktualizuj w `index.html`: canonical, og:url, og:image, twitter:image oraz wszystkie URL w JSON-LD (https://proedition.pl/ → Twoja domena).

## Aktualizacje

- Zmiana treści: edycja `index.html`.
- Zmiana wyglądu: edycja `css/style.css` (zmienne CSS w `:root`).
- Zmiana logotypu: podmiana `logo.png` (zalecane proporcje zachowane).
