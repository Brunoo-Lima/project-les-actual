import { Tooltip } from '@/components/ui/tooltip/tooltip';
import Link from 'next/link';
import { ReactNode } from 'react';

interface IItemProps {
  activeTooltip: string | null;
  href: string;
  icon: ReactNode;
  text: string;
  handleMouseEnter: (tooltip: string) => void;
  handleMouseLeave: () => void;
  tooltip: string;
}

export default function Item({
  activeTooltip,
  href,
  icon,
  text,
  handleMouseEnter,
  handleMouseLeave,
  tooltip,
}: IItemProps) {
  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => handleMouseEnter(tooltip)}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={href}>{icon && icon}</Link>
      {activeTooltip === tooltip && <Tooltip text={text} />}
    </div>
  );
}
