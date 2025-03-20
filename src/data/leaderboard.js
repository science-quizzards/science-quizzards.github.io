// Pool of names to randomly select from
const namePool = [
  "Alex", "Sam", "Jordan", "Taylor", "Morgan",
  "Casey", "Riley", "Quinn", "Avery", "Parker",
  "Skylar", "Charlie", "Jamie", "Drew", "Bailey",
  "Phoenix", "River", "Storm", "Sage", "Winter"
];

// Generate a random score between min and max
const getRandomScore = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Get random name from pool
const getRandomName = () => {
  return namePool[Math.floor(Math.random() * namePool.length)];
};

// Generate fake leaderboard entries
export const generateLeaderboard = (currentScore, category) => {
  // Create array to store leaderboard entries
  let entries = [];
  
  // Add 5 random entries
  for (let i = 0; i < 5; i++) {
    entries.push({
      name: getRandomName(),
      score: getRandomScore(14, 17),
      category
    });
  }

  // Add current player's score
  entries.push({
    name: "You",
    score: currentScore,
    category
  });

  // Sort by score in descending order
  entries.sort((a, b) => b.score - a.score);

  // Take only top 5 entries
  return entries.slice(0, 5);
}; 