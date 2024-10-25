import { FaBrush, FaHammer, FaPersonBooth, FaWarehouse } from 'react-icons/fa';
import { LuMicrowave } from 'react-icons/lu';

import { HeroHeader, ContentSection, Contact } from '@/types/contents';

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */
export const heroHeader: HeroHeader = {
  header: `Students Get Rentals`,
  subheader: `Platform for students to get rentals`,
  image: `/hero.png`,
  description:
    'We help you get your rental! Go through our short online training system, get our badges, and sign up for the roommateTools.shop software , and it will put you head and sholders above the others looking to rent the house!',
};

export const requirements: ContentSection = {
  header: `Requirements`,
  subheader: `Requirements Homeowners and property managers will love include:`,
  content: [
    {
      text: `Basic house cleaning system`,
      subtext: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,`,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: '/basic-house-cleaning.webp',
      link: '/learn/basic-house-cleaning',
    },
    {
      text: `Basic house maintenance knowlege`,
      subtext: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,`,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: '/home-repair.jpg',
      link: '/learn/basic-house-maintainance',
    },
    {
      text: `Neighbour management`,
      subtext: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,`,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: '/neighbor-management.webp',
      link: '/learn/neighbor-managment',
    },
  ],
};

export const services: ContentSection = {
  header: `Services`,
  subheader: `We provide the following services:`,
  // image: `/features-img.webp`,
  content: [
    {
      text: `Basic house cleaning`,
      icon: FaWarehouse,
    },
    {
      text: `Basic house maintainance`,
      icon: FaHammer,
    },
    {
      text: `Neighbour management`,
      icon: FaPersonBooth,
    },
    {
      text: `Appliances`,
      icon: LuMicrowave,
    },
    {
      text: `Easy Customizability`,
      subtext: `Change your content and layout with little effort`,
      icon: FaBrush,
    },
    {
      text: `Easy Customizability`,
      subtext: `Change your content and layout with little effort`,
      icon: FaBrush,
    },
  ],
};

export const contact: Contact = {
  header: 'Contact Us',
  subheader: 'We are here to help you',
  description:
    'We are here to help you. If you have any questions, please feel free to contact us. We will get back to you as soon as possible.',
};
