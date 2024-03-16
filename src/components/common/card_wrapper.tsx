import { TCardWrapper } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '../ui/card';
import { cn } from '@/lib/utils';

export const CardWrapper = ({
  header,
  description,
  children,
  footer,
  className,
}: TCardWrapper) => {
  return (
    <Card className={cn('rounded-none', className)}>
      <CardHeader>
        {header}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};
