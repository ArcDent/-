#include <stdio.h>

int main()
{
   int N;
   scanf("%d",&N);
   if (N<0||N>=10000)
   {
    printf("N is out of range\n");
   }
   else if (N>=0&&N<=9)
   {
    printf("1\n");
   }
   else if (N>=10&&N<=99)
   {
    printf("2\n");
   }
   else if (N>=100&&N<=999)
   {
    printf("3\n");
   }
   else
   {
    printf("4\n");
   }
}


