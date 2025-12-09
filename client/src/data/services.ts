import { ServiceItem } from '@/types';

export const services: ServiceItem[] = [
  // Core Services
  {
    id: 'poverty-msme',
    title: 'Poverty Reduction & MSME Development',
    description: 'Strategies and programs to reduce poverty and empower micro, small, and medium enterprises.',
    details: [
      'Financial inclusion & microfinance',
      'Entrepreneurship development & market access',
      'Business mentoring & youth employment',
      'Community socio-economic empowerment',
      'Value chain analysis & development',
      'Cash & voucher assistance (CVA)'
    ],
    icon: 'fa-hand-holding-usd',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    category: 'core'
  },
  {
    id: 'agriculture-land',
    title: 'Agriculture and Land Use Services',
    description: 'Sustainable agricultural development and land use planning for food security and rural growth.',
    details: [
      'Agriculture development & food security',
      'Agribusiness & agro-industry',
      'Farm-based e-commerce',
      'Agricultural technology (agri-tech)',
      'Agricultural knowledge and information',
      'Land tenure'
    ],
    icon: 'fa-tractor',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    category: 'core'
  },
  {
    id: 'peace-building',
    title: 'Peace Building & Conflict Resolution',
    description: 'Facilitating dialogue, stability, and social cohesion in fragile and conflict-affected settings.',
    details: [
      'Peace-building',
      'Crisis prevention',
      'Conflict transformation',
      'Social cohesion & integration',
      'Justice & healing',
      'Disarmament, demobilization & reintegration (DDR)'
    ],
    icon: 'fa-dove',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    category: 'core'
  },
  {
    id: 'public-health',
    title: 'Public Health & Nutrition',
    description: 'Improving health outcomes and nutrition through evidence-based interventions.',
    details: [
      'Epidemiological surveillance',
      'Health promotion & communication',
      'Public health policy facilitation & assessment',
      'Maternal & neonatal health program assessment',
      'Nutrition & dietetics intervention assessment',
      'Water, sanitation & hygiene (WASH)'
    ],
    icon: 'fa-heartbeat',
    image: 'https://images.unsplash.com/photo-1519494080410-f9aa8f52f274?auto=format&fit=crop&w=800&q=80',
    category: 'core'
  },
  {
    id: 'education-learning',
    title: 'Education & Learning',
    description: 'Innovative education solutions and learning systems for sustainable development.',
    details: [
      'E-learning',
      'Capacity development for educators & stakeholders',
      'Education program assessment',
      'Curriculum enhancement',
      'Technical and vocational training (TVET)'
    ],
    icon: 'fa-graduation-cap',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
    category: 'core'
  },
  {
    id: 'renewable-energy',
    title: 'Renewable Energy',
    description: 'Promoting sustainable energy solutions and infrastructure for a greener future.',
    details: [
      'Solar energy',
      'Wind power',
      'Hydro-power',
      'Bio-energy',
      'Transmission & storage'
    ],
    icon: 'fa-solar-panel',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80',
    category: 'core'
  },
  {
    id: 'climate-change',
    title: 'Climate Change & Resilience',
    description: 'Climate change adaptation, mitigation, and resilience-building services.',
    details: [
      'Adaptation and resilience',
      'Conservation',
      'Climate diplomacy',
      'Environmental justice',
      'Climate finance'
    ],
    icon: 'fa-globe-americas',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    category: 'core'
  },
  {
    id: 'infrastructure-development',
    title: 'Infrastructure Development',
    description: 'Planning and implementing infrastructure projects for sustainable growth.',
    details: [
      'Infrastructure needs assessment',
      'Project design and management',
      'Sustainable construction practices',
      'Public-private partnership facilitation'
    ],
    icon: 'fa-building',
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=800&q=80',
    category: 'core'
  },

  // Cross-cutting Services
  {
    id: 'program-development',
    title: 'Program/Project Inception, Development & Assessment',
    description: 'Comprehensive support for program and project design, inception, and evaluation.',
    details: [
      'Project/program development & implementation',
      'Project/program assessment',
      'Business planning, organization assessment & strategy'
    ],
    icon: 'fa-project-diagram',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    category: 'cross-cutting'
  },
  {
    id: 'mel',
    title: 'Monitoring, Evaluation & Learning',
    description: 'Robust MEL systems to track progress, learn, and improve outcomes.',
    details: [
      'Monitoring',
      'Evaluation',
      'Learning',
      'M&E frameworks'
    ],
    icon: 'fa-chart-bar',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?auto=format&fit=crop&w=800&q=80',
    category: 'cross-cutting'
  },
  {
    id: 'digital-transformation',
    title: 'Technology & Digital Transformation',
    description: 'Leveraging technology to drive innovation and digital transformation. PACT partners with Itqan, MobiPay AgroSys, Techurate, Sybyl, and PEC to deliver integrated mobile, web, and omni-channel solutions for microfinance, e-commerce, and more.',
    details: [
      'Financial technology consulting',
      'Core financial systems',
      'Mobile platforms/omni-channels (App, Web, USSD, IVR)',
      'Digitalization',
      'Databases, data mining & analytics',
      'Cyber security',
      'Integration with banks, MFIs, payment gateways, and value chains',
      'ERP & e-commerce solutions',
      'Custom solutions for agriculture, skilled workers, education, retail, and more'
    ],
    icon: 'fa-laptop-code',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    category: 'cross-cutting'
  },
  {
    id: 'socio-economic',
    title: 'Socio-economic Studies & Development',
    description: 'Research and analysis to inform socio-economic development strategies.',
    details: [
      'Socio-economic analysis & policy assessment',
      'Planning & infrastructure development',
      'Sector interventions & development',
      'Data acquisition and analysis',
      'Gender mainstreaming & social inclusion',
      'Research & development'
    ],
    icon: 'fa-chart-pie',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    category: 'cross-cutting'
  },
  {
    id: 'gender-mainstreaming',
    title: 'Gender Mainstreaming',
    description: 'Integrating gender perspectives into all aspects of development.',
    details: [
      'Gender-sensitive analysis & strategic planning',
      'Gender strategy implementation',
      'Gender monitoring and evaluation'
    ],
    icon: 'fa-venus',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    category: 'cross-cutting'
  },
  {
    id: 'data-knowledge',
    title: 'Data Acquisition & Knowledge Management',
    description: 'Systems and strategies for effective data collection and knowledge sharing.',
    details: [
      'Digital data acquisition',
      'Data storage and management',
      'Data analytics',
      'Intelligence and knowledge sharing'
    ],
    icon: 'fa-database',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    category: 'cross-cutting'
  }
];

export default services;
