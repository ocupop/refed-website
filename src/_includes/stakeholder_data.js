{% assign stakeholders = site.stakeholders | sort:"order" %}[
  {% for stakeholder in stakeholders %}{
    title: "{{ stakeholder.title }}",
    slug: "{{ stakeholder.slug }}",
    summary: "{{ stakeholder.summary }}"
  }{% unless forloop.last %}, {% endunless %}{% endfor %}
]