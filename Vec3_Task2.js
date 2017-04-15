// Constructor
Vec3_Task2 = function( x, y, z )
{
this.x = x;
this.y = y;
this.z = z;
return this;
}

//culculate S ƒwƒƒ“‚ÌŒö®‚æ‚è“±o
function AreaOfTriangle(v1,v2,v3)
{
  var a = Math.sqrt((v1.x - v2.x)*(v1.x - v2.x)+(v1.y - v2.y)*(v1.y - v2.y)+(v1.z - v2.z)*(v1.z - v2.z));
  var b = Math.sqrt((v2.x - v3.x)*(v2.x - v3.x)+(v2.y - v3.y)*(v2.y - v3.y)+(v2.z - v3.z)*(v2.z - v3.z));
  var c = Math.sqrt((v3.x - v1.x)*(v3.x - v1.x)+(v3.y - v1.y)*(v3.y - v1.y)+(v3.z - v1.z)*(v3.z - v1.z));
  
  var s = (a+b+c)/2;
  
  var S = Math.sqrt(s*(s-a)*(s-b)*(s-c));
  
  return S
}
