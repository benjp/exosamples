using System;
using System.Web;
using System.Xml;
using System.IO;

public partial class LoadXml : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
      //find the path to the file
      String filePath = Server.MapPath("../xml/" + Request.QueryString["fileId"].ToString());

      Response.ContentType = "text/xml";

      try
      {
        //try to delete
        File.Delete(filePath);
        //send confirmation
        Response.Write("<message>Ok</message>");        
      }
      catch(Exception err)
      {
        //send error
        Response.Write("<message>Error: " + err.Message + "</message>");        
      }
    }
}
