
//This function shows options for the categories
function showOptions(e, el, node)
{
  //HTML is created for a div that is defined in start.html, and adds a list of category
  var categories = document.getElementById("category_options");
  var oldlist = categories.getElementsByTagName("ul")[0];
  if(oldlist)
  {
    oldlist.parentNode.removeChild(oldlist);
  }
  //using the possible values for the node a list is generated
  var options = node.getFirstChild().getEnumeratedValues();
  var list = document.createElement("ul");
  categories.appendChild(list);
  
  for(var i = 0; i < options.getLength(); i++)
  {
    var option = options.item(i);
    var item = document.createElement("li");
    list.appendChild(item);
    var input = document.createElement("input");
    input.setAttribute("id", option+"_check");
    input.setAttribute("type","checkbox");
    input.onclick = getHandler(categories, node, option, input);
    item.appendChild(input);
    var label = document.createElement("label");
    item.appendChild(label);
    label.setAttribute("for", option+"_check");
    label.innerHTML = option;
    
    if(node.selectSingleNode("*[text() = '"+option+"']"))
      input.checked = true;
  }
  
  //a cancel option, that merely hides the option list, is added as last.
  var item = document.createElement("li");
  list.appendChild(item);
  var a = document.createElement("a");
      a.setAttribute("href","#");
  item.appendChild(a);
  a.innerHTML = "Close";
  a.onclick = hideOptions;
  
  //the the list is displayed, and positioned.
  categories.style.display = "block"; 
  
  if(e)
  {
    var bcr = (e.target || e.srcElement).getBoundingClientRect();
    
    categories.style.top = e.clientY + document.body.scrollTop + "px";//- bcr.top;
    categories.style.left = e.clientX + "px";//- bcr.left;
    
    e.cancelBubble = true;
  }
  return false;
}

function hideOptions()
{
  document.getElementById("category_options").style.display = "none";
}

Editor.addEventListener("xmlContextChange", function (evt) {
  if (evt.newNode)
  {
    if (!evt.newNode.selectSingleNode("ancestor-or-self::categories"))
    {
      //hideOptions();
    }
  }
});

//this function corrects the scope of the variables for the function that is returned
function getHandler(el, node, value, input)
{
  return function()
  {
    var parent = node;
    var doc = parent.getOwnerDocument();
    var exists = parent.selectSingleNode("*[text() = '"+value+"']");
    if(exists)
    {
      if(parent.canRemoveChild(exists))
        parent.removeChild(exists);
      else
        setTimeout(function(){input.checked = true;},50);
      el.checked = false;
    }
    else
    {
      var newcat = doc.createElement("category");
      newcat.appendChild(doc.createTextNode());
      newcat.setTextContent(value);   
      parent.appendChild(newcat);
      el.checked = true;
    }
    showOptions(null, null, node);
    return false;
  };
}
