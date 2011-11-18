function eXoShareItGadget(){      
} ;


eXoShareItGadget.prototype.onLoadHander = function() {
  eXoShareItGadget.render();
} ;

eXoShareItGadget.prototype.render = function() {  
  // Set the background color according to the mycolor userpref
  var element = document.getElementById('shareit_gadget_div');  
  
  html = "";
  
  html += "<a href='http://twitter.com/share?text="+window.parent.document.title+" : "+window.parent.document.location.href+"&url="+window.parent.document.location.href+"' target='_blank'><div class='IconTwitter'></div></a>";
  html += "<a href='http://www.facebook.com/sharer.php?t="+window.parent.document.title+" : "+window.parent.document.location.href+"&u="+window.parent.document.location.href+"' target='_blank'><div class='IconFacebook'></div></a>";
  html += "<a href='"+eXoShareItGadget.mailto()+"' target='_blank'><div class='IconMail'></div></a>";
  html += "<div class='IconDownload'></div>";
  
  // window.parent.document.title
  // window.parent.document.location.href

  element.innerHTML = html;
  
  // Tells gadget to resize itself
  gadgets.window.adjustHeight();
  
} ;

eXoShareItGadget.prototype.mailto = function() {  
  var s = "mailto:?subject="+escape("Read this : "+window.parent.document.title);
  s += "&body="+escape("I have shared an article with you. Check this out : "+window.parent.document.location.href);

  return s;
}



eXoShareItGadget =  new eXoShareItGadget();
gadgets.util.registerOnLoadHandler(eXoShareItGadget.onLoadHander);



function getget(name) {
  var q = window.parent.document.location.search;
  var i = q.indexOf(name + '=');
  if (i == -1) {
    return false;
  }
  var r = q.substr(i + name.length + 1, q.length - i - name.length - 1);
  i = r.indexOf('&');
  if (i != -1) {
    r = r.substr(0, i);
  }
  return r.replace(/\+/g, ' ');
}


