#include <stdio.h>

int diff(int n,int m,int k);

int main()
{
   int n,m,k;
   scanf("%d %d %d",&n,&m,&k);
   int result = diff(n,m,k);
   printf("%d\n",result);
   return 0;
}

int diff(int n,int m,int k)
{
   int i,j,a,b,s;
   s = 0;
   b = 1;
   int r;
   if(n<0)
   {
      j = -1;
      n = -n;
   }
   else if (n>0)
   {
      j = 1;
   }
   else
   {
      j = 0;
   }
   for (i=n;i>0;i=i/10)
   {
      a = i%10;
      if (a==m)
      {
         a = k;
      }
      s = s + a*b;
      b = b*10;
   }
   if (j)
   {
      r = s*j;
   }
   else if (m==0)
   {
      r = s;
   }
   return r;
}