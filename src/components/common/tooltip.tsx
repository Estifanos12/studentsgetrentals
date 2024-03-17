import {
  TooltipProvider,
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip';

type TooltipProps = {
  children: React.ReactNode;
  text: string;
};

export const Tooltip = ({ children, text }) => {
  return (
    <TooltipProvider>
      <ShadcnTooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
};
