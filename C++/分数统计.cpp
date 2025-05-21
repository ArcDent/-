#include <stdio.h>
#include <string.h>

int main()
{
    int N[100001]={0},count[1001]={0};
    int i,j,m,n,Num,sum=0;

    scanf("%d",&Num);

    for(i=1;i<=Num;i++)
    {
        scanf("%d",&N[i]);
    }

    for(i=1;i<=Num;i++)
    {
        count[N[i]]+=1;
    }//记录每个数字出现的次数

   int A[1001]={0};
   for(i=0;i<=1000;i++)
   {
        if(i==0)
        {
            A[i]=0;
        }
        else
        {
            A[i]=A[i-1]+count[i-1];
        }
   }

    for(i=1;i<=Num;i++)
    {
        printf("%d ",A[N[i]]);
    }

    return 0;
}