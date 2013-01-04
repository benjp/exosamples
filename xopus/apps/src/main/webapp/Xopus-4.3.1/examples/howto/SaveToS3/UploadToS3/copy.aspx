<%@ Page Language="C#" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Configuration" %>
<%@ Import Namespace="System.Collections" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.Web.Security" %>
<%@ Import Namespace="System.Web.UI" %>
<%@ Import Namespace="System.Web.UI.WebControls" %>
<%@ Import Namespace="System.Web.UI.WebControls.WebParts" %>
<%@ Import Namespace="System.Web.UI.HtmlControls" %>
<%@ Import Namespace="com.amazon.s3" %>

<script runat="server">   
  
  /***
   * HOW TO : Copy your own xopus copy to S3 for developing
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
  public AWSAuthConnection S3Connection = null;


  // Edit the following variables to upload the files to S3
  private String rootDIR = "[The absolute path to the folder you want to upload]";  
  private String newBucket = "[your bucket name]";
  
  protected void Page_Load(object sender, EventArgs e)
  {
    S3Connection = new AWSAuthConnection(accessKey, secretKey);
    // Let's create a bucket first
    S3Connection.createBucket(newBucket, null);
    
    findDir(rootDIR);    
    
  }

  private void uploadFileToS3(FileInfo file)
  {
    byte[] data = null;
    
    string newKey = file.FullName.Replace(rootDIR,"").Replace("\\","/");
    string contentType = getContentType(file.Extension);    

    long numBytes = file.Length;
    FileStream fs = new FileStream(file.FullName, FileMode.Open, FileAccess.Read);
    BinaryReader br = new BinaryReader(fs);
    data = br.ReadBytes((int)numBytes);
    br.Close();
    fs.Close();


    // uncomment this to check if the script is scanning the right things
    //Response.Write(newKey + " - " + contentType + " - " + numBytes.ToString() + "<br/>");
    
    
    SortedList metadata = new SortedList();
    metadata.Add("title", file.Name);
    metadata.Add("Content-Type", contentType);
    S3Object titledObject = new S3Object(data, metadata);

    SortedList headers = new SortedList();
    headers.Add("Content-Type", contentType);
    headers.Add("x-amz-acl", "public-read");

    S3Connection.put(newBucket, newKey, titledObject, headers);
     
  }

  private string getContentType(string extension)
  {
    switch (extension)
    {
      case ".xml":
        return "application/xml";
        break;
      case ".htm":
      case ".html":
        return "text/html";
        break;
      case ".xsl":
      case ".xslt":
        return "text/xsl";
        break;
      case ".js":
        return "application/javascript";
        break;
      case ".png":
        return "image/png";
        break;
      case ".jpg":
        return "image/jpeg";
        break;
      case ".gif":
        return "image/gif";
        break;        
      case ".css":
        return "text/css";
        break;
      default:
        return "text/plain";
        break; 
    }
  }
   
  private void findDir(string startingDir)
  {
    DirectoryInfo dir = new DirectoryInfo(startingDir);
    FileInfo[] files = dir.GetFiles();
    foreach(FileInfo file in files)
    {      
      // upload this file to S3
      uploadFileToS3(file);
    }

    DirectoryInfo[] dirs = dir.GetDirectories();
    foreach (DirectoryInfo rdir in dirs)
    {
      // recursive directory searching
      findDir(rdir.FullName);
    } 
  }
  
</script>
