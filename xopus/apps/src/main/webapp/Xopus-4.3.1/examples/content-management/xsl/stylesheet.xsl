<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <!-- this parameter is filled by Xopus, and can be used to detect that the stylesheet is being executed in Xopus -->
  <xsl:param name="xopus"/>
  <!-- used to store a current node -->
  <xsl:param name="hideSectionContent" select="'false'"/>
  <xsl:param name="currentNode" select="//section[1]"/>

  <!-- Structure -->

  <xsl:template match="article|section">
    <div class="contents">
      <xsl:choose>
        <xsl:when test="$hideSectionContent = 'false' or (generate-id(.) = generate-id($currentNode) or .//*[generate-id(.) = generate-id($currentNode)])">
          <xsl:apply-templates select="*"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:attribute name="class">contents hidden</xsl:attribute>
          <a href="#{generate-id(.)}">
            <xsl:if test="$hideSectionContent = 'true'">
              <xsl:attribute name="onclick">Editor.Canvas.getActiveCanvas().setViewParam("currentNode",node);</xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="title"/>
          </a>
        </xsl:otherwise>
        </xsl:choose>
      </div>
  </xsl:template> 

  <xsl:template match="title">
    <h1><xsl:apply-templates select="node()" /></h1>
  </xsl:template> 
  
  <xsl:template match="section/title">
    <a name="{generate-id(.)}"/>
    <h2><xsl:apply-templates select="node()" /></h2>
  </xsl:template> 
  <xsl:template match="section/section/title">
    <h3><xsl:apply-templates select="node()" /></h3>
  </xsl:template> 
  <xsl:template match="section/section/section/title">
    <h4><xsl:apply-templates select="node()" /></h4>
  </xsl:template> 
  
  <xsl:template match="introduction">
    <p class="introduction"><xsl:apply-templates select="@*|node()"/></p>
    <!-- generate a table of contents-->
    <xsl:if test="count(../section) != 0 and name(..) = 'article'">
      <div class="tableofcontents">
        <p>
          <b>Table of contents</b>
        </p>
        <ul>
          <xsl:apply-templates select="../section" mode="toc"/>
        </ul>
      </div>
    </xsl:if>
  </xsl:template>

  <xsl:template match="section" mode="toc">
      <li>
        <a href="#{generate-id(.)}">
          <xsl:if test="$hideSectionContent = 'true'">
            <xsl:attribute name="onclick">Editor.Canvas.getActiveCanvas().setViewParam("currentNode",node);</xsl:attribute>
          </xsl:if>
          <xsl:value-of select="string(title)"/>
        </a>
        <xsl:if test="count(section) != 0">
            <ul>
              <xsl:apply-templates select="section" mode="toc"/>
            </ul>
        </xsl:if>
      </li>
  </xsl:template>

  <xsl:template match="paragraph">
    <p><xsl:apply-templates select="@*|node()"/></p>
  </xsl:template>

  <xsl:template match="item">
    <li>
      <xsl:apply-templates select="node()"/>
    </li>
  </xsl:template>

  <xsl:template match="list">
    <ul>
      <xsl:apply-templates select="node()"/>
    </ul>
  </xsl:template>
  
  <xsl:template match="ordered-list">
    <ol>
      <xsl:apply-templates select="node()"/>
    </ol>
  </xsl:template>
  
  <xsl:template match="strong">
    <b><xsl:apply-templates select="node()"/></b>
  </xsl:template>

  <xsl:template match="emphasis">
    <i><xsl:apply-templates select="node()"/></i>
  </xsl:template>

  <xsl:template match="underline">
    <u><xsl:apply-templates select="node()"/></u>
  </xsl:template>
  
  <xsl:template match="anchor">
    <a><xsl:apply-templates select="@*|node()"/></a>
  </xsl:template>
  
  <xsl:template match="@href|@align">
    <xsl:copy-of select="."/>
  </xsl:template>
  
  <xsl:template match="code">
    <code><xsl:apply-templates select="node()"/></code>
  </xsl:template>
  
  <xsl:template match="warning">
    <b class="warning"><xsl:apply-templates select="node()"/></b>
  </xsl:template>

  <xsl:template match="example">
    <pre>
      <xsl:value-of select="."/>
    </pre>
    <xsl:if test="$xopus = 'true' and @show-execute-button = 'true'">
      <script>function <xsl:value-of select="generate-id(.)"/>(node) {<xsl:value-of select="."/>}</script>
      <button class="example-button" type="button" onclick="{generate-id(.)}(node)">Execute Code</button>
    </xsl:if>
  </xsl:template>



</xsl:stylesheet>