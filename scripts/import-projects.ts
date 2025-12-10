
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../shared/schema';
import { projectContent, ProjectStatus } from '../shared/schema';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to run the projects import script');
}

// Use the provided database URL directly (supports hosted Neon)
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: connectionString.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
});

const db = drizzle(pool, { schema });

const projectsToImport = [
    // Poverty Reduction & MSME Development
    {
        title: 'Technical Support to the Greater Darfur Microfinance Apex and Provision of Support in the Implementation of the Business Plan to the Apex and Partner State MFI in 5 Darfur States',
        organization: 'United Nations Development Programme (UNDP)',
        duration: 'September 2018 – December 2020',
        location: 'Five Darfur States and Khartoum, Sudan',
        category: 'Poverty Reduction & MSME Development',
        description: `**Description of Project**

Following the December 2017 establishment of the Microfinance Apex in Darfur (Darfur Elkubra Microfinance Development Company, DEMDC), the UNDP commissioned a microfinance project in September 2018 involving the automation of the Apex’s operations as well as the provision of support to the institution in implementing its business plan. The overall purpose of the project was to create and enhance the microfinance system in Darfur to create income-generation opportunities for poor conflict-affected population in Darfur including women, especially widows and de facto Female/headed households and small producers through access to financing as well as training and skills enhancement. In this project, PACT was contracted to provide consultancy services.

The overarching objective of the assignment/ project was to provide technical support and guidance for the implementation of Darfur Apex business plan including, deployment of technological solutions for microfinance with mobile applications, as well as provision of tailored mentoring services to the newly established Greater Darfur Microfinance Co. (GDMC) and the state-owned Microfinance Institutions (MFI).

**Description of Services**

Technical Assistance to the Darfur Elkubra Microfinance Development Company (Darfur MF Apex) in Business Plan Development & Implementation involving the following:
* Assessment of the impact of adopted policies on the efficiency and effectiveness of the service providers;
* Assisting in the correct setup of Apex structure and operations;
* Providing Capacity Building for DEMDC Staff & Microfinance Partners;
* Assisting the Apex in creating an enabling environment for microfinance in Darfur targeting vulnerable populations, including women.
* Technical Assistance in the Development of Network of Agents.
* Assisting in Fund-Raising for the Apex;
* Acquisition & Implementation of Core Microfinance System with Mobile Commerce Channels;
* Provision of Tailored Mentoring Services to Darfur Microfinance Apex and Partner Micro-financing institutions (MFIs)`
    },
    {
        title: 'Attractive, Peaceful and Conducive Environment for Livelihoods for Farmers, Pastoralists, IDP and Refugees in South Kordofan State',
        organization: 'South Kordofan State',
        duration: 'July – August 2016',
        location: 'South Kordofan State, Sudan',
        category: 'Poverty Reduction & MSME Development',
        description: `**Description of Project**

The project was designed and implemented in the backdrop of the unprecedented influx of refugees and migrants from Africa and the Middle East to the EU, with hundreds of thousands arriving on Europe’s shores, risking their lives to escape from violent conflict, Persecution and poverty in search of a better future. There are several concerns that led Europe to try to find ways and means to address the issue of irregular migration.

**Description of Services**

PACT conducted field surveys in the targeted areas and gathered relevant information, as well as:
* Consulted with local communities to identify their requirements and preferences.
* The collected data were analyzed, and strategies were formulated, through which specific projects were recommended and feasibility studies were prepared.`
    },
    {
        title: 'Training in Value Chain Analysis & Designing Integrated Projects, and Small & Medium Enterprise (SME) Finance',
        organization: 'Joint Project with Sudan Microfinance Development Company (SMDC)',
        duration: '31 March – 5 April 2014',
        location: 'Debra Zeit, Ethiopia',
        category: 'Poverty Reduction & MSME Development',
        description: `**Description of Project**

The project’s objective was to train bankers, MFIs executives, and organizations to select and analyze products’ value chain and to design and implement integrated projects covering the product development from pre-production to delivery in its customized form to the end-user. Also, the training covered international best practices on pre-qualifying potential SME borrowers, financial and non-financial analysis of the borrower’s business plan and analyzing financial provider’s risks.

**Description of Services**

* Developed a tailored 6-day training curriculum.
* Delivered training sessions in Debra Zeit, Ethiopia.
* Supported trainees in identifying future capacity-building needs.`
    },

    // Capacity Building, Mentoring & Training
    {
        title: 'Youth and Women Training of Trainers on Peace Building, FoRB, Human Rights, Advocacy, Gender Mainstreaming, Human Rights',
        organization: 'The Fellowship of Christian Councils and Churches in the Great Lakes and Horn of Africa (FECCLAHA)',
        duration: 'November – December 2020',
        location: 'Khartoum, Sudan',
        category: 'Capacity Building, Mentoring & Training',
        description: `**Description of Project**

Provision of professional services for Training on Peace Building, FoRB, Human Rights, Advocacy, Gender Mainstreaming, Human Rights

**Description of Services**

PACT provided Youth and Women Training of Trainers on Peace Building, FoRB, Human Rights, Advocacy, Gender Mainstreaming, Human Right.

PACT also provided facilitation services for Intra-Faith Dialogue, Advocacy Training and Entrepreneurship Workshops for selected youth from across Sudan.`
    },
    {
        title: 'Capacity development of Tier 4 Microfinance Institutions (MFIs) In Uganda',
        organization: 'Uganda Micro Finance Regulatory Authority (UMRA)',
        duration: '2019',
        location: 'Uganda',
        category: 'Capacity Building, Mentoring & Training',
        description: `**Description of Project**

The initiative supported UMRA in strengthening the operational and institutional capacities of Tier 4 Microfinance Institutions (MFIs) across Uganda. This tier includes community-based financial institutions such as Savings and Credit Cooperative Organizations (SACCOs), Village Savings and Loan Associations (VSLAs), and other informal providers critical to advancing financial inclusion in underserved areas.

**Description of Services**

Capacity development for Tier 4 Microfinance Providers in Uganda, which entailed a comprehensive needs assessment, design and delivery of training programs and provision of strategic recommendations to UMRA.`
    },
    {
        title: 'Access to Financial Services Strategy - Mediators Training',
        organization: 'UNDP - Darfur Early Recovery and Livelihoods Programme',
        duration: 'December 2013 – February 2014',
        location: 'Five States of Darfur, Sudan',
        category: 'Capacity Building, Mentoring & Training',
        description: `**Description of Project**

The United Nations Development Programme (UNDP) commissioned PACT to conduct training of mediators in Darfur (Civil societies, NGOs, unions and associations, etc.) to fill the gap between financial services providers and potential clients, thereby increasing the outreach capacity of banks/MFIs to clients, reducing the high transaction costs of reaching poor rural areas, and increasing access to credit for poor rural communities for business expansion.

**Description of Services**

* Designed training curricula;
* Interviewed and prequalified trainees;
* Delivered the training in all five states of Darfur;
* Tested trainees and recommended future capacity building;
* Nominated to financial institutions selected trainees to become agents for financial institutions and/or business development services providers.`
    },

    // Monitoring, Evaluation & Learning
    {
        title: 'Third Party Monitoring of World Food Programme (WFP) Activities across 18 States in Sudan',
        organization: 'World Food Programme (WFP)',
        duration: 'Nov. 2023 to date',
        location: '18 Sudan states, Sudan',
        category: 'Monitoring, Evaluation & Learning',
        description: `**Description of Project**

Provision of independent verification of programme implementation in terms of the delivery and quality of supplies to end-users, quality of services and assessing end user’s satisfaction of WFP supported programmes. Provision of timely information for monitoring of the situation of children and women and identification of any emerging issues of WFP concern in the intervention areas.

**Description of Services**

PACT is deploying 80 field supervisors, coordinators and enumerators for data collection, monitoring and evaluation across 600 sites in 18 states. A team of experts manages and supervises the project‘s technical and logistical operations. Data are collected electronically using mobile devices, transmitted to PACT’s server and entered in a specially designed database. PACT’s responsibilities include:
* Monitoring activities and verification of project implementation on behalf of WFP;
* Both on-site distribution and outcome monitoring are carried out.
* Key experts analyze data and alert WFP instantly of critical issues, as well as, submit to WFP weekly, monthly and annual reports.`
    },
    {
        title: 'Baseline Study, Midline Survey and Endline Assessment of Mother and Child Cash Transfer (MCCT) Programme in Kassala & Red Sea States',
        organization: 'United Nations Children’s Fund (UNICEF)',
        duration: 'June 2021 - April 2024',
        location: 'Kassala and Red Sea States, Sudan',
        category: 'Monitoring, Evaluation & Learning',
        description: `**Description of Project**

UNICEF Sudan was supporting the Ministry of Labor and Social Development (MoLSD) to design and implement a government-led cash transfer programme (Mother and Child Cash Transfer – MCCT) supporting the first 1,000 days of life, in Kassala and Red Sea States, as well as possible areas affected by the ongoing economic crisis.

This programme aimed to build the foundation for government-led implementation of a flagship social protection programme based on life-course approach, with the eventual aim of national scale-up. The key objective of the MCCT was to provide additional purchasing power to pregnant women and lactating mothers to address unmet needs relating to nutrition, health and others.

**Description of Services**

UNICEF commissioned a robust baseline, midline and endline assessment to be undertaken by PACT to help inform the effectiveness of the MCCT programme in achieving planned outcomes. Assignment involved collection of data among over 3,400 pregnant and lactating mothers (treatment and control groups).`
    },
    {
        title: 'Third-Party Monitoring of UNICEF Programmes in 14 States in Sudan',
        organization: 'UNICEF Sudan Country Office',
        duration: '2020 – March 2022',
        location: '14 Sudan States, Sudan',
        category: 'Monitoring, Evaluation & Learning',
        description: `**Description of Project**

The project involves independent verification of programme implementation in terms of the delivery and quality of supplies to end-users, quality of services and assessing end user’s satisfaction of UNICEF supported programmes. The support also provides timely information for monitoring of the situation of children and women and identification of any emerging issues of UNICEF concern in the intervention areas.

**Description of Services**

The project involved deployment of 18 field coordinators and monitors for data collection, monitoring and evaluation. Project technical and logistical operations and overall backstopping is provided by a team of expert managers. Data collection is electronic using mobile devices, transmitted to PACT’s virtual private server for analysis and reporting to UNICEF. PACT responsibilities include:

* Monitoring activities and verification of project implementation on behalf of UNICEF.
* Both on-site programmes and outcome monitoring are carried out.
* Key experts analyze data and alert UNICEF of critical issues (red flags), as well as, submit to UNICEF monthly, quarterly, bi-annual and final reports.`
    },
    {
        title: 'Sustainable Livelihoods for Displaced and Vulnerable Communities – SLDPII – Final Evaluation',
        organization: 'The World Bank/ Government of Sudan',
        duration: 'February – March 2020',
        location: 'Kassala State, Eastern Sudan, Sudan',
        category: 'Monitoring, Evaluation & Learning',
        description: `**Description of Project**

The project involved the final evaluation of the Sustainable Livelihoods for Displaced and Vulnerable Communities in Eastern Sudan - Phase II (SLDPII)

**Description of Services**

The assignment involved the following:
* Review of results from previous evaluations (including of SLDP) in 10 pre-selected locations with IDPs and host communities in Kassala State.
* Conducting assessment interviews with the project and the World Bank staff.
* Review of existing project documents.
* Quantitative survey of a representative sample of project beneficiaries for specific indicators.
* Focus group discussions with target communities.
* Interview of key informants.
* Drafting the final assessment report.
* Presenting draft findings in a validation workshop, updating the draft report with validation workshop comments and submitting the final report with specific recommendations.`
    },
    {
        title: 'Evaluation of country programs funded by Qatar Fund for Development (QFFD)',
        organization: 'Geneva Global, USA (Assignment funded by QFFD)',
        duration: 'February – June 2019',
        location: 'River Nile, Gezira, plus 5 Darfur States, Sudan',
        category: 'Monitoring, Evaluation & Learning',
        description: `**Description of Project**

Evaluation of QFFD program, which included five main projects: Early recovery programme with the United Nations Development Programme (UNDP); Five Villages in Darfur; Providing potable water project with Qatar Charity; improving maternal and child health in Sudan through the implementation of the Sudan Public Health Training Initiative (SPHTI) – implemented by the Carter Center; and 220kV River Nile State Transmission Project.

**Description of Services**

* Prepared project plan and logistics;
* Visited, interviewed and collected information from various implementing agencies (including 11 UN agencies);
* Recruited, trained and dispatched field survey teams;
* Collected data and conducted interviews and focus group discussions;
* Documented success stories and prepared project reports.`
    },

    // Program Design/ Development & Implementation
    {
        title: 'Development of a 5-Year Business Plan with M&E Framework for the Sudanese Microfinance Development Company (SMDC)',
        organization: 'Sudanese Microfinance Development Company (SMDC)',
        duration: 'July 2021 – April 2022',
        location: 'Sudan',
        category: 'Program Design/ Development & Implementation',
        description: `**Description of Project**

The project involved the development of a 5-year Business Plan with a Monitoring and Evaluation Framework as a critical roadmap and strategic tool to guide the development of SMDC for the period of 2021-2025. The development of a comprehensive Business Plan for SMDC was part of the necessary institutional capacity enhancement for it to effectively spearhead the entrenchment and ongoing development of microfinance as a key mechanism for economic empowerment of the economically active poor, poverty reduction and sustainable development.

**Description of Services**

PACT delivered a comprehensive Business Plan covering all key elements including microfinance sector analysis, customer segmentation, business development, operational plans and financial projection.`
    },
    {
        title: 'Technical Assistance for AlBaraah Microfinance, Rashad, South Kordofan',
        organization: 'SMDF - a JV between the Central Bank of Sudan and the World Bank',
        duration: 'Aug.2010 - Aug.2011',
        location: 'South Kordofan State, Sudan',
        category: 'Program Design/ Development & Implementation',
        description: `**Description of Project**

The purpose of the consultancy was to formulate and implement operational and marketing strategies, establish effective operational procedures, develop operational manuals and provide the necessary training to the staff and clients.

**Description of Services**

* Reviewed AlBaraah business plan and operations procedures;
* Ensured compliance with regulatory requirements;
* Prepared operations manuals;
* Established an internal audit unit;
* Staff capacity building & training etc;
* Ensured the smooth operation of the organization.`
    },
    {
        title: 'Implementation of business plan for the establishment of North Kordofan Microfinance Bank (Gudaim)',
        organization: 'State Government of North Kordofan & Gudaim Steering Committee',
        duration: 'Jan.2009 - Aug.2009',
        location: 'North Kordofan, Sudan',
        category: 'Program Design/ Development & Implementation',
        description: `**Description of Project**

The objectives of the assignment included: To implement the business plan prepared by PACT; and to develop new business models and tools for Gudaim, including utilization of advanced management information and electronic (mobile) payment systems.

**Description of Services**

* Preparing and executing an implementation plan with detailed work schedule;
* Registering the business;
* Recruiting shareholders and investors;
* Public offering of organization;
* Preparing and implementing a promotion plan`
    },

    // Strategy & Business Development
    {
        title: 'Business Plan and Operation Manuals for Darfur Microfinance Apex Organization to boost income-generation opportunities for poor conflict-affected population in Darfur',
        organization: 'Darfur Regional Authority (DRA)',
        duration: 'Oct. 2013 – Jan.2014 (Business Plan updated in 2019)',
        location: 'Sudan',
        category: 'Strategy & Business Development',
        description: `**Description of Project**

One of commitments of the 2011 Doha Document for Peace in Darfur (DDPD), was the establishment of a Microfinance system in Darfur in order to provide the required funding for income generating activities to individuals and groups with non-traditional collaterals. This was meant to boost income-generation opportunities for poor conflict-affected population in Darfur such as IDPs, returnees, and women especially widows and de facto Female/headed households and small producers through access to financing as well as training and skills enhancement. In line with the commitment of the DDPD on the microfinance system in Darfur and the stipulations of Darfur Development Strategy (DDS), the UNDP commissioned the development of a Business Plan by PACT in 2013 for the establishment of Greater Darfur Microfinance Company as an Apex institution. The establishment of a microfinance system in Darfur as called for by the DDPD agreement and further presented in the Business Plan was found justified and essential for many reasons.

The objective of the assignment was to prepare a business plan and five operations manuals for establishing a microfinance apex organization to support the microfinance sector in Darfur states. The outlined results of the project included:
* Detailed business plan with financial projections developed.
* Implementation plan and a monitoring & evaluation framework prepared.
* Five Operations Manuals Prepared.
* Framework for the establishment of Darfur Microfinance Apex defined.

**Description of Services**

* Comprehensive literature reviews;
* Prepared data collection tools and sampling;
* Conducted a market survey, covering 5 Darfur states;
* Interviewed stakeholders and preparing a microfinance analysis report;
* Conducting focus group discussions in the five states of Darfur and reported findings;
* Designed a database and analyzing collected data;
* Prepared a report;
* Formulated strategies and making recommendations;
* Prepared an implementation plan and monitoring & evaluation framework.`
    },
    {
        title: 'Technical Assistance for Reforming the Agricultural Bank of Sudan (ABS) (Microfinance)',
        organization: 'Central Bank of Sudan, Microfinance Unit',
        duration: 'Sept 2011 – March 2012',
        location: 'Khartoum and 8 Northern States, Sudan',
        category: 'Strategy & Business Development',
        description: `**Description of Project**

The objectives of the assignment were to Conduct a comprehensive assessment of the current status of the bank and its surrounding environment; to Identify for the bank’s stakeholders the different strategic options; and to Prepare a business plan for the bank.

**Description of Services**

* Reviewed ABS past performance and interview its stakeholders to assess ABS current capacities to offer microfinance;
* Studied ABS’s potential market in northern states of Sudan to understand the supply and demand sides for microfinance;
* Formulated strategies for ABS with respect to suitable legal structure, products/services, operations, marketing & sales, etc;
* Developed a Business Plan for ABS based on the formulated strategies. The business plan includes new mission, vision, objectives, strategies, management structure, staff and their capacity building, sales and financial projections, etc.
* Developed Policy & Procedures manuals;
* Developed Monitoring & Evaluation system.`
    },
    {
        title: 'Turnaround strategies for the Sudan Rural Development Company (SRDC). Ltd.',
        organization: 'SMDF (Joint Venture of the World Bank and Central Bank of Sudan)',
        duration: 'February 2010 – May 2010',
        location: 'Khartoum, Gezira, Sennar & White Nile States, Sudan',
        category: 'Strategy & Business Development',
        description: `**Description of Project**

This assignment focused on assessing the Sudan Rural Development Company (SRDC) and developing turnaround strategies anchored in a comprehensive business plan. The objective was to revitalize the company's operational and financial performance, improve service delivery, and build internal systems aligned with market needs.

**Description of Services**

* Reviewed SRDC’s historical performance and conducted interviews with key stakeholders.
* Carried out market surveys to evaluate microfinance demand and supply dynamics.
* Developed a strategic business plan for SRDC.
* Designed operational manuals and a monitoring & evaluation framework.`
    }
];

async function importProjects() {
    try {
        console.log('Starting projects import...');

        // Test connection
        try {
            await pool.query('SELECT NOW()');
            console.log('Database connection successful');
        } catch (err) {
            console.error('Failed to connect to database. Ensure DATABASE_URL is correct and reachable.');
            throw err;
        }

        for (const project of projectsToImport) {
            // Check if project already exists (by title)
            const existing = await db.query.projectContent.findFirst({
                where: (table, { eq }) => eq(table.title, project.title)
            });

            if (existing) {
                console.log(`Project "${project.title}" already exists, updating...`);
                await db.update(projectContent)
                    .set({
                        description: project.description,
                        organization: project.organization,
                        duration: project.duration,
                        location: project.location,
                        category: project.category,
                        status: ProjectStatus.COMPLETED,
                        updated_at: new Date()
                    })
                    .where(eq(projectContent.id, existing.id));
            } else {
                console.log(`Creating new project: "${project.title}"`);
                await db.insert(projectContent).values({
                    title: project.title,
                    description: project.description,
                    organization: project.organization,
                    duration: project.duration,
                    location: project.location,
                    category: project.category,
                    status: ProjectStatus.COMPLETED,
                    order_index: 0
                });
            }
        }

        console.log('Projects import completed successfully!');
        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('Error during projects import:', error);
        await pool.end();
        process.exit(1);
    }
}

importProjects();
