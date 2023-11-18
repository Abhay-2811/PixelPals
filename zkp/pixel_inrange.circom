include "node_modules/circomlib/circuits/comparators.circom";
include "node_modules/circomlib/circuits/bitify.circom";


template pixel_inrange(){

    signal input pixel_location[2]; 

    signal input user_distance;//distance in meters 
    signal output out; // 0 or 1

    component gt1 = GreaterEqThan(9);
    gt1.in[0] <== 4;
    gt1.in[1] <== user_distance;
    gt1.out === 1; 

    out <-- gt1.out;
    out === 1;
}

component main {public [pixel_location]} = pixel_inrange();

