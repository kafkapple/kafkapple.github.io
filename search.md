---
layout: page
title: Search
description: >
  Full-text search across blog posts and TIL notes.
permalink: /search/
sitemap: false
---

<input id="search-box" type="search" placeholder="검색어 입력 / type to search..."
       autofocus
       style="width:100%;padding:0.6em 0.8em;font-size:1.1em;border:1px solid #ccc;border-radius:6px;margin-bottom:1em;"/>

<div id="search-status" style="color:#888;margin-bottom:1em;"></div>
<ul id="search-results" style="list-style:none;padding-left:0;"></ul>

<script src="https://unpkg.com/lunr@2.3.9/lunr.min.js"></script>
<script>
(function () {
  var input = document.getElementById('search-box');
  var status = document.getElementById('search-status');
  var results = document.getElementById('search-results');
  var idx = null;
  var docs = [];

  fetch('/search.json').then(function (r) { return r.json(); }).then(function (data) {
    docs = data;
    idx = lunr(function () {
      this.ref('url');
      this.field('title', { boost: 10 });
      this.field('content');
      this.field('tags', { boost: 3 });
      this.field('category', { boost: 2 });
      data.forEach(function (d) { this.add(d); }, this);
    });
    status.textContent = '✓ ' + data.length + '개 포스트 인덱싱 완료.';
  }).catch(function (e) {
    status.textContent = '⚠ 인덱스 로드 실패: ' + e.message;
  });

  function render(hits) {
    results.innerHTML = '';
    if (!hits.length) {
      results.innerHTML = '<li style="color:#888">검색 결과 없음.</li>';
      return;
    }
    hits.slice(0, 50).forEach(function (h) {
      var d = docs.find(function (x) { return x.url === h.ref; });
      if (!d) return;
      var snippet = (d.content || '').substring(0, 180) + '…';
      var li = document.createElement('li');
      li.style.marginBottom = '1em';
      li.innerHTML =
        '<a href="' + d.url + '" style="font-weight:600">' + d.title + '</a>' +
        ' <small style="color:#888">· ' + d.date + ' · ' + (d.category || '') + '</small>' +
        '<div style="color:#555;font-size:0.9em;margin-top:0.2em">' + snippet + '</div>';
      results.appendChild(li);
    });
  }

  input.addEventListener('input', function () {
    var q = input.value.trim();
    if (!idx || q.length < 2) { results.innerHTML = ''; return; }
    try {
      var hits = idx.search(q + '*');
      render(hits);
      status.textContent = hits.length + '개 결과.';
    } catch (e) { status.textContent = '검색 오류: ' + e.message; }
  });
})();
</script>
