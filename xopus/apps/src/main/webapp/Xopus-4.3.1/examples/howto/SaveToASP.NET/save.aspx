<%@ Page Language="C#" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Xml" %>
<%
    /*****
     *
     * REQUIREMENTS AND CONFIGURATIONS:
     *
     * 1) .NET 2.0
     * 2) IIS 5
     * 3) Windows XP
     *
     *
     * NOTES:
     * 
     * - If you upload the file instead of posting, than you can
     *   use documentToSave.Load() to load your new xmldocument
     *
     *****/
    
    
    XmlTextReader r = new XmlTextReader(Request.InputStream);
    r.MoveToContent();
    string xml = r.ReadOuterXml();
      
    XmlDocument documentToSave = new XmlDocument();
    documentToSave.LoadXml(xml);
    documentToSave.Save(Server.MapPath("document.xml"));
      
    Response.Write("Saved " + xml.Length + " characters!");
%>



