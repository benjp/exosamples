<%@page import="java.util.*,
                java.net.*,
                javax.xml.transform.*,
                javax.xml.transform.stream.*,
                java.text.*,                               
                javax.servlet.*,
                javax.servlet.http.*,
                javax.xml.parsers.*,
                org.xml.sax.*,
                org.w3c.dom.*,
                java.sql.*,
                org.w3c.dom.ls.*,
                java.io.*"
%>
<%    

  /******
   *
   *  REQUIREMENTS AND CONFIGURATIONS: 
   *  
   *  This file is tested with
   *  1) apache 2.2
   *  2) tomcat 4.1
   *  4) Windows XP
   *
   *  NOTES:
   *
   *  - If you want to parse it into an xmlDocument, than you can use
   *    
   *    InputSource xmlSource = new InputSource(new StringReader(xmlString));
   *    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
   *    DocumentBuilder builder = factory.newDocumentBuilder();
   *    Document doc = builder.parse(xmlSource);
   *  
   ******/
  
  BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"));
    String line;
    String xmlString = "";

    while((line = br.readLine()) != null) {
      xmlString += line;
  }
       

   String saveLocation = "document.xml";  
   OutputStreamWriter fw = new OutputStreamWriter(new FileOutputStream(saveLocation), "UTF-8");
  
   BufferedWriter buf = new BufferedWriter (fw);
   PrintWriter pw = new PrintWriter (buf);

   pw.println (xmlString);

   pw.flush();
   pw.close();
   buf.close();
   fw.close();

   out.flush();
%>