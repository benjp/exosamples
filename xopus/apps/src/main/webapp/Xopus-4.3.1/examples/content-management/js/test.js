
var xmlhttp;
function testDotNet()
{
  if (window.XMLHttpRequest) //Mozilla, etc.
    xmlhttp=new XMLHttpRequest();
  else if (window.ActiveXObject) //IE5, 6
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

  xmlhttp.open("get","actions/test.aspx",false)
  xmlhttp.send(null); 
  var response = xmlhttp.responseText;
  if(response != "Ok")
    document.getElementById("nodotnet").style.display = "block";    
}

function testXopus()
{
  //test if the file is already running inside Xopus, then exit Xopus
  if(parent.Editor)
  {
    var p = parent.document.location.hash;
    parent.document.location = p;
  }
}