# The Science Quizzard

An interactive and immersive quiz application designed for Grade 4 students to learn about Earth Science and Astronomy concepts through an engaging space-themed experience.

## Features

- Dynamic selection of 20 questions from a pool of 100 questions per category
- Two categories: Earth Science and Astronomy
- Interactive UI with futuristic space theme and animations
- 30-second timer for each question with warning indicators
- Fake leaderboard system for motivation
- Detailed explanations for each answer
- Sound effects and background music
- Mobile-responsive design
- Holographic and space-themed visual effects

## Technologies Used

- React
- Vite
- Tailwind CSS
- Framer Motion for animations
- Custom Audio Manager for sound effects
- GitHub Pages for deployment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/quiz-app.git
cd quiz-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Deploy to GitHub Pages
```bash
npm run deploy
```

## Project Structure

- `/public` 
  - `/sounds` - Audio files for sound effects and background music
  - `/videos` - Background video files
  - `astronomy-questions.json` - Pool of astronomy questions
  - `earth-science-questions.json` - Pool of earth science questions
- `/src` 
  - `/components` - React components
  - `/utils` - Utility functions including AudioManager
  - `/data` - Data handling and leaderboard generation
  - `App.jsx` - Main application component
  - `index.css` - Global styles

## Features in Detail

### Quiz System
- Random selection of 20 questions from a pool of 100 per category
- 30-second timer with visual and audio warnings
- Immediate feedback with correct/wrong sound effects
- Explanation display with countdown progress bar

### Audio System
- Background music system with multiple tracks
- Sound effects for:
  - Correct answers
  - Wrong answers
  - Selection/navigation
  - Timer warning (blip sound)
  - Quiz completion

### Visual Effects
- Futuristic space theme
- Animated transitions
- Holographic text effects
- Dynamic timer visualization
- Responsive design for all screen sizes

### Leaderboard System
- Dynamic fake leaderboard generation
- Motivational scoring system
- Random name selection from a pool
- Competitive yet achievable score ranges

## Customizing Questions

Questions are stored in two JSON files: `astronomy-questions.json` and `earth-science-questions.json`. Each question follows this format:

```json
{
  "id": 1,
  "question": "Your question text?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "The correct answer (must match one of the options exactly)",
  "explanation": "Explanation of why this answer is correct"
}
```

## Deployment

The app is configured for GitHub Pages deployment. Use:
```bash
npm run deploy
```

This will build the app and deploy it to the gh-pages branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Question content developed for Grade 4 Earth Science and Astronomy curriculum
- Sound effects and background music from various sources
- Design inspiration from modern space exploration themes
