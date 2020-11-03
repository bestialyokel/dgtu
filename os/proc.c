

#include <stddef.h>



void procs_info_print(void)
{
        for_each_process(1);
}


int main(void) {

    procs_info_print();

    return 0;

}
