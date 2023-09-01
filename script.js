document.addEventListener('DOMContentLoaded', () => {
    const suitsInput = document.getElementById('suitsInput');
    const calculateButton = document.getElementById('calculateButton');
    const resetButton = document.getElementById('resetButton');
    const resultsDiv = document.getElementById('results');

    const players = ['South', 'West', 'North', 'East'];
    let currentPlayerIndex = 0;
    const playerSuits = {};

    // Enable starting input without clicking
    suitsInput.focus();

    calculateButton.addEventListener('click', () => {
        const suits = parseInt(suitsInput.value);

        if (!isNaN(suits) && suits >= 0 && suits <= 9) {
            const currentPlayer = players[currentPlayerIndex];
            playerSuits[currentPlayer] = suits;
            currentPlayerIndex++;

            if (currentPlayerIndex < players.length) {
                suitsInput.value = ''; // Clear input
                suitsInput.placeholder = `Enter suits for ${players[currentPlayerIndex]}`;
                suitsInput.focus(); // Re-focus on the input
            } else {
                suitsInput.style.display = 'none'; // Hide input
                calculateButton.style.display = 'none'; // Hide button
                resetButton.style.display = 'block'; // Show reset button
                calculateAndDisplayResults();
            }
        } else {
            const funnyMessages = [
                "Did you drop cards on the keyboard? Try again!",
                "Invalid input! Maybe you're playing Uno instead?",
                "Were you aiming for a poker face? Enter a valid number!",
                "Did you use a joker card? Please enter a real number!"
            ];
            const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
            alert(randomMessage);
        }
    });

    // Allow Enter key to submit input
    suitsInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            calculateButton.click();
        }
    });

    resetButton.addEventListener('click', () => {
        suitsInput.value = ''; // Clear input
        suitsInput.placeholder = `Enter suits for ${players[0]}`;
        suitsInput.style.display = 'block'; // Show input
        calculateButton.style.display = 'block'; // Show button
        resetButton.style.display = 'none'; // Hide reset button
        resultsDiv.innerHTML = ''; // Clear results
        currentPlayerIndex = 0; // Reset player index
        suitsInput.focus(); // Re-focus input after reset
    });

    function calculateAndDisplayResults() {
        resultsDiv.innerHTML = ''; // Clear previous results

        let totalSuits = 14;
        let round = 1;

        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Round</th>
                <th>South</th>
                <th>West</th>
                <th>North</th>
                <th>East</th>
                <th>Total Suits Remaining</th>
            </tr>
        `;

        while (totalSuits > 0 && Object.values(playerSuits).some(suits => suits > 0)) {
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
                <td>${totalSuits - totalSuitsThisRound} suit${totalSuits - totalSuitsThisRound !== 1 ? 's' : ''} remaining</td>`;
            table.appendChild(row);

            totalSuits -= totalSuitsThisRound;
            round++;
        }

        if (totalSuits > 0) {
            const errorRow = document.createElement('tr');
            errorRow.innerHTML = `<td colspan="6">${totalSuits} suit${totalSuits !== 1 ? 's' : ''} left to distribute!</td>`;
            table.appendChild(errorRow);
        } else {
            const successRow = document.createElement('tr');
            successRow.innerHTML = `<td colspan="6">All suits have been accounted for!</td>`;
            table.appendChild(successRow);
        }

        resultsDiv.appendChild(table);
    }
});
