import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/privacy/LegalLayout";
export const Route = createFileRoute("/termos")({
  head: () => ({ meta: [{ title: "Termos de Uso | 100 Open Startups" }] }),
  component: Terms,
});
function Terms() {
  return (
    <LegalLayout>
      <article className="legal-content">
        <p className="eyebrow">Última atualização: 11 de setembro de 2026</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Termos de Uso</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Estes termos regulam o acesso à página da Série de Competências Empreendedoras da 100 Open
          Startups.
        </p>
        <h2>1. Aceitação e escopo</h2>
        <p>
          Ao navegar neste site, você concorda com estes Termos e com a{" "}
          <a href="/privacidade">Política de Privacidade</a>. Esta página tem caráter informativo e
          divulga uma programação que pode ser atualizada.
        </p>
        <h2>2. Programação e inscrições</h2>
        <p>
          Datas, convidados, locais, valores, disponibilidade e regras de participação podem ser
          alterados ou cancelados. A inscrição em cada sessão, quando aberta, poderá ter condições
          próprias, que prevalecerão para aquela atividade.
        </p>
        <h2>3. Uso permitido</h2>
        <p>
          Você pode usar o site para fins pessoais ou profissionais legítimos, sem interferir em seu
          funcionamento, tentar obter acesso não autorizado, inserir conteúdo malicioso ou utilizar
          informações e marcas de modo que viole direitos de terceiros.
        </p>
        <h2>4. Propriedade intelectual</h2>
        <p>
          Textos, marcas, identidade visual, imagens e demais conteúdos deste site pertencem à 100
          Open Startups ou a seus respectivos titulares. Nenhuma licença é concedida além do uso
          necessário para navegar no site.
        </p>
        <h2>5. Links e serviços de terceiros</h2>
        <p>
          Links externos e futuras plataformas de inscrição têm termos e políticas próprios. Não
          controlamos suas práticas; leia os documentos aplicáveis antes de fornecer dados ou
          contratar serviços.
        </p>
        <h2>6. Limitação de responsabilidade</h2>
        <p>
          Empregamos esforços razoáveis para manter as informações atualizadas e o site disponível,
          mas não garantimos funcionamento ininterrupto nem ausência total de falhas. Na extensão
          permitida pela lei, não respondemos por danos decorrentes do uso indevido do site ou de
          indisponibilidades fora de nosso controle.
        </p>
        <h2>7. Privacidade</h2>
        <p>
          O tratamento de dados pessoais está descrito na{" "}
          <a href="/privacidade">Política de Privacidade</a>. Suas escolhas de cookies podem ser
          revistas a qualquer momento pelo link no rodapé.
        </p>
        <h2>8. Contato e legislação</h2>
        <p>
          Para dúvidas sobre estes termos, escreva para{" "}
          <a href="mailto:helpme@openstartups.net">helpme@openstartups.net</a>. Estes termos são
          regidos pelas leis brasileiras, sem prejuízo das normas de proteção ao consumidor
          aplicáveis.
        </p>
      </article>
    </LegalLayout>
  );
}
