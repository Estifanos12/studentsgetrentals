import { contact } from '@/config/contents';
import HeadingText from './heading-text';
import { ContactForm } from './contact-form';

export default function Contact() {
  return (
    <section id='requirements'>
      <div className='container px-3 lg:max-w-7xl space-y-8 py-12 text-center lg:py-20'>
        {contact.header || contact.subheader ? (
          <HeadingText subtext={contact.subheader}>
            {contact.header}
          </HeadingText>
        ) : null}

        <div className='flex flex-col md:flex-row gap-10 mt-5'>
          <div className='flex-[3] flex items-center '>
            <p className='text-lg lg:text-xl text-start text-foreground'>
              {contact.description}
            </p>
          </div>
          <div className='flex-[2]'>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
