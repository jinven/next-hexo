<!DOCTYPE html>
<html lang="{{ config.language }}">
<head>
  {{ partial('_partials/head/head.swig', {}, {cache: theme.cache.enable}) }}
  {% include '_partials/head/head-unique.swig' %}
  {{- next_inject('head') }}
  <title>{% block title %}{% endblock %}</title>
  {{ partial('_third-party/analytics/index.swig', {}, {cache: theme.cache.enable}) }}
  {{ partial('_scripts/noscript.swig', {}, {cache: theme.cache.enable}) }}
</head>

<body itemscope itemtype="http://schema.org/WebPage">
  <div class="container{%- if theme.motion.enable %} use-motion{%- endif %}">
    <div class="headband"></div>

    <header class="header" itemscope itemtype="http://schema.org/WPHeader">
      <div class="header-inner">{% include '_partials/header/index.swig' %}</div>
    </header>

    {{ partial('_partials/widgets.swig', {}, {cache: theme.cache.enable}) }}

    <main class="main">
      <div class="main-inner">
        <div class="content-wrap">
          {% include '_partials/header/sub-menu.swig' %}
          <div class="content">
            {% block content %}{% endblock %}
          </div>
          {% include '_partials/comments.swig' %}
        </div>
        {%- if theme.sidebar.display !== 'remove' %}
          {% block sidebar %}{% endblock %}
        {%- endif %}
      </div>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        {{ partial('_partials/footer.swig', {}, {cache: theme.cache.enable}) }}
        {{ partial('_third-party/statistics/index.swig', {}, {cache: theme.cache.enable}) }}
        {% block footer %}{% endblock %}
      </div>
    </footer>
  </div>
  <!-- _scripts/index.swig -->
  {{ partial('_scripts/index.swig', {}, {cache: theme.cache.enable}) }}
  <!-- _third-party/index.swig -->
  {{ partial('_third-party/index.swig', {}, {cache: theme.cache.enable}) }}
  <!-- theme.pjax -->
  {%- if theme.pjax %}
    <div id="pjax">
  {%- endif %}

  <!-- _third-party/math/index.swig -->
  {% include '_third-party/math/index.swig' %}
  <!-- _third-party/quicklink.swig -->
  {% include '_third-party/quicklink.swig' %}

  <!-- _third-party/bodyEnd.swig -->
  {{- next_inject('bodyEnd') }}

  <!-- theme.pjax -->
  {%- if theme.pjax %}
    </div>
  {%- endif %}
  <!-- 
    <canvas width="1366" height="662" style="position: fixed; left: 0px; top: 0px; z-index: 2147483647; pointer-events: none;"></canvas>
  -->
  <script src="{{ url_for(theme.js) }}/cursor-effects.js"></script>
  <script>
    // {{ page.title }}
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?db1c134844bf26277860eaa90b796200";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  </script>
</body>
</html>
