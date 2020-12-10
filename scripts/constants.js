export const SOLUTIONS_ENDPOINT = 'https://api.refed.com/v2/solution_database/solutions/'

export const INDICATOR_MAP = {
  usDollarsProfit: {
    show: true,
    label: "Net Financial Benefit",
    prefix: "$"
  },
  usDollarsCost: {
    show: true,
    label: "Investment Needed",
    prefix: "$"
  },
  usDollarsFinancialBenefit: {
    show: false,
    label: "Financial Benefit",
    prefix: "$"
  },
  tonsDiverted: {
    show: true,
    label: "Food Waste Tons Diverted",
    prefix: ""
  },
  totalMtco2eAvoided: {
    show: true,
    label: "MT CO2e Reduction",
    prefix: ""
  },
  gallonsWaterSaved: {
    show: true,
    label: "Gallons Water Saved",
    prefix: ""
  },
  mealEquivalentDiverted: {
    show: false,
    label: "Meals Diverted",
    prefix: ""
  },
  mealsRecovered: {
    show: true,
    label: "Meals Saved",
    prefix: ""
  },
  jobsCreated: {
    show: false,
    label: "Jobs Created",
    prefix: ""
  },
}