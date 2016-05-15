// ==UserScript==
// @name        Get Wiki format
// @namespace   bugzilla
// @include     https://bugzilla.mozilla.org/page.cgi?id=mydashboard.html
// @version     1
// @grant       GM_setClipboard
// ==/UserScript==
var table = document.querySelector(".yui3-datatable-data");
var column = document.querySelector(".yui3-datatable-columns");
var query = document.getElementById('query_count_refresh');
var line = document.createElement("doc");
line.innerHTML='|';
var button = document.createElement("input");
button.type = "button";
button.value = "To Wiki";
query.appendChild(line);
query.appendChild(button);

for (var i=0; i<table.rows.length; i++) {
  var ck = document.createElement("input");
  ck.type = "checkbox";
  table.rows[i].cells[4].insertBefore(ck, table.rows[i].cells[4].firstChild);
}

button.onclick = function(e) {
  var res = "";
  for (var i=0; i<table.rows.length; i++) {
    if (table.rows[i].cells[4].firstChild.checked) {
      var bugid = table.rows[i].cells[1].innerText;
      var bugdesc = table.rows[i].cells[4].innerText;
      res  += "* {{" + table.rows[i].cells[1].innerText + "}} - " +
             table.rows[i].cells[4].innerText + "\n";
    }
  }

  //console.log(res)
  GM_setClipboard (res);
}
