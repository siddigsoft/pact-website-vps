import { Testimonial, ClientLogo } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    text: "PACT Consultancy transformed our operations, resulting in a 30% increase in efficiency and significant cost savings. Their strategic insights and implementation support were invaluable to our digital transformation journey.",
    author: "Sarah Johnson",
    position: "Chief Operations Officer",
    company: "Global Financial Services",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    rating: 5
  },
  {
    id: '2',
    text: "The team at PACT delivered beyond our expectations. Their healthcare expertise helped us navigate complex regulatory challenges while implementing a new patient management system that has significantly improved patient satisfaction scores.",
    author: "Michael Chen",
    position: "CIO",
    company: "Regional Healthcare Network",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5
  },
  {
    id: '3',
    text: "PACT's strategic guidance was instrumental in our successful market expansion. Their thorough analysis and actionable recommendations helped us achieve a seamless entry into three new international markets.",
    author: "Alicia Martinez",
    position: "VP of Strategy",
    company: "Global Retail Brand",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 4.5
  }
];

export const clientLogos: ClientLogo[] = [
  {
    id: '1',
    name: 'Client 1',
    logo: 'https://via.placeholder.com/150x80?text=Client+1'
  },
  {
    id: '2',
    name: 'Client 2',
    logo: 'https://via.placeholder.com/150x80?text=Client+2'
  },
  {
    id: '3',
    name: 'Client 3',
    logo: 'https://via.placeholder.com/150x80?text=Client+3'
  },
  {
    id: '4',
    name: 'Client 4',
    logo: 'https://via.placeholder.com/150x80?text=Client+4'
  },
  {
    id: '5',
    name: 'Client 5',
    logo: 'https://via.placeholder.com/150x80?text=Client+5'
  },
  {
    id: '6',
    name: 'Client 6',
    logo: 'https://via.placeholder.com/150x80?text=Client+6'
  }
];

export default testimonials;
