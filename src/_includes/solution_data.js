{% assign solutions = site.solutions | sort:"order" %}{
  sort: [
    {
      label: "Financial Benefit",
      slug: "financial-benefit"
    }, {
      label: "Waste Diverted",
      slug: "waste-diverted"
    }, {
      label: "Meals Saved",
      slug: "meals-saved"
    }, {
      label: "Emissions Reduced",
      slug: "emissions-reduced"
    }, {
      label: "Water Saved",
      slug: "water-saved"
    }, {
      label: "Jobs Created",
      slug: "jobs-created"
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