#include <stdio.h>
#include <string.h>

int main()
{
    int N,M;
    scanf("%d",&N);//学生人数
    scanf("%d",&M);//题目数量

    int Ans[N+2][M];
    int i,j,m,n;

    for(i=0;i<M;i++)
    {
        scanf("%d",&Ans[0][i]);
    }//题目分数

    for(i=0;i<M;i++)
    {
        scanf("%d",&Ans[N+1][i]);
    }//题目答案

    for(i=1;i<N+1;i++)
    {
        for(j=0;j<M;j++)
        {
            scanf("%d",&Ans[i][j]);
        }
    }//学生答案

    int Score[N+1]={0};
    for(i=1;i<N+1;i++)
    {
        for(j=0;j<M;j++)
        {
            if(Ans[i][j]==Ans[N+1][j])
            {
                Score[i]+=Ans[0][j];
            }
            else
            {
                Score[i]+=0;
            }
        }
        printf("%d\n",Score[i]);
    }

    return 0;
}