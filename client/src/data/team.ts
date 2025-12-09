import { TeamMember } from "@/types";
import { generateSlug } from "@/lib/utils";

// Use fallback mechanism in the components instead of importing a placeholder image
const teamMemberImage = '';

// Helper function to generate a slug from the team member's name
const createTeamMemberSlug = (name: string) => generateSlug(name);

export const teamMembers: TeamMember[] = [
  // --- Leadership / Advisory Board (Distributed into departments below) ---

  // Monitoring, Evaluation & Learning
  {
    id: 1,
    name: "Dr. Karamallah Ali Abdelrahman",
    position: "Advisory Board Member",
    department: "Advisory Board Member",
    location: "",
    bio: `Dr.  Karamallah is a reputable, qualified and highly experienced statistician. He holds a Ph.D. and M.Sc. in Applied Statistics, Southampton University (UK) and is a member of the Institute of Statisticians (UK). He has a B.Sc. Mathematics from Khartoum University. 

He has extensive experience in statistics and serves as Associate Professor of Statistics, University of Medical Sciences  and Technology (UMST). He has previously served as Director General of Central Bureau of Statistics in Sudan, Lecturer and researcher in statistics at the Institute of Public Administration Riyadh - Saudi Arabia for about 20 years, Researcher and Director of Center of Economic Information, Chamber of Industry and Commerce in Riyadh in Saudi Arabia as well as Researcher and Lecturer at the Royal College of Jubail Industrial Town - Jubail, Saudi Arabia. 

He is widely published and has made unique contributions as President of African Statisticians 2018/2019. He has participated in many statistical Programmes in most African countries and three times in USA.
`,
    expertise: ["Applied Statistics", "Data Science", "Economic Information", "Statistical Analysis"],
    education: "PhD and MSc in Applied Statistics (Southampton University, UK)",
    achievements: ["President of African Statisticians 2018/2019", "Director General of Central Bureau of Statistics, Sudan", "Published researcher in economic information"],
    quote: "Accurate statistics are the compass for effective development.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Dr. Karamallah Ali Abdelrahman"),
    metaDescription: "Dr. Karamallah Ali is a renowned Statistician and Data Scientist at PACT Consultancy, former Director General of the Central Bureau of Statistics.",
    contact: {
      email: "",
      linkedin: ""
    }
  },
  {
    id: 2,
    name: "Intisar Salih",
    position: "Advisory Board Member",
    department: "Advisory Board Member",
    location: "",
    bio: `Mrs. Intisar is a development expert with over 25 years of extensive experience in Strategic Planning and Management of International Cooperation Programmes. She possesses a Master’s Degree in Natural Resource Management from the University of Khartoum and a Higher Diploma in Training of Trainers from Kuru College of Forestry in Finland.  She is also a qualified and certified trainer in results-based monitoring and evaluation, with the ability to develop strategies for building the capacities of staff and institutions.

Mrs. Salih has vast experience as a development practitioner in the UN system, having served as both national and international staff for over 20 years.  She has achieved profound accomplishments throughout the years, including mobilizing millions of dollars for development projects, building the capacities of institutions and designing as well as managing resource mobilization strategies. She has served in different countries and capacities including the following:

Programme Officer with the UNDP in Yemen responsible for the development, management, implementation and supervision of natural resource management projects;
International Cooperation and Development Consultant with the UNDP;
Project Manager with UNDP:  Enhancing Capacities and Business Processes of the Sudan Ministry of Foreign Affairs, Khartoum; 
Monitoring and Evaluation Regional Advisor, Regional Centre in Cairo-Egypt, Regional Bureau of Arab States, UNDP;
Regional Monitoring and Evaluation Lead Specialist for Nine Nile Basin Initiative on the Nile Transboundary Environmental Action Project (NTEAP) with a budget USD 43 million supported by the UNDP and World Bank;
Team Leader for the Sudan Enabling Environment Unit at the UNDP.

Intisar has a high ability to analyze situations, identify gaps, and develop strategies and approaches to address needs. She possesses vast skills and knowledge in supporting program and project development and formulation, including identifying and soliciting needed support and information. She has a strong capacity to manage and coordinate large studies and assessments in various fields such as poverty, climate change, environmental and social impact assessments, environmental and social safeguards, and conflict analysis dynamics and trends.

She has extensive professional experience in monitoring and evaluation using results-based management approaches and has served as an international M&E expert for 9 years, with accumulated comprehensive knowledge and experience in initiating, managing, and reviewing reports of various types and levels of evaluations. 
`,
    expertise: ["Strategic Planning", "Natural Resource Management", "Results-Based M&E", "Resource Mobilization"],
    education: "MSc in Natural Resource Management (University of Khartoum)",
    achievements: ["Regional M&E Lead for Nile Basin Initiative", "Mobilized significant development funds", "Managed large-scale environmental assessments"],
    quote: "Strategic cooperation is the bedrock of sustainable resource management.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Intisar Salih"),
    metaDescription: "Intisar Salih is an International Cooperation and Natural Resource Management Expert at PACT Consultancy with extensive UN experience.",
    contact: {
      email: "",
      linkedin: ""
    }
  },

  // Socio-economic Studies & Development
  {
    id: 4,
    name: "Dr. Habtu Assefa",
    position: "Advisory Board Member",
    department: "Advisory Board Member",
    location: "",
    bio: `Dr. Habtu is an agriculture and natural resource management expert with more than 35 years of experience. He holds a Ph.D. in Agriculture and Environmental Sciences from Wageningen Agricultural University – Wageningen in the Netherlands; M.Sc. in Plant Pathology and Minor Plant Breeding from University of Florida in Gainesveille – USA; and B.Sc. in Agriculture, first, second and third year (1970-74), Alemaya University of Agriculture, formerly, College of Agriculture, Addis Ababa University, Alemaya, Ethiopia, then two years of national service, and the fourth year (1976/77) in the University of Florida, degree obtained with high honor.

He has rich experience in consulting, project management, research, development and professional work with reputable national and international organizations.  He has previously worked as deputy country director and project coordinator in the Sasakawa Africa Association - SG2000 Ethiopia. During this tenure, he coordinated a project called 'strengthening Agriculture Extension Delivery in Ethiopia' and Digital Green Scale-up project. As deputy country director he was also responsible in supervising several donor support projects. Prior to that, he engaged in the Sida-Amhara Rural Development Programme, as coordinator and advisor in participatory on-farm research and agricultural and natural resource management. Through research and professional work, he has developed extensive experience and capacity in preparing research strategic plans, methodology for on-farm research and integrated watershed development and monitoring and evaluation research and development projects. He has profound understanding of participatory methodologies, on-farm research, and integrated watershed management and of problem identification/needs assessments with farmers and extension staff. As coordinator of these projects, he participated in the supervision of the midterm and final evaluation of the same. 

Dr. Habtu has also served in other organizations/ capacities involving work and consulting assignments. These include  SARDP/ARARI - Bahir Dar in Ethiopia, Ethiopian Agricultural Research Organization in Nazareth – Ethiopia, African Highlands Initiative – ICRAF, among others. 
`,
    expertise: ["Natural Resource Management", "Participatory Research", "Watershed Development", "Project Coordination"],
    education: "PhD in Agriculture and Environmental Sciences (Wageningen Agricultural University)",
    achievements: ["Deputy Country Director Sasakawa Global 2000", "Led Digital Green Scale-up projects", "Expert in participatory on-farm research"],
    quote: "Participatory research empowers communities to manage their natural resources sustainably.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Dr. Habtu Assefa"),
    metaDescription: "Dr. Habtu Assefa is an Agriculture and Natural Resource Management Expert at PACT Consultancy with over 35 years of experience.",
    contact: {
      email: "",
      linkedin: ""
    }
  },
  {
    id: 5,
    name: "Abdelmajid Khojali",
    position: "Advisory Board Member",
    department: "Advisory Board Member",
    location: "",
    bio: "Abdelmajid Khojali is a veteran livelihood expert and financial inclusion specialist. He has handled several rural development assignments involving the formulation and evaluation of cost-effective livelihood, food security, and comprehensive development interventions. Abdelmajid specializes in sub-sector approaches to micro-enterprise development, business planning for microfinance institutions, and capacity assessment of non-state actors. He has executed assignments for UNDP, JICA, FAO, IFAD, and Oxfam.",
    expertise: ["Livelihood Development", "Financial Inclusion", "Value Chain Analysis", "Microfinance Planning"],
    education: "MSc in Agricultural Economics (University of Reading, UK)",
    achievements: ["Designed microfinance management systems", "Conducted rapid market appraisals for MSMEs", "Evaluated major rural development programs"],
    quote: "Sustainable livelihoods are built on the intersection of economic opportunity and social inclusion.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Abdelmajid Khojali"),
    metaDescription: "Abdelmajid Khojali is a Livelihood and Financial Inclusion Expert at PACT Consultancy, specializing in rural development and microfinance.",
    contact: {
      email: "",
      linkedin: ""
    }
  },
  {
    id: 28,
    name: "Ilham Osman Ibrahim",
    position: "Gender, Social Inclusion & Capacity Expert",
    department: "Socio-economic Studies & Development",
    location: "Global",
    bio: "Ilham Osman Ibrahim is a Gender Expert and Capacity Development Specialist with over 20 years of experience in research, community development, and strategic planning. She holds an MSc in Peace and Development. Ilham has extensive experience in designing capacity-building assignments and gender mainstreaming strategies across Africa, the Arab/MENA region, Europe, and Latin America. She is the Executive Director of the Sudanese Organization for Research and Development (SORD).",
    expertise: ["Gender Mainstreaming", "Social Inclusion", "Capacity Development", "Strategic Planning"],
    education: "MSc in Peace and Development (University of Juba)",
    achievements: ["Executive Director of SORD", "Chairperson of African Women Network for Peace", "Led capacity building across multiple continents"],
    quote: "True development cannot occur without gender equity and social inclusion.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Ilham Osman Ibrahim"),
    metaDescription: "Ilham Osman Ibrahim is a Gender and Social Inclusion Expert at PACT Consultancy, leading capacity development and gender mainstreaming initiatives.",
    contact: {
      email: "ilham.osman@pactconsultancy.com",
      linkedin: "linkedin.com/in/ilhamosman"
    }
  },

  // Poverty Reduction & MSME Development
  {
    id: 6,
    name: "Dr. Mohamed Yousif",
    position: "Chairman & CEO / Business Strategist",
    department: "Poverty Reduction & MSME Development",
    location: "Global",
    bio: "Dr. Mohamed Yousif is the Chairman and CEO of PACT Consultancy. He is a business strategist and project development expert with over 28 years of international experience. He has provided consulting services to multi-national corporations like FedEx and ZTE, and development organizations including GIZ, UNDP, and the World Bank. Dr. Yousif specializes in economically empowering the poor through micro-enterprise development, financial inclusion, and value chain projects. He formerly served on a round-table advisory group at the U.S. Department of Commerce.",
    expertise: ["Business Strategy", "MSME Development", "Financial Inclusion", "Corporate Consulting"],
    education: "PhD and M.Phil (George Washington University, USA)",
    achievements: ["Chairman & CEO of PACT Consultancy", "Advisor to U.S. Dept of Commerce (1995-96)", "Founded Sudanese American Community Development Organization"],
    quote: "We bridge the gap between corporate strategy and sustainable development impact.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Dr. Mohamed Yousif"),
    metaDescription: "Dr. Mohamed Yousif is the Chairman and CEO of PACT Consultancy, a seasoned expert in business strategy and MSME development.",
    contact: {
      email: "mohamed.yousif@pactconsultancy.com",
      linkedin: "linkedin.com/in/mohamedyousif"
    }
  },
  {
    id: 8,
    name: "Adil Sadoq",
    position: "Microenterprise & Livelihood Expert",
    department: "Poverty Reduction & MSME Development",
    location: "Global",
    bio: "Adil Sadoq is a renowned expert in microenterprise development, youth livelihoods, and financial inclusion (both traditional and Islamic Sharia-compliant). Based in Washington DC, he has led projects across the MENA region and Africa for clients like QFFD, Save the Children, and IFC. Adil successfully started up a $5.3M youth financial services project in Morocco/Egypt reaching 48,000 youth and established MEDA Maroc. He is fluent in Arabic, French, and English.",
    expertise: ["Microenterprise Development", "Islamic Microfinance", "Youth Livelihoods", "Program Design"],
    education: "MA from University of Fes, Morocco; Graduate Cert. in Humanitarian Leadership (Deakin University)",
    achievements: ["Established MEDA Maroc", "Led $5.3M Youth Invest project", "Designed financial products for youth"],
    quote: "Inclusive financial systems are key to unlocking youth potential.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Adil Sadoq"),
    metaDescription: "Adil Sadoq is a Microenterprise and Livelihood Development Expert at PACT Consultancy, specializing in financial inclusion and youth programs.",
    contact: {
      email: "adil.sadoq@pactconsultancy.com",
      linkedin: "linkedin.com/in/adilsadoq"
    }
  },
  {
    id: 7,
    name: "Tefera Tesfaye",
    position: "Banking & Microfinance Expert",
    department: "Poverty Reduction & MSME Development",
    location: "Global",
    bio: "Tefera Tesfaye is an experienced banker and microfinance expert with over 16 years of experience. He most recently served as Director of Programs and Stakeholder Relations at Siinqee Bank. His background includes roles as Project Coordinator, Advisor to the President, and Director of Risk and Compliance. Tefera is a Certified Digital Financial Services Practitioner and has completed the Digital Money course from the Fletcher School.",
    expertise: ["Microfinance", "Banking Operations", "Risk Management", "Digital Financial Services"],
    education: "Post Graduate Diploma in International Business Operation (IGNOU); Degree in Agricultural Economics (Alemaya University)",
    achievements: ["Certified Digital Financial Services Practitioner", "Director of Programs at Siinqee Bank", "Expert in linking poor households to markets"],
    quote: "Robust banking systems are essential for delivering financial services to the grassroots.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Tefera Tesfaye"),
    metaDescription: "Tefera Tesfaye is a Banking and Microfinance Expert at PACT Consultancy, focusing on financial inclusion and risk management.",
    contact: {
      email: "tefera.tesfaye@pactconsultancy.com",
      linkedin: "linkedin.com/in/teferatesfaye"
    }
  },
  {
    id: 3,
    name: "Dalmas J. Menya",
    position: "Financial Inclusion & Business Mgmt Expert",
    department: "Poverty Reduction & MSME Development",
    location: "Global",
    bio: `Mr. Menya is a Financial Inclusion guru, Corporate Entrepreneur and Project/ Business Management Specialist with solid expertise and rich experience in enterprise development, strategic management, organizational transformation and development consulting.  He is a shareholder and Board member in PACT Uganda, South Sudan and Rwanda. 

He holds Master of Business Administration (MBA) qualification from Jomo Kenyatta University (JKUAT), Bachelor’s Degree in Social Sciences from Kenyatta University (KU) as well as a host of management, payments systems and technology certifications from the African Virtual University (AVU), Microsoft Corporation and the Cooperative University. Further, he holds certification in microfinance from the World Bank Institute (WBI). Additionally, he is a certified  M&E Specialist from the International Training Centre of the ILO (Turin, Italy). Moreover, Dalmas is a Certified Data Management Professional from the Data Management Institute (DMI, USA).

He has over 15 years of experience at the helm of corporate entrepreneurship and empowering leadership as CEO & COO of multinational and national corporations spanning the areas of microfinance, commercial banking, cooperatives, financial technology and community empowerment initiatives. Dalmas’ key achievements include managing successful digital financial services (DFS) projects as well as business startups and turnarounds/ growth based on clearly defined profitable strategies, digitization, organizational and governance structures, empowered management teams as well as policy frameworks. 
	
On the consulting front, Dalmas has expertise and experience of over 15 years of development consulting and project management in initiatives funded/ supported by the World Bank (WB),  Net1/ Aplitec, Swedish Cooperative Agency, International Finance Corporation (IFC), United Nations Development Program (UNDP), United Nations Children’s Fund (UNICEF), World Food Programme (WFP), International Fund for Agricultural Development (IFAD), the Islamic Development Bank (IsDB), the Mastercard Foundation (MCF) and other partnerships in Sudan, Uganda, Rwanda, South Africa and Kenya.`,
    expertise: ["Financial Inclusion", "Digital Financial Services", "Enterprise Development", "Strategic Management"],
    education: "MBA (JKUAT); Certified Data Management Professional (DMI, USA)",
    achievements: ["Managed successful Digital Financial Services projects", "Board member in PACT Uganda, South Sudan, and Rwanda", "Expert in corporate turnarounds"],
    quote: "Digital transformation in finance is the pathway to economic empowerment.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Dalmas Menya"),
    metaDescription: "Dalmas Menya is a Financial Inclusion and Business Management Expert at PACT Consultancy, leading digital financial services initiatives.",
    contact: {
      email: "dalmas.menya@pactconsultancy.com",
      linkedin: "linkedin.com/in/dalmasmenya"
    }
  },
  {
    id: 31,
    name: "Faith Kemunto Nyabuto",
    position: "Finance, Business & Strategy Expert",
    department: "Poverty Reduction & MSME Development",
    location: "Global",
    bio: "Faith Nyabuto is a solutions-focused professional with 10 years of experience driving transformational growth for startups and SMEs. As a Senior Growth Manager at Xetova Ltd, she raised over $1.2M in investment. Faith has worked with Botho Emerging Markets Group, Crossboundary LLC, and Deloitte & Touche. She specializes in financial modeling, investment advisory, and market entry strategies, having sourced and evaluated over 500 investment opportunities across Sub-Saharan Africa.",
    expertise: ["Investment Advisory", "Financial Modeling", "Growth Strategy", "Market Research"],
    education: "MBA in Strategic Management (University of Nairobi); CPA-K",
    achievements: ["Secured $1.2M+ investment for Xetova", "Facilitated $20M+ financing into companies at Botho", "First Class Honors Equity Bank/Mastercard Scholar"],
    quote: "Strategic financial management unlocks the growth potential of African enterprises.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Faith Kemunto Nyabuto"),
    metaDescription: "Faith Nyabuto is a Finance and Strategy Expert at PACT Consultancy, specializing in investment advisory and SME growth.",
    contact: {
      email: "faith.nyabuto@pactconsultancy.com",
      linkedin: "linkedin.com/in/faithnyabuto"
    }
  },

  // Technology & Digital Transformation
  {
    id: 9,
    name: "Sunil Varghese Prasad",
    position: "ERP & Technology Infrastructure Expert",
    department: "Technology & Digital Transformation",
    location: "Global",
    bio: "Sunil Varghese is a certified IT expert with over 20 years of experience in large-scale global ERP projects, Openstack Cloud infrastructure, and data centers. He serves as Director of Cloud Services at Sybyl Kenya Ltd. Sunil has technical expertise in Business Continuity, Disaster Recovery, and Systems Security. He has overseen high-profile projects for the Kenya National Treasury, Safaricom, Equity Bank, and KCB Bank.",
    expertise: ["Cloud Infrastructure", "ERP Implementation", "Disaster Recovery", "Systems Security"],
    education: "Certified Accredited IT Expert",
    achievements: ["Implemented Oracle Supercluster for Kenya National Treasury", "Director of Cloud Services at Sybyl Kenya", "Managed CyberArk/Checkpoint for Safaricom"],
    quote: "Robust technology infrastructure is the backbone of modern service delivery.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Sunil Varghese Prasad"),
    metaDescription: "Sunil Varghese is an ERP and Technology Infrastructure Expert at PACT Consultancy, specializing in cloud services and system security.",
    contact: {
      email: "sunil.varghese@pactconsultancy.com",
      linkedin: "linkedin.com/in/sunilvarghese"
    }
  },
  {
    id: 10,
    name: "Melaku Kebede",
    position: "Banking & Payment Systems Expert",
    department: "Technology & Digital Transformation",
    location: "Global",
    bio: "Melaku Kebede is a seasoned Banker and Payment Systems Expert. He served as the CEO of Hibret Bank (Ethiopia) until 2024. Melaku has over 17 years of experience in banking technology, having led the deployment of Flexcube Core Banking systems and the development of Ethiopia's Financial National Cyber Security Strategy Framework. He holds certifications in Islamic Finance (CIMA) and Leading Global Business (Harvard Business School).",
    expertise: ["Core Banking Systems", "Payment Systems", "Cyber Security Strategy", "Digital Banking"],
    education: "MSc in Information Science (Addis Ababa University); Harvard Business School Cert.",
    achievements: ["CEO of Hibret Bank (until 2024)", "Developed Financial National Cyber Security Strategy for Ethiopia", "Led Flexcube deployments at multiple banks"],
    quote: "Secure and efficient payment systems are vital for financial stability.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Melaku Kebede"),
    metaDescription: "Melaku Kebede is a Banking and Payment Systems Expert at PACT Consultancy, former CEO of Hibret Bank.",
    contact: {
      email: "melaku.kebede@pactconsultancy.com",
      linkedin: "linkedin.com/in/melakukebede"
    }
  },
  {
    id: 25,
    name: "Amin Abdelrahim Mohamed Oshi",
    position: "Banking Systems & FinTech Expert",
    department: "Technology & Digital Transformation",
    location: "Global",
    bio: "Amin Oshi is a renowned Banking Sector and FinTech expert with over 44 years of experience, including 10 years at the Central Bank of Sudan where he led the 'Technology Horizons Project'. He founded Khotawat Consultancy and has served on the boards of CIASA and Electronic Banking Services (EBS). Amin was instrumental in laying the foundation for the National Payment System in Sudan, including the National ATM/POS Switch and Electronic Check Clearing System.",
    expertise: ["Banking Technology", "National Payment Systems", "ICT Consultancy", "FinTech Regulation"],
    education: "PG Diploma in Computer Science (University of Khartoum); Diploma in Petroleum Industry Studies (France)",
    achievements: ["Led Technology Horizons Project at Central Bank of Sudan", "Established National Payment System in Sudan", "CEO of Khotawat Consultancy"],
    quote: "Modernizing banking infrastructure is crucial for economic integration.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Amin Abdelrahim Mohamed Oshi"),
    metaDescription: "Amin Oshi is a Banking Systems and FinTech Expert at PACT Consultancy, with decades of leadership at the Central Bank of Sudan.",
    contact: {
      email: "amin.oshi@pactconsultancy.com",
      linkedin: "linkedin.com/in/aminoshi"
    }
  },
  {
    id: 27,
    name: "Eric Nana Kwabena Agyei",
    position: "Agricultural Technology & Payment Expert",
    department: "Technology & Digital Transformation",
    location: "Global",
    bio: "Eric Nana is the Founder and Managing Director of MobiPay AgroSys Limited. He is a certified IT specialist who has steered MobiPay into a leading high-tech solutions provider for agriculture value chains. Eric developed 'AgroBase', a cloud-based platform creating farmer visibility and linkage to financial services. He has implemented digital financial solutions for partners like UNCDF, USAID, and TechnoServe.",
    expertise: ["AgriTech", "Digital Payments", "System Architecture", "Cloud Platforms"],
    education: "BSc in Computer Science (Kampala International University)",
    achievements: ["Founder of MobiPay AgroSys", "Developed AgroBase cloud platform", "Partnered with UNCDF and USAID on digital finance"],
    quote: "Technology bridges the gap between smallholder farmers and global markets.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Eric Nana Kwabena Agyei"),
    metaDescription: "Eric Nana is an Agricultural Technology and Payment Systems Expert at PACT Consultancy, founder of MobiPay AgroSys.",
    contact: {
      email: "eric.nana@pactconsultancy.com",
      linkedin: "linkedin.com/in/ericnana"
    }
  },
  {
    id: 32,
    name: "Siddig Mamoun Ibrahim",
    position: "ICT & Infrastructure Expert",
    department: "Technology & Digital Transformation",
    location: "Global",
    bio: "Siddig Mamoun Ibrahim is an information technology specialist with over 10 years of experience in IP infrastructure, database management, and mobile data collection systems. He has deployed and managed mission-critical technology platforms for Almithal Microfinance and Sudan Rural Development Company. He holds professional certifications in Database Administration and Systems Security.",
    expertise: ["IP Infrastructure", "Database Management", "Mobile Data Systems", "Systems Security"],
    education: "BSc in Computer Science (Sudan University for Science and Technology)",
    achievements: ["Managed technology platforms for microfinance institutions", "Deployed mobile data collection systems", "Certified Database Administrator"],
    quote: "Reliable data systems are the engine of modern development monitoring.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Siddig Mamoun Ibrahim"),
    metaDescription: "Siddig Mamoun Ibrahim is an ICT and Infrastructure Expert at PACT Consultancy, specializing in database management and secure networks.",
    contact: {
      email: "siddig.ibrahim@pactconsultancy.com",
      linkedin: "linkedin.com/in/siddigibrahim"
    }
  },
  {
    id: 33,
    name: "Hassan Nagila",
    position: "Cloud Engineer & Tech Infrastructure",
    department: "Technology & Digital Transformation",
    location: "Global",
    bio: "Hassan Nagila is a Senior Cloud Engineer with expertise in data centers and network infrastructure. He currently serves as Senior Cloud Engineer with Allianz Technology, managing public cloud operations for the Americas. Hassan has deep experience in technology roadmaps, cross-project architectural governance, and partnership with IT engineers to design scalable solutions.",
    expertise: ["Cloud Engineering", "Network Infrastructure", "Data Center Design", "IT Governance"],
    education: "Senior Cloud Engineer Certifications",
    achievements: ["Senior Cloud Engineer at Allianz Technology", "Designed comprehensive data center infrastructures", "Expert in cross-project architectural governance"],
    quote: "Cloud technology offers the scalability needed for global enterprise solutions.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Hassan Nagila"),
    metaDescription: "Hassan Nagila is a Cloud Engineer and Technology Infrastructure Expert at PACT Consultancy, focusing on enterprise cloud solutions.",
    contact: {
      email: "hassan.nagila@pactconsultancy.com",
      linkedin: "linkedin.com/in/hassannagila"
    }
  },

  // Program/Project Development & Assessment
  {
    id: 11,
    name: "Tarig Abdel Monim",
    position: "Strategy & RBM Expert",
    department: "Program/Project Development & Assessment",
    location: "Global",
    bio: "Tarig Abdel Monim is an executive and consultant with international experience in Strategy, Business Planning, and Performance Management. He has led new ventures to millions in revenue and managed teams of up to 75 employees. Tarig has extensive experience with the World Bank/IFC 'Doing Business' report and has led strategic projects in PPPs, Re-organization, and Balanced Scorecards across industries from Agro-Industries to Financial Services.",
    expertise: ["Strategic Planning", "Results-Based Management", "Performance Management", "Business Process Improvement"],
    education: "Executive Management Experience (North America, Middle East, Africa)",
    achievements: ["Led strategic projects in PPPs and Re-organization", "Local partner for World Bank/IFC 'Doing Business' report", "Managed projects ranging from $4M to $138M"],
    quote: "A strategy is only as good as its implementation and performance measurement.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Tarig Abdel Monim"),
    metaDescription: "Tarig Abdel Monim is a Strategy and Results-Based Management Expert at PACT Consultancy, focusing on performance systems and strategic planning.",
    contact: {
      email: "tarig.monim@pactconsultancy.com",
      linkedin: "linkedin.com/in/tarigmonim"
    }
  },
  {
    id: 12,
    name: "Seifeldin Abbaro",
    position: "Strategic Planning & Development Expert",
    department: "Program/Project Development & Assessment",
    location: "Global",
    bio: "Seifeldin Abbaro is a Strategic Planning and Development expert with over 45 years of experience. He is currently the Strategic Planning Advisor to the Ministry of Culture in Qatar. His distinguished career includes roles as Country Director for UNDP Lebanon, UN Resident Coordinator in Qatar, and Senior Advisor to the DSRSG in Iraq. He specializes in setting up Trust Funds, Resource Mobilization, and Crisis Management.",
    expertise: ["Strategic Planning", "International Cooperation", "Crisis Management", "Trust Funds"],
    education: "MSc and BSc from City University London, UK",
    achievements: ["Country Director UNDP Lebanon", "UN Resident Coordinator Qatar", "Head of UNDG Iraq Trust Fund Support Office"],
    quote: "Strategic planning in development requires foresight, innovation, and resilience.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Seifeldin Abbaro"),
    metaDescription: "Seifeldin Abbaro is a Strategic Planning and Development Expert at PACT Consultancy, with a 45-year career in the UN and government advisory.",
    contact: {
      email: "seifeldin.abbaro@pactconsultancy.com",
      linkedin: "linkedin.com/in/seifeldinabbaro"
    }
  },

  // Public Health & Nutrition
  {
    id: 13,
    name: "Dr. Ibrahim Ahmed Bani",
    position: "Public Health Expert",
    department: "Public Health & Nutrition",
    location: "Global",
    bio: "Dr. Ibrahim Ahmed Bani is a highly accomplished public health physician with over two decades of experience. He serves as Associate Professor at Yale School of Public Health (Adjunct) and Emory University. Dr. Bani has held leadership roles in Saudi Arabia and has been a consultant for WHO, USAID, and the World Bank. He has published over 50 papers and served as a technical adviser for Migrant Health Projects in the MENA region.",
    expertise: ["International Public Health", "Epidemiology", "Health Policy", "Medical Education"],
    education: "PhD in Nutrition (University of Surrey); Fellow of Faculty of Public Health (UK); MPH (Johns Hopkins)",
    achievements: ["Adjunct Associate Professor at Yale and Emory", "Consultant for WHO, UNICEF, and World Bank", "Published over 50 peer-reviewed papers"],
    quote: "Global health equity is achieved through education, policy, and community engagement.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Dr. Ibrahim Ahmed Bani"),
    metaDescription: "Dr. Ibrahim Ahmed Bani is a Global Public Health Expert at PACT Consultancy, associated with Yale and Emory Universities.",
    contact: {
      email: "ibrahim.bani@pactconsultancy.com",
      linkedin: "linkedin.com/in/ibrahimbani"
    }
  },

  // Agricultural and Land Use Services
  {
    id: 14,
    name: "Dr. Nasredin Hag Elamin",
    position: "Agrifood Strategist & Food Security Expert",
    department: "Agricultural and Land Use Services",
    location: "Global",
    bio: "Dr. Nasredin Elamin is an experienced advisor on agrifood strategies, value chains, and trade with over 30 years of experience. He served as the FAO Representative in Egypt and Jordan, and as a Senior Policy Officer in the FAO Regional Office for the Near East. He specializes in advising countries on sustainable agriculture development, trade (WTO), and food security policies.",
    expertise: ["Agrifood Strategy", "Food Security", "Agricultural Trade Policy", "Value Chains"],
    education: "PhD in Economics (University of Lancaster, UK); MSc in Trade and Development",
    achievements: ["FAO Representative in Egypt and Jordan", "Led FAO policy assistance in the Near East", "Published author on agriculture and trade"],
    quote: "Sustainable agrifood systems are the foundation of national food security.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Dr. Nasredin Hag Elamin"),
    metaDescription: "Dr. Nasredin Hag Elamin is an Agrifood Strategist and Food Security Expert at PACT Consultancy, formerly FAO Representative in Egypt and Jordan.",
    contact: {
      email: "nasredin.elamin@pactconsultancy.com",
      linkedin: "linkedin.com/in/nasredinelamin"
    }
  },
  {
    id: 15,
    name: "Prof. Abdelrahman Khidir",
    position: "Drylands Farming & Climate Expert",
    department: "Agricultural and Land Use Services",
    location: "Global",
    bio: "Prof. Abdelrahman Khidir is a renowned Professor of Agronomy specializing in drylands farming and climate change. He served as the Director of the Dry Lands Research Center and Coordinator of the Climate Change Adaptive Production Technologies Project (NORAD). With over 40 years of experience, he has led numerous projects in seed development, eco-farming, and vulnerability assessments for UNDP and IFAD.",
    expertise: ["Dryland Farming", "Climate Change Adaptation", "Agronomy", "Water Harvesting"],
    education: "MSc in Crop Science (North Carolina State University); MSc in Agriculture (Bulgaria)",
    achievements: ["Chairperson of Drylands Coordination Group", "Coordinator of Climate Change Adaptive Technologies Project", "Research Professor at ARC Sudan"],
    quote: "Adapting dryland farming to climate change is critical for resilience in Africa.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Prof. Abdelrahman Khidir"),
    metaDescription: "Prof. Abdelrahman Khidir is a Drylands Farming and Climate Change Expert at PACT Consultancy, with over 40 years of research experience.",
    contact: {
      email: "abdelrahman.khidir@pactconsultancy.com",
      linkedin: "linkedin.com/in/abdelrahmankhidir"
    }
  },
  {
    id: 16,
    name: "Dr. Abdullatif Ijaimi",
    position: "Ag. Production & Market Access Expert",
    department: "Agricultural and Land Use Services",
    location: "Global",
    bio: "Dr. Abdullatif Ijaimi is a specialist in agricultural production and marketing with over 33 years of experience. He is a former Federal Minister of Agriculture and Forests in Sudan. Dr. Ijaimi has extensive experience in preparing strategies for food security and poverty reduction. He played a key role in the Green Mobilization Programme and the Sudan National Agriculture Investment Plan (SUDNAIP).",
    expertise: ["Agricultural Policy", "Market Access", "Food Security Analysis", "Value Chain Analysis"],
    education: "PhD in Agricultural Marketing (University of Hohenheim, Germany)",
    achievements: ["Former Federal Minister of Agriculture (Sudan)", "Led preparation of Sudan National Agriculture Investment Plan", "Expert in rain-fed sector statistics"],
    quote: "Connecting production to markets is the key to agricultural transformation.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Dr. Abdullatif Ijaimi"),
    metaDescription: "Dr. Abdullatif Ijaimi is an Agricultural Production and Market Access Expert at PACT Consultancy, and former Minister of Agriculture in Sudan.",
    contact: {
      email: "abdullatif.ijaimi@pactconsultancy.com",
      linkedin: "linkedin.com/in/abdullatifijaimi"
    }
  },
  {
    id: 24,
    name: "Dr. Aberra Debelo",
    position: "Agronomy & Food Systems Expert",
    department: "Agricultural and Land Use Services",
    location: "Global",
    bio: "Dr. Aberra Debelo is a reputable agronomist with over 25 years of experience. He served as the Country Director of Sasakawa Global 2000 Ethiopia for 13 years, spearheading the transfer of agricultural technologies to smallholder farmers. He was previously the Deputy Director General of the Ethiopian Institute of Agricultural Research (EIAR). Dr. Aberra has released multiple sorghum and finger millet varieties adapted to Ethiopian climates.",
    expertise: ["Crop Science", "Agricultural Extension", "Plant Breeding", "Food Systems"],
    education: "PhD in Crop Science (Oklahoma State University, USA)",
    achievements: ["Country Director Sasakawa Global 2000 (2005-2018)", "Released drought-resistant sorghum varieties", "President of Ethiopian Association of Agricultural Professionals"],
    quote: "Scientific innovation in crop science must reach the smallholder farmer to ensure food security.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Dr. Aberra Debelo"),
    metaDescription: "Dr. Aberra Debelo is an Agronomy and Food Systems Expert at PACT Consultancy, former Country Director of Sasakawa Global 2000.",
    contact: {
      email: "aberra.debelo@pactconsultancy.com",
      linkedin: "linkedin.com/in/aberradebelo"
    }
  },

  // Education & Learning
  {
    id: 17,
    name: "Prof. Robert M. K. Deng",
    position: "Educationist & Professor",
    department: "Education & Learning",
    location: "Global",
    bio: "Prof. Robert Deng is a Professor of Inorganic Chemistry and the Vice-Chancellor of the University of Juba. He has a long teaching career spanning universities in Kenya, Botswana, and Australia. He has served as Deputy Vice-Chancellor for Administration and Finance and Dean of Students. Prof. Deng has published widely in international peer-reviewed journals in the field of Inorganic and Phosphorous Chemistry.",
    expertise: ["Higher Education Mgmt", "Inorganic Chemistry", "Curriculum Development", "University Administration"],
    education: "PhD in Inorganic Chemistry (University College of Durham, UK)",
    achievements: ["Vice-Chancellor of the University of Juba", "Former Senior Lecturer at Flinders University, Australia", "Director in PACT South Sudan"],
    quote: "Strong educational institutions are the pillars of national development.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Prof. Robert Deng"),
    metaDescription: "Prof. Robert Deng is an Educationist and Vice-Chancellor of the University of Juba, serving as a key expert at PACT Consultancy.",
    contact: {
      email: "robert.deng@pactconsultancy.com",
      linkedin: "linkedin.com/in/robertdeng"
    }
  },
  {
    id: 18,
    name: "Dr. Herine Otieno",
    position: "Educationist & Learning Systems Expert",
    department: "Education & Learning",
    location: "Global",
    bio: "Dr. Herine Otieno is an expert in educational research and delivery systems. She is the CEO of EduHub Africa and served as Director of a $12M MasterCard Foundation Teacher Training Program at AIMS-Rwanda. Dr. Herine has built models for gender-responsive, evidence-based teacher training. She is a Pan-Africanist educationist with a network spanning the African Union and ADEA, and founded Africa's first online education radio, EduTalkAfric.",
    expertise: ["STEM Education", "Teacher Training", "Educational Research", "Learning Systems"],
    education: "PhD in Mathematics Education (Sheffield Hallam University, UK)",
    achievements: ["Director of AIMS-Rwanda Teacher Training Program", "Founder & CEO of EduHub Africa", "Developed gender-responsive training models"],
    quote: "Innovative learning systems are essential for the next generation of African leaders.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Dr. Herine Otieno"),
    metaDescription: "Dr. Herine Otieno is an Educationist and Learning Systems Expert at PACT Consultancy, founder of EduHub Africa.",
    contact: {
      email: "herine.otieno@pactconsultancy.com",
      linkedin: "linkedin.com/in/herineotieno"
    }
  },
  {
    id: 26,
    name: "Dr. Fekadu Asrat",
    position: "TVET & Technology Innovation Expert",
    department: "Education & Learning",
    location: "Global",
    bio: "Dr. Fekadu Asrat is a multi-skilled TVET Expert with over 26 years of experience. He has provided technical assistance to the Federal TVET Agency in Ethiopia and served as a Senior Advisor for the GIZ Engineering Capacity Building Program. Dr. Fekadu specializes in developing TVET financing strategies, technology transfer, and curriculum for skills development. He holds a PhD in Technology Management & Innovation.",
    expertise: ["TVET Strategy", "Skills Development", "Technology Transfer", "Curriculum Development"],
    education: "PhD in Technology Management & Innovation (Cebu Technological University)",
    achievements: ["Lead Member of Ethiopian TVET Financing Strategy Taskforce", "Advisor to Federal TVET Agency", "Organized 1st Ethiopian Skills Competition"],
    quote: "Skills development through TVET is the engine of industrial growth.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Dr. Fekadu Asrat"),
    metaDescription: "Dr. Fekadu Asrat is a TVET and Technology Innovation Expert at PACT Consultancy, specializing in vocational training strategies.",
    contact: {
      email: "fekadu.asrat@pactconsultancy.com",
      linkedin: "linkedin.com/in/fekaduasrat"
    }
  },

  // Peace Building & Conflict Resolution
  {
    id: 19,
    name: "Chrysantus Ache",
    position: "Development & Humanitarian Expert",
    department: "Peace Building & Conflict Resolution",
    location: "Global",
    bio: "Chrysantus Ache is an accomplished expert who served in the UNHCR for over 32 years, mostly as a Representative in 16 African countries including DRC, Somalia, and Sudan. He was responsible for establishing the UNHCR representation to the African Union and ECA. Chrysantus worked closely with the AU on VISION 2063 and is a true Pan-Africanist committed to resolving the root causes of conflict through good governance.",
    expertise: ["Humanitarian Affairs", "Conflict Resolution", "Diplomacy", "Regional Integration"],
    education: "LLM (UPenn/Wharton); MALD (Fletcher School/Harvard); LLB (University of Yaounde)",
    achievements: ["UNHCR Representative to the AU and ECA (2009-2014)", "Managed complex humanitarian situations in 16 countries", "Contributed to AU VISION 2063"],
    quote: "Sustainable peace is built on a foundation of good governance and regional integration.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Chrysantus Ache"),
    metaDescription: "Chrysantus Ache is a Development and Humanitarian Expert at PACT Consultancy, with over 30 years of leadership at UNHCR.",
    contact: {
      email: "chrysantus.ache@pactconsultancy.com",
      linkedin: "linkedin.com/in/chrysantusache"
    }
  },
  {
    id: 20,
    name: "Elhussein Elkhazin Abdalla",
    position: "Development Planning & Peace Building Expert",
    department: "Peace Building & Conflict Resolution",
    location: "Global",
    bio: "Elhussein Elkhazin is an experienced professional with over 40 years in development planning and peace building. He has managed major World Bank-funded projects in Sudan, including the Sustainable Livelihoods for IDPs and the Sudan Peacebuilding and Development Project. He previously served as Director of the Multi-Donor Trust Funds Coordination Unit at the Ministry of Finance and held roles with the ICRC in Darfur.",
    expertise: ["Peace Building", "Project Management", "Public Finance", "Post-Conflict Recovery"],
    education: "MSc in Development Planning (University of Khartoum)",
    achievements: ["Managed $200M Sustainable Livelihoods Project", "Director of Multi-Donor Trust Funds Coordination Unit", "Coordinator for Sudan Peacebuilding & Development Project"],
    quote: "Economic empowerment of fragile communities is essential for lasting peace.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Elhussein Elkhazin Abdalla"),
    metaDescription: "Elhussein Elkhazin is a Peace Building and Development Planning Expert at PACT Consultancy, managing large-scale recovery projects.",
    contact: {
      email: "elhussein.elkhazin@pactconsultancy.com",
      linkedin: "linkedin.com/in/elhusseinelkhazin"
    }
  },
  {
    id: 30,
    name: "Kawther Hamad Awad Abusin",
    position: "Community Development & Peacebuilding Expert",
    department: "Peace Building & Conflict Resolution",
    location: "Global",
    bio: "Kawther Abusin is a Community Development and Peacebuilding Expert and Secretary to the Board of PACT Consultancy. She has extensive field operations experience with IFAD, WFP, and UNICEF projects. Kawther has conducted research and market studies across Sudan and is an accomplished trainer in gender issues and conflict resolution. She holds a Master’s Degree in Peace & Development.",
    expertise: ["Community Development", "Field Operations", "Peacebuilding", "Gender Consultancy"],
    education: "Master’s in Peace & Development (Juba University)",
    achievements: ["Field Operations Manager for WFP Third-Party Monitoring", "Conducted Ex-Post Evaluations for JICA projects", "Shareholder in PACT South Sudan"],
    quote: "Community-led development is the most effective path to social cohesion.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Kawther Hamad Awad Abusin"),
    metaDescription: "Kawther Abusin is a Community Development and Peacebuilding Expert at PACT Consultancy, with extensive field management experience.",
    contact: {
      email: "kawther.abusin@pactconsultancy.com",
      linkedin: "linkedin.com/in/kawtherabusin"
    }
  },

  // Environmental Studies & Climate Change
  {
    id: 21,
    name: "Dr. Omer Abdalla M. Egemi",
    position: "Natural Resource & Conflict Expert",
    department: "Environmental Studies & Climate Change",
    location: "Global",
    bio: "Dr. Omer Egemi is a Professor of Geography and Environmental Sciences and a consultant on natural resource management. He has served as a Team Lead for UNDP's natural resources and conflict prevention program in Sudan. Dr. Egemi specializes in land tenure, pastoralism, and resource-based conflicts. He has managed projects for the Reduction of Resource Based Conflict in Darfur and the Sobat Basin.",
    expertise: ["Political Ecology", "Natural Resource Management", "Conflict Prevention", "Land Tenure"],
    education: "PhD in Political Ecology (University of Bergen, Norway)",
    achievements: ["Team Lead for UNDP Conflict Prevention Programme", "Professor at University of Khartoum", "Managed GEF and UNDP Drylands projects"],
    quote: "Addressing the political ecology of resources is vital for environmental stability.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Dr. Omer Abdalla M. Egemi"),
    metaDescription: "Dr. Omer Egemi is a Natural Resource and Conflict Expert at PACT Consultancy, specializing in political ecology and land tenure.",
    contact: {
      email: "omer.egemi@pactconsultancy.com",
      linkedin: "linkedin.com/in/omeregemi"
    }
  },
  {
    id: 22,
    name: "Dr. Osman Mohammed Babikir",
    position: "Development Economist & Food Systems Expert",
    department: "Environmental Studies & Climate Change",
    location: "Global",
    bio: "Dr. Osman Babikir is an accomplished development expert with over 20 years of experience. He serves as Head of Social Economics, Policy & Marketing for the IGAD Centre for Pastoral Areas and Livestock Development. Dr. Osman leads regional initiatives on food security, resilience analysis, and dryland farming. He is a contributing author to UNEP reports on energy options and pastoralist livelihoods.",
    expertise: ["Development Economics", "Food Systems", "Pastoralism", "Resilience Analysis"],
    education: "PhD in Agricultural Economics (University of Khartoum/Giessen University)",
    achievements: ["Head of Social Economics at IGAD Centre", "Operations Manager for World Bank Peacebuilding Project", "Dean of Faculty of Economic Studies, University of Zalingei"],
    quote: "Resilience in drylands requires evidence-driven policy and regional integration.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Dr. Osman Mohammed Babikir"),
    metaDescription: "Dr. Osman Babikir is a Development Economist and Food Systems Expert at PACT Consultancy, leading initiatives at IGAD.",
    contact: {
      email: "osman.babikir@pactconsultancy.com",
      linkedin: "linkedin.com/in/osmanbabikir"
    }
  },

  // Renewable Energy
  {
    id: 23,
    name: "Intisar Salih",
    position: "Renewable Energy & Infrastructure Expert",
    department: "Renewable Energy",
    location: "Global",
    bio: "Intisar Salih is a development expert with deep expertise in sustainable infrastructure and natural resource management. She has a strong background in managing projects that intersect environmental sustainability and development. Intisar has served as a Monitoring and Evaluation Regional Advisor for UNDP and specializes in strategies that promote sustainable energy and resource use in development contexts.",
    expertise: ["Renewable Energy", "Sustainable Infrastructure", "Energy Policy", "Project Development"],
    education: "MSc in Natural Resource Management",
    achievements: ["Mobilized resources for sustainable development", "Managed environmental impact assessments", "Expert in results-based management"],
    quote: "Sustainable infrastructure is the bridge to a clean energy future.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Intisar Salih Renewable"),
    metaDescription: "Intisar Salih is a Renewable Energy & Sustainable Infrastructure Expert at PACT Consultancy.",
    contact: {
      email: "intisar.salih@pactconsultancy.com",
      linkedin: "linkedin.com/in/intisarsalih"
    }
  },
  {
    id: 29,
    name: "Dr. Ayman Abbas M. Z. Idris",
    position: "Business Analyst & Energy Expert",
    department: "Renewable Energy",
    location: "Global",
    bio: "Dr. Ayman Abbas is a Senior Business Analyst and Energy Expert with extensive experience in the oil and gas industry. He has held senior executive roles at 2B Operating Company and Greater Nile Petroleum Operating Company (GNPOC). Dr. Ayman specializes in operations management, maintenance planning through ERP systems, and business continuity. He managed the separation and handover of major energy companies.",
    expertise: ["Energy Operations", "Business Analysis", "ERP Systems", "Strategic Maintenance"],
    education: "DBA and MBA (University of Khartoum); BSc Mechanical Engineering",
    achievements: ["General Manager – Business at 2B Operating Company", "Senior Maintenance Manager at GNPOC", "Managed multi-million dollar energy assets"],
    quote: "Efficient energy operations require a synergy of engineering precision and business strategy.",
    image: teamMemberImage,
    slug: createTeamMemberSlug("Dr. Ayman Abbas Mohamed Zein Idris"),
    metaDescription: "Dr. Ayman Abbas is a Business Analyst and Energy Expert at PACT Consultancy, with executive leadership in the energy sector.",
    contact: {
      email: "ayman.abbas@pactconsultancy.com",
      linkedin: "linkedin.com/in/aymanabbas"
    }
  }
];

export const leadershipTeam = teamMembers.filter(
  member =>
    member.position.includes("Lead") ||
    member.position.includes("Senior") ||
    member.position.includes("Director") ||
    member.position.includes("Chairman") ||
    member.position.includes("President") ||
    member.position.includes("Head") ||
    member.position.includes("Chief") ||
    member.position.includes("Representative")
);

export const departmentTeams = {
  "Monitoring, Evaluation & Learning": teamMembers.filter(member => member.department === "Monitoring, Evaluation & Learning"),
  "Socio-economic Studies & Development": teamMembers.filter(member => member.department === "Socio-economic Studies & Development"),
  "Poverty Reduction & MSME Development": teamMembers.filter(member => member.department === "Poverty Reduction & MSME Development"),
  "Technology & Digital Transformation": teamMembers.filter(member => member.department === "Technology & Digital Transformation"),
  "Program/Project Development & Assessment": teamMembers.filter(member => member.department === "Program/Project Development & Assessment"),
  "Public Health & Nutrition": teamMembers.filter(member => member.department === "Public Health & Nutrition"),
  "Agricultural and Land Use Services": teamMembers.filter(member => member.department === "Agricultural and Land Use Services"),
  "Education & Learning": teamMembers.filter(member => member.department === "Education & Learning"),
  "Peace Building & Conflict Resolution": teamMembers.filter(member => member.department === "Peace Building & Conflict Resolution"),
  "Environmental Studies & Climate Change": teamMembers.filter(member => member.department === "Environmental Studies & Climate Change"),
  "Renewable Energy": teamMembers.filter(member => member.department === "Renewable Energy")
};

export const allDepartments = Object.keys(departmentTeams);