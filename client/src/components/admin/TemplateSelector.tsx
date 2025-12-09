import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Layout, Grid, Users, BarChart3, ImageIcon, Quote, Newspaper } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  content: string;
  thumbnail?: string;
}

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
  buttonText?: string;
  variant?: 'default' | 'outline' | 'ghost';
}

export default function TemplateSelector({ onSelectTemplate, buttonText = "Add Template", variant = 'outline' }: TemplateSelectorProps) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string>('all');

  // Define templates
  const templates: Template[] = [
    {
      id: 'hero-centered',
      name: 'Centered Hero',
      description: 'A centered hero section with heading, subheading, and call-to-action button',
      icon: <Layout className="h-4 w-4" />,
      category: 'hero',
      thumbnail: 'https://images.squarespace-cdn.com/content/v1/images/pattern-8',
      content: JSON.stringify([
        {
          id: "hero-text",
          type: "text",
          content: `<div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Website</h1>
            <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">A professional solution for your business needs. We help you achieve your goals with innovative strategies.</p>
          </div>`
        },
        {
          id: "hero-cta",
          type: "html",
          content: `<div class="flex justify-center gap-4">
            <a href="/contact" class="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">Get Started</a>
            <a href="/about" class="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">Learn More</a>
          </div>`
        }
      ])
    },
    {
      id: 'stats-section',
      name: 'Statistics Section',
      description: 'Display key metrics with icons in a grid layout',
      icon: <BarChart3 className="h-4 w-4" />,
      category: 'statistics',
      thumbnail: 'https://images.squarespace-cdn.com/content/v1/images/pattern-12',
      content: JSON.stringify([
        {
          id: "title",
          type: "text",
          content: `<h2 class="text-center text-2xl md:text-3xl font-bold text-primary mb-2">OUR IMPACT</h2>
<h3 class="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-4">The Numbers Speak For Themselves</h3>
<p class="text-center text-gray-600 mb-8">Our track record of success is reflected in these key metrics that showcase our experience, expertise, and commitment to excellence.</p>`
        },
        {
          id: "stats",
          type: "html",
          content: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    <div class="bg-white p-6 rounded-lg shadow-sm border">
      <div class="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 class="text-4xl font-bold text-gray-900">15+</h3>
        <p class="text-gray-500 text-center">Years of Experience</p>
      </div>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow-sm border">
      <div class="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 class="text-4xl font-bold text-gray-900">500+</h3>
        <p class="text-gray-500 text-center">Projects Completed</p>
      </div>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow-sm border">
      <div class="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-4xl font-bold text-gray-900">25</h3>
        <p class="text-gray-500 text-center">Countries Served</p>
      </div>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow-sm border">
      <div class="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <h3 class="text-4xl font-bold text-gray-900">100+</h3>
        <p class="text-gray-500 text-center">Team Members</p>
      </div>
    </div>
  </div>`
        }
      ])
    },
    {
      id: 'features-grid',
      name: 'Features Grid',
      description: 'Display features or services in a responsive grid with icons',
      icon: <Grid className="h-4 w-4" />,
      category: 'features',
      thumbnail: 'https://images.squarespace-cdn.com/content/v1/images/pattern-5',
      content: JSON.stringify([
        {
          id: "features-title",
          type: "text",
          content: `<div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Our Services</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">We offer a comprehensive range of services to meet your business needs. Our expert team is ready to help you succeed.</p>
          </div>`
        },
        {
          id: "features-grid",
          type: "html",
          content: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div class="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-2">Web Development</h3>
              <p class="text-gray-600">Custom website development with a focus on performance, security, and user experience.</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div class="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-2">Digital Marketing</h3>
              <p class="text-gray-600">Strategic marketing to increase your online presence and drive qualified traffic to your website.</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div class="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-2">Brand Strategy</h3>
              <p class="text-gray-600">Comprehensive brand development to help you stand out in the marketplace and connect with your audience.</p>
            </div>
          </div>`
        }
      ])
    },
    {
      id: 'team-grid',
      name: 'Team Members',
      description: 'Display team members in a grid with photos and information',
      icon: <Users className="h-4 w-4" />,
      category: 'team',
      thumbnail: 'https://images.squarespace-cdn.com/content/v1/images/pattern-9',
      content: JSON.stringify([
        {
          id: "team-title",
          type: "text",
          content: `<div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Our Expert Team</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Meet our talented team of professionals who are dedicated to delivering exceptional results for our clients.</p>
          </div>`
        },
        {
          id: "team-grid",
          type: "html",
          content: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div class="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div class="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <div class="bg-primary/20 w-full h-full flex items-center justify-center text-primary text-3xl font-bold">JD</div>
              </div>
              <h3 class="text-xl font-bold mb-1">John Doe</h3>
              <p class="text-primary mb-2">Chief Executive Officer</p>
              <p class="text-gray-600 text-sm mb-3">With over 15 years of industry experience, John leads our company with vision and expertise.</p>
              <div class="flex justify-center space-x-2">
                <a href="#" class="text-gray-400 hover:text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div class="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <div class="bg-primary/20 w-full h-full flex items-center justify-center text-primary text-3xl font-bold">JS</div>
              </div>
              <h3 class="text-xl font-bold mb-1">Jane Smith</h3>
              <p class="text-primary mb-2">Creative Director</p>
              <p class="text-gray-600 text-sm mb-3">Jane brings creativity and innovation to every project, ensuring our clients stand out in the market.</p>
              <div class="flex justify-center space-x-2">
                <a href="#" class="text-gray-400 hover:text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>`
        }
      ])
    },
    {
      id: 'testimonials-section',
      name: 'Testimonials',
      description: 'Display client testimonials with quotes and ratings',
      icon: <Quote className="h-4 w-4" />,
      category: 'testimonials',
      thumbnail: 'https://images.squarespace-cdn.com/content/v1/images/pattern-4',
      content: JSON.stringify([
        {
          id: "testimonials-title",
          type: "text",
          content: `<div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Here's what our clients have to say about working with us.</p>
          </div>`
        },
        {
          id: "testimonials-grid",
          type: "html",
          content: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <div class="flex text-yellow-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p class="text-gray-700 italic mb-6">"Working with this team was a game-changer for our business. Their expertise and dedication helped us achieve our goals faster than we ever thought possible."</p>
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold mr-4">
                  AB
                </div>
                <div>
                  <h4 class="font-semibold">Alice Brown</h4>
                  <p class="text-sm text-gray-600">CEO, Tech Innovators</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <div class="flex text-yellow-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p class="text-gray-700 italic mb-6">"The level of creativity and attention to detail exceeded our expectations. Our project was delivered on time and the results have been outstanding."</p>
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold mr-4">
                  MT
                </div>
                <div>
                  <h4 class="font-semibold">Mark Thompson</h4>
                  <p class="text-sm text-gray-600">Marketing Director, Global Brands</p>
                </div>
              </div>
            </div>
          </div>`
        }
      ])
    },
    {
      id: 'gallery-section',
      name: 'Image Gallery',
      description: 'Display images in a responsive grid layout',
      icon: <ImageIcon className="h-4 w-4" />,
      category: 'media',
      thumbnail: 'https://images.squarespace-cdn.com/content/v1/images/pattern-1',
      content: JSON.stringify([
        {
          id: "gallery-title",
          type: "text",
          content: `<div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Our Portfolio</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Browse through some of our recent projects and see the quality of our work firsthand.</p>
          </div>`
        },
        {
          id: "gallery-grid",
          type: "html",
          content: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <div class="w-full h-full flex items-center justify-center text-gray-500">
                Image 1 (Add URL in settings)
              </div>
            </div>
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <div class="w-full h-full flex items-center justify-center text-gray-500">
                Image 2 (Add URL in settings)
              </div>
            </div>
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <div class="w-full h-full flex items-center justify-center text-gray-500">
                Image 3 (Add URL in settings)
              </div>
            </div>
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <div class="w-full h-full flex items-center justify-center text-gray-500">
                Image 4 (Add URL in settings)
              </div>
            </div>
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <div class="w-full h-full flex items-center justify-center text-gray-500">
                Image 5 (Add URL in settings)
              </div>
            </div>
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <div class="w-full h-full flex items-center justify-center text-gray-500">
                Image 6 (Add URL in settings)
              </div>
            </div>
          </div>`
        }
      ])
    },
    {
      id: 'blog-section',
      name: 'Blog Posts',
      description: 'Display recent blog posts or news articles',
      icon: <Newspaper className="h-4 w-4" />,
      category: 'blog',
      thumbnail: 'https://images.squarespace-cdn.com/content/v1/images/pattern-3',
      content: JSON.stringify([
        {
          id: "blog-title",
          type: "text",
          content: `<div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Latest News & Insights</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Stay up to date with our latest articles, industry insights, and company news.</p>
          </div>`
        },
        {
          id: "blog-grid",
          type: "html",
          content: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div class="h-48 bg-gray-200">
                <div class="w-full h-full flex items-center justify-center text-gray-500">
                  Featured Image
                </div>
              </div>
              <div class="p-6">
                <div class="text-sm text-gray-500 mb-2">June 12, 2023</div>
                <h3 class="text-xl font-bold mb-2">10 Strategies to Improve Your Digital Presence</h3>
                <p class="text-gray-600 mb-4">Learn the essential strategies that can help your business stand out online and attract more customers.</p>
                <a href="#" class="text-primary font-medium hover:underline">Read more →</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div class="h-48 bg-gray-200">
                <div class="w-full h-full flex items-center justify-center text-gray-500">
                  Featured Image
                </div>
              </div>
              <div class="p-6">
                <div class="text-sm text-gray-500 mb-2">May 28, 2023</div>
                <h3 class="text-xl font-bold mb-2">The Future of Web Development: Trends to Watch</h3>
                <p class="text-gray-600 mb-4">Discover the emerging trends in web development that will shape the digital landscape in the coming years.</p>
                <a href="#" class="text-primary font-medium hover:underline">Read more →</a>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div class="h-48 bg-gray-200">
                <div class="w-full h-full flex items-center justify-center text-gray-500">
                  Featured Image
                </div>
              </div>
              <div class="p-6">
                <div class="text-sm text-gray-500 mb-2">May 15, 2023</div>
                <h3 class="text-xl font-bold mb-2">How to Create a Brand That Resonates With Your Audience</h3>
                <p class="text-gray-600 mb-4">Building a strong brand is essential for business success. Learn how to create a brand that truly connects with your target audience.</p>
                <a href="#" class="text-primary font-medium hover:underline">Read more →</a>
              </div>
            </div>
          </div>`
        }
      ])
    }
  ];

  // Filter templates by category
  const filteredTemplates = category === 'all' 
    ? templates 
    : templates.filter(template => template.category === category);

  const handleSelectAndClose = (template: Template) => {
    onSelectTemplate(template);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Content Template</DialogTitle>
          <DialogDescription>
            Choose a pre-designed template to quickly add beautiful content sections
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="all" value={category} onValueChange={setCategory} className="w-full">
          <TabsList className="grid grid-cols-8 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="statistics">Stats</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card 
                key={template.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSelectAndClose(template)}
              >
                <CardContent className="p-4">
                  <div className="h-40 mb-4 bg-gray-100 rounded flex items-center justify-center">
                    {template.thumbnail ? (
                      <img 
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="text-3xl text-gray-300">{template.icon}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-primary/10 p-1 rounded-full">
                      <div className="text-primary">
                        {template.icon}
                      </div>
                    </div>
                    <h3 className="font-medium">{template.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No templates found in this category.</p>
            </div>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}