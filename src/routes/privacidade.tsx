import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/privacy/LegalLayout";
export const Route = createFileRoute("/privacidade")({
  head: () => ({ meta: [{ title: "Política de Privacidade | 100 Open Startups" }] }),
  component: PrivacyPolicy,
});
function PrivacyPolicy() {
  return (
    <LegalLayout>
      <article className="legal-content">
        <p className="eyebrow">Última atualização: 11 de setembro de 2026</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Política de Privacidade</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Esta política explica como tratamos dados pessoais no site da Série de Competências
          Empreendedoras, em conformidade com a Lei nº 13.709/2018 (LGPD).
        </p>
        <h2>1. Quem controla os dados</h2>
        <p>
          A controladora é <strong>100 Open Startups Tecnologia e Serviços S.A.</strong>, CNPJ nº
          06.088.654/0001-03, com sede na Rua Estados Unidos, nº 1078, Jardim América, São Paulo/SP,
          CEP 01427-001.
        </p>
        <p>
          Para dúvidas, solicitações sobre seus dados ou contato com o encarregado, escreva para{" "}
          <a href="mailto:encarregado@openstartups.net">encarregado@openstartups.net</a>. O canal
          geral é <a href="mailto:helpme@openstartups.net">helpme@openstartups.net</a>.
        </p>
        <h2>2. Dados e finalidades</h2>
        <p>
          Na versão atual, a navegação nesta página não exige cadastro nem coleta nome, e-mail,
          telefone ou outros dados de formulário. Quando a inscrição para sessões for
          disponibilizada, o formulário indicará, no momento da coleta, os dados solicitados, a
          finalidade, a base legal, o prazo de retenção e eventuais destinatários.
        </p>
        <p>
          Podemos tratar dados técnicos mínimos de navegação estritamente necessários para
          segurança, prevenção a fraudes e funcionamento do serviço, com base no legítimo interesse
          e/ou cumprimento de obrigação legal, sempre observando necessidade e proporcionalidade.
        </p>
        <h2>3. Cookies e armazenamento local</h2>
        <p>
          Este site usa armazenamento local estritamente necessário para guardar a preferência de
          tema e sua decisão de cookies. Não há, nesta versão, cookies de análise, pixels
          publicitários ou cookies de marketing ativos.
        </p>
        <p>
          Se ferramentas de análise ou marketing forem incluídas, elas só serão carregadas após seu
          consentimento prévio, livre, informado e granular. Você pode recusar ou alterar a escolha
          a qualquer momento em “Preferências de cookies”, no rodapé.
        </p>
        <h2>4. Compartilhamento e transferências internacionais</h2>
        <p>
          Não compartilhamos dados de navegação desta landing page com plataformas de analytics ou
          publicidade. Caso a inscrição seja operacionalizada por um fornecedor, o compartilhamento
          será limitado ao necessário para executar o serviço e informado no respectivo formulário.
        </p>
        <p>
          Se houver transferência internacional de dados, adotaremos os mecanismos previstos pela
          LGPD e regulamentação da ANPD aplicável, com transparência sobre o destinatário e as
          salvaguardas adotadas.
        </p>
        <h2>5. Segurança e retenção</h2>
        <p>
          Adotamos medidas técnicas e administrativas razoáveis para proteger dados pessoais.
          Guardamos dados apenas pelo tempo necessário para a finalidade informada, obrigações
          legais/regulatórias, defesa de direitos ou até revogação do consentimento quando esta for
          a base legal aplicável.
        </p>
        <h2>6. Seus direitos</h2>
        <p>
          Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio ou
          eliminação de dados desnecessários, portabilidade, informações sobre compartilhamentos,
          revogação do consentimento e revisão de decisões automatizadas, quando aplicável. Envie o
          pedido ao canal indicado acima. Poderemos solicitar confirmação de identidade para
          proteger seus dados.
        </p>
        <p>
          Responderemos nos prazos previstos na LGPD e na regulamentação da ANPD. Você também pode
          apresentar petição à ANPD.
        </p>
        <h2>7. Atualizações</h2>
        <p>
          Podemos atualizar esta política para refletir mudanças no site, no tratamento de dados ou
          na legislação. A data de atualização no topo indica a versão vigente.
        </p>
      </article>
    </LegalLayout>
  );
}
