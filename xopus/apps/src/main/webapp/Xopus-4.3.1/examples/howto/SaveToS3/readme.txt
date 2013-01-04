////////////////////////////////////////////////////////////////////////////////////
//
//  This explains how you can run this demo on your server
//
////////////////////////////////////////////////////////////////////////////////////


This demo is tested with the following configuration

- IIS 5
- .NET 2.0


What do you need to change to make this demo to work?

1) You need to have your own S3 account

2) In your own application envirement you need to include the
   following webreference. http://s3.amazonaws.com/doc/2006-03-01/AmazonS3.wsdl

   After you included this reference you can use the basic API of amazon for .NET

3) For each script you use to connect to S3 you need to include using com.amazon.s3;
   in your reference on top of your page.

4) You need to edit your web.config to store your S3 access keys
   Here is an example:
   <appSettings>
      <add key="S3AccessKey" value="1234567890"/>    
      <add key="S3SecretKey" value="1234567890"/>    
      <add key="com.amazonaws.s3.AmazonS3" value="https://s3.amazonaws.com/soap"/>
    </appSettings>  
