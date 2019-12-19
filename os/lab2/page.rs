
use std::time::{Duration, Instant};
use std::mem;
use std::ptr;

fn main() {
    let start : Instant = Instant::now();


    const PAGE_SIZE: usize = 32;
    const PAGES: usize = 16;
    const PAGE_INFO_SIZE: usize = 2;


    //*
    //foreach page 0..PAGES match a pair of OFFSET + TIMESTAMP
    const PAGE_OFFSET: usize = 0;
    const PAGE_TIMESTAMP: usize = 1;
    //*

    const RAM_SIZE: usize = PAGES * ( PAGE_INFO_SIZE + PAGE_SIZE / 2);
    const HDD_SIZE: usize = PAGES * PAGE_SIZE / 2;


    const INFO_OFFSET: usize = PAGES * PAGE_INFO_SIZE;

    let mut ram: [u32; RAM_SIZE] = [0; RAM_SIZE];
    let mut hdd: [u32; HDD_SIZE] = [0; HDD_SIZE];
    let mut offset: i32 = 0;


    
    fn page_data_offset(ram: &[u32], x: u32) -> usize {

        return ram[x as usize * PAGE_INFO_SIZE + PAGE_OFFSET] as usize;

    }

    fn LRUswap(ram: &mut [u32], hdd: &mut [u32], x: u32) {

        //find page in RAM with least timestamp
        //then swap page data + info with x data + info
        let mut min_timestamp: u32 = std::u32::MAX;
        let mut page: u32 = 0;

        for i in 0..(INFO_OFFSET/PAGE_INFO_SIZE) {
            
            if (ram[i * PAGE_INFO_SIZE + PAGE_OFFSET] < RAM_SIZE as u32
                && ram[i * PAGE_INFO_SIZE + PAGE_TIMESTAMP] < min_timestamp) {

                page = i as u32;
                min_timestamp = ram[i * PAGE_INFO_SIZE + PAGE_TIMESTAMP];
            }
        }

        //ptrs data&info
        let x_offset : usize = page_data_offset(ram, x);
        let page_offset : usize = page_data_offset(ram, page);

        let page_info_ptr = ram[page as usize * PAGE_INFO_SIZE..].as_mut_ptr() as *mut [u32; PAGE_INFO_SIZE];
        let x_info_ptr = ram[x as usize * PAGE_INFO_SIZE..].as_mut_ptr() as *mut [u32; PAGE_INFO_SIZE];


        let x_data_ptr = hdd[x_offset - RAM_SIZE..].as_mut_ptr() as *mut [u32; PAGE_SIZE];
        let page_data_ptr = ram[page_offset..].as_mut_ptr() as *mut [u32; PAGE_SIZE];


        //swap info & data for x & page
        unsafe {
            ptr::swap(x_data_ptr, page_data_ptr);
            ptr::swap(x_info_ptr, page_info_ptr);
        }

        /*for i in 0..PAGE_SIZE {
            print!("{}", hdd[i + x_offset - RAM_SIZE]);
        }
        print!("\n");
        for i in 0..PAGE_SIZE {
            print!("{}", ram[i + page_offset]);
        }*/
        


    }
    
    //use after swap
    fn write(ram: &mut [u32], hdd: &mut [u32], x: u32, data: &[u32], start : Instant) {
        

        let mut x_offset : usize = page_data_offset(ram, x);

        if (x_offset >= RAM_SIZE) {
            LRUswap(ram, hdd, x);
        }
        
        //set timestamp for page x -- millis since program started
        ram[x as usize * PAGE_INFO_SIZE + PAGE_TIMESTAMP] = Instant::now().duration_since(start).subsec_millis();
        

        //find new offset after swap

        x_offset = page_data_offset(ram, x);
        
        //print!("WRITE: {}", x_offset);

        //add new data
        for i in 0..data.len() {
            ram[x_offset + i] = data[i];
        }

        //set odd bytes to 0
        /*for i in 0..(PAGE_SIZE - data.len() ) {
            ram[x_offset + data.len() + i] = 0;
        }*/
    
    }

    fn read(ram: &mut [u32], hdd: &mut [u32], x: u32, start : Instant) {



        let mut x_offset : usize = page_data_offset(ram, x);

        if (x_offset > RAM_SIZE) {
            LRUswap(ram, hdd, x);
        }

        x_offset = page_data_offset(ram, x);

        ram[x as usize * PAGE_INFO_SIZE + PAGE_TIMESTAMP] = Instant::now().duration_since(start).subsec_millis();
        
        
        for i in 0..PAGE_SIZE {
            print!("{}", ram[x_offset + i])
        }

    }

    fn printInfo(ram: &[u32], hdd: &[u32]) {
        for i in 0..PAGES {
            print!("{:?} - page, {:?} - offset, {:?} - timestamp\n", i
                    , ram[i * PAGE_INFO_SIZE + PAGE_OFFSET]
                    , ram[i * PAGE_INFO_SIZE + PAGE_TIMESTAMP]);
        }

        print!("{:-<1$}\n", " ", 50);

        for i in 0..7 {
            print!("\n");
            for j in 0..PAGE_SIZE {
                print!("{}", ram[INFO_OFFSET + j + PAGE_SIZE*(i+1)])
            }
        }

        for i in 0..7 {
            print!("\n");
            for j in 0..PAGE_SIZE {
                print!("{}", hdd[j + PAGE_SIZE*(i+1)])
            }
        }

    }

    //init : set offsets or addresses
    for i in 0..PAGES {
        ram[i * PAGE_INFO_SIZE + PAGE_OFFSET] = (INFO_OFFSET + i * PAGE_SIZE) as u32;
    }



    write(&mut ram, &mut hdd, 9, &mut [1,2,3], start);
    write(&mut ram, &mut hdd, 0, &mut [111,2,3], start);
    write(&mut ram, &mut hdd, 11, &mut [321,2,3], start);
    read(&mut ram, &mut hdd, 11, start);

    //printInfo(&ram, &hdd);


    
}

