---
layout: null
---
load_innovatorMap({
   "innovators": [
{% for innovator in site.innovators %}
 {
   "id": "{{ forloop.index }}",
   "name": "{{ innovator.name }}",
   "url": "{{ innovator.url }}",
   "city": "{{ innovator.city }}",
   "state": "{{ innovator.state }}",
   "country": "{{ innovator.country }}",
   "innovator_reach_category": "{{ innovator.innovator_reach_category | downcase }}",
   "description": "{{ innovator.description | xml_escape }}",
   "organization_classification": "{{ innovator.organization_classification }}",
   "food_recovery_category": "{{ innovator.food_recovery_category }}",
   "innovator_categories": "{{ innovator.innovator_categories }}",
   "subcategories": "{{ innovator.subcategories }}",
   "solutions": "{{ innovator.solutions }}",
   "founded": "{{ innovator.founded }}",
   "website": "{{ innovator.website }}",
   "facebook": "{{ innovator.facebook }}",
   "twitter": "{{ innovator.twitter }}",
   "linkedin": "{{ innovator.linkedin }}",
   "email": "{{ innovator.email }}",
   "geolocation": ["{{ innovator.lat }}","{{ innovator.lng }}" ]
 }{% unless forloop.last %},{% endunless %}
 {% endfor %}
 ]})