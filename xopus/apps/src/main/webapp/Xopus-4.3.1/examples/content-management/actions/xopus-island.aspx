<%@ Page Language="C#" ValidateRequest="false" %>
<%
  String changeTracking = "false";
  if (Request["changetracking"] != null)
    changeTracking = Request["changetracking"];
%>
<html>
  <head>
    <title>Xopus ASP.NET Example</title>
    <link rel="stylesheet" type="text/css" href="../css/common.css"/>

    <!-- Start Xopus (only needed when Xopus is not started directly) -->
    <script type="text/javascript" src="../../xopus/xopus.js"></script>
  </head>
  <body>
    <!-- The Xopus Canvas -->
    <div xopus="true" autostart="true">
      <xml>
        <x:config version="1.0" xmlns:x="http://www.xopus.com/xmlns/config">
          <!-- Register the save.js script. -->
          <x:javascript src="../js/save.js"/>
          
          <!-- Register the editing.js script. -->
          <x:javascript src="../js/editing.js"/>

          <!-- Here we pass the fileId parameter to LoadXml.aspx. -->
          <x:pipeline xml="load-xml.aspx?fileId=<%= Request["fileId"] %>" xsd="../xsd/document.xsd">
            <x:view name="WYSIWYG View">
              <x:transform xsl="../xsl/stylesheet.xsl" />
            </x:view>
            <x:view name="Xml View">
              <x:treeTransform />
            </x:view>
          </x:pipeline>
          <% if (changeTracking == "true"){ %>
          <x:javascript>Editor.ChangeTracking.setUserName("John Doe");</x:javascript>
          <%} %>          
          <!-- import a configuration file -->
          <x:import src="../config/config.xml"/>
          <!-- import a toolbar configuration file -->
          <x:import src="../config/toolbar.xml"/>
          <!-- Register the toolbar commands.js script. -->
          <x:javascript src="../config/commands.js"/>
          
          <x:changeTracking>
            <x:enabled><%=changeTracking %></x:enabled>
          </x:changeTracking>
          
        </x:config>
      </xml>
    </div>
  </body>
</html>
