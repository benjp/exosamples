function eXoTagItGadget(){      
} ;


eXoTagItGadget.prototype.onLoadHander = function() {
  eXoTagItGadget.getTags();
} ;

eXoTagItGadget.prototype.getTags = function() {
  var url = '';
  var loc = window.parent.document.location;
  var portalContext = '/portal';
  var portalRest = 'rest';
  try {
    var portalContext = window.parent.eXo.env.portal.context;
    var portalRest = window.parent.eXo.env.portal.rest;
  } catch (err) {
  }
  //var parentSCV = window.parent.document.getElementById('UISingleContentViewerPortlet_8897e2bc-5b9d-4f45-8fcb-1a654e8550cd');
  //parentSCV.style.padding = '10px';
  
  url = 'http://' + loc.host + portalContext + '/' + portalRest + '/contents/tag/public';
  url += '?jcrPath=' + getget("content-id");
  this.url = url;
  
  eXoTagItGadget.makeDOMRequest(url);
} ;

eXoTagItGadget.prototype.makeDOMRequest = function(url) {
  var params = {};
  params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.DOM;
  var ts = new Date().getTime();
  var sep = "?";
  var refreshInterval = 1;
  if (refreshInterval && refreshInterval > 0) {
    ts = Math.floor(ts / (refreshInterval * 1000));
  }
  if (url.indexOf("?") > -1) {
    sep = "&";
  }
  url = [ url, sep, "nocache=", ts ].join("");
  return gadgets.io.makeRequest(url, eXoTagItGadget.render, params);
} ;

eXoTagItGadget.prototype.render = function(obj) {
  //obj.data contains a Document DOM element corresponding to the page that was requested
  var domdata = obj.data;

  var html = '';
  
  html += "<div class='Header'>" + 'Tags';
  if (window.parent.eXo.env.portal.userName!='null') {
    html += "  <div id='addTagDivPlus' class='AddTag' onMouseOver='javascript:eXoTagItGadget.showInput()'onMouseOut='javascript:eXoTagItGadget.hideInput()'><div id='AddTagPre'>+</div>";
    html += "    <div id='addTagDiv'>";
    html += "      <input type='text' size='10' onkeypress='javascript:eXoTagItGadget.addTag(this, event)' />";
    html += "   </div></div>";
  }
  html += "</div>";

  html += "<div class='Tags'>";

  var tags = domdata.getElementsByTagName("tag"); 
  for (var i = 0; i < tags.length; i++) { 
    tagName = tags[i].getAttribute("name"); 
    html += "<div class='Tag'>"+tagName+"</div>";
  }

  html += "</div>";

  // Set the background color according to the mycolor userpref
  var element = document.getElementById('tagit_gadget_div');  

  element.innerHTML = html;
  
  // Tells gadget to resize itself
  gadgets.window.adjustHeight();
  
} ;

eXoTagItGadget.prototype.addTag = function(input, e) {
  var val = input.value;

  var charCode;
    
  if(e && e.which){
    charCode = e.which;
  } else if(window.event){
    e = window.event;
    charCode = e.keyCode;
  }

  if(charCode == 13) {
    eXoTagItGadget.setTag(val);
  }

}
  
eXoTagItGadget.prototype.showInput = function() {
  var tagPre = document.getElementById('AddTagPre');
  tagPre.style.display = "none";
  var addTagDiv = document.getElementById('addTagDiv');
  addTagDiv.style.display = "inline";
}

eXoTagItGadget.prototype.hideInput = function() {
  var addTagDiv = document.getElementById('addTagDiv');
  addTagDiv.style.display = "none";
  var tagPre = document.getElementById('AddTagPre');
  tagPre.style.display = "inline";
}

eXoTagItGadget.prototype.isOver = function(input, star) {
  input.oldClass = input.className;
  input.className = 'IconFullRed';
} ;

eXoTagItGadget.prototype.isOut = function(input, star) {
  input.className = input.oldClass;
} ;

eXoTagItGadget.prototype.setTag = function(tag) {
  var url = '';
  var loc = window.parent.document.location;
  var portalContext = '/portal';
  var portalRest = 'rest';
  var username = '_anonim';
  try {
    var portalContext = window.parent.eXo.env.portal.context;
    var portalRest = window.parent.eXo.env.portal.rest;
    var username = window.parent.eXo.env.portal.userName;
  } catch (err) {
  }
  url = 'http://' + loc.host + portalContext + '/' + portalRest + '/contents/tag/add/'+tag;
  url+= '?jcrPath=' + getget("content-id");
  
  var postdata = {
    jcrPath : getget("content-id")
  };
  
  
  eXoTagItGadget.makeTag(url, postdata);
} ;

eXoTagItGadget.prototype.makeTag = function(url, postdata) {
  var params = {};
  params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.TEXT;
  
  params[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.POST;
  params[gadgets.io.RequestParameters.POST_DATA] = gadgets.io.encodeValues(postdata);

  
  var ts = new Date().getTime();
  var sep = "?";
  var refreshInterval = 1;
  if (refreshInterval && refreshInterval > 0) {
    ts = Math.floor(ts / (refreshInterval * 1000));
  }
  if (url.indexOf("?") > -1) {
    sep = "&";
  }
  url = [ url, sep, "nocache=", ts ].join("");

  gadgets.io.makeRequest(url, eXoTagItGadget.norender, params);
} ;

eXoTagItGadget.prototype.norender = function(obj) {
  var plus = document.getElementById('addTagDivPlus');  
  plus.style.display = "none";
  //thanks.className = 'Thanks';
  //thanks.innerHTML = "Thanks for voting !";

  setTimeout(eXoTagItGadget.refresh, 500);
} ;

eXoTagItGadget.prototype.refresh = function() {
  eXoTagItGadget.getTags();
  //window.location.reload( true );
} ;



eXoTagItGadget =  new eXoTagItGadget();
gadgets.util.registerOnLoadHandler(eXoTagItGadget.onLoadHander);



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


