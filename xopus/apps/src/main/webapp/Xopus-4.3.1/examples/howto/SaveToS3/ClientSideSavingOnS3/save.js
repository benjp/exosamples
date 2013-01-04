/**
 *
 * This is a demo how you can edit your xml documents on S3 and directly save it back to S3
 * without calling any server side script.
 *
 * The pre condition for this demo to work is that you have allowed the public to write this
 * xml document. These conditions ae edited with the ACL header while uploading your files
 * to S3. You can look at copy.aspx for reference how to set this header.
 *
 **/

function mySaveFunction(uri, xmlDocument)
{
  var hdrs = {};

  hdrs['Content-Type'] = "application/xml";
  hdrs['x-amz-acl'] = "public-read-write";

  var req = getXMLHttpRequest();
  req.open('put', uri, true);
  for (var k in hdrs)   
    req.setRequestHeader(k, hdrs[k]);

  req.send(xmlDocument.xml);

  alert("Document saved!");    
}

// Register the save function.
IO.setSaveXMLFunction(mySaveFunction);

if (!window['getXMLHttpRequest']) 
{
  function getXMLHttpRequest() 
  {
    var self = arguments.callee;
    if (!self.XMLHttpRequest) 
    {
      var tryThese = [
        function () { return new XMLHttpRequest(); },
        function () { return new ActiveXObject('Msxml2.XMLHTTP'); },
        function () { return new ActiveXObject('Microsoft.XMLHTTP'); },
        function () { return new ActiveXObject('Msxml2.XMLHTTP.4.0'); },
        function () { return null; }
      ];
      for (var i = 0; i < tryThese.length; i++) 
      {
        var func = tryThese[i];
        try 
        {
            self.XMLHttpRequest = func;
            return func();
        } catch (e) 
        {
            
        }
      }
    }
    return self.XMLHttpRequest();
  }
}