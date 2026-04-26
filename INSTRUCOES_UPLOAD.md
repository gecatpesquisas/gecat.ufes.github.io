# INSTRUÇÕES DE UPLOAD — GECAT

Use esta pasta para subir o site no GitHub sem quebrar as subpastas.

## Passo correto

1. Extraia este ZIP no computador.
2. Abra a pasta `UPLOAD_GITHUB`.
3. No GitHub, clique em `Add file` → `Upload files`.
4. Arraste TODO o conteúdo da pasta `UPLOAD_GITHUB` para o GitHub:
   - `assets/`
   - `data/`
   - `en/`
   - `scripts/`
   - arquivos `.html`
5. Clique em `Commit changes`.

## Atenção

Não envie o arquivo ZIP fechado.

Não entre nas pastas para arrastar só os arquivos internos, pois isso achata a estrutura.
Arraste as pastas inteiras `assets`, `data`, `en` e `scripts`.

## Estrutura correta esperada

assets/
data/
en/
scripts/
index.html
research.html
people.html
publications.html
working-papers.html
awards.html
applied-projects.html
contact.html

## Verificação rápida

O arquivo `index.html` deve começar com:

<!doctype html>

Nunca deve começar com:

{ "papers": ... }
