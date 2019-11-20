#include <iostream>
#include <bitset>
using namespace std;

#define uint unsigned int
#define p(x) cout << x << endl;

uint32_t clp2(uint32_t x) {
   x = x - 1;
   x = x | (x >> 1);
   x = x | (x >> 2);
   x = x | (x >> 4);
   x = x | (x >> 8);
   x = x | (x >> 16);
   return x + 1;
}

uint memory[256];
uint BLOCK_SIZE = 8;
uint bitmap = 0; // 32 blocks
uint TYPES_AMOUNT = 6; // stepenei
uint *BITMAPS_LIST = new uint[6];

int allocate(size_t);
bool isFree(uint, size_t);
void deallocate(uint);
int allocate_from_spread(uint);
void set_bitmap(uint, size_t, bool);

void fill_bitmap(uint start, size_t amount) {
    while (amount > 0) bitmap |= (1 << start + --amount);
}
void free_bitmap(uint start, size_t amount) {
    while (amount > 0) bitmap &= ~(1 << start + --amount);
}

int allocate(size_t size) {
    size = size < BLOCK_SIZE ? BLOCK_SIZE : clp2(size);
    uint level = 0;
    while (BLOCK_SIZE << level < size) level++;
    level = TYPES_AMOUNT - level - 1;
    uint bmap = BITMAPS_LIST[level];
    for(uint i = 0; i < (1 << level); i++) {
        if (bmap & (1<<i) && isFree(i*(1 << level), (1 << level))) {
            fill_bitmap(i*(1 << level), (1 << level));
            return i*(1 << level);
        }
    }
    return allocate_from_spread(level,)
    
}

bool isFree(uint start, uint amount) {
    while (amount > 0) {
        if (bitmap & (1 << start + --amount)) return false;
    }
    return true;
}


int main() {
    BITMAPS_LIST[0] = 1;
    p(allocate(8));
    return 0;
}