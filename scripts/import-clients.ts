
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../shared/schema';
import { clientContent } from '../shared/schema';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to run the clients import script');
}

// Use the provided database URL directly (supports hosted Neon)
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: connectionString.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
});

const db = drizzle(pool, { schema });

const clientsToImport = [
    // Selected Key Clients (Images 1, 2, 3)
    {
        name: 'World Food Programme (WFP)',
        description: "The United Nations food-assistance agency and the world's largest humanitarian organization addressing hunger and promoting food security.",
        url: 'https://www.wfp.org',
        type: 'client',
        logo: ' '
    },
    {
        name: 'UNDP',
        description: 'The United Nations lead agency on international development, working in 170 countries and territories to eradicate poverty and reduce inequality.',
        url: 'https://www.undp.org',
        type: 'client',
        logo: ' '
    },
    {
        name: 'UN Women',
        description: 'United Nations Entity for Gender Equality and the Empowerment of Women.',
        url: 'https://www.unwomen.org',
        type: 'client',
        logo: ' '
    },
    {
        name: 'IFAD',
        description: 'International organization and agency of the UN whose objective is to improve agricultural development and livelihoods in developing countries.',
        url: 'https://www.ifad.org',
        type: 'client',
        logo: ' '
    },
    {
        name: 'UNICEF',
        description: 'The United Nations agency responsible for providing humanitarian and developmental aid to children worldwide in over 190 countries and territories.',
        url: 'https://www.unicef.org',
        type: 'client',
        logo: ' '
    },
    {
        name: 'World Bank Group',
        description: 'International organization dedicated to providing financing, advice, and research to developing nations to aid their economic advancement.',
        url: 'https://www.worldbank.org',
        type: 'client',
        logo: ' '
    },
    {
        name: 'IOM',
        description: 'The principal UN agency dedicated to the promotion of humane and orderly migration by providing services and advice to governments and migrants.',
        url: 'https://www.iom.org',
        type: 'client',
        logo: ' '
    },
    {
        name: 'JICA',
        description: 'The implementing agency of Japanese official development aid for supporting the socioeconomic Development of developing regions.',
        url: 'https://www.jica.jp',
        type: 'client',
        logo: ' '
    },
    {
        name: 'British Council',
        description: "The United Kingdom's international organization for cultural relations and educational opportunities.",
        url: 'https://www.britishcouncil.org',
        type: 'client',
        logo: ' '
    },
    {
        name: 'Qatar Fund for Development',
        description: 'A public development institution committed, on behalf of the State of Qatar, to implement external aid projects to achieve inclusive and sustainable development.',
        url: 'https://www.qatarfund.org.qa',
        type: 'client',
        logo: ' '
    },
    {
        name: 'The Government of Sudan',
        description: 'The Government of Sudan',
        url: null,
        type: 'client',
        logo: ' '
    },
    {
        name: 'Sudanese Microfinance Development Company (SMDC)',
        description: 'Sudanese Microfinance Development Company',
        url: null,
        type: 'client',
        logo: ' '
    },
    {
        name: 'Islamic Development Bank (IsDB)',
        description: 'A multilateral development bank, working to improve the lives of those it serves by promoting social and economic development in Member countries and Muslim communities worldwide.',
        url: 'https://www.isdb.org',
        type: 'client',
        logo: ' '
    },
    {
        name: 'UMRA',
        description: 'An autonomous government agency in Uganda with the mandate to license, regulate and supervise all Tier 4 financial institutions including SACCOs.',
        url: 'https://www.umra.go.ug',
        type: 'client',
        logo: ' '
    },
    {
        name: 'Central Bank of Sudan (CBOS)',
        description: 'Central Bank of Sudan',
        url: null,
        type: 'client',
        logo: ' '
    },
    {
        name: 'Darfur Regional Authority',
        description: 'Darfur Regional Authority.',
        url: null,
        type: 'client',
        logo: ' '
    },
    {
        name: 'Arigatou International',
        description: 'An international NGO in special consultative status with the United Nations Economic and Social Council (ECOSOC) and in consultative status with UNICEF',
        url: 'https://www.arigatouinternational.org',
        type: 'client',
        logo: ' '
    },
    {
        name: 'Agricultural Bank of Sudan (ABS)',
        description: 'Agricultural Bank of Sudan',
        url: null,
        type: 'client',
        logo: ' '
    },
    {
        name: 'Access to Finance Rwanda (AFR)',
        description: 'Access to Finance Rwanda is part of the broader Financial Sector Deepening (FSD) in Africa that seeks to create a transformative impact on the ending of poverty by supporting efforts to improve financial inclusion and financial sector development.',
        url: 'https://www.afr.rw',
        type: 'client',
        logo: ' '
    },
    {
        name: 'Sudanese Peace Development Project (SPDP)',
        description: 'Sudanese Peace Development Project',
        url: null,
        type: 'client',
        logo: ' '
    },
    {
        name: 'FECCLAHA',
        description: 'A regional ecumenical organization for providing members with avenue for sharing perspectives on matters peace and conflict transformation stirred by the endless conflicts rampant in the region',
        url: 'https://www.feclaha.org',
        type: 'client',
        logo: ' '
    },
    {
        name: 'Italian Agency for Development Cooperation (AICS)',
        description: 'The Italian Agency for Development Cooperation (AICS) is the public agency responsible for promoting international development, public aid and humanitarian emergencies.',
        url: 'https://www.aics.gov.it',
        type: 'client',
        logo: ' '
    },

    // Selected Business Partners (Images 4, 5)
    {
        name: 'FASID',
        description: 'Japanese organization that works to promote a peaceful and prosperous international society through human resource development and dissemination of information and experience.',
        url: 'https://www.fasid.or.jp',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'Frankfurt School of Finance & Management',
        description: 'One of Europe’s leading business schools delivering German excellence in management and finance education.',
        url: 'https://www.frankfurt-school.de',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'AFC (Agriculture & Finance Consultants)',
        description: 'A private German consulting firm focusing on agricultural, agribusiness and financial development projects in developing and transition countries.',
        url: 'https://www.afci.de',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'KRC (Koei Research & Consulting Inc.)',
        description: 'A leading research and consulting company that provides high-quality, creative consulting services designed to meet the socio-economic challenges faced by developing countries and the world at large.',
        url: 'https://www.k-rc.co.jp',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'MUFG',
        description: 'The think tank arm of Mitsubishi UFJ Financial Group that provides corporate management consulting, strategic support for global businesses, policy research and consulting.',
        url: 'https://www.mufg.jp',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'GOPA Consulting Group',
        description: 'A leading consulting group dedicated to performing and effectively contributing to international cooperation and global development, with more than 1000 projects worldwide in over 130 countries.',
        url: 'https://www.gopa-group.org',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'Geneva Global',
        description: 'A Mission-Driven Company that Helps Foundations, Organizations, and Individuals Achieve Positive Social Change Through Effective Philanthropy and Consulting.',
        url: 'https://www.genevaglobal.com',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'Techurate',
        description: 'Global technology company that offers software, applications, quality assurance, testing, and channel banking solutions for banks and financial institutions.',
        url: 'https://www.techurate.com',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'PEC (Telecom Solutions)',
        description: 'A global telecommunications company that specializes in providing telecom Systems for TDM & VoIP phone companies, entrepreneurs, corporate offices, and many more.',
        url: 'https://www.voicesaver.com',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'ITQAN',
        description: 'A financial technology solutions company with origins in Sudan, having spun out of PACT Consultancy in 2009.',
        url: 'https://www.pactorg.com',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'Linpico',
        description: 'Established in 1991, Linpico is a multidisciplinary consultancy working worldwide in the field of International Development.',
        url: 'https://www.linpico.com',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'Sybyl',
        description: 'Global technology company with 30 years of experience, offering unique capabilities and solutions in the domain of Enterprise IT systems.',
        url: 'https://www.sybyl.com',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'MobiPay',
        description: 'Africa-based company that offers a technology cloud-based model, an innovation designed to create farmer’s visibility and linkages of small-scale farmers to other value chain players.',
        url: 'https://www.mobipayagrosys.com',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'AECOM',
        description: 'An American multinational infrastructure consulting firm that designs, builds, operates, and finances various infrastructure projects for businesses, governments, and organizations worldwide.',
        url: 'https://www.aecom.com',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'Craft Silicon',
        description: 'A Kenyan software house that provides software solutions for core Banking, Micro Finance, switching and electronic payments.',
        url: 'https://www.craftsilicon.com',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'FingTech',
        description: 'FingTech is a Sudan-based next-generation global technology company that helps enterprises reimagine their businesses for the digital age.',
        url: 'https://www.fingtech.sd',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'EY (Ernest & Young)',
        description: 'Ernest & Young is a global leader in assurance, consulting, strategy and transactions, and tax services.',
        url: 'https://www.ey.com',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'LATTANZIO KIBS',
        description: 'Italian consulting boutique for the public sector operating on the global market.',
        url: 'https://www.lattanziokibs.com',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'Regional Research Centre for Integrated Development (RCID)',
        description: 'Regional Research Centre for Integrated Development (RCID) is a Rwanda based research, consultancy and project management firm.',
        url: 'https://rcidcentre.com/',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'Khotawat',
        description: 'Khotawat is an IT and Management Consulting firm registered with the Organizing Council for Consultancy Firms (OCCF) – Sudan to provide consultancy services to private and public organizations.',
        url: 'https://www.khotawat.com',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'ARPU TECH',
        description: 'ARPU Tech is a Telecom Value Added Servies (VAS) and IT solutions provider headquartered in Khartoum – Sudan.',
        url: 'http://arpusoft.com/',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'Partners in Development Services (PDS)',
        description: 'A renowned regional think tank with registered and operational offices in Khartoum, Addis Ababa, Juba, Kigali and Kampala.',
        url: 'https://www.pdszoom.com',
        type: 'partner',
        logo: ' '
    },
    {
        name: 'Botho Emerging Markets Group',
        description: 'Botho Emerging Markets Group is a leading advisor and consultant to investors, companies, governments and nonprofits navigating the world’s fastest-growing markets.',
        url: 'https://www.bothogroup.com',
        type: 'partner',
        logo: ' '
    }
];

async function importClients() {
    try {
        console.log('Starting clients and partners import...');

        // Test connection
        try {
            await pool.query('SELECT NOW()');
            console.log('Database connection successful');
        } catch (err) {
            console.error('Failed to connect to database. Ensure DATABASE_URL is correct and reachable.');
            throw err;
        }

        for (const client of clientsToImport) {
            // Check if client already exists (by name)
            const existing = await db.query.clientContent.findFirst({
                where: (table, { eq }) => eq(table.name, client.name)
            });

            if (existing) {
                console.log(`Client/Partner "${client.name}" already exists, updating...`);
                await db.update(clientContent)
                    .set({
                        description: client.description,
                        url: client.url,
                        type: client.type,
                        logo: client.logo,
                        updated_at: new Date()
                    })
                    .where(eq(clientContent.id, existing.id));
            } else {
                console.log(`Creating new ${client.type}: "${client.name}"`);
                await db.insert(clientContent).values({
                    name: client.name,
                    description: client.description,
                    url: client.url,
                    type: client.type,
                    logo: client.logo,
                    order_index: 0
                });
            }
        }

        console.log('Clients and partners import completed successfully!');
        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('Error during clients import:', error);
        await pool.end();
        process.exit(1);
    }
}

importClients();
