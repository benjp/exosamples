var Menu = {
  __curMenuSpawner: null,
  __curNode: null,
  __curType: null,

  __menuEl: null,
  __itemBox: null,

  __init: function()
  {
    this.__menuEl = document.createElement("div");
    this.__menuEl.className = "xopus-menu morph-duration_200";
    this.__menuEl.unselectable = "on";
    this.__menuEl.setAttribute("unselectable", "on");

    var innerEl = document.createElement("div");
    innerEl.className = "xopus-menu-inner";
    innerEl.unselectable = "on";
    innerEl.setAttribute("unselectable", "on");
    this.__menuEl.appendChild(innerEl);

    this.__itemBox = document.createElement("div");
    this.__itemBox.className = "xopus-menu-contentcontainer exclusive-selected";
    this.__itemBox.unselectable = "on";
    this.__itemBox.setAttribute("unselectable", "on");
    innerEl.appendChild(this.__itemBox);

    Spif.DOMEvents.attach(this.__itemBox, "click", this.__doClickMenuItem, this);
    Spif.DOMEvents.attach(document.documentElement, "click", this.__doClickDocumentElement, this);
  },

  showMenu: function(el, node, menuType)
  {
    var me = this;
    Spif.Utils.setTimeoutHandler(function() { me.__showMenuNow(el, node, menuType); }, 0);
  },

  __showMenuNow: function(el, node, menuType)
  {
    if (this.__curType == menuType && this.__curNode == node)
      return;

    this.__curMenuSpawner = el;
    this.__curNode = node;
    this.__curType = menuType;

    this.__empty();

    switch (menuType)
    {
      case "category":
        this.__addItem("Breakfast", "breakfast", node.getTextContent() == "breakfast");
        this.__addItem("Picnic", "picnic", node.getTextContent() == "picnic");
        this.__addItem("Dinner", "dinner", node.getTextContent() == "dinner");
        this.__addItem("Christmas Meal", "christmas", node.getTextContent() == "christmas");
        break;
      case "time-unit":
        this.__addItem("Seconds", "seconds", node.getTextContent() == "seconds");
        this.__addItem("Minutes", "minutes", node.getTextContent() == "minutes");
        this.__addItem("Hours", "hours", node.getTextContent() == "hours");
        break;
      case "mass-unit":
        this.__addItem("Grams", "g", node.getTextContent() == "g");
        this.__addItem("Pounds", "pounds", node.getTextContent() == "pounds");
        break;
      case "energy-unit":
        this.__addItem("kCal", "kcal", node.getTextContent() == "kcal");
        this.__addItem("Joules", "joules", node.getTextContent() == "joules");
        break;
    }

    var bcr = el.getBoundingClientRect();
    var t = bcr.top;
    var l = bcr.left;
    for (var n = el; n.nodeType == 1; n = n.parentNode)
    {
      t += n.scrollTop;
      l += n.scrollLeft;
    }

    this.__menuEl.style.left = l + "px";
    this.__menuEl.style.top  = t + "px";

    document.body.insertBefore(this.__menuEl, document.body.firstChild);
    
    this.__selectContents();
  },

  __doClickMenuItem: function(evt)
  {
    if (Spif.ClassNameAbstraction.contains(evt.subject, "xopus-menu-item"))
    {
      var me = this;
      var value = evt.subject.val;
      Spif.ClassNameAbstraction.replace(evt.subject, "unselected", "selected");

      Editor.runInTransaction(function() { me.__curNode.setTextContent(value); });
      this.__selectContents();
    }
  },

  __doClickDocumentElement: function()
  {
    if (Menu.__curType)
    {
      Menu.__menuEl.parentNode.removeChild(Menu.__menuEl)
      Menu.__curType = null;
    }
  },

  __empty: function()
  {
    while (this.__itemBox.firstChild)
      this.__itemBox.removeChild(this.__itemBox.firstChild);
  },
  __addItem: function(label, val, isSelected)
  {
    var el = document.createElement("a");
    el.href = "#";
    el.className = "xopus-menu-item activation-box inactivator selector xopus-menu-item-unhover " + (isSelected?"xopus-menu-item-selected":"xopus-menu-item-unselected");
    el.unselectable = "on";
    el.setAttribute("unselectable", "on");
    el.innerHTML = label;
    el.val = val;

    this.__itemBox.appendChild(el);
  },
  
  __selectContents: function()
  {
    var rng = Editor.Selection.getRange();
    rng.selectNodeContents(Menu.__curNode);
    Editor.Selection.setRange(rng);
  }

};

Menu.__init();
