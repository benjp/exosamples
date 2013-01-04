xquery version "1.0-ml";

let 
  $uri := concat("document-", fn:count(fn:collection()), ".xml"), 
  $doc := xdmp:document-insert(
    $uri, 
    <article xml:lang="en-us">
      <title>New Document</title>
      <paragraph></paragraph>
    </article>)
return xdmp:redirect-response(concat("xopus-island.xqy?fileId=", $uri))
