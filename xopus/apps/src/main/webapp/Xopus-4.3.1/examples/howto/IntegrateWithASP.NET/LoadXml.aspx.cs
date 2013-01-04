using System;
using System.Web;
using System.Xml;

public partial class LoadXml : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // Make sure the response is parser correctly by the browser. 
        // This can be tested by directly invoking this script from a browser:
        //
        //     LoadXml.aspx?fileId=1
        //
        // IE and Firefox will display the XML as a tree. 
        //
        // NOTE: IE will cache the content type, so after a .NET error this 
        // may not work until you restart IE.
        Response.ContentType = "text/xml";

        // Prevent the browser from caching the output of this script.
        // This is needed as the XML may have been changed since last request.
        Response.Expires = 0;

        // Retrieve the file id from the request. This code would typically
        // have some error handling to cope with invalid input.
        string fileId = Request["fileId"];

        // Load and send the XML. .NET will handle Unicode transcoding for us.
        // This code would typically interact with some sort of database.
        XmlDocument documentToLoad = new XmlDocument();
        documentToLoad.Load(Server.MapPath("xml/document" + fileId + ".xml"));
        Response.Write(documentToLoad.OuterXml);
    }
}
