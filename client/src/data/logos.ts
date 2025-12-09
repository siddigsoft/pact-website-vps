import { ClientLogo } from '@/types';

// Import all logo assets
import undpLogo from '@assets/United_Nations_Development_Program.png';
import worldBankLogo from '@assets/World_Bank_Group.png';
import wfpLogo from '@assets/World_Food_Progran.jpg';
import ifadLogo from '@assets/International_Fund_for_Agricultural_Development.png';
import unhcrLogo from '@assets/UN_High_Commission_for_Refugees.png';
import unwomenLogo from '@assets/UN_WOMEN.png';
import iomLogo from '@assets/International_Organization_for_Migration.png';
import jicaLogo from '@assets/Japan_Agency_For_International_Development.png';
import britishCouncilLogo from '@assets/British_Council.png';
import sudanCentralBankLogo from '@assets/Central_Bank_of_Sudan.png';

// Partner logo assets
import frankfurtSchoolLogo from '@assets/Frankfurt_School_of_Finance_&_Management.jpg';
import bothoLogo from '@assets/botho-logo.png';
import craftSiliconLogo from '@assets/Craft-Silicon-high-res-copy.webp';
import genevaGlobalLogo from '@assets/Geneva-Global.png';
import pdsLogo from '@assets/partners-in-development-services.jpg';
import afcLogo from '@assets/AFC Consultants International.png';
import fasidLogo from '@assets/Foundation for Advanced Studies on International Development (FASID).png';

// Client logos with official imagery
export const clientLogos: ClientLogo[] = [
  {
    id: 'undp',
    name: 'United Nations Development Programme (UNDP)',
    logo: undpLogo
  },
  {
    id: 'worldbank',
    name: 'The World Bank (WB)',
    logo: worldBankLogo
  },
  {
    id: 'wfp',
    name: 'World Food Program (WFP)',
    logo: wfpLogo
  },
  {
    id: 'ifad',
    name: 'International Fund for Agricultural Development (IFAD)',
    logo: ifadLogo
  },
  {
    id: 'unhcr',
    name: 'UN High Commission for Refugees (UNHCR)',
    logo: unhcrLogo
  },
  {
    id: 'unwomen',
    name: 'UN Women',
    logo: unwomenLogo
  },
  {
    id: 'iom',
    name: 'International Organization for Migration (IOM)',
    logo: iomLogo
  },
  {
    id: 'jica',
    name: 'Japan Agency for International Development (JICA)',
    logo: jicaLogo
  },
  {
    id: 'britishcouncil',
    name: 'British Council',
    logo: britishCouncilLogo
  },
  {
    id: 'sudan-central-bank',
    name: 'Central Bank of Sudan',
    logo: sudanCentralBankLogo
  },
  {
    id: 'microfinance',
    name: 'Microfinance Institutions',
    logo: ''
  },
  {
    id: 'spdp',
    name: 'Sudan Peace Development Project (SPDP)',
    logo: ''
  }
];

// Partner organization logos 
export const partnerLogos: ClientLogo[] = [
  {
    id: 'national-universities',
    name: 'National Universities, Research & Strategic Planning Centers, Sudan',
    logo: ''
  },
  {
    id: 'afc-consultants',
    name: 'AFC Consultants International, Germany',
    logo: afcLogo
  },
  {
    id: 'frankfurt-school',
    name: 'Frankfurt School of Finance & Management, Germany',
    logo: frankfurtSchoolLogo
  },
  {
    id: 'botho-limited',
    name: 'BOTHO Limited, Nairobi, Kenya and UAE',
    logo: bothoLogo
  },
  {
    id: 'craft-silicon',
    name: 'Craft Silicon, Nairobi, Kenya',
    logo: craftSiliconLogo
  },
  {
    id: 'geneva-global',
    name: 'Geneva Global, USA',
    logo: genevaGlobalLogo
  },
  {
    id: 'pds',
    name: 'Partners in Development Services (PDS), Sudan',
    logo: pdsLogo
  },
  {
    id: 'koei-research',
    name: 'Koei Research & Consulting Inc., Tokyo, Japan',
    logo: ''
  },
  {
    id: 'fasid',
    name: 'Foundation for Advanced Studies on International Development (FASID), Tokyo, Japan',
    logo: fasidLogo
  }
];

export default { clientLogos, partnerLogos };