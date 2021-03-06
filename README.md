# ts-pyl

An implmeentation of the 1980s Press Your Luck game in Typescript, CSS, and HTML.

## Play Now

http://stuff.t27duck.xyz/pyl/

## Running

1. Clone repo
2. Run `$ npm install`
3. Run `$ npm run start`
4. Visit `http://localhost:8000`

### Playing

Set up the round to your liking by assigning spins and optional handicap (passed spins, score, and Whammies) to each player. To play against the house or with less than three players, give the unneeded players four Whammies.

Scores are not editable once the game starts (ie, you cannot change scores transitioning from round one to two).

During a spin, you may stop the board by either pressing the space bar or clicking the logo in the center of the Big Board.

## Big Board

Round 1 Big Board is based off of the Season 2 Sepember 17, 1984 to February 4, 1985 configuration. Round 2 Big Board is based off of the Season 2 February 5, 1985 to Augest 21, 1985 configuration.

For both rounds, the following "liberties" were taken:

- No repeat Whammy panels. All Whammy positions use a unique Whammy pose.
- Pirze spaces are picked randomly from a pool, so while the pool is exclusive to a round, they are scattered throughout the board and do not have deadicated places where you would have normally found them on the show.
- Prize spaces do not have a unique icon per prize, only the name of the prize. The slide's background color is accurate to what was used for that space.

## Prize Pool

Prizes availale for each round pull from the prize rotation used throughout the series. While certain prizes do not appear in spaces they usually are placed on the Big Board (ie, "Sail Boat" would always show in slide 7), they are properly separated between rounds 1 and 2. Also, prize values are accurate to 1984 values.


## Resources

http://users.btes.tv/syoder/pylboard/index.html

https://gameshows.fandom.com/wiki/Press_Your_Luck

https://press-your-luck.fandom.com/wiki/Press_Your_Luck_Wikia

Fonts Used: Eggcrate Regular and Franklin Gothic Condensed
