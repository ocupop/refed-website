export const SOLUTIONS_ENDPOINT = 'https://api.refed.com/v2/solution_database/solutions/'

export const INDICATOR_MAP = {
  usDollarsProfit: {
    show: true,
    label: "Net Financial Benefit",
    value: "us-dollars-profit",
    prefix: "$"
  },
  usDollarsCost: {
    show: true,
    label: "Investment Needed",
    value: "us-dollars-cost",
    prefix: "$"
  },
  usDollarsFinancialBenefit: {
    show: false,
    label: "Financial Benefit",
    value: "us-dollars-financial-benefit",
    prefix: "$"
  },
  tonsDiverted: {
    show: true,
    label: "Food Waste Tons Diverted",
    value: "tons-diverted",
    prefix: ""
  },
  totalMtco2eAvoided: {
    show: true,
    label: "MT CO2e Reduction",
    value: "total-mtco2e-avoided",
    prefix: ""
  },
  gallonsWaterSaved: {
    show: true,
    label: "Gallons Water Saved",
    value: "gallons-water-saved",
    prefix: ""
  },
  mealEquivalentDiverted: {
    show: false,
    label: "Meals Diverted",
    value: "meal-equivalent-diverted",
    prefix: ""
  },
  mealsRecovered: {
    show: true,
    label: "Meals Saved",
    value: "meals-recovered",
    prefix: ""
  },
  jobsCreated: {
    show: false,
    label: "Jobs Created",
    value: "jobs-created",
    prefix: ""
  },
}

