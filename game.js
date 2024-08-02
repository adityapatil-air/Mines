// Global variables
let minePositions = [];
let walletAmount = 0; // Will be initialized on page load
let betAmount = 0;
let numberOfMines = 0;
let currentBetAmount = 0; // Store the bet amount for the current game

// Function to show the custom modal with a message
function showModal(message) {
  const modal = document.getElementById('custom-modal');
  const modalMessage = document.getElementById('modal-message');
  modalMessage.textContent = message;
  modal.style.display = 'block';
}

// Function to hide the custom modal
function hideModal() {
  const modal = document.getElementById('custom-modal');
  modal.style.display = 'none';
}

// Event listener for the "OK" button in the modal
document.getElementById('modal-ok-button').addEventListener('click', hideModal);

// Event listener for the "close" button in the modal
document.querySelector('.close-button').addEventListener('click', hideModal);

// Function to start the game and place mines
function startGame() {
  const cards = document.querySelectorAll('.card');
  const minesInput = document.getElementById('mines');
  const betInput = document.getElementById('bet-amount');
  
  numberOfMines = parseInt(minesInput.value, 10);
  betAmount = parseInt(betInput.value, 10);

  // Check if the number of mines is valid
  if (isNaN(numberOfMines) || numberOfMines <= 0 || numberOfMines > 24) {
    showModal('Invalid number of mines. Please enter a number between 1 and 24.');
    return;
  }

  // Check if bet amount is valid
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > walletAmount) {
    showModal('Invalid bet amount. Please enter a valid bet.');
    return;
  }

  // Deduct the bet amount from the wallet
  updateWallet(-betAmount);
  currentBetAmount = betAmount;
  document.querySelector('.current-bet-amount').textContent = `$${currentBetAmount.toFixed(2)}`;

  // Reset the game and set the new mines
  resetGame();
  minePositions = [];
  const cardIndices = [...Array(cards.length).keys()];
  shuffleArray(cardIndices);
  minePositions = cardIndices.slice(0, numberOfMines);

//   console.log("Mine positions:", minePositions); // Debugging log
}

// Function to handle card click events
function changeColor(card) {
  if (card.classList.contains('clicked')) return;

  if (currentBetAmount <= 0) {
    showModal('Please enter a valid bet amount to reveal the cards.');
    return;
  }

  const cards = Array.from(document.querySelectorAll('.card'));
  const cardIndex = cards.indexOf(card);
  const isMine = minePositions.includes(cardIndex);
  const color = isMine ? 'red' : 'green';

  card.style.backgroundColor = color;
  card.classList.add('clicked');

  if (isMine) {
    revealAllCards();
    setTimeout(() => {
      showModal("BOOMED");
      // Deduct bet amount on losing
      setTimeout(() => {
        resetGame(); // Reset game after a delay
      }, 2000); // 2 seconds delay
    }, 100); // Short delay to show the card before the alert
  } else {
    const reward = calculateReward();
    currentBetAmount = reward; // Set the new bet amount to the reward
    document.querySelector('.current-bet-amount').textContent = `$${currentBetAmount.toFixed(2)}`;
  }
}

// Function to calculate the reward based on mines and bet
function calculateReward() {
  const totalCards = 25;
  const greenCards = totalCards - numberOfMines;
  const revealedCards = document.querySelectorAll('.card.clicked').length;
  const remainingGreenCards = greenCards - revealedCards;
  const multiplier = remainingGreenCards > 0 ? totalCards / remainingGreenCards : 1; // Avoid division by zero

  return betAmount * multiplier; // Calculate reward based on initial bet amount
}

// Function to update the wallet and display the new amount
function updateWallet(amount) {
  walletAmount += amount;

  // Ensure walletAmount doesn't go below zero
  if (walletAmount < 0) {
    walletAmount = 0;
  }

  // Update wallet amount on UI
  document.querySelector('.wallet-amount').textContent = `$${walletAmount.toFixed(2)}`;

  // Save the updated wallet amount to localStorage
  const userId = localStorage.getItem('currentUser');
  if (userId) {
    localStorage.setItem(`walletAmount_${userId}`, walletAmount.toString());
    console.log(`Wallet updated for user ${userId}: $${walletAmount}`); // Debugging
  } else {
    console.error('No user ID found. Cannot update wallet.');
  }
}

// Function to reveal all cards after a mine is hit
function revealAllCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    const isMine = minePositions.includes(index);
    card.style.backgroundColor = isMine ? 'red' : 'green';
  });
}

// Function to reset the game
function resetGame() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.remove('clicked');
    card.style.backgroundColor = '#61dafb'; // Default color
  });
  minePositions = [];
  // Reset the bet amount display for the next game
  document.querySelector('.current-bet-amount').textContent = `$0.00`;
}

// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  console.log("Array shuffled:", array); // Debugging log
}

// Event listener for the "Bet" button
document.querySelector('.bet-button').addEventListener('click', startGame);

// Event listener for the "Cashout" button
document.querySelector('.cashout-button').addEventListener('click', () => {
  // Add current bet amount (if any) to the wallet on cashout
  updateWallet(currentBetAmount);
  showModal(`You cashed out with $${walletAmount.toFixed(2)}`);
  // Reset current bet amount and display
  currentBetAmount = 0;
  document.querySelector('.current-bet-amount').textContent = `$${currentBetAmount.toFixed(2)}`;
});

// Function to initialize the wallet amount on page load
function initializeWallet() {
  const userId = localStorage.getItem('currentUser');
  if (userId) {
    const savedWalletAmount = localStorage.getItem(`walletAmount_${userId}`);
    if (savedWalletAmount) {
      walletAmount = parseFloat(savedWalletAmount);
      console.log(`Wallet amount loaded for user ${userId}: $${walletAmount}`); // Debugging
    } else {
      walletAmount = 10000; // Default wallet amount if no previous data
      console.log(`No saved wallet amount found for user ${userId}. Using default: $${walletAmount}`); // Debugging
    }
  } else {
    walletAmount = 10000; // Default wallet amount if no user ID
    console.log(`No user ID found. Using default wallet amount: $${walletAmount}`); // Debugging
  }
  document.querySelector('.wallet-amount').textContent = `$${walletAmount.toFixed(2)}`;
}

// Initialize wallet on page load
window.onload = initializeWallet;
