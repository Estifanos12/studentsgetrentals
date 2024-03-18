import { IconKeys } from '@/components/icons';
import { IconType } from 'react-icons/lib';

export type HeroHeader = {
  header: string;
  subheader: string;
  image: string;
  description: string;
};

export type Content = {
  text: string;
  subtext?: string;
  description?: string;
  image?: string;
  link?: string;
  icon?: IconType;
};

export type ContentSection = {
  header: string;
  subheader: string;
  image?: string;
  content: Array<Content>;
};

export type Contact = {
  header: string;
  subheader: string;
  description: string;
};
