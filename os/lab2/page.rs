
use std::time::{Duration, Instant}; //for timestamps
use std::ptr; //for swaps at info seg & data seg&
use std::thread;


//LRU swap LAB2 OS
fn main() {

    let start : Instant = Instant::now(); //

    const PAGE_SIZE: usize = 32;
    const PAGES: usize = 16;

    const PAGE_INFO_SIZE: usize = 2;
    //offsets for PAGE.info 
    const PAGE_OFFSET: usize = 0;
    const PAGE_TIMESTAMP: usize = 1;

    const RAM_SIZE: usize = PAGES * ( PAGE_INFO_SIZE + PAGE_SIZE / 2);//256 + PAGE_INFO_SIZE * PAGES
    const HDD_SIZE: usize = PAGES * PAGE_SIZE / 2; //256

    const RAM_PAGES: usize = (RAM_SIZE - INFO_OFFSET)/PAGE_SIZE; //8
    const HDD_PAGES: usize = HDD_SIZE/PAGE_SIZE; //8


    const INFO_OFFSET: usize = PAGES * PAGE_INFO_SIZE; //32

    let mut ram: [usize; RAM_SIZE] = [0; RAM_SIZE];
    let mut hdd: [usize; HDD_SIZE] = [0; HDD_SIZE];
    let mut offset: i32 = 0;


    
    fn LRUswap(ram: &mut [usize], hdd: &mut [usize], x: usize) {

        //find latest used page in RAM!
        //then swap page data + info with x data + info

        let mut min_timestamp: usize = std::usize::MAX;
        let mut page: usize = 0;

        for i in 0..(INFO_OFFSET/PAGE_INFO_SIZE) {
            if (ram[i * PAGE_INFO_SIZE + PAGE_OFFSET] < RAM_SIZE
                && ram[i * PAGE_INFO_SIZE + PAGE_TIMESTAMP] < min_timestamp) {

                page = i;
                min_timestamp = ram[i * PAGE_INFO_SIZE + PAGE_TIMESTAMP];
            }
        }

        //ptrs data&info
        let x_offset : usize = ram[x  * PAGE_INFO_SIZE + PAGE_OFFSET]; //page_data_offset(ram, x);
        let page_offset : usize = ram[page  * PAGE_INFO_SIZE + PAGE_OFFSET]; //page_data_offset(ram, page);

        let page_info_ptr = ram[page * PAGE_INFO_SIZE..].as_mut_ptr() as *mut [usize; PAGE_INFO_SIZE];
        let x_info_ptr = ram[x * PAGE_INFO_SIZE..].as_mut_ptr() as *mut [usize; PAGE_INFO_SIZE];

        let x_data_ptr = hdd[x_offset - RAM_SIZE..].as_mut_ptr() as *mut [usize; PAGE_SIZE];
        let page_data_ptr = ram[page_offset..].as_mut_ptr() as *mut [usize; PAGE_SIZE];

        //swap info & data for x & page
        unsafe {
            ptr::swap(x_data_ptr, page_data_ptr);
            ptr::swap(x_info_ptr, page_info_ptr);
        }
        
    }
    
    //if x in HDD then swap and write to x
    fn write(ram: &mut [usize], hdd: &mut [usize], x: usize, data: &[usize], start : Instant) {

        let mut x_offset: usize = ram[x  * PAGE_INFO_SIZE + PAGE_OFFSET];

        if (ram[x  * PAGE_INFO_SIZE + PAGE_OFFSET] >= RAM_SIZE) {
            
            LRUswap(ram, hdd, x);   

            print!("\npage {} was in HDD -> LRUswap\n", x);

            x_offset = ram[x  * PAGE_INFO_SIZE + PAGE_OFFSET];

        }

        thread::sleep(Duration::from_millis(5)); //sleep 2 ms

        let now = Instant::now();

        ram[x * PAGE_INFO_SIZE + PAGE_TIMESTAMP] = now.duration_since(start).subsec_millis() as usize;
        

        for i in 0..data.len() {
            ram[x_offset + i] = data[i];
        }
    }


    //if x in HDD then swap and write to x
    fn read(ram: &mut [usize], hdd: &mut [usize], x: usize, start : Instant) {

        let mut x_offset: usize = ram[x  * PAGE_INFO_SIZE + PAGE_OFFSET];

        if (ram[x  * PAGE_INFO_SIZE + PAGE_OFFSET] >= RAM_SIZE) {

            LRUswap(ram, hdd, x);

            print!("\npage {} was in HDD -> LRUswap\n", x);

            x_offset = ram[x  * PAGE_INFO_SIZE + PAGE_OFFSET];
        }



        thread::sleep(Duration::from_millis(2)); //sleep 2 ms

        let now = Instant::now();

        ram[x * PAGE_INFO_SIZE + PAGE_TIMESTAMP] = now.duration_since(start).subsec_millis() as usize;
        

        print!("\n\n");
        for i in 0..PAGE_SIZE {
            print!("{}", ram[x_offset + i])
        }
        print!("\n");

    }

    fn printInfo(ram: &mut [usize], hdd: &mut [usize], start : Instant) {
        print!("\n");
        for i in 0..PAGES {
            print!("{:?} - page, {:?} - offset, {:?} - timestamp\n", i
                    , ram[i * PAGE_INFO_SIZE + PAGE_OFFSET]
                    , ram[i * PAGE_INFO_SIZE + PAGE_TIMESTAMP]);
        }

        print!("{:-<1$}\n", " ", 50);

        for i in 0..RAM_PAGES {
            print!("\n");
            for j in 0..PAGE_SIZE {
                print!("{}", ram[INFO_OFFSET + j + PAGE_SIZE * i])
            }
        }
        for i in 0..HDD_PAGES {
            print!("\n");
            for j in 0..PAGE_SIZE {
                print!("{}", hdd[j + PAGE_SIZE * i])
            }
        }
        /*for i in 0..PAGES {
            read(ram, hdd, i, start);
            print!("\n");
        }*/
    }

    //init : set offsets for every page
    for i in 0..PAGES {
        ram[i * PAGE_INFO_SIZE + PAGE_OFFSET] = (INFO_OFFSET + i * PAGE_SIZE);
    }


    printInfo(&mut ram, &mut hdd, start);
    write(&mut ram, &mut hdd, 9, &mut [5,3,1], start);
    printInfo(&mut ram, &mut hdd, start);
    write(&mut ram, &mut hdd, 0, &mut [9,7,6], start);
    printInfo(&mut ram, &mut hdd, start);
    write(&mut ram, &mut hdd, 11, &mut [2,4,8], start);
    printInfo(&mut ram, &mut hdd, start);

    read(&mut ram, &mut hdd, 0, start);
    printInfo(&mut ram, &mut hdd, start);

    
}

