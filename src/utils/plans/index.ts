export type PlanDetailsProps = {
  maxServices: number;
};

export type PlanProps = {
  BASIC: PlanDetailsProps;
  PROFESSIONAL: PlanDetailsProps;
};

export const PLANS = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 50,
  },
};

export const subscriptionPlans = [
  {
    id: "BASIC",
    name: "Básico",
    description: "Perfeito para clínicas menores",
    oldPrice: "R$ 97,90",
    price: "R$ 27,90",
    features: [
      `Até ${PLANS["BASIC"].maxServices} serviços`,
      "Agendamentos ilimitados",
      "Suporte",
      "Relatórios",
    ],
  },
  {
    id: "PROFESSIONAL",
    name: "Profissional",
    description: "Ideal para clinicas grandes",
    oldPrice: "R$ 197,90",
    price: "R$ 97,90",
    features: [
      `Até ${PLANS["PROFESSIONAL"].maxServices} serviços`,
      "Agendamentos ilimitados",
      "Suporte prioritário",
      "Relatórios avançados",
    ],
  },
];
