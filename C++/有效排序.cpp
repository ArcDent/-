#include <stdio.h>
#include <string.h>

int main()
{
    int N[11]={0};
    int i,j,m,n;

    int a;
    scanf("%d",&a);

    for(i=0;i<a;i++)
    {
        scanf("%d",&N[i]);
    }

    int X;
    scanf("%d",&X);

    if (a==1)
    {
        if(N[0]>X)
        {
            N[1]=N[0];
            N[0]=X;
        }
        else
        {
            N[1]=X;
        }
    }
    else
    {
            for(i=0;i<a;i++)
        {
            if(i==0)
            {
                if(N[0]>X)
                {
                    m=0;
                }
            }
            else if(i==a-1)
            {
                if(N[a-1]<X)
                {
                 m=a;
                }
            }
            else 
            {
                if(N[i-1]<=X && N[i]>=X)
                {
                    m=i;
                }
            }
        }

        for(i=a;i>=m;i--)
        {
            N[i+1]=N[i];
        }

        N[m]=X;

    }
    
    for(i=0;i<=a;i++)
    {
        printf("%d ",N[i]); 
    }

    return 0;
}