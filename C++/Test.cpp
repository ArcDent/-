#include <stdio.h>

int main()
{
    int a=2,b=4,c=5;
    if(a>b)
        c=a;
        a=b;
        b=c;
    printf("a=%d,b=%d,c=%d",a,b,c);
    return 0;
}
    