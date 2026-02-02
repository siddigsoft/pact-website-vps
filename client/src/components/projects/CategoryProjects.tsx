import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Building, MapPin, CalendarDays } from 'lucide-react';
import { Project } from '@/context/ProjectsContext';
import { stripHtml } from '@/lib/utils';

interface CategoryProjectsProps {
  title: string;
  projects: Project[];
  limit?: number;
  className?: string;
}

export default function CategoryProjects({ 
  title, 
  projects, 
  limit = 3,
  className = ''
}: CategoryProjectsProps) {
  // Animation variants for staggered card animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Limit number of projects if needed
  const displayProjects = limit > 0 ? projects.slice(0, limit) : projects;

  if (displayProjects.length === 0) {
    return null;
  }

  return (
    <div className={`mb-12 ${className}`}>
      <div className="relative">
        {/* Category header */}
        <div className="mb-8 flex items-center">
          <h2 className="text-3xl font-bold text-primary">{title}</h2>
        </div>
        
        {/* Projects grid for this category */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {displayProjects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Link 
                href={`/projects/${project.id}`}
                className="group block"
              >
                <div
                  className={`rounded-lg overflow-hidden h-full flex flex-col border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300 relative
                    ${project.bg_image ? 'bg-cover bg-center text-white' : ''}
                    ${project.bg_image ? 'group-hover:after:bg-primary' : ''}
                    after:absolute after:inset-0 after:transition-all after:duration-300 after:z-0
                    min-h-[320px] sm:min-h-[400px]
                    border-[#1A3A5F] hover:border-primary`}
                  style={project.bg_image ? { backgroundImage: `url('${project.bg_image}')` } : {}}
                >
                  {/* Gradient Overlay for Image Background */}
                  {project.bg_image && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20 transition-opacity duration-300 group-hover:opacity-0 z-10"></div>
                  )}
                  
                  {/* Content Area */}
                  <div className="p-6 flex-1 flex flex-col relative z-20">
                    {/* Category Tag */}
                    <div className="mb-3">
                      <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* Organization */}
                    <div className={`flex items-center text-sm mb-2 ${project.bg_image ? 'text-gray-200 group-hover:text-gray-500' : 'text-primary-foreground/90'}`}>
                      <Building className="h-4 w-4 mr-1" />
                      {project.organization}
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-xl sm:text-xl font-semibold mb-3 transition-colors duration-300 break-words ${project.bg_image ? 'text-white group-hover:text-white' : 'text-navy-900'}`}>
                      {project.title}
                    </h3>
                    
                    {/* Project Details */}
                    <div className={`flex flex-wrap gap-4 mb-4 text-sm ${project.bg_image ? 'text-gray-300 group-hover:text-gray-500' : 'text-primary-foreground/90'}`}>
                      {project.duration && (
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          {project.duration}
                        </div>
                      )}
                      {project.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {project.location}
                        </div>
                      )}
                    </div>
                    
                    {/* Read More Link */}
                    <div className="mt-auto text-right">
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Show more link if limited */}
        {typeof limit === 'number' && limit > 0 && projects.length > limit && (
          <div className="mt-8 text-center">
            <Link 
              href={`/projects#${title.replace(/\s+/g, '-').toLowerCase()}`}
              className="inline-flex items-center px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-all border border-primary/20 hover:border-primary/30"
            >
              View More {title} Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 