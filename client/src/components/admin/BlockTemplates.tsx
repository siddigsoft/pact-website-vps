import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grid, Columns, List, Quote, Image as ImageIcon, FileText, Layout } from 'lucide-react';

type BlockTemplateProps = {
  onSelect: (template: any) => void;
};

export default function BlockTemplates({ onSelect }: BlockTemplateProps) {
  const templates = [
    {
      id: 'text-image-left',
      name: 'Text with Left Image',
      icon: <Layout className="h-5 w-5" />,
      preview: (
        <div className="flex flex-row h-24 items-center gap-2 text-xs">
          <div className="w-1/3 bg-gray-200 h-full flex items-center justify-center">
            Image
          </div>
          <div className="w-2/3 space-y-1">
            <div className="h-3 bg-gray-200 w-full rounded-sm" />
            <div className="h-2 bg-gray-200 w-5/6 rounded-sm" />
            <div className="h-2 bg-gray-200 w-full rounded-sm" />
            <div className="h-2 bg-gray-200 w-5/6 rounded-sm" />
          </div>
        </div>
      ),
      template: [
        {
          id: 'image-text-container',
          type: 'html',
          content: `<div class="flex flex-col md:flex-row items-center gap-8 my-8">
  <div class="w-full md:w-1/3">
    <img src="https://placehold.co/600x400" alt="Description" class="w-full h-auto rounded-lg" />
  </div>
  <div class="w-full md:w-2/3">
    <h2 class="text-2xl font-bold mb-4">Section Title</h2>
    <p class="text-gray-700 mb-4">Add your content here. This template features an image on the left with text content on the right.</p>
    <p class="text-gray-700">Additional paragraph for more details and information about your product, service, or topic.</p>
  </div>
</div>`
        }
      ]
    },
    {
      id: 'text-image-right',
      name: 'Text with Right Image',
      icon: <Layout className="h-5 w-5" />,
      preview: (
        <div className="flex flex-row h-24 items-center gap-2 text-xs">
          <div className="w-2/3 space-y-1">
            <div className="h-3 bg-gray-200 w-full rounded-sm" />
            <div className="h-2 bg-gray-200 w-5/6 rounded-sm" />
            <div className="h-2 bg-gray-200 w-full rounded-sm" />
            <div className="h-2 bg-gray-200 w-5/6 rounded-sm" />
          </div>
          <div className="w-1/3 bg-gray-200 h-full flex items-center justify-center">
            Image
          </div>
        </div>
      ),
      template: [
        {
          id: 'image-text-container',
          type: 'html',
          content: `<div class="flex flex-col md:flex-row-reverse items-center gap-8 my-8">
  <div class="w-full md:w-1/3">
    <img src="https://placehold.co/600x400" alt="Description" class="w-full h-auto rounded-lg" />
  </div>
  <div class="w-full md:w-2/3">
    <h2 class="text-2xl font-bold mb-4">Section Title</h2>
    <p class="text-gray-700 mb-4">Add your content here. This template features an image on the right with text content on the left.</p>
    <p class="text-gray-700">Additional paragraph for more details and information about your product, service, or topic.</p>
  </div>
</div>`
        }
      ]
    },
    {
      id: 'two-column',
      name: 'Two Columns',
      icon: <Columns className="h-5 w-5" />,
      preview: (
        <div className="flex flex-row h-24 items-center gap-2 text-xs">
          <div className="w-1/2 space-y-1">
            <div className="h-3 bg-gray-200 w-full rounded-sm" />
            <div className="h-2 bg-gray-200 w-5/6 rounded-sm" />
            <div className="h-2 bg-gray-200 w-full rounded-sm" />
          </div>
          <div className="w-1/2 space-y-1">
            <div className="h-3 bg-gray-200 w-full rounded-sm" />
            <div className="h-2 bg-gray-200 w-5/6 rounded-sm" />
            <div className="h-2 bg-gray-200 w-full rounded-sm" />
          </div>
        </div>
      ),
      template: [
        {
          id: 'two-column-layout',
          type: 'html',
          content: `<div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
  <div>
    <h3 class="text-xl font-bold mb-3">First Column</h3>
    <p class="text-gray-700">This is the content for the first column. Add your information here.</p>
  </div>
  <div>
    <h3 class="text-xl font-bold mb-3">Second Column</h3>
    <p class="text-gray-700">This is the content for the second column. Add your information here.</p>
  </div>
</div>`
        }
      ]
    },
    {
      id: 'three-column',
      name: 'Three Columns',
      icon: <Grid className="h-5 w-5" />,
      preview: (
        <div className="flex flex-row h-24 items-center gap-2 text-xs">
          <div className="w-1/3 space-y-1">
            <div className="h-3 bg-gray-200 w-full rounded-sm" />
            <div className="h-2 bg-gray-200 w-5/6 rounded-sm" />
          </div>
          <div className="w-1/3 space-y-1">
            <div className="h-3 bg-gray-200 w-full rounded-sm" />
            <div className="h-2 bg-gray-200 w-5/6 rounded-sm" />
          </div>
          <div className="w-1/3 space-y-1">
            <div className="h-3 bg-gray-200 w-full rounded-sm" />
            <div className="h-2 bg-gray-200 w-5/6 rounded-sm" />
          </div>
        </div>
      ),
      template: [
        {
          id: 'three-column-layout',
          type: 'html',
          content: `<div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
  <div class="p-4 border rounded-lg">
    <h3 class="text-lg font-bold mb-2">Column One</h3>
    <p class="text-gray-700">Content for the first column goes here.</p>
  </div>
  <div class="p-4 border rounded-lg">
    <h3 class="text-lg font-bold mb-2">Column Two</h3>
    <p class="text-gray-700">Content for the second column goes here.</p>
  </div>
  <div class="p-4 border rounded-lg">
    <h3 class="text-lg font-bold mb-2">Column Three</h3>
    <p class="text-gray-700">Content for the third column goes here.</p>
  </div>
</div>`
        }
      ]
    },
    {
      id: 'image-gallery',
      name: 'Image Gallery',
      icon: <ImageIcon className="h-5 w-5" />,
      preview: (
        <div className="grid grid-cols-3 gap-1 h-24 text-xs">
          <div className="bg-gray-200 flex items-center justify-center">Img</div>
          <div className="bg-gray-200 flex items-center justify-center">Img</div>
          <div className="bg-gray-200 flex items-center justify-center">Img</div>
          <div className="bg-gray-200 flex items-center justify-center">Img</div>
          <div className="bg-gray-200 flex items-center justify-center">Img</div>
          <div className="bg-gray-200 flex items-center justify-center">Img</div>
        </div>
      ),
      template: [
        {
          id: 'gallery-grid',
          type: 'html',
          content: `<div class="my-8">
  <h2 class="text-2xl font-bold mb-4 text-center">Image Gallery</h2>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <img src="https://placehold.co/600x600" alt="Gallery image 1" class="w-full h-full object-cover" />
    </div>
    <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <img src="https://placehold.co/600x600" alt="Gallery image 2" class="w-full h-full object-cover" />
    </div>
    <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <img src="https://placehold.co/600x600" alt="Gallery image 3" class="w-full h-full object-cover" />
    </div>
    <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <img src="https://placehold.co/600x600" alt="Gallery image 4" class="w-full h-full object-cover" />
    </div>
    <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <img src="https://placehold.co/600x600" alt="Gallery image 5" class="w-full h-full object-cover" />
    </div>
    <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <img src="https://placehold.co/600x600" alt="Gallery image 6" class="w-full h-full object-cover" />
    </div>
  </div>
</div>`
        }
      ]
    },
    {
      id: 'feature-list',
      name: 'Feature List',
      icon: <List className="h-5 w-5" />,
      preview: (
        <div className="h-24 flex flex-col justify-center space-y-1 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-gray-400 rounded-full" />
            <div className="h-2 bg-gray-200 w-5/6 rounded-sm" />
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-gray-400 rounded-full" />
            <div className="h-2 bg-gray-200 w-2/3 rounded-sm" />
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-gray-400 rounded-full" />
            <div className="h-2 bg-gray-200 w-3/4 rounded-sm" />
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-gray-400 rounded-full" />
            <div className="h-2 bg-gray-200 w-5/6 rounded-sm" />
          </div>
        </div>
      ),
      template: [
        {
          id: 'feature-list',
          type: 'html',
          content: `<div class="my-8">
  <h2 class="text-2xl font-bold mb-4">Key Features</h2>
  <ul class="space-y-3">
    <li class="flex items-start">
      <svg class="h-5 w-5 text-primary mt-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      <div>
        <h3 class="font-semibold">Feature One</h3>
        <p class="text-gray-700">Description of the first feature and its benefits.</p>
      </div>
    </li>
    <li class="flex items-start">
      <svg class="h-5 w-5 text-primary mt-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      <div>
        <h3 class="font-semibold">Feature Two</h3>
        <p class="text-gray-700">Description of the second feature and its benefits.</p>
      </div>
    </li>
    <li class="flex items-start">
      <svg class="h-5 w-5 text-primary mt-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      <div>
        <h3 class="font-semibold">Feature Three</h3>
        <p class="text-gray-700">Description of the third feature and its benefits.</p>
      </div>
    </li>
  </ul>
</div>`
        }
      ]
    },
    {
      id: 'testimonial',
      name: 'Testimonial',
      icon: <Quote className="h-5 w-5" />,
      preview: (
        <div className="h-24 flex flex-col justify-center space-y-1 text-xs p-1">
          <div className="flex justify-center">
            <div className="h-8 w-8 bg-gray-200 rounded-full" />
          </div>
          <div className="text-center">"Quote"</div>
          <div className="h-2 bg-gray-200 w-1/2 mx-auto" />
          <div className="h-2 bg-gray-200 w-1/3 mx-auto" />
        </div>
      ),
      template: [
        {
          id: 'testimonial-block',
          type: 'html',
          content: `<div class="my-8 bg-gray-50 p-6 rounded-lg">
  <div class="flex flex-col items-center">
    <div class="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-500 font-semibold">
      JD
    </div>
    <div class="text-yellow-400 flex mb-4">
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
    <p class="text-lg italic text-center mb-4">"Working with this team was a game-changer for our business. Their expertise and dedication helped us achieve our goals faster than we thought possible."</p>
    <h4 class="font-semibold">John Doe</h4>
    <p class="text-sm text-gray-600">CEO, Company Name</p>
  </div>
</div>`
        }
      ]
    },
    {
      id: 'faq-accordion',
      name: 'FAQ Accordion',
      icon: <FileText className="h-5 w-5" />,
      preview: (
        <div className="h-24 flex flex-col justify-center space-y-2 text-xs">
          <div className="h-4 bg-gray-200 rounded-sm" />
          <div className="h-4 bg-gray-200 rounded-sm" />
          <div className="h-4 bg-gray-200 rounded-sm" />
        </div>
      ),
      template: [
        {
          id: 'faq-accordion',
          type: 'html',
          content: `<div class="my-8">
  <h2 class="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
  <div class="space-y-4">
    <div class="border rounded-lg overflow-hidden">
      <div class="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer">
        <h3 class="font-medium">Question 1: What services do you offer?</h3>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div class="px-4 py-3">
        <p class="text-gray-700">Answer to the first question goes here. Provide a comprehensive response that addresses the common concerns or questions your customers might have.</p>
      </div>
    </div>
    
    <div class="border rounded-lg overflow-hidden">
      <div class="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer">
        <h3 class="font-medium">Question 2: How can I get started?</h3>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div class="hidden px-4 py-3">
        <p class="text-gray-700">Answer to the second question goes here. Provide a step-by-step guide or a clear explanation of the process to help your customers get started with your product or service.</p>
      </div>
    </div>
    
    <div class="border rounded-lg overflow-hidden">
      <div class="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer">
        <h3 class="font-medium">Question 3: What makes your company different?</h3>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div class="hidden px-4 py-3">
        <p class="text-gray-700">Answer to the third question goes here. Highlight your unique selling propositions, your company values, or any special methodologies that set you apart from the competition.</p>
      </div>
    </div>
  </div>
</div>`
        }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {templates.map((template) => (
        <Card 
          key={template.id} 
          className="cursor-pointer hover:shadow-md transition-all"
          onClick={() => onSelect(template.template)}
        >
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-primary/10 p-1 rounded-full">
                <div className="text-primary">
                  {template.icon}
                </div>
              </div>
              <h3 className="text-sm font-medium">{template.name}</h3>
            </div>
            <div className="border rounded-md overflow-hidden">
              {template.preview}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}