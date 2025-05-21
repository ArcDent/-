#include <stdio.h>
#include <string.h>


int main()
{
    char IP[33];
    int i,j,m,n;
    int a[4]={0};
    fgets(IP,sizeof(IP),stdin);
    char *p=IP;
    int N[8]={1,2,4,8,16,32,64,128};

    for(i=0;i<4;i++)
    {
        for(j=7;j>=0;j--)
        {
            m=7-j+i*8;
            n=IP[m]-'0';
            a[i]+=n*N[j];
        }
    }

    for(i=0;i<4;i++)
    {
        if(i==3)
        {
            printf("%d",a[i]);
        }
        else
        {
            printf("%d.",a[i]);
        }
    }

    return 0;
}   
