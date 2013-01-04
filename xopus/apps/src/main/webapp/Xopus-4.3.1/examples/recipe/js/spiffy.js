

 var $=window["Spif"]={
 d:"undefined",
 e:"*",
 f:" ",

 g:"none",

 h:"threadStart",
 j:"threadEnd",
 k:"beforeChangeClassName",
 l:"afterChangeClassName",
 m:"beforeHtmlChanged",
 n:"afterHtmlChanged",
 o:"beforeAction",
 r:"afterElementActivation",
 t:"linkExecuteRequest",
 v:400,
 w:"loaded",
 z:"unloaded\\b|\\bloading\\b|\\bloaded",

 B:"load",
 C:"click",
 D:"keydown",
 F:"keypress",
 G:"mousedown",
 H:"mousemove",
 I:"mouseup",

 J:"DXImageTransform.Microsoft.Alpha",

 K:true,
 L:false,

 M:"onBefore",
 N:"onFinish",

 O:"-delay",


 P:(typeof(window.opera)!="undefined"),
 Q:(navigator.userAgent.indexOf("MSIE")!=-1)&&!window.opera,
 R:(navigator.userAgent.indexOf("MSIE 7")!=-1)&&!window.opera&&(typeof(XMLHttpRequest)!="undefined"),
 S:((navigator.userAgent.indexOf("Gecko")!=-1)&&(navigator.appVersion.indexOf("AppleWebKit")==-1)),
 T:(navigator.appVersion.indexOf("AppleWebKit")!=-1),

 U:document.documentElement,

 V:function(W)
{
 if($.X)
 for(var Y in $)
 if($[Y]==W)


 $.X.Z(W,"Spif."+Y);

 if(W._$)
 W._$();
}
};

 $["isIE"]=$.Q;
 $["isIE7"]=$.R;
 $["isOpera"]=$.P;
 $["isGecko"]=$.S;
 $["isSafari"]=$.T;
 $["DEFAULTMORPHDURATION"]=$.v;
 $["SUPPRESSEVENTS"]=$.K;
 $["FIREEVENTS"]=$.L;




























 $.l$={
 m$:function(n$,delay,W,o$)
{
 if(delay>=0)
 return setTimeout(this.p$(n$,W,o$),delay);
 else
{
 n$.apply(W||window,o$||[]);
 return null;
}
},
 q$:function(n$,r$,W,o$)
{
 var s$=this.p$(n$,W,o$);
 s$();
 return setInterval(s$,r$);
},

 p$:function(n$,W,o$)
{
 return function()
{
 $.t$.u$($.h,null,null);
 n$.apply(W||window,o$||[]);
 $.t$.u$($.j,null,null);
};
},

 v$:function(w$,x$,y$,z$,A$)
{
 var B$={};
 B$.C$=$.D$.E$(w$,x$);
 if(B$.C$)
{
 B$.F$=$.G$.H$(B$.C$,x$,z$);
 B$.object=$.D$.E$(B$.C$,y$);
 if(B$.object)
 B$.I$=$.G$.H$(B$.object,y$,A$);
}
 return B$;
},
 J$:function(s,K$)
{
 return s?Function("a","b","c","d","e","return "+s+"(a, b, c, d, e);"):K$;
},
 L$:function(w$,M$,N$,O$,P$)
{
 return this.Q$(w$,M$,N$,O$,P$).R$[0];
},
 S$:function(w$,M$,N$,O$,P$)
{
 return this.Q$(w$,M$,N$,O$,P$).R$;
},
 Q$:function(w$,M$,N$,O$,P$)
{
 var T$={
 R$:[],
 w$:null
};
 var U$;
 do
{
 if(!(U$=$.G$.match(w$,M$+"-[\\w-]+")))
 w$=w$.parentNode;
}
 while(!U$&&!O$&&w$&&w$.nodeType==1);

 if(U$)
 for(var i=0;i<U$.length;i++)
{
 var s=U$[i].substring(M$.length+1);
 if(!P$||!P$[s])
{
 T$.R$.push(s);
 T$.w$=w$;
}
}

 if((N$!=null)&&(T$.R$.length==0))
 T$.R$[0]=N$;
 return T$;
},
 V$:function(w$,W$,X$,O$)
{
 var U$;
 do
{
 U$=$.G$.match(w$,W$+"-?\\d+");
 w$=w$.parentNode;
}
 while(!O$&&w$&&w$.nodeType==1&&!U$);
 return(U$?parseInt(U$[0].substring(W$.length)):X$);
},
 Y$:function(a)
{
 var Z$={};
 for(var i=0;i<a.length;i++)
 Z$[a[i]]=1;
 return Z$;
},
 $a:function(w$,Y,aa)
{
 var ba=w$.ca;
 if(!ba)
 ba=w$.ca={};

 ba[Y]=aa;
},
 da:function(w$,Y)
{
 var ba=w$.ca;
 if(!ba)
 return null;
 else
 return ba[Y];
}
};

 $.l$.platform=($.R?"ie7":($.Q?"ie":($.S?"gecko":($.P?"opera":($.T?"safari":"unknown")))));



 if(!Array.prototype.push)
{
 Array.prototype.push=function()
{
 for(var i=0;i<arguments.length;i++)
 this[this.length]=arguments[i];
};
}

 if(!Function.prototype.apply)
{
 Function.prototype.apply=function(W,o$)
{
 W.ea=this;
 var fa=W.ea(o$[0],o$[1],o$[2],o$[3],o$[4]);
 W.ea=null;
 return fa;
}
}

 $.V($.l$);

 $["Utils"]=$.l$;
 $.l$["setTimeoutHandler"]=$.l$.m$;
 $.l$["setIntervalHandler"]=$.l$.q$;
 $.D$={
 ga:1,
 ha:{},

 ia:function(w$)
{
 if(!w$.id)
{
 var id="qid_"+this.ga++;
 w$.id=id;
 this.ha[id]=true;
}

 return w$.id;
},

 ja:function(w$)
{
 var ka=[];

 if(w$.id&&!this.ha[w$.id])
 ka[0]=w$;

 var la=w$.getElementsByTagName($.e);
 var ma=la.length;
 for(var i=0;i<ma;i++)
{
 var w$=la[i];
 if(w$.id&&!this.ha[w$.id])
 ka[ka.length]=w$;
}

 return ka;
},
 E$:function(w$,na)
{
 while(w$&&w$.nodeType==1)
{
 if($.G$.contains(w$,na))
 return w$;

 w$=w$.parentNode;
}
},
 oa:function(w$,na)
{
 var pa=w$.getElementsByTagName("*");
 var qa=pa.length;
 for(var i=0;i<qa;i++)
 if($.G$.contains(pa[i],na))
 return pa[i];
},
 getElementsByTagName:function(w$,tagName)
{
 var ra=[];
 var sa=w$.getElementsByTagName(tagName);
 var ta=sa.length;
 for(var i=0;i<ta;i++)
 ra.push(sa[i]);

 return ra;
},
 ua:function(va,wa)
{
 if($.Q)
 return va.contains(wa);

 while(wa)
{
 if(va==wa)
 return true;
 else
 wa=wa.parentNode;
}

 return false;
},
 xa:function(ya,za)
{
 if(!ya||!za||ya==za)
 return ya||za;

 while(ya)
{
 if(this.ua(ya,za))
 return ya;
 ya=ya.parentNode;
}
},
 Aa:function(w$)
{
 if($.Q)
 return w$.style.cssText;
 else
 return w$.getAttribute("style");
},
 Ba:function(w$,s)
{
 if($.Q)
 w$.style.cssText=s;
 else
 w$.setAttribute("style",s);
}
};

 $.V($.D$);

 $["HtmlDomUtils"]=$.D$;
 $.D$["acquireIdForHtmlElement"]=$.D$.ia;

 $.D$["getAncestorWithClassName"]=$.D$.E$;



























































 $.G$={
 Ca:/\s+/,

 Da:{},
 Ea:{},
 Fa:function(na,Ga,r$)
{
 this.Ea[na]={
 Ga:Ga,
 Ha:"(\\b"+Ga.join("-"+na)+"-"+na+"\\b|\\b"+na+"\\b)",
 r$:r$||1.1*$.v
};
},

 contains:function(w$,na)
{
 return this.Ia(w$.className,na);
},
 Ia:function(s,na)
{

 return!!(s&&s.match(this.Ja(na)));
},
 match:function(w$,na)
{
 return w$.className.match(this.Ja(na));
},
 add:function(w$,Ka,La)
{
 if(!this.contains(w$,Ka))
 if(this.Ea[Ka])
 this.Ma(w$,null,Ka,0,La);
 else
{
 var Na=w$.className;
 var Oa=Na+$.f+Ka;
 this.Pa(w$,Na,Oa,La);
}
},
 replace:function(w$,Qa,Ka,La,Ra)
{
 if(this.contains(w$,Qa))
{
 if(this.Ea[Qa])
 Qa=this.Ea[Qa].Ha;

 if(!Ra&&this.Ea[Ka])
 this.Ma(w$,Qa,Ka,0,La);
 else
 this.Pa(w$,w$.className,this.Sa(w$.className,Qa,Ka),La);
}
},
 Sa:function(s,Ta,Ua)
{
 var Va=s.replace(this.Ja(Ta),Ua);
 if(!Va.match(this.Ja(Ua)))
 Va+=$.f+Ua;

 return Va;
},
 Wa:function(w$,Xa,Ya,La,Ra)
{
 if(this.contains(w$,Ya))
{
 var Za=Xa;
 Xa=Ya;
 Ya=Za;
}
 this.replace(w$,Xa,Ya,La,Ra);
},
 remove:function(w$,Qa,La)
{
 if(this.Ea[Qa])
 Qa=this.Ea[Qa].Ha;

 this.Pa(w$,w$.className,w$.className.replace(this.Ja(Qa),""),La);
},
 d$:function(w$,Oa,La)
{
 this.Pa(w$,w$.className,Oa,La);

 var na;
 var _b=Oa.split(this.Ca);
 for(var i=0;i<_b.length;i++,na=_b[i])
 if(this.Ea[na])
{
 this.Ma(w$,na,na,0,La);
 return;
}
},

 $b:new RegExp("(-[^_-]+)|(_-\\d+)|(_\\w+)","g"),
 ab:{
 "delay":"int",
 "delayOn":"int",
 "delayOff":"int",
 "delaySwap":"int",
 "duration":"int",
 "delta":"int",
 "max":"int",
 "interval":"int",
 "onBefore":"function",
 "onFinish":"function",
 "props":"array",
 "classes":"array",
 "limitmorphto":"array",
 "replace":"array"
},
 H$:function(w$,bb,cb)
{
 var db=null;
 var eb=this.Ja(bb+"\\b-?([\\w\\-\\_]*)\\b");

 var matches=w$.className.match(eb);
 if(matches)
{
 db={};
 if(cb)
 for(var j$ in cb)
 db[j$]=cb[j$];

 db.fb=matches[0].split("-")[0];

 for(var gb=0;gb<matches.length;gb++)
{
 var b$=matches[gb].match(this.$b);
 if(b$)
 for(var i=0;i<b$.length;i++)
{
 var Y=b$[i].substring(1);
 if(i<b$.length-1&&b$[i+1].charAt(0)=="_")
{
 var aa=b$[i+++1].substring(1);
 switch(this.ab[Y])
{
 case "function":
 aa=$.l$.J$(aa);
 break;
 case "int":
 aa=parseInt(aa);
 break;
 case "array":
 aa=aa.split("_");
 break;
}
 db[Y]=aa;
}
 else
{
 db[Y]=true;
 db.action=Y;
}
}
}
}

 return db;
},



 hb:null,
 ib:function()
{
 this.hb={
 jb:null,
 setData:[]
};
},

 kb:function()
{
 var lb=this.hb;

 this.hb=null;

 if(lb.setData.length>0)
{
 var mb=this.nb(lb.ob,lb.jb.className,false);

 $.t$.u$($.k,lb.jb,mb);

 for(var i=0;i<lb.setData.length;i++)
{
 var pb=lb.setData[i];
 this.Pa(pb.w$,pb.Na,pb.Oa,$.L,true);
}

 $.t$.u$($.l,lb.jb,mb);
}
},

 qb:function(w$,db)
{
 for(var name in db)
 switch(name)
{
 case "add":
 this.add(w$,db[name]);
 break;
 case "remove":
 this.remove(w$,db[name]);
 break;
 case "replace":
 this.replace(w$,db[name][0],db[name][1]);
 break;
 case "set":
 this.d$(w$,db[name]);
 break;
 case "empty":
 this.d$(w$,"");
 break;
}
},
 Ja:function(na)
{
 return this.Da[na]||(this.Da[na]=new RegExp("\\b"+na+"\\b","g"));
},
 Pa:function(w$,Na,Oa,La,rb)
{
 Oa=Oa.replace(/^\s+|\s+$/g,"");
 if(Oa!=Na)
{
 if(this.hb)
{
 var sb=$.D$.xa(this.hb.jb,w$);
 if(sb!=this.hb.jb)
{
 this.hb.jb=sb;
 this.hb.ob=sb.className;
}

 this.hb.setData.push(
{
 w$:w$,
 Na:Na,
 Oa:Oa
}
);
}
 else
{
 if(!La)
{
 var tb=this.nb(Na,Oa,rb);
 $.t$.u$($.k,w$,tb);
}
 w$.className=Oa;
 if(!La)
 $.t$.u$($.l,w$,tb);

 if($.Q)
{




 if(w$.getAttribute("tabIndex",2)==0)
{
 w$.tabIndex=-1;
 setTimeout(function(){w$.tabIndex=0;},0);
}
}
}
}
},
 Ma:function(w$,Qa,na,ub,La)
{
 var data=this.Ea[na];
 var Ga=data.Ga;

 var Ka=Ga[ub]+"-"+na;

 $.l$.$a(w$,$.v,data.r$);

 if(Qa&&this.contains(w$,Qa))
 this.replace(w$,Qa,Ka,La,true);
 else
 this.add(w$,Ka,La,true);

 var vb=this;
 if(ub<Ga.length-1)
 $.l$.m$(function(){vb.Ma(w$,Ka,na,ub+1,La);},data.r$);
 else
 $.l$.m$(function(){if(vb.contains(w$,Ka))vb.replace(w$,Ka,na,La,true);},data.r$);
},

 nb:function(Na,Oa,rb)
{
 var wb=Na.split(this.Ca);
 var xb=Oa.split(this.Ca);

 var yb={};
 for(var i=0;i<wb.length;i++)
{
 yb[wb[i]]=1;

 var zb=wb[i].split(/[-_]/);
 for(var Ab=0;Ab<zb.length;Ab++)
 yb[zb[Ab]]=1;
}

 var Bb=[];
 for(var i=0;i<xb.length;i++)
{
 if(!yb[xb[i]])
 Bb.push(xb[i]);
 var Cb=xb[i].split(/[-_]/);
 for(var Ab=0;Ab<Cb.length;Ab++)
 if(!yb[Cb[Ab]])
 Bb.push(Cb[Ab]);
}

 var Db=[];
 for(var i=0;i<wb.length;i++)
 if(!Bb[wb[i]])
 Db.push(wb[i]);

 return{fromValue:Na,toValue:Oa,Db:Db,Bb:Bb,rb:rb};
}
};

 $.V($.G$);

 $["ClassNameAbstraction"]=$.G$;
 $.G$["addClassNameSequence"]=$.G$.Fa;
 $.G$["contains"]=$.G$.contains;
 $.G$["add"]=$.G$.add;
 $.G$["replace"]=$.G$.replace;
 $.G$["toggle"]=$.G$.Wa;
 $.G$["remove"]=$.G$.remove;
 $.G$["set"]=$.G$.d$;


























 $.Eb={

















 Fb:false,
 Gb:{},
 Hb:{},

 Ib:function(Jb,Kb,n$,W)
{
 var Lb={n$:n$,W:W};
 var Mb=$.D$.ia(Jb)+"-"+Kb;

 var Nb=this.Gb[Mb];
 if(this.Hb[Mb]==Jb&&Nb)
 Nb.push(Lb);
 else
{
 this.Hb[Mb]=Jb;
 Nb=this.Gb[Mb]=[Lb];

 var s$=function(Ob)
{


 if(typeof($)!="undefined")
{



 $.t$.u$($.h,Ob);

 Ob=$.Eb.Pb(Ob);



 if(Ob.type==$.C&&$.S&&Ob.Qb)
 return false;

 var fa=false;

 var o$=[Ob,Jb];
 for(var i=0;i<Nb.length;i++)
 fa=Nb[i].n$.apply(Nb[i].W||Jb,o$)&&fa;


 $.t$.u$($.j,Ob);

 return fa;
}
};
 if($.X)
{
 var W={Rb:s$};
 $.X.Sb(W,"eventHandler","Spif.DOMEvents."+Kb);
 s$=W.Rb;
}



























 if(Jb.addEventListener)
 Jb.addEventListener(Kb,s$,false);
 else
{
 if(Kb=="DOMMouseScroll")
 Kb="mousewheel";
 Jb.attachEvent("on"+Kb,s$);
}
}
},

 Tb:function()
{
 this.preventDefault();
 this.stopPropagation();

 if($.T&&this.type==$.C)
{
 var w$=this.subject;
 while(w$&&w$.nodeName!="A")
 w$=w$.parentNode;

 if(w$)
{
 w$.Ub=w$.href;
 w$.href="javascript://";
 setTimeout(function(){w$.href=w$.Ub;},10);
}
}
},
 Vb:function()
{
 this.returnValue=false;
},
 Wb:function()
{
 this.cancelBubble=true;
},

 Pb:function(Ob)
{

 if($.Q)
{
 Ob.subject=Ob.srcElement;
 Ob.preventDefault=this.Vb;
 Ob.stopPropagation=this.Wb;
}
 else
{
 Ob.subject=Ob.target||Ob.currentTarget;
 if(Ob.subject&&Ob.subject.nodeType==3)
 Ob.subject=Ob.subject.parentNode;
}

 Ob.cancel=this.Tb;

 switch(Ob.type)
{
 case $.C:
 case "mousedown":
 case "mouseup":
 case "mousemove":
 Ob.Xb=($.Q||$.T?Ob.button==1:Ob.button==0);
 Ob.Qb=Ob.button==2;
 break;
 case $.D:
 case "keyup":
 case $.F:
 if($.Q&&Ob.subject.isContentEditable)
{
 var Yb=document.selection.createRange();
 if(Yb.length)
 Ob.subject=Yb.item(0);
 else
 Ob.subject=Yb.parentElement();
}

 if($.S&&Ob.subject==document.documentElement)


 Ob.subject=document.body;
 break;
 case "mousewheel":
 if($.Q)
 Ob.detail=-Ob.wheelDelta/20;
 break;
}

 return Ob;
}
};

 $["DOMEvents"]=$.Eb;
 $.Eb["attach"]=$.Eb.Ib;
 $.t$={
 Zb:{},
 _c:function(Kb,n$,W)
{
 var $c=this.Zb[Kb]=this.Zb[Kb]||[];

 $c[$c.length]={n$:n$,W:W};
},
 u$:function(Kb,subject,b$)
{
 var fa=true;

 var $c=this.Zb[Kb];
 if($c)
{
 var Ob=b$||{};
 Ob.type=Kb;
 Ob.subject=subject;

 for(var i=$c.length-1;i>=0;i--)
 fa=($c[i].n$.apply($c[i].W||subject,[Ob])!=false)&&fa;
}

 return fa;
}
};

 $["CustomEvents"]=$.t$;
 $.t$["listen"]=$.t$._c;
 $.t$["fire"]=$.t$.u$;











 $.ac={
 bc:"A",

 _$:function()
{
 $.t$._c($.l,this.cc,this);
 $.t$._c($.n,this.dc,this);
},
 cc:function(Ob)
{
 if(Ob.Bb.length>0&&$.t$.u$($.o,Ob.subject))
 this.ec(Ob.subject,Ob.Bb);
},
 dc:function(Ob)
{
 if($.t$.u$($.o,Ob.subject))
 this.ec(Ob.subject,[$.B]);
},
 ec:function(fc,gc,context)
{

 for(var i=0;i<gc.length;i++)
 $.t$.u$("on"+gc[i],fc);

 var hc="\\bon"+gc.join("\\b|\\bon")+"\\b";
 for(var ic=fc.firstChild;ic;ic=ic.nextSibling)
 if(ic.nodeName=="A"&&$.G$.contains(ic,hc))
 $.t$.u$($.t,ic,{context:context});
}
};

 $.V($.ac);














 $.jc={
 kc:[],
 lc:null,
 mc:{},
 nc:{},
 oc:null,
 pc:null,
 qc:false,
 _$:function()
{
 $.Eb.Ib(document.documentElement,$.C,this.rc,this);




 $.Eb.Ib(document.documentElement,($.Q?$.D:$.F),this.rc,this);
},
 sc:function(na,n$,W)
{
 this.tc(na,n$,W,true);
},
 uc:function(na,n$,W)
{
 this.tc(na,n$,W,false);
 this.qc=true;
},
 tc:function(na,n$,W,vc)
{
 this.kc[this.kc.length]=na;
 this.mc[na]={n$:n$,W:W};
 this.nc[na]=vc;

 this.kc=this.kc.sort().reverse();

 this.lc=new RegExp("(\\b"+this.kc.join("\\b)|(\\b")+"\\b)|(\\b[\\w\\-]+\\b|\\s+)","g");
},
 rc:function(Ob)
{
 this.pc=(Ob.type==$.C||Ob.keyCode==13||Ob.keyCode==32);

 if(!this.qc&&!this.pc)
 return;

 this.oc=Ob;
 var la=[];

 for(var w$=Ob.subject;w$&&w$.nodeType==1;w$=w$.parentNode)
 la[la.length]=w$;

 for(var i=0;i<la.length;i++)
{
 this.wc=la[i];
 if(this.wc.className)
 this.wc.className.replace(this.lc,this.xc);
}
},
 xc:function()
{
 if(!arguments[arguments.length-3])
{
 var vb=$.jc;
 for(var i=1;i<arguments.length-3;i++)
 if(arguments[i])
{
 var na=vb.kc[i-1];
 if(vb.pc||!vb.nc[na])
{
 if($.t$.u$($.o,vb.wc))
{
 var n$=vb.mc[na];
 n$.n$.apply(n$.W||vb.wc,[vb.wc,arguments[i],vb.oc]);
}
 return;
}
}
}
}
};

 $.V($.jc);





 $.yc={
 zc:[],
 Ac:"",
 Bc:{},
 Cc:{},
 Dc:[],

 _$:function()
{
 $.Eb.Ib(document.documentElement,$.C,this.Ec,this);
 $.Eb.Ib(document.documentElement,"dblclick",this.Ec,this);
 $.Eb.Ib(document.documentElement,"keyup",this.Fc,this);
 $.t$._c($.t,this.Gc,this);
},
 Hc:function(Ic,W)
{
 this.Dc.push({n$:Ic,W:W});
},
 Jc:function(Kc,Lc,Ic,W)
{
 var Mc="("+Lc.join("|")+")";
 for(var i=0;i<Kc.length;i++)
{
 var bb=Kc[i];
 this.zc[this.zc.length]=bb;
 this.Bc[bb]=Mc;
 this.Cc[bb]={n$:Ic,W:W};
}

 this.Ac="(\\b"+this.zc.join("\\b|\\b")+"\\b)";
},
 Ec:function(Ob)
{
 this.Gc(Ob);
},
 Fc:function(Ob)
{
 if(Ob.keyCode==32||Ob.keyCode==13)
 this.Gc(Ob);
},
 Gc:function(Ob)
{
 var Kc;
 var w$=Ob.subject;


 while(w$&&w$.nodeType==1)
{


 if(Ob.type==$.F&&w$.nodeName=="A")
 return;

 if((Kc=$.G$.match(w$,this.Ac))&&$.t$.u$($.o,w$))
{
 var Nc={};

 for(var i=0;i<Kc.length;i++)
{
 var bb=Kc[i];
 if(bb&&!Nc[bb])
{
 var Oc=$.G$.H$(w$,bb);
 if(
(!Oc["require"]||$.D$.E$(w$,Oc["require"]))
&&
(!Oc["disallow"]||!$.D$.E$(w$,Oc["disallow"]))
)
{
 var Pc=this.Qc(w$,bb,Ob.context);
 if(!Pc||!Pc.w$||!$.t$.u$($.o,Pc.w$))
 continue;

 var Rc=$.G$.H$(Pc.w$,Pc.Sc);
 if(
(!Rc["require"]||$.D$.E$(w$,Rc["require"]))
&&
(!Rc["disallow"]||!$.D$.E$(w$,Rc["disallow"]))
)
 Nc[bb]={
 Tc:this.Cc[bb],
 Pc:Pc,
 Oc:Oc,
 Rc:Rc
};
}
}
}

 for(bb in Nc)
{
 var Uc=Nc[bb];
 $.l$.m$(this.Vc(Ob,w$,bb,Uc),1*Uc.Oc.delay||-1);
}
}

 if(w$.nodeName=="A")
{
 for(var i=0;i<this.Dc.length;i++)
{
 var n$=this.Dc[i];
 n$.n$.apply(n$.W||w$,[w$,Ob]);
}


 if(Ob.cancel&&Kc&&Kc.length>0&&w$.getAttribute("href",2).charAt(0)=="#")
 Ob.cancel();
}

 w$=w$.parentNode;
}
},

 Vc:function(Ob,w$,bb,Uc)
{
 return function()
{
 Uc.Tc.n$.apply(Uc.Tc.W||w$,[w$,bb,Uc.Pc.w$,Uc.Pc.Sc,Ob,Uc.db]);
};
},

 Qc:function(Wc,bb,context)
{
 var Xc=this.Yc(Wc,bb,context);

 if(Xc)
{
 var Zc=$.G$.match(Xc,this.Bc[bb]);
 return{w$:Xc,Sc:(Zc?Zc[0]:null)};
}
},
 Yc:function(Wc,bb,context)
{
 var _d=Wc.href;
 if(_d)
 var $d=_d.split("#")[1];

 if($d)
 return document.getElementById($d);


 for(var w$=context||Wc;w$!=document.documentElement;w$=w$.parentNode)
 if($.G$.match(w$,this.Bc[bb]))
 return w$;
}
};

 $.V($.yc);












 $.t$._c(
 $.o,
 function(Ob)
{
 return!$.D$.E$(Ob.subject,"actions-disabled");
}
);
(function(){
 $.ad={
 bd:"exclusive-",
 cd:"allexclusive-",
 ed:"delayexclusive",

 fd:1,
 gd:{},
 hd:{},
 jd:{},
 kd:{},
 ld:{},
 md:{},
 nd:{},
 od:{},

 _$:function()
{
 $.t$._c($.h,this.pd,this);
 $.t$._c($.l,this.cc,this);
},

 qd:function(Kc,rd,sd,ud)
{
 var id=this.fd++;
 var vd=rd[rd.length-1];
 for(var i=0;i<Kc.length;i++)
{
 var bb=Kc[i];
 var wd=rd[i];

 this.jd[vd]=wd;
 this.kd[wd]=vd;

 vd=wd;

 this.gd[bb]=wd;
 this.hd[wd]=bb;
 this.ld[bb]=id;
}

 if(sd)
{
 Kc[Kc.length]=sd;
 this.md[sd]=true;
 this.gd[sd]=rd[0];
}
 if(ud)
{
 Kc[Kc.length]=ud;
 this.nd[ud]=true;
 this.gd[ud]=rd[0];
}

 $.yc.Jc(Kc,rd,this.xd,this);
},

 pd:function()
{
 this.od={};
},
 cc:function(Ob)
{
 var yd=[];

 for(var i=0;i<Ob.Bb.length;i++)
 this.zd(Ob.subject,Ob.Bb[i],yd);

 for(var i=yd.length-1;i>=0;i--)
 this.Ad(yd[i]);
},
 xd:function(Wc,bb,Xc,Bd)
{
 var yd=[];
 this.Cd(yd,bb,Xc,Bd);

 $.G$.ib();
 for(var i=yd.length-1;i>=0;i--)
 this.Ad(yd[i]);
 $.G$.kb();
},
 Cd:function(yd,bb,Xc,Bd)
{
 var Dd=this.gd[bb];

 if(this.md[bb])
{
 Dd=this.jd[Bd];
 bb=this.hd[Dd];
}
 else if(this.nd[bb])
{
 Dd=this.kd[Bd];
 bb=this.hd[Dd];
}

 if(!$.G$.contains(Xc,Dd))
{
 yd[yd.length]={
 bb:bb,
 Xc:Xc,
 Ed:Bd,
 Dd:Dd,
 delay:-1
};

 this.zd(Xc,Dd,yd);
}
},

 zd:function(Xc,Dd,yd)
{
 var Fd,Gd;
 if($.D$.E$(Xc,this.bd+Dd))
 Gd=Xc.parentNode.childNodes;
 else if(Fd=$.D$.E$(Xc,this.cd+Dd))
 Gd=$.D$.getElementsByTagName(Fd,$.e);
 if(Gd)
{
 var Hd=this.jd[Dd];
 var Id=this.hd[Hd];

 var Jd=Gd.length;
 for(var i=0;i<Jd;i++)
{
 var Kd=Gd[i];

 if(Kd.nodeType==1&&Kd!=Xc&&$.G$.contains(Kd,Dd))
 if($.t$.u$($.o,Kd))
{
 if(yd.length>0&&yd[yd.length-1].delay==-1)
 yd[yd.length-1].delay=$.l$.V$(Xc.parentNode,this.ed,-1);

 this.Cd(yd,Id,Kd,Dd);
}
}
}
},

 Ad:function(Ld)
{
 var Md=$.D$.ia(Ld.Xc)+"-"+this.ld[Ld.bb];
 if(!this.od[Md])
{
 this.od[Md]=true;

 $.l$.m$(
 function()
{

 $.G$.replace(Ld.Xc,Ld.Ed,Ld.Dd,$.L);
},
 Ld.delay
);
}
}
};

 $.V($.ad);

 $["Behaviors"]=$.ad;
 $.ad["addStateSequence"]=$.ad.qd;


 $.ad.qd(["collapser","expander"],["collapsed","expanded"],"expandedToggle");
 $.ad.qd(["opener","closer"],["open","close"],"openToggle");
 $.ad.qd(["selector","unselector"],["selected","unselected"],"selectedToggle");
 $.ad.qd(["shower","hider"],["shown","hidden"],"shownToggle");
 $.ad.qd(["focuser","blurrer"],["focus","blur"],"focusToggle");
 $.ad.qd(["onswitch","offswitch"],["on","off"],"onToggle");
 $.ad.qd(["upper","downer"],["up","down"],"upToggle");
 $.ad.qd(["enabler","disabler"],["enabled","disabled"],"enabledToggle");
})();$.yc.Jc(
["classchanger"],
[],
 function(Wc,x,Xc)
{
 var db=$.G$.H$(Wc,"classchanger");
 $.l$.m$(
 function()
{
 $.G$.qb(Xc,db);
},
 db["delay"]
);
}
);
 $.yc.Jc(
["execute"],
[],
 function(Wc,x,Xc)
{
 var Nd=$.l$.L$(Wc,"execute","",true);

 if(Nd)
 $.l$.J$(Nd)(Wc,Xc);
}
);
 $.Od=
{
 Pd:"activation-inert",
 Qd:"delayOn",
 Rd:"delayOff",
 Sd:"delaySwitch",
 Td:[],
 Ud:[],
 Vd:{},
 Wd:{},
 Xd:{},
 Yd:{},
 Zd:null,

 _e:{},
 $e:{},
 ae:{},
 be:{},
 ce:{},
 de:{},

 _$:function()
{

 this.ee("unhover","hover");
 this.ee("mouseout","mouseover");
 this.ee("neverhovered","");


 this.fe("inactive","active","activator","inactivator");
 this.fe("blurred","focused","focuser","blurrer");

 $.Eb.Ib(document.documentElement,"mouseover",this.ge,this);

 $.Eb.Ib(document.documentElement,$.C,this.Gc,this);
 $.Eb.Ib(document.documentElement,"keyup",this.Gc,this);

 $.t$._c($.l,this.cc,this);
},
 ee:function(he,ie)
{
 if(he)
 this.Td.push(he);
 if(ie)
 this.Td.push(ie);
 this.je="("+this.Td.join("\\b|\\b")+")";
 this.Yd[he]=ie;
 this.Yd[ie]=he;
},
 fe:function(ke,le,me,ne)
{
 if(ke)
{
 this.Ud.push(ke);
 this.Xd[ke]=ke;
}
 if(le)
{
 this.Ud.push(le);
 this.Vd[le]=le;
}
 this.oe="("+this.Ud.join("\\b|\\b")+")";
 this.Yd[ke]=le;
 this.Yd[le]=ke;

 if(me&&ne)
{
 this.Wd[me]=me;
 $.yc.Jc([me,ne],[le,ke],this.pe,this);
}
},

 pe:function(Wc,bb,Xc,Bd)
{
 var qe=$.D$.ia(Xc);
 var db=$.G$.H$(Xc,this.oe);
 var data={w$:Xc,db:db};
 if(this.Wd[bb])
 this.re(qe,data,this.ce,this.be,this.de);
 else
{
 db.fb=this.Yd[db.fb];
 this.se(qe,data,this.ce,this.be,this.de);
}
},

 ge:function(Ob)
{
 this.te(Ob,this.je,this.$e,this._e,this.ae);
},

 Gc:function(Ob)
{
 var w$=Ob.subject;

 if(w$!=this.Zd)
{
 this.Zd=w$;

 if($.D$.E$(w$,this.Pd))
{
 if(Ob.cancel)
 Ob.cancel();
}
 else
{
 this.te(Ob,this.oe,this.ce,this.be,this.de,$.D$.E$(w$,this.Pd)!=null,$.D$.E$(w$,this.Pd)!=null,$.D$.E$(w$,"activation-box"));

 $.t$.u$("afterActivationChange",Ob.subject);
}
}
},

 cc:function(Ob)
{
 if(!$.G$.Ia(Ob.fromValue,this.oe)&&$.G$.Ia(Ob.toValue,this.oe))

 this.Gc(Ob);
 else if($.G$.Ia(Ob.fromValue,this.oe)&&!$.G$.Ia(Ob.toValue,this.oe))
{
 var qe=$.D$.ia(Ob.subject);
 delete ue[qe];
}
},

 te:function(Ob,ve,we,ue,xe,ye,ze,Ae)
{
 var Be={};



 var w$=Ob.subject;
 while(w$&&w$.nodeType==1)
{
 var db=$.G$.H$(w$,ve);
 if(db)
 Be[$.D$.ia(w$)]={w$:w$,db:db};

 w$=w$.parentNode;
}

 this.Ce=false;



 if(!ze)
 for(var qe in ue)
 if(!Be[qe]&&(!Ae||$.D$.ua(Ae,ue[qe].w$)))
 this.se(qe,ue[qe],we,ue,xe);

 if(!ye)
 for(var qe in Be)
 if(!ue[qe]&&(!Ae||$.D$.ua(Ae,Be[qe].w$)))
 this.re(qe,Be[qe],we,ue,xe);
},

 re:function(qe,data,we,ue,xe)
{

 if(!ue[qe]&&$.t$.u$($.o,data.w$))
{
 if(xe[qe])
 this.De(qe,xe[qe],ue,xe);
 else
{
 var delay=(this.Ce?data.db[this.Sd]:0)||data.db[this.Qd];
 if(delay)
{
 we[qe]=data;
 data.Ee=$.l$.m$(this.Fe,delay,this,[qe,data,we]);
}
 else
 this.Ge(qe,data);

 ue[qe]=data;
}
}
},
 se:function(qe,data,we,ue,xe)
{

 if(ue[qe]&&$.t$.u$($.o,data.w$))
{
 if(we[qe])
 this.He(qe,we[qe],we,ue);
 else
{
 this.Ce=true&&data.db[this.Sd];
 if(data.db[this.Rd])
{
 xe[qe]=data;
 data.Ee=$.l$.m$(this.Ie,data.db[this.Rd],this,[qe,data,xe]);
}
 else
 this.Je(qe,data);

 delete ue[qe];
}
}
},
 He:function(qe,data,we,ue)
{
 clearTimeout(data.Ee);
 delete we[qe];
 delete ue[qe];
},
 Fe:function(qe,data,we)
{
 delete we[qe];
 this.Ge(qe,data);
},
 Ge:function(qe,data,we,ue,xe)
{
 $.G$.replace(data.w$,data.db.fb,this.Yd[data.db.fb]);
},
 Ie:function(qe,data,xe)
{
 delete xe[qe];
 this.Je(qe,data);
},
 De:function(qe,data,ue,xe)
{
 clearTimeout(data.Ee);
 ue[qe]=data;
 delete xe[qe];
},
 Je:function(qe,data)
{
 $.G$.replace(data.w$,this.Yd[data.db.fb],data.db.fb);
}
};

 $.V($.Od);

 $.Ke={
 Le:"eventBox",

 _$:function()
{
 $.jc.uc(this.Le,this.Me,this);
},
 Ne:{
 13:["enter","execute"],
 32:["space","execute"],
 33:["pageup"],
 34:["pagedown"],
 35:["end"],
 36:["home"],
 37:["left"],
 38:["up"],
 39:["right"],
 40:["down"]
},
 Oe:{INPUT:1,TEXTAREA:1,SELECT:1},
 Me:function(w$,na,Ob)
{


 var Pe=Ob.subject;
 while(Pe&&Pe!=w$&&w$.nodeType==1&&!$.G$.contains(Pe,this.Le))
 Pe=Pe.parentNode;
 if(Pe==w$)
{
 var Qe;
 switch(Ob.type)
{
 case $.D:
 case $.F:
 Qe=this.Ne[Ob.keyCode]||null;
 break;
 case $.C:
 Qe=[$.C];
 break;
}

 if(Qe)
{
 $.ac.ec(w$,Qe,Ob.subject);
 if(!this.Oe[Ob.subject.nodeName])
 Ob.cancel();
}
}
}
};

 $.V($.Ke);













 $.wk={
 xk:"classsurface",
 yk:"row",
 zk:"col",

 _$:function()
{
 var vb=this;
 $.yc.Jc([this.xk+"up"],[this.xk],function(Wc,bb,Xc,Bd){vb.Ak(Xc,-$.l$.V$(Wc,vb.xk+"-up",1,true),0);});
 $.yc.Jc([this.xk+"down"],[this.xk],function(Wc,bb,Xc,Bd){vb.Ak(Xc,$.l$.V$(Wc,vb.xk+"-down",1,true),0);});
 $.yc.Jc([this.xk+"left"],[this.xk],function(Wc,bb,Xc,Bd){vb.Ak(Xc,0,-$.l$.V$(Wc,vb.xk+"-left",1,true));});
 $.yc.Jc([this.xk+"right"],[this.xk],function(Wc,bb,Xc,Bd){vb.Ak(Xc,0,$.l$.V$(Wc,vb.xk+"-right",1,true));});
 $.jc.sc(this.xk,this.Bk,this);
},
 Bk:function(Wc,bb,Ob)
{
 var Ck=Ob.subject;
 while(Ck&&Ck.parentNode!=Wc)
 Ck=Ck.parentNode;

 if(Ck)
{
 var Dk=$.l$.V$(Ck,this.yk,0,true);
 var c=$.l$.V$(Ck,this.zk,0,true);

 if(Dk||c)
{
 var Xc=$.yc.Yc(Wc,bb);
 this.Ak(Wc,-Dk,-c);
}
}
},
 Ak:function(w$,Ek,Fk)
{
 var Gk={
 w$:w$,
 Hk:$.G$.contains(w$,"wrap-both")||$.G$.contains(w$,"wrap-row"),
 Ik:$.G$.contains(w$,"wrap-both")||$.G$.contains(w$,"wrap-col"),
 Jk:$.G$.contains(w$,"chain-both")||$.G$.contains(w$,"chain-row"),
 Kk:$.G$.contains(w$,"chain-both")||$.G$.contains(w$,"chain-col"),
 Ek:Ek,
 Fk:Fk
};

 this.Lk(Gk);
},
 Lk:function(Gk)
{
 $.G$.ib();

 var Mk=this.Nk(Gk.w$);

 $.G$.remove(Gk.w$,"at-left\\b|\\bat-right\\b|\\bat-top\\b|\\bat-bottom");
 if(!Gk.Hk)
 if(Gk.Fk>0&&Math.min(this.Ok(Mk.cols).min,this.Ok(Mk.Pk).min)>=-Gk.Fk)
 $.G$.add(Gk.w$,"at-left");
 else if(Gk.Fk<0&&Math.max(this.Ok(Mk.cols).max,this.Ok(Mk.Pk).max)<=-Gk.Fk)
 $.G$.add(Gk.w$,"at-right");
 if(!Gk.Ik)
 if(Gk.Ek>0&&Math.min(this.Ok(Mk.rows).min,this.Ok(Mk.Qk).min)>=-Gk.Ek)
 $.G$.add(Gk.w$,"at-top");
 else if(Gk.Ek<0&&Math.max(this.Ok(Mk.rows).max,this.Ok(Mk.Pk).max)<=-Gk.Ek)
 $.G$.add(Gk.w$,"at-bottom");

 var la={};

 var Rk=0;
 if(Gk.Fk&&Gk.Kk)
{
 Rk=Gk.Fk;
 this.Sk(la,Mk.cols,Gk.Fk,Gk.Hk,this.zk);
 for(var Dk in Mk.Qk)
 this.Sk(la,Mk.Qk[Dk],Gk.Fk,Gk.Hk,this.zk);
}
 if(Gk.Ek)
{
 this.Sk(la,Mk.rows,Gk.Ek,Gk.Ik,this.yk);
 if(Gk.Jk)
 for(var c in Mk.Pk)
 this.Sk(la,Mk.Pk[c],Gk.Ek,Gk.Ik,this.yk);
 else
 this.Sk(la,Mk.Pk[0-Rk],Gk.Ek,Gk.Ik,this.yk);
}
 if(Gk.Fk&&!Gk.Kk)
{
 this.Sk(la,Mk.cols,Gk.Fk,Gk.Hk,this.zk);
 this.Sk(la,Mk.Qk[0-Gk.Ek],Gk.Fk,Gk.Hk,this.zk);
}

 for(var qe in la)
 $.G$.d$(la[qe].w$,la[qe].na);

 $.G$.kb();
},
 Nk:function(w$)
{
 var Mk={
 cols:[],
 rows:[],
 Qk:[],
 Pk:[]
};

 for(var i=0;i<w$.childNodes.length;i++)
{
 var Hi=w$.childNodes[i];
 if(Hi.nodeType==1)
{
 var Dk=$.l$.V$(Hi,this.yk,null,true);
 var c=$.l$.V$(Hi,this.zk,null,true);

 if(Dk!=null)
{
 var rows=(c==null?Mk.rows:(Mk.Pk[c]||(Mk.Pk[c]=[])));
 var Tk=rows[Dk]||(rows[Dk]=[]);
 Tk[Tk.length]=Hi;
}
 if(c!=null)
{
 var cols=(Dk==null?Mk.cols:(Mk.Qk[Dk]||(Mk.Qk[Dk]=[])));
 var Uk=cols[c]||(cols[c]=[]);
 Uk[Uk.length]=Hi;
}
}
}
 return Mk;
},
 Sk:function(la,a,Vk,wrap,Wk)
{
 var Xk=this.Ok(a);

 if(!wrap&&((Vk<0&&Xk.max==0)||(Vk>0&&Xk.min==0)))
 return;

 for(var ub in a)
{
 var Yk=a[ub];
 var Zk=this._l(ub,Vk,wrap,Xk.min,Xk.max);
 for(var i=0;i<Yk.length;i++)
{
 var qe=$.D$.ia(Yk[i]);
 if(!la[qe])
 la[qe]={w$:Yk[i],na:Yk[i].className,$l:Yk[i].className};
 la[qe].na=$.G$.Sa(la[qe].na,Wk+ub,Wk+Zk)
}
}
},
 _l:function(al,Vk,wrap,bl,cl)
{
 al=1*al;
 var el=al+Vk;
 if(wrap)
 if(el>cl)
 el=bl+(el-cl-1);
 else if(el<bl)
 el=cl-(bl-el-1);

 return el;
},
 Ok:function(a)
{
 var Xk={
 min:Infinity,
 max:-Infinity
};
 for(var ub in a)
{
 Xk.min=Math.min(Xk.min,ub);
 Xk.max=Math.max(Xk.max,ub);
}
 return Xk;
}
};

 $.V($.wk);








 $.Re={
 Se:1,
 Te:2,
 Ue:3,
 Ve:4,
 We:5,
 Xe:6,
 Ye:7,
 Ze:8,
 _f:9,
 $f:null,
 _$:function()
{
 if($.Q)
{
 this.af=this.bf;
 this.cf=this.df;
}
 $.Re["getRawComputedStyleProperty"]=$.Re.af;

 this.$f={














 "borderWidth":this.Te,
 "borderTopWidth":this.Te,
 "borderRightWidth":this.Te,
 "borderBottomWidth":this.Te,
 "borderLeftWidth":this.Te,
 "width":this.Ue,
 "height":this.Ue,
 "scrollTop":this.Ve,
 "scrollLeft":this.Ve,
 "color":this.We,
 "backgroundColor":this.We,
 "borderColor":this.We,
 "borderTopColor":this.We,
 "borderRightColor":this.We,
 "borderBottomColor":this.We,
 "borderLeftColor":this.We,
 "opacity":this.Xe,
 "zoom":this.Ye,
 "display":this.Ze,
 "overflow":this.Ze,
 "position":this.Ze,
 "visibility":this.Ze,
 "zIndex":this._f
};

 this.ef={};
 this.ef[this.Se]="px";
 this.ef[this.Te]="px";
 this.ef[this.Ue]="px";
 this.ef[this.Ve]="px";
 this.ef[this.We]="";
 this.ef[this.Xe]="%";
 this.ef[this.Ye]="%";
 this.ef[this.Ze]="";
 this.ef[this._f]="";
},
 ff:{
 "width":["offsetWidth"],
 "height":["offsetHeight"]
},
 gf:{
 "width":["height","offsetHeight"],
 "height":["width","offsetWidth"]
},

 hf:function(w$,Y)
{
 var jf=this.af(w$,Y);
 return this.cf(w$,Y,jf).value;
},

 af:function(w$,Y,kf)
{
 var lf=this.mf(Y);
 var nf=document.defaultView.getComputedStyle(w$,"");
 switch(this.of(Y))
{
 case this.Ue:
 if($.P)
{
 var pf=this.ff[Y];
 var aa=w$[pf[0]];
 for(var i=1;i<pf.length;i++)
 aa-=parseInt(w$.currentStyle[pf[i]]);
 return Math.max(0,aa);
}
 case this.Te:
 if(nf.getPropertyValue(lf.replace(/width/,"style"))==$.g)
 return 0;
 case this._f:
 case this.Se:
 case this.Ye:
 case this.Xe:
 return nf.getPropertyValue(lf);
 case this.Ve:
 return w$[Y];
 break;
 case this.We:
 if(
 lf.indexOf("border")!=-1
&&nf.getPropertyValue(lf.replace(/color/,"style"))==$.g
)
 return null;

 case this.Ze:
 return nf.getPropertyValue(lf);
 default:
 return null;
}
},
 cf:function(w$,Y,jf)
{
 var qf=this.of(Y);

 var W={value:jf};

 switch(qf)
{
 case this._f:
 case this.Se:
 case this.Ye:
 var rf=parseInt(jf);
 if(isNaN(rf))
 switch(jf)
{
 case "auto":W.value=0;break;
 default:W.value=null;
}
 else
 W.sf=(""+jf).replace(/^[-\d]+/,"")||null;
 W.value=rf;
 break;
 case this.Xe:
 W.value=Math.round(100*jf);
 break;
 case this.We:
 W.value=this.tf(jf);
 break;
 case this.Ue:
 case this.Ve:
 W.value=parseInt(jf);
}

 return W;
},


 bf:function(w$,Y)
{

 if(!w$.currentStyle)
 return null;

 switch(this.of(Y))
{
 case this.Ue:





 var uf=w$[this.gf[Y][1]]==0;
 if(uf)
 w$.runtimeStyle[this.gf[Y][0]]="1px";

 var aa=w$[this.ff[Y]];

 if(uf)
 w$.runtimeStyle[this.gf[Y][0]]="";


 return aa;
 case this.Ve:
 return w$[Y];
 break;
 case this.Xe:
 try
{
 return w$.filters.item($.J).opacity;
}
 catch(vf)
{
 return 100;
}
 break;
 case this.Se:
 case this.Ye:



















 default:
 return w$.currentStyle[Y];
}
},

 df:function(w$,Y,jf)
{
 var qf=this.of(Y);

 var W={value:jf};
 var rf=null;

 if(jf=="0px")
 jf="0";

 switch(qf)
{
 case this.Ue:

 rf=parseInt(jf);

 W.sf=(""+jf).replace(/^[-\d\.]+/,"")||null;
 W.value=Math.max(0,rf);
 break;
 case this.We:
 W.value=this.tf(jf);
 break;
 case this.Te:
 case this._f:
 case this.Se:
 case this.Ye:
 rf=parseInt(jf);
 if(isNaN(rf))
 switch(jf)
{
 case "auto":rf=0;break;
 case "thin":rf=2;break;
 case "medium":rf=4;break;
 case "thick":rf=6;break;
 default:rf=parseInt(jf);
}
 else
 W.sf=(""+jf).replace(/^[-\d\.]+/,"")||null;

 W.value=rf;
 break;
}

















 return W;
},

 wf:function(w$,Y,aa)
{
 switch(this.of(Y))
{
 case this.We:
 w$.style[Y]="rgb("+aa.join(",")+")";
 break;
 case this.Ze:
 case this._f:
 w$.style[Y]=aa;
 break;
 case this.Ue:
 case this.Ye:
 case this.Te:
 case this.Se:
 w$.style[Y]=aa+"px";
 break;
 case this.Ve:
 w$[Y]=aa+"px";
 break;
}
},

 xf:function(w$,Y)
{
 w$.style[Y]="";
},

 of:function(Y)
{
 return this.$f[Y]||this.Se;
},

 mf:function(Y)
{
 return Y.replace(/([A-Z])/g,function(yf){return "-"+yf.toLowerCase();});
},
 zf:{
 "white":"#FFFFFF","black":"#000000","blue":"#0000FF",
 "green":"#008000","red":"#FF0000","yellow":"#FFFF00",
 "aqua":"#00FFFF","azure":"#F0FFFF","beige":"#F5F5DC",
 "black":"#000000","blue":"#0000FF","brown":"#A52A2A",
 "cyan":"#00FFFF","darkblue":"#00008B","darkcyan":"#008B8B",
 "darkgray":"#A9A9A9","darkgreen":"#006400","darkred":"#8B0000",
 "fuchsia":"#FF00FF","gold":"#FFD700","gray":"#808080",
 "green":"#008000","indigo":"#4B0082","lightblue":"#ADD8E6",
 "lightcyan":"#E0FFFF","lightgreen":"#90EE90","lightgrey":"#D3D3D3",
 "lightyellow":"#FFFFE0","lime":"#00FF00","magenta":"#FF00FF",
 "maroon":"#800000","navy":"#000080","orange":"#FFA500",
 "pink":"#FFC0CB","purple":"#800080","red":"#FF0000",
 "silver":"#C0C0C0","steelblue":"#4682B4","turquoise":"#40E0D0",
 "violet":"#EE82EE","white":"#FFFFFF","yellow":"#FFFF00"
},

 tf:function(c)
{
 c=this.zf[c]||c;

 if(typeof(c)=="object")
 return c;
 if(c.indexOf("#")==0)
{
 if(c.length==7)
 return[
 parseInt(c.substring(1,3),16),
 parseInt(c.substring(3,5),16),
 parseInt(c.substring(5,7),16)
];
 else
 return[
 17*parseInt(c.substring(1,2),16),
 17*parseInt(c.substring(2,3),16),
 17*parseInt(c.substring(3,4),16)
];
}
 if(c.indexOf("rgb(")==0)
{
 var Af=c.substring(4,c.length-1).split(",");
 return[
 parseInt(Af[0]),
 parseInt(Af[1]),
 parseInt(Af[2])
];
}

 return[255,255,255];
}
};

 $.V($.Re);

 $["StyleUtils"]=$.Re;
 $.Re["getComputedStyleProperty"]=$.Re.hf;


 $.Animator=_a={
 Bf:{},
 animate:function(Cf,Df)
{
 var Ef=Cf.length;












 var Ff=10;
 var Gf=1<<Ff;

 var Hf=7;
 var If=1<<Hf;

 var code=[
 "  var tPhase = Math.min(1, (t - TSTART)/DURATION);\n",
 "if (tPhase>=0){\n",
 "  var f = ",_a.Jf[Df.profile],";\n",
 "\n"
];

 var Kf=[];
 var Lf=[];
 var Mf=[];


 for(var i=0;i<Ef;i++)
{
 var Nf=Cf[i];
 var w$=Nf.element;
 var id=$.D$.ia(w$);
 var Of=Nf.targetState;

 for(var Pf in Of)
{
 var Qf=Pf;
 if(!$.Q)
 Qf=Pf.replace(/([A-Z])/g,function(yf){return "-"+yf.toLowerCase();});

 var Rf=Of[Pf];


 var Sf=(Nf.currentState&&typeof(Nf.currentState[Pf])!=$.d)?Nf.currentState[Pf]:$.Re.hf(w$,Pf);

 if(Pf=="zoom")
{

 Sf*=100;
 Rf*=10000;
}


 _a[id+"el"]=w$;
 switch($.Re.of(Pf))
{
 case $.Re.Ve:
 _a[id+"elscroll"]=(w$!=document.body||document.compatMode=="BackCompat")?w$:document.documentElement;
 break;
 case $.Re.Xe:
 if($.Q)
{
 _a[id+"opacity"]=w$.filters.item($.J);
 break;
}

 default:
 _a[id+"elStyle"]=w$.style;

 if(Df.removeAfterwards)

 Mf.push("_a[\"",id,"elStyle\"]."+Pf+"='';\n");
}


 if($.Re.of(Pf)=="rgb")
 Rf=$.Re.tf(Rf);

 if(Rf.constructor==Array)
{
 var Tf=[];
 for(var Ab=0;Ab<Rf.length;Ab++)
 Tf[Ab]=Math.floor(Rf[Ab]-Sf[Ab]);
}
 else if(!isNaN(Rf))
{
 var Tf=Math.floor(Rf-Sf);
}

 var Uf=(Nf.units&&Nf.units[Pf])?" + '"+Nf.units[Pf]+"';\n":_a.Vf;


 switch($.Re.of(Pf))
{
 case $.Re.We:
 if($.Q)
{
 if(Pf=="borderColor")
 Lf.push(
 '_a["',id,'elStyle"].',Pf,'=["rgb(",',
 '(',Math.floor(If*(Sf[0]+0.5)),'+colorPhase*',Tf[0],')>>',Hf,',",", ',
 '(',Math.floor(If*(Sf[1]+0.5)),'+colorPhase*',Tf[1],')>>',Hf,',",", ',
 '(',Math.floor(If*(Sf[2]+0.5)),'+colorPhase*',Tf[2],')>>',Hf,', ")"].join("");\n'
);
 else
 Lf.push(
 '_a["',id,'elStyle"].',Pf,'=',
 '((',Math.floor(If*(Sf[0]+0.5)),'+colorPhase*',Tf[0],')>>',Hf,'<<16) | ',
 '((',Math.floor(If*(Sf[1]+0.5)),'+colorPhase*',Tf[1],')>>',Hf,'<<8) | ',
 '((',Math.floor(If*(Sf[2]+0.5)),'+colorPhase*',Tf[2],')>>',Hf,');\n'
);
}
 else
 Lf.push(
 '_a["',id,'elStyle"].',Pf,'=["rgb(",',
 '(',Math.floor(If*(Sf[0]+0.5)),'+colorPhase*',Tf[0],')>>',Hf,',",", ',
 '(',Math.floor(If*(Sf[1]+0.5)),'+colorPhase*',Tf[1],')>>',Hf,',",", ',
 '(',Math.floor(If*(Sf[2]+0.5)),'+colorPhase*',Tf[2],')>>',Hf,', ")"].join("");\n'
);
 break;
 case $.Re.Xe:
 Lf.push('try{_a["',id,($.Q?'opacity"].opacity=(':'elStyle"].opacity=(('),If*(Sf+0.5),'+colorPhase*',Tf,')>>',Hf,($.Q?';':')/100;'),"}catch(e){}\n");
 break;
 case $.Re.Ve:
 Kf.push('_a["',id,'elscroll"].',Pf,'=(',Gf*(Sf+0.5),'+normalPhase*',Tf,')>>',Ff,';\n');
 break;
 case $.Re.Ye:
 Kf.push('_a["',id,'elStyle"].',Pf,'=((',Math.floor(Gf*(Sf+0.5)),'+normalPhase*',Tf,')>>',Ff,')/10000;\n');
 case $.Re.Ze:
 switch(Pf)
{
 case "visibility":
 w$.style.visibility="hidden";
 break;
 case "display":
 w$.style.display=(Rf=='none'?Sf:Rf);
 break;
 case "overflow":
 w$.style.overflow="hidden";
 break;






}
 break;
 case $.Re._f:
 Kf.push('_a["',id,'elStyle"].',Pf,'=((',Math.floor(Gf*(Sf+0.5)),'+normalPhase*',Tf,')>>',Ff,')\n');
 break;
 default:
 Kf.push('_a["',id,'elStyle"].',Pf,'=((',Math.floor(Gf*(Sf+0.5)),'+normalPhase*',Tf,')>>',Ff,')',(Pf=='zoom'?'/10000':''),Uf,"\n");
}

}
}



 if(Kf.length>0)
{
 code.push(
 "var normalPhase=Math.round(",Gf,"*f);\n",
 Kf.join("")
);
}
 if(Lf.length>0)
{
 code.push(
 'var colorPhase=Math.round(',If,'*f);\n',
 Lf.join("")
);
}



 if(Df.removeAfterwards)
 code.push(
 "",
 "if(t==TSTOP)",
 "{",
 Mf.join(""),
 "}\n");

 code.push("}\n\n");

 _a.Wf(code,Df.delay,Df.duration,Cf,Df.onFinish);
},

 Jf:[
 'tPhase',
 'tPhase*tPhase',
 '(1-Math.pow(1-tPhase, 4))',
 '(1-Math.cos('+Math.PI+'*tPhase)/2.0)',
 '(tPhase<0.5?Math.exp(3*Math.log(tPhase*2))/2:1-Math.exp(3*Math.log((1-tPhase)*2))/2)',
 '(-Math.cos('+4*Math.PI+'*tPhase) + 1)/2',
 '(Math.sin('+2*Math.PI+'*tPhase)*0.4+0.6)*Math.sin('+4*Math.PI+'*tPhase)*0.5+0.5',
 '(1-Math.exp(4*Math.log(1-tPhase)))'
],

 Vf:(document.defaultView?" + 'px';\n":";\n"),
 Xf:0,
 Yf:null,
 Zf:1,
 _g:0,
 $g:Infinity,
 ag:500,
 bg:"",
 Wf:function(cg,delay,duration,Cf,onFinish)
{
 _a.Xf++;
 _a.Zf++;

 for(var i=0;i<Cf.length;i++)
 _a.Bf[Cf[i].element.id]=_a.Zf++;

 if(onFinish)
{
 _a["__onFinish"+_a.Zf]=onFinish;
 _a["__anims"+_a.Zf]=Cf;
}

 dg=[
 "/*** ",_a.Zf," ***/\n",
 "var t=Math.min(tNow, TSTOP);\n",
 cg.join(""),
 "if(t==TSTOP)\n",
 "{\n",
 "_a.__rC(",_a.Zf,");\n",
(onFinish?("_a.__onFinish"+_a.Zf+"(_a.__anims"+_a.Zf+");"):""),
 "\n}\n",
 "/*** /",_a.Zf," ***/\n"].join("");

 var eg=+new Date()+delay-_a._g;
 var fg=eg+duration;
 dg=dg.replace(/TSTART/g,eg);
 dg=dg.replace(/DURATION/g,duration);
 dg=dg.replace(/TSTOP/g,fg);
 dg=dg.replace(/RUNINDEX/g,_a.Zf);

 if(_a.Yf)
 _a.gg(Cf);

 _a.bg=_a.bg+dg;



 _a.hg=Function("tNow",_a.bg);



 if(!_a.Yf)
{
 _a._g=0;
 _a.$g=Infinity;




 _a.Yf=setInterval(_a.ig,1);
 _a.jg=true;
 _a.ig();
 _a.jg=false;
}
},
 ig:function()
{
 var Za=+new Date()-_a._g;

 var kg=Za-_a.$g;
 if(kg>_a.ag)
{
 _a._g+=kg;
 Za-=kg;
}

 _a.$g=Za;




 _a.hg(Za);
},
 "__rC":function(lg)
{
 var mg="/*** "+lg+" ***/";
 var ng="/*** /"+lg+" ***/";
 _a.bg=_a.bg.substring(0,_a.bg.indexOf(mg))+_a.bg.substring(_a.bg.indexOf(ng)+ng.length);

 _a.hg=Function("tNow",_a.bg);

 _a.og(lg);

 _a.Xf--;
 if(_a.Xf==0)
{
 clearInterval(_a.Yf);
 _a.Bf={};
 _a.Yf=null;
}
},
 og:function(lg)
{
 for(var id in _a.Bf)
 if(_a.Bf[id]==lg)
 delete _a.Bf[id];
},
 gg:function(Cf)
{
 var pg=[];
 var Ef=Cf.length;
 for(var i=0;i<Ef;i++)
{
 var Nf=Cf[i];
 var id=Nf.element.id.replace(/(\W)/g,"\\$1");
 var Of=Nf.targetState;

 for(var Pf in Of)
{

 switch(Pf)
{
 case 'scrollTop':
 case 'scrollLeft':
 pg.push("|_a\\[\"",id,"el\"\\]\\.",Pf,"[^;]+;");
 break;
 case "opacity":
 pg.push("|_a\\[\"",id,"opacity\"\\][^;]+;");
 break;
 default:
 pg.push("|_a\\[\"",id,"elStyle\"\\]\\.",Pf,"[^;]+;");
 pg.push("|_a\\[\"",id,"elStyle\"\\]\\.",Pf,"='';");
}
}
}

 if(pg.length>0)
{

 _a.bg=_a.bg.replace(new RegExp(pg.join("").substr(1),"g"),"");

}
},
 qg:function(rg)
{












}
};


 $.Modifiers=function()
{
 this.delay=0;
 this.duration=300;
 this.profile=4;
 this.removeAfterwards=false;
 this.onFinish=null;
};

 $.Modifiers.prototype={
 "LINEAR":0,
 "ACCELERATING":1,
 "DECELERATING":2,
 "NORMAL":3,
 "SLOWFASTSLOW":4,
 "BLINK":5,
 "HEARTBEAT":6
};

 $["Animator"]=$.Animator;
 $.Animator["disabled"]=$.Animator.disabled;
 $.Animator["animate"]=$.Animator.animate;

































 $.sg={
 tg:"display",
 ug:"block",
 vg:"morph",
 wg:"shallow",


 xg:true,
 yg:[
 "display",
 "overflow",
 "backgroundColor",





 "color",
 "fontSize",
 "height",
 "left",
 "marginTop",


 "marginLeft",
 "opacity",





 "top",
 "visibility",
 "width"
],
 zg:{},
 Ag:false,
 Bg:{BODY:1,DIV:1,A:1,IMG:1,LI:1,OL:1,UL:1,SPAN:1,TD:1,TH:1,TR:1,TABLE:1,H1:1,H2:1,H3:1},
 _$:function()
{
 $.t$._c($.j,this.Cg,this);
 $.t$._c($.k,this.Dg,this);
 $.t$._c($.m,this.Dg,this);
},

 Eg:function()
{
 this.xg=true;
},
 Fg:function()
{
 this.xg=false;
},
 Gg:function(Hg)
{
 $.v=Hg;
},
 Ig:function(Jg)
{
 var Kg={};
 for(var i=0;i<Jg.length;i++)
 Kg[Jg[i].toUpperCase()]=1;
 this.Bg=Kg;
},
 Lg:function(Mg)
{
 this.yg=Mg;
},
 Dg:function(Ob)
{
 if($.sg.xg&&!Ob.rb)
 this.Ng(Ob.subject);
},
 Ng:function(fc)
{

 var Og={};

 var db=$.G$.H$(fc,this.vg,{"delay":0,"duration":$.v});
 if(!db||!db["not"])
{
 if(db)
 this.Pg(Og,fc,db);

 this.Qg(fc,Og);

 if(this.Ag)
{
 this.Rg(Og,true);

 for(var qe in Og)
 this.zg[qe]=Og[qe];
}
}

},
 Qg:function(w$,Og)
{
 for(var ic=w$.firstChild;ic;ic=ic.nextSibling)
 if(ic.nodeType==1)
{
 var db=null;
 if(this.Bg[ic.nodeName])
{
 db=$.G$.H$(ic,this.vg,{"delay":0,"duration":$.v});
 if(db&&!db["not"])
 this.Pg(Og,ic,db);
}

 var Sg=$.Re.af(ic,"display");
 if(Sg!=$.g&&(!db||!db[this.wg]))
 this.Qg(ic,Og);
}
},
 Pg:function(rg,w$,db)
{
 var qe=$.D$.ia(w$);
 if(!this.zg[qe])
{
 rg[qe]={
 element:w$,
 db:db,
 ba:db[this.Tg]||this.yg
};

 this.Ag=true;
}
},

 Cg:function()
{



 if($.P)
 document.body.scrollLeft+=0;

 if(this.Ag)
{


 for(var qe in this.zg)
 if(!this.Ug(this.zg[qe].element))
{
 var w$=document.getElementById(qe);
 if(w$)
 this.zg[qe].element=document.getElementById(qe);
 else
 delete this.zg[qe];
}


 this.Vg(this.zg);

 this.Rg(this.zg,false);

 this.Wg(this.zg);


 var Xg=this.Yg();


 this.Ag=false;
 this.zg={};


 this.Zg(Xg);









 if($.S)
 document.body.offsetWidth;














}
},
 Vg:function(rg)
{






 for(var qe in rg)
 if($.Animator.Bf[qe])
{
 var _h=rg[qe];
 var w$=_h.element;

 if($.Q)
{
 _h.$h=w$.style.cssText;
 w$.style.cssText="";
}
 else
 for(var Y in _h.ah)
{
 var aa=w$.style[Y];
 if(aa)
{
 _h.bh[Y]=aa;
 w$.style[Y]="";
}
}
}
},
 Wg:function(rg)
{
 for(var qe in rg)
{
 if($.Animator.Bf[qe])
{
 var _h=rg[qe];
 var w$=_h.element;
 if($.Q)
 w$.style.cssText=_h.$h;
 else
 for(var Y in _h.bh)
 w$.style[Y]=_h.bh[Y];
}
}
},
 Rg:function(rg,ch)
{
 var dh=[];
 var eh=[];
 var fh=null;

 for(var qe in rg)
{
 var _h=rg[qe];
 var w$=_h.element;




 if(!w$ || !w$.parentNode || (w$.offsetWidth==0&&w$.parentNode.offsetWidth==0))
{
 delete rg[qe];
 continue;
}
 if(ch)
{
 _h.bh={};
 _h.ah={};
 _h.gh={};
}


 if(!ch&&fh&&$.D$.ua(fh,w$)&&(fh.style.display==$.g))
{
 delete rg[qe];
 continue;
}

 var hh=(ch?_h.ah:_h.gh);

 for(var i=0;i<_h.ba.length;i++)
{
 var Y=_h.ba[i];


 hh[Y]=$.Re.af(w$,Y);

 if(Y==this.tg&&hh[Y]==$.g)
{






 if(!ch&&_h.ah.display==$.g)
{
 delete rg[qe];
 break;
}

 fh=w$;
 dh.push(fh);
 eh.push(fh.style.display);
 fh.style.display=this.ug;
}
}
}

 for(var i=0;i<dh.length;i++)
 dh[i].style.display=eh[i];
},
 Yg:function()
{
 var Xg={};
 var ih={};
 for(var qe in this.zg)
{
 var _h=this.zg[qe];
 var w$=_h.element;
 var currentState={};
 var units={};
 var targetState={};
 var jh=false;
 for(var Y in _h.gh)
{
 var kh=_h.ah[Y];
 var lh=_h.gh[Y];

 if(lh!=null)
{





 if(kh!=lh)
{
 jh=true;
 var mh=$.Re.cf(w$,Y,kh);
 var nh=$.Re.cf(w$,Y,lh);
 currentState[Y]=mh.value;
 targetState[Y]=nh.value;
 units[Y]=mh.sf||nh.sf;
}
}
}

 if(jh)
{
 if($.P)
{



 if(targetState.top&&targetState.marginTop&&targetState.top==targetState.marginTop)
 delete targetState.top;
 if(targetState.left&&targetState.marginLeft&&targetState.left==targetState.marginLeft)
 delete targetState.left;
}

 var oh=Xg[_h.db["delay"]]=Xg[_h.db["delay"]]||{};
 var Cf=oh[_h.db["duration"]]=oh[_h.db["duration"]]||[];

 Cf[Cf.length]={
 element:w$,
 currentState:currentState,
 targetState:targetState,
 units:units
};
}
}
 return Xg;
},
 Zg:function(Xg)
{
 for(var delay in Xg)
{
 delay*=1;
 for(var duration in Xg[delay])
{
 duration*=1;
 var Cf=Xg[delay][duration];
 for(var i=0;i<Cf.length;i++)
{
 var Nf=Cf[i];
 var w$=Nf.element;




 for(var Y in Nf.currentState)
{


 $.Re.wf(w$,Y,Nf.currentState[Y]);
}
}











 var Df=new $.Modifiers();
 Df.delay=delay;
 Df.duration=duration;


 Df.removeAfterwards=true;

 $.Animator.animate(Cf,Df);
}
}
},
 Ug:function(w$)
{
 if(w$.ownerDocument!=document)
 return false;

 if($.Q)
 return w$.parentTextEdit!=null;

 while(w$.parentNode&&w$!=document.body)
 if(w$.parentNode.nodeType==11)
 return false;
 else
 w$=w$.parentNode;
 return(w$==document.body);
},
 ph:function(qh,rh)
{
 for(var i=0;i<qh.length;i++)
 if(qh[i]!=rh[i])
 return false;

 return true;
}
};
 $.V($.sg);

 $["StyleMorpher"]=$.sg;
 $.sg["setMorphDuration"]=$.sg.Gg;
 $.sg["setMorphableNodeNames"]=$.sg.Ig;
 $.sg["setMorphableProperties"]=$.sg.Lg;
 $.sg["enable"]=$.sg.Eg;
 $.sg["disable"]=$.sg.Fg;

 $.sg["morph"]=$.sg.Cg;
 $.sg["beforeClassNameChange"]=$.sg.Dg;







 $.sh={
 uh:null,
 vh:null,
 _$:function()
{
 $.Eb.Ib(document.documentElement,$.G,this.wh,this);
 $.Eb.Ib(document.documentElement,$.H,this.xh,this);
 $.Eb.Ib(document.documentElement,$.I,this.yh,this);
 $.Eb.Ib(document.documentElement,"DOMMouseScroll",this.zh,this);

 $.t$._c("persist-pos",this.Ah,this);
},

 Ah:function(Ob)
{
 var w$=Ob.subject;
 if($.G$.contains(w$,"movable"))
{
 var Bh={x:parseInt(w$.style.left),y:parseInt(w$.style.top)};
 if(!isNaN(Bh.x)||!isNaN(Bh.y))
{
 var I$=$.G$.H$(w$,"movable");
 if(I$[$.M])
 I$[$.M](w$,Bh);
}
}
},

 wh:function(Ob)
{
 this.yh();

 this.Ch=$.l$.v$(Ob.subject,"mover","movable");
 if(this.Ch.object)
{
 this.Ch.box=this.Ch.object.offsetParent||$.U;

 this.Dh=$.U.scrollTop;
 this.Eh=this.Ch.object.offsetLeft-Ob.clientX;
 this.Fh=this.Ch.object.offsetTop-Ob.clientY;

 this.Gh();

 this.Hh=false;
}
 else
 this.Ch=null;
},
 xh:function(Ob)
{
 this.vh=Ob.clientY;

 if(this.Ch)
 if(Ob.Xb)
{
 if(!this.Hh)
{
 $.Eb.Fb=true;

 if($.Q)
 this.Ch.C$.setCapture();

 $.G$.replace(this.Ch.box,"notMoving","moving");
 $.G$.replace(this.Ch.object,"notMoving","moving");
 $.G$.replace(this.Ch.C$,"notMoving","moving");

 this.uh=$.l$.q$(this.Ih,15,this);

 this.Hh=true;
}

 this.Jh={x:this.Eh+Ob.clientX,y:this.Fh+Ob.clientY+$.U.scrollTop-this.Dh};
 this.Kh();

 if(this.Ch.I$[$.M])
{
 this.Ch.I$[$.M](this.Ch.object,this.Jh);
 this.Kh();
}

 if(this.Ch.F$.dir!="vertical")
 $.Re.wf(this.Ch.object,"left",this.Jh.x);
 if(this.Ch.F$.dir!="horizontal")
 $.Re.wf(this.Ch.object,"top",this.Jh.y);
}
 else
 this.yh();
},
 zh:function(Ob)
{
 this.yh();

 var Lh=$.D$.E$(Ob.subject,"move");
 if(Lh)
{
 var db=$.G$.H$(Lh,"move");

 if(db["onMouseScroll"])
{
 if(this.Mh)
 clearTimeout(this.Mh);

 var Nh=document.getElementById(db["onMouseScroll"]);
 this.Ch={
 box:Nh.offsetParent||$.U,
 object:Nh,
 I$:$.G$.H$(Nh,"movable")
};

 this.Gh();

 var Oh=this.Ch.object.offsetTop;

 var Ph=db["delta"]||Math.abs(Ob.detail);

 this.Jh={x:0,y:Oh+Ph*Ob.detail/Math.abs(Ob.detail)};
 this.Kh();

 if(this.Ch.I$[$.M])
{
 this.Ch.I$[$.M](this.Ch.object,this.Jh);
 this.Kh();
}

 $.Re.wf(this.Ch.object,"top",this.Jh.y);

 var Qh=$.sh.Ch.I$[$.N];
 if(this.Ch.I$[$.N])
{
 var W=$.sh.Ch.object;
 var Bh=$.sh.Jh;
 this.Mh=$.l$.m$(function(){Qh(W,Bh);},500);
}

 this.yh();

 Ob.cancel();
}
}
},

 Gh:function()
{



 var Rh=-1;
 var Sh=-1;
 var Th=this.Ch.box;
 while(Rh<=1||Sh<=1)
{
 Rh=Th.offsetWidth;
 Sh=Th.offsetHeight;
 Th=Th.offsetParent||$.U;
}

 if(this.Ch.I$["restricted"])
{
 this.Uh=Rh-$.Re.hf(this.Ch.object,"width");
 this.Vh=Sh-$.Re.hf(this.Ch.object,"height");
}
},

 Kh:function()
{
 if(this.Ch.I$["restricted"])
{
 this.Jh.x=Math.max(0,Math.min(this.Jh.x,this.Uh)),
 this.Jh.y=Math.max(0,Math.min(this.Jh.y,this.Vh))
}
},
 yh:function()
{
 if(this.Ch)
{
 if(this.Hh)
{
 if(this.Ch.box)
 $.G$.replace(this.Ch.box,"moving","notMoving");
 if(this.Ch.object)
 $.G$.replace(this.Ch.object,"moving","notMoving");
 if(this.Ch.C$)
 $.G$.replace(this.Ch.C$,"moving","notMoving");

 if(this.Ch.I$[$.N])
 this.Ch.I$[$.N](this.Ch.object,this.Jh);

 $.Eb.Fb=false;

 if($.Q)
 this.Ch.C$.releaseCapture();

 this.vh=null;
 clearTimeout(this.uh);
 this.uh=null;
}

 this.Ch=null;
}

 this.Wh=$.U.scrollHeight-$.U.offsetHeight;
},
 Ih:function()
{
 if(this.Ch.F$.dir!="horizontal")
{
 var Xh=$.U.scrollTop;

 if(this.vh<50)
 $.U.scrollTop-=Math.round(10-this.vh/5);

 if(this.vh>$.U.offsetHeight-50)
 $.U.scrollTop=Math.min($.U.scrollTop+Math.round(10-($.U.offsetHeight-this.vh)/5),this.Wh);

 if($.U.scrollTop!=Xh)
{
 this.Jh.y+=$.U.scrollTop-Xh;
 this.Kh();

 if(this.Ch.I$[$.M])
{
 this.Ch.I$[$.M](this.Ch.object,this.Jh);
 this.Kh();
}
 $.Re.wf(this.Ch.object,"top",this.Jh.y);
}
}
}
};

 $.V($.sh);
 $.Yh={
 _$:function()
{
 $.Eb.Ib(document.documentElement,$.G,this.wh,this);
 $.Eb.Ib(document.documentElement,$.H,this.xh,this);
 $.Eb.Ib(document.documentElement,$.I,this.yh,this);

 $.t$._c("persist-dim",this.Ah,this);
},

 Ah:function(Ob)
{
 var w$=Ob.subject;
 if($.G$.contains(w$,"resizable"))
{
 var Zh={width:parseInt(w$.style.width),height:parseInt(w$.style.height)};
 if(!isNaN(Zh.width)||!isNaN(Zh.height))
{
 var I$=$.G$.H$(w$,"resizable");
 if(I$[$.M])
 I$[$.M](w$,Zh);
}
}
},

 wh:function(Ob)
{

 this.yh();

 this._i=$.l$.v$(Ob.subject,"resizer","resizable");
 if(this._i.object)
{

 this.$i=$.Re.hf(this._i.object,"width");
 this.ai=$.Re.hf(this._i.object,"minWidth")||0;
 this.bi=$.Re.hf(this._i.object,"maxWidth")||Infinity;

 this.ci=$.Re.hf(this._i.object,"height");
 this.di=$.Re.hf(this._i.object,"minHeight")||0;
 this.ei=$.Re.hf(this._i.object,"maxHeight")||Infinity;

 this.Eh=Ob.clientX;
 this.Fh=Ob.clientY;

 this.fi=false;
}
 else
 this._i=null;
},

 xh:function(Ob)
{
 if(this._i)
 if(Ob.Xb)
{
 if(!this.fi)
{
 $.Eb.Fb=true;

 if($.Q)
 this._i.C$.setCapture();

 $.G$.replace(this._i.object,"notResizing","resizing");
 $.G$.replace(this._i.C$,"notResizing","resizing");
 this.fi=true;
}

 this.gi={
 width:this.$i+Ob.clientX-this.Eh,
 height:this.ci+Ob.clientY-this.Fh
};
 this.Kh();

 if(this._i.I$[$.M])
{
 this._i.I$[$.M](this._i.object,this.gi);
 this.Kh();
}

 if(this._i.F$.hi!="height")
 this._i.object.style.width=this.gi.width+"px";
 if(this._i.F$.hi!="width")
 this._i.object.style.height=this.gi.height+"px";
}
 else
 this.yh();
},
 Kh:function()
{
 this.gi.width=Math.max(this.ai,Math.min(this.bi,this.gi.width));
 this.gi.height=Math.max(this.di,Math.min(this.ei,this.gi.height));
},

 yh:function()
{
 if(this._i)
{
 if(this.fi)
{
 $.G$.replace(this._i.object,"resizing","notResizing");
 $.G$.replace(this._i.C$,"resizing","notResizing");

 if(this._i.I$[$.N])
 this._i.I$[$.N](this._i.object,this.gi);

 $.Eb.Fb=false;

 if($.Q)
 this._i.C$.releaseCapture();
}

 this._i=null;
}
}
};

 $.Yh._$();
 if($.Q&&!$.R)
{
 $.ii={
 _$:function()
{
 document.writeln(""
+"<style>\n"
+".fixed\n"
+"{\n"
+"  _position:absolute!important;\n"
+"  font-family:expression(Spif.FixedPositioning.__initElement(this))!important;\n"
+"}\n"
+"</style>\n");

 $.Eb.Ib(window,"load",this.ji,this);
},
 ki:function(w$)
{
 w$.style.fontFamily=null;

 setTimeout(
 function()
{
 w$.style.setExpression("top",parseInt(w$.currentStyle.top)+" + eval(Spif.documentScrollElement.scrollTop)");
},
 0
);
},
 ji:function()
{
 if(document.body.currentStyle.backgroundImage=="none")
 document.body.style.backgroundImage="url(about:blank)";
 if(document.body.currentStyle.backgroundAttachment!="fixed")
 document.body.style.backgroundAttachment="fixed";
}
};

 $.ii._$();

 $["FixedPositioning"]=$.ii;
 $.ii["__initElement"]=$.ii.ki;
}
 $.pi={
 qi:"dragging",
 ri:"notDragging",
 si:"dropping",
 ti:"notDropping",
 _$:function()
{
 $.Eb.Ib(document.documentElement,$.G,this.wh,this);
 $.Eb.Ib(document.documentElement,$.H,this.xh,this);
 $.Eb.Ib(document.documentElement,$.I,this.ui,this);
},

 wh:function(Ob)
{

 this.yh();


 var vi=$.D$.E$(Ob.subject,"dragger");
 if(vi)
{

 var wi=$.D$.E$(Ob.subject,"draggable");


 if(wi)
{

 if(!$.D$.E$(Ob.subject,"dragging-disabled"))

 this.xi(wi,vi);
}
}
},

 xh:function(Ob)
{
 this.vh=Ob.clientY;

 if(this.yi)
 if(Ob.Xb)
{
 this.zi();


 this.Ai.style.left=($.U.scrollLeft+Ob.clientX)+"px";
 this.Ai.style.top=($.U.scrollTop+5+this.vh)+"px";





 var wi=$.D$.E$(Ob.subject,"draggable");
 if(wi!=this.Ai)
{

 var Bi=$.D$.E$(Ob.subject,"dropBox");
 if(Bi&&Bi!=this.Ci)
{

 var Di=$.l$.S$(Bi,"dropType","",true);
 for(var i=0;i<Di.length;i++)
 if(this.Ei[Di[i]])
 break;

 if(i>=Di.length)
 Bi=null;
}

 var Fi=null;
 if(Bi)
{
 var Gi=$.Q?Ob.clientY:(Ob.clientY+document.body.scrollTop);

 if($.P)
{
 Gi=Ob.offsetY;
 var w$=Ob.subject;
 while(w$!=Bi)
{
 Gi+=w$.offsetTop;
 w$=w$.offsetParent||$.U;
}
}

 for(var i=0;!Fi&&i<Bi.childNodes.length;i++)
{
 var Hi=Bi.childNodes[i];
 if(Hi!=this.Ii&&Hi!=this.Ai&&Hi.nodeType==1)
{
 if($.Q)
{
 var Ji=Hi.getBoundingClientRect();
 var Ki={
 y:Ji.top,
 height:Ji.bottom-Ji.top
};
}
 else if($.S)
 Ki=document.getBoxObjectFor(Hi);
 else if($.P)
{
 Ki={
 y:Hi.offsetTop,
 height:Hi.offsetHeight
};
}
 if(Gi<(Ki.y+Ki.height/2))
 Fi=Hi;
}
}
}
 this.Li(Bi,Fi);
}


 Ob.cancel();
}
 else
 this.ui();
},

 vh:null,
 Mi:null,
 Ni:null,

 xi:function(wi,vi)
{
 this.Oi=vi;
 this.yi=wi;
 this.Pi=wi.parentNode;
 this.Qi=wi.nextSibling;


 this.Ri=$.l$.S$(this.yi,"dragType","",true);
 this.Ei=$.l$.Y$(this.Ri);

 this.Si=false;


 $.G$.add(document.body,"dragging-"+this.Ri.join(" dragging-"));
},


 zi:function()
{
 if(this.Si)
 return;

 this.Si=true;

 $.Eb.Fb=true;

 if($.Q)
 this.Oi.setCapture();


 var Ti=$.D$.oa(this.yi,"dragPlaceholder");
 if(Ti)
 this.Ai=Ti.cloneNode(true);
 else
{
 this.Ai=this.yi.cloneNode(true);
 this.Ai.style.width=this.yi.offsetWidth+"px";
}

 $.G$.add(this.Ai,"dragPlaceholder");
 $.G$.replace(this.Ai,this.ri,this.qi);
 this.yi.parentNode.insertBefore(this.Ai,this.yi);

 this.Ai.style.position="absolute";
 this.Ai.style.zIndex=Math.pow(2,15);
 document.body.appendChild(this.Ai);


 var Ui=$.D$.oa(this.yi,"dropPlaceholder");
 if(Ui)
 this.Ii=Ui.cloneNode(true);
 else
{
 this.Ii=this.yi.cloneNode(true);

}
 $.G$.add(this.Ii,"dropPlaceholder");
 $.G$.remove(this.Ii,this.ri);


 $.G$.replace(this.yi,this.ri,this.qi);
 $.G$.replace(this.yi.parentNode,this.ri,this.qi);

 this.uh=$.l$.q$(this.Ih,15,this);
},
 Li:function(Bi,Fi)
{
 if(Bi!=this.Ci||Fi!=this.Vi)
{

 if(this.Ci&&Bi!=this.Ci)
 $.G$.replace(this.Ci,this.si,this.ti);


 this.Ci=Bi;
 this.Vi=Fi;

 if(!Bi)
 this.Ii.parentNode.removeChild(this.Ii);
 else
{
 $.G$.replace(Bi,this.ti,this.si);
 Bi.insertBefore(this.Ii,Fi||null);
}
}
},

 ui:function()
{
 if(this.yi&&this.Ci)
{
 var wi=this.yi;
 var Wi=this.Ii.parentNode;
 var Xi=this.Ii.nextSibling;

 this.yh();

 var Yi=$.G$.contains(this.Pi,"clone-box")&&Wi!=this.Pi;
 if(Wi!=this.Pi||Xi!=this.Qi)
{
 var Fi=Yi?wi.cloneNode(true):wi;
 Wi.insertBefore(Fi,Xi);

 var Zi=$.G$.H$(Wi,"dropBox");
 if(Zi[$.N])
 Zi[$.N](Fi,this.Pi,this.Qi,Wi,Xi);
}
}

 this.yh();
},

 yh:function()
{
 if(this.yi)
{
 $.G$.remove(document.body,"dragging-"+this.Ri.join(" dragging-"));

 if(this.Si)
{
 $.G$.replace(this.yi.parentNode,this.qi,this.ri);
 $.G$.replace(this.yi,this.qi,this.ri);
 if(this.Ci)
 $.G$.replace(this.Ci,this.si,this.ti);


 this.Ai.parentNode.removeChild(this.Ai);
 this.Ii.parentNode.removeChild(this.Ii);
}

 $.Eb.Fb=false;

 if($.Q)
 this.Oi.releaseCapture();

 this.Oi=null;
 this.yi=null;
 this.Ci=null;
 this.vh=null;
 clearTimeout(this.uh);
 this.uh=null;
}
 this.Wh=$.U.scrollHeight-$.U.offsetHeight;
},

 Ih:function()
{
 var Xh=$.U.scrollTop;

 if(this.vh<50)
 $.U.scrollTop-=Math.round(10-this.vh/5);

 if(this.vh>$.U.offsetHeight-50)
 $.U.scrollTop=Math.min($.U.scrollTop+Math.round(10-($.U.offsetHeight-this.vh)/5),this.Wh);

 if($.U.scrollTop!=Xh)
 this.Ai.style.top=($.U.scrollTop+5+this.vh)+"px";
}
};

 $.V($.pi);












 var vk=$.l$.platform;
 $.G$.add(document.documentElement,"spiffy "+vk,$.K);

 $.Eb.Ib(
 window,
 $.B,
 function()
{
 if(document.compatMode=="BackCompat")
 $.U=document.body;

 $.U.style.height="100%";

 $.G$.replace(document.body,$.z,$.w);

 $.t$.u$($.n,document.body);
}
);

 if($.Q)
{














 if(!$.R)
{
 try
{
 document.execCommand("BackgroundImageCache",false,true);
}
 catch(vf){}
}
}

 $.t$.u$("spifLoaded");

 $["documentScrollElement"]=$.U;

