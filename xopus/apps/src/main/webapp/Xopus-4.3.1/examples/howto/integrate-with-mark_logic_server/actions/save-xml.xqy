xquery version "1.0-ml";

<save>
{
  xdmp:document-insert(
    xdmp:get-request-field("fileId"), 
    xdmp:get-request-body(),
    (), 
    <collections><collection>xopus-demo</collection></collections>), 
  text { "Ok" }
}
</save>
