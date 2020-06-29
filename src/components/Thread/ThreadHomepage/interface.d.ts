export interface ThreadHomepageProps {
  id: number;
  title: string;
  author: {
    username: string;
    id: number;
    avatarFileName?: string;
  };
  slug: string | number;
  withoutLink?: boolean;
  date: string;
  categories?: ThreadCategory[];
  messageType?: string;
  withAvatar?: boolean;
  votes?: any;
  scoringCategories?: any;
}

type ThreadCategory = {
  id: number;
  name: string;
};
