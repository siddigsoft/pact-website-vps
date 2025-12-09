
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../shared/schema';
import { serviceContent, type InsertServiceContent } from '../shared/schema';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Create a database connection specifically for this migration script
const connectionString = process.env.DATABASE_URL
    ? process.env.DATABASE_URL.replace('@postgres:', '@localhost:')
    : 'postgres://postgres:postgres@localhost:5432/pactconsultancy';

const pool = new Pool({
    connectionString
});

const db = drizzle(pool, { schema });

const servicesToImport = [
    {
        title: 'Poverty Reduction & MSME Development',
        description: 'PACT works with governments, private sector institutions and development agencies to reduce poverty and achieve sustainable development that leads to positive transformation in people’s lives.\n\nOur specific consulting arrangements towards poverty reduction include:',
        details: [
            'Financial Inclusion through microfinance support. PACT has developed business plans and provided implementation support for over half of the operational Microfinance and Apex Institutions in Sudan.',
            'Economic Empowerment (design of projects, organization of communities, support of project implementation, assistance with fund raising and opening markets);',
            'Integrated rural development that targets social and economic empowerment of the poor;',
            'Microenterprises and small businesses development through engagement in value-chain projects and provision of business development support services.'
        ],
        image: ''
    },
    {
        title: 'Capacity Building, Mentoring & Training',
        description: 'PACT helps organizations enhance the capacity of their people, business processes and operational systems to achieve operational efficiency and peak performance. Our capacity building, mentoring and training expertise in delivered through customized solutions covering the following:',
        details: [
            'Youths’ skill-building, employment, and engagement in economic development;',
            'Women empowerment and gender equality;',
            'On-the-job training and tailored mentoring;',
            'Human resource capacity assessment and enhancement on key competencies;',
            'Performance management, talent retention, and organizational growth.'
        ],
        image: ''
    },
    {
        title: 'Monitoring, Evaluation & Learning',
        description: 'PACT has a formidable history and reputation of designing and implementing responsive technical and support services through large, complex, multi-year (LTA) and multi-sector Monitoring, Evaluation and Learning contracts. In our MEL contracts, PACT has successfully designed M&E and learning systems for governments, international agencies and corporations to facilitate learning and success for projects, programmes and policy interventions.\n\nPACTs MEL solutions include:',
        details: [
            'Third-Party Monitoring (TPM) Servies of Programmes and Projects;',
            'Design and/or review of Performance Monitoring Plans;',
            'Technical advice to Implementing/ Cooperating Partners (IPs/ CPs);',
            'Conducting of baseline surveys;',
            'Carrying out programme assessments;',
            'Methodological design and implementation of performance;',
            'Conducting impact evaluations.'
        ],
        image: ''
    },
    {
        title: 'Program Design/ Development & Implementation',
        description: 'PACT has extensive experience in designing, developing and supporting the implementation of multi-sector development programs. PACT has successfully supported governments, international agencies, and development partners to transform ideas into fundable concepts and guide programs through inception, delivery, and scale-up.\n\nOur consulting in this area includes:',
        details: [
            'Program initiation and design, including problem analysis, stakeholder mapping, and results-based frameworks;',
            'Concept and proposal development to align with donor priorities and secure sustainable funding;',
            'Tailored mentoring and coaching to implementing teams for effective on-the-ground delivery;',
            'Hands-on support in systems deployment, such as the implementation of Core Microfinance Systems (CMS) in fragile and conflict-affected settings;',
            'Capacity building for program teams and local partners to ensure sustained impact;',
            'Development of monitoring tools, and adaptive learning frameworks for continuous performance improvement throughout the implementation phase.'
        ],
        image: ''
    },
    {
        title: 'Strategy & Business Development',
        description: 'From facilitating Strategic Planning to development of Business Plans, PACT provides technical support that enables businesses to achieve alignment to core purpose and attainment of development goals. From Small and Medium Enterprises (SMEs) to large business entities, our provision of Strategy & Business Development expertise is premised on rigorous understanding of every client’s institutional context, sector dynamics, macroeconomic environment, markets, trends and emerging best practices, both locally and globally.\n\nPACTs Strategy and Business Development consultancy covers the following areas:',
        details: [
            'Strategy and Business Plan Development;',
            'Tailored Mentoring and Business Plan Implementation;',
            'Project Planning and Development;',
            'Organizational Assessment and Strategic Alignment;',
            'Organizational Restructuring.'
        ],
        image: ''
    },
    {
        title: 'Macro-economic & Social Studies',
        description: 'Our work is founded on the primacy of evidence generation on important issues as well as rigorous understanding of every institutional context, sector dynamics, and macroeconomic environment. On this premise, PACT provides macroeconomic and social studies and analysis to develop and implement innovative and workable solutions to complex problems and varied contexts.\n\nCore delivery areas include:',
        details: [
            'Sector interventions in sustainable development;',
            'Macro-economic analysis, economic growth and investment policies;',
            'Policy assessment, advisory and advocacy;',
            'Urban and regional planning and infrastructure development;',
            'Participatory research, field surveys and data analysis & interpretation.'
        ],
        image: ''
    },
    {
        title: 'Technology Consulting',
        description: 'Financial technology is critical in driving financial inclusion and ensuring socio-economic transformation and empowerment of communities. Based on a team of resident and associate financial technology experts and partnership with national and global fintechs, PACT has supported the successful implementation of financial technology solutions through the following consulting solutions:',
        details: [
            'Design and management of projects for Core Microfinance Systems;',
            'Design and management of projects for e-commerce platforms;',
            'Integrations of third-party platforms to national payments infrastructure;',
            'Advisory services and insights to financial institutions on IT infrastructures and technologies for financial inclusion/ sector deepening;',
            'Delivering other areas of technical expertise to assist organizations leverage technology to reinvent, automate, deliver, transform, impact and succeed.'
        ],
        image: ''
    },
    {
        title: 'Health and Social Development',
        description: 'PACT is committed to community health and social development through technical support, research and planning, project design and development, monitoring and evaluation and capacity strengthening among clients working in health and social development sectors.\n\nOur Health and Social Development consulting solutions include:',
        details: [
            'Assessment and evaluation of health and nutrition interventions;',
            'Support to cash transfer and social protection schemes, such as the Assessment of the Mother and Child Cash Transfer (MCCT) Programme in Kassala and Red Sea States on behalf of UNICEF;',
            'Capacity building of frontline health and social development practitioners;',
            'Development of monitoring and accountability frameworks to strengthen service delivery;',
            'Integration of gender, equity, and inclusion in program design and delivery.'
        ],
        image: ''
    },
    {
        title: 'Agricultural Services',
        description: 'Over 3 billion people live in poverty globally, and the majority are dependent on agriculture. Human development is fundamentally dependent on agriculture, both as a source of food and also for jobs and markets. Through a partnership with consulting firms like the Agriculture & Finance Consultants GmbH (AFC), PACT seeks to deliver a whole range of consulting services in agriculture from primary production to processing and marketing.\n\nPACT’s established consulting focus in this area includes the following:',
        details: [
            'Conducting value chain studies in key agricultural sub-sectors including crops (sorghum, pearl millet, groundnuts and sesame), dairy, hides and skins, fisheries, stabilized earth bricks, livestock, gum arabic and services provided by skilled workers.',
            'Building entrepreneurship in agribusiness through agri-preneural skills to enable the youth become owners of profitable agribusinesses along priority agricultural value chains;',
            'Stakeholder engagements along priority value chains to strengthen innovative agribusiness enterprises;',
            'Encouraging a new generation of entrepreneurs to enter, grow, and advance the agribusiness sector and address the challenge of youth unemployment;',
            'Creating/ supporting partnership with financial institutions to finance targeted agricultural value chains and youth agripreneurs;',
            'Advisory and technical support on agriculture development and food security; Farm-based e-commerce solutions.'
        ],
        image: ''
    },
    {
        title: 'Education & Capacity Development',
        description: 'Education & Capacity Development constitute core and critical pivot points for the development of societies and nations. Based on established expertise and depth of understanding of global trends and standards as well as local requirements, PACT offers the following range of consulting services in Education and Capacity Development:',
        details: [
            'Capacity development for educators (Teacher Training Programme - TTP);',
            'Learning management system/ platform for automated, collaborative seamless delivery of education;',
            'Conducting deep-dive education programme assessments;',
            'Curriculum development;',
            'Utilization of digital school management systems to enhance parent-teacher engagements;',
            'Human Resource Development through customized training arrangements'
        ],
        image: ''
    },
    {
        title: 'Peacebuilding & Conflict Resolution',
        description: 'Our peacebuilding & conflict resolution consulting efforts are premised on the shared belief that there can be no sustainable development without peace and no peace without sustainable development. PACT provides peacebuilding and conflict resolution advisory and monitoring support services, focusing on fragile and conflict environments. PACT’s involvement with peace-building & conflict resolution dates back to 2007 when its founders participated in the peace negotiations and co-authored the Joint Assessment Mission (JAM) Reports in Sudan.\n\nPACT’s established consulting focus in this area includes the following:',
        details: [
            'Design and facilitation of peacebuilding and mediation processes at local, national, and regional levels;',
            'Conflict sensitivity analysis and risk mitigation planning;',
            'Community-based reconciliation and trust-building initiatives;',
            'Design and implementation of post-conflict recovery plans;',
            'Technical advisory services for governments and international partners on peace and governance frameworks;',
            'Monitoring and learning frameworks for peace and conflict resolution initiatives.'
        ],
        image: ''
    },
    {
        title: 'Data Acquisition & Knowledge Management',
        description: 'PACT has extensive experience in data collection, statistical analysis and the delivery of insightful reports. In fact, PACT has conducted over 50 studies involving comprehensive data collection, rigorous analysis, and tailored reporting across diverse sectors. As a result, PACT has built a robust repository of reports and datasets that can be mined to inform research and development projects.\n\nFor projects we implement, PACT provides advanced data analytics, data visualizations and interactive dashboards that enable real-time situational analysis, performance tracking, and evidence-based decision-making. Core delivery areas include:',
        details: [
            'Use of digital tools for real-time data collection and management;',
            'Advanced statistical analysis, machine learning, and predictive modeling;',
            'Development of customized dashboards, interactive visualizations, and GIS mapping tools;',
            'Technical assistance in setting up Monitoring, Evaluation, Accountability and Learning (MEAL) systems;',
            'Support in translating data into policy and programmatic insights for decision-makers.'
        ],
        image: ''
    }
];

async function importServices() {
    try {
        console.log('Starting services import...');

        // Test connection
        try {
            await pool.query('SELECT NOW()');
            console.log('Database connection successful');
        } catch (err) {
            console.error('Failed to connect to database. Make sure your database is running and accessible at localhost:5432');
            throw err;
        }

        // Optional: Clear existing services?
        // For now, let's just insert. If we want to avoid duplicates, we should check titles.

        for (const service of servicesToImport) {
            // Check if service already exists (by title)
            const existing = await db.query.serviceContent.findFirst({
                where: (table, { eq }) => eq(table.title, service.title)
            });

            if (existing) {
                console.log(`Service "${service.title}" already exists, updating...`);
                await db.update(serviceContent)
                    .set({
                        description: service.description,
                        details: service.details,
                        image: service.image,
                        updated_at: new Date()
                    })
                    .where(eq(serviceContent.id, existing.id));
            } else {
                console.log(`Creating new service: "${service.title}"`);
                await db.insert(serviceContent).values({
                    title: service.title,
                    description: service.description,
                    details: service.details,
                    image: service.image,
                    order_index: 0
                });
            }
        }

        console.log('Services import completed successfully!');
        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('Error during services import:', error);
        await pool.end();
        process.exit(1);
    }
}

importServices();
