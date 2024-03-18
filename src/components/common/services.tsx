import HeadingText from '@/components/common/heading-text';
import { services } from '@/config/contents';
import { Card, CardTitle } from '../ui/card';

export default function Services() {
  return (
    <section
      className='lg:max-w-7xl mx-auto px-3 space-y-8 py-12 lg:py-20'
      id='services'
    >
      {services.header || services.subheader ? (
        <HeadingText subtext={services.subheader} className='text-center'>
          {services.header}
        </HeadingText>
      ) : null}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {services.content.map((service, index) => (
          <div key={service.text}>
            <Card className='p-10 flex flex-col justify-center items-center gap-5 group hover:bg-primary cursor-pointer transition-colors duration-500 h-full'>
              <div>
                {service.icon({
                  size: 50,
                  className:
                    'text-primary group-hover:text-white transition-colors duration-500',
                })}
              </div>
              <CardTitle className='text-foreground text-lg md:text-xl group-hover:text-white transition-colors duration-500'>
                {service.text}
              </CardTitle>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
