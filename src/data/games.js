/**
 * Centralized dataset for the 5 separately deployed games.
 * Configured with placeholder data until official game metadata & URLs are provided.
 *
 * To update when game details are ready:
 * 1. Modify title, description, image path/URL, and deployed game URL.
 * 2. The entire application UI and card interactions will adapt automatically.
 */
const games = [
  {
    id: 1,
    number: "GAME 01",
    title: "AI Factory",
    description: "Step into the AI Factory and test your AI skills.",
    image: "/assets/ai_factory_card.jpg",
    url: "https://ai-factory-game.vercel.app/",
    accent: "cyan"
  },
  {
    id: 2,
    number: "GAME 02",
    title: "Puzzle",
    description: "Solve futuristic 3D geometric puzzles and challenge your spatial logic.",
    image: "/assets/puzzle_card.jpg",
    url: "https://puzzle-game-ten-pi.vercel.app/display?room=EXPO26",
    accent: "purple"
  },
  {
    id: 3,
    number: "GAME 03",
    title: "IAE Squid Game",
    description: "Enter the high-stakes arena and navigate intense futuristic challenges.",
    image: "/assets/squid_game_card.jpg",
    url: "https://fabulous-youtiao-31f6a2.netlify.app/",
    accent: "teal"
  },
  {
    id: 4,
    number: "GAME 04",
    title: "Coming Soon",
    description: "Game details will be added soon.",
    image: null,
    url: null,
    accent: "orange"
  },
  {
    id: 5,
    number: "GAME 05",
    title: "Coming Soon",
    description: "Game details will be added soon.",
    image: null,
    url: null,
    accent: "violet"
  }
];

export default games;
