# Plano de implementação — vídeo integrado ao hero

## Objetivo

Integrar a sequência de vídeo ao fundo da seção hero, preservando sem alterações
o headline, subheadline, CTA e status. A logo será removida somente do hero e
permanecerá no header, loading e footer.

## Etapas

1. Validar as faixas pretas nos frames do início, meio e fim da sequência.
2. Recortar fisicamente os 150 frames e redimensioná-los para uma resolução
   adequada ao hero, mantendo os originais como fonte.
3. Substituir o carregamento simultâneo por pré-carregamento progressivo, com
   uma janela de frames à frente da reprodução.
4. Iniciar a reprodução no primeiro gesto de scroll e continuar até o final,
   mesmo sem novos eventos de rolagem.
5. Transformar o canvas em uma camada absoluta que cubra todo o hero, removendo
   caixa, borda, raio e moldura.
6. Inserir uma sobreposição em degradê azul entre o conteúdo à esquerda e o
   vídeo mais visível à direita.
7. Remover a logo apenas da seção hero.
8. Ajustar contraste responsivo, movimento reduzido, fallback sem JavaScript e
   pausa quando a aba estiver oculta.
9. Validar lint, build e renderização final.

## Critérios de aceite

- Nenhuma faixa preta aparece no vídeo.
- O vídeo faz parte do fundo da seção, sem aparência de card.
- O degradê integra texto e vídeo e mantém o conteúdo legível.
- Headline, subheadline, CTA e status continuam com o mesmo conteúdo.
- A logo não aparece no hero, mas continua nos demais locais.
- A sequência não congela por falta de frames carregados.
- O primeiro scroll inicia a reprodução contínua até o último frame.

## Estado

Implementado em 10/09/2026.
