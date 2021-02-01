### This repository is READ ONLY ###

# ReFED: Website #

This project uses Gulp, Jekyll, Cloudcannon Suite. It is meant for hosting on Cloudcannon, but it is possible to reconfigure for Firebase or GithubPages hosting.

## Getting Started ##
1. Install Node packages: `npm install`
2. Install Gem Dependencies: `gulp dev:install`


## Daily Startup ##
1. `cd` to project directory
2. Start environment: `npm start`
3. Navigate to [http://localhost:4000/](http://localhost:4000/)

## Deployment to ghPages ##
1. `cd` to project directory
2. Start environment: `npm run deploy`
=================
Notes for minibundle

{% minibundle js %}
source_dir: _assets/js
destination_path: assets/site
baseurl: '{{ site.baseurl }}/'
assets:
  - libs/bootstrap-multiselect
  - libs/bootstrap-tour.min
  - libs/chartist.min
  - libs/chartist-plugin-fill-donut.min
  - libs/behaviors
  - libs/jquery.cookie
  - libs/jquery.form
  - libs/jquery.stickit
  - libs/jquery.scrollTo
  - libs/jquery.localScroll
  - libs/lunr.min
  - libs/jquery.waypoints.min
  - libs/inview.min
  - plugins
  - tour
  - scroll
  - pageState
  - disabled
  - tabs
  - sticky
  - video
  - print
  - lineClamp
  - nav/quicknav
  - nav/toolnav
  - components/share
  - components/solutionCards
  - components/supplyChain
  - components/siteSearch
  - components/pageHelp
  - components/articles
  - components/menuToggle
  - components/toc
  - components/profile
  - components/download
  - charts
  - components/charts/cost_curve
  - components/charts/reduction_chart
  - components/maps/locationField
  - tools/innovator-database/map
  - tools/innovator-database/list
  - tools/innovator-database/filters
  - tools/innovator-database/analysis
  - tools/innovator-database/about
  - tools/food-waste-policy-finder/map
  - tools/spotlight-on-date-labeling/quiz
  - tools/spotlight-on-date-labeling/carousel-date-label
  - main
attributes:
  id: refed-scripts
  async:
{% endminibundle %}
