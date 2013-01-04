<%

/*****
 *
 * REQUIREMENTS AND CONFIGURATIONS:
 *
 * 1) .NET 1.1
 * 2) IIS 5
 * 3) Windows XP
 *
 *
 * NOTES:
 * 
 * - In this example we use a binary read from the request.
 *   Somehow there's always an extra char in front of the
 *   incoming string. This was tested with lots of different
 *   kind of data. Xml, String, etc etc. So we just strip of
 *   the first character and we want to ensure that the xml
 *   is still valid. So we put it into an xmlDom first before saving
 *
 *****/

Dim byteCount
Dim incomingBinairy
Dim saveLocation

saveLocation = Server.MapPath("document.xml")

byteCount = Request.TotalBytes
incomingBinairy = Request.BinaryRead(byteCount)
incomingBinairy = Mid(cstr(incomingBinairy),2,Len(incomingBinairy)) 

Set objXML = Server.CreateObject("Microsoft.XMLDOM")

objXML.async = False

objXML.LoadXml(incomingBinairy)

objXML.Save saveLocation

response.write("your document has been saved!")

%>