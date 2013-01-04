<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- 
  Note for developers taking this stylesheet
  as starting point: Use a treeTransform on the
  generated HTML to see the resulting tags inside 
  Xopus: 

    <x:view name="HTML View">
      <x:transform xsl="xsl/stylesheet.xsl"/>
      <x:treeTransform/>
    </x:view>
-->

  <xsl:output method="html" doctype-public="html" indent="yes" />
  <xsl:param name="xopus">false</xsl:param>

  <xsl:include href="dates.xsl"/>
  <xsl:include href="meta.xsl"/>

  <xsl:param name="internal-nav" select="article/h"/>

  <!-- Main page structure -->
  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="article/h"/></title>
      </head>
      <body>
        
        <div id="page">

          <div id="fakeNavigation"></div>
          
          <div id="articleBody">
            <xsl:apply-templates/>
          </div>
          
        </div>
          <div id="articleFooter">
            <div class="disclaimer"></div>
          </div>


      </body>
    </html>
  </xsl:template>

  <xsl:template match="article">
    <div class="{name()}">
      <div class="header">
        <xsl:apply-templates select="meta/date"/>
        <div class="heading">
          <xsl:apply-templates select="h"/>
          <xsl:apply-templates select="meta/author"/>
          <xsl:apply-templates select="meta/categories"/>
          <div class="decoration"></div>
        </div>
      </div>
      <xsl:apply-templates select="*[name() != 'meta' and name() != 'h']"/>
      <xsl:apply-templates select="." mode="below-article-notes"/>
    </div>
  </xsl:template>

  <xsl:template match="section">
    <div class="{name()}">
      <xsl:apply-templates />
    </div>
  </xsl:template>


  <xsl:template match="section[@view='list']">
    <div>
      <xsl:attribute name="class">
        <xsl:value-of select="name()"/>
        <xsl:text> list </xsl:text>
        <xsl:apply-templates select="@border-type"/>
      </xsl:attribute>
      <xsl:apply-templates select="*[local-name() != 'section']"/>
      <div class="content">
        <ul>
          <xsl:apply-templates select="section" mode="list-item"/>
        </ul>
      </div>
      <xsl:apply-templates select="." mode="border"/>
    </div>
    <xsl:apply-templates select="." mode="notes"/>
  </xsl:template>

  <xsl:template match="section" mode="list-item">
    <li>
      <div class="section-li li-content">
        <xsl:apply-templates select="."/>
      </div>
    </li>
  </xsl:template>


  <xsl:template match="section[@view='accordion']">
    <xsl:apply-templates select="*[local-name() != 'section']"/>
    <div>
      <xsl:attribute name="class">
        <xsl:value-of select="name()"/>
        <xsl:text> accordion </xsl:text>
        <xsl:apply-templates select="@border-type"/>
      </xsl:attribute>
      <div class="content">
        <xsl:apply-templates select="section"/>
      </div>
      <div class="accordion-stripe-top"></div>
      <div class="accordion-stripe-bottom"></div>
    </div>
  </xsl:template>

  <xsl:template match="section[@view='accordion']/section">
    <div>
      <xsl:attribute name="class">
        <xsl:choose>
          <xsl:when test="processing-instruction('expanded')">showContent</xsl:when>
          <xsl:otherwise>hideContent</xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
      <div>
        <xsl:attribute name="class">accordeon-section</xsl:attribute>
        <xsl:apply-templates select="h" mode="accordion"/>
        <xsl:if test="processing-instruction('expanded') ">
          <div class="content">
            <xsl:apply-templates select="*[name() != 'h']"/>
          </div>
        </xsl:if>
        <xsl:apply-templates select="." mode="edge"/>
      </div>
    </div>
  </xsl:template>

  <xsl:template match="section[@view='accordion']/section/h" mode="accordion">
    <div class="accordion-header">
      <div class="corner corner-left-top"></div>
      <div class="corner corner-left-bottom"></div>
      <h4>
        <xsl:apply-templates />
      </h4>
      <div class="corner corner-right-top"></div>
      <div class="corner corner-right-bottom"></div>
    </div>
  </xsl:template>


  <xsl:template match="section[@view='tabs']">
    <xsl:apply-templates select="*[local-name() != 'section']"/>
    <div>
      <xsl:attribute name="class">
        <xsl:value-of select="name()"/>
        <xsl:text> tabs </xsl:text>
        <xsl:apply-templates select="@border-type"/>
      </xsl:attribute>
      <div class="tab-items">
        <xsl:apply-templates select="section/h" mode="tab-item"/>
      </div>
      <div class="tab-content">
        <div class="content">
          <xsl:apply-templates select="*[processing-instruction('expanded')]"/>
        </div>
        <xsl:apply-templates select="." mode="edge"/>
      </div>
    </div>
  </xsl:template>
  
  <xsl:template match="section[@view='tabs']/section/h" mode="tab-item">
    <div>
      <xsl:attribute name="class">tab-item <xsl:if test="../processing-instruction('expanded')">chosen-tab-item</xsl:if></xsl:attribute>
      <div class="corner corner-left-top"></div>
      <xsl:if test=".. = $internal-nav/*"><div class="chosen-tab-item-left"></div><div class="chosen-tab-item-top"></div></xsl:if>
      <h4>
        <xsl:apply-templates />
      </h4>
      <div class="corner corner-right-top"></div>
      <xsl:if test="../processing-instruction('expanded')"><div class="chosen-tab-item-right"></div></xsl:if>
    </div>
  </xsl:template>

  <xsl:template match="*" mode="number"></xsl:template>

  <xsl:template match="*[not(@view)]/section/h" mode="number">
    <xsl:attribute name="class">
      <xsl:text>section-numbering-</xsl:text>
      <xsl:choose>
        <xsl:when test="/article/@section-numbering = 'true'" >true</xsl:when>
        <xsl:otherwise>false</xsl:otherwise>
      </xsl:choose>
    </xsl:attribute>

    <xsl:if test="/article/@section-numbering='true'">
      <span class="h-numbering">
        <xsl:number count="article|section" from="/article" level="multiple" format="1"/>.
      </span>
    </xsl:if>
  </xsl:template>

  <!-- headers -->
  <xsl:template match="article/h">
    <h1>
      <xsl:apply-templates select="@*"/>
      <xsl:apply-templates />
    </h1>
  </xsl:template>

  <xsl:template match="section/h">
    <h2>
      <xsl:apply-templates select="."  mode="number"/>
      <xsl:apply-templates select="@*"/>
      <xsl:apply-templates />
    </h2>
  </xsl:template>

  <xsl:template match="section/section/h|ol/h|ul/h">
    <h3>
      <xsl:apply-templates select="."  mode="number"/>
      <xsl:apply-templates select="@*"/>
      <xsl:apply-templates />
    </h3>
  </xsl:template>

  <xsl:template match="section/section/section/h|hli/h">
    <h4>
      <xsl:apply-templates select="."  mode="number"/>
      <xsl:apply-templates select="@*"/>
      <xsl:apply-templates />
    </h4>
  </xsl:template>

  <xsl:template match="h-sub">
    <div class="sub-heading">
      <xsl:apply-templates select="@*"/>
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <!-- general -->
  <xsl:template match="p">
    <p>
      <xsl:apply-templates select="@*"/>
      <xsl:apply-templates />
    </p>
    <xsl:apply-templates select="." mode="notes"/>
  </xsl:template>

  <xsl:template match="ol|ul">
    <div>
      <xsl:attribute name="class">
        <xsl:value-of select="name()"/>
        <xsl:text> list </xsl:text>
        <xsl:apply-templates select="@border-type"/>
      </xsl:attribute>
      <xsl:apply-templates select="h|h-sub"/>
      <div class="content">
      <xsl:element name="{name()}">
        <xsl:apply-templates select="li"/>
      </xsl:element>
      </div>
      <xsl:apply-templates select="." mode="border"/>
    </div>
    <xsl:apply-templates select="." mode="notes"/>
  </xsl:template>

  <xsl:template match="li">
    <li>
      <div class="li-content">
        <xsl:apply-templates />
      </div>
    </li>
  </xsl:template>

  <!-- quote -->
  <xsl:template match="quote">
    <div class="quote">
      <div class="openingQuote"></div>
      <xsl:apply-templates/>
      <div class="closingQuote"></div>
    </div>
    <xsl:apply-templates select="." mode="notes"/>
  </xsl:template>
  
  <xsl:template match="body">
    <div class="body">
      <xsl:apply-templates select="@*|node()"/>
    </div>
  </xsl:template>

  <xsl:template match="source">
    <div class="source">
      <xsl:apply-templates />
    </div>
  </xsl:template>

  <!-- figure -->
  <xsl:template match="figure">
    <table cellpadding="0" cellspacing="0">
      <xsl:apply-templates select="@align"/>
      <xsl:if test="orgchart/@width">
        <xsl:attribute name="style">
          <xsl:text>width:</xsl:text>
          <xsl:apply-templates select="@width"/>
          <xsl:text>%</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <tr>
        <td>
          <xsl:if test="@align='center'">
            <xsl:attribute name="class">td-align-center</xsl:attribute>
          </xsl:if>
          <div class="figure">
            <xsl:apply-templates select="@*[name() != 'align'] | node()"/>
          </div>
        </td>
      </tr>
    </table>
  </xsl:template>


  <xsl:template match="legend">
    <span class="legend">
      <xsl:if test="   ancestor::*/@figure-numbering='true' 
                    or ancestor::*/@figure-numbering=1 ">
          <xsl:apply-templates select="../*" mode="legend-numbering"/>
      </xsl:if>
      <xsl:apply-templates/>
    </span>
  </xsl:template>


  <xsl:template match="legend" mode="legend-numbering" />


  <xsl:template match="*" mode="legend-numbering">
    <span>
      <xsl:apply-templates select="." mode="legend-numbering-label" />
      <xsl:number from="/" level="any" format="1"/>
      <!--"magic": xsl:number uses the current type for counting,
          and that's exactly what we want here. -->
      <xsl:if test="following-sibling::*[not(self::legend)]">
        <xsl:text>, </xsl:text>
      </xsl:if>
      <xsl:text>:&#160;</xsl:text>
    </span>
  </xsl:template>

  <xsl:template match="img" mode="legend-numbering-label">
    <xsl:text>Image&#160;</xsl:text>
  </xsl:template>

  <xsl:template match="video" mode="legend-numbering-label">
    <xsl:text>Video&#160;</xsl:text>
  </xsl:template>

  <xsl:template match="*" mode="legend-numbering-label">
    <xsl:text>Fig.&#160;</xsl:text>
  </xsl:template>

  
  <xsl:template match="orgchart">
    <span class="figureItem">
      <span class="orgchart {@border-type}">
        <span class="content">
          <table>
            <tr>
              <xsl:apply-templates select="person"/>
            </tr>
          </table>
          <xsl:apply-templates select="legend"/>
        </span>
        <xsl:apply-templates select="." mode="border"/>
      </span>
    </span>
  </xsl:template>

  <xsl:template match="person">
    <td valign="top">
      <xsl:attribute name="class">open</xsl:attribute>
      <xsl:if test="parent::person and count(parent::*/*)&gt;1">
        <div>
          <xsl:attribute name="class">
            <xsl:choose>
              <xsl:when test="not(preceding-sibling::*)">leftabove</xsl:when>
              <xsl:otherwise>rightabove</xsl:otherwise>
            </xsl:choose>
          </xsl:attribute>&#160;</div>
        <div>
          <xsl:attribute name="class">
            <xsl:choose>
              <xsl:when test="not(following-sibling::*) or not(preceding-sibling::*)">nolines</xsl:when>
              <xsl:otherwise>above</xsl:otherwise>
            </xsl:choose>
          </xsl:attribute>&#160;</div>
      </xsl:if>
      <div>
        <xsl:if test="@division">
          <xsl:attribute name="class">divopen <xsl:if test="count(ancestor::person) = 0">topchart</xsl:if></xsl:attribute>
          <div class="divname"><xsl:value-of select="@division" /></div>
          <div class="boxside-left"></div>
          <div class="boxside-right"></div>
        </xsl:if>
        <div class="divcontents morph">
          <div class="boxc">
            <span class="box">
              <xsl:value-of select="@name" />&#160;
              <xsl:if test="count(.//person)">
                <xsl:text> (</xsl:text>
                <xsl:value-of select="number(count(.//person))" />
                <xsl:text>)</xsl:text>
              </xsl:if>
              <div class="boxside-left"></div>
              <div class="boxside-right"></div>
            </span>
          </div>
          <xsl:if test="*">
            <div class="linemiddle"><span class="">&#160;</span></div>
          </xsl:if>
          <div class="tablewrapper morph">
            <table cellspacing="0" cellpadding="0" align="center">
              <tr>
                <xsl:apply-templates select="*" />
              </tr>
            </table>
          </div>
        </div>
      </div>
    </td>
  </xsl:template>
  
  
  <!-- table -->
  <xsl:template match="include">
    <div>
      <xsl:attribute name="class">
        <xsl:text>include </xsl:text>
        <xsl:apply-templates select="@border-type"/>
      </xsl:attribute>
      <xsl:if test="@width">
        <xsl:attribute name="style">
          <xsl:text>width:</xsl:text>
          <xsl:apply-templates select="@width"/>
          <xsl:text>%</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <div class="content">
        <xsl:if test="@src != ''">
          <xsl:apply-templates />
        </xsl:if>
      </div>
      <xsl:apply-templates select="." mode="border"/>
    </div>
  </xsl:template>

  <xsl:template match="table">
    <table width="100%">
      <xsl:apply-templates select="tgroup/tbody/*"/>
    </table>
  </xsl:template>

  <xsl:template match="row">
    <xsl:variable name="pos" select="position()"/>
    <tr>
      <xsl:apply-templates>
        <xsl:with-param name="parent-pos" select="$pos"/>
      </xsl:apply-templates>
    </tr>
  </xsl:template>

  <xsl:template match="entry">
    <xsl:param name="parent-pos"/>
    <xsl:variable name="pos" select="count(preceding-sibling::entry) + 1"/>
    <xsl:variable name="start" select="../../../colspec[@colname = current()/@namest]"/>
    <xsl:variable name="end" select="../../../colspec[@colname = current()/@nameend]"/>
    <xsl:variable name="span" select="count(../../../colspec[following-sibling::colspec[@colname = current()/@nameend]]) - count(../../../colspec[following-sibling::colspec[@colname = current()/@namest]]) + 1"/>
    <td>
      <xsl:apply-templates select="../../../colspec[@colnum = $pos]" mode="width"/>
      <xsl:if test="@namest and @nameend">
        <xsl:attribute name="colspan">
          <xsl:value-of select="$span"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:attribute name="class">
        <xsl:if test="$pos = 1 and $parent-pos = 1"> top-left-cell </xsl:if>
        <xsl:if test="$pos != 1 and $parent-pos = 1"> top-cell </xsl:if>
        <xsl:if test="$pos = 1 and $parent-pos != 1"> left-cell </xsl:if>
        <xsl:if test="$pos != 1 and $parent-pos != 1"> cell </xsl:if>
        <xsl:if test="$span &gt; 2"> center</xsl:if>
      </xsl:attribute>
      <xsl:if test="@align">
        <xsl:attribute name="align">
          <xsl:value-of select="@align"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </td>
  </xsl:template>

  <xsl:template match="colspec" mode="width">
    <xsl:attribute name="width"><xsl:value-of select="@colwidth"/>%</xsl:attribute>
  </xsl:template>


  <!-- inline -->
  <xsl:template match="a">
    <a href="{@href}">
      <xsl:apply-templates />
    </a>
  </xsl:template>

  <xsl:template match="strong">
    <strong>
      <xsl:apply-templates />
    </strong>
  </xsl:template>

  <xsl:template match="em">
    <em>
      <xsl:apply-templates />
    </em>
  </xsl:template>

  <xsl:template match="u">
    <u>
      <xsl:apply-templates />
    </u>
  </xsl:template>
  
  <xsl:template match="sup">
    <sup>
      <xsl:apply-templates />
    </sup>
  </xsl:template>

  <xsl:template match="sub">
    <sub>
      <xsl:apply-templates />
    </sub>
  </xsl:template>

  <xsl:template match="br">
    <br/>
  </xsl:template>

  <!-- special -->
  <xsl:template match="note[@view = 'default']">
    <xsl:text> </xsl:text>
    <span class="note">
      (<xsl:apply-templates />)
    </span>
    <xsl:text> </xsl:text>
  </xsl:template>


  <xsl:template match="note">
    <span class="note-nr">[<xsl:number count="note" level="any" format="1"/>]</span>
  </xsl:template>

  <xsl:template match="*" mode="notes">
    <xsl:if test="count(.//note[@view = 'below-paragraph']) != 0 and not(ancestor::ol)and not(ancestor::ul)">
      <div class="notes">
        <h4>Notes</h4>
        <div class="content">
          <ol>
            <xsl:apply-templates select=".//note[@view = 'below-paragraph']" mode="note"/>
          </ol>
        </div>
        <div class="closingNote"></div>
      </div>
    </xsl:if>
  </xsl:template>

  <xsl:template match="*" mode="below-article-notes">
    <xsl:if test="count(.//note[@view = 'below-article']) != 0 and not(ancestor::ol)and not(ancestor::ul)">
      <div class="notes below-article">
        <h2>Notes</h2>
        <div class="content">
          <ol>
            <xsl:apply-templates select=".//note[@view = 'below-article']" mode="note"/>
          </ol>
        </div>
        <div class="closingNote"></div>
      </div>
    </xsl:if>
  </xsl:template>

  <xsl:template match="note" mode="note">
    <xsl:variable name="number">
      <xsl:number count="note" level="any" format="1"/>
    </xsl:variable>
    <li value="{$number}">
      <xsl:apply-templates/>
    </li>
  </xsl:template>

  <xsl:template match="@border-type">
    <xsl:text>hasBorder border-type-</xsl:text>
    <xsl:value-of select="."/>
    <xsl:if test=". = 'soft' or . = 'hard'">
      <xsl:text>shadow</xsl:text>
    </xsl:if>
  </xsl:template>

  <xsl:template match="*" mode="border">
    <xsl:if test="@border-type">
      <span class="border">
        <span class="borderPart borderPart1"></span>
        <span class="borderPart borderPart2"></span>
        <span class="borderPart borderPart3"></span>
        <span class="borderPart borderPart4"></span>
        <span class="borderPart borderPart5"></span>
        <span class="borderPart borderPart6"></span>
        <span class="borderPart borderPart7"></span>
        <span class="borderPart borderPart8"></span>
        <span class="borderPart borderPart9"></span>
        <span class="borderPart borderPart10"></span>
        <span class="borderPart borderPart11"></span>
        <span class="borderPart borderPart12"></span>
      </span>
    </xsl:if>
  </xsl:template>

  <xsl:template match="*" mode="edge">
    <span class="edge">
      <span class="edgePart edgePart1"></span>
      <span class="edgePart edgePart2"></span>
      <span class="edgePart edgePart3"></span>
      <span class="edgePart edgePart4"></span>
      <span class="edgePart edgePart5"></span>
      <span class="edgePart edgePart6"></span>
      <span class="edgePart edgePart7"></span>
      <span class="edgePart edgePart8"></span>
      <span class="edgePart edgePart9"></span>
      <span class="edgePart edgePart10"></span>
      <span class="edgePart edgePart11"></span>
      <span class="edgePart edgePart12"></span>
    </span>
  </xsl:template>

  <xsl:template match="@text-align">
    <xsl:attribute name="style">text-align:<xsl:value-of select="."/></xsl:attribute>
  </xsl:template>

  <xsl:template match="@align">
    <xsl:attribute name="align"><xsl:value-of select="."/></xsl:attribute>
    <xsl:attribute name="class">align-<xsl:value-of select="."/></xsl:attribute>
  </xsl:template>



  <xsl:template match="video[contains(@src, 'vimeo.com')]" mode="embedded-video">
    <xsl:param name="id" select="substring-after(@src, 'vimeo.com/')"/>
    <xsl:param name="uri" select="concat('http://vimeo.com/moogaloop.swf?clip_id=', $id, '&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=0&amp;show_portrait=0&amp;color=ffffff&amp;fullscreen=1')"/>
    
    <xsl:call-template name="flash-video">
      <xsl:with-param name="uri" select="$uri"/>
      <xsl:with-param name="width" select="@width"/>
      <xsl:with-param name="height" select="@height"/>
      <xsl:with-param name="defaultHeight" select="340"/>
      <xsl:with-param name="defaultWidth" select="560"/>
    </xsl:call-template>
  </xsl:template>
  
  <xsl:template match="video[contains(@src, 'youtube.com')]" mode="embedded-video">
    <xsl:param name="id" select="substring-after(@src, 'youtube.com/v/')"/>
    
    <xsl:call-template name="flash-video">
      <xsl:with-param name="uri" select="concat('http://www.youtube.com/v/', $id)"/>
      <xsl:with-param name="width" select="@width"/>
      <xsl:with-param name="height" select="@height"/>
      <xsl:with-param name="defaultHeight" select="225"/>
      <xsl:with-param name="defaultWidth" select="400"/>
    </xsl:call-template>
  </xsl:template>
  
  <xsl:template match="video" mode="embedded-video">
    <video src="{@src}">
      <xsl:call-template name="size">
        <xsl:with-param name="width" select="@width"/>
        <xsl:with-param name="height" select="@height"/>
      </xsl:call-template>
      <xsl:if test="@poster">
        <img src="{@poster}">
          <xsl:call-template name="size">
            <xsl:with-param name="width" select="@width"/>
            <xsl:with-param name="height" select="@height"/>
          </xsl:call-template>
        </img>
      </xsl:if>
    </video>
  </xsl:template>

  <xsl:template name="flash-video">
    <xsl:param name="uri"/>
    <xsl:param name="width"/>
    <xsl:param name="height"/>
    <xsl:param name="defaultWidth"/>
    <xsl:param name="defaultHeight"/>
    
    <object data="{$uri}" type="application/x-shockwave-flash">
      <xsl:call-template name="size">
        <xsl:with-param name="width" select="$width"/>
        <xsl:with-param name="height" select="$height"/>
        <xsl:with-param name="defaultWidth" select="$defaultWidth"/>
        <xsl:with-param name="defaultHeight" select="$defaultHeight"/>
      </xsl:call-template>
      
      <param name="allowfullscreen" value="true" />
      <param name="allowscriptaccess" value="always" />
      <param name="movie" value="{$uri}" />
      
      <embed src="{$uri}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always">
        <xsl:call-template name="size">
          <xsl:with-param name="width" select="$width"/>
          <xsl:with-param name="height" select="$height"/>
          <xsl:with-param name="defaultWidth" select="$defaultWidth"/>
          <xsl:with-param name="defaultHeight" select="$defaultHeight"/>
        </xsl:call-template>
      </embed>
    </object>
  </xsl:template>

  <xsl:template name="size">
    <xsl:param name="width"/>
    <xsl:param name="height"/>
    <xsl:param name="defaultWidth"/>
    <xsl:param name="defaultHeight"/>
    <xsl:param name="defaultAspect" select="$defaultWidth div $defaultHeight"/>
    <xsl:param name="keepAspectRatio" select="false()"/>
      <xsl:choose>
        <xsl:when test="$width">
          <xsl:attribute name="width">
            <xsl:value-of select="$width"/>
          </xsl:attribute>
        </xsl:when>
        <xsl:when test="$keepAspectRatio and $defaultAspect and $height">
          <xsl:attribute name="width">
            <xsl:value-of select="$height div $defaultAspect"/>
          </xsl:attribute>
        </xsl:when>
        <xsl:when test="$defaultWidth">
          <xsl:attribute name="width">
            <xsl:value-of select="$defaultWidth"/>
          </xsl:attribute>
        </xsl:when>
      </xsl:choose>
      <xsl:choose>
        <xsl:when test="$height">
          <xsl:attribute name="height">
            <xsl:value-of select="$height"/>
          </xsl:attribute>
        </xsl:when>
        <xsl:when test="$keepAspectRatio and $defaultAspect and $width">
          <xsl:attribute name="height">
            <xsl:value-of select="$width * $defaultAspect"/>
          </xsl:attribute>
        </xsl:when>
        <xsl:when test="$defaultHeight">
          <xsl:attribute name="height">
            <xsl:value-of select="$defaultHeight"/>
          </xsl:attribute>
        </xsl:when>
      </xsl:choose>
  </xsl:template>
  
  <xsl:template match="video">
    <span class="figureItem">
      <span>
        <xsl:attribute name="class">
          <xsl:text>video </xsl:text>
          <xsl:apply-templates select="@border-type"/>
        </xsl:attribute>
        <span class="content">
          <xsl:apply-templates select="." mode="embedded-video"/>
        </span>
        <xsl:apply-templates select="." mode="border"/>
      </span>
    </span>
  </xsl:template>
  
  <xsl:template match="img">
    <span class="figureItem">
      <span>
        <xsl:attribute name="class">
          <xsl:text>img </xsl:text>
          <xsl:apply-templates select="@border-type"/>
        </xsl:attribute>
        <span class="content">
          <img src="{@src}">
            <xsl:call-template name="size">
              <xsl:with-param name="width" select="@width"/>
              <xsl:with-param name="height" select="@height"/>
            </xsl:call-template>
          </img>
          <xsl:apply-templates/>
        </span>
        <xsl:apply-templates select="." mode="border"/>
      </span>
    </span>
  </xsl:template>
  


</xsl:stylesheet>
