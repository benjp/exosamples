using System;
using System.Web;
using System.Xml;

public partial class LoadXml : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        XmlDocument newDoc = new XmlDocument();
        newDoc.LoadXml("<article xml:lang=\"en-us\"><title></title><paragraph></paragraph></article>");
        
        //figure out a number for the file
        Int32 lastId = Int32.Parse(Request.QueryString["id"].ToString());
        lastId = lastId+1;

        String name = "_document.xml";
        if(lastId < 10)
          name = "0" + lastId.ToString() + name;
        else
          name = lastId.ToString() + name;
        
        //save the xml document
        newDoc.Save(Server.MapPath("")+"/../xml/"+name);
        
        //redirect to the island to start editing the file
        Response.Redirect("xopus-island.aspx?fileId="+name);
    }
}
