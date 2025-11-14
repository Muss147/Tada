export interface Solution {
  id: string;
  name: string;
  title: string;
  description: string;
  hero: {
    headline: string;
    subheadline: string;
    benefits: string[];
    ctaPrimary: string;
    ctaPrimaryLink?: string;
    ctaSecondary: string;
    ctaSecondaryLink?: string;
  };
  features: {
    title: string;
    subheadline?: string;
    subtitle: string;
    items: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      icon: string;
      title: string;
      subheadline?: string;
      description: string;
    }[];
  };
  useCases: {
    title: string;
    subtitle: string;
    otherSubtitle?: string;
    cases: {
      icon: string;
      title: string;
      description: string;
      subheadline?: string;
      benefits: string[];
    }[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      role: string;
      company: string;
      image: string;
      content: string;
      rating: number;
    }[];
  };
  cta: {
    title: string;
    subtitle: string;
    primaryButton: string;
    secondaryButton: string;
    ctaPrimaryLink?: string;
    ctaSecondaryLink?: string;
  };
}

export const solutions: Solution[] = [
  {
    id: "availability-tracker",
    name: "Availability Tracker",
    title: "Availability Tracker",
    description:
      "Increase Sales and Distribution With Actionable Same-Day Data",
    hero: {
      headline: "Availability\nTracker",
      subheadline:
        "Monitor availability and out-of-stocks in near-real time across every store, city and channel that matters to you – so you can take immediate action to drive up your distribution and increase your sales.",
      benefits: [
        "Increase Sales and Distribution With Actionable Same-Day Data",
      ],
      ctaPrimary: "Request Demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Discover the Key Features of Our Availability Tracker",
      subtitle: "",
      items: [
        {
          icon: "CheckCircle",
          title: "Help Your Distributors Succeed",
          description:
            "Track distribution of your products over time in every city and region that matters to you.",
        },
        {
          icon: "CheckCircle",
          title: "Fix Out-of-Stocks",
          description:
            "Receive out-of-stock alerts, store by store and in near real-time.",
        },
        {
          icon: "CheckCircle",
          title: "Expand Distribution Coverage",
          description:
            "Receive a regularly-updated list of high-potential stores for your field force to convert into customers.",
        },
        {
          icon: "CheckCircle",
          title: "Monitor Product Launches",
          description:
            "Track your newly launched product’s distribution in the stores and markets that matter to you most.",
        },
      ],
    },
    howItWorks: {
      title: "How it works",
      subtitle:
        "Our platform follows a simple four-step process to deliver comprehensive availability intelligence.",
      steps: [
        {
          icon: "Search",
          title: "Monitor",
          description:
            "We continuously scan global markets and retailers to track your products' availability status in real-time.",
        },
        {
          icon: "Database",
          title: "Collect",
          description:
            "Our platform aggregates availability data from multiple sources and normalizes it for consistent reporting.",
        },
        {
          icon: "Bell",
          title: "Alert",
          description:
            "Receive instant notifications when availability changes, with customizable thresholds and delivery methods.",
        },
        {
          icon: "BarChart3",
          title: "Analyze",
          description:
            "Access comprehensive analytics and insights to understand availability patterns and optimize your strategy.",
        },
      ],
    },
    useCases: {
      title: "What Makes Tada Different?",
      subtitle: "",
      cases: [
        {
          icon: "ShoppingCart",
          title: "Store by Store Insights",
          description:
            "Identify the exact stores where you can take action to increase sales.",
          benefits: [],
        },
        {
          icon: "Package",
          title: "Same-Day Data",
          description:
            "Unlike the old market research companies, we provide data in near real-time.",
          benefits: [],
        },
        {
          icon: "Globe",
          title: "Global Coverage",
          description:
            "Wherever you operate, our global community of 6+ million Contributors is quick to source actionable data in near real-time.",
          benefits: [],
        },
        {
          icon: "Search",
          title: "Immediate Actionability",
          description:
            "Hold distributors and retailers accountable for on-shelf availability, store by store.",
          benefits: [],
        },
        {
          icon: "TrendingUp",
          title: "Scalable Solutions",
          description:
            "Our pricing plans meet the needs of businesses of all sizes, providing flexibility in your pricing strategy.",
          benefits: [],
        },
        {
          icon: "Users",
          title: "Industry Expertise",
          description:
            "We leverage our in-depth CPG knowledge to provide actionable insights, ensuring our clients stay at the forefront of their respective markets.",
          benefits: [],
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Availability Tracker to optimize their operations.",
      items: [
        {
          name: "Sarah Johnson",
          role: "VP of Operations",
          company: "Global Electronics Corp",
          image:
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "Availability Tracker has transformed how we monitor our products globally. We now catch stockouts before they impact our customers.",
          rating: 5,
        },
        {
          name: "Michael Chen",
          role: "Supply Chain Director",
          company: "RetailMax",
          image:
            "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The real-time alerts have been game-changing for our inventory management. We've reduced stockouts by 60% since implementation.",
          rating: 5,
        },
        {
          name: "Emma Rodriguez",
          role: "E-commerce Manager",
          company: "Fashion Forward",
          image:
            "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The global coverage is incredible. We can now monitor our products across all major markets from a single dashboard.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      ctaPrimaryLink: "/schedule-demo",
      secondaryButton: "Contact Sales",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "rolling-retail-census",
    name: "Rolling Retail Census",
    title: "Rolling Retail Census",
    description: "Move Beyond the Limitations of Traditional Data Collection",
    hero: {
      headline: "Rolling Retail Census",
      subheadline:
        "Get access to store-by-store execution intelligence across 100% of traditional trade on a rolling basis – right at your fingertips.",
      benefits: ["Move Beyond the Limitations of Traditional Data Collection"],
      ctaPrimary: "Request Demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Agile, Accurate, Actionable  ",
      subheadline: "Driving Up Sales, Distribution & Execution",
      subtitle:
        "Our Rolling Retail Census helps brands capture POS category potential to enhance portfolio penetration and pinpoints store-specific opportunities to take immediate action on, including:",
      items: [
        {
          icon: "CheckCircle",
          title: "Availability",
          description:
            "Boost distribution by finding and fixing store-by-store availability gaps",
        },
        {
          icon: "CheckCircle",
          title: "Shelf Facing",
          description:
            "Maintain shelf dominance over competitors in all top-tier outlets",
        },
        {
          icon: "CheckCircle",
          title: "Out-of-Stocks",
          description: "Prevent lost sales through out-of-stock detection",
        },
        {
          icon: "CheckCircle",
          title: "Coolers",
          description:
            "Protect your investment with 100% purity cooler compliance",
        },
      ],
    },
    howItWorks: {
      title: "How it works",
      subtitle:
        "Our platform follows a simple four-step process to deliver comprehensive pricing intelligence.",
      steps: [
        {
          icon: "Search",
          title: "Monitor",
          description:
            "We continuously scan global markets and retailers to track competitor pricing in real-time across all channels.",
        },
        {
          icon: "Database",
          title: "Collect",
          description:
            "Our platform aggregates pricing data from multiple sources and normalizes it for consistent analysis and reporting.",
        },
        {
          icon: "Bell",
          title: "Alert",
          description:
            "Receive instant notifications when competitor prices change, with customizable thresholds and delivery methods.",
        },
        {
          icon: "BarChart3",
          title: "Analyze",
          description:
            "Access comprehensive pricing analytics and insights to understand market dynamics and optimize your pricing strategy.",
        },
      ],
    },
    useCases: {
      title: "Get Ahead of Your Competition with Premise",
      subtitle: "",
      cases: [
        {
          icon: "Search",
          title: "E-commerce & Retail",
          description:
            "Our solution sheds light on previously invisible insights within the traditional trade domain, bringing them to the forefront and enabling brands to drive meaningful growth. Through our proprietary methodology, we establish the industry’s most precise database down to the store and SKU level.",
          benefits: [],
        },
        {
          icon: "Globe",
          title: "Actionability",
          description:
            "Syndicated data empowers you to drive meaningful sales growth through targeted measures. Our goal is to uncover actionable opportunities at the point of sales (POS) within specific neighborhoods because we recognize different POS require tailored actions.",
          benefits: [],
        },
        {
          icon: "Zap",
          title: "Speed of Delivery",
          description:
            "Gone are the days when you have to wait months for obsolete market data. We conduct monthly block-by-block store visits to deliver granular and up-to-date insights into your in-store execution so that you can immediately pounce on sales opportunities.",
          benefits: [],
        },
        {
          icon: "TrendingUp",
          title: "Accelerated Growth",
          description:
            "Full category measurements and the rolling nature of our census allow you to track the progress of your efforts to accelerate growth in availability, portfolio penetration, and revenue.",
          benefits: [],
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Price Intelligence to optimize their pricing strategies.",
      items: [
        {
          name: "David Kim",
          role: "Pricing Director",
          company: "TechGiant Corp",
          image:
            "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "Price Intelligence has revolutionized our pricing strategy. We've increased margins by 15% while staying competitive in the market.",
          rating: 5,
        },
        {
          name: "Lisa Thompson",
          role: "E-commerce Manager",
          company: "RetailPro",
          image:
            "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The real-time price alerts have been incredible. We can now respond to competitor price changes within minutes instead of days.",
          rating: 5,
        },
        {
          name: "Carlos Martinez",
          role: "Revenue Manager",
          company: "Global Brands Inc",
          image:
            "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The pricing analytics have given us insights we never had before. Our pricing decisions are now data-driven and strategic.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Insights Available On-Demand All on MyPremise",
      subtitle:
        "Our online analytics platform gives you unparalleled access to execution intelligence across your entire category, store by store. On MyPremise, you can schedule real-time alerts, get presentation-ready visualizations, and view insights aligned to your sales territories.",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "ai-qualitative-insights-platform",
    name: "VideoAI",
    title: "VideoAI",
    description:
      "Our proprietary technology enables you to uncover in-depth insights and sentiments from millions of global Contributors on any topic or interest.",
    hero: {
      headline: "VideoAI",
      subheadline:
        "Our proprietary technology enables you to uncover in-depth insights and sentiments from millions of global Contributors on any topic or interest.",
      benefits: ["Unlock Qual Feedback at Scale"],
      ctaPrimary: "Get Started",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "How it Works",
      subtitle: "Insights for Any Industry",
      items: [
        {
          icon: "ShoppingCart",
          title: "Consumer Brands",
          description:
            "Monitor brand sentiment and gather insights to improve products, launch campaigns, and explore markets.",
        },
        {
          icon: "Building",
          title: "Public Sector",
          description:
            "Assess community and stakeholder sentiment on development and public sector issues to optimize program design and implementation.",
        },
        {
          icon: "Document",
          title: "Political + News Organizations",
          description:
            "Analyze political events that impact voters and quickly develop or refine campaign messaging and strategies.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title: "Ai Powered",
      subtitle: "",
      otherSubtitle: "",
      cases: [
        {
          icon: "Search",
          title: "Authentic Sentiment",
          subheadline: "Richer Qual Data",
          benefits: [],
          description:
            "Video encourages users to express themselves candidly and naturally, transcending literacy levels and language barriers, resulting in nuanced qualitative data.",
        },
        {
          icon: "Brain",
          title: "AI-Powered Analysis",
          subheadline: "Human-Level LLMs",
          benefits: [],
          description:
            "Our proprietary AI tooling leverages best-in-class LLMs that have been shown to be as accurate as human labelers, but a billion times faster.",
        },
        {
          icon: "Globe",
          title: "Global Access",
          subheadline: "Collect & Analyze Responses Anywhere",
          benefits: [],
          description:
            "Premise’s Contributor network spans more than 6 million people in over 140 countries.",
        },
        {
          icon: "FileText",
          title: "Report",
          benefits: [],
          description:
            "Comprehensive reports and dashboards deliver actionable insights to drive strategic business decisions.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Qualitative Insights at Quantitative Scale",
      subtitle:
        "Our Global Contributor Networks supports nationally representative insights with detailed demographic and location data",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "geospatial-analytics",
    name: "Data for all your Decisions",
    title: "Data for all your Decisions",
    description: "Discover the Unknown in Real-time, Around the World",
    hero: {
      headline: "Data for all your Decisions",
      subheadline:
        "For your organization to excel around the world, you need accurate information to help you inform your strategies. Crowdsourcing this information enables you to get accurate, ground-level information quicker than ever before. Location Discovery can be used to help your business answer a range of different questions. Here are a few ways location discovery can be used.",
      benefits: ["Discover the Unknown in Real-time, Around the World"],
      ctaPrimary: "Request a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "The Advantage of Premise",
      subtitle: "Real-Time Insights to Optimize Location Services Assets",
      items: [
        {
          icon: "CheckCircle",
          title: "Get Credible Insights",
          description:
            "To improve credibility and consistently have accurate POIs, location services need people to collect data and report their findings constantly.",
        },
        {
          icon: "CheckCircle",
          title: "Hours and Offerings",
          description:
            "Gather business hours of operation and their offerings quickly and easily, as well as any changes to them.",
        },
        {
          icon: "CheckCircle",
          title: "Reduce Labor Costs",
          description:
            "Unlike traditional, expensive market research household panels or full-time employees, Premise Contributors are unbiased gig workers that collect dozens of data points in the field using their mobile phones at an unmatched value.",
        },
        {
          icon: "CheckCircle",
          title: "Maximize Active Users and Revenue",
          description:
            "Location services can’t retain users if the information on them isn’t correct. When these apps are correct, users will gravitate to them. Not only does this retain them, but it can also grow active user counts, ultimately increasing revenue.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title:
        "Identify New Locations or Verify Existing Ones Quickly and Easily",
      subtitle: "Geospatial Analytics",
      otherSubtitle: "",
      cases: [
        {
          icon: "Search",
          title: "Business Discovery",
          subheadline: "",
          benefits: [],
          description:
            "Task Contributors to locate any business, yours or otherwise, in a specific location so you don’t have to.",
        },
        {
          icon: "Location",
          title: "Location Verification",
          subheadline: "",
          benefits: [],
          description:
            "Using addresses, GPS or longitude and latitude to verify places or buildings are where they are reported to be.",
        },
        {
          icon: "Globe",
          title: "Hours and Offerings",
          subheadline: "",
          benefits: [],
          description:
            "Gather business hours of operation and their offerings quickly and easily, as well as any changes to them.",
        },
        {
          icon: "FileText",
          title: "Proximity Identification",
          benefits: [],
          description:
            "Understand the dynamic environments around your businesses or retail locations including surrounding stores, neighborhood, etc.",
        },
        {
          icon: "FileText",
          title: "Mapping",
          benefits: [],
          description:
            "Collect data to map a variety of different information on the ground including infrastructure (physical structures, electrification, etc.), access points, services, businesses and more.",
        },
        {
          icon: "FileText",
          title: "Site Selection",
          benefits: [],
          description:
            "Location discovery can also provide insight that can be helpful for determining new locations within a region.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "psychographic-target-group-analysis",
    name: "Psychographic Target Group Analysis",
    title: "Psychographic Target Group Analysis",
    description: "Gen Z or Millenials? Yoga lovers or CrossFit fans? Get a clear understanding of your target audience to create great products that they will actually need and love.",
    hero: {
      headline: "Psychographic Target Group Analysis",
      subheadline:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
      benefits: ["Gen Z or Millenials? Yoga lovers or CrossFit fans? Get a clear understanding of your target audience to create great products that they will actually need and love."],
      ctaPrimary: "Request a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Adipisicing elit consectetur",
      subtitle: "consectetur adipisicing elit consectetur adipisicing elit",
      items: [
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title:
        "Lorem ipsum Lorem ipsum Lorem ipsum",
      subtitle: "Geospatial Analytics",
      otherSubtitle: "",
      cases: [
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Ipsum",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Lorem",
          title: "Ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "psychographic-target-group-analysis",
    name: "Psychographic Target Group Analysis",
    title: "Psychographic Target Group Analysis",
    description: "Gen Z or Millenials? Yoga lovers or CrossFit fans? Get a clear understanding of your target audience to create great products that they will actually need and love.",
    hero: {
      headline: "Psychographic Target Group Analysis",
      subheadline:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
      benefits: ["Gen Z or Millenials? Yoga lovers or CrossFit fans? Get a clear understanding of your target audience to create great products that they will actually need and love."],
      ctaPrimary: "Request a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Adipisicing elit consectetur",
      subtitle: "consectetur adipisicing elit consectetur adipisicing elit",
      items: [
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title:
        "Lorem ipsum Lorem ipsum Lorem ipsum",
      subtitle: "Geospatial Analytics",
      otherSubtitle: "",
      cases: [
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Ipsum",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Lorem",
          title: "Ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "brand-tracking",
    name: "Brand tracking",
    title: "Brand tracking",
    description: "Don’t fly blind. Measure and track your brand's performance to stay on top of consumers' perceptions of you.",
    hero: {
      headline: "Brand tracking",
      subheadline:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
      benefits: ["Don’t fly blind. Measure and track your brand's performance to stay on top of consumers' perceptions of you."],
      ctaPrimary: "Request a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Adipisicing elit consectetur",
      subtitle: "consectetur adipisicing elit consectetur adipisicing elit",
      items: [
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title:
        "Lorem ipsum Lorem ipsum Lorem ipsum",
      subtitle: "Geospatial Analytics",
      otherSubtitle: "",
      cases: [
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Ipsum",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Lorem",
          title: "Ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "consumer-tracking",
    name: "Consumer tracking",
    title: "Consumer tracking",
    description: "Understand how consumers think and what drives their choices. From purchase frequency to product use, to drivers and barriers - we've got all the answers you need, in real time.",
    hero: {
      headline: "Consumer tracking",
      subheadline:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
      benefits: ["Understand how consumers think and what drives their choices. From purchase frequency to product use, to drivers and barriers - we've got all the answers you need, in real time."],
      ctaPrimary: "Request a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Adipisicing elit consectetur",
      subtitle: "consectetur adipisicing elit consectetur adipisicing elit",
      items: [
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title:
        "Lorem ipsum Lorem ipsum Lorem ipsum",
      subtitle: "Geospatial Analytics",
      otherSubtitle: "",
      cases: [
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Ipsum",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Lorem",
          title: "Ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "pricing-analysis",
    name: "Pricing analysis",
    title: "Pricing analysis",
    description: "Maximize profits by asking the right questions. How much are customers willing to spend on your product? What’s the optimal price point?",
    hero: {
      headline: "Pricing analysis",
      subheadline:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
      benefits: ["Maximize profits by asking the right questions. How much are customers willing to spend on your product? What’s the optimal price point?"],
      ctaPrimary: "Request a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Adipisicing elit consectetur",
      subtitle: "consectetur adipisicing elit consectetur adipisicing elit",
      items: [
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title:
        "Lorem ipsum Lorem ipsum Lorem ipsum",
      subtitle: "Geospatial Analytics",
      otherSubtitle: "",
      cases: [
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Ipsum",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Lorem",
          title: "Ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "visual-test",
    name: "Visual test",
    title: "Visual test",
    description: "Let consumers be your co-creators. Ask what they think about your new logo, website or packaging and create designs that truly speak to your audience.",
    hero: {
      headline: "Visual test",
      subheadline:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
      benefits: ["Let consumers be your co-creators. Ask what they think about your new logo, website or packaging and create designs that truly speak to your audience."],
      ctaPrimary: "Request a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Adipisicing elit consectetur",
      subtitle: "consectetur adipisicing elit consectetur adipisicing elit",
      items: [
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title:
        "Lorem ipsum Lorem ipsum Lorem ipsum",
      subtitle: "Geospatial Analytics",
      otherSubtitle: "",
      cases: [
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Ipsum",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Lorem",
          title: "Ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "campaign-tracking",
    name: "Campaign Tracking",
    title: "Campaign Tracking",
    description: "Knowing the reach and the click-through rate is great. But what's the real impact of your campaign on your brand?",
    hero: {
      headline: "Campaign Tracking",
      subheadline:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
      benefits: ["Knowing the reach and the click-through rate is great. But what's the real impact of your campaign on your brand?"],
      ctaPrimary: "Request a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Adipisicing elit consectetur",
      subtitle: "consectetur adipisicing elit consectetur adipisicing elit",
      items: [
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title:
        "Lorem ipsum Lorem ipsum Lorem ipsum",
      subtitle: "Geospatial Analytics",
      otherSubtitle: "",
      cases: [
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Ipsum",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Lorem",
          title: "Ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "media-testing",
    name: "Media Testing",
    title: "Media Testing",
    description: "Assess the effectiveness of your ads, messages, or creative components in engaging and impacting your target audience.",
    hero: {
      headline: "Media Testing",
      subheadline:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
      benefits: ["Assess the effectiveness of your ads, messages, or creative components in engaging and impacting your target audience."],
      ctaPrimary: "Request a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Adipisicing elit consectetur",
      subtitle: "consectetur adipisicing elit consectetur adipisicing elit",
      items: [
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title:
        "Lorem ipsum Lorem ipsum Lorem ipsum",
      subtitle: "Geospatial Analytics",
      otherSubtitle: "",
      cases: [
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Ipsum",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Lorem",
          title: "Ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "customer-satisfaction-analysis",
    name: "Customer Satisfaction Analysis",
    title: "Customer Satisfaction Analysis",
    description: "Actually knowing what your target group wants is the key to customer satisfaction. We help ask the right questions and understand what matters.",
    hero: {
      headline: "Customer Satisfaction Analysis",
      subheadline:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
      benefits: ["Actually knowing what your target group wants is the key to customer satisfaction. We help ask the right questions and understand what matters."],
      ctaPrimary: "Request a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Adipisicing elit consectetur",
      subtitle: "consectetur adipisicing elit consectetur adipisicing elit",
      items: [
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title:
        "Lorem ipsum Lorem ipsum Lorem ipsum",
      subtitle: "Geospatial Analytics",
      otherSubtitle: "",
      cases: [
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Ipsum",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Lorem",
          title: "Ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "product-development",
    name: "Product Development",
    title: "Product Development",
    description: "Harness the power of strategic product development to create, refine, and deliver solutions that resonate with your audience, setting your brand apart.",
    hero: {
      headline: "Product Development",
      subheadline:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
      benefits: ["Harness the power of strategic product development to create, refine, and deliver solutions that resonate with your audience, setting your brand apart."],
      ctaPrimary: "Request a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Adipisicing elit consectetur",
      subtitle: "consectetur adipisicing elit consectetur adipisicing elit",
      items: [
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title:
        "Lorem ipsum Lorem ipsum Lorem ipsum",
      subtitle: "Geospatial Analytics",
      otherSubtitle: "",
      cases: [
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Ipsum",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Lorem",
          title: "Ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "in-home-use-testing",
    name: "In-Home Use Testing (iHUT)",
    title: "In-Home Use Testing (iHUT)",
    description: "Identify how your product will perform in the hands (and homes) of real consumers. Determine moments of truth and key drivers in order to validate, iterate and launch with confidence.",
    hero: {
      headline: "In-Home Use Testing (iHUT)",
      subheadline:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
      benefits: ["Identify how your product will perform in the hands (and homes) of real consumers. Determine moments of truth and key drivers in order to validate, iterate and launch with confidence."],
      ctaPrimary: "Request a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Adipisicing elit consectetur",
      subtitle: "consectetur adipisicing elit consectetur adipisicing elit",
      items: [
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title:
        "Lorem ipsum Lorem ipsum Lorem ipsum",
      subtitle: "Geospatial Analytics",
      otherSubtitle: "",
      cases: [
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Ipsum",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Lorem",
          title: "Ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "media-testing",
    name: "Market analysis",
    title: "Market analysis",
    description: "Future-proof your decision-making and gain a competitive advantage through a comprehensive market analysis.",
    hero: {
      headline: "Market analysis",
      subheadline:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
      benefits: ["Future-proof your decision-making and gain a competitive advantage through a comprehensive market analysis."],
      ctaPrimary: "Request a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Adipisicing elit consectetur",
      subtitle: "consectetur adipisicing elit consectetur adipisicing elit",
      items: [
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur.",
        },
        {
          icon: "CheckCircle",
          title: "consectetur adipisicing elit",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus consequuntur obcaecati consectetur sint provident laudantium.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title:
        "Lorem ipsum Lorem ipsum Lorem ipsum",
      subtitle: "Geospatial Analytics",
      otherSubtitle: "",
      cases: [
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Ipsum",
          title: "Lorem ipsum dolor",
          subheadline: "",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum dolor",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate.",
        },
        {
          icon: "Lorem",
          title: "Ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione magni a est repellendus.",
        },
        {
          icon: "Lorem",
          title: "Lorem ipsum",
          benefits: [],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem assumenda, explicabo corrupti cumque ea sit, voluptate recusandae aperiam laborum ratione.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "international-development",
    name: "Public & Political Sector™",
    title: "Public & Political Sector™",
    description:
      "Access community data to enhance public programs and policies.",
    hero: {
      headline: "Data for Every Decision™",
      subheadline:
        "Traditional data collection is slow, costly, and limited in scope. Premise offers a new kind of data collection that allows agile, data-driven decision-making and puts local voices at the center of your data.",
      benefits: ["Actionable Insights for International Development"],
      ctaPrimary: "Talk to expert",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Our Solutions",
      subtitle:
        "Tada’s industry-specific solutions are built on a powerful data collection marketplace to provide rapid, accurate, and actionable data directly from our network of over six million survey panelists and auditors.Our specialized solutions are tailored to meet the data capture needs of the international development sector.",
      items: [
        {
          icon: "CheckCircle",
          title: "Audience Analysis for Social & Behavior Change",
          description:
            "Get the insights you need to design, test, implement, monitor, and evaluate social and behavior change activities.",
        },
        {
          icon: "Search",
          title: "Situation Analysis",
          description:
            "Monitor how country conditions and external factors impact what you fund, how interventions are implemented, and what impact they have.",
        },
        {
          icon: "CheckCircle",
          title: "Market Monitoring",
          description:
            "Collect product price and availability data tailored to the needs of humanitarian organizations, development donors, social enterprises, and economists.",
        },
      ],
    },
    howItWorks: {
      title: "Ai Powered",
      subtitle: "",
      steps: [],
    },
    useCases: {
      title: "The Advantage of Tada",
      subtitle: "Move Beyond the Limitations of Traditional Data Collection",
      otherSubtitle: "",
      cases: [
        {
          icon: "Search",
          title: "Actionable",
          subheadline: "",
          benefits: [],
          description:
            "A streamlined data lifecycle and automated insights generation makes it easy to understand what decision to make.",
        },
        {
          icon: "Globe",
          title: "Global",
          subheadline: "",
          benefits: [],
          description:
            "Our network of over 6 million survey panelists and auditors spans 140 countries, including in rural and fragile contexts.",
        },
        {
          icon: "Time",
          title: "Fast",
          subheadline: "",
          benefits: [],
          description:
            "Unlike with traditional data collection companies, you can watch your data come into a Premise dashboard in real time.",
        },
        {
          icon: "FileText",
          title: "Reliable",
          benefits: [],
          description:
            "Data quality control, information security, and data collection capabilities built on industry best practices and scientific standards.",
        },
      ],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "consumer-insights",
    name: "Consumer Insights",
    title: "Consumer Insights",
    description:
      "Leverage consumer insights to refine products and marketing strategies.",
    hero: {
      headline: "FMCG data for your company",
      subheadline:
        "Get FMCG insights you can trust: Tada delivers state of the art methods for your dynamic market. Whether it's testing new designs or tracking brand health, let us handle the heavy lifting while you drive innovation.",
      benefits: [],
      ctaPrimary: "Book a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "How Tada simplifies your journey",
      subtitle: "",
      items: [
        {
          icon: "CheckCircle",
          title: "Consumer-centric insights",
          description:
            "Tada offers flexible market research solutions tailored to your business, helping you make quick decisions and innovate even with limited time and resources.",
        },
        {
          icon: "CheckCircle",
          title: "Market dynamics analysis",
          description:
            "Tada's market research services give you important insights into competitor strategies and market trends, helping you stay competitive in product positioning and market dynamics.",
        },
        {
          icon: "CheckCircle",
          title: "Data-driven strategy",
          description:
            "With Tada, you benefit from unparalleled data quality and cost efficiency, empowering you to optimize research investments and make impactful decisions without compromise.",
        },
      ],
    },
    howItWorks: {
      title: "Discover methods for FMCG market research",
      subtitle:
        "Discover the most common use cases for data-driven decisions in the FMCG sector.",
      steps: [],
    },
    useCases: {
      title: "Discover methods for FMCG market research",
      subtitle:
        "Discover the most common use cases for data-driven decisions in the FMCG sector.",
      otherSubtitle: "",
      cases: [],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Take the Guesswork Out of Your Next Decision",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "consultancies",
    name: "Consultancies",
    title: "Consultancies",
    description:
      "Gather reliable insights quickly and easily, so you can deliver the answers your clients need.",
    hero: {
      headline:
        "Actionable consumer insights to win, deliver, and drive client success",
      subheadline:
        "At Tada, we help consultant teams gather reliable insights quickly and easily, so you can deliver the answers your clients need. With expert guidance at every stage of your project, you can stay on schedule without sacrificing on quality.",
      benefits: [],
      ctaPrimary: "Book a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title: "Save time and effort with our expert guidance",
      subtitle: "",
      items: [
        {
          icon: "CheckCircle",
          title: "Win pitches",
          description:
            "Increase your chances of winning new projects; we cover parts of your pitch survey costs.",
        },
        {
          icon: "CheckCircle",
          title: "Enhance client projects",
          description:
            "Get valuable primary data to simplify market analysis for your client projects.",
        },
        {
          icon: "CheckCircle",
          title: "Publish quality reports",
          description:
            "Ensure your publications, white-papers, and other PR efforts are backed with solid data.",
        },
        {
          icon: "CheckCircle",
          title: "Innovate your strategy",
          description:
            "Bring fresh perspectives to your workshops, speaking engagements, and beyond.",
        },
      ],
    },
    howItWorks: {
      title: "Discover methods for FMCG market research",
      subtitle:
        "Discover the most common use cases for data-driven decisions in the FMCG sector.",
      steps: [],
    },
    useCases: {
      title: "Global trends and consumer behavior at your fingertips",
      subtitle:
        "With our intuitive, AI-powered platform, Tada delivers real-time, actionable insights to keep you ahead of the curve. Use our express delivery option to get the data you need on tight timelines without sacrificing quality. Let Tada be your partner in delivering impactful insights for every consultancy project.",
      otherSubtitle: "",
      cases: [],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title:
        "Our AI-powered tech platform gives real-time & actionable insights",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
  {
    id: "agencies",
    name: "Agencies",
    title: "Agencies",
    description: "Equip your clients with actionable consumer insights.",
    hero: {
      headline: "Equip your clients with actionable consumer insights",
      subheadline:
        "At Tada, we help agency teams and their clients across every industry to answer the questions that matter most. With our advanced methodologies and cutting-edge technology powered by AI, gathering consumer insights has never been more efficient.",
      benefits: [],
      ctaPrimary: "Book a demo",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondary: "",
    },
    features: {
      title:
        "Research backed by expert guidance tailored to your business needs",
      subtitle: "",
      items: [
        {
          icon: "CheckCircle",
          title: "Win pitches",
          description:
            "Win the projects you are going after. We cover parts of your pitch survey costs to increase your likelihood of winning.",
        },
        {
          icon: "CheckCircle",
          title: "Target Group Analysis",
          description:
            "Uncover the target audience's motivations, attitudes, and messaging preferences to help your client build deeper connections.",
        },
        {
          icon: "CheckCircle",
          title: "Pre-testing",
          description:
            "Which creative performs best, is most understandable, or truly memorable? You have the gut feeling, we have the data.",
        },
        {
          icon: "CheckCircle",
          title: "Tracking",
          description:
            "Track brand performance, trends, and campaigns in real time, with competitor benchmarking to help your client optimize strategies and drive results.",
        },
      ],
    },
    howItWorks: {
      title: "Discover methods for FMCG market research",
      subtitle:
        "Discover the most common use cases for data-driven decisions in the FMCG sector.",
      steps: [],
    },
    useCases: {
      title: "Access to real time insights",
      subtitle:
        "Whether you need insights from niche and B2B audiences or representative consumer samples, Tada connects you to real-world representation across 190+ markets, capturing authentic consumer voices globally that bring your research to life. Let Tada be your partner in delivering impactful results for each of your client’s projects.",
      otherSubtitle: "",
      cases: [],
    },
    testimonials: {
      title: "What our customers say",
      subtitle:
        "See how companies worldwide are using Market Research to drive strategic decisions.",
      items: [
        {
          name: "Jennifer Walsh",
          role: "Head of Market Research",
          company: "Consumer Brands Co",
          image:
            "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The market intelligence we get from Premise has transformed our strategic planning. We now make decisions based on real-time global data.",
          rating: 5,
        },
        {
          name: "Robert Chen",
          role: "VP of Strategy",
          company: "Global Ventures",
          image:
            "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The consumer insights have been invaluable for our product development. We've reduced time-to-market by 40% with better market understanding.",
          rating: 5,
        },
        {
          name: "Maria Gonzalez",
          role: "Brand Manager",
          company: "Lifestyle Brands",
          image:
            "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
          content:
            "The competitive intelligence helps us stay ahead of market trends. Our brand positioning has never been more strategic and effective.",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Our AI-powered tech platform gives real-time consumer insights",
      subtitle: "",
      primaryButton: "Request Demo",
      secondaryButton: "Contact Sales",
      ctaPrimaryLink: "/schedule-demo",
      ctaSecondaryLink: "/contact",
    },
  },
];

export const featuresByIndustry = [
  {
    id: "1",
    industry: "Consumer Brands",
    title: "Consumer Insights",
    description:
      "Leverage consumer insights to refine products and marketing strategies.",
    image: "/images/consumer-insights.jpg", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/industry/consumer-insights",
  },
  {
    id: "2",
    industry: "Public & Political Sector",
    title: "Public & Political Sector",
    description:
      "Access community data to enhance public programs and policies.",
    image: "/images/international-development.jpg", // "https://ext.same-assets.com/829373065/3565711189.svg",
    link: "/solutions/industry/international-development",
  },
  {
    id: "3",
    industry: "Consultancies",
    title: "Consultancies",
    description:
      "Gather reliable insights quickly and easily, so you can deliver the answers your clients need.",
    image: "/images/consultancies.jpg", // "https://ext.same-assets.com/829373065/2858633470.svg",
    link: "/solutions/industry/consultancies",
  },
  {
    id: "4",
    industry: "Agencies",
    title: "Agencies",
    description: "Equip your clients with actionable consumer insights.",
    image: "/images/agencies.jpg", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/industry/agencies",
  },
];

export const featuresByUseCase = [
  // FMCG
  {
    id: "1",
    category: "FMCG",
    title: "Availability Tracker",
    description:
      "Monitor product availability across markets to optimize supply chains.",
    image: "/images/pulse.png",
    link: "/solutions/use-case/availability-tracker",
  },
  {
    id: "2",
    category: "FMCG",
    title: "Rolling Retail Census",
    description:
      "Continuously gather data on retail environments for informed decision-making.",
    image: "/images/shopping-bag.png", // "https://ext.same-assets.com/829373065/3565711189.svg",
    link: "/solutions/use-case/rolling-retail-census",
  },
  {
    id: "4",
    category: "FMCG",
    title: "Qualitative Insights",
    description:
      "Dive deep into consumer sentiments with qualitative data analysis.",
    image: "/images/chart-trend.png", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/use-case/ai-qualitative-insights-platform",
  },
  {
    id: "3",
    category: "FMCG",
    title: "Geospatial Analytics",
    description: "Utilize location-based data for strategic planning",
    image: "/images/chart-network.png", // "https://ext.same-assets.com/829373065/2858633470.svg",
    link: "/solutions/use-case/geospatial-analytics",
  },

  //Not found
  {
    id: "5",
    category: "Public",
    title: "Psychographic Target Group Analysis",
    description:
      "Gen Z or Millenials? Yoga lovers or CrossFit fans? Get a clear understanding of your target audience to create great products that they will actually need and love.",
    image: "/images/chart-bubble.png", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/use-case/psychographic-target-group-analysis",
  },
  {
    id: "6",
    category: "Public",
    title: "Brand tracking",
    description:
      "Don’t fly blind. Measure and track your brand's performance to stay on top of consumers' perceptions of you.",
    image: "/images/radar.png", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/use-case/brand-tracking",
  },
  {
    id: "7",
    category: "Public",
    title: "Consumer tracking",
    description:
      "Understand how consumers think and what drives their choices. From purchase frequency to product use, to drivers and barriers - we've got all the answers you need, in real time.",
    image: "/images/footsteps.png", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/use-case/consumer-tracking",
  },
  {
    id: "8",
    category: "Public",
    title: "Pricing analysis",
    description:
      "Maximize profits by asking the right questions. How much are customers willing to spend on your product? What’s the optimal price point?",
    image: "/images/chart-spline.png", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/use-case/pricing-analysis",
  },

  {
    id: "9",
    category: "Public",
    title: "Visual test",
    description:
      "Let consumers be your co-creators. Ask what they think about your new logo, website or packaging and create designs that truly speak to your audience.",
    image: "/images/message-circle-image.png", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/use-case/visual-test",
  },

  {
    id: "10",
    category: "Consultancies",
    title: "Campaign tracking",
    description:
      "Knowing the reach and the click-through rate is great. But what's the real impact of your campaign on your brand?",
    image: "/images/tachometer.png", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/use-case/campaign-tracking",
  },

  {
    id: "11",
    category: "Consultancies",
    title: "Media Testing",
    description:
      "Assess the effectiveness of your ads, messages, or creative components in engaging and impacting your target audience.",
    image: "/images/newspaper.png", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/use-case/media-testing",
  },
  {
    id: "12",
    category: "Consultancies",
    title: "Customer satisfaction analysis",
    description:
      "Actually knowing what your target group wants is the key to customer satisfaction. We help ask the right questions and understand what matters.",
    image: "/images/meh-alt.png", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/use-case/customer-satisfaction-analysis",
  },
  {
    id: "13",
    category: "Consultancies",
    title: "Product development",
    description:
      "Harness the power of strategic product development to create, refine, and deliver solutions that resonate with your audience, setting your brand apart.",
    image: "/images/git-branch.png", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/use-case/product-development",
  },
  {
    id: "14",
    category: "Consultancies",
    title: "In-Home Use Testing (iHUT)",
    description:
      "Identify how your product will perform in the hands (and homes) of real consumers. Determine moments of truth and key drivers in order to validate, iterate and launch with confidence.",
    image: "/images/vial.png", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/use-case/in-home-use-testing",
  },
  {
    id: "15",
    category: "Consultancies",
    title: "Market analysis",
    description:
      "Future-proof your decision-making and gain a competitive advantage through a comprehensive market analysis.",
    image: "/images/trending-down.png", // "https://ext.same-assets.com/829373065/2194203648.svg",
    link: "/solutions/use-case/media-testing",
  },
];

export const getSolutionById = (id: string): Solution | undefined => {
  return solutions.find((solution) => solution.id === id);
};

export const getAllSolutions = (): Solution[] => {
  return solutions;
};
