function testUtils() {
  alert("TEST OK");
}

function redirectTo(targetUrl) {
  window.parent.location.href = targetUrl;
}

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

function setMainTitle(title, total) {
  var winName = window.name;
  var ifr = window.parent.document.getElementById(window.name);
  var uiGadget = ifr.parentNode.parentNode.parentNode.parentNode;
  var uiGadgetChildren = uiGadget.childNodes;
  var gadgetControl;
  for (var i = 0 ; i < uiGadgetChildren.length; i++) {
    if ("GadgetControl ClearFix" == uiGadgetChildren[i].className ) {
      gadgetControl = uiGadgetChildren[i];
      
    }
  }
  if (total==0) total="";
  var controls = gadgetControl.childNodes;
  var uiGadgetTitle;
  for (var i = 0 ; i < controls.length; i++) {
    if ("GadgetTitle" == controls[i].className ) {
      uiGadgetTitle = controls[i];
      uiGadgetTitle.innerHTML = "<span id='gadgetAuthorItTitle_"+winName+"'>" + title + "</span><span id='gadgetAuthorItTotal_"+winName+"'>"+total+"</span>";
      uiGadgetTitle.style.marginRight = "10px !important";
    }
  }
  var divTitle = window.parent.document.getElementById('gadgetAuthorItTitle_'+winName);
  divTitle.style.fontSize = '12px';
  var divTotal = window.parent.document.getElementById('gadgetAuthorItTotal_'+winName);
  divTotal.style.float = 'right';
  
  divTotal.style.color = '#fff';  
  divTotal.style.minWidth = '25px';
  divTotal.style.textAlign = 'center';
  divTotal.style.fontWeight = 'bold';
  divTotal.style.webkitBorderRadius = '10px';
  divTotal.style.fontSize = '12px';
  divTotal.style.lineHeight = '18px';
  divTotal.style.marginTop = '6px';
  
  //alert(navigator.userAgent);
  
  if (usingFirefox()) {
    divTitle.style.paddingRight = '20px';
    divTotal.style.padding = '1px 8px';
    divTotal.style.borderRadius = '10px';
  }
  
  if (total>0) {
    divTotal.style.backgroundColor = '#00cc00';
    if (total>1 && total<=3) {
      divTotal.style.backgroundColor = '#FFCF01';
    } else if (total>3) {
      divTotal.style.backgroundColor = '#ee0000';
    }
  }
  
  
}

function usingFirefox() {
  return (navigator.userAgent.indexOf('Firefox')!=-1);
}
