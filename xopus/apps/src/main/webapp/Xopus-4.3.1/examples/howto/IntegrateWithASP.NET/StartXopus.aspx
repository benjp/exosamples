<%@ Page Language="C#" ValidateRequest="false" %>
<html>
  <head>
    <title>Xopus ASP.NET Example</title>
    <link rel="stylesheet" type="text/css" href="../../simple/css/wysiwyg.css"/>

    <!-- Start Xopus (only needed when Xopus is not started directly) -->
    <script type="text/javascript" src="../../../xopus/xopus.js"></script>
  </head>
  <body>
    <p>Static html content which is not editable by Xopus.</p>
    
    <!-- The Xopus Canvas -->
    <div xopus="true" autostart="true">
      <xml>
        <x:config version="1.0" xmlns:x="http://www.xopus.com/xmlns/config">
          <!-- Register the save.js script. -->
          <x:javascript src="js/save.js"/>

          <!-- Here we pass the fileId parameter to LoadXml.aspx. -->
          <x:pipeline xml="LoadXml.aspx?fileId=<%= Request["fileId"] %>" xsd="xsd/schema.xsd">
            <x:view name="WYSIWYG View">
              <x:transform xsl="xsl/stylesheet.xsl"/>
            </x:view>
          </x:pipeline>
        </x:config>
      </xml>
    </div>
  </body>
</html>
