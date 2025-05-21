#include <stdio.h>
 
int main() {
    int N,i,j,k;
    int a[1001]={0};//初始化

    scanf("%d",&N);

    for(i=1;i<=N;i++)//还在场的N个猴子(1-N)全部标记为1
    {
        a[i]=1;
    }
    

    if (N==1)
    {
        printf("1");
    }

    else if (N>1)
    {
        j=0;
        k=N;//初始化
        while(k>1)
        {

            j=0;

            for(i=1;i<=N;i++)//从第1个开始，每3个去掉1个
            {
                if(a[i]==1)
                {

                    j++;
                    //printf("====%d====\n ",k);//测试输出
                    //printf("--%d--\n ",j);//测试输出


                    if(j%3==0)
                    {
                        k--;
                        a[i]=0;
                        //printf("==%d==\n ",i);//测试输出
                    }
                }

                if (i==N && k>1)//多余2个在场，圆形检索
                {
                    i=0;
                }
                else if (k==1)//只剩下1个猴子
                {
                    break;
                }
            }

            for(i=1;i<=N;i++)//输出还在场的猴子
            {
                if(a[i]==1)
                {
                    printf("%d",i);
                }
            }
        }
    }
    

    return 0;
}





   

    
