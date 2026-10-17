import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding AgrooNext database...');

  // 1. Seed Programmes
  const programmesData = [
    {
      code: 'HYDROPONICS',
      title: 'Hydroponics',
      slug: 'hydroponics',
      shortDescription: 'Precision soilless crop cultivation utilizing nutrient film technique (NFT) and deep water culture (DWC).',
      fullDescription: 'Comprehensive training in protected hydroponics. Learn system design, commercial plumbing, computerized nutrient dosing (EC/pH), nursery management, and pest management without toxic pesticides.',
      iconName: 'Droplet',
      displayOrder: 1,
    },
    {
      code: 'AEROPONICS',
      title: 'Aeroponics',
      slug: 'aeroponics',
      shortDescription: 'High-pressure misting systems and root-zone oxygenation for accelerated vertical farming.',
      fullDescription: 'The pinnacle of water and space conservation. Study root aeration, misting cycles, high-pressure pumps, nozzle sizing, automated filtration, and pathogen prevention.',
      iconName: 'Wind',
      displayOrder: 2,
    },
    {
      code: 'MUSHROOM',
      title: 'Mushroom Farming',
      slug: 'mushroom-farming',
      shortDescription: 'Commercial edible and functional mycology, substrate pasteurization, and climate-controlled fruiting rooms.',
      fullDescription: 'Practical cultivation of Oyster, Milky, Button, and Paddy Straw mushrooms. Master substrate sterilization, clean spawn inoculation, fruiting chamber humidity/temperature control, and shelf-life preservation.',
      iconName: 'CircleDot',
      displayOrder: 3,
    },
    {
      code: 'AQUACULTURE',
      title: 'Aquaculture',
      slug: 'aquaculture',
      shortDescription: 'Intensive Biofloc and recirculating aquaculture systems (RAS) for sustainable inland fish cultivation.',
      fullDescription: 'Scientific water quality monitoring, nursery rearing, dissolved oxygen management, microbial floc balancing, and integrated aquaponic unit economics.',
      iconName: 'Fish',
      displayOrder: 4,
    },
    {
      code: 'WOMEN_AGRI',
      title: 'Women Empowerment & Agri-Entrepreneurship',
      slug: 'women-agri-entrepreneurship',
      shortDescription: 'Enterprise development, business canvas planning, costing, packaging, and Self-Help Group (SHG) collective models.',
      fullDescription: 'Equipping rural women leaders and youth with practical skills in agro-product value addition, unit costing, pricing, digital record keeping, marketing, and institutional finance awareness.',
      iconName: 'Briefcase',
      displayOrder: 5,
    },
  ];

  for (const prog of programmesData) {
    await prisma.programme.upsert({
      where: { code: prog.code },
      update: prog,
      create: prog,
    });
  }

  const hydroponicsProg = await prisma.programme.findUnique({ where: { code: 'HYDROPONICS' } });
  const aeroponicsProg = await prisma.programme.findUnique({ where: { code: 'AEROPONICS' } });
  const mushroomProg = await prisma.programme.findUnique({ where: { code: 'MUSHROOM' } });
  const aquacultureProg = await prisma.programme.findUnique({ where: { code: 'AQUACULTURE' } });
  const womenAgriProg = await prisma.programme.findUnique({ where: { code: 'WOMEN_AGRI' } });

  // 2. Seed Courses & Pricing Tiers
  // A. Crash Courses (1 Day)
  const crashCourseSchool = await prisma.course.upsert({
    where: { courseCode: 'FMT-CRASH-SCH' },
    update: {},
    create: {
      courseCode: 'FMT-CRASH-SCH',
      title: 'Agro-Tech Crash Course (School Students)',
      slug: 'agro-tech-crash-course-school',
      summary: 'One-day multi-discipline awareness workshop covering modern soilless cultivation, aeroponics, mushrooms, and aquaculture for school cohorts (Ages 12-17).',
      offeringType: 'CRASH_COURSE',
      deliveryLevel: 'LEVEL_1_FOUNDATION',
      standardDuration: '1 Day',
      prerequisites: 'Enrolled in Grades 8 to 12 or equivalent.',
      isPublished: true,
      pricingTiers: {
        create: {
          targetGroup: 'School Students',
          pricingModel: 'PER_STUDENT',
          baseFeeInr: 250.0,
          eligibilityNotes: 'Requires valid school ID or principal bonafide.',
        },
      },
    },
  });

  const crashCourseCollege = await prisma.course.upsert({
    where: { courseCode: 'FMT-CRASH-COL' },
    update: {},
    create: {
      courseCode: 'FMT-CRASH-COL',
      title: 'Agro-Tech Crash Course (College / University)',
      slug: 'agro-tech-crash-course-college',
      summary: 'One-day multi-discipline foundation course covering technical operations, chemistry, engineering, and unit economics for undergraduate and vocational learners.',
      offeringType: 'CRASH_COURSE',
      deliveryLevel: 'LEVEL_1_FOUNDATION',
      standardDuration: '1 Day',
      prerequisites: 'Undergraduate or postgraduate college student.',
      isPublished: true,
      pricingTiers: {
        create: {
          targetGroup: 'College Students',
          pricingModel: 'PER_STUDENT',
          baseFeeInr: 500.0,
          eligibilityNotes: 'Requires valid college/university student ID.',
        },
      },
    },
  });

  // B. 5-Day Certificate Courses (Individual Topics)
  const certHydroponics = await prisma.course.upsert({
    where: { courseCode: 'FMT-CERT-HYD' },
    update: {},
    create: {
      courseCode: 'FMT-CERT-HYD',
      programmeId: hydroponicsProg?.id,
      title: '5-Day Certificate Course in Hydroponics',
      slug: '5-day-certificate-hydroponics',
      summary: 'Deep-dive practical training in soilless cultivation, nutrient solution preparation, vertical towers, and commercial greenhouse unit operations.',
      offeringType: 'TOPIC_CERTIFICATE',
      deliveryLevel: 'LEVEL_2_SKILL_CERTIFICATE',
      standardDuration: '5 Days',
      prerequisites: 'Open to all individuals, farmers, and entrepreneurs.',
      isPublished: true,
      pricingTiers: {
        create: {
          targetGroup: 'Individual Learners / SHGs',
          pricingModel: 'PER_STUDENT',
          baseFeeInr: 5000.0,
          eligibilityNotes: 'Includes laboratory consumables, PPE, and study dossier.',
        },
      },
    },
  });

  const certAeroponics = await prisma.course.upsert({
    where: { courseCode: 'FMT-CERT-AER' },
    update: {},
    create: {
      courseCode: 'FMT-CERT-AER',
      programmeId: aeroponicsProg?.id,
      title: '5-Day Certificate Course in Aeroponics',
      slug: '5-day-certificate-aeroponics',
      summary: 'Hands-on practical training in high-pressure mist systems, root-zone misting timing, nozzle calibration, and automated vertical cultivation.',
      offeringType: 'TOPIC_CERTIFICATE',
      deliveryLevel: 'LEVEL_2_SKILL_CERTIFICATE',
      standardDuration: '5 Days',
      prerequisites: 'Open to all individuals, farmers, and entrepreneurs.',
      isPublished: true,
      pricingTiers: {
        create: {
          targetGroup: 'Individual Learners / SHGs',
          pricingModel: 'PER_STUDENT',
          baseFeeInr: 5000.0,
          eligibilityNotes: 'Includes laboratory consumables, PPE, and study dossier.',
        },
      },
    },
  });

  const certMushroom = await prisma.course.upsert({
    where: { courseCode: 'FMT-CERT-MSH' },
    update: {},
    create: {
      courseCode: 'FMT-CERT-MSH',
      programmeId: mushroomProg?.id,
      title: '5-Day Certificate Course in Mushroom Farming',
      slug: '5-day-certificate-mushroom-farming',
      summary: 'Hands-on training in substrate preparation, steam pasteurization, sterile spawn inoculation, fruiting chamber climate control, and packaging.',
      offeringType: 'TOPIC_CERTIFICATE',
      deliveryLevel: 'LEVEL_2_SKILL_CERTIFICATE',
      standardDuration: '5 Days',
      prerequisites: 'Open to all individuals, farmers, and entrepreneurs.',
      isPublished: true,
      pricingTiers: {
        create: {
          targetGroup: 'Individual Learners / SHGs',
          pricingModel: 'PER_STUDENT',
          baseFeeInr: 5000.0,
          eligibilityNotes: 'Includes laboratory consumables, PPE, and study dossier.',
        },
      },
    },
  });

  const certAquaculture = await prisma.course.upsert({
    where: { courseCode: 'FMT-CERT-AQU' },
    update: {},
    create: {
      courseCode: 'FMT-CERT-AQU',
      programmeId: aquacultureProg?.id,
      title: '5-Day Certificate Course in Aquaculture & Biofloc',
      slug: '5-day-certificate-aquaculture',
      summary: 'Intensive immersion into recirculating aquaculture, Biofloc water chemistry, feed formulation, and nursery biosecurity.',
      offeringType: 'TOPIC_CERTIFICATE',
      deliveryLevel: 'LEVEL_2_SKILL_CERTIFICATE',
      standardDuration: '5 Days',
      prerequisites: 'Open to all individuals, farmers, and entrepreneurs.',
      isPublished: true,
      pricingTiers: {
        create: {
          targetGroup: 'Individual Learners / SHGs',
          pricingModel: 'PER_STUDENT',
          baseFeeInr: 5000.0,
          eligibilityNotes: 'Includes laboratory consumables, water testing kits, and study dossier.',
        },
      },
    },
  });

  const certWomenAgri = await prisma.course.upsert({
    where: { courseCode: 'FMT-CERT-WAG' },
    update: {},
    create: {
      courseCode: 'FMT-CERT-WAG',
      programmeId: womenAgriProg?.id,
      title: '5-Day Certificate in Women Agri-Entrepreneurship',
      slug: '5-day-certificate-women-agri-entrepreneurship',
      summary: 'Practical enterprise planning, unit economics, packaging, collective SHG production models, and market linkages.',
      offeringType: 'TOPIC_CERTIFICATE',
      deliveryLevel: 'LEVEL_2_SKILL_CERTIFICATE',
      standardDuration: '5 Days',
      prerequisites: 'Open to women entrepreneurs, SHG members, and rural innovators.',
      isPublished: true,
      pricingTiers: {
        create: {
          targetGroup: 'Women Entrepreneurs / SHGs',
          pricingModel: 'PER_STUDENT',
          baseFeeInr: 5000.0,
          eligibilityNotes: 'Subsidized community training baseline.',
        },
      },
    },
  });

  // C. 3-Week Complete Agro-Tech Package
  const pkgAll = await prisma.course.upsert({
    where: { courseCode: 'FMT-PKG-ALL' },
    update: {},
    create: {
      courseCode: 'FMT-PKG-ALL',
      title: 'Complete Agro-Tech & Training Package (All 5 Topics)',
      slug: 'complete-agro-tech-package',
      summary: 'Comprehensive 3-week immersion spanning all five modern agricultural disciplines: Hydroponics, Aeroponics, Mushroom Farming, Aquaculture, and Enterprise Planning.',
      offeringType: 'COMPLETE_PACKAGE',
      deliveryLevel: 'LEVEL_3_ENTERPRISE_PACKAGE',
      standardDuration: '3 Weeks',
      prerequisites: 'Aspiring agricultural entrepreneurs, commercial farm managers, and graduates.',
      isPublished: true,
      pricingTiers: {
        create: {
          targetGroup: 'Aspiring Entrepreneurs',
          pricingModel: 'PER_STUDENT',
          baseFeeInr: 22000.0,
          eligibilityNotes: 'Includes ₹3,000 package savings over individual certificates.',
        },
      },
    },
  });

  // D. Institutional Turnkey Workshops (1 Day)
  const instSchool = await prisma.course.upsert({
    where: { courseCode: 'FMT-INST-SCH' },
    update: {},
    create: {
      courseCode: 'FMT-INST-SCH',
      title: 'One-Day Institutional Agro-Tech Training (Schools)',
      slug: 'institutional-training-schools',
      summary: 'Turnkey full-day hands-on technology workshop delivered at your school or campus by certified AgrooNext trainers with live demonstration hardware.',
      offeringType: 'INSTITUTIONAL_WORKSHOP',
      deliveryLevel: 'INSTITUTIONAL_WORKSHOP',
      standardDuration: '1 Day',
      prerequisites: 'Authorized school administrative booking.',
      isPublished: true,
      pricingTiers: {
        create: {
          targetGroup: 'Schools (Group Booking)',
          pricingModel: 'PER_INSTITUTION_SESSION',
          baseFeeInr: 15000.0,
          eligibilityNotes: 'Flat rate per 1-day institutional session for agreed student cohort.',
        },
      },
    },
  });

  const instCollege = await prisma.course.upsert({
    where: { courseCode: 'FMT-INST-COL' },
    update: {},
    create: {
      courseCode: 'FMT-INST-COL',
      title: 'One-Day Institutional Agro-Tech Training (Colleges & Universities)',
      slug: 'institutional-training-colleges',
      summary: 'Turnkey full-day experiential technology workshop delivered at your college or university campus with practical water chemistry and cultivation demos.',
      offeringType: 'INSTITUTIONAL_WORKSHOP',
      deliveryLevel: 'INSTITUTIONAL_WORKSHOP',
      standardDuration: '1 Day',
      prerequisites: 'Authorized college/university department booking.',
      isPublished: true,
      pricingTiers: {
        create: {
          targetGroup: 'Colleges / Universities (Group Booking)',
          pricingModel: 'PER_INSTITUTION_SESSION',
          baseFeeInr: 25000.0,
          eligibilityNotes: 'Flat rate per 1-day institutional session for agreed student cohort.',
        },
      },
    },
  });

  // 3. Seed Scheduled Batches for Enrollment Testing
  const now = new Date();
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 5);
  const nextMonthEnd5Day = new Date(now.getFullYear(), now.getMonth() + 1, 9);
  const nextMonthEnd3Week = new Date(now.getFullYear(), now.getMonth() + 1, 26);
  const nextMonth1Day = new Date(now.getFullYear(), now.getMonth() + 1, 12);

  // Batch for Hydroponics
  await prisma.batch.upsert({
    where: { batchCode: 'BATCH-HYD-2026-01' },
    update: {},
    create: {
      batchCode: 'BATCH-HYD-2026-01',
      courseId: certHydroponics.id,
      startDate: nextMonthStart,
      endDate: nextMonthEnd5Day,
      venueType: 'TRAINING_CENTER',
      venueAddress: 'AgrooNext Demonstration Farm, Pune District, Maharashtra',
      minimumCapacity: 5,
      maximumCapacity: 25,
      batchStatus: 'ENROLLING',
    },
  });

  // Batch for Complete Package
  await prisma.batch.upsert({
    where: { batchCode: 'BATCH-PKG-2026-01' },
    update: {},
    create: {
      batchCode: 'BATCH-PKG-2026-01',
      courseId: pkgAll.id,
      startDate: nextMonthStart,
      endDate: nextMonthEnd3Week,
      venueType: 'HYBRID_LAB',
      venueAddress: 'AgrooNext Demonstration Farm & Labs, Pune, Maharashtra',
      minimumCapacity: 5,
      maximumCapacity: 20,
      batchStatus: 'ENROLLING',
    },
  });

  // Batch for School Crash Course
  await prisma.batch.upsert({
    where: { batchCode: 'BATCH-SCH-2026-01' },
    update: {},
    create: {
      batchCode: 'BATCH-SCH-2026-01',
      courseId: crashCourseSchool.id,
      startDate: nextMonth1Day,
      endDate: nextMonth1Day,
      venueType: 'TRAINING_CENTER',
      venueAddress: 'Pune Agricultural Training Center, Maharashtra',
      minimumCapacity: 5,
      maximumCapacity: 40,
      batchStatus: 'ENROLLING',
    },
  });

  // Batch for Mushroom Farming
  await prisma.batch.upsert({
    where: { batchCode: 'BATCH-MSH-2026-01' },
    update: {},
    create: {
      batchCode: 'BATCH-MSH-2026-01',
      courseId: certMushroom.id,
      startDate: nextMonthStart,
      endDate: nextMonthEnd5Day,
      venueType: 'TRAINING_CENTER',
      venueAddress: 'AgrooNext Demonstration Facility, Pune, Maharashtra',
      minimumCapacity: 5,
      maximumCapacity: 25,
      batchStatus: 'ENROLLING',
    },
  });

  // 4. Seed Development Users
  const passwordHash = await bcrypt.hash('AgrooNext@2026', 10);

  // System Admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@agroonext.org' },
    update: { role: 'SYSTEM_ADMIN' },
    create: {
      email: 'admin@agroonext.org',
      phone: '+919876500001',
      passwordHash,
      role: 'SYSTEM_ADMIN',
      isActive: true,
      emailVerifiedAt: new Date(),
    },
  });

  // Primary Learner (Student A)
  const learnerUser = await prisma.user.upsert({
    where: { email: 'learner@example.com' },
    update: {},
    create: {
      email: 'learner@example.com',
      phone: '+919876543210',
      passwordHash,
      role: 'STUDENT_LEARNER',
      isActive: true,
      emailVerifiedAt: new Date(),
      profile: {
        create: {
          fullName: 'Ananya Sharma',
          gender: 'Female',
          educationLevel: 'Undergraduate',
          institutionName: 'Pune College of Agriculture & Technology',
          city: 'Pune',
          state: 'Maharashtra',
          idProofType: 'Aadhaar Card',
          idProofStatus: 'VERIFIED',
          idProofVerifiedAt: new Date(),
        },
      },
    },
  });

  // Secondary Learner (Student B for IDOR / security boundary testing)
  const learner2User = await prisma.user.upsert({
    where: { email: 'learner2@example.com' },
    update: {},
    create: {
      email: 'learner2@example.com',
      phone: '+919876543211',
      passwordHash,
      role: 'STUDENT_LEARNER',
      isActive: true,
      emailVerifiedAt: new Date(),
      profile: {
        create: {
          fullName: 'Rahul Verma',
          gender: 'Male',
          educationLevel: 'Graduate',
          institutionName: 'Shivaji Science College',
          city: 'Satara',
          state: 'Maharashtra',
          idProofType: 'College ID',
          idProofStatus: 'PENDING_VERIFICATION',
        },
      },
    },
  });

  // Seed sample initial application for Learner A to test dashboard immediately
  const hydTier = await prisma.pricingTier.findFirst({
    where: { courseId: certHydroponics.id },
  });
  const hydBatch = await prisma.batch.findUnique({
    where: { batchCode: 'BATCH-HYD-2026-01' },
  });

  if (hydTier && hydBatch) {
    const existingApp = await prisma.application.findFirst({
      where: { userId: learnerUser.id },
    });

    if (!existingApp) {
      const app = await prisma.application.create({
        data: {
          applicationNumber: 'APP-2026-0001',
          userId: learnerUser.id,
          batchId: hydBatch.id,
          pricingTierId: hydTier.id,
          currentStatus: 'APPROVED',
          calculatedFeeInr: hydTier.baseFeeInr,
          submittedAt: new Date(),
          auditTrail: {
            create: [
              {
                previousStatus: null,
                newStatus: 'DRAFT',
                comments: 'Application draft initialized by learner.',
              },
              {
                previousStatus: 'DRAFT',
                newStatus: 'SUBMITTED',
                comments: 'Application submitted for admission review.',
              },
              {
                previousStatus: 'SUBMITTED',
                newStatus: 'UNDER_REVIEW',
                comments: 'Dossier opened by admissions staff.',
              },
              {
                previousStatus: 'UNDER_REVIEW',
                newStatus: 'APPROVED',
                comments: 'Eligibility verified; batch quota available.',
              },
            ],
          },
        },
      });

      // Sample notification for Learner A
      await prisma.notification.create({
        data: {
          userId: learnerUser.id,
          title: 'Application Approved: Hydroponics Certificate',
          message: 'Congratulations! Your application APP-2026-0001 has been approved. You may proceed to payment.',
          notificationType: 'ADMISSION_UPDATE',
          linkUrl: `/portal/applications/${app.id}`,
        },
      });
    }
  }

  // 5. Seed System Settings
  const defaultSettings = [
    { key: 'core_mvp_boundary', value: JSON.stringify({ mode: 'OPTION_B_LEAN', attendance_enabled: false, certification_enabled: false }) },
    { key: 'seat_hold_duration_hours', value: JSON.stringify({ hours: 48 }) },
    { key: 'online_payment_mode', value: JSON.stringify({ mode: 'MOCK_SANDBOX', live_allowed: false }) },
    { key: 'offline_payment_mode', value: JSON.stringify({ enabled: true, methods: ['NEFT_RTGS', 'UPI_QR', 'CASH'] }) },
  ];

  for (const s of defaultSettings) {
    await prisma.systemSetting.upsert({
      where: { settingKey: s.key },
      update: { settingValue: s.value },
      create: { settingKey: s.key, settingValue: s.value },
    });
  }

  console.log('Database seeding successfully completed.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
