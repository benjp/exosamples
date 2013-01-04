<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Xopus document island</title>
    <link rel="stylesheet" type="text/css" href="../css/common.css"/>

    <!-- Start Xopus (only needed when Xopus is not started directly) -->
    <script type="text/javascript" src="../../../xopus/xopus.js"></script>
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
          <x:pipeline xsd="../xsd/document.xsd">
{
  attribute xml { concat("load-xml.xqy?fileId=", xdmp:get-request-field("fileId")) }
}
            <x:view name="WYSIWYG View">
              <x:transform xsl="../xsl/stylesheet.xsl" />
            </x:view>
            <x:view name="Xml View">
              <x:treeTransform />
            </x:view>
          </x:pipeline>
          <!-- import a configuration file -->
          <x:import src="../config/config.xml"/>

          <x:changeTracking>
            <x:enabled>true</x:enabled>
          </x:changeTracking>
          <x:javascript>
          Editor.ChangeTracking.setUserName('{ xdmp:get-current-user() }');
          </x:javascript>
          
        </x:config>
      </xml>
    </div>
  </body>
</html>
