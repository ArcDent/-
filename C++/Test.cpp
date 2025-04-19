#include <stdio.h>

int main()
{
   int a,b;
   int n,m;
   int i = 2;
   int j = 1;
   scanf("%d %d", &a, &b);
   n = a;
   for(n=a;n<=b;n++)
   {
      i = 2;
      j = 1;
      m = n;
      printf("%d=",n);
      for (i=2;i<=m;i++)
      {  
         if (m%i==0 && j==1)
         {
            m = m/i;
            printf("%d",i);
            i = 1;
            j++;
         }
         else if (m%i==0 && j>1)
         {
            m = m/i;
            printf("*%d",i);
            i = 1;
            j++;
         }
      }
      printf("\n");
   }
   return 0;
}
