# Schneider QA — CTFL 4.0 ⚔️

A gamified study portal for the **ISTQB/BSTQB CTFL 4.0** (Certified Tester Foundation Level) certification exam, themed around Roronoa Zoro and *One Piece* — turning exam prep into a swordsman's journey: earn XP, level up through samurai ranks, and master all six syllabus chapters before facing the "Boss Battle."

## Concept

Studying for a certification exam is repetitive by nature. This project leans into that by wrapping the CTFL 4.0 syllabus in a light RPG structure:

- **Ranks** (Ronin → Aprendiz → Pirate Hunter → Nakama → Rei dos Espadachins) that unlock as XP accumulates
- **Achievements** for milestones like a perfect quiz, finishing a full simulated exam, or beating the elite "Boss Battle" mode
- **XP rewards** for completing chapters, checking off study-schedule days, and flipping flashcards
- Progress is saved locally and can be **exported/imported as a code** to sync between devices, without any backend or account system

## Features

- **6 chapters** of in-depth CTFL 4.0 content (Fundamentals, Test Lifecycle, Static Testing, Test Analysis & Design, Test Management, Tools), each with an inline quiz
- **Simulado** — a full 40-question mock exam (60 min, official ISTQB-style scoring), a 10-question elite "Boss Battle" mode, and two official ISTQB exam sets (A/B) with commented answer keys
- **Flashcards** with category filters and flip-to-reveal answers
- **Cronograma** — an adaptive 2/4/6-week study schedule with a checklist
- **Arsenal** — a quick-reference page (test techniques, formulas, glossary, review types, acronyms)
- **Sensei Zoro** — an optional AI tutor chat backed by the Anthropic Claude API, using a system prompt scoped to the CTFL 4.0 syllabus (requires the user's own API key, stored only in `localStorage`)

## Tech stack

- **Vanilla HTML / CSS / JavaScript** — no framework, no build step, no bundler. Open `index.html` or serve the folder statically and it runs.
- **Fonts**: [Shippori Mincho](https://fonts.google.com/specimen/Shippori+Mincho) (display/headings) + [Manrope](https://fonts.google.com/specimen/Manrope) (body/UI), loaded from Google Fonts
- **Anthropic Claude API** (`claude-sonnet-4-5`) for the AI tutor chat — called directly from the browser with the user's own key
- **Canvas 2D** for the interactive particle-network background in the hero section (vanilla JS, no library)
- State persistence via `localStorage` only — no server, no database, no build artifacts

## Project structure

```
index.html          → markup for all views (tabs, modals, hero)
style.css            → design tokens (:root), layout, components, responsive rules
app.js               → app state, quiz/exam logic, rendering, AI tutor chat
hero-particles.js    → canvas particle-network background for the hero
imgs/                → artwork (WebP, optimized) and source images
```

## Running locally

No installation needed — it's a static site.

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Or open `index.html` directly in a browser.

## Notes

- The AI tutor is fully optional; the study portal works completely without an API key.
- Nothing is sent anywhere except the Anthropic API when the chat is actively used — no analytics, no tracking.

---

<br>

# Schneider QA — CTFL 4.0 ⚔️ (pt-BR)

Um portal de estudos gamificado para a certificação **CTFL 4.0 (ISTQB/BSTQB)** — Certified Tester Foundation Level — com tema do Roronoa Zoro e *One Piece*: prepara para a prova como se fosse a jornada de um espadachim: ganhe XP, suba de rank samurai e domine os seis capítulos do syllabus antes de encarar a "Boss Battle".

## Conceito

Estudar para uma certificação é repetitivo por natureza. Este projeto encara isso de frente, encaixando o syllabus do CTFL 4.0 numa estrutura leve de RPG:

- **Ranks** (Ronin → Aprendiz → Pirate Hunter → Nakama → Rei dos Espadachins) que desbloqueiam conforme o XP acumula
- **Conquistas** por marcos como acertar um quiz 100%, terminar um simulado completo ou vencer a "Boss Battle"
- **XP** por completar capítulos, marcar dias do cronograma de estudos e virar flashcards
- O progresso é salvo localmente e pode ser **exportado/importado como um código** pra sincronizar entre dispositivos, sem backend nem sistema de conta

## Funcionalidades

- **6 capítulos** com conteúdo aprofundado do CTFL 4.0 (Fundamentos, Ciclo de Vida de Teste, Teste Estático, Análise e Design de Teste, Gerenciamento de Teste, Ferramentas), cada um com quiz embutido
- **Simulado** — prova completa de 40 questões (60 min, correção no estilo ISTQB oficial), modo elite "Boss Battle" de 10 questões, e dois exames oficiais do ISTQB (Set A/B) com gabarito comentado
- **Flashcards** com filtro por categoria e resposta revelada ao clicar
- **Cronograma** — plano de estudos adaptável de 2/4/6 semanas com checklist
- **Arsenal** — referência rápida (técnicas de teste, fórmulas, glossário, tipos de revisão, siglas)
- **Sensei Zoro** — chat opcional com tutor de IA usando a API da Anthropic Claude, com prompt de sistema focado no syllabus do CTFL 4.0 (exige chave de API própria do usuário, guardada só no `localStorage`)

## Tecnologia

- **HTML / CSS / JavaScript puros** — sem framework, sem build, sem bundler. Basta abrir o `index.html` ou servir a pasta como estática.
- **Fontes**: [Shippori Mincho](https://fonts.google.com/specimen/Shippori+Mincho) (títulos/destaque) + [Manrope](https://fonts.google.com/specimen/Manrope) (corpo/UI), carregadas via Google Fonts
- **API Claude da Anthropic** (`claude-sonnet-4-5`) para o chat do tutor de IA — chamada direto do navegador com a chave do próprio usuário
- **Canvas 2D** para o fundo interativo de partículas em rede na seção hero (JS puro, sem biblioteca)
- Persistência de estado só via `localStorage` — sem servidor, sem banco de dados, sem etapa de build

## Estrutura do projeto

```
index.html          → marcação de todas as telas (abas, modais, hero)
style.css            → tokens de design (:root), layout, componentes, regras responsivas
app.js               → estado do app, lógica de quiz/simulado, renderização, chat do tutor de IA
hero-particles.js    → fundo de partículas em rede (canvas) da seção hero
imgs/                → artes (WebP otimizado) e imagens de origem
```

## Rodando localmente

Não precisa instalar nada — é um site estático.

```bash
python -m http.server 8000
# depois abra http://localhost:8000
```

Ou abra o `index.html` direto no navegador.

## Observações

- O tutor de IA é totalmente opcional; o portal de estudos funciona por completo sem chave de API.
- Nada é enviado pra lugar nenhum, exceto pra API da Anthropic quando o chat está sendo usado ativamente — sem analytics, sem rastreamento.
