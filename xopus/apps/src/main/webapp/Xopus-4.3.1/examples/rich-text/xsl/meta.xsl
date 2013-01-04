<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="meta"/>
  
  <xsl:template match="meta/author">
    <div class="author">     
      by <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="meta/author[@email]">
    <div class="author">      
      by <a href="mailto:{@email}"><xsl:apply-templates/></a>
    </div>
  </xsl:template>

  <xsl:template match="meta/date">
    <div class="date" onclick="node.openAttributesEditor();">
      <xsl:apply-templates select="." mode="drawDate"/>
    </div>
  </xsl:template>

  <xsl:template match="meta/categories">
    <div class="categories">      
      <div class="categoriesLabel">Published in:</div>
      <div class="categoriesThemselves">
        <a href="#" class="category" onmousedown="showOptions(event, this, node);">
          <xsl:apply-templates/>
        </a>
      </div>
    </div>
  </xsl:template>

  <xsl:template match="meta/categories/category">
    
      <xsl:value-of select="string(.)"/>
    <xsl:if test="following-sibling::*[1]">, </xsl:if>
  </xsl:template>

</xsl:stylesheet>
