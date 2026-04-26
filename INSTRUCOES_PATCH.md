# PATCH — Métricas das publicações sem status "Verificar"

Substitua somente a pasta/arquivos abaixo:

- data/publications_lse_nber.json
- data/publications_metrics.json
- data/journal_metrics.json

O que foi corrigido:
1. Remove o badge/status "CAPES 2025–2028: Verificar".
2. Mantém somente métricas apresentáveis: SJR, JCR/JIF, ABS/AJG, Qualis/CAPES, SPELL e CAPES/Periódicos-ADM.
3. Remove registros genéricos "Periódico indexado", pois eles não permitem métricas confiáveis por periódico.
4. Não altera HTML, CSS, imagens, layout, contato, projetos nem working papers.

Observação:
Quando a classificação CAPES 2025–2028 não está exposta em fonte aberta indexável, o campo passa a apontar para "Base Periódicos-ADM" em vez de mostrar "Verificar".
