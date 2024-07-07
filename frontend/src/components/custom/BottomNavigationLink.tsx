import { LucideProps } from "lucide-react";
import { Link } from "react-router-dom";

export default function BottomNavigationLink({
  Icon,
  to,
  title,
}: {
  Icon: React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;
  to: string;
  title: string;
}) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
    >
      <Icon className="h-6 w-6" />
      {title}
    </Link>
  );
}
