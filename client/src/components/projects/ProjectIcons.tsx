import React from 'react';
import { 
  FileText, 
  Building, 
  BarChart4, 
  GraduationCap, 
  Globe, 
  Heart, 
  Utensils, 
  PieChart 
} from 'lucide-react';

// Project icon components
export const ProjectIcons = {
  TPM: (props: any) => <FileText {...props} />,
  Livelihoods: (props: any) => <Building {...props} />,
  Nutrition: (props: any) => <Utensils {...props} />,
  Learning: (props: any) => <GraduationCap {...props} />,
  Peace: (props: any) => <Globe {...props} />,
  Health: (props: any) => <Heart {...props} />,
  Analytics: (props: any) => <BarChart4 {...props} />,
  Monitoring: (props: any) => <PieChart {...props} />
};