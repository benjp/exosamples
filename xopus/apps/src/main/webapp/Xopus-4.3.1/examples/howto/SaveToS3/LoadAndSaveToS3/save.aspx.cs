using System;
using System.Xml;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using com.amazon.s3;

public partial class examples_HowTo_SaveToS3_save : System.Web.UI.Page
{
    /***
     * HOW TO : save incoming post to S3 from your own server
     * 
     * For this to work you need the following
     * 1) .NET 2.0
     * 2) imported webreference com.amazon.s3 (http://s3.amazonaws.com/doc/2006-03-01/AmazonS3.wsdl)
     * 3) Your own S3 account access and secret key
     * 
     * NOTE
     * 1) It's important that you are sure that your key doesn't contain any "\" in it.
     *    or your key and file will be currupted on S3. It seems to be a bug at S3
     * 
     * */

    private String accessKey = ConfigurationSettings.AppSettings["S3AccessKey"];
    private String secretKey = ConfigurationSettings.AppSettings["S3SecretKey"];

    // Fill in your own variables to connect to S3
    private String bucket = "[your bucket name]";
    private String documentKey = "the name of your the xml to save (for example: document.xml)";

    protected void Page_Load(object sender, EventArgs e)
    {
      AWSAuthConnection conn = new AWSAuthConnection(accessKey, secretKey);

      XmlTextReader r = new XmlTextReader(Request.InputStream);
      r.MoveToContent();
      string xml = r.ReadOuterXml();

      XmlDocument documentToSave = new XmlDocument();
      documentToSave.LoadXml(xml);
      
      SortedList metadata = new SortedList();
      metadata.Add("title", bucket);
      metadata.Add("Content-Type", "application/xml");
      S3Object titledObject =
           new S3Object(documentToSave.OuterXml, metadata);

      SortedList headers = new SortedList();
      headers.Add("Content-Type", "application/xml");
      headers.Add("x-amz-acl", "public-read");

      conn.put(bucket, documentKey, titledObject, headers);
      
      Response.Write("saved: " + documentToSave.OuterXml);
    }
}
