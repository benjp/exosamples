####################################################################################### 
#                                                                                     #
# REQUIREMENTS AND CONFIGURATIONS:                                                    #
#                                                                                     #
# This is an example for saving incoming xml in Python                                #
# For this example is tested with the following configuration                         #
# 1) Apache 2.2                                                                       #
# 2) Python 2.5                                                                       #
# 3) ElementTree 1.2.6 (You can download it from : http://effbot.org/downloads/)      #
# 4) Windows XP                                                                       #
#                                                                                     #
# NOTES                                                                               #
#                                                                                     #
# - ET.XLM()                                                                          #
#   creates an xmlElement using a string as input                                     #
#                                                                                     #
# - ET.parse()                                                                        #
#   use this if you want to load from a file                                          #
#                                                                                     #
# - Somehow the rawData in python is always UNICODE.                                  #
#   So don't forget to encode it back to utf8 when you work with xml                  #
#                                                                                     #
# - XOPUS always outputs valid XML. You may wonder why we still want to               #
#   parse the incoming xml back into a XmlDom first before saving.                    #
#   Here is the reason.                                                               #
#                                                                                     #
#   If you try to write the incoming string into a file directly after calling        #
#   rawData.encode() it will add an extra newline for every newline in the string.    #
#   Somehow there is a bug in the .encode. In order to get rid of those filthy        #
#   newlines we parse it into a xmltree first before we write it back to a file       #
#                                                                                     #
#                                                                                     #
#######################################################################################

from mod_python import apache
import sys
import xml.etree.ElementTree as ET

def XML(text):
    parser = ET.XML(text)
    return ET.ElementTree(parser)

def handler(req):
  rawData = ""
  for line in req.readlines(): 
     rawData += line 
  
  rawData.encode("utf8")  

  XmlDom = XML(rawData)
  
  XmlDom.write("document.xml","utf-8")    
  
  req.write("file is saved!")
  return apache.OK