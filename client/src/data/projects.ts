import { ProjectIcons } from "@/components/projects/ProjectIcons";

export const projects = [
  {
    id: 1,
    title: "Third-Party Monitoring (TPM) of WFP Activities",
    description: "Monitoring of World Food Program activities in 13 Sudan States.",
    icon: ProjectIcons.TPM({ className: "h-6 w-6" }),
    organization: "World Food Program (WFP)",
    category: "monitoring",
    bgImage: "https://images.unsplash.com/photo-1594708767771-a5e9d3370ea5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Sustainable Livelihoods Assessment",
    description: "Final Assessment of the Sustainable Livelihoods for Displaced and Vulnerable Communities - SLDRP Project in Kassala.",
    icon: ProjectIcons.Livelihoods({ className: "h-6 w-6" }),
    organization: "The World Bank",
    category: "livelihoods",
    bgImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Nutrition & Food Security Intervention",
    description: "Mid-Term Assessment of the Integrated Nutrition & Food Security Intervention (Khartoum Project) in Eastern Sudan.",
    icon: ProjectIcons.Nutrition({ className: "h-6 w-6" }),
    organization: "World Food Program (WFP)",
    category: "nutrition",
    bgImage: "https://images.unsplash.com/photo-1488521787991-ed7bbafc3ceb?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Student Learning Assessment",
    description: "Assessment of Student Learning in 8 Camps and their Host Community in Eastern Sudan.",
    icon: ProjectIcons.Learning({ className: "h-6 w-6" }),
    organization: "UN High Commissioner for Refugees (UNHCR)",
    category: "education",
    bgImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Peace & Conflict Management",
    description: "Capacity Building Training and Youth Civic Education and Engagement for Sudan Peace Development Project.",
    icon: ProjectIcons.Peace({ className: "h-6 w-6" }),
    organization: "The World Bank",
    category: "peace",
    bgImage: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Community Health Initiative",
    description: "Implementation of community health programs focusing on preventative healthcare and wellness education.",
    icon: ProjectIcons.Health({ className: "h-6 w-6" }),
    organization: "Ministry of Health",
    category: "health",
    bgImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
  }
];