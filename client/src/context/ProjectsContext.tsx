import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectsApi } from '@/api/projects';
import type { ProjectContent } from '@shared/schema';
// Remove the import from local file
// import { services } from '@/data/services';

// Service reference type
export interface ServiceReference {
  id: string;
  title: string;
}

// Service item type (simplified version of what API returns)
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  image: string;
  category: string;
}

// Interface for Project type
export interface Project {
  id: number;
  title: string;
  description: string;
  organization: string;
  category: string;
  bg_image: string | null;
  icon: string | null;
  duration: string | null;
  location: string | null;
  services: string[] | null;
  order_index: number | null;
  updated_at: Date;
  updated_by: number | null;
}

// Placeholder images to use as fallbacks
export const placeholderImages = [
  'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
];

// Default projects data
const initialProjects: Project[] = [
  {
    id: "1",
    slug: "technical-support-greater-darfur-microfinance-apex",
    title: "Technical Support to the Greater Darfur Microfinance Apex",
    description: "Support in implementing business plan for microfinance development in Darfur, creating income-generation opportunities for conflict-affected populations.",
    client: "United Nations Development Programme (UNDP)",
    duration: "September 2018 – December 2020",
    location: "Five Darfur States and Khartoum",
    country: "Sudan",
    services: [], // Will be populated when services are loaded
    projectDescription: "Following the December 2017 establishment of the Microfinance Apex in Darfur (Darfur Elkubra Microfinance Development Company, DEMDC), the UNDP commissioned a microfinance project in September 2018 involving the automation of the Apex's operations as well as the provision of support to the institution in implementing its business plan. The overall purpose of the project was to create and enhance the microfinance system in Darfur to create income-generation opportunities for poor conflict-affected population in Darfur including women, especially widows and de facto Female/headed households and small producers through access to financing as well as training and skills enhancement. In this project, PACT was contracted to provide consultancy services.\n\nThe overarching objective of the assignment/ project was to provide technical support and guidance for the implementation of Darfur Apex business plan including, deployment of technological solutions for microfinance with mobile applications, as well as provision of tailored mentoring services to the newly established Greater Darfur Microfinance Co. (GDMC) and the state-owned Microfinance Institutions (MFI).",
    servicesDescription: [
      "Technical Assistance to the Darfur Elkubra Microfinance Development Company (Darfur MF Apex) in Business Plan Development & Implementation involving the following:",
      "Assessment of the impact of adopted policies on the efficiency and effectiveness of the service providers",
      "Assisting in the correct setup of Apex structure and operations",
      "Providing Capacity Building for DEMDC Staff & Microfinance Partners",
      "Assisting the Apex in creating an enabling environment for microfinance in Darfur targeting vulnerable populations, including women",
      "Technical Assistance in the Development of Network of Agents",
      "Assisting in Fund-Raising for the Apex",
      "Acquisition & Implementation of Core Microfinance System with Mobile Commerce Channels",
      "Provision of Tailored Mentoring Services to Darfur Microfinance Apex and Partner Micro-financing institutions (MFIs)"
    ],
    image: placeholderImages[0]
  },
  {
    id: "2",
    slug: "peaceful-environment-livelihoods-south-kordofan",
    title: "Attractive, Peaceful and Conducive Environment for Livelihoods",
    description: "Project designed to address irregular migration by creating sustainable livelihoods for farmers, pastoralists, IDPs and refugees.",
    client: "South Kordofan State",
    duration: "July – August 2016",
    location: "South Kordofan State",
    country: "Sudan",
    services: [], // Will be populated when services are loaded
    projectDescription: "The project was designed and implemented in the backdrop of the unprecedented influx of refugees and migrants from Africa and the Middle East to the EU, with hundreds of thousands arriving on Europe's shores, risking their lives to escape from violent conflict, Persecution and poverty in search of a better future. There are several concerns that led Europe to try to find ways and means to address the issue of irregular migration.",
    servicesDescription: [
      "PACT conducted field surveys in the targeted areas and gathered relevant information",
      "Consulted with local communities to identify their requirements and preferences",
      "The collected data were analyzed, and strategies were formulated, through which specific projects were recommended and feasibility studies were prepared"
    ],
    image: placeholderImages[1]
  },
  {
    id: "3",
    slug: "value-chain-analysis-sme-finance-training",
    title: "Value Chain Analysis & SME Finance Training",
    description: "Training program for bankers and MFI executives on value chain analysis and SME finance best practices.",
    client: "Sudan Microfinance Development Company (SMDC)",
    duration: "31 March – 5 April 2014",
    location: "Debra Zeit",
    country: "Ethiopia",
    services: [], // Will be populated when services are loaded
    projectDescription: "The project's objective was to train bankers, MFIs executives, and organizations to select and analyze products' value chain and to design and implement integrated projects covering the product development from pre-production to delivery in its customized form to the end-user. Also, the training covered international best practices on pre-qualifying potential SME borrowers, financial and non-financial analysis of the borrower's business plan and analyzing financial provider's risks.",
    servicesDescription: [
      "Developed a tailored 6-day training curriculum",
      "Delivered training sessions in Debra Zeit, Ethiopia",
      "Supported trainees in identifying future capacity-building needs"
    ],
    image: placeholderImages[2]
  },
  {
    id: "4",
    slug: "youth-women-training-peacebuilding",
    title: "Youth and Women Training of Trainers",
    description: "Training program on Peace Building, FoRB, Human Rights, Advocacy, and Gender Mainstreaming.",
    client: "The Fellowship of Christian Councils and Churches in the Great Lakes and Horn of Africa (FECCLAHA)",
    duration: "November – December 2020",
    location: "Khartoum",
    country: "Sudan",
    services: [], // Will be populated when services are loaded
    projectDescription: "Provision of professional services for Training on Peace Building, FoRB, Human Rights, Advocacy, Gender Mainstreaming, Human Rights. PACT provided Youth and Women Training of Trainers on Peace Building, FoRB, Human Rights, Advocacy, Gender Mainstreaming, Human Right. PACT also provided facilitation services for Intra-Faith Dialogue, Advocacy Training and Entrepreneurship Workshops for selected youth from across Sudan.",
    servicesDescription: [
      "Provided Youth and Women Training of Trainers on Peace Building, FoRB, Human Rights, Advocacy, Gender Mainstreaming, Human Rights",
      "Facilitated Intra-Faith Dialogue sessions",
      "Conducted Advocacy Training and Entrepreneurship Workshops for selected youth from across Sudan"
    ],
    image: placeholderImages[3]
  }
];

// Initial service mappings to populate initial projects (will be replaced with API data)
const initialServiceMappings = {
  "project1": ['Poverty Reduction & MSME Development', 'Technology & Digital Transformation'],
  "project2": ['Poverty Reduction & MSME Development', 'Peace Building & Conflict Resolution'],
  "project3": ['Poverty Reduction & MSME Development', 'Education & Learning'],
  "project4": ['Capacity Building, Mentoring & Training', 'Gender Mainstreaming', 'Peace Building & Conflict Resolution'],
};

// Type for the context
interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: Error | null;
  refreshProjects: () => Promise<void>;
  addProject: (project: FormData | Omit<Project, 'id' | 'updated_at' | 'updated_by'>) => Promise<void>;
  updateProject: (id: number, project: FormData | Partial<Project>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  getProjectById: (id: number) => Project | undefined;
}

// Default context value
const defaultContextValue: ProjectsContextType = {
  projects: [],
  loading: true,
  error: null,
  refreshProjects: async () => {},
  addProject: async () => {},
  updateProject: async () => {},
  deleteProject: async () => {},
  getProjectById: () => undefined
};

// Create the context
const ProjectsContext = createContext<ProjectsContextType>(defaultContextValue);

// Create a provider component
export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshProjects = async () => {
      try {
      setLoading(true);
      const data = await projectsApi.getAllProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (project: FormData | Omit<Project, 'id' | 'updated_at' | 'updated_by'>) => {
    try {
      await projectsApi.createProject(project);
      await refreshProjects();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to add project');
    }
  };

  const updateProject = async (id: number, project: FormData | Partial<Project>) => {
    try {
      await projectsApi.updateProject(id, project);
      await refreshProjects();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update project');
    }
  };

  const deleteProject = async (id: number) => {
    try {
      await projectsApi.deleteProject(id);
      await refreshProjects();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete project');
    }
  };

  const getProjectById = (id: number) => {
    return projects.find(p => p.id === id);
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{
    projects,
    loading,
    error,
      refreshProjects,
    addProject,
    updateProject,
    deleteProject,
    getProjectById,
    }}>
      {children}
    </ProjectsContext.Provider>
  );
};

// Custom hook for using the projects context
export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}; 