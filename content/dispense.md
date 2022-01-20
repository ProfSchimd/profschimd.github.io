---
title: Appunti
layout: default
---

<div class="card-deck">
	<div class="card border-primary mb-3">
	  	<div class="card-header">Sistemi e Reti</div>
	  	<div class="card-body">
	    <ul>
		{%- for item in site.data.dispense["sr"] -%}
			<li>
				<a target="_blank" href="{{ item.link }}">
					{{ item.name }} (rev. {{ item.revision }})
				</a>
			</li>
		{%- endfor -%}
		</ul>
		</div>
	</div>
	<div class="card border-primary mb-3">
	  	<div class="card-header">GPOI</div>
	  	<div class="card-body">
	  	<ul>
		{%- for item in site.data.dispense["gpoi"] -%}
			<li>
				<a target="_blank" href="{{ item.link }}">
					{{ item.name }} (rev. {{ item.revision }})
				</a>
			</li>
		{%- endfor -%}
		</ul>
	  	</div>
	</div>
	<div class="card border-primary mb-3">
	  	<div class="card-header">TPSIT</div>
	  	<div class="card-body">
	  	<ul>
	  		{%- for item in site.data.dispense["tpsit"] -%}
			<li>
				<a target="_blank" href="{{ item.link }}">
					{{ item.name }} (rev. {{ item.revision }})
				</a>
			</li>
		{%- endfor -%}
		</ul>
	  	</div>
	</div>

</div>
