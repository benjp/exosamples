using System;
using System.IO;
using System.Web;
using System.Xml;

public partial class SaveXml : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // Retrieve the file id from the request. This code would typically
        // have some error handling to cope with invalid input.
        string fileId = Request["fileId"];
        string filePath = Server.MapPath("../xml/" + fileId );

        // The XML was passed as raw POST data so we need to parse the 
        // InputStream. The main advantage is that this handles non-ASCII
        // characters correctly.
        XmlDocument documentToSave = new XmlDocument();
        StreamReader r = new StreamReader(Request.InputStream);
        string xmlStr = r.ReadToEnd();
        documentToSave.LoadXml(xmlStr);

        // Do some error handling here as having insufficient privileges is 
        // quite common.
        try
        {
            // Do the actual writing to disk.
            documentToSave.Save(filePath);
            // This is sent to save.js and ends up in the result variable.
            Response.Write("Ok");        
        }
        catch (UnauthorizedAccessException u)
        {
            // Apparently we have no write privileges for this file, so tell the user.
            Response.Write(u.Message + "\n" +
                "To fix this you can change the permissions of user IUSR_machinename in the xml directory.\n"+
                "Alternatively you can implement authorization to allow a user with the right permissions to login.");
        }
    }
}
