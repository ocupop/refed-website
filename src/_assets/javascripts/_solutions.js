{% assign tabs = site.data.impact %}
{% assign solutions = site.solutions | sort:"order" %}
var solution_data = {
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


function getFilters(data) {
  return data.filters.map(function(filter) {
    return filter.label
  })
};

function getSort(data) {
  return data.sort.map(function(sort) {
    return sort.label
  })
};

function getLabels(data) {
  return data.solutions.map(function(solution) {
    return solution.title
  })
};
function getSeries(data, key) {
  return data.solutions.map(function(solution) {
    return solution.data[key]
  })
};
function getData(key) {
  return {
    labels: getLabels(solution_data),
    series: [
      getSeries(solution_data, key)
    ]
  }
};
function showStat(sort) {
  $('.card .stat').hide().filter("."+sort).show();
};

