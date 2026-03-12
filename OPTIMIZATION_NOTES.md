# Uwagi dotyczące optymalizacji wydajności

## Główne problemy z PageSpeed Insights

### 1. CLS (Cumulative Layout Shift) - 0.615
**Problem:** Elementy przesuwają się podczas ładowania strony.

**Rozwiązania:**
- ✅ Usunięto inline `aspect-ratio` z obrazów (powodowało konflikt z width/height)
- ✅ Dodano `object-fit: contain` do wszystkich obrazów w CSS
- ✅ Wszystkie obrazy mają width i height attributes
- ⚠️ **Wymagane:** Sprawdź czy fonty ładują się z `font-display: swap` (już w URL Google Fonts)

### 2. LCP (Largest Contentful Paint) - 10.7s
**Problem:** Największy element ładuje się za wolno.

**Rozwiązania:**
- ✅ Dodano `fetchpriority="high"` do logo w hero
- ✅ Dodano preload dla logo
- ⚠️ **Wymagane:** 
  - Konwertuj logo do WebP (oszczędność ~30-50%)
  - Rozważ użycie mniejszego logo dla mobile
  - Sprawdź czy logo w hero jest rzeczywiście LCP elementem

### 3. Nieużywany CSS - 1543 KB
**Problem:** Dużo nieużywanego CSS.

**Rozwiązania:**
- ⚠️ **Wymagane:** 
  - Użyj narzędzia do usunięcia nieużywanego CSS (PurgeCSS, uncss)
  - Lub podziel CSS na critical (inline) i non-critical (async load)

### 4. Cache Policy - 1449 KB
**Problem:** Brak cache headers dla statycznych zasobów.

**Rozwiązania:**
- ⚠️ **Wymagane:** Dodaj .htaccess z cache headers (zobacz PERFORMANCE.md)

### 5. Niepoprawny aspect ratio obrazów
**Problem:** Lighthouse wykrywa niepoprawne proporcje.

**Rozwiązania:**
- ✅ Usunięto inline aspect-ratio
- ✅ Użyto width/height attributes + object-fit
- ⚠️ **Sprawdź:** Upewnij się, że wszystkie obrazy mają poprawne wymiary

## Priorytety działań

1. **Najważniejsze (duży wpływ na score):**
   - Cache headers (.htaccess) - łatwe, duży efekt
   - Optymalizacja obrazów (WebP) - średnie, duży efekt
   - Usunięcie nieużywanego CSS - trudne, średni efekt

2. **Średnie:**
   - Sprawdzenie czy LCP element jest poprawnie zidentyfikowany
   - Optymalizacja fontów (self-hosting)

3. **Niskie:**
   - Minifikacja CSS/JS
   - Service Worker (opcjonalnie)

## Oczekiwane rezultaty po pełnej optymalizacji

- **Performance:** 85-95/100 (z cache + WebP)
- **CLS:** < 0.1 (po naprawie fontów i obrazów)
- **LCP:** < 2.5s (po WebP i optymalizacji)
- **Best Practices:** 100/100 (po naprawie aspect ratio)
