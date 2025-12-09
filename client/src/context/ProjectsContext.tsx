import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectsApi } from '@/api/projects';
import type { ProjectContent, ProjectStatus } from '@shared/schema';
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
  category: string | null;
  bg_image: string | null;
  icon: string | null;
  duration: string | null;
  location: string | null;
  image: string | null;
  status: ProjectStatus | null;
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
    id: 1,
    title: "Technical Support to the Greater Darfur Microfinance Apex",
    description: "Support in implementing business plan for microfinance development in Darfur, creating income-generation opportunities for conflict-affected populations.",
    organization: "United Nations Development Programme (UNDP)",
    category: "Microfinance",
    bg_image: null,
    icon: null,
    duration: "September 2018 – December 2020",
    location: "Five Darfur States and Khartoum",
    image: placeholderImages[0],
    status: "completed",
    services: [],
    order_index: 1,
    updated_at: new Date(),
    updated_by: null
  },
  {
    id: 2,
    title: "Attractive, Peaceful and Conducive Environment for Livelihoods",
    description: "Project designed to address irregular migration by creating sustainable livelihoods for farmers, pastoralists, IDPs and refugees.",
    organization: "South Kordofan State",
    category: "Livelihoods",
    bg_image: null,
    icon: null,
    duration: "July – August 2016",
    location: "South Kordofan State",
    image: placeholderImages[1],
    status: "completed",
    services: [],
    order_index: 2,
    updated_at: new Date(),
    updated_by: null
  },
  {
    id: 3,
    title: "Value Chain Analysis & SME Finance Training",
    description: "Training program for bankers and MFI executives on value chain analysis and SME finance best practices.",
    organization: "Sudan Microfinance Development Company (SMDC)",
    category: "Training",
    bg_image: null,
    icon: null,
    duration: "31 March – 5 April 2014",
    location: "Debra Zeit",
    image: placeholderImages[2],
    status: "completed",
    services: [],
    order_index: 3,
    updated_at: new Date(),
    updated_by: null
  },
  {
    id: 4,
    title: "Youth and Women Training of Trainers",
    description: "Training program on Peace Building, FoRB, Human Rights, Advocacy, and Gender Mainstreaming.",
    organization: "The Fellowship of Christian Councils and Churches in the Great Lakes and Horn of Africa (FECCLAHA)",
    category: "Training",
    bg_image: null,
    icon: null,
    duration: "November – December 2020",
    location: "Khartoum",
    image: placeholderImages[3],
    status: "completed",
    services: [],
    order_index: 4,
    updated_at: new Date(),
    updated_by: null
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
      // Map API response to include services property
      const mappedData = data.map(project => ({
        ...project,
        services: [] // Initialize with empty array, will be populated if needed
      }));
      setProjects(mappedData);
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