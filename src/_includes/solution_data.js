{% assign solutions = site.solutions | sort:"order" %}{
  filters: [
    {
      label: "Financial Benefit",
      slug: "financial_benefit"
    }, {
      label: "Waste Diverted",
      slug: "waste_diverted"
    }, {
      label: "Meals Saved",
      slug: "meals_saved"
    }, {
      label: "Emissions Reduced",
      slug: "emissions_reduced"
    }, {
      label: "Water Saved",
      slug: "water_saved"
    }, {
      label: "Jobs Created",
      slug: "jobs_created"
    }
  ],
  solutions: [
    {% for solution in solutions %}{
      title: "{{ solution.title }}",
      slug: "{{ solution.slug }}",
      summary: "{{ solution.summary }}",
      type: "{{ solution.type }}",
      featured_image: "{{ solution.featured-image }}",
      stakeholders: [{% for stakeholder in solution.stakeholders %}"{{ stakeholder }}"{% unless forloop.last %}, {% endunless %}{% endfor %}],
      connected_solutions: [{% for s in solution.connected-solutions %}"{{ s }}"{% unless forloop.last %}, {% endunless %}{% endfor %}],
      data: {
        {% for i in solution.impact %}{{ i[0] | replace: '-', '_' }}: {{ i[1] }}{% unless forloop.last %}, {% endunless %}{% endfor %}
      }
    }{% unless forloop.last %}, {% endunless %}{% endfor %}
  ]
}


// {
//   filters: [
//     {
//       label: "Financial Benefit",
//       slug: "financial_benefit"
//     }, {
//       label: "Waste Diverted",
//       slug: "waste_diverted"
//     }, {
//       label: "Meals Saved",
//       slug: "meals_saved"
//     }, {
//       label: "Emissions Reduced",
//       slug: "emissions_reduced"
//     }, {
//       label: "Water Saved",
//       slug: "water_saved"
//     }, {
//       label: "Jobs Created",
//       slug: "jobs_created"
//     }
//   ],
//   solutions: [
//     {
//       title: "Consumer Education Campaign",
//       slug: "consumer-education-campaign",
//       summary: "Conducting large-scale consumer advocacy campaigns to raise awareness of food waste and educate consumers about ways to save money and prevent or reduce wasted food",
//       type: "Prevention",
//       featured_image: "",
//       stakeholders: ["retailers", "restaurants", "food-service-providers"],
//       connected_solutions: ["standardized-date-labeling", "home-composting"],
//       data: {
//         financial_benefit: 5375, waste_diverted: 584, jobs_created: 0, emissions_reduced: 2336, water_saved: 281, meals_saved: 1
//       }
//     }, {
//       title: "Standardized Date Labeling",
//       slug: "standardized-date-labeling",
//       summary: "Standardizing food label dates and instructions; eliminating “sell by” dates to reduce consumer confusion",
//       type: "Prevention",
//       featured_image: "filename",
//       stakeholders: ["manufacturers", "retailers", "consumers"],
//       connected_solutions: ["consumer-education-campaign", "produce-specifications"],
//       data: {
//         financial_benefit: 4553, waste_diverted: 398, jobs_created: 0, emissions_reduced: 1593, water_saved: 191.6, meals_saved: 0.7
//       }
//     }, {
//       title: "Packaging Adjustments",
//       slug: "packaging-adjustments",
//       summary: "Optimizing food packaging size and design to ensure complete consumption by consumers and avoid residual container waste",
//       type: "Prevention",
//       featured_image: "filename",
//       stakeholders: ["manufacturers", "retailers", "consumers"],
//       connected_solutions: ["produce-specifications", "spoilage-prevention-packaging"],
//       data: {
//         financial_benefit: 3438, waste_diverted: 208, jobs_created: 0, emissions_reduced: 830, water_saved: 99.9, meals_saved: 0.03
//       }
//     }, {
//       title: "Donation Matching Software",
//       slug: "donation-matching-software",
//       summary: "Using a technology platform to connect individual food donors with recipient organizations to reach smaller scale food donations",
//       type: "Recovery",
//       featured_image: "filename",
//       stakeholders: ["retailers", "restaurants", "food-service-providers", "food-recovery-orgs"],
//       connected_solutions: ["donation-storage-and-handling", "donation-transportation"],
//       data: {
//         financial_benefit: 2880, waste_diverted: 150, jobs_created: 0, emissions_reduced: 555, water_saved: 72.3, meals_saved: 0.3
//       }
//     }, {
//       title: "Safe Donation Regulation",
//       slug: "safe-donation-regulation",
//       summary: "Standardizing local and state health department regulations for safe handling and donation of food through federal policy",
//       type: "Recovery",
//       featured_image: "filename",
//       stakeholders: ["farms", "retailers", "restaurants", "food-service-providers", "food-recovery-orgs"],
//       connected_solutions: ["donation-tax-incentives", "safe-donation-regulation", "donation-liability-education"],
//       data: {
//         financial_benefit: 2865, waste_diverted: 193, jobs_created: 0, emissions_reduced: 714, water_saved: 93.1, meals_saved: 0.3
//       }
//     }, {
//       title: "Value-Added Processing",
//       slug: "value-added-processing",
//       summary: "Extending the usable life of donated foods through processing methods such as making soups, sauces, or other value-added products",
//       type: "Recovery",
//       featured_image: "filename",
//       stakeholders: ["farms", "retailers", "restaurants", "food-service-providers", "food-recovery-orgs"],
//       connected_solutions: ["donation-matching-software", "donation-storage-and-handling", "donation-transportation"],
//       data: {
//         financial_benefit: 2794, waste_diverted: 102, jobs_created: 153, emissions_reduced: 299, water_saved: 38.4, meals_saved: 0.2
//       }
//     }, {
//       title: "Donation Liability Education",
//       slug: "donation-liability-education",
//       summary: "Educating potential donors on liability laws to re-focus food recovery efforts on addressing logistical and operational barriers",
//       type: "Recovery",
//       featured_image: "filename",
//       stakeholders: ["farms", "retailers", "restaurants", "food-service-providers", "food-recovery-orgs"],
//       connected_solutions: ["donation-tax-incentives", "safe-donation-regulation"],
//       data: {
//         financial_benefit: 2789, waste_diverted: 57, jobs_created: 0, emissions_reduced: 210, water_saved: 27.3, meals_saved: 0.1
//       }
//     }, {
//       title: "Donation Storage and Handling",
//       slug: "donation-storage-and-handling",
//       summary: "Expanding temperature-controlled food distribution infrastructure (e.g. refrigeration, warehouses) and labor availability to handle (e.g. process, package) additional donation volumes",
//       type: "Recovery",
//       featured_image: "filename",
//       stakeholders: ["farms", "retailers", "restaurants", "food-service-providers", "food-recovery-orgs"],
//       connected_solutions: ["donation-matching-software", "donation-transportation", "value-added-processing"],
//       data: {
//         financial_benefit: 2396, waste_diverted: 103, jobs_created: 2145, emissions_reduced: 381, water_saved: 49.7, meals_saved: 0.2
//       }
//     }, {
//       title: "Spoilage Prevention Packaging",
//       slug: "spoilage-prevention-packaging",
//       summary: "Using active intelligent packaging to prolong product freshness and slow down spoilage of perishable fruit and meat",
//       type: "Prevention",
//       featured_image: "filename",
//       stakeholders: ["manufacturers", "retailers", "consumers"],
//       connected_solutions: ["standardized-date-labeling", "produce-specifications", "packaging-adjustemnts", "smaller-plates", "trayless-dining"],
//       data: {
//         financial_benefit: 2319, waste_diverted: 72, jobs_created: 0, emissions_reduced: 329, water_saved: 43.6, meals_saved: 0.1
//       }
//     }, {
//       title: "Donation Transportation",
//       slug: "donation-transportation",
//       summary: "Leveraging a fleet of trucks to transport small-volume donations to community food recovery agencies, and transport large-volume rejected food imports in border states",
//       type: "Recovery",
//       featured_image: "filename",
//       stakeholders: ["farms", "retailers", "restaurants", "food-service-providers", "food-recovery-orgs"],
//       connected_solutions: ["donation-matching-software", "donation-storage-and-handling", "value-added-processing"],
//       data: {
//         financial_benefit: 2291, waste_diverted: 110, jobs_created: 1604, emissions_reduced: 407, water_saved: 53, meals_saved: 0.2
//       }
//     }, {
//       title: "Waste Tracking & Analytics",
//       slug: "waste-tracking",
//       summary: "Providing restaurants and prepared-food providers with data on wasteful practices to inform behavior and operational changes",
//       type: "Prevention",
//       featured_image: "filename",
//       stakeholders: ["restaurants", "foodservice"],
//       connected_solutions: ["inventory-management", "cold-chain-management", "manufacturing-line-optimization", "secondary-resellers"],
//       data: {
//         financial_benefit: 2282, waste_diverted: 571, jobs_created: 0, emissions_reduced: 2306, water_saved: 317.4, meals_saved: 1
//       }
//     }, {
//       title: "Trayless Dining",
//       slug: "trayless-dining",
//       summary: "Eliminating tray dining in all-you-can-eat dining establishments to reduce consumer waste",
//       type: "Prevention",
//       featured_image: "filename",
//       stakeholders: ["foodservice"],
//       connected_solutions: ["standardized-date-labeling", "produce-specifications", "packaging-adjustments", "spoilage-prevention-packaging", "smaller-plates"],
//       data: {
//         financial_benefit: 2253, waste_diverted: 83, jobs_created: 0, emissions_reduced: 332, water_saved: 40, meals_saved: 0.1
//       }
//     }, {
//       title: "Smaller Plates",
//       slug: "smaller-plates",
//       summary: "Providing consumers with smaller plates in self-serve, all-you-can-eat dining settings to reduce consumer waste",
//       type: "Prevention",
//       featured_image: "filename",
//       stakeholders: ["foodservice"],
//       connected_solutions: ["standardized-date-labeling", "produce-specifications", "packaging-adjustments", "spoilage-prevention-packaging", "trayless-dining"],
//       data: {
//         financial_benefit: 2146, waste_diverted: 178, jobs_created: 0, emissions_reduced: 711, water_saved: 85.6, meals_saved: 0.3
//       }
//     }, {
//       title: "Manufacturing Line Optimization",
//       slug: "manufacturing-line-optimization",
//       summary: "Identifying opportunities to reduce food waste from manufacturing / processing operations and product line changeovers",
//       type: "Prevention",
//       featured_image: "filename",
//       stakeholders: ["manufacturers"],
//       connected_solutions: ["waste-tracking", "inventory-management", "cold-chain-management", "secondary-resellers"],
//       data: {
//         financial_benefit: 1818, waste_diverted: 11, jobs_created: 0, emissions_reduced: 34, water_saved: 3.9, meals_saved: 0
//       }
//     }, {
//       title: "Cold Chain Management",
//       slug: "cold-chain-management",
//       summary: "Cold Chain Management",
//       type: "Prevention",
//       featured_image: "filename",
//       stakeholders: ["retailers"],
//       connected_solutions: ["waste-tracking", "inventory-management", "manufacturing-line-optimization", "secondary-resellers"],
//       data: {
//         financial_benefit: 1778, waste_diverted: 18, jobs_created: 0, emissions_reduced: 62, water_saved: 5.8, meals_saved: 0
//       }
//     }, {
//       title: "Donation Tax Incentives",
//       slug: "donation-tax-incentives",
//       summary: "Expanding federal tax benefits for food donations to all businesses and simplifying donation reporting for tax deductions",
//       type: "Recovery",
//       featured_image: "filename",
//       stakeholders: ["farms", "retailers", "restaurants", "food-service-providers", "food-recovery-orgs"],
//       connected_solutions: ["safe-donation-regulation", "donation-liability-education"],
//       data: {
//         financial_benefit: 1227, waste_diverted: 383, jobs_created: 0, emissions_reduced: 874, water_saved: 110.1, meals_saved: 6
//       }
//     }, {
//       title: "Inventory Management",
//       slug: "inventory-management",
//       summary: "Optimizing store ordering to improve perishables inventory turnover and product shelf life tracking ",
//       type: "Prevention",
//       featured_image: "filename",
//       stakeholders: ["retailers"],
//       connected_solutions: [],
//       data: {
//         financial_benefit: 1203, waste_diverted: 59, jobs_created: 0, emissions_reduced: 181, water_saved: 20.4, meals_saved: 0.1
//       }
//     }, {
//       title: "Produce Specifications",
//       slug: "produce-specifications",
//       summary: "Accepting and integrating the sale of off-grade (short shelf life, different size / shape / color), also known as 'ugly' produce, for use in foodservice and restaurant preparation and for retail sale",
//       type: "Prevention",
//       featured_image: "filename",
//       stakeholders: ["farms", "retailers", "restaurants", "food-service-providers"],
//       connected_solutions: ["slug", "slug"],
//       data: {
//         financial_benefit: 1041, waste_diverted: 266, jobs_created: 0, emissions_reduced: 422, water_saved: 0, meals_saved: 0
//       }
//     }, {
//       title: "Secondary Resellers",
//       slug: "secondary-resellers",
//       summary: "Businesses that purchase unwanted processed food and produce direct from manufacturers/distributors for discounted retail sale to consumers",
//       type: "Prevention",
//       featured_image: "filename",
//       stakeholders: ["retailers"],
//       connected_solutions: [],
//       data: {
//         financial_benefit: 222, waste_diverted: 167, jobs_created: 0, emissions_reduced: 510, water_saved: 57.6, meals_saved: 0.3
//       }
//     }, {
//       title: "Home Composting",
//       slug: "home-composting",
//       summary: "Keeping a small bin or pile for on-site waste at residential buildings to be managed locally; also known as “backyard composting”",
//       type: "Recycling",
//       featured_image: "filename",
//       stakeholders: ["consumers"],
//       connected_solutions: [],
//       data: {
//         financial_benefit: 161, waste_diverted: 97, jobs_created: 0, emissions_reduced: 53, water_saved: 0, meals_saved: 0
//       }
//     }, {
//       title: "Onsite Greywater",
//       slug: "onsite-greywater",
//       summary: "Using machines to grind waste mixed with water and proprietary microbes/nutrients, decomposing material into a liquid effluent to be disposed by drain/sewer, achieving diversion without recycling",
//       type: "Recycling",
//       featured_image: "filename",
//       stakeholders: ["restaurants", "foodservice"],
//       connected_solutions: [],
//       data: {
//         financial_benefit: 9, waste_diverted: 595, jobs_created: 0, emissions_reduced: 0, water_saved: 0, meals_saved: 0
//       }
//     }, {
//       title: "Centralized AD",
//       slug: "centralized-ad",
//       summary: "Transporting waste to a centralized digester to convert to methane which enables energy extraction; the remaining digestate can be separated into solids for composting and the liquids used as a biofertilizer",
//       type: "Recycling",
//       featured_image: "filename",
//       stakeholders: ["municipalities", "manufacturers", "retailers"],
//       connected_solutions: [],
//       data: {
//         financial_benefit: 7, waste_diverted: 1233, jobs_created: 1700, emissions_reduced: 772, water_saved: 0, meals_saved: 0
//       }
//     }, {
//       title: "Centralized Composting",
//       slug: "cnetralized-composting",
//       summary: "Transporting waste to a centralized facility where it decomposes into compost",
//       type: "Prevention",
//       featured_image: "filename",
//       stakeholders: ["municipalities", "retailers", "restaurants", "foodservice", "consumers"],
//       connected_solutions: [],
//       data: {
//         financial_benefit: 4, waste_diverted: 5037, jobs_created: 9000, emissions_reduced: 2605, water_saved: 0, meals_saved: 0
//       }
//     }, {
//       title: "WRRF with AD",
//       slug: "wrrf-with-ad",
//       summary: "Delivering waste by truck or through existing sink disposal pipes to a municipal WRRF, where it is treated with anaerobic digestion, and the biosolids can be applied to land for beneficial reuse",
//       type: "Recycling",
//       featured_image: "filename",
//       stakeholders: ["wrrf", "retailers", "municipalities", "restaurants", "consumers"],
//       connected_solutions: [],
//       data: {
//         financial_benefit: 0, waste_diverted: 1637, jobs_created: 100, emissions_reduced: 728, water_saved: 0, meals_saved: 0
//       }
//     }, {
//       title: "Animal Feed",
//       slug: "animal-feed",
//       summary: "Feeding food waste to animals after it is heat treated and dehydrated and either mixed with dry feed or directly fed to animals",
//       type: "Recycling",
//       featured_image: "filename",
//       stakeholders: ["manufacturers", "retailers", "restaurants", "food-service-providers"],
//       connected_solutions: [],
//       data: {
//         financial_benefit: -12, waste_diverted: 49, jobs_created: 0, emissions_reduced: 34, water_saved: 0, meals_saved: 0
//       }
//     }, {
//       title: "Community Composting",
//       slug: "community-composting",
//       summary: "Transporting food from homes to small, community or neighborhood-level compost facilities, larger than home compost ",
//       type: "Recycling",
//       featured_image: "filename",
//       stakeholders: ["restaurants", "consumers"],
//       connected_solutions: [],
//       data: {
//         financial_benefit: -35, waste_diverted: 167, jobs_created: 230, emissions_reduced: 163, water_saved: 0, meals_saved: 0
//       }
//     }, {
//       title: "In-vessel Composting",
//       slug: "in-vessel-composting",
//       summary: "Composting at small-scale with appropriate aeration and control and, in some cases, proprietary blends of microbes/nutrients",
//       type: "Recycling",
//       featured_image: "filename",
//       stakeholders: ["restaurants", "foodservice"],
//       connected_solutions: [],
//       data: {
//         financial_benefit: -98, waste_diverted: 12, jobs_created: 0, emissions_reduced: 11, water_saved: 0, meals_saved: 0
//       }
//     }
//   ]
// }