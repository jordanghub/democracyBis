export interface ThreadHomepage {
  id: number;
  title: string;
  author?: {
    username: string;
    id: number;
  };
  votes?: IVote[];
  createdAt?: string;
  categories?: IThreadCategory[];
  slug: string;
}

export interface IThreadCategory {
  id: number;
  name: string;
}

export interface IVote {
  voteCount: number;
  average: number;
  category: string;
}

export interface IScoringCategory {
  name: string;
  id: number;
}
