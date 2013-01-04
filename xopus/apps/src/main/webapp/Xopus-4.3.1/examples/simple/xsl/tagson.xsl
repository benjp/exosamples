<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

	<!-- Structure -->
	<xsl:output method="html" />

  <xsl:template match="article">
		<div class="article">
			<xsl:apply-templates select="." mode="tagsblock" />
		</div>
  </xsl:template> 

  <xsl:template match="title">
    <h1><xsl:apply-templates select="." mode="tagsinline" /></h1>
  </xsl:template> 

  <!-- Prepend each section title with an autoincrementing number. -->
  <xsl:template match="section/title">
    <h2><xsl:number count="article|section" from="/article" level="multiple" format="1"/>. <xsl:apply-templates select="." mode="tagsinline" /></h2>
  </xsl:template> 

  <xsl:template match="section">
    <div class="section"><xsl:apply-templates select="node()" /></div>
  </xsl:template>
  

  <xsl:template match="footer">
    <div class="footer"><xsl:apply-templates select="." mode="tagsinline" /></div>
  </xsl:template>

  <xsl:template match="paragraph">
    <p><xsl:apply-templates select="." mode="tagsinline" /></p>
  </xsl:template> 

<!-- Render inline elements -->

  <xsl:template match="strong">
    <b><xsl:apply-templates select="." mode="tagsinline" /></b>
  </xsl:template> 
  
  <xsl:template match="emphasis">
    <i><xsl:apply-templates select="." mode="tagsinline" /></i>
  </xsl:template> 

  <xsl:template match="subscript">
    <sub><xsl:apply-templates select="." mode="tagsinline" /></sub>
  </xsl:template> 
  
  <xsl:template match="superscript">
    <sup><xsl:apply-templates select="." mode="tagsinline" /></sup>
  </xsl:template> 

  <xsl:template match="linebreak">
    <br/>
  </xsl:template> 

  <xsl:template match="link">
    <a>
      <xsl:apply-templates select="." mode="tagsinline" />
    </a>
  </xsl:template> 

<!-- Render lists -->

  <xsl:template match="unorderedlist">
    <ul><xsl:apply-templates select="." mode="tagsblock" /></ul>
  </xsl:template> 

  <xsl:template match="orderedlist">
    <ol><xsl:apply-templates select="." mode="tagsblock" /></ol>
  </xsl:template> 

  <xsl:template match="item">
    <li><xsl:apply-templates select="." mode="tagsblock" /></li>
  </xsl:template> 

<!-- Render table -->

  <xsl:template match="table">
    <div align="center">
      <table border="0" width="{@width}%">
        <xsl:copy-of select="@cellpadding"/>
        <xsl:attribute name="class">
          <xsl:choose>
            <xsl:when test="@color">color_<xsl:value-of select="@color" /></xsl:when>
            <xsl:otherwise>color_grey</xsl:otherwise>
          </xsl:choose>
          <xsl:choose>
            <xsl:when test="@border"> border_<xsl:value-of select="@border" /></xsl:when>
            <xsl:otherwise> border_no</xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
        
        <!-- Default the cellpadding attribute to 0. -->
        <xsl:choose>
          <xsl:when test="@cellspacing">
            <xsl:copy-of select="@cellspacing"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:attribute name="cellspacing">0</xsl:attribute>
          </xsl:otherwise>
        </xsl:choose>
        
        <xsl:apply-templates select="caption|tbody" />
      </table>
    </div>
  </xsl:template>

  <xsl:template match="tbody">
    <tbody>
      <xsl:attribute name="class">
        <xsl:text>rowcoloring_</xsl:text><xsl:choose><xsl:when test="../@alternaterowcolor='true' or ../@alternaterowcolor='1'">alternate</xsl:when><xsl:otherwise>normal</xsl:otherwise></xsl:choose>
      </xsl:attribute>

      <xsl:apply-templates select="tr" />
    </tbody>
  </xsl:template>

  <xsl:template match="tr">
    <tr>
      <!-- Add an even or odd class to each row so we can alternate the row colors. -->
      <xsl:attribute name="class">
        <xsl:choose>
          <xsl:when test="position() mod 2 = 1">evenorodd_odd</xsl:when>
          <xsl:otherwise>evenorodd_even</xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>

      <xsl:apply-templates select="td|th" />
    </tr>
  </xsl:template>

  <xsl:template match="td|th">
    <xsl:element name="{local-name()}">
      <xsl:copy-of select="@rowspan"/>
      <xsl:copy-of select="@colspan"/>
      <xsl:copy-of select="@bgcolor"/>
      <xsl:apply-templates select="node()" />
    </xsl:element>
  </xsl:template>
  
<!-- other -->

  <!-- Copy attributes by default -->
  <xsl:template match="@*">
    <xsl:copy-of select="." />
  </xsl:template>
  
  <!-- Generate tags around nodes -->
  <xsl:template match="*" mode="tagsblock">
    <xsl:apply-templates select="." mode="starttag" />
    <xsl:apply-templates select="*" />
    <xsl:apply-templates select="." mode="endtag" />
  </xsl:template>

  <xsl:template match="*" mode="tagsinline">
    <xsl:apply-templates select="." mode="starttag" />
    <xsl:apply-templates select="*|text()" />
    <xsl:apply-templates select="." mode="endtag" />
  </xsl:template>
  
  <xsl:template match="*" mode="starttag">
    <span class="starttag" unselectable="on"><xsl:value-of select="name()" /></span>
  </xsl:template>
  
  <xsl:template match="*" mode="endtag">
    <span class="endtag" unselectable="on"><xsl:value-of select="name()" /></span>
  </xsl:template>
  
</xsl:stylesheet>
