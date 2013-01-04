<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml" version="1.0">

<!-- Structure -->

  <xsl:template match="article">
    <html>
      <head>
        <title><xsl:value-of select="title"/></title>
        <link rel="stylesheet" type="text/css" href="css/common.css"/>
        <link rel="stylesheet" type="text/css" href="css/style.css"/>
      </head>
      <body>
        <xsl:apply-templates select="*"/>
      </body>
    </html>
  </xsl:template> 

  <xsl:template match="title">
    <h1><xsl:apply-templates select="node()" /></h1>
  </xsl:template> 
  
  <!-- Prepend each header with an autoincrementing number. -->
  <xsl:template match="header">
    <h2><xsl:number format="1"/>. <xsl:apply-templates select="node()" /></h2>
  </xsl:template> 
  
  <xsl:template match="subheader">
    <h3><xsl:apply-templates select="node()" /></h3>
  </xsl:template> 
  
  <xsl:template match="footer">
    <div class="footer"><xsl:apply-templates select="node()" /></div>
  </xsl:template>

  <xsl:template match="paragraph">
    <p><xsl:apply-templates select="node()"/></p>
  </xsl:template> 

<!-- Render inline elements -->

  <xsl:template match="strong">
    <b><xsl:apply-templates select="node()"/></b>
  </xsl:template> 
  
  <xsl:template match="emphasis">
    <i><xsl:apply-templates select="node()"/></i>
  </xsl:template> 

  <xsl:template match="subscript">
    <sub><xsl:apply-templates select="node()"/></sub>
  </xsl:template> 
  
  <xsl:template match="superscript">
    <sup><xsl:apply-templates select="node()"/></sup>
  </xsl:template> 

  <xsl:template match="linebreak">
    <br/>
  </xsl:template> 

  <xsl:template match="link">
    <a><xsl:apply-templates select="@*|node()"/></a>
  </xsl:template> 

<!-- Render lists -->

  <xsl:template match="unorderedlist">
    <ul><xsl:apply-templates select="item"/></ul>
  </xsl:template> 

  <xsl:template match="orderedlist">
    <ol><xsl:apply-templates select="item"/></ol>
  </xsl:template> 

  <xsl:template match="item">
    <li><xsl:apply-templates select="node()"/></li>
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
        
        <xsl:apply-templates select="caption|tbody"/>
      </table>
    </div>
  </xsl:template>

  <xsl:template match="tbody">
    <tbody>
      <xsl:attribute name="class">
        <xsl:text>rowcoloring_</xsl:text><xsl:choose><xsl:when test="../@alternaterowcolor='true' or ../@alternaterowcolor='1'">alternate</xsl:when><xsl:otherwise>normal</xsl:otherwise></xsl:choose>
      </xsl:attribute>

      <xsl:apply-templates select="tr"/>
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

      <xsl:apply-templates select="td|th"/>
    </tr>
  </xsl:template>

  <xsl:template match="td|th">
    <xsl:element name="{local-name()}" namespace="http://www.w3.org/1999/xhtml">
      <xsl:copy-of select="@rowspan"/>
      <xsl:copy-of select="@colspan"/>
      <xsl:copy-of select="@bgcolor"/>
      <xsl:apply-templates select="node()"/>
    </xsl:element>
  </xsl:template>
  
<!-- chart -->

  <xsl:template match="chart">
    <xsl:variable name="total" select="sum(dataItem/@value)" />
    <svg style="float:right; margin-right: 3em; margin-top: -4em" width="400px" height="400px" viewBox="-1.2 -1.2 2.4 2.4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

      <defs>
        <radialGradient id="shadow">
          <stop offset="0%" stop-color="black" stop-opacity="1"  />
          <stop offset="20%" stop-color="black" stop-opacity="1"  />
          <stop offset="100%" stop-color="black" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect x="-1.12" y="-1.12" width="2.3" height="2.3" fill="url(#shadow)" />

      <xsl:for-each select="dataItem">
        <xsl:variable name="runningTotal" select="sum(preceding-sibling::dataItem/@value)" />
        <xsl:variable name="startAngle" select="2 * $pi * $runningTotal div $total" />
        <xsl:variable name="endAngle" select="2 * $pi * ($runningTotal + @value) div $total" />
        <xsl:variable name="startSin">
          <xsl:call-template name="sin">
            <xsl:with-param name="x" select="$startAngle" />
          </xsl:call-template>
        </xsl:variable>
        <xsl:variable name="startCos">
          <xsl:call-template name="cos">
            <xsl:with-param name="x" select="$startAngle" />
          </xsl:call-template>
        </xsl:variable>
        <xsl:variable name="endSin">
          <xsl:call-template name="sin">
            <xsl:with-param name="x" select="$endAngle" />
          </xsl:call-template>
        </xsl:variable>
        <xsl:variable name="endCos">
          <xsl:call-template name="cos">
            <xsl:with-param name="x" select="$endAngle" />
          </xsl:call-template>
        </xsl:variable>

        <xsl:variable name="color">
          <xsl:call-template name="color">
            <xsl:with-param name="index" select="@id" />
          </xsl:call-template>            
        </xsl:variable>

        <path style="z-index:2" stroke-width="0.005" stroke="{$color}" fill="{$color}">
          <xsl:attribute name="d">
            <xsl:text>M 0 0 L </xsl:text>
            <xsl:value-of select="$startSin" />
            <xsl:text> </xsl:text>
            <xsl:value-of select="-1 * $startCos" />
            <xsl:text> A 1 1 0 </xsl:text>
            <xsl:choose>
                 <xsl:when test="$endAngle - $startAngle &gt; $pi">
                      <xsl:text>1 </xsl:text>
                 </xsl:when>
                 <xsl:otherwise>
                      <xsl:text>0 </xsl:text>
                 </xsl:otherwise>
            </xsl:choose>
            <xsl:text>1 </xsl:text>
            <xsl:value-of select="$endSin"/>
            <xsl:text> </xsl:text>
            <xsl:value-of select="-1 * $endCos"/>
            <xsl:text> Z</xsl:text>
          </xsl:attribute>          
        </path>

      </xsl:for-each>

      <defs>
        <radialGradient id="highlight">
          <stop offset="0%" stop-color="white" stop-opacity="0.4"  />
          <stop offset="100%" stop-color="white" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect x="-1.2" y="-1.2" width="2" height="2" fill="url(#highlight)" />

    </svg>
    <table>
      <xsl:apply-templates select="dataItem" />
    </table>
  </xsl:template>
  
  <xsl:template match="dataItem">
    <xsl:variable name="color">
      <xsl:call-template name="color">
        <xsl:with-param name="index" select="@id" />
      </xsl:call-template>            
    </xsl:variable>
    <tr>
      <td>
        <span>
          <xsl:attribute name="style">
            <xsl:text>color:</xsl:text>
            <xsl:value-of select="$color" />
          </xsl:attribute>
          <xsl:text>&#x25A0;</xsl:text>
        </span>
      </td>
      <td>
        <xsl:apply-templates select="node()" />
      </td>
      <td style="text-align: right">
        <xsl:value-of select="@value" />
      </td>
      <td style="text-align: right">
        <xsl:if test="not(@value = 0)">
          <xsl:variable name="promile" select="round(1000 * @value div sum(../dataItem/@value))" />
          <xsl:value-of select="floor($promile div 10)" />
          <xsl:text>.</xsl:text>
          <xsl:value-of select="$promile mod 10" />
          <xsl:text>%</xsl:text>
        </xsl:if>
      </td>
    </tr>
  </xsl:template>

  <xsl:template name="color">
    <xsl:param name="index" />
    <xsl:variable name="r">
      <xsl:call-template name="cos">
        <xsl:with-param name="x" select="5.5 + 0.85 * $index" />
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="g">
      <xsl:call-template name="cos">
        <xsl:with-param name="x" select="1.5 + 0.85 * $index" />
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="b">
      <xsl:call-template name="cos">
        <xsl:with-param name="x" select="3.5 + 0.85 * $index" />
      </xsl:call-template>
    </xsl:variable>
    <xsl:value-of select="concat('rgb(',$r * 40 + 60,'%,',$g * 40 + 60,'%,',$b * 40 + 60,'%)')" />
  </xsl:template>
  
<!-- other -->

  <!-- Copy attributes by default -->
  <xsl:template match="@*">
    <xsl:copy-of select="." />
  </xsl:template>
  
  <xsl:variable name="pi" select="3.1415926535897932384626433832795" />
  
  <xsl:template name="sin">
    <xsl:param name="x" />
    <xsl:choose>
      <xsl:when test="$x &lt; 0">
        <xsl:call-template name="sin">
          <xsl:with-param name="x" select="$x + $pi * 2" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$x &gt; $pi * 2">
        <xsl:call-template name="sin">
          <xsl:with-param name="x" select="$x - $pi * 2" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$x &gt; $pi">
        <xsl:variable name="y">
          <xsl:call-template name="sin">
            <xsl:with-param name="x" select="$pi * 2 - $x" />
          </xsl:call-template>
        </xsl:variable>
        <xsl:value-of select="$y * -1" />
      </xsl:when>
      <xsl:when test="$x &gt; $pi div 2">
        <xsl:call-template name="sin">
          <xsl:with-param name="x" select="$pi - $x" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <!-- taylor series -->
        <xsl:variable name="sqrx" select="$x * $x" />
        <xsl:value-of select="$x * (1 - $sqrx * (840 - $sqrx * (42 - $sqrx)) div 5040)" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
  <xsl:template name="cos">
    <xsl:param name="x" />
    <xsl:call-template name="sin">
       <xsl:with-param name="x" select="$x + $pi div 2" />
    </xsl:call-template>    
  </xsl:template>
  
  
</xsl:stylesheet>
