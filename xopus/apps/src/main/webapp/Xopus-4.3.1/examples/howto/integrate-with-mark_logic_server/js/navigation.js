
function newDocument(url)
{
  //test if the editor is loaded
  var editor = parent.document.getElementById('xopusFrame').contentWindow.Editor
  if(editor)  
  {
    //create and load the new document
    editor.setURL(url);
    //reload navigation
    document.location.reload();
  }
  return false;
}

function exitFromNavigation()
{
  //test if the editor is loaded
  var editor = parent.document.getElementById('xopusFrame').contentWindow.Editor
  if(editor)
  {
    //exit xopus
    editor.exit();    
  }
  return false;
}

function setView(name)
{
  var editor = parent.document.getElementById('xopusFrame').contentWindow.Editor
  if(editor)
  {
    //get the canvas 
    var canvas = editor.Canvas.getCanvasCollection()[0];
    //change the view 
    if(canvas)
      canvas.setActiveView(name);
  }
  return false;
}

function openDocument(url)
{
  //test if the editor is loaded
  var editor = parent.document.getElementById('xopusFrame').contentWindow.Editor
  if(editor)
  {
    //open another file
    editor.setURL(url);
  }
  return false;
}


