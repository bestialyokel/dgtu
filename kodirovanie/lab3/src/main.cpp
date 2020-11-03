#include <stdio.h>
#include <string.h>
#include <iostream>

using namespace std;

typedef unsigned short WORD;

#pragma pack(push, 1)
typedef struct {
      WORD      bfType;      // 0x4d42 | 0x4349 | 0x5450
      int       bfSize;      // размер файла
      WORD      bfReserved1; // 0
      WORD      bfReserved2; // 0
      int       bfOffBits;   // смещение до поля данных,
                             // обычно 54 = 16 + biSize

      int       biSize;      // размер струкуры в байтах:
                             // 40(BITMAPINFOHEADER) или 108(BITMAPV4HEADER)
                             // или 124(BITMAPV5HEADER)
      int    biWidth;        // ширина в точках
      int    biHeight;       // высота в точках
      WORD   biPlanes;       // всегда должно быть 1
      WORD   biBitCount;     // 0 | 1 | 4 | 8 | 16 | 24 | 32
      int    biCompression;  // BI_RGB | BI_RLE8 | BI_RLE4 |
                             // BI_BITFIELDS | BI_JPEG | BI_PNG
                             // реально используется лишь BI_RGB
      int    biSizeImage;    // Количество байт в поле данных
                             // Обычно устанавливается в 0
      int    biXPelsPerMeter;// горизонтальное разрешение, точек на дюйм
      int    biYPelsPerMeter;// вертикальное разрешение, точек на дюйм
      int    biClrUsed;      // Количество используемых цветов
                             // (если есть таблица цветов)
      int    biClrImportant; // Количество существенных цветов.
                             // Можно считать, просто 0
} BMPheader;
#pragma pack(pop)

unsigned char *Qc;
//читает картинку картинку и заголовок
int *loadBMP( const char *fname, int &mx, int &my)
{
    printf("%d\n", sizeof (BMPheader));
    mx = my = -1;
    FILE *f = fopen(fname, "rb");
    if( !f ) {printf("File not open!\n"); return NULL;}
    BMPheader bh;    // File header sizeof(BMPheader) = 56
    size_t res;

    // читаем заголовок
    res = fread( &bh, 1, sizeof(BMPheader), f );

    if( res != sizeof(BMPheader) ) { printf("Error header!\n"); fclose(f); return NULL; }

    // проверяем сигнатуру
    if( bh.bfType!=0x4d42 && bh.bfType!=0x4349 && bh.bfType!=0x5450 ) { printf("Error signature!\n"); fclose(f); return NULL; }

    // проверка размера файла
    fseek( f, 0, SEEK_END);
    int filesize = ftell(f);
    printf("filesize = %d\n", filesize);
    printf("bh.bfSize = %d\n", bh.bfSize);
    // восстановим указатель в файле:
    fseek( f, sizeof(BMPheader), SEEK_SET);
    // проверим условия
    if( bh.bfSize != filesize ||
        bh.bfReserved1 != 0    ||
        bh.biPlanes   != 1    ||
       (bh.biSize!=40 && bh.biSize!=108 && bh.biSize!=124)||
        bh.bfOffBits != 14+bh.biSize ||

        bh.biWidth <1 || bh.biWidth >10000 ||
        bh.biHeight<1 || bh.biHeight>10000 ||
        bh.biBitCount    != 24 ||             // пока рассматриваем только полноцветные изображения
        bh.biCompression !=  0                // пока рассматриваем только несжатие изображения
        )
    {
            printf("Error uslovie!\n");
            fclose(f);
            return NULL;
    }
    // Заголовок прочитан и проверен, тип - верный (BGR-24), размеры (mx,my) найдены
    mx = bh.biWidth;
    my = bh.biHeight;
    int mx3 = (3*mx+3) & (-4);    // Compute row width in file, including padding to 4-byte boundary
    printf("mx3 = %d\n", mx3);
//    printf("%d\n", mx3);
    unsigned char *tmp_buf = new unsigned char[mx3*my];    // читаем данные
    res = fread(tmp_buf, 1, mx3*my, f);
//    printf("%d\n", res);
    Qc = new unsigned char[mx3*my];
    if( (int)res != mx3*my ) { printf("Data not write!"); delete []tmp_buf; fclose(f); return NULL; }
    memcpy(Qc, tmp_buf, mx3*my);
    // данные прочитаны
    fclose(f);

    printf("data = %d", bh.bfOffBits);

    // выделим память для результата
    int *v = new int[mx*my];

    // Перенос данных (не забудем про BGR->RGB)
    unsigned char *ptr = (unsigned char *) v;
    for(int y = my-1; y >= 0; y--) {
        unsigned char *pRow = tmp_buf + mx3*y;
        for(int x=0; x< mx; x++) {

            *ptr++ = *(pRow + 2);
            *ptr++ = *(pRow + 1);
            *ptr++ = *pRow;
            pRow+=3;
            ptr++;
        }
    }
    delete []tmp_buf;
    return v;    // OK
}

//расклыдывает картинку на 3 (r g b)
//создает файлы rrle, grle, brle для последующего сжатия
//создает файл rgbrle в котором будет разрешение картинки/и всякие там rle`шки
int saveBMP(const char *fname, int *v, int mx, int my)	// В каждом элементе упаковано все три RGB-байта
{
    BMPheader bh;	// Заголовок файла, sizeof(BMPheader) = 56
    memset( &bh, 0, sizeof(bh) );
    bh.bfType =0x4d42;	// 'BM'
    // Найдем длину строки в файле, включая округление вверх до кратного 4:
    int mx3 = (3*mx+3) & (-4);
    int filesize = 54 + my*mx3;
    bh.bfSize = filesize;
    bh.bfReserved1 =  0;
    bh.biPlanes   =  1;
    bh.biSize     = 40;
    bh.bfOffBits  = 14 + bh.biSize;
    bh.biWidth    = mx;
    bh.biHeight   = my;
    bh.biBitCount = 24;
    bh.biCompression= 0;

    FILE *r;
    FILE *g;
    FILE *b;

    FILE *rrle;
    FILE *grle;
    FILE *brle;

    FILE *rgbrle;

    r = fopen("r.bmp", "wb");   //
    g = fopen("g.bmp", "wb");   //
    b = fopen("b.bmp", "wb");   // r g b картинки

    rrle = fopen("rrle.txt", "w");  //
    grle = fopen("grle.txt", "w");  //
    brle = fopen("brle.txt", "w");  //файлы для rle

    rgbrle = fopen("rgbrle.txt", "w");  //финальный файл с rle r g b

    fwrite(&bh, sizeof (bh), 1, r); //
    fwrite(&bh, sizeof (bh), 1, g); //
    fwrite(&bh, sizeof (bh), 1, b); //пишем header

    fprintf(rgbrle, "%dx%d/", mx, my); //пишем размер в rgbrle.txt

    // приготовим временный буфер
    unsigned char *tmp_buf_r = new unsigned char[mx3*my];
    unsigned char *tmp_buf_g = new unsigned char[mx3*my];
    unsigned char *tmp_buf_b = new unsigned char[mx3*my];
    // Перенос данных (не забудем про RGB->BGR)
    unsigned char *ptr = (unsigned char *) v;
    for(int y = my-1; y >= 0; y--) {
        unsigned char *pRow_r = tmp_buf_r + mx3*y;
        unsigned char *pRow_g = tmp_buf_g + mx3*y;
        unsigned char *pRow_b = tmp_buf_b + mx3*y;
        for(int x=0; x< mx; x++) {
            //тут происходит магия
            fprintf(rrle, "%c", *ptr);//r
            *(pRow_r + 2) = *ptr++;
            *(pRow_g + 2) = 0;
            *(pRow_b + 2) = 0;

            *(pRow_r + 1) = 0;
            fprintf(grle, "%c", *ptr);//g
            *(pRow_g + 1) = *ptr++;
            *(pRow_b + 1) = 0;


            *pRow_r       = 0;
            *pRow_g       = 0;
            fprintf(brle, "%c", *ptr);//b
            *pRow_b       = *ptr++;

            pRow_r += 3;
            pRow_g += 3;
            pRow_b += 3;
            ptr++;
        }
    }
    fwrite(tmp_buf_r, 1, mx3*my, r);    //
    fwrite(tmp_buf_g, 1, mx3*my, g);    //
    fwrite(tmp_buf_b, 1, mx3*my, b);    //пишем r g b картинки

    fclose(r);      //
    fclose(g);      //
    fclose(b);      //

    fputc((char)256, rrle);
    fputc(256, grle);
    fputc(256, brle);

    fclose(rrle);   //
    fclose(grle);   //
    fclose(brle);   //

    fclose(rgbrle); //закрываем файлы

    delete []tmp_buf_r;
    delete []tmp_buf_g;
    delete []tmp_buf_b;
    return 0;	// OK
}

//сжимает рле в файл rgbrle
void createRGBRLE()
{
    FILE *rrle;
    FILE *grle;
    FILE *brle;

    FILE *rgbrle;

    rrle = fopen("rrle.txt", "r");  //
    grle = fopen("grle.txt", "r");  //
    brle = fopen("brle.txt", "r");  //файлы с rle

    rgbrle = fopen("rgbrle.txt", "a+");  //финальный файл с rle r g b

    int k = 1;
    char c = fgetc(rrle);
    char nc = fgetc(rrle);

    while(c != (char)256)
    {
        if (c == nc)
        {
            k++;
            nc = fgetc(rrle);
        }
        else
        {
            printf("%c - %d\n", c, k);
            fprintf(rgbrle, "%d%c", k, c);
            k = 1;
            c = nc;
            nc = fgetc(rrle);
        }
    }

    fprintf(rgbrle, "/");

    k = 1;
    c = fgetc(grle);
    nc = fgetc(grle);

    while(c != (char)256)
    {
        if (c == nc)
        {
            k++;
            nc = fgetc(grle);
        }
        else
        {
            printf("%c - %d\n", c, k);
            fprintf(rgbrle, "%d%c", k, c);
            k = 1;
            c = nc;
            nc = fgetc(grle);
        }
    }

    fprintf(rgbrle, "/");

    k = 1;
    c = fgetc(brle);
    nc = fgetc(brle);

    while(c != (char)256)
    {
        if (c == nc)
        {
            k++;
            nc = fgetc(brle);
        }
        else
        {
            printf("%c - %d\n", c, k);
            fprintf(rgbrle, "%d%c", k, c);
            k = 1;
            c = nc;
            nc = fgetc(brle);
        }
    }

    fprintf(rgbrle, "/");

    printf("%c", c);

    fclose(rrle);
    fclose(grle);
    fclose(brle);

    fclose(rgbrle);
}


void ucreateRGBRLE()
{
    int mx, my;
    char m;

    FILE *rgbrle;
    FILE *final;

    rgbrle = fopen("rgbrle.txt", "r+");
    final = fopen("final.bmp", "wb");

    fscanf(rgbrle, "%d", &mx);
    fscanf(rgbrle, "%c", &m);
    fscanf(rgbrle, "%d", &my);
    printf("\nx = %d, y = %d\n", mx, my);

    BMPheader bh;	// Заголовок файла, sizeof(BMPheader) = 56
    memset( &bh, 0, sizeof(bh) );
    bh.bfType =0x4d42;	// 'BM'
    // Найдем длину строки в файле, включая округление вверх до кратного 4:
    int mx3 = (3*mx+3) & (-4);
    int filesize = 54 + my*mx3;
    bh.bfSize = filesize;
    bh.bfReserved1 =  0;
    bh.biPlanes   =  1;
    bh.biSize     = 40;
    bh.bfOffBits  = 14 + bh.biSize;
    bh.biWidth    = mx;
    bh.biHeight   = my;
    bh.biBitCount = 24;
    bh.biCompression= 0;

    fwrite(&bh, sizeof (bh), 1, final); //пишем header

    unsigned char *tmp_buf = new unsigned char[mx3*my];
    fscanf(rgbrle, "%c", &m);
    while(!feof(rgbrle))
    {
        int k;
        char c;

        fscanf(rgbrle, "%d", &k);
        fscanf(rgbrle, "%c", &c);
        //вот тут ниреха не работает
        //потом допишу
        if(c != '/')
        {
            printf("%c - %d\n", c, k);
                for (int y = my-1; y >= 0; y--)
                {
                    unsigned char *pRow = tmp_buf + mx3*y;
                    for (int x = 0; x < mx; x++)
                    {
                        *pRow       = 0;
                        *(pRow + 1) = 0;
                        *(pRow + 2) = c;

                        *pRow       = c;
                        *(pRow + 1) = 0;
                        *(pRow + 2) = 0;

                        *pRow       = 0;
                        *(pRow + 1) = c;
                        *(pRow + 2) = 0;
                        pRow += 3;
                    }
                }
        }
        else
        {
            break;
        }
//        fwrite(Qc, sizeof(Qc), 1, final); //
    }
    fwrite(Qc, 1, mx3*my, final);
    fclose(final);
}

void printHeader()
{
    FILE *file;
    BMPheader h;

    file = fopen("image.bmp", "rb");
    fread(&h, 1, sizeof(BMPheader), file);
    fclose(file);

    cout << endl;
    cout << h.bfType << endl;
    cout << h.bfSize << endl;
    cout << h.bfReserved1 << endl;
    cout << h.bfReserved2 << endl;
    cout << h.bfOffBits << endl;

    cout << h.biSize << endl;
    cout << h.biWidth << endl;
    cout << h.biHeight << endl;
    cout << h.biPlanes << endl;
    cout << h.biBitCount << endl;
    cout << h.biCompression << endl;
    cout << h.biSizeImage << endl;
    cout << h.biXPelsPerMeter << endl;
    cout << h.biYPelsPerMeter << endl;
    cout << h.biClrUsed << endl;
    cout << h.biClrImportant << endl;
    cout << endl;
}

int main(int argc, char **argv)
{
    while (1) {
        char cc;
        printf("c - cod\n");
        printf("u - decod\n");
        printf("h - header\n");
        printf("q - exit\n");
        printf(">>> ");
        scanf("%c", &cc);

        if (cc == 'c'){
            int mx, my;                              // для размеров изображения
            int *v = loadBMP("image.bmp", mx, my);
            printf("%d, %d", mx, my);
            saveBMP("file.bmp", v, 65, 61);
            createRGBRLE();
            delete [] v;
        }
        else if (cc == 'u') {
            ucreateRGBRLE();
        }
        else if (cc == 'h') {
                printHeader();
        }
        else if (cc == 'q') {
            return 0;
        }
    }
    return 0;
}
