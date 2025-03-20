// Function to fetch quiz questions from JSON files based on category
export const fetchQuestions = async (category) => {
  try {
    // Fetch questions based on category
    const response = await fetch(`${import.meta.env.BASE_URL}${category}-questions.json`);
    const allQuestions = await response.json();
    
    // Randomly select 20 questions
    const shuffledQuestions = shuffleArray([...allQuestions]);
    return shuffledQuestions.slice(0, 20);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

// Function to shuffle array (for randomizing questions and answer options)
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Save score to localStorage with nickname
export const saveScore = (score, totalQuestions, category, nickname) => {
  const savedScores = JSON.parse(localStorage.getItem('quizScores') || '[]');
  
  const newScore = {
    score,
    totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100),
    category,
    nickname: nickname || 'Anonymous Explorer',
    date: new Date().toISOString(),
  };
  
  savedScores.push(newScore);
  localStorage.setItem('quizScores', JSON.stringify(savedScores));
  
  return newScore;
};

// Get scores from localStorage with optional category filter
export const getScores = (category = null) => {
  const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
  
  // Filter by category if specified
  const filteredScores = category 
    ? scores.filter(score => score.category === category)
    : scores;
    
  // Sort by highest score first
  return filteredScores.sort((a, b) => {
    // Sort by percentage first
    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage;
    }
    // If percentage is the same, sort by raw score
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // If score is the same, sort by date (most recent first)
    return new Date(b.date) - new Date(a.date);
  });
}; 