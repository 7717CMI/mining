'use client'

import { useState } from 'react'

interface DistributorsIntelligenceProps {
  title?: string
  height?: number
}

// Column definition
interface Column {
  key: string
  label: string
}

// Section definition
interface Section {
  name: string
  bgColor: string
  headerBg: string
  columns: Column[]
}

const SECTIONS: Section[] = [
  {
    name: 'Distributor Identification & Corporate Profile',
    bgColor: 'bg-green-100',
    headerBg: 'bg-green-50',
    columns: [
      { key: 'company_name', label: 'Company Name' },
      { key: 'headquarters_location', label: 'Headquarters Location' },
      { key: 'country_region', label: 'Country / Region' },
      { key: 'year_of_establishment', label: 'Year of Establishment' },
      { key: 'ownership_type', label: 'Ownership Type (Private / Public / Subsidiary)' },
      { key: 'website', label: 'Website' },
      { key: 'geographic_coverage', label: 'Geographic Coverage (Morocco / West Africa Countries)' },
    ],
  },
  {
    name: 'Decision-Maker Contact Details',
    bgColor: 'bg-blue-100',
    headerBg: 'bg-blue-50',
    columns: [
      { key: 'contact_name', label: 'Name' },
      { key: 'designation', label: 'Designation' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'linkedin_address', label: 'Linkedin Address' },
    ],
  },
  {
    name: 'Product & Application Alignment',
    bgColor: 'bg-yellow-100',
    headerBg: 'bg-yellow-50',
    columns: [
      { key: 'core_product_portfolio', label: 'Core Product Portfolio (Mining Chemicals)' },
      { key: 'mining_application_experience', label: 'Mining Application Experience' },
      { key: 'industries_served', label: 'Industries Served: Metal Mining, Coal Mining, Industrial Mineral, etc.)' },
    ],
  },
  {
    name: 'Channel Capability Assessment',
    bgColor: 'bg-green-100',
    headerBg: 'bg-green-50',
    columns: [
      { key: 'distribution_model', label: 'Distribution Model (Exclusive / Multi-brand / OEM representative)' },
      { key: 'importer_stockist', label: 'Importer / Stockist / Project Supplier' },
      { key: 'warehousing_capability', label: 'Warehousing Capability (Yes / No)' },
      { key: 'after_sales_capability', label: 'After-Sales / Technical Assistance Capability' },
      { key: 'value_added_services', label: 'Value-Added Services (Customization / Testing / Demo support)' },
    ],
  },
  {
    name: 'Commercial Intelligence',
    bgColor: 'bg-blue-100',
    headerBg: 'bg-blue-50',
    columns: [
      { key: 'estimated_annual_revenue', label: 'Estimated Annual Revenue (Range)' },
      { key: 'mining_sector_revenue_share', label: 'Mining Sector Revenue Share (%)' },
      { key: 'import_activity_indicators', label: 'Import Activity Indicators (if identifiable)' },
    ],
  },
  {
    name: 'Strategic Qualification & Prioritization',
    bgColor: 'bg-yellow-100',
    headerBg: 'bg-yellow-50',
    columns: [
      { key: 'distributor_strength_score', label: 'Distributor Strength Score (1-5)' },
      { key: 'product_fit_score', label: 'Product Fit Score (Technical Alignment)' },
      { key: 'geographic_fit', label: 'Geographic Fit (Target Market Match)' },
      { key: 'partnership_potential', label: 'Partnership Potential (High / Medium / Low)' },
      { key: 'suggested_engagement_strategy', label: 'Suggested Engagement Strategy: (Direct distribution partnership, Exclusive territory discussion, Technical validation discussion, Sample...)' },
    ],
  },
]

// Demo distributor data for Morocco & West Africa Mining Chemical Market
const DEMO_DATA: Record<string, string>[] = [
  {
    company_name: 'Maghreb Chemical Distribution S.A.',
    headquarters_location: 'Casablanca, Morocco',
    country_region: 'Morocco',
    year_of_establishment: '1998',
    ownership_type: 'Private',
    website: 'www.maghrebchemdist.ma',
    geographic_coverage: 'Morocco, Mauritania, Senegal',
    contact_name: 'Ahmed Benali',
    designation: 'Managing Director',
    email: 'a.benali@maghrebchemdist.ma',
    phone: '+212 522 345 678',
    linkedin_address: 'linkedin.com/in/ahmedbenali',
    core_product_portfolio: 'Flotation reagents, Flocculants, Solvent extractants',
    mining_application_experience: 'Phosphate processing, Gold extraction',
    industries_served: 'Metal Mining, Industrial Minerals',
    distribution_model: 'Multi-brand',
    importer_stockist: 'Importer & Stockist',
    warehousing_capability: 'Yes',
    after_sales_capability: 'Technical support team on-site',
    value_added_services: 'Lab testing, On-site demos',
    estimated_annual_revenue: '$5M - $10M',
    mining_sector_revenue_share: '65%',
    import_activity_indicators: 'Regular imports from EU & China',
    distributor_strength_score: '4',
    product_fit_score: 'High',
    geographic_fit: 'Strong - Morocco & Mauritania',
    partnership_potential: 'High',
    suggested_engagement_strategy: 'Direct distribution partnership',
  },
  {
    company_name: 'West Africa Mining Supplies Ltd.',
    headquarters_location: 'Accra, Ghana',
    country_region: 'Ghana',
    year_of_establishment: '2005',
    ownership_type: 'Private',
    website: 'www.waminesupplies.com.gh',
    geographic_coverage: 'Ghana, Ivory Coast, Burkina Faso',
    contact_name: 'Kwame Asante',
    designation: 'CEO',
    email: 'k.asante@waminesupplies.com.gh',
    phone: '+233 302 456 789',
    linkedin_address: 'linkedin.com/in/kwameasante',
    core_product_portfolio: 'Cyanide, Activated carbon, Lime, Flotation chemicals',
    mining_application_experience: 'Gold CIL/CIP processing, Bauxite mining',
    industries_served: 'Metal Mining, Coal Mining',
    distribution_model: 'Exclusive',
    importer_stockist: 'Importer & Project Supplier',
    warehousing_capability: 'Yes',
    after_sales_capability: 'Full technical assistance & training',
    value_added_services: 'Customization, Testing, Training programs',
    estimated_annual_revenue: '$10M - $20M',
    mining_sector_revenue_share: '80%',
    import_activity_indicators: 'High volume imports from South Africa & Australia',
    distributor_strength_score: '5',
    product_fit_score: 'Very High',
    geographic_fit: 'Strong - West Africa Gold Belt',
    partnership_potential: 'High',
    suggested_engagement_strategy: 'Exclusive territory discussion',
  },
  {
    company_name: 'Sahel Industrial Chemicals SARL',
    headquarters_location: 'Dakar, Senegal',
    country_region: 'Senegal',
    year_of_establishment: '2010',
    ownership_type: 'Private',
    website: 'www.sahelindchem.sn',
    geographic_coverage: 'Senegal, Guinea, Mali',
    contact_name: 'Mamadou Diallo',
    designation: 'Commercial Director',
    email: 'm.diallo@sahelindchem.sn',
    phone: '+221 33 867 4523',
    linkedin_address: 'linkedin.com/in/mamadoudiallo',
    core_product_portfolio: 'Grinding aids, Dust suppressants, pH regulators',
    mining_application_experience: 'Phosphate & gold processing',
    industries_served: 'Industrial Minerals, Metal Mining',
    distribution_model: 'Multi-brand',
    importer_stockist: 'Stockist',
    warehousing_capability: 'Yes',
    after_sales_capability: 'Basic technical support',
    value_added_services: 'Demo support, Blending services',
    estimated_annual_revenue: '$2M - $5M',
    mining_sector_revenue_share: '45%',
    import_activity_indicators: 'Moderate imports from Europe',
    distributor_strength_score: '3',
    product_fit_score: 'Medium',
    geographic_fit: 'Strong - Francophone West Africa',
    partnership_potential: 'Medium',
    suggested_engagement_strategy: 'Technical validation discussion',
  },
  {
    company_name: 'OCP Chemical Trading S.A.',
    headquarters_location: 'Khouribga, Morocco',
    country_region: 'Morocco',
    year_of_establishment: '1985',
    ownership_type: 'Subsidiary',
    website: 'www.ocpchemtrade.ma',
    geographic_coverage: 'Morocco',
    contact_name: 'Fatima Zahra El Amrani',
    designation: 'Procurement Director',
    email: 'f.elamrani@ocpchemtrade.ma',
    phone: '+212 523 456 789',
    linkedin_address: 'linkedin.com/in/fatimazahra-elamrani',
    core_product_portfolio: 'Phosphoric acid, Sulfuric acid, Flotation reagents',
    mining_application_experience: 'Phosphate mining & beneficiation',
    industries_served: 'Industrial Minerals',
    distribution_model: 'OEM representative',
    importer_stockist: 'Project Supplier',
    warehousing_capability: 'Yes',
    after_sales_capability: 'Full R&D and technical team',
    value_added_services: 'Customization, Lab analysis, Process optimization',
    estimated_annual_revenue: '$20M+',
    mining_sector_revenue_share: '90%',
    import_activity_indicators: 'Major importer - global sourcing',
    distributor_strength_score: '5',
    product_fit_score: 'Very High',
    geographic_fit: 'Strong - Morocco phosphate region',
    partnership_potential: 'High',
    suggested_engagement_strategy: 'Direct distribution partnership',
  },
  {
    company_name: 'Goldfields Chemical Supply Co.',
    headquarters_location: 'Kumasi, Ghana',
    country_region: 'Ghana',
    year_of_establishment: '2008',
    ownership_type: 'Private',
    website: 'www.goldfieldschem.com.gh',
    geographic_coverage: 'Ghana, Burkina Faso',
    contact_name: 'Emmanuel Osei',
    designation: 'General Manager',
    email: 'e.osei@goldfieldschem.com.gh',
    phone: '+233 322 567 890',
    linkedin_address: 'linkedin.com/in/emmanuelosei',
    core_product_portfolio: 'Sodium cyanide, Activated carbon, Caustic soda',
    mining_application_experience: 'Gold leaching, CIL processing',
    industries_served: 'Metal Mining',
    distribution_model: 'Multi-brand',
    importer_stockist: 'Importer & Stockist',
    warehousing_capability: 'Yes',
    after_sales_capability: 'On-site technical support',
    value_added_services: 'Testing, Safety training',
    estimated_annual_revenue: '$5M - $10M',
    mining_sector_revenue_share: '95%',
    import_activity_indicators: 'Regular imports from Australia & South Africa',
    distributor_strength_score: '4',
    product_fit_score: 'High',
    geographic_fit: 'Strong - Ashanti Gold Belt',
    partnership_potential: 'High',
    suggested_engagement_strategy: 'Exclusive territory discussion',
  },
  {
    company_name: 'Atlas Chimie Maroc S.A.',
    headquarters_location: 'Marrakech, Morocco',
    country_region: 'Morocco',
    year_of_establishment: '2001',
    ownership_type: 'Private',
    website: 'www.atlaschimie.ma',
    geographic_coverage: 'Morocco, Mauritania',
    contact_name: 'Youssef Tazi',
    designation: 'Sales Director',
    email: 'y.tazi@atlaschimie.ma',
    phone: '+212 524 678 901',
    linkedin_address: 'linkedin.com/in/yousseftazi',
    core_product_portfolio: 'Explosives chemicals, Dust control agents, Grinding media',
    mining_application_experience: 'Cobalt & silver mining',
    industries_served: 'Metal Mining, Industrial Minerals',
    distribution_model: 'Multi-brand',
    importer_stockist: 'Importer',
    warehousing_capability: 'Yes',
    after_sales_capability: 'Regional technical support',
    value_added_services: 'Customization, Site assessments',
    estimated_annual_revenue: '$3M - $7M',
    mining_sector_revenue_share: '55%',
    import_activity_indicators: 'Imports from Spain, France & Turkey',
    distributor_strength_score: '3',
    product_fit_score: 'Medium',
    geographic_fit: 'Strong - Central Morocco mining zone',
    partnership_potential: 'Medium',
    suggested_engagement_strategy: 'Technical validation discussion',
  },
  {
    company_name: 'Guinea Mining Solutions SARL',
    headquarters_location: 'Conakry, Guinea',
    country_region: 'Guinea',
    year_of_establishment: '2012',
    ownership_type: 'Private',
    website: 'www.guineaminingsolutions.com',
    geographic_coverage: 'Guinea, Sierra Leone',
    contact_name: 'Ibrahima Camara',
    designation: 'Director General',
    email: 'i.camara@guineaminingsolutions.com',
    phone: '+224 622 345 678',
    linkedin_address: 'linkedin.com/in/ibrahimacamara',
    core_product_portfolio: 'Flocculants, Coagulants, Flotation collectors',
    mining_application_experience: 'Bauxite processing, Iron ore',
    industries_served: 'Metal Mining',
    distribution_model: 'Exclusive',
    importer_stockist: 'Importer & Stockist',
    warehousing_capability: 'Yes',
    after_sales_capability: 'Basic field support',
    value_added_services: 'Demo support',
    estimated_annual_revenue: '$2M - $5M',
    mining_sector_revenue_share: '70%',
    import_activity_indicators: 'Imports from China & India',
    distributor_strength_score: '3',
    product_fit_score: 'High',
    geographic_fit: 'Strong - Guinea bauxite corridor',
    partnership_potential: 'High',
    suggested_engagement_strategy: 'Direct distribution partnership',
  },
  {
    company_name: 'NigerChem Industries Ltd.',
    headquarters_location: 'Lagos, Nigeria',
    country_region: 'Nigeria',
    year_of_establishment: '1995',
    ownership_type: 'Public',
    website: 'www.nigerchemindustries.com.ng',
    geographic_coverage: 'Nigeria, Niger, Benin, Togo',
    contact_name: 'Chinedu Okonkwo',
    designation: 'Head of Mining Division',
    email: 'c.okonkwo@nigerchemindustries.com.ng',
    phone: '+234 802 345 6789',
    linkedin_address: 'linkedin.com/in/chineduokonkwo',
    core_product_portfolio: 'Sulfuric acid, Xanthates, Lime, Soda ash',
    mining_application_experience: 'Tin mining, Limestone quarrying, Solid minerals',
    industries_served: 'Metal Mining, Industrial Minerals, Coal Mining',
    distribution_model: 'Multi-brand',
    importer_stockist: 'Importer & Project Supplier',
    warehousing_capability: 'Yes',
    after_sales_capability: 'Full technical team with lab',
    value_added_services: 'Customization, Lab testing, Process consulting',
    estimated_annual_revenue: '$15M - $25M',
    mining_sector_revenue_share: '40%',
    import_activity_indicators: 'Large-scale imports from India, China & EU',
    distributor_strength_score: '4',
    product_fit_score: 'High',
    geographic_fit: 'Strong - Nigeria & surrounds',
    partnership_potential: 'High',
    suggested_engagement_strategy: 'Direct distribution partnership',
  },
  {
    company_name: 'Abidjan Chemical Traders S.A.',
    headquarters_location: 'Abidjan, Ivory Coast',
    country_region: 'Ivory Coast',
    year_of_establishment: '2003',
    ownership_type: 'Private',
    website: 'www.abidjanchemtrade.ci',
    geographic_coverage: 'Ivory Coast, Ghana, Togo, Benin',
    contact_name: 'Jean-Pierre Kouassi',
    designation: 'Managing Partner',
    email: 'jp.kouassi@abidjanchemtrade.ci',
    phone: '+225 27 2234 5678',
    linkedin_address: 'linkedin.com/in/jpkouassi',
    core_product_portfolio: 'Water treatment chemicals, Mining flocculants, Acid',
    mining_application_experience: 'Gold & manganese processing',
    industries_served: 'Metal Mining, Industrial Minerals',
    distribution_model: 'Multi-brand',
    importer_stockist: 'Stockist',
    warehousing_capability: 'Yes',
    after_sales_capability: 'Technical advisory services',
    value_added_services: 'Testing, Dosage optimization',
    estimated_annual_revenue: '$3M - $8M',
    mining_sector_revenue_share: '50%',
    import_activity_indicators: 'Regular imports from France & China',
    distributor_strength_score: '3',
    product_fit_score: 'Medium',
    geographic_fit: 'Strong - Francophone West Africa',
    partnership_potential: 'Medium',
    suggested_engagement_strategy: 'Sample & trial program',
  },
  {
    company_name: 'Nouakchott Mining Supplies SARL',
    headquarters_location: 'Nouakchott, Mauritania',
    country_region: 'Mauritania',
    year_of_establishment: '2015',
    ownership_type: 'Private',
    website: 'www.nktminingsupply.mr',
    geographic_coverage: 'Mauritania',
    contact_name: 'Mohamed Ould Cheikh',
    designation: 'CEO',
    email: 'm.cheikh@nktminingsupply.mr',
    phone: '+222 45 67 89 01',
    linkedin_address: 'linkedin.com/in/mohamedouldcheikh',
    core_product_portfolio: 'Flotation reagents, Grinding chemicals, Water treatment',
    mining_application_experience: 'Iron ore processing, Gold extraction',
    industries_served: 'Metal Mining',
    distribution_model: 'Exclusive',
    importer_stockist: 'Importer',
    warehousing_capability: 'No',
    after_sales_capability: 'Limited - relies on principal support',
    value_added_services: 'Logistics coordination',
    estimated_annual_revenue: '$1M - $3M',
    mining_sector_revenue_share: '85%',
    import_activity_indicators: 'Imports from Morocco & EU',
    distributor_strength_score: '2',
    product_fit_score: 'Medium',
    geographic_fit: 'Strong - Mauritania iron ore belt',
    partnership_potential: 'Medium',
    suggested_engagement_strategy: 'Technical validation discussion',
  },
  {
    company_name: 'Ouagadougou Reagents & Chemicals',
    headquarters_location: 'Ouagadougou, Burkina Faso',
    country_region: 'Burkina Faso',
    year_of_establishment: '2011',
    ownership_type: 'Private',
    website: 'www.ouagareagents.bf',
    geographic_coverage: 'Burkina Faso, Niger',
    contact_name: 'Adama Ouedraogo',
    designation: 'Operations Director',
    email: 'a.ouedraogo@ouagareagents.bf',
    phone: '+226 25 34 56 78',
    linkedin_address: 'linkedin.com/in/adamaouedraogo',
    core_product_portfolio: 'Cyanide, Carbon, Lime, Caustic soda',
    mining_application_experience: 'Gold CIL plants, Artisanal mining support',
    industries_served: 'Metal Mining',
    distribution_model: 'Multi-brand',
    importer_stockist: 'Importer & Stockist',
    warehousing_capability: 'Yes',
    after_sales_capability: 'Field technical support',
    value_added_services: 'Safety training, Demo support',
    estimated_annual_revenue: '$2M - $4M',
    mining_sector_revenue_share: '90%',
    import_activity_indicators: 'Imports from Ghana & South Africa',
    distributor_strength_score: '3',
    product_fit_score: 'High',
    geographic_fit: 'Strong - Burkina Faso gold mines',
    partnership_potential: 'High',
    suggested_engagement_strategy: 'Direct distribution partnership',
  },
  {
    company_name: 'Tangier Chemical Logistics S.A.',
    headquarters_location: 'Tangier, Morocco',
    country_region: 'Morocco',
    year_of_establishment: '2007',
    ownership_type: 'Private',
    website: 'www.tangierchemlog.ma',
    geographic_coverage: 'Morocco, West Africa (export hub)',
    contact_name: 'Hassan El Fassi',
    designation: 'Logistics & Sales Manager',
    email: 'h.elfassi@tangierchemlog.ma',
    phone: '+212 539 234 567',
    linkedin_address: 'linkedin.com/in/hassanelfassi',
    core_product_portfolio: 'Bulk acids, Solvents, Specialty mining chemicals',
    mining_application_experience: 'Zinc & lead mining chemicals',
    industries_served: 'Metal Mining, Industrial Minerals',
    distribution_model: 'Multi-brand',
    importer_stockist: 'Importer & Stockist',
    warehousing_capability: 'Yes',
    after_sales_capability: 'Logistics & supply chain management',
    value_added_services: 'Bulk handling, Repackaging, Export facilitation',
    estimated_annual_revenue: '$8M - $15M',
    mining_sector_revenue_share: '35%',
    import_activity_indicators: 'High volume - EU & Asia imports',
    distributor_strength_score: '4',
    product_fit_score: 'Medium',
    geographic_fit: 'Strong - Gateway to West Africa',
    partnership_potential: 'High',
    suggested_engagement_strategy: 'Exclusive territory discussion',
  },
  {
    company_name: 'Lomé Industrial Chemicals S.A.',
    headquarters_location: 'Lomé, Togo',
    country_region: 'Togo',
    year_of_establishment: '2014',
    ownership_type: 'Private',
    website: 'www.lomeindchem.tg',
    geographic_coverage: 'Togo, Benin, Ghana',
    contact_name: 'Kofi Mensah',
    designation: 'Business Development Manager',
    email: 'k.mensah@lomeindchem.tg',
    phone: '+228 90 12 34 56',
    linkedin_address: 'linkedin.com/in/kofimensah',
    core_product_portfolio: 'Phosphate processing chemicals, Water treatment',
    mining_application_experience: 'Phosphate mining, Limestone quarrying',
    industries_served: 'Industrial Minerals',
    distribution_model: 'Multi-brand',
    importer_stockist: 'Stockist',
    warehousing_capability: 'Yes',
    after_sales_capability: 'Basic technical support',
    value_added_services: 'Demo support, Dosage consulting',
    estimated_annual_revenue: '$1M - $3M',
    mining_sector_revenue_share: '60%',
    import_activity_indicators: 'Imports from China & India',
    distributor_strength_score: '2',
    product_fit_score: 'Medium',
    geographic_fit: 'Moderate - Coastal West Africa',
    partnership_potential: 'Low',
    suggested_engagement_strategy: 'Sample & trial program',
  },
]

export function DistributorsIntelligence({ title, height = 600 }: DistributorsIntelligenceProps) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const distributors = DEMO_DATA

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-black">
          {title || 'Distributor Intelligence Database'}
        </h3>
      </div>

      {/* Table */}
      <div
        className="overflow-auto bg-white rounded-lg border border-gray-200"
        style={{ maxHeight: height }}
      >
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 z-20">
            {/* Section Headers Row */}
            <tr>
              {SECTIONS.map((section) => (
                <th
                  key={section.name}
                  colSpan={section.columns.length}
                  className={`border border-gray-300 text-center text-xs font-bold py-2 px-2 text-black ${section.bgColor}`}
                >
                  <span className="text-black">{section.name}</span>
                </th>
              ))}
            </tr>

            {/* Column Headers Row */}
            <tr>
              {SECTIONS.map((section) =>
                section.columns.map((col) => (
                  <th
                    key={col.key}
                    className={`border border-gray-300 px-2 py-2 text-[11px] font-bold text-black text-left align-top ${section.headerBg}`}
                    style={{ minWidth: col.key === 'suggested_engagement_strategy' ? 160 : col.key === 'company_name' ? 120 : 100 }}
                  >
                    <div className="whitespace-normal leading-tight">{col.label}</div>
                  </th>
                ))
              )}
            </tr>
          </thead>

          <tbody>
            {distributors.map((dist, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => setSelectedRow(selectedRow === rowIndex ? null : rowIndex)}
                className={`cursor-pointer transition-colors ${
                  selectedRow === rowIndex
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                {SECTIONS.map((section) =>
                  section.columns.map((col) => (
                    <td
                      key={col.key}
                      className="border border-gray-200 px-2 py-2 text-xs text-black"
                    >
                      {col.key === 'company_name' ? (
                        <span className="font-medium">{dist[col.key]}</span>
                      ) : (
                        dist[col.key]
                      )}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="mt-3 text-center text-xs text-gray-500">
        Click on any row to highlight distributor details
      </div>
    </div>
  )
}

export default DistributorsIntelligence
