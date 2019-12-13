#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <dirent.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sys/wait.h>

void showdir(char path[255], size_t spath_len, char to[255]) {

    DIR *dir;
    struct dirent *entry;

    printf("%s\n", path);
    //folder does not exist
    if (access(path, F_OK) == -1) return;
    //if (access(to, F_OK) == -1) return;

    dir = opendir(path);

    //file was opened
    if (dir == NULL) {

        char newPath[255] = {0};

        //extract name of file/folder without path
        char filename[spath_len + 1];
        memcpy(filename, &path[strlen(path) - spath_len], spath_len);
        filename[spath_len] = '\0';


        //form path for copied file
        char newFilePath[255] = {0};
        strcat(newFilePath, to);
        strcat(newFilePath, "/");
        strcat(newFilePath, filename);

        
        

        printf("%s\n", path);
        printf("%s\n", newFilePath);

        pid_t pid = fork();
        int status;
        if (pid == 0) execl("./filecopy", path, newFilePath);
        else waitpid(-1, &status, 0);

        closedir(dir);
        return;
    } else {

        //mkdir with write read execute privileges
        mkdir(to, S_IRWXU); 
    }

    entry = readdir(dir);
    while(entry) {
        
        //musornie paths . i ..
        if (entry->d_name[strlen(entry->d_name) - 1] == '.') {
            entry = readdir(dir);
            continue;
        }

        char nextPath[255] = {0};
        strcat(nextPath, path);
        strcat(nextPath, "/"); // stranno no ..// rabotaet
        strcat(nextPath, entry->d_name);


        char nextTo[255] = {0};
        strcat(nextTo, to);
        if (entry->d_type == 4) {
            strcat(nextTo, "/");
            strcat(nextTo, entry->d_name);
        } 
        
        //folder zdes
        showdir(nextPath, strlen(entry->d_name), nextTo);

        entry = readdir(dir);
    }
    closedir(dir);
}

int main(int argc, char **argv) {
    char filename[256];
    if ( argc < 2 ) strcpy(filename, ".");
            else strcpy(filename, argv[1]);
    printf("Корневой каталог %s\n\n", filename);
    showdir(filename, 1, "./folder");
}