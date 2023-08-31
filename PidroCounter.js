const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function getNumberOfSuitsForPlayer(playerName) {
    return new Promise((resolve) => {
        readline.question(`Enter the number of suits for ${playerName} (0-9): `, input => {
            let number = parseInt(input);
            if (!isNaN(number) && number >= 0 && number <= 9) {
                resolve(number);
            } else {
                console.log('Invalid input! Please enter a number between 0 and 9.');
                resolve(getNumberOfSuitsForPlayer(playerName));
            }
        });
    });
}

function formatTableData(data) {
    return `| ${data.round}     | ${data.south}     | ${data.west}     | ${data.north}     | ${data.east}     | ${data.totalRemaining}                    |`;
}

(async function computeRounds() {
    let south = await getNumberOfSuitsForPlayer('South');
    let west = await getNumberOfSuitsForPlayer('West');
    let north = await getNumberOfSuitsForPlayer('North');
    let east = await getNumberOfSuitsForPlayer('East');

    let totalCards = 14;
    let round = 1;

    console.log("| Round | South | West | North | East | Total Suit Remaining |");

    while (totalCards > 0 && (south > 0 || west > 0 || north > 0 || east > 0)) {
        let totalSuitsThisRound = 0;
        
        if (south > 0) {
            south--;
            totalSuitsThisRound++;
        }
        if (west > 0) {
            west--;
            totalSuitsThisRound++;
        }
        if (north > 0) {
            north--;
            totalSuitsThisRound++;
        }
        if (east > 0) {
            east--;
            totalSuitsThisRound++;
        }

        console.log(formatTableData({ round, south, west, north, east, totalRemaining: totalCards - totalSuitsThisRound }));

        totalCards -= totalSuitsThisRound;
        round++;
    }

    if (totalCards !== 0) {
        console.log("Error: " + totalCards + " cards left!");
    } else {
        console.log("All cards have been accounted for!");
    }

    readline.close();
})();
