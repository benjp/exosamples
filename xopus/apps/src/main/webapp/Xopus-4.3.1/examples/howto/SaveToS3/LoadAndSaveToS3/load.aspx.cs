using System;
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

public partial class examples_HowTo_SaveToS3_load : System.Web.UI.Page
{
    private String accessKey = ConfigurationSettings.AppSettings["S3AccessKey"];
    private String secretKey = ConfigurationSettings.AppSettings["S3SecretKey"];
    
    // Fill in your own variables to connect to S3
    private String bucket = "[your bucket name]";
    private String documentKey = "the name of your the xml to save (for example: document.xml)";


    protected void Page_Load(object sender, EventArgs e)
    {
      AWSAuthConnection conn = new AWSAuthConnection(accessKey, secretKey);

      GetResponse resp = conn.get(bucket, documentKey, null);
      string value = resp.Object.Data;
      SortedList metadata = resp.Object.Metadata;


      Response.ContentType = metadata["content-type"].ToString();

      Response.Write(value);
      
    }
}
