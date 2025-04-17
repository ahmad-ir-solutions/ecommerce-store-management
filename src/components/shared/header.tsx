import { CustomBreadcrumb } from './custom-breadcrumb';

interface DashboardHeaderProps {
  title: string;
  children?: React.ReactNode;
  customLabels?: Record<string, string>; // Optional: map route segments to display names
}

export const Header = ({ title, children, customLabels = {} }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between bg-white py-3 px-6 rounded-2xl">
    <CustomBreadcrumb title={title} customLabels={customLabels} />
      {children && <div className="flex gap-4 items-center">{children}</div>}
    </div>
  );
};
