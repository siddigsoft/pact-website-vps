import React, { useState, useEffect } from 'react';
import ProjectSlider, { Project } from './ProjectSlider';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { apiClient } from '@/api/client';

interface RecentProjectsProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function RecentProjects({ 
  title = "Sample of Recent Projects", 
  subtitle = "Explore some of our most impactful work across various sectors and regions",
  className 
}: RecentProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get('/content/projects');
        if (response.data.success && Array.isArray(response.data.data)) {
          setProjects(response.data.data);
        } else {
          console.error('Invalid projects data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className={`py-16 bg-slate-50 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-900">{title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto mb-12">{subtitle}</p>
          </div>
          <div className="h-[500px] flex items-center justify-center">
            <div className="text-center">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 bg-slate-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-900">{title}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">{subtitle}</p>
        </div>
        
        <div className="w-full mb-12">
          <ProjectSlider projects={projects} />
        </div>

        <div className="text-center">
          <Link 
            to="/projects" 
            className="inline-flex items-center text-primary font-semibold hover:underline transition-all group"
          >
            More projects 
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}