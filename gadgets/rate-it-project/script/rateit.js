function eXoRateItGadget(){      
} ;


eXoRateItGadget.prototype.onLoadHander = function() {
  eXoRateItGadget.getVote();
} ;

eXoRateItGadget.prototype.getVote = function() {
  var url = '';
  var loc = window.parent.document.location;
  var portalContext = '/portal';
  var portalRest = 'rest';
  try {
    var portalContext = window.parent.eXo.env.portal.context;
    var portalRest = window.parent.eXo.env.portal.rest;
  } catch (err) {
  }
  url = 'http://' + loc.host + portalContext + '/' + portalRest + '/contents/vote/star';//getVote';
  url += '?jcrPath=' + getget("content-id");
  this.url = url;
  
  eXoRateItGadget.makeDOMRequest(url);
} ;

eXoRateItGadget.prototype.makeDOMRequest = function(url) {
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
  return gadgets.io.makeRequest(url, eXoRateItGadget.render, params);
} ;

eXoRateItGadget.prototype.render = function(obj) {
  //obj.data contains a Document DOM element corresponding to the page that was requested
  var domdata = obj.data;
  var node = domdata.getElementsByTagName("rate").item(0);
  var rate = parseFloat(node.firstChild.nodeValue) + 0.01;
  var total = domdata.getElementsByTagName("total").item(0).firstChild.nodeValue;
  //  data = obj.data;
  
  // Set the background color according to the mycolor userpref
  var element = document.getElementById('rateit_gadget_div');  
  //element.style.height=250;
  // Set the background color according to the mycolor userpref   
  //element.style.backgroundColor="Orange";
  
  var iempty = 0;
  var ifull = Math.floor(rate);
  html = '';
  html += "<div id='rateit_gadget_thanks'></div>";
  html += "<div id='rateit_gadget_votes'>";
  for (var i=0 ; i<ifull ; i++) {
    html += "<div class='IconFull' onClick='javascript:eXoRateItGadget.setVote("+(i+1)+");' onMouseOver='javascript:eXoRateItGadget.isOver(this, "+(i+1)+");' onMouseOut='javascript:eXoRateItGadget.isOut(this, "+(i+1)+");'></div>";
  }
  if (rate>=parseFloat(ifull)+0.5){
    html += "<div class='IconHalfFull' onClick='javascript:eXoRateItGadget.setVote("+(ifull+1)+");' onMouseOver='javascript:eXoRateItGadget.isOver(this, "+(ifull+1)+");' onMouseOut='javascript:eXoRateItGadget.isOut(this, "+(ifull+1)+");'></div>";
    iempty = 4-ifull;
  } else {
    iempty = 5-ifull;
  }
  if (iempty>0) {
    for (var i=0 ; i<iempty ; i++) {
      html += "<div class='IconEmpty' onClick='javascript:eXoRateItGadget.setVote("+(6-iempty+i)+");' onMouseOver='javascript:eXoRateItGadget.isOver(this, "+(6-iempty+i)+");' onMouseOut='javascript:eXoRateItGadget.isOut(this, "+(6-iempty+i)+");'></div>";
    }
  }
  html += "<div class='Total'>"+total+"</div>";
  //html += "<div id='rateit_gadget_thanks'></div>";
  html += "</div>"; // end <div id='rateit_gadget_votes'>

  element.innerHTML = html;
  
  // Tells gadget to resize itself
  gadgets.window.adjustHeight();
  
} ;

eXoRateItGadget.prototype.isOver = function(input, star) {
  input.oldClass = input.className;
  input.className = 'IconFullRed';
} ;

eXoRateItGadget.prototype.isOut = function(input, star) {
  input.className = input.oldClass;
} ;

eXoRateItGadget.prototype.setVote = function(rate) {
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
  url = 'http://' + loc.host + portalContext + '/' + portalRest + '/contents/vote/star';
  //url += '?jcrPath=' + getget("content-id");
  //url += '&username=' + username;
  //url += '&vote=' + rate +'.0';//&lang=en';
  //alert(url);
  
  var postdata = {
    jcrPath : getget("content-id"),
    vote : rate + '.0'
  };
  

  $.post(url, postdata, eXoRateItGadget.norender);
  
  
  //eXoRateItGadget.makeVote(url, postdata);
} ;

eXoRateItGadget.prototype.makeVote = function(url, postdata) {
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

  gadgets.io.makeRequest(url, eXoRateItGadget.norender, params);
} ;

eXoRateItGadget.prototype.norender = function(obj) {
  var thanks = document.getElementById('rateit_gadget_thanks');  
  var votes = document.getElementById('rateit_gadget_votes');  
  votes.style.display = 'none';
  thanks.className = 'Thanks';
  thanks.innerHTML = "Thanks for voting !";

  setTimeout(eXoRateItGadget.refresh, 2000);
} ;

eXoRateItGadget.prototype.refresh = function() {
  eXoRateItGadget.getVote();
  //window.location.reload( true );
} ;



eXoRateItGadget =  new eXoRateItGadget();
gadgets.util.registerOnLoadHandler(eXoRateItGadget.onLoadHander);



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


