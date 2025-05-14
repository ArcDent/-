#include <stdio.h>
#include <string.h>



int main()
{
   int n=0,i=0,j=0,k=0,length=0,value=0,max=0;
   float times=1.0;
   scanf("%d", &n);
   int A[n];//存储学生精神值
   int B[n];//存储最大精神值下标

   struct Student
   {
      char name[21];
      int D;
      char introduction[101];
   };//定义结构体

   struct Student students[n];//声明结构体变量

   for(i=0;i<n;i++)
   {
      scanf("%s",students[i].name);
      scanf("%d", &students[i].D);
      scanf("%s",students[i].introduction);
   }//输入学生信息

   for(i=0;i<n;i++)
   {
      length=strlen(students[i].introduction);
      value=students[i].D*length;
      A[i]=value;
   }//存储精神值

   max=A[0];
   for(i=0;i<n;i++)
   {
      if(A[i]>max)
      {
         max=A[i];
      }
   }//寻找最大精神值

   for(i=0;i<n;i++)
   {
      if(A[i]==max)
      {
         B[k]=i;
         k++;
      }
   }//存储最大精神值下标

   printf("%d\n",A[B[0]]);

   for(i=0;i<k;i++)
   {
      printf("%s:hao!hen you jing shen!\n",students[B[i]].name);
   }

   return 0;


   
}