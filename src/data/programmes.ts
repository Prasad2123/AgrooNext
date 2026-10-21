export interface ProgrammeData {
  id: string;
  slug: string;
  code: string;
  name: string;
  badge: string;
  tagline: string;
  heroImage: string;
  accentColor: string;
  accentGlow: string;
  shortDescription: string;
  fullDescription: string;
  technologyDescription: string;
  learningAreas: {
    title: string;
    description: string;
  }[];
  practicalLabs: string[];
  equipmentUsed: string[];
  suitableFor: string[];
  capstone: string;
  deliveryLevels: string;
  relatedProgrammes: {
    slug: string;
    name: string;
    tagline: string;
  }[];
  relatedCourseCodes: string[];
}

export const PROGRAMMES_DATA: ProgrammeData[] = [
  {
    id: 'hydroponics',
    slug: 'hydroponics',
    code: 'HYDROPONICS',
    name: 'Hydroponics',
    badge: 'Core Technology 01',
    tagline: 'Precision Soilless Crop Production',
    heroImage: '/images/programmes/hydroponics.jpg',
    accentColor: '#00897B',
    accentGlow: 'rgba(0, 137, 123, 0.25)',
    shortDescription:
      'Precision soilless crop cultivation utilizing Nutrient Film Technique (NFT), Deep Water Culture (DWC), and automated vertical towers.',
    fullDescription:
      'Comprehensive immersion into modern protected cultivation. Learn system design, commercial plumbing, computerized nutrient dosing (EC and pH), nursery management, and crop health monitoring without toxic pesticides.',
    technologyDescription:
      'Hydroponics eliminates soil dependency by delivering mineral nutrients directly to plant roots dissolved in oxygenated water. By controlling water chemistry, electrical conductivity (EC), and pH levels within narrow physiological ranges, crops achieve up to 30–50% faster vegetative growth and require up to 90% less water than traditional surface irrigation.',
    learningAreas: [
      {
        title: 'Nutrient Film Technique (NFT) & Deep Water Culture (DWC)',
        description:
          'Design principles, channel slope calculations, flow-rate optimization, root aeration, and reservoir sizing for commercial leafy greens.',
      },
      {
        title: 'Water Chemistry & Nutrient Formulation',
        description:
          'Measuring and calibrating pH (5.5–6.5) and electrical conductivity (EC), diagnosing macro- and micronutrient deficiencies, and preparing concentrated stock solutions.',
      },
      {
        title: 'Vertical Towers & Protected Environment Systems',
        description:
          'Vertical space optimization, artificial assimilation lighting spectra, photoperiod calculation, and climate control in polyhouses.',
      },
      {
        title: 'Nursery Propagation & Microgreens',
        description:
          'Sterile propagation media (rockwool, oasis cubes, coco coir), seed germination protocols, and high-value microgreen harvest scheduling.',
      },
    ],
    practicalLabs: [
      'Assemble a multi-tier tabletop NFT cultivation channel with submersible pump and bypass drainage plumbing.',
      'Calibrate handheld digital pH and EC meters against standard laboratory buffer solutions.',
      'Formulate a 100-liter balanced macro/micro nutrient reservoir tailored for leafy greens.',
      'Sow 200 nursery cells in inert sterile media and configure automatic capillary hydration.',
    ],
    equipmentUsed: [
      'Food-grade PVC and UPVC NFT channels',
      'Submersible circulation pumps and return bypass valving',
      'Digital pH, EC, and dissolved oxygen probes',
      'LED photosynthetic grow lights (red/blue spectrum)',
      'Airstones and high-output diaphragm air pumps',
    ],
    suitableFor: [
      'Students in STEM, biology, and agricultural sciences',
      'Aspiring commercial urban farmers and vertical greenhouse growers',
      'Institutional educators establishing school farm laboratories',
      'Agricultural entrepreneurs seeking year-round leafy green production',
    ],
    capstone:
      'Assemble an operational desktop hydroponic unit, verify hydraulic circulation, and calculate nutrient dosing for a complete 30-day crop cycle.',
    deliveryLevels: 'Level 1 (1-Day Crash Course) • Level 2 (5-Day Certificate) • Level 3 (3-Week Package)',
    relatedProgrammes: [
      {
        slug: 'aeroponics',
        name: 'Aeroponics',
        tagline: 'High-Pressure Mist & Root-Zone Aeration',
      },
      {
        slug: 'aquaculture',
        name: 'Aquaculture',
        tagline: 'Intensive Biofloc & Recirculating Aquaculture',
      },
    ],
    relatedCourseCodes: ['FMT-CRASH-SCH', 'FMT-CRASH-COL', 'FMT-CERT-HYD', 'FMT-PKG-ALL'],
  },
  {
    id: 'aeroponics',
    slug: 'aeroponics',
    code: 'AEROPONICS',
    name: 'Aeroponics',
    badge: 'Core Technology 02',
    tagline: 'High-Pressure Mist & Root-Zone Aeration',
    heroImage: '/images/programmes/aeroponics.jpg',
    accentColor: '#00ACC1',
    accentGlow: 'rgba(0, 172, 193, 0.25)',
    shortDescription:
      'High-pressure misting systems and root-zone oxygenation for accelerated vertical farming and maximum water conservation.',
    fullDescription:
      'The pinnacle of water and space conservation. Study root aeration, misting cycles, high-pressure pumps, nozzle sizing, automated filtration, and pathogen prevention in air-suspended root chambers.',
    technologyDescription:
      'In aeroponics, plant roots are suspended inside an enclosed dark chamber and periodically atomized with an ultra-fine pressurized nutrient mist (30–80 micron droplets). Because the roots are surrounded by 100% oxygenated air, nutrient absorption and metabolic rates are maximized, resulting in zero water stagnation and up to 95% water savings compared to traditional soil farming.',
    learningAreas: [
      {
        title: 'Misting Dynamics & High-Pressure Plumbing',
        description:
          'Calculating pump PSI (80–120 PSI), atomizing nozzle droplet size, accumulator tank pressure balancing, and non-drip check valves.',
      },
      {
        title: 'Root Oxygenation & Pathogen Prevention',
        description:
          'Maximizing root-zone oxygen diffusion rates, preventing pythium and root rot without synthetic biocides, and maintaining chamber humidity.',
      },
      {
        title: 'Automated Cyclic Timing Controls',
        description:
          'Configuring interval timers (e.g., 5 seconds spray / 5 minutes rest), fail-safe power redundancy, and solar backup considerations.',
      },
      {
        title: 'Nozzle Maintenance & Particle Filtration',
        description:
          'Multi-stage filtration (100–200 mesh), ultrasonic nozzle cleaning, and emergency bypass protocols against clogging.',
      },
    ],
    practicalLabs: [
      'Design and construct a pressurized mist manifold using quick-connect high-pressure tubing and brass atomizing nozzles.',
      'Program digital repeating cycle timers and test nozzle spray coverage using indicator paper.',
      'Perform root inspection and prune vegetative tissue in operational aeroponic columns.',
      'Simulate power interruptions and implement emergency gravity-fed backup misting loops.',
    ],
    equipmentUsed: [
      'High-pressure diaphragm pumps (80–120 PSI)',
      'Anti-drip brass and ceramic misting nozzles (0.3–0.5mm orifice)',
      'Accumulator pressure tanks and solenoid valves',
      'Dual-stage sediment and disc inline filters',
      'Precision repeat-cycle interval timers',
    ],
    suitableFor: [
      'Progressive growers wanting maximum yield in limited floor space',
      'High-value crop and medicinal herb cultivators',
      'Agricultural engineering and robotics enthusiasts',
      'Clean seed potato tuber producers',
    ],
    capstone:
      'Design, assemble, and calibrate a pressurized mist chamber with automated cyclic timer controls and multi-stage filtration.',
    deliveryLevels: 'Level 1 (1-Day Crash Course) • Level 2 (5-Day Certificate) • Level 3 (3-Week Package)',
    relatedProgrammes: [
      {
        slug: 'hydroponics',
        name: 'Hydroponics',
        tagline: 'Precision Soilless Crop Production',
      },
      {
        slug: 'mushroom-farming',
        name: 'Mushroom Farming',
        tagline: 'Commercial Edible & Functional Mycology',
      },
    ],
    relatedCourseCodes: ['FMT-CRASH-SCH', 'FMT-CRASH-COL', 'FMT-CERT-AER', 'FMT-PKG-ALL'],
  },
  {
    id: 'mushroom_farming',
    slug: 'mushroom-farming',
    code: 'MUSHROOM',
    name: 'Mushroom Farming',
    badge: 'Core Technology 03',
    tagline: 'Commercial Edible & Functional Mycology',
    heroImage: '/images/programmes/mushroom-farming.jpg',
    accentColor: '#FB8C00',
    accentGlow: 'rgba(251, 140, 0, 0.25)',
    shortDescription:
      'Commercial edible and functional mycology, substrate pasteurization, sterile inoculation, and climate-controlled fruiting rooms.',
    fullDescription:
      'Practical cultivation of Oyster, Milky, Button, and Paddy Straw mushrooms. Master substrate sterilization, clean spawn inoculation, fruiting chamber humidity/temperature control, and post-harvest shelf-life preservation.',
    technologyDescription:
      'Mushroom cultivation converts agricultural crop residues (such as wheat straw, paddy straw, and sugarcane bagasse) into protein-rich, nutritious edible food through controlled fungal biological digestion. Operating in dark incubation and high-humidity fruiting environments, it enables high-frequency indoor harvesting irrespective of seasonal rainfall.',
    learningAreas: [
      {
        title: 'Species Selection & Biology',
        description:
          'Morphology and growth parameters of Pleurotus ostreatus (Oyster), Calocybe indica (Milky), and Agaricus bisporus (Button).',
      },
      {
        title: 'Substrate Sourcing & Pasteurization',
        description:
          'Hot water pasteurization, steam sterilization, moisture balancing (60–65%), and hygiene protocols to suppress Trichoderma green mold.',
      },
      {
        title: 'Spawn Inoculation & Spawn Running',
        description:
          'Aseptic grain spawn handling, layer vs. thorough spawning ratios, dark incubation temperature management (22–26°C), and mycelial run tracking.',
      },
      {
        title: 'Fruiting Climate & Post-Harvest Packaging',
        description:
          'Managing fresh air exchange (CO2 reduction below 1000 ppm), relative humidity (85–90%), pinhead induction, sterile harvesting, and perforation pouch packaging.',
      },
    ],
    practicalLabs: [
      'Chop, hydrate, and steam-pasteurize 25kg of agricultural wheat/paddy straw substrate.',
      'Inoculate 5 polypropylene cultivation bags using sterile layer-spawning techniques in a clean laminar flow setup.',
      'Record daily temperature, humidity, and CO2 readings inside the demonstration fruiting room.',
      'Harvest mature mushroom flushes and perform cold-chain weighing and breathable film packaging.',
    ],
    equipmentUsed: [
      'Substrate boiling and steam pasteurization autoclaves/drums',
      'Ultrasonic cool-mist industrial humidifiers',
      'Digital hygrometers and infrared thermometer sensors',
      'Air ventilation exhaust fans with HEPA pre-filtration',
      'Food-grade perforated polypropylene micro-perforated bags',
    ],
    suitableFor: [
      'Rural youth and women self-help group entrepreneurs',
      'Smallholder farmers seeking value-addition for crop residue',
      'Commercial fresh food and gourmet mushroom suppliers',
      'Urban home-scale and peri-urban micro-enterprise founders',
    ],
    capstone:
      'Prepare 5 sterile substrate bags, inoculate with mother spawn, document the incubation cycle, and establish a fruiting climate log.',
    deliveryLevels: 'Level 1 (1-Day Crash Course) • Level 2 (5-Day Certificate) • Level 3 (3-Week Package)',
    relatedProgrammes: [
      {
        slug: 'women-empowerment',
        name: 'Women Empowerment',
        tagline: 'Rural Livelihoods, SHGs & Business Planning',
      },
      {
        slug: 'hydroponics',
        name: 'Hydroponics',
        tagline: 'Precision Soilless Crop Production',
      },
    ],
    relatedCourseCodes: ['FMT-CRASH-SCH', 'FMT-CRASH-COL', 'FMT-CERT-MSH', 'FMT-PKG-ALL'],
  },
  {
    id: 'aquaculture',
    slug: 'aquaculture',
    code: 'AQUACULTURE',
    name: 'Aquaculture',
    badge: 'Core Technology 04',
    tagline: 'Intensive Biofloc & Recirculating Aquaculture',
    heroImage: '/images/programmes/aquaculture.jpg',
    accentColor: '#1E88E5',
    accentGlow: 'rgba(30, 136, 229, 0.25)',
    shortDescription:
      'Intensive Biofloc and Recirculating Aquaculture Systems (RAS) for sustainable inland fish cultivation and water efficiency.',
    fullDescription:
      'Scientific water quality monitoring, nursery rearing, dissolved oxygen management, microbial floc balancing, feeding ratios, and integrated aquaponic unit economics.',
    technologyDescription:
      'Biofloc and RAS technologies enable high-density fish production in controlled tanks with minimal water exchange. By maintaining an optimal carbon-to-nitrogen (C:N) ratio through carbon addition, beneficial heterotrophic bacteria assimilate toxic ammonia into proteinaceous microbial biomass (biofloc), which serves as supplemental fish feed and purifies the water.',
    learningAreas: [
      {
        title: 'Recirculating Aquaculture Systems (RAS) Mechanics',
        description:
          'Mechanical solid removal, swirl separators, moving bed biofilm reactors (MBBR), protein skimmers, and UV disinfection.',
      },
      {
        title: 'Biofloc Microbial Technology & C:N Ratio',
        description:
          'Floc volume index (Imhoff cone testing), molasses/jaggery carbon dosing calculations, and maintaining healthy brown floc ecology.',
      },
      {
        title: 'Critical Water Chemistry Diagnostics',
        description:
          'Daily testing protocols for dissolved oxygen (>5 mg/L), Total Ammonia Nitrogen (TAN <0.5 ppm), nitrite, nitrate, alkalinity, and pH.',
      },
      {
        title: 'Nutrition, Feeding Ratios & Biosecurity',
        description:
          'Calculating Feed Conversion Ratio (FCR), pellet sizing based on fish body weight, disease symptom observation, and quarantine biosecurity.',
      },
    ],
    practicalLabs: [
      'Assemble a mini recirculating aquaculture tank loop with mechanical filter and biological aeration chamber.',
      'Perform titrimetric and photometric water quality tests for ammonia, nitrite, and dissolved oxygen.',
      'Measure biofloc density using a 1000ml Imhoff settling cone and calculate carbohydrate correction doses.',
      'Calculate daily feeding schedules and evaluate FCR trends based on sample fish biomass.',
    ],
    equipmentUsed: [
      'Circular polymer tarpaulin tanks with center drain drains',
      'High-volume regenerative air blowers and microporous aeration diffusers',
      'Imhoff settling cones and water analysis photometers',
      'Submersible solids-handling drainage pumps',
      'Mechanical vortex filters and moving-bed biological media',
    ],
    suitableFor: [
      'Inland aquaculture farmers and pond operators upgrading to intensive systems',
      'Agricultural science graduates and vocational biology trainees',
      'Commercial fish farm entrepreneurs and aquaponics operators',
      'Community self-help groups establishing collective protein rearing',
    ],
    capstone:
      'Conduct comprehensive chemical water tests, calculate feeding charts, and draft a tank biofloc layout with aeration redundancy.',
    deliveryLevels: 'Level 1 (1-Day Crash Course) • Level 2 (5-Day Certificate) • Level 3 (3-Week Package)',
    relatedProgrammes: [
      {
        slug: 'hydroponics',
        name: 'Hydroponics',
        tagline: 'Precision Soilless Crop Production',
      },
      {
        slug: 'women-empowerment',
        name: 'Women Empowerment',
        tagline: 'Rural Livelihoods, SHGs & Business Planning',
      },
    ],
    relatedCourseCodes: ['FMT-CRASH-SCH', 'FMT-CRASH-COL', 'FMT-CERT-AQU', 'FMT-PKG-ALL'],
  },
  {
    id: 'women_empowerment',
    slug: 'women-empowerment',
    code: 'WOMEN_AGRI',
    name: 'Women Empowerment & Agri-Entrepreneurship',
    badge: 'Core Technology 05',
    tagline: 'Rural Livelihoods, SHGs & Business Planning',
    heroImage: '/images/programmes/women-empowerment.jpg',
    accentColor: '#C2185B',
    accentGlow: 'rgba(194, 24, 91, 0.25)',
    shortDescription:
      'Enterprise development, business canvas planning, unit costing, packaging, and Self-Help Group (SHG) collective production models.',
    fullDescription:
      'Equipping rural women leaders, youth, and self-help groups with practical skills in agro-product value addition, unit costing, pricing, digital record keeping, branding, and institutional finance awareness.',
    technologyDescription:
      'Connecting agricultural technical skills directly to commercial enterprise viability. This programme trains women leaders and collectives to build profitable micro-enterprises around fresh produce, dried mushrooms, processed herbal products, and nursery seedlings, converting agricultural know-how into sustained family livelihood and economic independence.',
    learningAreas: [
      {
        title: 'Value-Added Agro-Products & Processing',
        description:
          'Solar drying of mushrooms, microgreen packaging, herb washing and packaging, and hygienic quality standards for retail markets.',
      },
      {
        title: 'Unit Economics, Costing & Margin Analysis',
        description:
          'Calculating raw material costs, electricity, packaging, depreciation, and establishing profitable retail and wholesale price points.',
      },
      {
        title: 'Self-Help Group (SHG) Collective Operating Models',
        description:
          'Work-sharing matrices, collective raw material procurement, joint bank account operations, and conflict resolution protocols.',
      },
      {
        title: 'Digital Records, Branding & Formal Credit Linkages',
        description:
          'Smartphone-based ledger keeping, label design and local marketing channels, and preparing loan documentation for institutional credit schemes.',
      },
    ],
    practicalLabs: [
      'Draft a full 12-month micro-enterprise business canvas for an agro-venture with itemized capital expense budgets.',
      'Design product label packaging compliant with consumer awareness standards.',
      'Calculate break-even production volume and payback periods for a community mushroom or microgreen unit.',
      'Practice digital mobile bookkeeping entries and assemble a formal bank loan proposal dossier.',
    ],
    equipmentUsed: [
      'Digital moisture meters and platform weighing scales',
      'Impulse heat sealers and vacuum packaging machines',
      'Food-grade drying and dehydration trays',
      'Digital ledger and spreadsheet accounting mobile tools',
      'Standardized business canvas templates and planning worksheets',
    ],
    suitableFor: [
      'Women farmers, SHG leaders, and rural community organizers',
      'Aspiring agri-business and food processing entrepreneurs',
      'NGO field coordinators and vocational livelihood trainers',
      'Students and youth seeking sustainable rural self-employment',
    ],
    capstone:
      'Develop a verified 12-month micro-enterprise business canvas with operating expense budgets, channel partners, and cash-flow estimates.',
    deliveryLevels: 'Level 1 (1-Day Crash Course) • Level 2 (5-Day Certificate) • Level 3 (3-Week Package)',
    relatedProgrammes: [
      {
        slug: 'mushroom-farming',
        name: 'Mushroom Farming',
        tagline: 'Commercial Edible & Functional Mycology',
      },
      {
        slug: 'hydroponics',
        name: 'Hydroponics',
        tagline: 'Precision Soilless Crop Production',
      },
    ],
    relatedCourseCodes: ['FMT-CRASH-SCH', 'FMT-CRASH-COL', 'FMT-CERT-WAG', 'FMT-PKG-ALL'],
  },
];
