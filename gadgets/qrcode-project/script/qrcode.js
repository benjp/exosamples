function eXoQRCodeGadget(){      
} ;


eXoQRCodeGadget.prototype.onLoadHander = function() {
  eXoQRCodeGadget.render();
} ;

eXoQRCodeGadget.prototype.render = function() {  
  var uri = parent.document.location;
  var prefs = new gadgets.Prefs();
  var size = prefs.getString("size");
  if (size=='') size='128';

  $('#qrcode_gadget_div').qrcode({width: ""+size,height: ""+size,text: ""+uri});
  $('canvas').css({'margin-left': 'auto', 'margin-right': 'auto', 'display': 'block'});
    
  // Tells gadget to resize itself
  gadgets.window.adjustHeight();
  
} ;



eXoQRCodeGadget =  new eXoQRCodeGadget();
gadgets.util.registerOnLoadHandler(eXoQRCodeGadget.onLoadHander);
