package org.exoplatform.ecms.component.rest;

import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Path("/xopus4")
public class XopusConnector {

  @GET
  @Path("xml/{name}")
  @Produces("text/xml")
  public String xml(@PathParam("name") String name) {
    return "<?xml version='1.0'?>"+
            "<?xml-stylesheet type='text/xsl' href='http://localhost:8080/eXoResources/Xopus-4.3.1/examples/simple/xsl/stylesheet.xsl'?>"+
            "<article xsi:noNamespaceSchemaLocation='http://localhost:8080/eXoResources/Xopus-4.3.1/examples/simple/xsd/schema.xsd'"+
            "     xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xml:lang='en-US'>"+
            "  <title>Example document "+name+"</title>"+
            "  <section>"+
            "    <title>"+name+"</title>"+
            "    <paragraph></paragraph>"+
            "  </section>"+
            "  <footer>"+name+", online editing</footer>"+
            "</article>";

  }


  @GET
  @Path("document/{name}")
  @Produces("text/xml")
  public String document(@PathParam("name") String name) {
    return "<?xml version='1.0'?>"+
            "<article xml:lang='en-US'>"+
            "  <title>Example document "+name+"</title>"+
            "  <section>"+
            "    <title>"+name+"</title>"+
            "    <paragraph></paragraph>"+
            "  </section>"+
            "  <footer>"+name+", online editing</footer>"+
            "</article>";

  }


  @GET
  @Path("html/{name}")
  @Produces("text/html")
  public String html(@PathParam("name") String name) {
    return "<!DOCTYPE html>"+
            "    <html>"+
            "      <head>"+
            "      <meta name='robots' content='noindex'>"+
            "      <title>Simple example</title>"+
            "      <!-- Start Xopus -->"+
            "      <link rel='stylesheet' type='text/css' href='http://localhost:8080/eXoResources/Xopus-4.3.1/examples/simple/css/wysiwyg.css'/>"+
            "      <link rel='stylesheet' type='text/css' href='http://localhost:8080/eXoResources/Xopus-4.3.1/examples/simple/css/tagson.css'/>"+
            "      <script type='text/javascript' src='http://localhost:8080/eXoResources/Xopus-4.3.1/xopus/xopus.js'></script>"+
            "      </head>"+
            "      <body>"+
            "      <div id='page'>"+
            "        <!-- The Xopus Canvas -->"+
            "        <div xopus='true'>"+
            "        <xml>"+
            "          <x:config version='1.0' xmlns:x='http://www.xopus.com/xmlns/config'>"+
            "          @    <x:javascript src='http://localhost:8080/eXoResources/Xopus-4.3.1/examples/simple/js/save.js'/>"+
            "          <x:javascript>Editor.SpellChecking.addPersonalWords('en-US', ['Xopus', 'wysiwyg']);</x:javascript>"+
            "          <x:pipeline xml='http://localhost:8080/rest/xopus/document/"+name+"' xsd='http://localhost:8080/eXoResources/Xopus-4.3.1/examples/simple/xsd/schema.xsd'>"+
            "            <x:view name='WYSIWYG View'>"+
            "            <x:transform xsl='http://localhost:8080/eXoResources/Xopus-4.3.1/examples/simple/xsl/stylesheet.xsl'/>"+
            "            </x:view>"+
            "            <x:view name='Tags On View'>"+
            "            <x:transform xsl='http://localhost:8080/eXoResources/Xopus-4.3.1/examples/simple/xsl/tagson.xsl'/>"+
            "            </x:view>"+
            "            <x:view name='XML View'>"+
            "            <x:treeTransform/>"+
            "            </x:view>"+
            "          </x:pipeline>"+
            "          <x:import src='http://localhost:8080/eXoResources/Xopus-4.3.1/examples/simple/config/config.xml'/>"+
            "          </x:config>"+
            "        </xml>"+
            "        </div>  "+
            "      </div>"+
            "      </body>"+
            "    </html>";

  }


}