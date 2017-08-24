echo on

set Path=ProtoGen\protogen.exe

 
%Path%  -i:Request.proto    -o:OpenAPIModel\Request.cs

%Path%  -i:Response.proto    -o:OpenAPIModel\Response.cs

%Path%  -i:UserInfo.proto    -o:OpenAPIModel\UserInfo.cs

%Path%  -i:LoginReq.proto    -o:OpenAPIModel\LoginReq.cs

%Path%  -i:LoginResp.proto    -o:OpenAPIModel\LoginResp.cs

pause