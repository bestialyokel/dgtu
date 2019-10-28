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

uint TYPES_AMOUNT = 6; // stepeni

uint *BITMAPS_LIST = new uint[6];

int allocate(uint size, uint reqLevel, uint currLevel) {
    if (currLevel > TYPES_AMOUNT - 1) return -1;
    //for (uint i = 0; i < (1 << curr))
}

int allocate(uint size) {
    size = clp2(size);
    size = size < BLOCK_SIZE ? 8 : size;
    uint level = 0;
    while (BLOCK_SIZE << level < size) level++;
    level = TYPES_AMOUNT - level - 1;
    for (uint i = 0; i < (1<<level); i++) {
        if (isFree())
    }
    
}

bool isFree(uint start, uint amount) {
    while (amount > 0) {
        if (bitmap & (1 << start + amount--)) return false;
    }
    return true;
}


int main() {
    BITMAPS_LIST[5] = 1;
    allocate(2);

    return 0;
}