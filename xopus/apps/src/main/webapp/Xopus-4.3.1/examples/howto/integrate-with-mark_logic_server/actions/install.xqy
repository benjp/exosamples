xquery version "1.0-ml";


(: delete an existing installation of the demo :)
xdmp:collection-delete("xopus-demo");


xdmp:document-insert('01_installing.xml', <article xml:lang="en-us">
  <title>Installing Xopus</title>
  <introduction>You can download Xopus from <anchor href="http://xopus.com/download.html">http://xopus.com</anchor><emphasis> (Use Ctrl+Click to open)</emphasis>. We recommend always working with the latest version, as we are constantly improving our product.</introduction>
  <paragraph> In the download you can find five folders. These folders should be placed in an folder on your webserver in such a way that you can access <code>xopus/xopus.html</code> from your server.</paragraph>
  <paragraph>Alternatively, by including <code>xopus.js</code> in a file, Xopus will be loaded around that file when opened in a browser.</paragraph>
  <section>
    <title>Config</title>
    <paragraph>The config folder contains configuration files, and javascript files that are loaded by default. This folder currently does not exist with Xopus 4.</paragraph>
  </section>
  <section>
    <title>Examples</title>
    <paragraph>In the examples folder you can find several examples that show you different features of Xopus.</paragraph>
  </section>
  <section>
    <title>License</title>
    <paragraph>This folder contains the license keys for Xopus. By default the localhost and 127.0.0.1 files are present.</paragraph>
  </section>
  <section>
    <title>Resources</title>
    <paragraph>This folder is used to the dictionary files. It is not always present in the download, but the dictionaries can be downloaded seperately from <anchor href="http://xopus.com/files/dictionaries/dictionaries.zip">http://xopus.com</anchor>.</paragraph>
  </section>
  <section>
    <title>Xopus</title>
    <paragraph align="left">This folder contains <code>xopus.html</code> and <code>xopus.js</code>, and several other files which form the core of Xopus.</paragraph>
  </section>
</article>, (), <collections><collection>xopus-demo</collection></collections>);


xdmp:document-insert('02_placement.xml', <article xml:lang="en-us">
  <title>Xopus in a CMS</title>
  <introduction>​When placing Xopus in a CMS, there are numerous ways to do this. The following options are common:</introduction>
  <section>
    <title>Xopus in an iframe</title>
    <paragraph>When using Xopus in an iframe, such as here, it is easy to load new documents. </paragraph>
    <paragraph>Xopus detects that it is running in an iframe and therefore shows the maximize icon in the top right corner of the toolbar.</paragraph>
  </section>
  <section>
    <title>Xopus around everything</title>
    <paragraph>When you place Xopus around a complete system you can create make parts of the page editable using an 'island'. Any HTML placed outside the 'island' (discussed in the next document) is rendered as usual. </paragraph>
  </section>
  <section>
    <title>Xopus on a new page</title>
    <paragraph>By placing Xopus on a new page, it may be easy to open and close, but Xopus will need to restart all the time. Using an iframe and keeping Xopus open is a better solution.</paragraph>
  </section>
</article>, (), <collections><collection>xopus-demo</collection></collections>);


xdmp:document-insert('03_islands.xml', <article xml:lang="en-us">
  <title>Creating an Xopus Island</title>
  <introduction>​The Xopus island contains references to the XML, Schema and XSL files that are used for editing. It can also contains refences to configuration files, Javascript files for API calls, and CSS for styling of the editable page.</introduction>
  <paragraph align="left">An island looks like this: </paragraph>
  <example xml:space="preserve">&lt;div xopus="true" autostart="false"&gt;
  &lt;x:config version="1.0" xmlns:x="http://www.xopus.com/xmlns/config"&gt;
    &lt;xml&gt;
      &lt;x:pipeline xml="document.xml" xsd="schema.xsd"&gt;
        &lt;x:view name="WYSIWYG View"&gt;
          &lt;x:transform xsl="stylesheet.xsl"/&gt;
        &lt;/x:view&gt; 
      &lt;/x:pipeline&gt;
    &lt;/xml&gt;
  &lt;/x:config&gt;
&lt;/div&gt;</example>
  <paragraph>It can be recognized by the <code>xopus="true"</code> attribute. A pipeline is used to reference the XML file, Schema file, and points to XSL files on views. Multiple views can be configured.</paragraph>
  <section>
    <title>XML</title>
    <paragraph>By using a dynamic page to write the island, you can use the same island for different pages. All islands in this example are drawn by <code>xopus-island.aspx</code> which loads the proper XML file by using a querystring parameter.</paragraph>
  </section>
  <section>
    <title>Schema</title>
    <paragraph>Schema can be changed in the a similar way. This demo using a single schema, but loading a different XML file with a different schema makes no difference for Xopus. Schema's are cached by Xopus, and therefore using a dynamic island makes better use of available memory.</paragraph>
  </section>
  <section>
    <title>XSL and views</title>
    <paragraph>Each view requires a tranformation. Transformations need to reference XSL files. These XSL files are used to draw the XML file as HTML in the editor. The <code>output</code> of the XSL needs to be valid XHTML.</paragraph>
    <paragraph>A special transformation (which uses an XSL that is supplied with Xopus) is available through the following configuration:</paragraph>
    <example xml:space="preserve">&lt;x:view name="Xml View"&gt;
  &lt;x:treeTransform /&gt;
&lt;/x:view&gt;</example>
    <paragraph>This <code>treeTransform</code>, or other XSL's can also be used in conjuction with other XSL files by placing it following another transformation. This allows you to view the output of your XSL as an XML view, enabling you to pinpoint problems in the output.</paragraph>
  </section>
  <section>
    <title>Other options</title>
    <paragraph>Javascript to be used with the API can be placed in the <code>x:config</code> as follows:</paragraph>
    <example xml:space="preserve">&lt;x:javascript src="js/editing.js"/&gt;</example>
    <paragraph>The above example includes<code> js/editing.js</code> on the island. </paragraph>
    <paragraph>External configuration files, often used for roleMapping configurations can also be referenced:</paragraph>
    <example xml:space="preserve">&lt;x:import src="config/config.xml"/&gt;</example>
  </section>
</article>, (), <collections><collection>xopus-demo</collection></collections>);


xdmp:document-insert('04_communicating.xml', <article xml:lang="en-us">
  <title>Communicating With Xopus</title>
  <introduction> There are several objects available from the API, that can be used to communicate with Xopus. These objects are properties of the window that Xopus runs in.</introduction>
  <section>
    <title>Editor</title>
    <paragraph>This is the main object representing Xopus itself. In the <anchor href="https://xopus.com/documentation/developer-guide/reference/xopus-api/objects/editor.html">documentation</anchor> you can find what properties and methods are available. The <code>Editor</code> object offers some methods for configuring certain UI elements, and fires the <code>load</code> event for example.</paragraph>
  </section>
  <section>
    <title>Canvas and Editor.Canvas</title>
    <paragraph>An Xopus <code>Canvas</code> is a representation of an island. Because there can be multiple islands running in Xopus the <code>Editor.Canvas</code> object offers methods to find the correct island.</paragraph>
    <example xml:space="preserve">var canvas = Editor.Canvas.​getCanvasCollection()[0];</example>
    <paragraph>The above example returns the <emphasis>first</emphasis><code> Canvas</code>.</paragraph>
    <paragraph>
      <code>Canvas</code> objects offer methods to change views, as they are defined on the island, to set and get parameters from XSL's and another way to load a new XML document. This XML document will then use the Schema that is defined on the island.</paragraph>
  </section>
  <section>
    <title>IO</title>
    <paragraph>The <code>IO</code> object is a simple object which is mainly used to implement a save function. It can however also be used to change the way that Xopus loads XML, XSL and Schema.</paragraph>
  </section>
  <section>
    <title>HTTPTools</title>
    <paragraph>When you need to load or save files to and from the server, the <code>HTTPTools</code> object offers <code>GET</code>, <code>PUT</code> and POST<code /> functionality. It is mostly used within a save function to <code>POST</code> the saved XML to the server. This is shown in other documents in this example.</paragraph>
  </section>
  <section>
    <title>Editor.Selection</title>
    <paragraph>The <code>Editor.Selection</code> object offers functionality to find the cursor and selection. This implements a similar interface to <code>DOM Ranges</code> to manipulate text and selection.</paragraph>
  </section>
  <section>
    <title>Xopus DOM Objects</title>
    <paragraph>The XML document, it's elements, attributes and comments, are all represented by Xopus Object in the API. Take a look at the <anchor href="http://xopus.com/documentation/developer-guide/reference/xopus-api/objects.html">documentation about objects</anchor> for more information.</paragraph>
  </section>
</article>, (), <collections><collection>xopus-demo</collection></collections>);


xdmp:document-insert('05_loading.xml', <article xml:lang="en-us">
  <title>Loading New XML Files</title>
  <introduction>Loading a new XML file into Xopus can be accomplished using the Editor.setURL function.</introduction>
  <paragraph align="left">​The menu on the right uses a very simple line of code to load new XML documents into Xopus, here.</paragraph>
  <example xml:space="preserve">top.document.getElementById('xopusFrame').contentWindow.Editor.setURL(this.href);</example>
  <paragraph align="left">First the frame where Xopus is running is found, to find the <code>Editor</code> object. Then a url is passed to it, using <code>setURL</code>. The urls of the links in the menu look like this:</paragraph>
  <example xml:space="preserve">​xopus-island.aspx?fileId=05_loading.xml</example>
  <paragraph align="left">As you can see, the island is reloaded with a new parameter.</paragraph>
</article>, (), <collections><collection>xopus-demo</collection></collections>);


xdmp:document-insert('06_saving.xml', <article xml:lang="en-us">
  <title>Saving</title>
  <introduction>​Saving XML from Xopus requires that you have a save function. Xopus does not save by itself. You can follow the following steps:</introduction>
  <section>
    <title>Registering a save function</title>
    <paragraph>By registering a save function with Xopus, the application will know what to do when saving.</paragraph>
    <example xml:space="preserve">IO.setSaveXMLFunction(mySaveFunction);</example>
    <paragraph>​You can find this function in <code>js/save.js</code> of this example.</paragraph>
  </section>
  <section>
    <title>The save function</title>
    <paragraph>The save function itself receives two arguments, uri and document. A simple example of a save function looks like this:</paragraph>
    <example xml:space="preserve">function mySaveFunction(uri, xmlDocument)
{{
  var result = HTTPTools.postXML("save-xml.aspx?" + uri, xmlDocument, "UTF-8");
  return (result.indexOf("error") == -1);
}}</example>
    <paragraph>The example above uses the <code>HTTPTools</code> object from the Xopus API to send the <code>xmlDocument</code> to the url in <code>postXML</code>.</paragraph>
    <paragraph>The third argument is used to convert the XML DOM object back to UTF-8. IE's XML DOM document get a default setting of UTF-16.</paragraph>
  </section>
  <section>
    <title>Server save code</title>
    <paragraph>On the server, depending on the server language you can catch the <code>xmlDocument</code> and write it back to the database. In the <code>code/save-xml.cs</code> file you can find the following code that saves the XML on the server:</paragraph>
    <example xml:space="preserve">StreamReader r = new StreamReader(Request.InputStream);
String xmlStr = r.ReadToEnd();
documentToSave.LoadXml(xmlStr);
documentToSave.Save(filePath);</example>
    <paragraph>Returning a string from the server code allows you to process the success of your save code in Xopus (in the client). A lot of examples of this can be found in the <code>How To</code> folder of the other examples in the download.</paragraph>
  </section>
  <section>
    <title>Permission problems and saving problems</title>
    <paragraph>The problem can occur that file permissions aren't set. This often happens when working with actual XML files, but with a database that you save to, similar things might happen. Sessions may expire, which then prevent saving. </paragraph>
    <paragraph align="left">To solve these problems, it is is best to check the result that comes back from teh <code>HTTPTools</code> function. You could let the server return a value that indicates an expired session, and consequently show a login dialog to allow the user to continue working, and prevent the loss of data.</paragraph>
  </section>
</article>, (), <collections><collection>xopus-demo</collection></collections>);


xdmp:document-insert('07_api.xml', <article xml:lang="en-us" modification_date="2009-06-26">
  <title>Using the API</title>
  <introduction>The Xopus API can be used to do almost anything. It requires some skills with Javascript, but it makes it possible to create extra functionality, or to assist user actions.</introduction>
  <paragraph>When adding an example in this document, an <anchor href="http://xopus.com/documentation/developer-guide/reference/xopus-api.html">API</anchor> function is called to set an extra attribute that helps in rendering the example.</paragraph>
  <paragraph>To add this functionality, a few things are needed. First we need a beginning. We need to listen to when Xopus has finished loading.</paragraph>
  <example xml:space="preserve">Editor.addEventListener("load",doLoad);</example>
  <paragraph>Now we need a <code>doLoad</code> function to deal with the event.</paragraph>
  <example xml:space="preserve">function doLoad(evt)
{{
  var doc = evt.document;
  doc.addEventListener("XopusAfterChildInserted", afterChildInserted);
}}</example>
  <paragraph>A new <code>eventListener</code> is then added to the document. This listens to childNodes being inserted.</paragraph>
  <example xml:space="preserve">function afterChildInserted(evt)
{{
  var node = evt.childNode;
  
  if(node.getNodeName() == "example") 
    node.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve");
}}</example>
  <paragraph>The <code>xml:space</code> attribute stops the above code example from collapsing whitespace.</paragraph>
  <paragraph>The <code>evt</code> argument contains openings to access data about the event. These events are <anchor href="http://xopus.com/documentation/developer-guide/reference/xopus-api/events.html">documented</anchor> on the Xopus website.</paragraph>
  <paragraph align="left">The API can be used to do many things:</paragraph>
  <ordered-list>
    <item>Create extra buttons in the XSL for adding, removing or moving elements</item>
    <item>Setting a value for required attributes after element creation in order to prevent property panels from opening</item>
    <item>Setting unique ID's</item>
    <item>Changing properties of the Editor environment</item>
  </ordered-list>
  <paragraph>It can also be used to open the property panel:</paragraph>
  <example xml:space="preserve" show-execute-button="true">node.openAttributesEditor();</example>
</article>, (), <collections><collection>xopus-demo</collection></collections>);


xdmp:document-insert('08_advanced.xml', <article xml:lang="en-us">
  <title>Advanced Configuration</title>
  <introduction>There are a few more advanced asdasdsconfiguration options available. </introduction>
  <section>
    <title>RoleMapping</title>
    <paragraph>The roleMapping is foremostly used to configure the buttons in the toolbar. The <strong>bold</strong> button doesn't know which element it represents until it is configured properly. The button is also connected to Ctrl+B, and therefore a proper configuration can make editing a lot smoother. </paragraph>
    <example xml:space="preserve">&lt;x:roleMapping&gt;
  &lt;x:element   name="paragraph"  role="paragraph" /&gt;
  &lt;x:attribute name="align"      role="align" /&gt;
  ...</example>
    <paragraph align="left">There are roles for a lot of functionality. These are all described in the <anchor href="https://xopus.com/documentation/developer-guide/reference/xopus-local-configuration/attributes/role.html">documentation</anchor>, but a few of them include:</paragraph>
    <ordered-list>
      <item>paragraph</item>
      <item>table</item>
      <item>list</item>
      <item>bold, emphasis, underline</item>
      <item>image</item>
    </ordered-list>
    <paragraph align="left">The paragraph role makes the paragraph act as a default element. This can be seen when inserting a new <code>&lt;section&gt;</code> in this document. The <code>&lt;section&gt;</code> will immediately contain a <code>&lt;title&gt;</code> and <code>&lt;paragraph&gt;</code> even though the Schema for a &lt;section&gt; is defined as a choice between four elements.</paragraph>
    <paragraph align="left">A number of table roles are defined in order for Xopus to provide extra functionality for adding rows and columns.</paragraph>
    <paragraph align="left">The list roles, inline element roles and image roles all connect an element to a button, allowing the editor to "turn the element on and off".</paragraph>
    <paragraph align="left">There are also roles for hiding elements and attributes from the interface, and for configuring certain attributes, such as the align attribute on this paragraph. Right click on the paragraph.</paragraph>
  </section>
  <section>
    <title>UI Language</title>
    <paragraph>The UI language is a setting that is saved in a cookie. Should you want to make sure that users all use the same interface language, you can use the <code>setUILanguage</code> function. This example uses this function in <code>js/editing.js</code>.</paragraph>
    <example xml:space="preserve">Editor.setUILanguage("en");</example>
  </section>
  <section>
    <title>Exit Xopus</title>
    <paragraph>As much as Xopus doesn't know what to do when the user presses the save function and you have to configure this in Xopus, you also have to configure the exit function. After configuring either an exit function or exit URL, Xopus will show an exit button in the top right corner, and a button under the Xopus menu.</paragraph>
    <example xml:space="preserve">Editor.setExitFunction(exitFunction);

function exitFunction()
{{
  if(confirm("Are you sure you want to quit?"))
    top.document.location.href = "start.html";
}}</example>
    <paragraph align="left">The <strong>exit</strong> option to the left of the editor in this example uses the Editor object to call the exit function:</paragraph>
    <example xml:space="preserve">top.document.getElementById('xopusFrame').contentWindow.Editor.exit();</example>
  </section>
  <section>
    <title>Spell Checker</title>
    <paragraph>The Xopus Spell Checker depends on the <code>xml:lang</code> attribute in the XML document. This attribute defines what language the document, or a node in the document, is in, and thus tells Xopus which dictionary to load and use. The dictionaries may not be in the download, but can be downloaded <?xm-deletion_mark author='John Doe' time='20090612T133244+0000' data='seperately'?><?xm-insertion_mark_start author='John Doe' time='20090612T133244+0000'?>separately<?xm-insertion_mark_end ?> from <anchor href="http://xopus.com/files/dictionaries/dictionaries.zip">http://xopus.com</anchor>. </paragraph>
    <paragraph align="left">This document uses an <code>xml:lang</code> attribute:</paragraph>
    <example xml:space="preserve">&lt;article xml:lang="en-us"&gt;
  &lt;title&gt;Using the API&lt;/title&gt;</example>
    <paragraph align="left">When you press the spell checking button, the US English dictionary will be loaded.</paragraph>
  </section>
  <section>
    <title>Change Tracking</title>
    <paragraph>Change tracking is only available in Xopus 4. There are two configuration options available. The first one can be found in <code><?xm-deletion_mark author='John Doe' time='20090612T132400+0000' data='config/config.xml'?><?xm-insertion_mark_start author='John Doe' time='20090612T132400+0000'?>xopus-island.aspx<?xm-insertion_mark_end ?></code> in this example:</paragraph>
    <example xml:space="preserve">&lt;x:changeTracking&gt;
  &lt;x:enabled&gt;false&lt;/x:enabled&gt;
&lt;/x:changeTracking&gt;</example>
    <paragraph align="left">Change tracking is disabled for this example<?xm-insertion_mark_start author='John Doe' time='20090612T132436+0000'?>, but not for this file<?xm-insertion_mark_end ?>. <?xm-deletion_mark author='John Doe' time='20090612T132727+0000' data='Should'?><?xm-insertion_mark_start author='John Doe' time='20090612T132727+0000'?>When<?xm-insertion_mark_end ?> it <?xm-deletion_mark author='John Doe' time='20090612T132735+0000' data='be'?><?xm-insertion_mark_start author='John Doe' time='20090612T132735+0000'?>is<?xm-insertion_mark_end ?> enabled, you can set the name of the user for Change Tracking:</paragraph>
    <example xml:space="preserve">&lt;x:javascript&gt;
  Editor.ChangeTracking.setUserName("John Doe");
&lt;/x:javascript&gt;</example>
    <paragraph align="left">This example above <?xm-deletion_mark author='John Doe' time='20090612T132426+0000' data='can be'?><?xm-insertion_mark_start author='John Doe' time='20090612T132426+0000'?>is<?xm-insertion_mark_end ?> added to the island to get user names into the change tracking.<?xm-insertion_mark_start author='John Doe' time='20090612T132644+0000'?> Press the "Show Changes" button in the toolbar to make the changes to this file visible.<?xm-insertion_mark_end ?></paragraph>
  </section>
</article>, (), <collections><collection>xopus-demo</collection></collections>);


xdmp:document-insert('09_xsl.xml', <article xml:lang="en-us">
  <title>XSL in Xopus</title>
  <introduction>Xopus supports a lot of XSL features. There a only a very few things to keep in mind when using an XSL for Xopus, but there is a boatload of tricks you can use to make the XSL work better in Xopus.</introduction>
  <section>
    <title>Template Output</title>
    <paragraph>Every element from the XML that you wish to edit, needs to be represented in the output of the XSL. That means that templates that <code>match</code> on an element should output at least something, even if the element itself is empty. The following XSL could cause problems:</paragraph>
    <example xml:space="preserve">&lt;xsl:template match="section"&gt;
  &lt;div&gt;
    &lt;h2&gt;
      &lt;xsl:value-of select="title"/&gt;
    &lt;/h2&gt;
    ...</example>
    <paragraph align="left">When the title is empty, the title will not be rendered in the output. It has nothing to represent it. Thus it might be difficult to get the cursor into the element to type a title. Using the following example solves that:</paragraph>
    <example xml:space="preserve">​&lt;xsl:template match="section"&gt;
  &lt;div&gt;
    &lt;xsl:apply-templace /&gt;
    ...

&lt;xsl:template match="section/title"&gt;
  &lt;h2&gt;
    &lt;xsl:apply-templates /&gt;
  &lt;/h2&gt;
&lt;/xsl:template&gt;</example>
    <paragraph align="left">When the title is empty, the <code>&lt;h2&gt;</code> will still represent the title element, this making it much easier to edit.</paragraph>
  </section>
  <section>
    <title>Writing XSL for Xopus</title>
    <introduction>XSL can be used to hide and show different parts of an XML document. You can think of meta-data and the actual content. It can be used to show more than just WYSUIWYG output, like buttons to add, remove or move elements or to provide more functionality to edit an element.</introduction>
    <section>
      <title>API calls from XSL</title>
      <paragraph>Using a special feature in XSL in Xopus you can make API calls for elements.</paragraph>
      <example xml:space="preserve">&lt;xsl:template match="date"&gt;
  &lt;p&gt;&lt;b onclick="editDate(node);"&gt;&lt;xsl:apply-templates/&gt;&lt;/b&gt;&lt;/p&gt;
&lt;/xsl:template&gt;</example>
      <paragraph align="left">In the above example <code>editDate</code> is a user defined function. This function gets passed an argument, <code>node</code>. This argument refers to the node of the template, which in this case is the <code>&lt;date&gt;</code> element.</paragraph>
      <paragraph align="left">The node object is an Xopus DOM <anchor href="http://xopus.com/documentation/developer-guide/reference/xopus-api/objects.html">Object</anchor>, such as an <anchor href="http://xopus.com/documentation/developer-guide/reference/xopus-api/objects/xopuselement.html">XopusElement</anchor>.</paragraph>
    </section>
    <section>
      <title>Hiding and Showing elements</title>
      <paragraph>When an XML file becomes large, the output of a simple stylesheet will equally become large, and this can Xopus to slow down. The Xopus Team has successfully used XSL to output the XML in a smarter way. </paragraph>
      <paragraph align="left">This document, for example has sections. Currently all the sections are layed out, but functionality could be added to hide all sections except one. First we define a parameter in the XSL:</paragraph>
      <example xml:space="preserve">&lt;xsl:param name="currentNode" select="//section[1]"/&gt;</example>
      <paragraph align="left">This selects the first section in the document. From then on we can compare other elements to the <code>currentNode</code> parameter using an XPath function.</paragraph>
      <example xml:space="preserve">&lt;xsl:if test="generate-id($currentNode) = generate-id(.)"&gt;
  ...
&lt;/xsl:if&gt;</example>
      <paragraph align="left">This can then be used in <code>if</code> and <code>choose</code> statements to define what to do when the currentNode matches the current template node. For more information about this, contact <anchor href="mailto:support@xopus.com">support@xopus.com</anchor>.</paragraph>
      <paragraph align="left">To set the currentNode parameter you can use the API:</paragraph>
      <example xml:space="preserve">Editor.Canvas.getActiveCanvas().setViewParam("currentNode",node);</example>
      <paragraph>We can demonstrate this in this example. Execute the following line of code to turn on the hiding of section content. Only section titles will show, unless the currentNode is contained in the section. <warning>Be careful though, most likely <emphasis>this</emphasis> section will be hidden. You can use the table of contents to make it visible again.</warning></paragraph>
      <example xml:space="preserve" show-execute-button="true">​Editor.Canvas.getActiveCanvas().setViewParam("hideSectionContent","true");</example>
      <paragraph>Use the following code to turn it off:</paragraph>
      <example xml:space="preserve" show-execute-button="true">​Editor.Canvas.getActiveCanvas().setViewParam("hideSectionContent","false");</example>
      <paragraph>Take a good look at the <code>xsl:param</code> elements in the <code>stylesheet.xsl</code>, and at what happens in the <code>&lt;xsl:template match="section"&gt;</code> in that same file.</paragraph>
    </section>
  </section>
</article>, ())

