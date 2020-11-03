

int main() {
    int *a = malloc(sizeof(int) * 3);
    a[1] = 1488;
    printf("%d", *(a+1));
}