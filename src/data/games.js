/**
 * Centralized dataset for the 5 separately deployed games.
 * Currently configured with placeholder data until official game metadata & URLs are provided.
 *
 * To update when game details are ready:
 * 1. Modify title, description, image path/URL, and deployed game URL.
 * 2. The entire application UI and card interactions will adapt automatically.
 */
const games = [
  {
    id: 1,
    number: "01",
    title: "GAME 01",
    description: "Game description",
    image: null,
    url: null,
    accent: "cyan"
  },
  {
    id: 2,
    number: "02",
    title: "GAME 02",
    description: "Game description",
    image: null,
    url: null,
    accent: "purple"
  },
  {
    id: 3,
    number: "03",
    title: "GAME 03",
    description: "Game description",
    image: null,
    url: null,
    accent: "teal"
  },
  {
    id: 4,
    number: "04",
    title: "GAME 04",
    description: "Game description",
    image: null,
    url: null,
    accent: "orange"
  },
  {
    id: 5,
    number: "05",
    title: "GAME 05",
    description: "Game description",
    image: null,
    url: null,
    accent: "violet"
  }
];

export default games;
