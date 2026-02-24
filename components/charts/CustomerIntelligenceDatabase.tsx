'use client'

import { useState } from 'react'

interface CustomerIntelligenceDatabaseProps {
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
    name: 'Company Information',
    bgColor: 'bg-green-100',
    headerBg: 'bg-green-50',
    columns: [
      { key: 'company_name', label: 'Company Name' },
      { key: 'year_established', label: 'Year Established' },
      { key: 'headquarters', label: 'Headquarters' },
      { key: 'no_of_employees', label: 'No. of Employees (est.) (if available)' },
      { key: 'revenue_turnover', label: 'Revenue / Turnover (if available)' },
    ],
  },
  {
    name: 'Contact Details',
    bgColor: 'bg-blue-100',
    headerBg: 'bg-blue-50',
    columns: [
      { key: 'key_contact_person', label: 'Key Contact Person' },
      { key: 'designation_role', label: 'Designation / Role' },
      { key: 'email_address', label: 'Email Address (verified / generic)' },
      { key: 'phone_whatsapp', label: 'Phone / WhatsApp Number' },
      { key: 'linkedin_profile', label: 'LinkedIn Profile' },
      { key: 'website_url', label: 'Website URL' },
    ],
  },
  {
    name: 'Product Required',
    bgColor: 'bg-blue-100',
    headerBg: 'bg-blue-50',
    columns: [
      { key: 'chemical_category_required', label: 'Chemical Category Required' },
      { key: 'estimated_annual_consumption', label: 'Estimated Annual Consumption (Tons/Year)' },
      { key: 'purchase_frequency', label: 'Purchase Frequency (Seasonal, Monthly, Quarterly)' },
    ],
  },
  {
    name: 'Customer Capacity & Operations',
    bgColor: 'bg-yellow-100',
    headerBg: 'bg-yellow-50',
    columns: [
      { key: 'sales_channel_type', label: 'Sales Channel Type (Distributors, Wholesaler, Trader)' },
      { key: 'region_specific_operation', label: 'Region-specific Operation' },
    ],
  },
  {
    name: 'Customer Engagement Level',
    bgColor: 'bg-green-100',
    headerBg: 'bg-green-50',
    columns: [
      { key: 'engagement_with_suppliers', label: 'Engagement With Suppliers (Low, Medium, High)' },
      { key: 'preferred_contact_method', label: 'Preferred Contact Method (Phone, E Mail, B2B, Others)' },
      { key: 'response_speed', label: 'Response Speed (for procurement)' },
    ],
  },
]

// Demo customer data for Morocco & West Africa Mining Chemical Market
const DEMO_DATA: Record<string, string>[] = [
  {
    company_name: 'OCP Group S.A.',
    year_established: '1920',
    headquarters: 'Casablanca, Morocco',
    no_of_employees: '21,000+',
    revenue_turnover: '$9.4B (2023)',
    key_contact_person: 'Karim Benchekroun',
    designation_role: 'VP - Chemical Procurement',
    email_address: 'k.benchekroun@ocpgroup.ma',
    phone_whatsapp: '+212 522 232 025',
    linkedin_profile: 'linkedin.com/in/karimbenchekroun',
    website_url: 'www.ocpgroup.ma',
    chemical_category_required: 'Flotation reagents, Sulfuric acid, Phosphoric acid',
    estimated_annual_consumption: '150,000+',
    purchase_frequency: 'Monthly',
    sales_channel_type: 'Distributor & Direct',
    region_specific_operation: 'Morocco (Khouribga, Jorf Lasfar, Benguerir)',
    engagement_with_suppliers: 'High',
    preferred_contact_method: 'E Mail, B2B Portal',
    response_speed: 'Fast (1-3 days)',
  },
  {
    company_name: 'Managem Group',
    year_established: '1928',
    headquarters: 'Casablanca, Morocco',
    no_of_employees: '6,500',
    revenue_turnover: '$850M (2023)',
    key_contact_person: 'Nadia El Idrissi',
    designation_role: 'Procurement Manager - Mining Chemicals',
    email_address: 'n.elidrissi@managemgroup.com',
    phone_whatsapp: '+212 522 924 624',
    linkedin_profile: 'linkedin.com/in/nadiaelidrissi',
    website_url: 'www.managemgroup.com',
    chemical_category_required: 'Cyanide, Xanthates, Collectors, Grinding aids',
    estimated_annual_consumption: '25,000',
    purchase_frequency: 'Monthly',
    sales_channel_type: 'Direct & Distributor',
    region_specific_operation: 'Morocco (Draa-Tafilalet, Souss-Massa), Gabon, Sudan',
    engagement_with_suppliers: 'High',
    preferred_contact_method: 'E Mail, Phone',
    response_speed: 'Fast (1-3 days)',
  },
  {
    company_name: 'Newmont Ghana Gold Ltd.',
    year_established: '2006',
    headquarters: 'Accra, Ghana',
    no_of_employees: '5,200',
    revenue_turnover: '$2.1B (Ghana ops)',
    key_contact_person: 'Daniel Appiah',
    designation_role: 'Supply Chain Director',
    email_address: 'd.appiah@newmont.com',
    phone_whatsapp: '+233 302 743 252',
    linkedin_profile: 'linkedin.com/in/danielappiah-newmont',
    website_url: 'www.newmont.com',
    chemical_category_required: 'Sodium cyanide, Activated carbon, Caustic soda, Lime',
    estimated_annual_consumption: '35,000',
    purchase_frequency: 'Monthly',
    sales_channel_type: 'Direct',
    region_specific_operation: 'Ghana (Ahafo, Akyem mines)',
    engagement_with_suppliers: 'High',
    preferred_contact_method: 'B2B, E Mail',
    response_speed: 'Fast (1-2 days)',
  },
  {
    company_name: 'Compagnie des Bauxites de Guinée (CBG)',
    year_established: '1963',
    headquarters: 'Conakry, Guinea',
    no_of_employees: '3,000',
    revenue_turnover: '$600M (est.)',
    key_contact_person: 'Souleymane Barry',
    designation_role: 'Head of Procurement',
    email_address: 's.barry@cbg-guinee.com',
    phone_whatsapp: '+224 622 456 789',
    linkedin_profile: 'linkedin.com/in/souleymanebarry',
    website_url: 'www.cbg-guinee.com',
    chemical_category_required: 'Flocculants, Coagulants, Dust suppressants',
    estimated_annual_consumption: '8,000',
    purchase_frequency: 'Quarterly',
    sales_channel_type: 'Distributor',
    region_specific_operation: 'Guinea (Boké region)',
    engagement_with_suppliers: 'Medium',
    preferred_contact_method: 'Phone, E Mail',
    response_speed: 'Moderate (3-7 days)',
  },
  {
    company_name: 'SNIM (Société Nationale Industrielle et Minière)',
    year_established: '1974',
    headquarters: 'Nouadhibou, Mauritania',
    no_of_employees: '6,800',
    revenue_turnover: '$1.2B (est.)',
    key_contact_person: 'Abdoulaye Ould Ahmed',
    designation_role: 'Chemical Procurement Manager',
    email_address: 'a.ahmed@snim.com',
    phone_whatsapp: '+222 45 74 51 10',
    linkedin_profile: 'linkedin.com/in/abdoulayeouldahmed',
    website_url: 'www.snim.com',
    chemical_category_required: 'Flotation chemicals, Flocculants, Water treatment chemicals',
    estimated_annual_consumption: '12,000',
    purchase_frequency: 'Monthly',
    sales_channel_type: 'Direct & Distributor',
    region_specific_operation: 'Mauritania (Zouerate, Fdérik iron ore mines)',
    engagement_with_suppliers: 'High',
    preferred_contact_method: 'E Mail, Phone',
    response_speed: 'Fast (2-4 days)',
  },
  {
    company_name: 'Endeavour Mining - Ity Gold Mine',
    year_established: '2010',
    headquarters: 'Abidjan, Ivory Coast',
    no_of_employees: '1,800',
    revenue_turnover: '$480M (Ity ops)',
    key_contact_person: 'Marc Konan',
    designation_role: 'Site Procurement Lead',
    email_address: 'm.konan@endeavourmining.com',
    phone_whatsapp: '+225 27 2045 6789',
    linkedin_profile: 'linkedin.com/in/marckonan',
    website_url: 'www.endeavourmining.com',
    chemical_category_required: 'Cyanide, Activated carbon, Lime, Flocculants',
    estimated_annual_consumption: '18,000',
    purchase_frequency: 'Monthly',
    sales_channel_type: 'Direct',
    region_specific_operation: 'Ivory Coast (Ity CIL Mine, Birimian belt)',
    engagement_with_suppliers: 'High',
    preferred_contact_method: 'B2B, E Mail',
    response_speed: 'Fast (1-3 days)',
  },
  {
    company_name: 'IAMGOLD Essakane S.A.',
    year_established: '2008',
    headquarters: 'Ouagadougou, Burkina Faso',
    no_of_employees: '2,500',
    revenue_turnover: '$520M (est.)',
    key_contact_person: 'Adama Sawadogo',
    designation_role: 'Warehouse & Chemical Procurement',
    email_address: 'a.sawadogo@iamgold.com',
    phone_whatsapp: '+226 25 30 88 90',
    linkedin_profile: 'linkedin.com/in/adamasawadogo',
    website_url: 'www.iamgold.com',
    chemical_category_required: 'Sodium cyanide, Carbon, Lime, pH regulators',
    estimated_annual_consumption: '15,000',
    purchase_frequency: 'Monthly',
    sales_channel_type: 'Distributor',
    region_specific_operation: 'Burkina Faso (Essakane mine, Sahel region)',
    engagement_with_suppliers: 'Medium',
    preferred_contact_method: 'Phone, E Mail',
    response_speed: 'Moderate (3-5 days)',
  },
  {
    company_name: 'Dangote Cement - Mining Division',
    year_established: '1981',
    headquarters: 'Lagos, Nigeria',
    no_of_employees: '30,000+',
    revenue_turnover: '$4.3B (group)',
    key_contact_person: 'Olumide Adeyemi',
    designation_role: 'Mining Operations Procurement Lead',
    email_address: 'o.adeyemi@dangotecement.com',
    phone_whatsapp: '+234 803 456 7890',
    linkedin_profile: 'linkedin.com/in/olumideadeyemi',
    website_url: 'www.dangotecement.com',
    chemical_category_required: 'Grinding aids, Explosives chemicals, Dust control',
    estimated_annual_consumption: '20,000',
    purchase_frequency: 'Monthly',
    sales_channel_type: 'Wholesaler & Direct',
    region_specific_operation: 'Nigeria (Obajana, Ibese), Senegal, Ghana, Togo',
    engagement_with_suppliers: 'High',
    preferred_contact_method: 'B2B, E Mail',
    response_speed: 'Fast (1-3 days)',
  },
  {
    company_name: 'Société des Mines de Fer de Guinée (SMFG)',
    year_established: '2003',
    headquarters: 'Conakry, Guinea',
    no_of_employees: '800',
    revenue_turnover: '$120M (est.)',
    key_contact_person: 'Thierno Diallo',
    designation_role: 'Chemical & Reagent Buyer',
    email_address: 't.diallo@smfg.com.gn',
    phone_whatsapp: '+224 628 123 456',
    linkedin_profile: 'linkedin.com/in/thiernodiallo',
    website_url: 'www.smfg.com.gn',
    chemical_category_required: 'Flocculants, Coagulants, Corrosion inhibitors',
    estimated_annual_consumption: '4,000',
    purchase_frequency: 'Quarterly',
    sales_channel_type: 'Distributor',
    region_specific_operation: 'Guinea (Nimba mountains, iron ore)',
    engagement_with_suppliers: 'Low',
    preferred_contact_method: 'Phone, E Mail',
    response_speed: 'Slow (7-14 days)',
  },
  {
    company_name: 'Grande Côte Operations (GCO) - Eramet',
    year_established: '2014',
    headquarters: 'Diogo, Senegal',
    no_of_employees: '1,200',
    revenue_turnover: '$350M (est.)',
    key_contact_person: 'Ousmane Ndiaye',
    designation_role: 'Plant Chemical Procurement',
    email_address: 'o.ndiaye@eramet-gco.sn',
    phone_whatsapp: '+221 33 859 7200',
    linkedin_profile: 'linkedin.com/in/ousmanendiaye',
    website_url: 'www.eramet.com',
    chemical_category_required: 'Flotation collectors, Frothers, Water treatment',
    estimated_annual_consumption: '6,500',
    purchase_frequency: 'Quarterly',
    sales_channel_type: 'Direct & Distributor',
    region_specific_operation: 'Senegal (Grande Côte mineral sands)',
    engagement_with_suppliers: 'Medium',
    preferred_contact_method: 'E Mail, B2B',
    response_speed: 'Moderate (3-5 days)',
  },
]

export default function CustomerIntelligenceDatabase({ title, height = 600 }: CustomerIntelligenceDatabaseProps) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const customers = DEMO_DATA

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-black">
          {title || 'Customer Intelligence Database'}
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
                    style={{ minWidth: col.key === 'company_name' ? 120 : 100 }}
                  >
                    <div className="whitespace-normal leading-tight">{col.label}</div>
                  </th>
                ))
              )}
            </tr>
          </thead>

          <tbody>
            {customers.map((cust, rowIndex) => (
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
                        <span className="font-medium">{cust[col.key]}</span>
                      ) : (
                        cust[col.key]
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
        Click on any row to highlight customer details
      </div>
    </div>
  )
}
