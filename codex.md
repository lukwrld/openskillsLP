# Plano de implementação — ajustes visuais e de posicionamento

Este plano consolida as alterações atualmente definidas para o projeto. A seção abaixo, intitulada “Plano anterior”, fica preservada apenas como referência histórica e não deve orientar novas alterações.

## Objetivo

Melhorar a responsividade do header, diferenciar visualmente as seções principais e alinhar a comunicação ao público de universitários entre 18 e 25 anos.

## Escopo

### Header responsivo

- Centralizar o conteúdo em uma largura máxima de 1440 px.
- Manter o header compacto em telas pequenas.
- Aumentar altura, logo, seletor de tema e CTA em telas médias e grandes.
- Preservar o comportamento sticky e a animação vinculada ao scroll.

### Seção “Para quem é?”

- Fazer a seção ocupar 100% da largura da viewport, mantendo o conteúdo interno limitado para leitura.
- Usar background e elementos decorativos em tons de azul, sem roxo.
- Manter a animação sutil do background.
- Remover os mini títulos “Perfil ideal” e “Na prática”.
- Especificar no texto que o público é formado por universitários de qualquer curso, entre 18 e 25 anos.

### Seção “O que você recebe?”

- Fazer a seção ocupar 100% da largura da viewport.
- Preservar o background azul suave, a linha de conexão e os elementos decorativos.
- Manter os cards com ícones maiores e animação escalonada.
- Não alterar os benefícios, títulos ou descrições dos cards.

### Título da página

- Usar somente este `<title>`:

  `Workshop de Competências Empreendedoras | 100 Open Startups`

- Preservar a meta description e os demais metadados.

## Arquivos envolvidos

- `src/routes/index.tsx`: header, estrutura das seções, texto de público e título da página.
- `src/styles.css`: backgrounds, animações, largura visual das seções e responsividade.
- `src/components/serie/ThemeToggle.tsx`: dimensionamento responsivo do seletor de tema.

## Estratégia

1. Aplicar alterações pequenas e isoladas nas classes e estruturas existentes.
2. Separar as seções externas, que ocupam 100% da tela, dos containers internos de conteúdo.
3. Usar as variáveis de identidade visual existentes, sem novas dependências ou imagens.
4. Respeitar `prefers-reduced-motion`.
5. Preservar funcionalidades, integrações e seções fora do escopo.

## Validação

- Executar `npm run lint`, `npm run build` e `git diff --check`.
- Testar visualmente em mobile, desktop e monitor largo.
- Confirmar ausência de overflow horizontal.
- Confirmar que backgrounds e bordas das duas seções chegam às extremidades da viewport.
- Confirmar o novo `<title>` e a preservação da meta description.

## Rollback

Se o resultado visual não for aprovado, reverter somente as alterações relacionadas a este plano, preservando modificações independentes já existentes no projeto.

## Fora do escopo

- Alterar backend, integrações ou funcionalidades.
- Criar novas dependências ou imagens.
- Alterar a meta description.
- Redesenhar outras seções.

---

## Plano anterior (referência histórica)

Aplicar somente os ajustes abaixo. Não redesenhar a página e não alterar integrações, backend ou estrutura geral.

---

## 1. TÍTULO DA SEÇÃO

Trocar:

**Uma experiência presencial?**

por:

**O que você vai vivenciar?**

Manter o restante da seção e o link para os 5 Congressos 100 Open Startups.

---

## 2. SEÇÃO "PARA QUEM É?"

Manter a ideia principal de público:

**universitários de qualquer curso, entre 18 e 25 anos**

Enxugar o texto removendo:
- a palavra **"úteis"**;
- a frase sobre não precisar ter startup ou experiência prévia;
- a frase final sobre estar começando a graduação, entrando no mercado ou buscando experiências além da sala de aula.

Deixar a seção mais curta e direta.

---

## 3. SEÇÃO "COMO FUNCIONA?"

Na etapa 01, remover a expressão:

**"uma das próximas"**

Deixar a frase mais direta.

---

## 4. TROCAR "EXAME" POR "LAUDO"

Revisar a página e substituir referências a:

**Exame**

por uma nomenclatura alinhada a:

**Laudo**

Evitar manter "Faça o Exame" como título de etapa.

Ajustar o texto da etapa para continuar fazendo sentido com a jornada.

---

## 5. PADRONIZAR NOMENCLATURA

Padronizar a página para usar:

**Workshop**

como termo principal.

Evitar alternar entre:
- palestra;
- workshop;
- experiência;

quando estiverem se referindo ao mesmo produto/formato.

Manter "experiência" apenas quando fizer sentido como conceito mais amplo da jornada.

---

## 6. REVISÃO FINAL DE CONSISTÊNCIA

Antes de concluir:

- revisar títulos, cards, FAQ, CTAs e timeline;
- garantir que a nomenclatura esteja consistente;
- reduzir textos desnecessários;
- preservar o visual atual;
- não alterar funcionalidades;
- não criar novas dependências.

Ao final, informar apenas quais arquivos foram alterados e o que mudou em cada um.
