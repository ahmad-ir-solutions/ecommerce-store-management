import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardHeaderProps {
  title: string;
  children?: React.ReactNode;
  customLabels?: Record<string, string>; // Optional: map route segments to display names
}

export const CustomBreadcrumb = ({ title, customLabels = {} }: DashboardHeaderProps) => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  // Build up breadcrumbs
  const breadcrumbs = segments.map((segment: string, index: number) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = customLabels[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return { label, href };
  });

  return (
      <div>
        <h1 className="text-3xl font-semibold mb-1">{title}</h1>
        <Breadcrumb className='flex items-center text-sm font-medium flex-now-wrap'>
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href} className="flex items-center text-xs font-medium uppercase">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to={crumb.href}
                    className={cn(
                      'text-gray-400 hover:text-gray-700',
                      index === breadcrumbs.length - 1 && 'text-blue-500 text-xs font-semibold whitespace-nowrap'
                    )}
                  >
                    {crumb.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <ChevronRightIcon className='w-4 h-4 text-gray-400 mx-1' />
              )}
            </span>
          ))}
        </Breadcrumb>
      </div>
  );
};
