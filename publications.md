---
layout: page
title: Publications
description: >
  Complete list of peer-reviewed and other scholarly works.
permalink: /publications/
sitemap: true
---

<style>
.pub { margin: 0.25em 0 1.4em 0; line-height: 1.5; }
.pub-title { font-weight: 600; margin: 0 0 0.2em 0; }
.pub-authors { font-size: 0.95em; margin: 0 0 0.1em 0; }
.pub-venue { font-size: 0.92em; color: #555; margin: 0 0 0.15em 0; }
.pub-links { font-size: 0.9em; margin: 0; }
.pub-footnote { margin-top: 0.3em; color: #777; font-size: 0.85em; }
</style>

A complete chronological listing. Selected works are highlighted on the [home page](/#selected-publications).

{% assign years = site.data.publications | map: "year" | uniq | sort | reverse %}
{% for year in years %}
## {{ year }}

{% assign year_pubs = site.data.publications | where: "year", year %}
{% for pub in year_pubs %}
{% include pub_card.html pub=pub show_thumbnail=true %}
{% endfor %}
{% endfor %}

<p class="pub-footnote"><small>* denotes equal contribution; <strong>bold</strong> denotes the author. For up-to-date metrics, see <a href="https://scholar.google.com/citations?user=D_rZCWYAAAAJ">Google Scholar</a>.</small></p>
