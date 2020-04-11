use std::fs::File;
use std::io::Read;
use std::mem;

/*
/*  3.0 version */
struct BITMAPINFOHEADER {
    //specifies the number of data required by the struct
    biSize: u32,
    //specifies width in pixels
    biWidth: i32,
    //species height in pixels
    biHeight: i32,
    //specifies the number of color planes, must be 1
    biPlanes: u16,
    //specifies the number of bit per pixel
    biBitCount: u16,
    //spcifies the type of compression
    biCompression: u32,
    //size of image in data
    biSizeImage: u32,
    //number of pixels per meter in x axis
    biXPelsPerMeter: i32,
    //number of pixels per meter in y axis
    biYPelsPerMeter: i32,
    //number of colors used by th ebitmap
    biClrUsed: u32,
    //number of colors that are important
    biClrImportant: u32,
}

*/

/*  ?
    LONG - i32,
    DWORD - u32,
    WORD - u16
*/

//BITMAPFILEHEADER
struct BFH {
    //specifies the file type
    bfType: u16,
    //specifies the size in bytes of the bitmap file
    bfSize: u32,
    //reserved; must be 0
    bfReserved1: u16,
    //reserved; must be 0
    bfReserved2: u16,
    //species the offset in bytes from the bitmapfileheader to the bitmap bits
    bfOffBits: u32,
}

impl BFH {
    fn new() -> Self {
        Self {
            bfType: 0,
            bfSize: 0,
            bfReserved1: 0,
            bfReserved2: 0,
            bfOffBits: 0,
        }
    }
}

fn main() {
    let mut a: BFH = BFH { ..BFH::new() };

    let mut file = File::open("1.bmp").unwrap();
    let mut buf = [0u8; 2];
    file.read(&mut buf).unwrap();
    println!("{:?}", buf);
    file.read(&mut buf).unwrap();
    println!("{:?}", buf);
}
