import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <span className='text-primary'>Students Get Rentals </span>,
  head: (
    <>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta property='og:title' content='Students Get Rentals' />
      <title>Students Get Rentals</title>
      <meta property='og:description' content='students get rentals' />
    </>
  ),
  editLink: {
    component: null,
    text: '',
  },
  primaryHue: 62,
  primarySaturation: 100,
  feedback: {
    content: null,
    labels: '',
    useLink: () => '',
  },
  toc: {
    component: null,
  },
  sidebar: {
    toggleButton: true,
  },
  project: {},
  chat: {},
  footer: {
    component: null,
  },
};

export default config;
