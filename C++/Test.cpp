#include <stdio.h>

int main()
{
   int Num,Rev,n;
   scanf("%d",&n);
   if(n>=10 && n < 100)
   {
      for (Num=10;Num<=n;Num++)
      {
         Rev = Num/10 + (Num%10)*10;
         if (Num-Rev == 9)
         {
            printf("%d\n",Num);
         }
         else
         {
            continue;
         }
      }
      return 0;
   }
}


