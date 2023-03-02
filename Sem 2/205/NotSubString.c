#include <stdio.h>

int main()
{

	int s = 0;
	while(1)
	{
		switch(getchar())
		{
		
			case 'a':
				switch(getchar())
				{
					case 'b':
						switch(getchar())
				                {

                      					case 'a':
                                				switch(getchar())
                                				{
                                        				case 'b':
									printf("No");
									return 0;

									case '0':
									printf("yes");
									return 0;

                                        				default :	
                                                			break;

                                				}
								break;
							case '0':
								printf("yes");
                                                                return 0;


                        				default:
                                				break;
                				}
						break;		
					case '0':
						printf("yes");
						return 0;
			
					default :
						break;

				}
				break;


				case '0':
                                     	printf("yes");
                                        return 0;
			default:
				break;
		}
	}
	return 0;
}
