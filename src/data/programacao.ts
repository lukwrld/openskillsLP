export type Competencia = {
  id: number;
  bloco: string;
  nome: string;
  descricao: string | null;
  convidado: string | null;
  cargo: string | null;
  empresa: string | null;
  foto: string | null;
  data: string | null;
  horario: string | null;
  formato: string | null;
};

export type Bloco = { id: string; titulo: string; subtitulo: string };

export const blocos: Bloco[] = [
  { id: "eu", titulo: "EU", subtitulo: "Construir a si mesmo" },
  { id: "oportunidade", titulo: "Oportunidade e Ação", subtitulo: "Ler o mundo e agir" },
  { id: "pessoas", titulo: "Pessoas e Relações", subtitulo: "Construir com outros" },
  {
    id: "recursos",
    titulo: "Recursos, Valor e Responsabilidade",
    subtitulo: "Fazer o negócio existir e crescer",
  },
];

const vazio = {
  descricao: null,
  convidado: null,
  cargo: null,
  empresa: null,
  foto: null,
  data: null,
  horario: null,
  formato: null,
};

export const competencias: Competencia[] = [
  { id: 1, bloco: "eu", nome: "Propósito e alinhamento", ...vazio },
  { id: 2, bloco: "eu", nome: "Autoconsciência e autoeficácia", ...vazio },
  { id: 3, bloco: "eu", nome: "Aprender, desaprender e reaprender", ...vazio },
  { id: 4, bloco: "eu", nome: "Persistir e adaptar-se", ...vazio },
  { id: 5, bloco: "oportunidade", nome: "Encontrar oportunidades", ...vazio },
  { id: 6, bloco: "oportunidade", nome: "Criar e inovar", ...vazio },
  { id: 7, bloco: "oportunidade", nome: "Decidir sob incerteza", ...vazio },
  { id: 8, bloco: "oportunidade", nome: "Experimentar e executar", ...vazio },
  { id: 9, bloco: "pessoas", nome: "Dinâmica humana", ...vazio },
  { id: 10, bloco: "pessoas", nome: "Mobilizar pessoas e redes", ...vazio },
  { id: 11, bloco: "pessoas", nome: "Comunicar, persuadir e vender", ...vazio },
  { id: 12, bloco: "pessoas", nome: "Escalar e liderar", ...vazio },
  { id: 13, bloco: "recursos", nome: "Mobilizar recursos", ...vazio },
  { id: 14, bloco: "recursos", nome: "Literacia financeira e econômica", ...vazio },
  { id: 15, bloco: "recursos", nome: "Pensamento digital e IA", ...vazio },
  { id: 16, bloco: "recursos", nome: "Pensamento ético e sustentável", ...vazio },
];

export function estaConfirmada(c: Competencia): boolean {
  return Boolean(c.convidado && c.data);
}
