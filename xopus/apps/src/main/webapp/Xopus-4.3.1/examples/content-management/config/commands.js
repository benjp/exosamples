Editor.addCommand("deleteCommand", {
  execute: function(scope)
  {
    var selection = scope.get("xmlSelection");
    if(!Editor.getActiveDocument()) return false;
    var uri = Editor.getActiveDocument().getDocumentURI();
    var name = uri.substring((uri.indexOf("?fileId=")+8));
    HTTPTools.getXML("delete-document.aspx?fileId=" + name, null);
    top.frames["navigation"].deleteDocument();
    return true;
  },
  getEnabled: function(scope)
  {
    var selection = scope.get("xmlSelection");
    if(!Editor.getActiveDocument()) return false;
    var uri = Editor.getActiveDocument().getDocumentURI();
    var id = parseInt(uri.substring((uri.indexOf("?fileId=")+8)));
    return id > 9;
  },
  getChecked: function(scope)
  {
    return false;
  },
  getShortcuts: function()
  {
    return ["Control+Alt+D"];
  },
  getLabel:function()
  {
    return "Delete Document";
  }
});