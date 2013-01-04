<%@ Page Language="C#" ContentType="text/html" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Xml" %>
<html>
<head>
  <title>Content Management Navigation</title>
  <link rel="stylesheet" type="text/css" href="../css/common.css"/>
  <style type="text/css">
    button, body {font-family:Verdana;}
    h1, h2, h3 {color:#007dad;font-family:Verdana;}
    button {cursor:pointer;cursor:hand;}
  </style>
  <script type="text/javascript" src="../js/navigation.js"></script>
</head>
<body class="navigation-body">
  <%
    String path = HttpContext.Current.Server.MapPath("..") +"/xml/";
    DirectoryInfo documentationInfo = new DirectoryInfo(path);
    FileInfo[] files = documentationInfo.GetFiles();
    
  %>
  <div class="navigation">
  <h2>Options</h2>
  <ul>
    <li><a href="new-document.aspx?id=<%=files.Length.ToString() %>" onclick="return newDocument(this.href);">New document</a></li>
    <li><a href="#" onclick="return exitFromNavigation();">Exit</a></li>
  </ul>  
  <ul>
    <li><a href="#" onclick="return setView('WYSIWYG View');">WYSIWYG View</a></li>
    <li><a href="#" onclick="return setView('Xml View');">XML View</a></li>
  </ul>  
  </div>
  <div class="navigation">
  <h2>Documents</h2>
  <ul>
  <% 
  
  foreach (FileInfo file in files)
  {
    XmlDocument doc = new XmlDocument();
    doc.Load(Server.MapPath("..")+"/xml/" + file.Name);
    String title = "<span style='color:gray;'>(New Document)</span>";
    if (doc.SelectSingleNode("//title[1]").InnerText != "")
      title = doc.SelectSingleNode("//title[1]").InnerText;
    
    if (file.Name == "08_advanced.xml")
      Response.Write("<li><a href=\"xopus-island.aspx?fileId=" + file.Name + "&changetracking=true\" onclick=\"return openDocument(this.href);\">" + title + "</a></li>");

    else
      Response.Write("<li><a href=\"xopus-island.aspx?fileId=" + file.Name + "\" onclick=\"return openDocument(this.href);\">" + title + "</a></li>");
  }
  
  %>
  </ul>
</div>
</body>
</html>