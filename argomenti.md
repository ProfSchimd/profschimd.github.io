---
layout: page
toc: false
permalink: /argomenti/
---

{% for item in site.data.argomenti %}
* {{ item.nome_materia }}
{% for classe in item.classi %}
    * {{ classe.anno }}
{% for modulo in classe.moduli %}
        * [{{ modulo.argomento }}]({{ modulo.link }})
{% for lezione in modulo.lezioni %}
            * [{{ lezione.title }}]({{ lezione.link }})
{% endfor %}    
{% endfor %}
{% endfor %}
{% endfor %}

