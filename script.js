document.addEventListener('DOMContentLoaded', () => {
    const suitsInput = document.getElementById('suitsInput');
    const calculateButton = document.getElementById('calculateButton');
    const resultsDiv = document.getElementById('results');

    const players = ['South', 'West', 'North', 'East'];
    let currentPlayerIndex = 0;
    const playerSuits = {};

    calculateButton.addEventListener('click', () => {
        const suits = parseInt(suitsInput.value);

        if (!isNaN(suits) && suits >= 0 && suits <= 9) {
            const currentPlayer = players[currentPlayerIndex];
            playerSuits[currentPlayer] = suits;
            currentPlayerIndex++;

            if (currentPlayerIndex < players.length) {
                suitsInput.value = ''; // Clear input
                suitsInput.placeholder = `Enter suits for ${players[currentPlayerIndex]}`;
            } else {
                suitsInput.style.display = 'none'; // Hide input
                calculateButton.style.display = 'none'; // Hide button
                calculateAndDisplayResults();
            }
        } else {
            alert(`Invalid input. Please enter a number between 0 and 9.`);
        }
    });

    function calculateAndDisplayResults() {
        resultsDiv.innerHTML = ''; // Clear previous results

        let totalCards = 14;
        let round = 1;

        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Round</th>
                <th>South</th>
                <th>West</th>
                <th>North</th>
                <th>East</th>
                <th>Total Suit Remaining</th>
            </tr>
        `;

        while (totalCards > 0 && Object.values(playerSuits).some(suits => suits > 0)) {
            let totalSuitsThisRound = 0;

            for (const player in playerSuits) {
                if (playerSuits[player] > 0) {
                    playerSuits[player]--;
                    totalSuitsThisRound++;
                }
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${round}</td>
                <td>${playerSuits['South']}</td>
                <td>${playerSuits['West']}</td>
                <td>${playerSuits['North']}</td>
                <td>${playerSuits['East']}</td>
                <td>${totalCards - totalSuitsThisRound}</td>
            `;
            table.appendChild(row);

            totalCards -= totalSuitsThisRound;
            round++;
        }

        if (totalCards !== 0) {
            const errorRow = document.createElement('tr');
            errorRow.innerHTML = `<td colspan="6">Error: ${totalCards} cards left!</td>`;
            table.appendChild(errorRow);
        } else {
            const successRow = document.createElement('tr');
            successRow.innerHTML = `<td colspan="6">All cards have been accounted for!</td>`;
            table.appendChild(successRow);
        }

        resultsDiv.appendChild(table);
    }
});
