// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract FlipGame{
    event Flpped(address indexed user, uint side, bool hasWon);
    address payable owner;
    mapping(address => uint) Leaderboard;
    constructor(){
        owner = payable(msg.sender);
    }

    function Flip(uint side) public payable{
        require(side <= 1);
        bool hasWon;

        // transfer money to owner
        owner.transfer(msg.value);

         uint randomFlip = random() % 2;
         if(side == randomFlip){
            hasWon = true;
            Leaderboard[msg.sender] += 1;
         }
         else{
             hasWon = false;
         }

         emit Flpped(msg.sender, side, hasWon);
    }

     function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
    }

}