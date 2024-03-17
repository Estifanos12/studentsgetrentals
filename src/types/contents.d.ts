import { IconKeys } from '@/components/icons';

export type HeroHeader = {
  header: string;
  subheader: string;
  image: string;
  description: string;
};

export type Content = {
  text: string;
  subtext: string;
  description?: string;
  image?: string;
  link?: string;
  icon?: IconKeys;
};

export type ContentSection = {
  header: string;
  subheader: string;
  image?: string;
  content: Array<Content>;
};
