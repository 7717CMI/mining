/**
 * Customer Intelligence Data Generator
 * Generates realistic customer data for End User segments across regions
 */

export interface Customer {
  id: string
  name: string
  region: string
  endUserSegment: string
  type: 'mining' | 'water_treatment' | 'chemicals' | 'energy' | 'fertilizers' | 'manufacturing'
}

export interface CustomerIntelligenceData {
  region: string
  endUserSegment: string
  customerCount: number
  customers: Customer[]
}

// Realistic customer name generators by type
const miningNames = [
  'Gold Fields Mining', 'AngloGold Ashanti', 'Newmont Mining', 'Barrick Gold',
  'Tarkwa Mine Operations', 'Obuasi Gold Mine', 'Kinross Mining', 'Randgold Resources',
  'Ahafo Mine Complex', 'Bibiani Gold Mine'
]

const waterTreatmentNames = [
  'Municipal Water Authority', 'AquaPure Treatment', 'WaterGen Solutions', 'HydroTreat Systems',
  'CleanWater Utilities', 'PureFlow Treatment', 'Regional Water Corp', 'AquaSafe Operations'
]

const chemicalsNames = [
  'ChemProcess Industries', 'PetroChemical Corp', 'Industrial Chemicals Ltd', 'ProcessChem Solutions',
  'Chemical Manufacturing Group', 'Specialty Chemicals Inc', 'Bulk Chemicals Corp', 'ChemWorks Processing'
]

const energyNames = [
  'PowerGen Utilities', 'Regional Energy Corp', 'Thermal Power Station', 'Energy Solutions Group',
  'National Power Authority', 'Grid Energy Systems', 'Power Plant Operations', 'Utility Energy Corp'
]

const fertilizerNames = [
  'Phosphate Mining Corp', 'FertilizerWorks Ltd', 'AgroChemical Industries', 'Phosphate Valley Mining',
  'NutrientChem Corp', 'Fertilizer Processing Group', 'PhosAgro Operations', 'AgroMineral Industries'
]

const manufacturingNames = [
  'General Manufacturing Corp', 'Industrial Works Ltd', 'Multi-Industry Group', 'Factory Operations Inc',
  'Manufacturing Solutions', 'Industrial Processing Corp', 'Plant Operations Group', 'Production Systems Ltd'
]

const locationSuffixes = [
  'North', 'South', 'East', 'West', 'Central', 'Metro', 'Downtown', 'Uptown',
  'Riverside', 'Parkview', 'Hillside', 'Valley', 'Coastal', 'Mountain'
]

// Region-specific prefixes
const regionPrefixes: Record<string, string[]> = {
  'Morocco': ['Moroccan', 'Royal', 'National', 'Casablanca', 'Marrakech'],
  'West Africa': ['West African', 'Regional', 'National', 'Continental', 'Coastal']
}

function generateCustomerName(region: string, endUserSegment: string, index: number): string {
  const prefixes = regionPrefixes[region] || ['Regional', 'National']
  const prefix = prefixes[index % prefixes.length]
  const location = locationSuffixes[index % locationSuffixes.length]

  let baseName = ''
  if (endUserSegment === 'Mining & Mineral Processing') {
    baseName = miningNames[index % miningNames.length]
  } else if (endUserSegment === 'Water & Wastewater Treatment') {
    baseName = waterTreatmentNames[index % waterTreatmentNames.length]
  } else if (endUserSegment === 'Chemicals & Process Industries') {
    baseName = chemicalsNames[index % chemicalsNames.length]
  } else if (endUserSegment === 'Energy & Utilities') {
    baseName = energyNames[index % energyNames.length]
  } else if (endUserSegment === 'Fertilizers / Phosphate Value Chain') {
    baseName = fertilizerNames[index % fertilizerNames.length]
  } else {
    baseName = manufacturingNames[index % manufacturingNames.length]
  }

  return `${prefix} ${baseName} ${location}`
}

/**
 * Generate realistic customer counts based on region and end user segment
 * Mining is dominant in Africa, Water Treatment is widespread
 */
// Deterministic seed function for consistent data generation
function seededRandom(seed: number): () => number {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

function generateCustomerCount(region: string, endUserSegment: string): number {
  // Base multipliers by region (reflecting market size)
  const regionMultipliers: Record<string, number> = {
    'Morocco': 1.0,
    'West Africa': 1.3
  }

  // Base multipliers by end user type
  const segmentMultipliers: Record<string, number> = {
    'Mining & Mineral Processing': 1.5,
    'Water & Wastewater Treatment': 1.3,
    'Chemicals & Process Industries': 1.0,
    'Energy & Utilities': 0.8,
    'Fertilizers / Phosphate Value Chain': 0.6,
    'General Manufacturing (multi-industry)': 0.7
  }

  // Base count range
  const baseMin = 50
  const baseMax = 300

  const regionMulti = regionMultipliers[region] || 1.0
  const segmentMulti = segmentMultipliers[endUserSegment] || 1.0

  // Calculate realistic range
  const min = Math.floor(baseMin * regionMulti * segmentMulti)
  const max = Math.floor(baseMax * regionMulti * segmentMulti)

  // Create deterministic seed based on region and segment
  const seed = (region.charCodeAt(0) * 1000 + endUserSegment.charCodeAt(0) * 100) % 10000
  const random = seededRandom(seed)

  // Generate consistent count
  const count = Math.floor(random() * (max - min + 1)) + min

  return Math.max(10, count) // Minimum 10 customers
}

/**
 * Generate all customer intelligence data
 */
export function generateCustomerIntelligenceData(): CustomerIntelligenceData[] {
  const regions = [
    'Morocco',
    'West Africa'
  ]

  const endUserSegments = [
    'Mining & Mineral Processing',
    'Water & Wastewater Treatment',
    'Chemicals & Process Industries',
    'Energy & Utilities',
    'Fertilizers / Phosphate Value Chain',
    'General Manufacturing (multi-industry)'
  ]

  const data: CustomerIntelligenceData[] = []

  regions.forEach(region => {
    endUserSegments.forEach(endUserSegment => {
      const customerCount = generateCustomerCount(region, endUserSegment)
      const customers: Customer[] = []

      // Generate customer names (deterministic based on region, segment, and index)
      for (let i = 0; i < customerCount; i++) {
        customers.push({
          id: `${region}-${endUserSegment}-${i}`,
          name: generateCustomerName(region, endUserSegment, i),
          region,
          endUserSegment,
          type: endUserSegment === 'Mining & Mineral Processing' ? 'mining'
                : endUserSegment === 'Water & Wastewater Treatment' ? 'water_treatment'
                : endUserSegment === 'Chemicals & Process Industries' ? 'chemicals'
                : endUserSegment === 'Energy & Utilities' ? 'energy'
                : endUserSegment === 'Fertilizers / Phosphate Value Chain' ? 'fertilizers'
                : 'manufacturing'
        })
      }

      data.push({
        region,
        endUserSegment,
        customerCount,
        customers
      })
    })
  })

  return data
}

/**
 * Get customers for a specific region and end user segment
 */
export function getCustomersForCell(
  data: CustomerIntelligenceData[],
  region: string,
  endUserSegment: string
): Customer[] {
  const cell = data.find(
    d => d.region === region && d.endUserSegment === endUserSegment
  )
  return cell?.customers || []
}

/**
 * Get customer count for a specific region and end user segment
 */
export function getCustomerCountForCell(
  data: CustomerIntelligenceData[],
  region: string,
  endUserSegment: string
): number {
  const cell = data.find(
    d => d.region === region && d.endUserSegment === endUserSegment
  )
  return cell?.customerCount || 0
}

/**
 * Parse customer intelligence data from Excel rows
 * Extracts customer information and groups by region and end user segment
 */
export function parseCustomerIntelligenceFromData(rows: Record<string, any>[]): CustomerIntelligenceData[] {
  // Map to store customers by region and end user segment
  const customerMap = new Map<string, Customer[]>()

  // Common column name variations
  const getColumnValue = (row: Record<string, any>, possibleNames: string[]): string | null => {
    for (const name of possibleNames) {
      // Try exact match
      if (row[name] !== undefined && row[name] !== null && row[name] !== '') {
        const value = String(row[name]).trim()
        if (value && value !== 'xx' && value.toLowerCase() !== 'n/a') {
          return value
        }
      }
      // Try case-insensitive match
      const lowerName = name.toLowerCase().trim()
      for (const key in row) {
        if (key && key.toLowerCase().trim() === lowerName && row[key] !== undefined && row[key] !== null && row[key] !== '') {
          const value = String(row[key]).trim()
          if (value && value !== 'xx' && value.toLowerCase() !== 'n/a') {
            return value
          }
        }
      }
      // Try partial match (contains)
      for (const key in row) {
        if (key && key.toLowerCase().includes(lowerName) && row[key] !== undefined && row[key] !== null && row[key] !== '') {
          const value = String(row[key]).trim()
          if (value && value !== 'xx' && value.toLowerCase() !== 'n/a') {
            return value
          }
        }
      }
    }
    return null
  }

  // Log first row structure for debugging
  if (rows.length > 0) {
    console.log('Parser - First row keys:', Object.keys(rows[0]))
    console.log('Parser - First row sample:', rows[0])
  }

  let processedCount = 0
  let skippedCount = 0

  // Process each row
  rows.forEach((row, index) => {
    // Try to extract customer name/company (most important field)
    let customerName = getColumnValue(row, [
      'Company Name', 'Company', 'Customer Name', 'Customer',
      'End User Name', 'Client Name', 'Organization Name',
      'Name', 'Organization', 'Institution', 'End User', 'Client'
    ])

    // If no customer name found with standard names, try to find any field that looks like a name
    if (!customerName) {
      // Look for the first non-empty field that doesn't look like metadata
      for (const key in row) {
        // Skip metadata fields
        if (key.startsWith('_') ||
            key.toLowerCase().includes('sheet') ||
            key.toLowerCase().includes('index') ||
            key.toLowerCase().includes('row')) {
          continue
        }

        const value = row[key]
        if (value && typeof value === 'string') {
          const trimmed = value.trim()
          // If it's a reasonable length and not a placeholder, use it as name
          if (trimmed &&
              trimmed.length > 2 &&
              trimmed.length < 200 &&
              trimmed !== 'xx' &&
              trimmed.toLowerCase() !== 'n/a' &&
              !trimmed.match(/^\d+$/) && // Not just numbers
              !trimmed.toLowerCase().includes('region') &&
              !trimmed.toLowerCase().includes('segment') &&
              !trimmed.toLowerCase().includes('type')) {
            customerName = trimmed
            break
          }
        }
      }
    }

    // Skip rows without customer name
    if (!customerName) {
      skippedCount++
      if (skippedCount <= 3) {
        console.log(`Parser - Skipping row ${index + 1}: No customer name found. Available keys:`, Object.keys(row))
      }
      return
    }

    processedCount++

    // Try to extract region
    const region = getColumnValue(row, [
      'Region', 'Geography', 'Geographic Region', 'Market Region',
      'Country', 'Location', 'Territory', 'Market', 'Area'
    ])

    // Try to extract end user segment/type
    const endUserSegment = getColumnValue(row, [
      'End User Type', 'End User Segment', 'Industry Category',
      'Industry Type', 'Segment', 'Customer Type', 'End User Category',
      'Industry', 'Category', 'Type', 'Segment Type'
    ])

    // Normalize region - try to match common region names
    let normalizedRegion = region || null
    if (region) {
      const lowerRegion = region.toLowerCase()
      if (lowerRegion.includes('morocco') || lowerRegion.includes('maroc')) {
        normalizedRegion = 'Morocco'
      } else if (lowerRegion.includes('west africa') || lowerRegion.includes('guinea') || lowerRegion.includes('ghana') || lowerRegion.includes('nigeria') || lowerRegion.includes('senegal') || lowerRegion.includes('benin') || lowerRegion.includes('ivory coast') || lowerRegion.includes('côte d\'ivoire') || lowerRegion.includes('mauritania') || lowerRegion.includes('niger') || lowerRegion.includes('togo') || lowerRegion.includes('burkina faso')) {
        normalizedRegion = 'West Africa'
      } else {
        normalizedRegion = region
      }
    }

    // If still no region, try to find it in other columns or use "Unknown"
    if (!normalizedRegion) {
      for (const key in row) {
        if (key.startsWith('_')) continue
        const value = String(row[key] || '').toLowerCase()
        if (value.includes('morocco') || value.includes('maroc')) {
          normalizedRegion = 'Morocco'
          break
        } else if (value.includes('west africa') || value.includes('guinea') || value.includes('ghana') || value.includes('nigeria') || value.includes('senegal')) {
          normalizedRegion = 'West Africa'
          break
        }
      }
      if (!normalizedRegion) {
        normalizedRegion = 'Unknown'
      }
    }

    // Normalize end user segment
    let normalizedSegment = endUserSegment || null
    if (endUserSegment) {
      const lowerSegment = endUserSegment.toLowerCase()
      if (lowerSegment.includes('mining') || lowerSegment.includes('mineral')) {
        normalizedSegment = 'Mining & Mineral Processing'
      } else if (lowerSegment.includes('water') || lowerSegment.includes('wastewater')) {
        normalizedSegment = 'Water & Wastewater Treatment'
      } else if (lowerSegment.includes('chemical') || lowerSegment.includes('process industr')) {
        normalizedSegment = 'Chemicals & Process Industries'
      } else if (lowerSegment.includes('energy') || lowerSegment.includes('utilit')) {
        normalizedSegment = 'Energy & Utilities'
      } else if (lowerSegment.includes('fertiliz') || lowerSegment.includes('phosphate')) {
        normalizedSegment = 'Fertilizers / Phosphate Value Chain'
      } else if (lowerSegment.includes('manufactur')) {
        normalizedSegment = 'General Manufacturing (multi-industry)'
      } else {
        normalizedSegment = endUserSegment
      }
    }

    // If still no segment, try to find it in other columns or use "Unknown"
    if (!normalizedSegment) {
      for (const key in row) {
        if (key.startsWith('_')) continue
        const value = String(row[key] || '').toLowerCase()
        if (value.includes('mining') || value.includes('mineral')) {
          normalizedSegment = 'Mining & Mineral Processing'
          break
        } else if (value.includes('water') || value.includes('wastewater')) {
          normalizedSegment = 'Water & Wastewater Treatment'
          break
        } else if (value.includes('chemical') || value.includes('process industr')) {
          normalizedSegment = 'Chemicals & Process Industries'
          break
        } else if (value.includes('energy') || value.includes('utilit')) {
          normalizedSegment = 'Energy & Utilities'
          break
        } else if (value.includes('fertiliz') || value.includes('phosphate')) {
          normalizedSegment = 'Fertilizers / Phosphate Value Chain'
          break
        } else if (value.includes('manufactur')) {
          normalizedSegment = 'General Manufacturing (multi-industry)'
          break
        }
      }
      if (!normalizedSegment) {
        normalizedSegment = 'Unknown'
      }
    }

    // Create customer object
    const customer: Customer = {
      id: `customer-${index}-${Date.now()}`,
      name: customerName,
      region: normalizedRegion,
      endUserSegment: normalizedSegment,
      type: normalizedSegment === 'Mining & Mineral Processing' ? 'mining'
            : normalizedSegment === 'Water & Wastewater Treatment' ? 'water_treatment'
            : normalizedSegment === 'Chemicals & Process Industries' ? 'chemicals'
            : normalizedSegment === 'Energy & Utilities' ? 'energy'
            : normalizedSegment === 'Fertilizers / Phosphate Value Chain' ? 'fertilizers'
            : 'manufacturing'
    }

    // Group by region and segment
    const key = `${normalizedRegion}|||${normalizedSegment}`
    if (!customerMap.has(key)) {
      customerMap.set(key, [])
    }
    customerMap.get(key)!.push(customer)
  })

  // Convert map to CustomerIntelligenceData array
  const result: CustomerIntelligenceData[] = []
  customerMap.forEach((customers, key) => {
    const [region, endUserSegment] = key.split('|||')
    result.push({
      region,
      endUserSegment,
      customerCount: customers.length,
      customers
    })
  })

  console.log(`Parser - Summary:`)
  console.log(`  Total rows: ${rows.length}`)
  console.log(`  Processed: ${processedCount}`)
  console.log(`  Skipped: ${skippedCount}`)
  console.log(`  Unique region/segment combinations: ${result.length}`)
  console.log(`  Total customers: ${result.reduce((sum, cell) => sum + cell.customerCount, 0)}`)

  // Log the breakdown by region and segment
  if (result.length > 0) {
    console.log('Parser - Breakdown by region/segment:')
    result.forEach(cell => {
      console.log(`  ${cell.region} / ${cell.endUserSegment}: ${cell.customerCount} customers`)
    })
  }

  if (result.length === 0 && rows.length > 0) {
    console.warn('Parser - No customers extracted. Sample row:', rows[0])
  }

  return result
}

/**
 * Load customer intelligence data from API
 * Falls back to generated data if API fails
 */
let cachedData: CustomerIntelligenceData[] | null = null

export async function loadCustomerIntelligenceData(filePath?: string): Promise<CustomerIntelligenceData[]> {
  // Ensure we're on the client side
  if (typeof window === 'undefined') {
    return generateCustomerIntelligenceData()
  }

  // If we have cached data and no new file path, return cached
  if (cachedData && !filePath) {
    return Promise.resolve(cachedData)
  }

  try {
    // Try to load from API endpoint
    const url = filePath
      ? `/api/load-customer-intelligence?filePath=${encodeURIComponent(filePath)}`
      : '/api/load-customer-intelligence'

    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      if (!controller.signal.aborted) {
        controller.abort()
      }
    }, 30000) // 30 second timeout

    try {
      const response = await fetch(url, {
        cache: 'no-store',
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        // If file not found, fall back to generated data
        if (response.status === 404) {
          console.log('Customer intelligence Excel file not found, using generated data')
          return generateCustomerIntelligenceData()
        }

        // Try to get error details from response
        let errorMessage = response.statusText
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || response.statusText
          console.error('API Error details:', errorData)
        } catch {
          // If JSON parsing fails, use status text
        }

        console.warn(`Failed to load customer intelligence: ${errorMessage}, using generated data`)
        return generateCustomerIntelligenceData()
      }

      const data = await response.json()

      console.log('API Response received:', {
        hasData: !!data.data,
        dataType: Array.isArray(data.data) ? 'array' : typeof data.data,
        dataLength: Array.isArray(data.data) ? data.data.length : 'N/A',
        metadata: data.metadata,
        error: data.error,
        message: data.message
      })

      // Transform the API response to match CustomerIntelligenceData structure
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        console.log(`Successfully loaded ${data.data.length} customer intelligence cells`)
        cachedData = data.data as CustomerIntelligenceData[]
        return cachedData
      }

      // If data structure is unexpected, fall back to generated data
      console.warn('Unexpected data structure from API:', data)
      console.warn('Falling back to generated data')
      return generateCustomerIntelligenceData()
    } catch (fetchError) {
      clearTimeout(timeoutId)

      // Handle abort errors gracefully
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.log('Customer intelligence data fetch was aborted')
        return generateCustomerIntelligenceData()
      }

      throw fetchError
    }
  } catch (error) {
    console.error('Error loading customer intelligence data:', error)
    // Fall back to generated data on error
    return generateCustomerIntelligenceData()
  }
}
