var solution_data = {% include solution_data.js %};


function getFilters(data) {
  return data.filters.map(function(filter) {
    return filter.label
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
function showStat(filter) {
  $('.card .stat').hide().filter("."+filter).show();
};