#include <stdio.h>

int main()
{
	int t = 0;
	while(1)
	{
		switch(getchar())
		{
			case 'a':
				t = t + 1;
				break;
			case 'b':
				t = t - 1;
				break;
			case '0':
				switch(t)
				{

					case 0:
						printf("yes there are equal no. of a's and b's.\n");
						break;
					default:
						printf("no, there are not equal no. of a's and b's.\n");
				}
				return 0;
			default:
				break;

		}		
		
	}

}
