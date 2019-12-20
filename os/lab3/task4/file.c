#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <dirent.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sys/wait.h>




void executeExistingOrWait(char folder[255]) {
    DIR *dir;
    struct dirent *entry;
    int counter = 0;


    dir = opendir(folder);
    entry = readdir(dir);
    while(entry != NULL) {
        struct stat sb;
        stat(entry->d_name, &sb);
        if (entry->d_type != 4 && sb.st_mode & S_IXUSR) { //S_IXUSR ~ FLAG X            && sb.st_mode & S_IEXEC && sb.st_mode & S_IXUSR
            //compiled c file 
            char file[255] = {0};
            strcat(file, folder);
            strcat(file, "/");
            strcat(file, entry->d_name);
            counter += 1;
            


            //RUN && DELETE
            pid_t pid = fork();
            int status;
            if (pid == 0) execl(file, file);
            else waitpid(-1, &status, 0);

            if (remove(file) == 0) printf("%s%s\n", file, " was deleted");
            else printf("%s%s\n", "couldn't delete ", file);
            
            
            //printf("%s\n", file);
            //printf("%d\n", sb.st_mode);

        }
        entry = readdir(dir);
    }
    closedir(dir);
    if (counter == 0) {
        sleep(2);
        //printf("%s\n", "not found");
        executeExistingOrWait(folder);
    }
}

int main(int argc, char **argv)
{
    char filename[256];
    if ( argc < 2 ) strcpy(filename, ".");
            else strcpy(filename, argv[1]);
    printf("Корневой каталог %s\n\n", filename);

    executeExistingOrWait(filename);
    return 0;
}
