<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" doctype-public="-//W3C//DTD HTML 4.01 Strict//EN" encoding="utf-8" indent="yes"/>

<xsl:param name="xopus">false</xsl:param>

<xsl:template match="recipe">
  <div id="body">
    <xsl:attribute name="class">
      <xsl:value-of select="category"/>
      <xsl:if test="$xopus='true'">
        <xsl:text> xopus-editing</xsl:text>
      </xsl:if>
    </xsl:attribute>
    <div id="background">
      <div class="category-background christmas morph"></div>
      <div class="category-background breakfast morph"></div>
      <div class="category-background picnic morph"></div>
      <div class="category-background dinner morph"></div>
      <div class="styling-element-1"></div>
    </div>

    <div id="logoBox"><div id="logo"></div></div>
    <div id="acknowledgement">
      <div class="ack christmas">background image provided by <a href="http://www.flickr.com/people/thefrog/" target="_blank">the Frog</a></div>
      <div class="ack breakfast">background image provided by <a href="http://www.ronvanzon.nl" target="_blank">Ron van Zon</a></div>
      <div class="ack dinner">background image provided by <a href="http://www.tupwanders.nl/" target="_blank">Tup Wanders</a></div>
      <div class="ack picnic">background image provided by <a href="http://www.ronvanzon.nl">Ron van Zon</a></div>
    </div>
    <div id="recipe" class="morph">
      <xsl:apply-templates select="preparationTime|category" />
      <div id="recipe-canvas">
        <xsl:apply-templates select="title|author|description|ingredients|preparation|history" />
      </div>
      <div class="extras">
        <xsl:apply-templates select="tips|nutrition"  />
      </div>
    </div>
  </div>
</xsl:template>

<xsl:template match="preparationTime">
  <div id="preparation-time">
    <div class="preptime-amount">
      <xsl:if test="$xopus='true'">
        <xsl:attribute name="class">preptime-amount</xsl:attribute>
      </xsl:if>
      <xsl:value-of select="amount" />
    </div>
    <xsl:text>&#160;</xsl:text>
    <xsl:apply-templates select="unit" />
    ,
    <div class="preptime-amount">
      <xsl:if test="$xopus='true'">
        <xsl:attribute name="class">preptime-amount</xsl:attribute>
      </xsl:if>
      <xsl:value-of select="../servings" />
    </div>
    <xsl:text>&#160;</xsl:text>
    <xsl:choose>
      <xsl:when test="../servings=1">serving</xsl:when>
      <xsl:otherwise>servings</xsl:otherwise>
    </xsl:choose>
  </div>
</xsl:template>

<xsl:template match="preparationTime/unit">
  <div class="preptime-unit">
    <xsl:if test="$xopus='true'">
      <xsl:attribute name="class">preptime-unit menu-inactive</xsl:attribute>
      <xsl:attribute name="onclick">Menu.showMenu(this, node, 'time-unit');</xsl:attribute>
    </xsl:if>
    <xsl:value-of select="." />
  </div>
</xsl:template>

<xsl:template match="category">
  <div id="category">
    category:
    <span>
      <xsl:if test="$xopus='true'">
        <xsl:attribute name="class">menu-inactive</xsl:attribute>
        <xsl:attribute name="onclick">Menu.showMenu(this, node, 'category');</xsl:attribute>
      </xsl:if>
      <xsl:value-of select="." />
    </span>
  </div>
</xsl:template>

<xsl:template match="title">
  <h1 id="title"><xsl:apply-templates select="node()" /></h1>
</xsl:template>

<xsl:template match="author">
  <div id="author">
    <span class="by">by </span>
    <span class="author-name">
      <xsl:value-of select="." />
    </span>
  </div>
</xsl:template>

<xsl:template match="description">
  <div id="description" class="quote-box">
    <h2><span>Description</span></h2>
    <div class="box-content">
      <xsl:apply-templates select="node()" />
      <span class="stopper" unselectable="on">&#160;&#160;&#160;&#160;</span>
    </div>
  </div>
</xsl:template>

<xsl:template match="ingredients">
  <div id="ingredients" class="list-box">
    <h2><span>Ingredients</span></h2>
    <ul class="box-content">
      <xsl:apply-templates select="*" />
    </ul>
  </div>
</xsl:template>

<xsl:template match="ingredient|preparation/step">
  <li>
    <span><xsl:apply-templates select="node()" /></span>
  </li>
</xsl:template>

<xsl:template match="preparation">
  <div id="preparation" class="list-box">
    <h2><span>Preparation</span></h2>
    <ol class="box-content">
      <xsl:apply-templates select="*" />
    </ol>
  </div>
</xsl:template>

<xsl:template match="history">
  <div id="history" class="quote-box">
    <h2><span>History</span></h2>
    <div class="box-content">
      <xsl:apply-templates select="node()" />
      <span class="stopper" unselectable="on">&#160;&#160;&#160;&#160;</span>
    </div>
  </div>
</xsl:template>

<xsl:template match="tips">
  <xsl:if test="$xopus='true'">
    <xsl:if test="@hidden='true'">
      <div class="showTips unhover-showTips morph" onclick="node.setAttribute('hidden', 'false');">Show Tips</div>
    </xsl:if>
  </xsl:if>

  <div id="tips">
    <xsl:attribute name="class">
      tips tips-unhover morph
      <xsl:if test="@hidden='true'"> tips-hidden</xsl:if>
    </xsl:attribute>
    <xsl:if test="$xopus='true'">
      <div class="button-close morph" onclick="node.setAttribute('hidden', 'true');" title="Hide Tips"></div>
    </xsl:if>
    <div class="box-canvas">
      <h2>Tips</h2>
      <div>
        <xsl:apply-templates select="node()" />
      </div>
    </div>
    <div class="box-shadow"></div>
  </div>
</xsl:template>

<xsl:template match="nutrition">
  <xsl:if test="$xopus='true'">
    <xsl:if test="@hidden='true'">
      <div class="showNutrition unhover-showNutrition morph" onclick="node.setAttribute('hidden', 'false');">Show Nutrition Facts</div>
    </xsl:if>
  </xsl:if>

  <div id="nutrition">
    <xsl:attribute name="class">
      nutrition nutrition-unhover morph
      <xsl:if test="@hidden='true'"> nutrition-hidden</xsl:if>
    </xsl:attribute>
    <xsl:if test="$xopus='true'">
      <div class="button-close morph" onclick="node.setAttribute('hidden', 'true');" title="Hide Nutrition Facts"></div>
    </xsl:if>
    <div class="box-canvas">
      <h2>Nutrition Facts</h2>
      <p>
        Per serving:
      </p>
      <table border="0" cellspacing="0" cellpadding="0">
        <tbody>
          <xsl:apply-templates select="*/amount" />
        </tbody>
      </table>
    </div>
    <div class="box-shadow"></div>
  </div>
</xsl:template>

<xsl:template match="amount">
  <tr>
    <th>
      <xsl:choose>
        <xsl:when test="local-name(..) = 'energy'">Energy</xsl:when>
        <xsl:when test="local-name(..) = 'protein'">Protein</xsl:when>
        <xsl:when test="local-name(..) = 'fat'">Fat</xsl:when>
        <xsl:when test="local-name(..) = 'carbohydrates'">Carbons</xsl:when>
      </xsl:choose>
    </th>
    <td>
      <div>
        <xsl:value-of select="." />&#160;&#160;
      </div>
    </td>
    <td>
      <xsl:if test="$xopus='true'">
        <xsl:attribute name="class">menu-inactive</xsl:attribute>
        <xsl:attribute name="onclick">
          Menu.showMenu(
            this, node.selectSingleNode('../unit'),
            <xsl:choose>
              <xsl:when test="local-name(..) = 'energy'">'energy-unit'</xsl:when>
              <xsl:otherwise>'mass-unit'</xsl:otherwise>
            </xsl:choose>
          );
          </xsl:attribute>
      </xsl:if>
      <xsl:value-of select="string(../unit)" />
    </td>
  </tr>
</xsl:template>

<xsl:template match="header">
  <h3>
    <xsl:apply-templates select="node()" />
  </h3>
</xsl:template>

<xsl:template match="paragraph">
  <p><xsl:apply-templates select="node()" /></p>
</xsl:template>

<xsl:template match="superscript">
  <sup><xsl:apply-templates select="node()" /></sup>
</xsl:template>

<xsl:template match="subscript">
  <sub><xsl:apply-templates select="node()" /></sub>
</xsl:template>

<xsl:template match="strong">
  <strong><xsl:apply-templates select="node()" /></strong>
</xsl:template>

<xsl:template match="emphasis">
  <em><xsl:apply-templates select="node()" /></em>
</xsl:template>

<xsl:template match="linebreak">
  <br/>
</xsl:template>

</xsl:stylesheet>
