#include <stdio.h>

int main()
{
   int Tar = 0;
   int Sum,i;
   scanf("%d",&Tar);
   for(i=1;i<Tar/2+1;i++)
   {
      if(Tar%i==0)
      {
         Sum += i;
      }
      else
      {
         continue;
      }
   }
   if(Sum==Tar)
   {
      printf("是完数\n");
   }
   else
   {
      printf("不是完数\n");
   }
   return 0;
}
