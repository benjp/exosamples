function eXoQRCodeGadget(){      
} ;


eXoQRCodeGadget.prototype.onLoadHander = function() {
  eXoQRCodeGadget.render();
} ;

eXoQRCodeGadget.prototype.render = function() {  
  // Set the background color according to the mycolor userpref
  var element = document.getElementById('qrcode_gadget_div');  
  
  html = "BEN";
  
  // window.parent.document.title
  // window.parent.document.location.href

  element.innerHTML = html;
  
  // Tells gadget to resize itself
  gadgets.window.adjustHeight();
  
} ;



eXoQRCodeGadget =  new eXoQRCodeGadget();
gadgets.util.registerOnLoadHandler(eXoQRCodeGadget.onLoadHander);
