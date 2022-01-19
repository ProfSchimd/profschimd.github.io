---
layout: default
title: Materie
---

{% for materia in site.materie %}
## {{ materia.title }} ({{ materia.sigla }})

{{ materia.excerpt }}

[Pagina di {{ materia.sigla }}]({{ materia.url }})

___
{% endfor %}



<hru />