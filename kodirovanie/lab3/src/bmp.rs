struct BITMAPFILEHEADER {
    bfType: u8,
    bfSize: i32,
    bfReserved: i32,
    bfOffBits: i32,
    biSize: i32,
    biWidth: i32,
    biHeight: i32,
    biPlanes: u8,
    biSizeImage: i32,
    biXPelsPerMeter: i32,
    biYPelsPerMeter: i32,
    biClrUsed: i32,
    biClrImportant: i32,
}

impl BITMAPFILEHEADER {
    pub fn new(fileName: File) -> Self {
        Self {

        }
    }
}