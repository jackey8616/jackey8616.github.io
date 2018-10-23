---
title: pwnable.kr(12) - blackjack
date: 2018-10-23 14:06:24
tags:
  - CTF
  - PWN
  - pwnable.kr
  - Toddler's Bottle
  - WriteUps
categories:
  - CTF
  - pwnable.kr
  - Toddler's Bottle
---
![](/images/pwnable-kr/blackjack.png)
## Problem
Points: 1pt
```
Hey! check out this C implementation of blackjack game!
I found it online
* http://cboard.cprogramming.com/c-programming/114023-simple-blackjack-program.html

I like to give my flags to millionares.
how much money you got?


Running at : nc pwnable.kr 9009
```
[Link](http://pwnable.kr/play.php)
<!-- More -->

## Code
Code is at [here](http://cboard.cprogramming.com/c-programming/114023-simple-blackjack-program.html)

## Thinking
The code seems no big exploit point.
But seek the `input(scanf)` line first.
Specially lines invlove with money.

## Solution
```c
void play()
{
    ...
    betting(); //Prompts user to enter bet amount
    ...
}
```
The bet is given by `betting()` function in `player()`.

```c
int betting() //Asks user amount to bet
{
    printf("\n\nEnter Bet: $");
    scanf("%d", &bet);
 
    if (bet > cash) //If player tries to bet more money than player has
    {
        printf("\nYou cannot bet more money than you have.");
        printf("\nEnter Bet: ");
        scanf("%d", &bet);
        return bet;
    }
    else return bet;
} // End Function
```
The code seems no exploit point to let us change the flow.
But I'm curious about why this condition check is not a while loop,
infinitely check until player's bet is legal?
