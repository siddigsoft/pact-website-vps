import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, Building, Globe, ChevronLeft, Tag } from 'lucide-react';
import { useProjects } from '@/context/ProjectsContext';
import CategoryProjects from '@/components/projects/CategoryProjects';

// Default image if project not found
const defaultImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

export default function ProjectDetailsPage() {
  // Get projects from context
  const { projects, getProjectById } = useProjects();
  
  // Use id-based routing
  const [match, params] = useRoute('/projects/:id');
  const project = params?.id ? getProjectById(parseInt(params.id)) : undefined;
  
  // For project navigation
  const currentIndex = project ? projects.findIndex(p => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-primary mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist or has been moved.</p>
          <Link href="/projects" className="px-6 py-3 bg-accent rounded-full text-white hover:bg-accent/90 transition-colors">
            View All Projects
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Back navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Link href="/projects" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Projects
        </Link>
      </div>
      
      {/* Hero Section with Image Background */}
      <div 
        className="relative w-full bg-primary py-32 md:py-48 mt-4"
      >
        {/* Gradient Overlay */}
        
        <div className="absolute inset-0 w-full h-full flex items-center">
          <div className="w-full px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex items-center space-x-2 text-white/80 text-sm mb-4">
                <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
                <span>→</span>
                <span className="text-white">{project.category}</span>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-12 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="bg-white p-6 rounded-xl shadow-md transition-shadow duration-300 border border-gray-100 hover:shadow-lg">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600 mb-2">Organization</h3>
                  <p className="text-lg">{project.organization}</p>
                </div>
              </div>
            </div>
            
            {project.duration && (
              <div className="bg-white p-6 rounded-xl shadow-md transition-shadow duration-300 border border-gray-100 hover:shadow-lg">
                <div className="flex items-start">
                  <div className="bg-accent/10 p-3 rounded-full mr-4">
                    <CalendarDays className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-600 mb-2">Duration</h3>
                    <p className="text-lg">{project.duration}</p>
                  </div>
                </div>
              </div>
            )}
            
            {project.location && (
              <div className="bg-white p-6 rounded-xl shadow-md transition-shadow duration-300 border border-gray-100 hover:shadow-lg">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <MapPin className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-600 mb-2">Location</h3>
                    <p className="text-lg">{project.location}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-white p-6 rounded-xl shadow-md transition-shadow duration-300 border border-gray-100 hover:shadow-lg">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Globe className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600 mb-2">Category</h3>
                  <p className="text-lg">{project.category}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services Tags */}
          {project.services && project.services.length > 0 && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2">
                {project.services.map((service, index) => (
                  <Link 
                    key={index}
                    href={`/projects#${service.replace(/\s+/g, '-').toLowerCase()}`}
                    className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {service}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project Description - Full Width */}
          <motion.div 
            className="bg-white rounded-xl shadow-md transition-shadow duration-300 p-8 mb-8 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-primary">About This Project</h2>
            <div className="mb-6 flex flex-col gap-4">
              {project.duration && (
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <span>{project.duration}</span>
                </div>
              )}
              {project.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{project.location}</span>
                </div>
              )}
            </div>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </motion.div>
          
          {/* Project Navigation - Full Width */}
          <div className="flex justify-between items-center mt-12 border-t border-gray-200 pt-8">
            {prevProject ? (
              <Link href={`/projects/${prevProject.id}`} className="group flex items-center gap-2 text-gray-600 hover:text-primary transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow border border-gray-100">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-xs text-gray-500">Previous Project</div>
                  <div className="font-medium">{prevProject.title.length > 30 ? prevProject.title.substring(0, 30) + '...' : prevProject.title}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
            
            <Link href="/projects" className="px-5 py-2 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors">
              All Projects
            </Link>
            
            {nextProject ? (
              <Link href={`/projects/${nextProject.id}`} className="group flex items-center gap-2 text-gray-600 hover:text-primary transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow border border-gray-100">
                <div className="text-right">
                  <div className="text-xs text-gray-500">Next Project</div>
                  <div className="font-medium">{nextProject.title.length > 30 ? nextProject.title.substring(0, 30) + '...' : nextProject.title}</div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 