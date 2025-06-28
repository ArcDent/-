#include <stdio.h>
int siu(int x);
int main()
{
    int a[501]={0},c[501]={0};
    int b,i,j,t,s,flag=0;
    scanf("%d",&b);
    for(i=0;i<=b-1;i++)
    {
        scanf("%d",&a[i]);
        c[i]=siu(a[i]);
    }
    for(i=1,flag=0;i<=b-1;i++,flag=0)
    {
        for(j=1;j<=b-i;j++)
        {
            if(c[j]<c[j-1])
            {
                t=c[j];
                c[j]=c[j-i];
                c[j-1]=t;
                s=a[j];
                a[j]=a[j-1];
                a[j-1]=s;
                flag=1;
            }
        }
        if(flag==0)
            break;
    }
    for(i=0;i<=b-1;i++)
    {
        printf("%d(%d) ",a[i],c[i]);
    }
    return 0;
}
int siu(int x)
{
    int k,sum=0;
    if(x==1)
    return 0;
    else
    {
        for(k=1;k<x;k++)
        {
            if(x%k==0)
                sum=sum+k;
        }
        return sum;
    }
}