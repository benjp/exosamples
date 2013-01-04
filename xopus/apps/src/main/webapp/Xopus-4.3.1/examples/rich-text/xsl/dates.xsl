<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="*" mode="drawDate" >
    <xsl:param name="day" select="substring-after(substring-after(., '-'), '-')" />
    <xsl:param name="month" select="substring-before(substring-after(., '-'), '-')" />
    <xsl:param name="year" select="substring-before(., '-')" />
    <span>
      <xsl:call-template name="weekday">
        <xsl:with-param name="year" select="$year"/>
        <xsl:with-param name="month" select="$month"/>
        <xsl:with-param name="day" select="$day"/>
      </xsl:call-template>
      <xsl:text>&#160;</xsl:text>
      <xsl:call-template name="month">
        <xsl:with-param name="m" select="$month" />
      </xsl:call-template>
      <xsl:text>&#160;</xsl:text>
      <xsl:value-of select="number($day)" />
      <xsl:call-template name="daystring">
        <xsl:with-param name="d" select="$day" />
      </xsl:call-template>
      <xsl:text> </xsl:text>
      <xsl:value-of select="$year" />
    </span>
  </xsl:template>

  <!-- dates -->
  <xsl:template name="daystring">
    <xsl:param name="d" />
    <sup>
      <xsl:choose>
        <xsl:when test="$d = '01' or $d = '1' or $d = '21' or $d = '31'">st</xsl:when>
        <xsl:when test="$d = '02' or $d = '2' or $d = '22'">nd</xsl:when>
        <xsl:when test="$d = '03' or $d = '3' or $d = '23'">rd</xsl:when>
        <xsl:otherwise >th</xsl:otherwise>
      </xsl:choose>
    </sup>
  </xsl:template>

  <xsl:template name="month">
    <xsl:param name="m" />
    <xsl:choose>
      <xsl:when test="$m = '1' or $m = '01'">January</xsl:when>
      <xsl:when test="$m = '2' or $m = '02'">February</xsl:when>
      <xsl:when test="$m = '3' or $m = '03'">March</xsl:when>
      <xsl:when test="$m = '4' or $m = '04'">April</xsl:when>
      <xsl:when test="$m = '5' or $m = '05'">May</xsl:when>
      <xsl:when test="$m = '6' or $m = '06'">June</xsl:when>
      <xsl:when test="$m = '7' or $m = '07'">July</xsl:when>
      <xsl:when test="$m = '8' or $m = '08'">August</xsl:when>
      <xsl:when test="$m = '9' or $m = '09'">September</xsl:when>
      <xsl:when test="$m = '10' or $m = '10'">October</xsl:when>
      <xsl:when test="$m = '11' or $m = '11'">November</xsl:when>
      <xsl:when test="$m = '12' or $m = '12'">December</xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="weekday">
    <xsl:param name="year" />
    <xsl:param name="month" />
    <xsl:param name="day" />
    <xsl:variable name="a" select="floor((14 - $month) div 12)" />
    <xsl:variable name="y" select="$year - $a" />
    <xsl:variable name="m" select="$month + 12 * $a - 2" />
    <xsl:variable name="weekday" select="($day + $y + floor($y div 4) - floor($y div 100) + floor($y div 400) + floor((31 * $m) div 12)) mod 7" />
    <xsl:choose>
      <xsl:when test="$weekday=0">Sunday</xsl:when>
      <xsl:when test="$weekday=1">Monday</xsl:when>
      <xsl:when test="$weekday=2">Tuesday</xsl:when>
      <xsl:when test="$weekday=3">Wednesday</xsl:when>
      <xsl:when test="$weekday=4">Thursday</xsl:when>
      <xsl:when test="$weekday=5">Friday</xsl:when>
      <xsl:when test="$weekday=6">Saturday</xsl:when>
      <xsl:otherwise></xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
</xsl:stylesheet> 

