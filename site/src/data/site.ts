import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  Calculator,
  CalendarDays,
  ClipboardList,
  FileText,
  GraduationCap,
  Globe,
  Headphones,
  LayoutTemplate,
  Lightbulb,
  Mail,
  Megaphone,
  MessageCircle,
  Monitor,
  PenTool,
  Phone,
  Radio,
  Rocket,
  Sparkles,
  Users,
} from 'lucide-react'

/* ------------------------------------------------------------------
   Contact + links
   Every button that points at one of these updates when the value changes.
------------------------------------------------------------------- */

export const contact = {
  email: 'hello@mpeh.co.za',
  eventsEmail: 'events@mpeh.co.za',
  flowEmail: 'flow@mpeh.co.za',
  mentorEmail: 'lucretia@mpeh.co.za',
  phone: '+27 81 518 2971',
  phoneHref: 'tel:+27815182971',
  whatsappHref: 'https://wa.me/27815182971',
  location: 'Mitchells Plain, Cape Town',
}

export const social = {
  facebook: 'https://www.facebook.com/mitchellsplainentrepreneurshub/',
  instagram: 'https://www.instagram.com/mitchellsplainentrepreneurshub',
  linkedin: 'https://www.linkedin.com/company/mitchells-plain-entrepreneurs-hub/',
  facebookGroup: 'https://www.facebook.com/groups/1245535659299414/',
  messenger: 'https://www.messenger.com/cm/AbbercAVdPSqs01q/?send_source=cm%3Acopy_invite_link', // community chat invite
}

export const externalLinks = {
  vendorForm: 'https://docs.google.com/forms/d/e/1FAIpQLSe8S-hWAvfe8E2XzqXP-8NsBg1dB7TzeA3Uq7HQZMMh3Y1emg/viewform', // Google Form — vendor registration
  mailingList: 'https://mpeh.kit.com/', // Kit (ConvertKit) sign-up page — newsletter & mailing list
  technovation: 'https://www.technovation.org/',
  technovationChallenge: 'https://technovationchallenge.org/',
  womenTechmakers: 'https://www.technovation.org/women-techmakers',
  womenTechmakersJoin: 'https://mailchi.mp/technovation/subscribe-to-the-women-techmakers-community',
}

/* ------------------------------------------------------------------
   Navigation
------------------------------------------------------------------- */

export type NavLeaf = { label: string; to: string; description?: string; icon?: LucideIcon }
export type NavGroup = { label: string; items: NavLeaf[] }
export type NavEntry = NavLeaf | NavGroup

export const isGroup = (e: NavEntry): e is NavGroup => 'items' in e

export const nav: NavEntry[] = [
  { label: 'About', to: '/about' },
  { label: 'Events', to: '/events' },
  {
    label: 'Services',
    items: [
      { label: 'Business Services', to: '/services/business', description: 'Support for entrepreneurs', icon: Briefcase },
      { label: 'VA Services', to: '/services/virtual-assistant', description: 'Virtual assistant packages', icon: ClipboardList },
      { label: 'Marketing', to: '/services/marketing', description: 'Social media & digital marketing', icon: Megaphone },
      { label: 'Flow BPO', to: '/services/flow-bpo', description: 'Call centre & outsourcing', icon: Headphones },
    ],
  },
  {
    label: 'Programmes',
    items: [
      { label: 'Courses', to: '/programmes/courses', description: 'Skills training & workshops', icon: BookOpen },
      { label: 'Technovation', to: '/programmes/technovation', description: 'Girls & women in tech', icon: GraduationCap },
    ],
  },
  {
    label: 'Media',
    items: [{ label: 'Blog', to: '/blog', description: 'News & articles', icon: FileText }],
  },
  { label: 'Partners', to: '/partners' },
  { label: 'Resources', to: '/resources' },
]

export const footerLinks = {
  quick: [
    { label: 'About Us', to: '/about' },
    { label: 'Events', to: '/events' },
    { label: 'Business Services', to: '/services/business' },
    { label: 'VA Services', to: '/services/virtual-assistant' },
    { label: 'Digital Marketing', to: '/services/marketing' },
    { label: 'Flow BPO', to: '/services/flow-bpo' },
    { label: 'Courses', to: '/programmes/courses' },
  ],
  resources: [
    { label: 'Blog', to: '/blog' },
    { label: 'Free Downloads', to: '/resources' },
    { label: 'Technovation Girls', to: '/programmes/technovation' },
    { label: 'Partners', to: '/partners' },
    { label: 'Contact', to: '/contact' },
  ],
}

/* ------------------------------------------------------------------
   Home
------------------------------------------------------------------- */

export const highlights = [
  'Business registration support',
  'Digital marketing services',
  'Monthly market opportunities',
  'Free resources & guides',
  'Community networking',
  'Skills development courses',
]

export const helpTiles: { title: string; sub: string; to: string; icon: LucideIcon }[] = [
  { title: 'Events', sub: 'Markets & opportunities', to: '/events', icon: CalendarDays },
  { title: 'Business Services', sub: 'Registration & compliance', to: '/services/business', icon: Briefcase },
  { title: 'Digital Marketing', sub: 'Grow your brand online', to: '/services/marketing', icon: Megaphone },
  { title: 'Courses', sub: 'Learn new skills', to: '/programmes/courses', icon: BookOpen },
  { title: 'Technovation Girls', sub: 'Empower young girls', to: '/programmes/technovation', icon: Users },
  { title: 'Blog', sub: 'Tips & insights', to: '/blog', icon: FileText },
  { title: 'Contact', sub: 'Get in touch', to: '/contact', icon: Mail },
]

/* ------------------------------------------------------------------
   About
------------------------------------------------------------------- */

export const whatWeDo: { text: string; icon: LucideIcon }[] = [
  { text: 'Support local entrepreneurs and small businesses', icon: Users },
  { text: 'Host markets, events and community activations', icon: CalendarDays },
  { text: 'Provide business and digital marketing services', icon: Briefcase },
  { text: 'Offer practical courses and resources', icon: BookOpen },
  { text: 'Promote youth innovation and skills development', icon: Sparkles },
  { text: 'Create visibility and opportunities for local brands', icon: Megaphone },
]

export const founder = {
  name: 'Lucretia Jardini',
  role: 'Founder',
  image: '/images/founder.webp',
}

/* ------------------------------------------------------------------
   Events
------------------------------------------------------------------- */

export type Market = { name: string; date: string; theme: string }

export const markets2026: Market[] = [
  { name: 'New Beginnings Market', date: '2026-01-31', theme: 'Start the year fresh with new opportunities' },
  { name: 'Love Local Market', date: '2026-02-28', theme: 'Celebrate local love and support' },
  { name: 'Golden Heritage Festival', date: '2026-03-28', theme: '50th Anniversary Celebration' },
  { name: 'Wellness Through the Years', date: '2026-04-25', theme: 'Health and wellness focus' },
  { name: 'Mothers & Makers Market', date: '2026-05-30', theme: 'Celebrating mothers and creators' },
  { name: 'Winter Warmth Market', date: '2026-06-27', theme: 'Cozy winter offerings' },
  { name: 'Festival of Flavours', date: '2026-07-25', theme: 'Food and culinary delights' },
  { name: 'Women In Business', date: '2026-08-29', theme: 'Celebrating women entrepreneurs' },
  { name: 'Spring of Innovation & Youth Market', date: '2026-09-26', theme: 'Youth and innovation focus' },
  { name: 'Arts, Crafts & Heritage Creations', date: '2026-10-31', theme: 'Celebrating local artisans' },
  { name: 'Community Heroes & Entrepreneurs Celebration', date: '2026-11-28', theme: 'Honoring community leaders' },
  { name: 'Summer & Homecoming Market', date: '2026-12-19', theme: 'Festive homecoming celebrations' },
]

/* ------------------------------------------------------------------
   Services
------------------------------------------------------------------- */

export type Offer = { title: string; text: string; icon: LucideIcon }

export const businessServices: Offer[] = [
  { title: 'Business Registrations', text: 'Register your Pty Ltd, NPO, or NPC with CIPC. We handle all the paperwork and ensure compliance.', icon: Building2 },
  { title: 'Annual Returns', text: 'Stay compliant with CIPC by submitting your annual returns on time. We manage the entire process.', icon: FileText },
  { title: 'Tax Compliance Support', text: 'Get help with SARS registration, tax returns, and ensuring your business is tax compliant.', icon: Calculator },
  { title: 'Business Plan Writing', text: 'Professional business plans for funding applications, investors, or strategic planning.', icon: Lightbulb },
  { title: 'Startup Support', text: 'Comprehensive support for new businesses including mentorship, strategy, and resources.', icon: Rocket },
  { title: 'Website Development', text: 'Professional, mobile-friendly websites to establish your online presence and attract customers.', icon: Globe },
]

export const whyChoose = [
  'Local experts who understand Cape Town businesses',
  'Affordable pricing for small businesses',
  'Quick turnaround times',
  'Ongoing support and guidance',
]

export type Plan = {
  name: string
  price: string
  unit: string
  hours?: string
  bestFor?: string
  features: string[]
  popular?: boolean
}

export const vaPlans: Plan[] = [
  {
    name: 'Essential VA Package',
    price: 'R1,500',
    unit: '/month',
    hours: '10 hours of VA support',
    bestFor: 'Solopreneurs & small startups needing light admin support.',
    features: ['10 hours of VA support', 'Email management', 'Appointment scheduling', 'Basic data entry', 'Social media post scheduling (1 per week)'],
  },
  {
    name: 'Growth VA Package',
    price: 'R3,000',
    unit: '/month',
    hours: '20 hours of VA support',
    bestFor: 'Growing businesses needing more admin & social media support.',
    popular: true,
    features: [
      '20 hours of VA support',
      'Everything in Essential +',
      'Invoicing & follow-ups',
      'Social media engagement (replying to comments/messages)',
      'Research (competitors, suppliers, trends)',
      'Basic graphic design (Canva templates)',
    ],
  },
  {
    name: 'Premium VA Package',
    price: 'R5,500',
    unit: '/month',
    hours: '40 hours of VA support',
    bestFor: 'Established businesses needing full support.',
    features: [
      '40 hours of VA support',
      'Everything in Growth +',
      'Customer service (calls & emails)',
      'CRM management',
      'Advanced graphic design & content creation',
      'Monthly reports & analytics',
    ],
  },
]

export const vaAddOns = [
  { name: 'Extra VA hours', price: 'R180/hour' },
  { name: 'Website updates & blog posting', price: 'R500/month' },
  { name: 'Social media content creation', price: 'R1,000/month' },
]

export const marketingServices: Offer[] = [
  { title: 'Social Media Management', text: 'Complete management of your Facebook, Instagram, TikTok, and LinkedIn presence.', icon: Users },
  { title: 'WhatsApp Marketing', text: 'Set up WhatsApp Business, catalogs, broadcast lists, and automated responses.', icon: MessageCircle },
  { title: 'Content Creation', text: 'Eye-catching graphics, videos, and copy that engages your audience.', icon: PenTool },
  { title: 'Email Marketing', text: 'Newsletter setup, email campaigns, and automated sequences.', icon: Mail },
  { title: 'Landing Pages', text: 'High-converting landing pages for promotions, products, and lead generation.', icon: LayoutTemplate },
  { title: 'Analytics & Reporting', text: 'Track your growth with detailed reports and actionable insights.', icon: BarChart3 },
]

export const smmPlans: Plan[] = [
  { name: 'Startup', price: 'R1,500', unit: '/month', features: ['3 posts per week', 'Facebook & Instagram', 'Visual designs', 'Captions & hashtags'] },
  { name: 'Growth', price: 'R2,800', unit: '/month', popular: true, features: ['5 posts per week', 'Facebook, Instagram & LinkedIn', 'Visual designs', 'Captions & hashtags'] },
  { name: 'Premium', price: 'R4,500', unit: '/month', features: ['7 posts per week', 'Facebook, Instagram, LinkedIn & Twitter', 'Visual designs', 'Captions & hashtags'] },
]

export const adPlans = [
  { name: 'Ad Setup & Management', price: 'R1,200', unit: '/campaign', text: 'Facebook & Instagram ad setup and management (excludes ad budget).' },
  { name: 'Monthly Ad Management', price: 'R3,500', unit: '/month', text: 'Includes optimized targeting and performance tracking.' },
]

export const flowOffers: Offer[] = [
  { title: 'Customer Support', text: 'Professional customer service representatives to handle your client inquiries.', icon: Headphones },
  { title: 'Call Handling', text: 'Inbound and outbound call management for your business operations.', icon: Phone },
  { title: 'Admin Assistance', text: 'Administrative support to keep your business running smoothly.', icon: ClipboardList },
  { title: 'Virtual Operations', text: 'Remote operational support tailored to your business needs.', icon: Monitor },
]

/* ------------------------------------------------------------------
   Programmes
------------------------------------------------------------------- */

export type CourseStatus = 'Limited spots' | 'Starting soon' | 'Available' | 'Waitlist' | 'Coming soon'

export const courses: { title: string; text: string; duration: string; level: string; status: CourseStatus }[] = [
  { title: 'Business Basics 101', text: 'Learn the fundamentals of starting and running a business, from registration to daily operations.', duration: '4 weeks', level: 'Beginner', status: 'Limited spots' },
  { title: 'Social Media Marketing Mastery', text: 'Master Facebook, Instagram, and TikTok marketing to grow your audience and sales.', duration: '6 weeks', level: 'All levels', status: 'Starting soon' },
  { title: 'WhatsApp Business Bootcamp', text: 'Turn WhatsApp into a powerful sales tool with catalogs, automation, and broadcast strategies.', duration: '2 weeks', level: 'Beginner', status: 'Available' },
  { title: 'Financial Management for Entrepreneurs', text: 'Understand cash flow, pricing, bookkeeping, and tax basics for small businesses.', duration: '4 weeks', level: 'Intermediate', status: 'Waitlist' },
  { title: 'Digital Tools for Business', text: 'Learn Canva, Google Workspace, and other essential tools to run your business efficiently.', duration: '3 weeks', level: 'Beginner', status: 'Available' },
  { title: 'E-commerce Essentials', text: 'Set up your online store and learn how to sell products through digital platforms.', duration: '5 weeks', level: 'Intermediate', status: 'Coming soon' },
]

export const technovationPillars: Offer[] = [
  { title: 'Global Programme', text: 'Global tech education programme for girls and youth focused on real-world solutions.', icon: Users },
  { title: 'Problem-Solving', text: 'Focus on problem-solving, entrepreneurship, and leadership skills development.', icon: Lightbulb },
  { title: 'Community Learning', text: 'Community-based learning and mentorship from experienced professionals.', icon: GraduationCap },
]

/* ------------------------------------------------------------------
   Media
------------------------------------------------------------------- */

export type BlogCategory = 'Business Tips' | 'Marketing Hacks' | 'Local Stories'

export const blogCategories: BlogCategory[] = ['Business Tips', 'Marketing Hacks', 'Local Stories']

export const posts: {
  title: string
  excerpt: string
  category: BlogCategory
  date: string
  read: string
  image: string
  url: string
}[] = [
  {
    title: 'Mitchells Plain Prepares for a Vibrant 50th Anniversary Celebration',
    excerpt: 'The community gears up for an exciting year of celebrations marking 50 years of Mitchells Plain.',
    category: 'Local Stories',
    date: '2025-11-12',
    read: '4 min read',
    image: '/images/blog-anniversary.webp',
    url: 'https://plainsman.co.za/news/2025-11-12-mitchell-s-plain-prepares-for-a-vibrant-50th-anniversary-celebration/',
  },
  {
    title: 'Awards for Community Workers',
    excerpt: 'Recognizing the dedicated community workers making a difference in Mitchells Plain.',
    category: 'Local Stories',
    date: '2024-06-18',
    read: '5 min read',
    image: '/images/blog-awards.webp',
    url: 'https://plainsman.co.za/news/2024-06-18-awards-for-community-workers/',
  },
  {
    title: 'Entrepreneurs Unpack Social Media',
    excerpt: 'Local entrepreneurs share insights on leveraging social media for business growth.',
    category: 'Marketing Hacks',
    date: '2023-04-19',
    read: '6 min read',
    image: '/images/blog-social-media.webp',
    url: 'https://plainsman.co.za/news/2023-04-19-entrepreneurs-unpack-social-media/',
  },
  {
    title: 'Plain Entrepreneurs Share Their Stories',
    excerpt: 'Inspiring stories from entrepreneurs in Mitchells Plain on their journey to success.',
    category: 'Local Stories',
    date: '2022-11-23',
    read: '7 min read',
    image: '/images/blog-stories.webp',
    url: 'https://plainsman.co.za/news/2022-11-23-plain-entrepreneurs-share-their-stories/',
  },
]

/* ------------------------------------------------------------------
   Partners + resources
------------------------------------------------------------------- */

export const partners: { name: string; role: string; icon: LucideIcon }[] = [
  { name: 'Ward 81', role: 'Community & Economic Growth Support', icon: Building2 },
  { name: 'TS Accelerate', role: 'Accounting & Business Growth Partner', icon: Calculator },
  { name: 'The Olive Exchange', role: 'Media & Public Relations Partner', icon: Radio },
]

export const resources: {
  title: string
  text: string
  meta: string
  icon: LucideIcon
  href?: string // PDF in site/public/downloads (copied from /assets)
}[] = [
  {
    title: 'The MPEH AI Business Bestie Starter Kit',
    text: "You don't need to have it all figured out to start. The MPEH AI Business Bestie Starter Kit helps everyday entrepreneurs use AI in a simple, practical way — without tech overwhelm.",
    meta: 'PDF Guide • 3.4 MB',
    icon: Bot,
    href: '/downloads/The-MPEH-AI-Business-Bestie-Starter-Kit.pdf',
  },
  {
    title: 'WhatsApp Business Profit Booster',
    text: 'A comprehensive guide to turning your WhatsApp into a powerful sales tool. Includes templates, scripts, and strategies.',
    meta: 'PDF Guide • 1.1 MB',
    icon: Sparkles,
    href: '/downloads/WhatsApp-Business-Profit-Booster.pdf',
  },
  {
    title: 'R150 Marketing Plan Template',
    text: 'Start marketing your business for under R150/month. A practical plan with tools, tactics, and a weekly schedule.',
    meta: 'PDF Template • 1.8 MB',
    icon: FileText,
  },
]

export const comingSoon = [
  'Business Registration Checklist',
  'Social Media Content Calendar',
  'Pricing Calculator Spreadsheet',
  'Customer Feedback Templates',
]

export const contactSubjects = [
  { value: 'general', label: 'General enquiry' },
  { value: 'business', label: 'Business services' },
  { value: 'va', label: 'Virtual assistant services' },
  { value: 'marketing', label: 'Digital marketing' },
  { value: 'flow', label: 'Flow BPO' },
  { value: 'vendor', label: 'Events & vendor stalls' },
  { value: 'courses', label: 'Courses & training' },
  { value: 'technovation', label: 'Technovation & mentoring' },
  { value: 'partnership', label: 'Partnerships' },
  { value: 'newsletter', label: 'Newsletter & mailing list' },
]

