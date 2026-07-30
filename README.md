# Order Management Panel

Panel operatora zamówień przygotowany jako zadanie rekrutacyjne Frontend Developer.

## Stack

- React
- TypeScript
- Vite
- Material UI
- TanStack Router
- TanStack Query
- TanStack Table
- Zod
- MSW

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod adresem:

```text
http://localhost:5173
```

## Zrealizowane

- lista zamówień,
- paginacja serwerowa,
- sortowanie po dacie i wartości zamówienia,
- wyszukiwanie tekstowe,
- filtrowanie po wielu statusach,
- filtrowanie po zakresie dat,
- filtrowanie po minimalnej i maksymalnej cenie,
- debounce wyszukiwarki i pól cenowych,
- stan filtrów, paginacji i sortowania zapisany w URL,
- walidacja parametrów URL za pomocą Zod,
- obsługa ładowania i błędów,
- mockowane API w MSW,
- uproszczone logowanie i zabezpieczenie trasy.

## Decyzje projektowe

Stan widoku jest przechowywany w URL, dzięki czemu odświeżenie strony nie resetuje filtrów, a aktualny widok można udostępnić innemu użytkownikowi.

TanStack Query odpowiada za pobieranie i cache danych. Podczas zmiany filtrów poprzednie dane pozostają widoczne do momentu otrzymania nowej odpowiedzi.

Filtrowanie, sortowanie i paginacja są wykonywane w warstwie mockowanego API, a nie lokalnie tylko na aktualnej stronie tabeli.

MSW został użyty zamiast osobnego backendu, aby zachować rzeczywistą komunikację HTTP bez potrzeby uruchamiania dodatkowego serwera.

## Czego nie udało się ukończyć

Ze względu na ograniczony czas nie zostały ukończone:

- widok szczegółów zamówienia,
- zmiana statusu z uwzględnieniem dozwolonych przejść,
- aktualizacja optymistyczna z rollbackiem,
- zaznaczanie wielu zamówień i masowa zmiana statusów,
- kompletne stany interfejsu: skeleton, pusty stan, brak wyników filtrowania oraz ponowienie zapytania po błędzie,
- pełna obsługa dostępności i dopracowanie widoku tabletowego.

Nie zrealizowano również dodatkowego zadania obejmującego testy komponentów.

## Jak rozwinęłabym projekt

W pierwszej kolejności dodałabym widok szczegółów zamówienia z danymi klienta, listą produktów oraz historią zmian statusów.

Kolejnym etapem byłaby implementacja zmiany statusu z zachowaniem dozwolonych przejść oraz aktualizacją optymistyczną (optimistic update) z wykorzystaniem TanStack Query i rollbackiem w przypadku błędu API.

Następnie zaimplementowałabym możliwość zaznaczania wielu zamówień oraz ich zbiorczej zmiany statusu wraz z prezentacją częściowego sukcesu operacji.

Na końcu uzupełniłabym pozostałe wymagania dotyczące interfejsu, czyli:
- skeleton zamiast pełnoekranowego spinnera,
- osobny pusty stan i komunikat „Brak wyników”,
- możliwość ponowienia zapytania po błędzie,
- poprawę dostępności oraz responsywności.

Dodatkowo rozszerzyłabym projekt o testy komponentów przy użyciu Vitest i React Testing Library.

## Uwagi

Autoryzacja i baza danych mają charakter demonstracyjny. Dane są przechowywane w pamięci i resetują się po odświeżeniu aplikacji.
