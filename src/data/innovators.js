---
layout: null
---
load_innovatorMap({
   "innovators": [
{% for innovator in site.innovators %}
 {
   "name": "{{ innovator.name }}",
   "city": "{{ innovator.city }}",
   "state": "{{ innovator.state }}",
   "country": "{{ innovator.country }}",
   "innovator_reach": "{{ innovator.innovator_reach | downcase }}",
   "description": "{{ innovator.description | xml_escape }}",
   "organization_status": "{{ innovator.organization_status }}",
   "food_recovery_hierarchy": "{{ innovator.food_recovery_hierarchy }}",
   "innovator_category": "{{ innovator.innovator_category }}",
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