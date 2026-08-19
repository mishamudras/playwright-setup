# Playwright QA Portfolio

End-to-end testovací sada v Playwrightu a TypeScriptu, postavená jako 
ukázka toho, co umím, na cestě od manuálního QA testování k automatizaci. 
Testuji kompletní uživatelský tok na SauceDemo — od přihlášení přes 
košík až po dokončení objednávky, včetně negativního scénáře.

## Tech stack
- Playwright
- TypeScript
- GitHub Actions (CI)

## Co je otestováno
- Přihlášení platným uživatelem
- Přidání produktu do košíku
- Kompletní checkout flow (od košíku po potvrzení objednávky)
- Přihlášení zablokovaným uživatelem (negativní scénář)
- Řazení produktů podle ceny


## Jak spustit lokálně
npm install
npx playwright test

## Struktura projektu
Testy používají page object pattern — `tests/pages/LoginPage.ts` odděluje 
lokátory a akce přihlašovací stránky od logiky samotných testů, aby se 
při změně UI musel upravit jen jeden soubor.

## CI
Testy se automaticky spouští při každém pushi přes GitHub Actions 
(`.github/workflows/playwright.yml`), ve třech prohlížečích (Chromium, 
Firefox, WebKit).

## MCP evaluace
Složka `mcp-tests/` obsahuje sadu evalů z MCPJam Inspectoru proti MCP 
filesystem serveru — ověřují, že AI agent volá správné nástroje (čtení, 
zápis, vícekrokové operace) a bezpečně odmítá destruktivní požadavky, 
na které server nemá nástroje.

## API testy
Samostatná sada testů v `tests/api/` proti veřejnému REST API 
(jsonplaceholder.typicode.com), bez zapojení prohlížeče — pokrývá:
- GET (čtení dat)
- POST (vytvoření)
- PATCH (úprava)
- DELETE (smazání)
- Negativní scénář (404 na neexistující záznam)