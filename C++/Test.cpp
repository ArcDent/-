#include <stdio.h>

int main()
{
   int Target,Reverse;
   scanf("%d",&Target);
   int n,i,j = 0;
   n = Target;
   while(1)
   {
      if(n/10 != 0)
      {
         i = n%10;
         j = j*10 + i;
      }
      else
      {
         Reverse = j;
         break;
      }
   }
   if(Target == Reverse)
   {
      printf("%d 是回文数",Target);
   }
   else
   {
      printf("%d 不是回文数",Target);
   }
   return 0;
}


