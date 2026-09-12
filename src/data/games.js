/**
 * Helper to dynamically resolve game URLs and enablement status from environment variables.
 */
const getGameUrl = (urlKeys, enableKeys) => {
  if (enableKeys) {
    for (const key of enableKeys) {
      const val = import.meta.env[key];
      if (val !== undefined && val !== null) {
        if (String(val).toLowerCase() === 'false' || val === false) {
          return null;
        }
      }
    }
  }

  for (const key of urlKeys) {
    const val = import.meta.env[key];
    if (val && typeof val === 'string' && val.trim() !== '') {
      return val;
    }
  }

  return null;
};

const games = [
  {
    id: 1,
    number: "GAME 01",
    title: "AI Factory",
    description: "Step into the AI Factory and test your AI skills.",
    image: "/assets/ai_factory_card.jpg",
    url: getGameUrl(['GAME_1_URL', 'VITE_GAME_1_URL'], ['ENABLE_GAME_1_LINK', 'VITE_ENABLE_GAME_1_LINK']),
    accent: "cyan"
  },
  {
    id: 2,
    number: "GAME 02",
    title: "Puzzle",
    description: "Solve futuristic 3D geometric puzzles and challenge your spatial logic.",
    image: "/assets/puzzle_card.jpg",
    url: getGameUrl(['GAME_2_URL', 'VITE_GAME_2_URL'], ['ENABLE_GAME_2_LINK', 'VITE_ENABLE_GAME_2_LINK']),
    accent: "purple"
  },
  {
    id: 3,
    number: "GAME 03",
    title: "IAE Squid Game",
    description: "Enter the high-stakes arena and navigate intense futuristic challenges.",
    image: "/assets/squid_game_card.jpg",
    url: getGameUrl(['GAME_3_URL', 'VITE_GAME_3_URL'], ['ENABLE_GAME_3_LINK', 'VITE_ENABLE_GAME_3_LINK']),
    accent: "teal"
  },
  {
    id: 4,
    number: "GAME 04",
    title: "Imposter",
    description: "Detect the hidden imposter in this futuristic digital investigation challenge.",
    image: "/assets/imposter_card.jpg",
    url: getGameUrl(
      ['GAME_4_URL', 'VITE_GAME_4_URL', 'GAME_LINK', 'VITE_GAME_LINK'],
      ['ENABLE_GAME_4_LINK', 'VITE_ENABLE_GAME_4_LINK', 'ENABLE_GAME_LINK', 'VITE_ENABLE_GAME_LINK']
    ),
    accent: "orange"
  },
  {
    id: 5,
    number: "GAME 05",
    title: "Coming Soon",
    description: "Game details will be added soon.",
    image: null,
    url: getGameUrl(['GAME_5_URL', 'VITE_GAME_5_URL'], ['ENABLE_GAME_5_LINK', 'VITE_ENABLE_GAME_5_LINK']),
    accent: "violet"
  }
];

export default games;
