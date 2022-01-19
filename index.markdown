---
layout: default
title: Home Page
---

# {{ page.title }}
## {{ site.title }}

Benvenuti sul sito didattico del Prof. Schimd dell'[ITIS Carlo Zuccante di
Venezia-Mestre](https://www.itiszuccante.edu.it/). In queste pagine si trova
materiale di studio preparato per gli alunni dell'istituto relativamente alle
seguenti discipline informatiche:
{% for item in site.materie %}
* [{{ item.title }} ({{ item.sigla }})]({{ item.url }})
{% endfor %}

### Classi coinvolte (A.S. 2021-2022)
{% for item in site.classi %}
* [{{ item.title }} ({{ item.materia }})]({{ item.url }})
{% endfor %}
<!-- 
{% for item in site.data.classi %}
* [{{ item.classe }} ({{ item.materia }})]({{ item.link }})
{% endfor %}

 -->