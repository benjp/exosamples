function eXoAuthorItGadget(){      
} ;


eXoAuthorItGadget.prototype.onLoadHander = function() {
  eXoAuthorItGadget.getAuthoring();
} ;

eXoAuthorItGadget.prototype.getAuthoring = function() {
  var url = '';
  var loc = window.parent.document.location;
  var portalContext = '/portal';
  var portalRest = 'rest';
  var userId = '__anonim';
  try {
    var portalContext = window.parent.eXo.env.portal.context;
    var portalRest = window.parent.eXo.env.portal.rest;
    var userId = window.parent.eXo.env.portal.userName;
  } catch (err) {
  }
  
  
  
  var prefs = new gadgets.Prefs();
  var workspacePref = prefs.getString("workspace");
  if (workspacePref=='') workspacePref='collaboration';
  var fromstatePref = prefs.getString("fromstate");
  var tostatePref = prefs.getString("tostate");
  var bydatePref = prefs.getString("bydate");
  var restService = 'bystate';
  var addon1 = '';
  if (tostatePref != '') {
    restService = 'tostate';
    var addon1 = '&tostate='+tostatePref;
  }
  
  url = 'http://' + loc.host + portalContext + '/' + portalRest + '/authoring/'+restService;
  url += '?fromstate='+fromstatePref+'&workspace='+workspacePref+'&user='+userId+'&json=true';
  url += addon1;
  this.url = url;
  //alert(url);
  eXoAuthorItGadget.makeDOMRequest(url);
} ;

eXoAuthorItGadget.prototype.makeDOMRequest = function(url) {
  var params = {};
  params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.JSON;
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
  return gadgets.io.makeRequest(url, eXoAuthorItGadget.render, params);
} ;

eXoAuthorItGadget.prototype.render = function(obj) {
  //obj.data contains a JavaScript object corresponding to the data that was requested
  var elements = obj.data;
  //var elements = gadgets.json.parse(obj.text);
  //alert(obj.data);
  
  //alert(obj.text);
  
  
  var html = '';
  var prefs = new gadgets.Prefs();
  var titlePref = prefs.getString("title");
  
  var dynamicTitle = prefs.getString("dynamictitle");
  
  if (dynamicTitle=="yes") setMainTitle(titlePref, elements.length);
  
  var workspacePref = prefs.getString("workspace");
  if (workspacePref=="") workspacePref = "collaboration";
  
  var targetUrl = window.parent.location.href;
  targetUrl = targetUrl.substring(0, targetUrl.lastIndexOf(window.parent.eXo.env.portal.context) ) + window.parent.eXo.env.portal.context + '/g/:platform:web-contributors/editor';
  targetUrl += '?backto='+window.parent.location.href;
  
  html += '<div class="UIAuthoringDashboard">';

  if (dynamicTitle=="yes") {
    html += '  <div class="ElementsDynamic">';
  } else {
    html += '  <div class="Header">';
    html += '    <div class="Title"><a href="javascript:redirectTo(\''+targetUrl+'\')">'+titlePref+'</a></div>';
    if (elements.length>0) {
      var classColor = 'Green';
      if (elements.length>1 && elements.length<=3) {
        var classColor = 'Orange';
      } else if (elements.length>3) {
        var classColor = 'Red';
      }
      
      html += '    <div class="Total '+classColor+'">'+elements.length+'</div>';
    }
//    html += '    <div style="clear:both;"><span></span></div>';
    html += '  </div>';
    html += '  <div class="Elements">';
  }
  html += '';
  html += '';
  
//  targetUrl += '&path=/repository/'+workspacePref;
  targetUrl += '&path='+workspacePref;
  for (var i = 0; i < elements.length && i<10 ; i++) {
    elementName = elements[i].title;
    if (elementName==undefined) elementName = elements[i].name;
    //alert("TEST1::"+elements[0].title);
    if (elementName.length>35) elementName = elementName.substring(0,35)+'...';
    elementPath = elements[i].path;
    elementUrl = targetUrl +elementPath;
    
    html += "<li><a href='javascript:redirectTo(\""+elementUrl+"\")' title='"+elementPath+"'>"+elementName+"</a><br/>";
  }
  
  html += '  </div>';
  html += '</div>';
  
  
  // Set the background color according to the mycolor userpref
  var element = document.getElementById('authorit_gadget_div');  
  
  element.innerHTML = html;
  
  // Tells gadget to resize itself
  gadgets.window.adjustHeight();
  
} ;



eXoAuthorItGadget =  new eXoAuthorItGadget();
gadgets.util.registerOnLoadHandler(eXoAuthorItGadget.onLoadHander);


