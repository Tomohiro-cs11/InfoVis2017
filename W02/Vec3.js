function min(a,b,c)
{
  if(a <= b && a <= c){
    return a;
  }else if(b <= a && b <= c){
    return b;
  }else{
    return c;
  }
}

function max(a,b,c)
{
  if(a >= b && a >= c){
    return a;
  }else if(b >= a && b >= c){
    return b;
  }else{
    return c;
  }
}

function mid(a,b,c)
{
  
  mi = min(a,b,c);
  ma = max(a,b,c);
  
  if(mi != a && ma != a){
    return a;
  }else if(mi != b && ma != b){
    return b;
  }else{
    return c;
  }
}

