export interface WarriorAcf {
  warrior_title?: string;
  reign_timeline?: string;
  dynasty_kingdom?: string;
  key_battles?: string;
  youth_inspiration_life_lessons?: string;
}

export interface WarriorDetail {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
  acf?: WarriorAcf;
}