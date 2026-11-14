export interface PilotRestaurant {
  name: string;
  location: string;
  status: string;
  /** Owner quote and results are added only once real; components skip them while null. */
  quote: string | null;
  results: string | null;
  /** No photo until the restaurant supplies one; the card shows a neutral placeholder. */
  photo: string | null;
}

export const pilotRestaurants: PilotRestaurant[] = [
  {
    name: "Pasta and Pita Grill",
    location: "Columbia, TN",
    status: "Live since October 2026",
    quote: null,
    results: null,
    photo: null,
  },
];
