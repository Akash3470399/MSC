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
									printf("yes, 'abab' is present");
									return 0;

									case '0':
									printf("no, 'abab is not present");
									return 0;

                                        				default :	
                                                			break;

                                				}
								break;
							case '0':
								printf("no, 'abab is not present");                     
                                                                return 0;


                        				default:
                                				break;
                				}
						break;		
					case '0':
						printf("no, 'abab is not present");                     
						return 0;
			
					default :
						break;

				}
				break;


				case '0':
                                     	printf("no, 'abab is not present");
                                        return 0;
			default:
				break;
		}
	}
	return 0;
}
