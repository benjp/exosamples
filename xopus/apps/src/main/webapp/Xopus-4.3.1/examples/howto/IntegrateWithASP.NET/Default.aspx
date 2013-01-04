<%@ Page Language="C#" ValidateRequest="false" %>
<html>
  <head>
    <title>Xopus ASP.NET Example</title>
    <link rel="stylesheet" type="text/css" href="../../simple/css/common.css"/>
  </head>
  <body>
    <h1>Xopus ASP.NET Example</h1>
    <p>This example is an overview of an Xopus integration using ASP.NET. It shows:</p>
    <ol>
      <li>how to start Xopus in <code>StartXopus.aspx</code> with the XML document picked in <code>Default.aspx</code>,</li>
      <li>how to pass parameters from <code>Default.aspx</code> to <code>LoadXml.aspx</code> to an load XML document,</li>
      <li>how to pass those parameters back through <code>save.js</code> to <code>SaveXml.aspx</code>.</li>
    </ol>
    <h2>Starting Xopus using a <code>xopus.js</code> in <code>StartXopus.aspx</code></h2>
    <p>This method is most straightforward.</p>
    <ol>
      <li>In <code>StartXopus.aspx</code> <code>xopus.js</code> will start Xopus.</li>
      <li>Xopus will then reload <code>StartXopus.aspx</code> in its internal iframe and </li>
      <li>activate the Xopus Canvasses in <code>StartXopus.aspx</code>.</li>
    </ol>
    <ul>
      <li><a href="StartXopus.aspx?fileId=1">Start Xopus to edit <code>document1.xml</code></a></li>
      <li><a href="StartXopus.aspx?fileId=2">Start Xopus to edit <code>document2.xml</code></a></li>
      <li><a href="StartXopus.aspx?fileId=3">Start Xopus to edit <code>document3.xml</code></a></li>
    </ul>
    <h2>Starting Xopus directly</h2>
    <p>This is faster as is prevents reloading <code>StartXopus.aspx</code> after Xopus is started.</p>
    <ol>
      <li><code>xopus.html</code> will be loaded first,</li>
      <li>it will load the url after the # in its internal iframe and </li>
      <li>activate the Xopus Canvasses in <code>StartXopus.aspx</code>.</li>
    </ol>
    <p><code>xopus.js</code> in <code>StartXopus.aspx</code> will automatically detect that Xopus has already been loaded.</p>
    <p><em>Note that the path after the # needs to be absolute or relative to <code>xopus.html</code>.</em></p>
    <% 
        // Calculate the absolute path to StartXopus.aspx so it can be called from xopus.html.
        string startPath = ResolveUrl("StartXopus.aspx"); 
    %>
    <ul>
      <li><a href="../../../xopus/xopus.html#<%= startPath %>?fileId=1">Start Xopus to edit document1.xml</a></li>
      <li><a href="../../../xopus/xopus.html#<%= startPath %>?fileId=2">Start Xopus to edit document2.xml</a></li>
      <li><a href="../../../xopus/xopus.html#<%= startPath %>?fileId=3">Start Xopus to edit document3.xml</a></li>
    </ul>
  </body>
</html>