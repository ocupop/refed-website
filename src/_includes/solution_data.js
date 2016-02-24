{% assign tabs = site.data.impact %}{% assign solutions = site.solutions | sort:"order" %}{
  sort: [
    {% for tab in tabs %}{
      title: "{{ tab.title }}",
      label: "{{ tab.label }}",
      slug: "{{ tab.slug }}",
      summary: "{{ tab.summary }}",
      description: "{{ tab.description }}"
    }{% unless forloop.last %}, {% endunless %}{% endfor %}
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