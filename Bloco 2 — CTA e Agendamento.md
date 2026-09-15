# BLOCO 2 — CTA E FLUXO DE AGENDAMENTO

Ajuste a landing page existente sem redesenhar o projeto.

## Objetivo

Preparar o fluxo de inscrição/agendamento da experiência presencial de workshop + diagnóstico.

Preserve todo o visual e componentes existentes.

Não crie novas dependências e não refatore arquivos sem necessidade.

---

## 1. PADRONIZAR CTA PRINCIPAL

Use como CTA principal da página:

**Quero participar**

Todos os CTAs principais devem direcionar para a seção de inscrição/agendamento.

Evite criar várias ações concorrentes.

Se houver botões principais com textos diferentes para a mesma ação, padronize-os.

---

## 2. CRIAR OU AJUSTAR SEÇÃO DE INSCRIÇÃO

Criar ou adaptar uma seção próxima ao final da página com o título:

**Escolha sua próxima experiência**

Texto de apoio:

**Selecione uma das próximas datas disponíveis para participar presencialmente do workshop e realizar seu Diagnóstico de Competências Empreendedoras.**

A seção deve estar preparada para receber datas reais posteriormente.

---

## 3. CARDS DE DATAS

Se já existir componente adequado, reutilize.

Cada card de evento/data deve estar preparado para exibir:

- nome do workshop;
- data;
- horário;
- local;
- palestrante, quando confirmado;
- disponibilidade;
- botão de inscrição.

CTA do card:

**Quero participar**

Não inventar informações.

Enquanto não houver eventos confirmados, mostrar apenas um estado vazio elegante com:

**Novas datas em confirmação**

Texto de apoio:

**Em breve divulgaremos os próximos workshops presenciais.**

Não criar datas fictícias.

---

## 4. LOCAL

Onde fizer sentido apresentar o formato da experiência, deixar claro:

**Formato: 100% presencial**

**Local: Inovabra Habitat — São Paulo**

Evite repetir essas informações excessivamente pela página.

---

## 5. FLUXO DO CTA

Ao clicar em **Quero participar**:

- se já existir formulário ou seção de inscrição no projeto, fazer scroll até ela;
- não criar checkout novo;
- não criar backend;
- não integrar serviços externos nesta etapa.

Se ainda não houver formulário funcional, manter a seção preparada visualmente para receber a integração depois.

---

## 6. CAPTURA MÍNIMA

Se já existir formulário no projeto, manter apenas os campos necessários para inscrição inicial:

- Nome
- E-mail
- WhatsApp

Não adicionar novos campos nesta etapa.

Não alterar integrações existentes.

---

## 7. NÃO ALTERAR

Não mexer ainda em:

- Member Get Member;
- código de indicação;
- UTM;
- tracking;
- checkout;
- backend;
- automações;
- integrações externas;
- arquitetura do projeto.

---

## 8. VERIFICAÇÃO FINAL

Antes de finalizar:

- confirme que os CTAs principais levam à inscrição/agendamento;
- confirme que nenhuma data ou palestrante fictício foi criado;
- confirme que a página comunica experiência 100% presencial;
- preserve desktop e mobile;
- não altere elementos fora deste escopo.

Ao concluir, informe apenas:
1. arquivos alterados;
2. o que foi alterado em cada arquivo;
3. se existe algum ponto que ainda depende de integração externa.