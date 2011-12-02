function eXoCommentItGadget(){      
} ;


eXoCommentItGadget.prototype.onLoadHander = function() {
  eXoCommentItGadget.getComments();
} ;

eXoCommentItGadget.prototype.getComments = function() {
  var url = '';
  var loc = window.parent.document.location;
  var portalContext = '/portal';
  var portalRest = 'rest';
  try {
    var portalContext = window.parent.eXo.env.portal.context;
    var portalRest = window.parent.eXo.env.portal.rest;
  } catch (err) {
  }
  
  url = 'http://' + loc.host + portalContext + '/' + portalRest + '/contents/comment/all';
  url += '?jcrPath=' + getget("content-id");
  this.url = url;

  eXoCommentItGadget.makeDOMRequest(url);
} ;

eXoCommentItGadget.prototype.makeDOMRequest = function(url) {
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
  return gadgets.io.makeRequest(url, eXoCommentItGadget.render, params);
} ;

eXoCommentItGadget.prototype.clearCommentWindow = function() {
  var comment = document.forms['formComment'].elements['comment'].value;  
  if (comment=='Type your comment here') {
    document.forms['formComment'].elements['comment'].value = '';
  }
} ;

eXoCommentItGadget.prototype.initCommentWindow = function() {
  var comment = document.forms['formComment'].elements['comment'].value;  
  if (comment=='') {
    document.forms['formComment'].elements['comment'].value = 'Type your comment here';
  }
} ;

eXoCommentItGadget.prototype.addComment = function() {
  var url = '';
  var loc = window.parent.document.location;
  var portalContext = '/portal';
  var portalRest = 'rest';
  //var username = '';
  try {
    var portalContext = window.parent.eXo.env.portal.context;
    var portalRest = window.parent.eXo.env.portal.rest;
    //var username = window.parent.eXo.env.portal.userName;
  } catch (err) {
  }
  //if (username=='null') username='Anonim';
  var comment = document.forms['formComment'].elements['comment'].value;
  
  url = 'http://' + loc.host + portalContext + '/' + portalRest + '/contents/comment/add';
  var data = {   
    jcrPath : getget("content-id"),   
    comment : comment
  };
  

  $.post(url, data,
     function() {
       setTimeout(eXoCommentItGadget.getComments, 50);
     }
    );
} ;


eXoCommentItGadget.prototype.render = function(obj) {
  //alert('done');
  //obj.data contains a Document DOM element corresponding to the page that was requested
  var domdata = obj.data;

  var html = '';
  
  html += "<div class='Header'>" + 'Comments' + "</div>";

  html += "<div class='Comments'>";

  var comments = domdata.getElementsByTagName("comment");
  //alert(obj.text);
  for (var i = 0; i < comments.length; i++) { 
    tagContent = comments[i].getElementsByTagName('content')[0].firstChild.nodeValue; 
    tagCommentor = comments[i].getElementsByTagName('commentor')[0].firstChild.nodeValue;
    tagDate = comments[i].getElementsByTagName('date')[0].firstChild.nodeValue;
    html += "<div class='Comment'>";
    html += "  <div class='CommentNum'>"+(comments.length-i)+"</div>";
    html += "  <div class='CommentCommentor'>";
    html += "    <span class='CommentCommentorName'>"+tagCommentor+"</span>";
    html += "    <span class='CommentCommentorSaid'>"+'&nbsp;said&nbsp;'+"</span>";
    html += "    <span class='CommentCommentorDate'>"+tagDate+"</span>";
    html += "  </div>";
    html += "  <div class='CommentContent'><p>"+tagContent+"</p></div>";
    html += "</div>";
  }

  html += "</div>";
  
  var url = '';
  var loc = window.parent.document.location;
  var portalContext = '/portal';
  var portalRest = 'rest';
  try {
    var portalContext = window.parent.eXo.env.portal.context;
    var portalRest = window.parent.eXo.env.portal.rest;
  } catch (err) {
  }
  
  if (window.parent.eXo.env.portal.userName!='null') {
    url = 'http://' + loc.host + portalContext + '/' + portalRest + '/contents/comment/add';  
    html += "<form name='formComment' action='"+url+"' method='POST'>";
    html += "<input type='hidden' name='jcrPath' value='"+getget("content-id")+"' />";
    html += "<textarea cols='50' rows='5' name='comment' onclick='javascript:eXoCommentItGadget.clearCommentWindow();'  onblur='javascript:eXoCommentItGadget.initCommentWindow();'>Type your comment here</textarea>";
    html += "<input type='button' value='Send' onclick='javascript:eXoCommentItGadget.addComment();' />";
    html += "</form>";
  }
  

  // Set the background color according to the mycolor userpref
  var element = document.getElementById('commentit_gadget_div');  

  element.innerHTML = html;
  
  // Tells gadget to resize itself
  gadgets.window.adjustHeight();
  
} ;

eXoCommentItGadget =  new eXoCommentItGadget();
gadgets.util.registerOnLoadHandler(eXoCommentItGadget.onLoadHander);


