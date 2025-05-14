#include <stdio.h>
#include <string.h>

int main()
{
    int score[11]={0,80,70,90,100,81,95,86,45,78,91};
    int i=0,j=0,k=0;
    

    int choice[11];
    choice[0]=0;
    for(i=1;i<11;i++)
    {
        scanf("%d",&choice[i]);
    }//用choice数组存储选择的课程

    int num[5]={0};//存储每门课的选课人数
    for(i=1;i<=4;i++)//外循环,i存储课程序号
    {
        for(j=1;j<11;j++)//内循环,j存储学生号
        {
            if(choice[j]==i)
            {
                num[i]=num[i]+1;
            }
        }
    }//num存储选课人数

    int max[5]={0};//存储每门课的最高分
    int Nmax[5]={0};//存储每门课的最高分学生号
    for(i=1;i<=4;i++)
    {
        if(num[i]==0)
        {
            ;
        }
        else
        {
            for(j=1;j<11;j++)
            {
                if(choice[j]==i)
                {
                    if(score[j]>max[i])
                    {
                        max[i]=score[j];
                        Nmax[i]=j;
                    }
                }
            }
        }
    }

    for(i=1;i<=4;i++)
    {
        if(num[i]==0)
        {
            printf("%d号课程无人报\n",i);
        }
        else
        {
            printf("%d号课程录取第%d位学生%d分\n",i,Nmax[i],max[i]);
        }
    }

    return 0;


}
   