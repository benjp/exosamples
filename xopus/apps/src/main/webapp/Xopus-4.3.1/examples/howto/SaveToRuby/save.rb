####################################################################################### 
#                                                                                     #
# REQUIREMENTS AND CONFIGURATIONS:                                                    #
#                                                                                     #
# This is an example for saving incoming xml in Ruby on Rails                         #
# For this example is tested with the following configuration                         #
# 1) Apache 2.2                                                                       #
# 2) Ruby on Rails 186-25                                                             #
# 3) RubyGems                                                                         #
# 4) libxml-ruby (if you want to use xmldom)                                          #
# 5) Windows XP                                                                       #
#                                                                                     #
# NOTES                                                                               #
#                                                                                     #
# - replace MySaveController with your own save class                                 #
# - replace pathRoot with your own root to document                                   #
# - if you want to parse it into an xmldom first then you can use                     #
#   XmlDom = XML::Parser.string(data).parse                                           #
#                                                                                     #
#######################################################################################


class MySaveController < ApplicationController
  def index
    data   = @request.env["RAW_POST_DATA"]    
        @content_type = "application/xml"
        pathRoot = "C:/xxx"
        fileName = "document.xml"
        
        File.open("#{pathRoot}/#{fileName}","wb") do |file| 
            file.puts data
        end
        
    render_text "document saved"
  end
  
end
