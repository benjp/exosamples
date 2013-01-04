xquery version "1.0-ml";

(:~
 : @return A sequence of HTML LI elements with links to the documents.
 :)
declare function local:list_navigation() as element()*
{
  for $doc in fn:collection("xopus-demo")
  let $title := $doc/article/title
  order by fn:document-uri($doc)
  return
    <li xmlns="http://www.w3.org/1999/xhtml">
      <a href="xopus-island.xqy?fileId={fn:document-uri($doc)}"
         onclick="return openDocument(this.href);">
      {
        $title/text() 
      }
      </a>
    </li>
};


<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Content Management Navigation</title>
  <link rel="stylesheet" type="text/css" href="../css/common.css"/>
  <style type="text/css">
    button, body {{font-family:Verdana, sans-serif;}}
    h1, h2, h3 {{color:#007dad;font-family:Verdana, sans-serif;}}
    button {{cursor:pointer;cursor:hand;}}
  </style>
  <script type="text/javascript" src="../js/navigation.js"></script>
</head>
<body class="navigation-body">

  <div class="navigation">
  <h2>Options</h2>
  <ul>
    <li><a href="new-document.xqy" onclick="return newDocument(this.href);">New document</a></li>
  </ul>
  <ul>
    <li><a href="#" onclick="return setView('WYSIWYG View');">WYSIWYG View</a></li>
    <li><a href="#" onclick="return setView('Xml View');">XML View</a></li>
  </ul>
  </div>
  <div class="navigation">
  <h2>Documents</h2>
  <ul>
    {
      local:list_navigation()
    }
  </ul>
</div>
</body>
</html>
