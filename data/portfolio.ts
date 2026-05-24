import type {
  PersonalInfo,
  SkillGroup,
  ExperienceItem,
  Project,
  EducationItem,
  Certification,
  NavLink,
} from '@/types'

export const personal: PersonalInfo = {
  name:       'Sathyapal Reddy Peddakkagari',
  shortName:  'Sathyapal Reddy',
  initials:   'SP',
  title:      'AI Data Engineer',
  university: 'George Mason University',
  gpa:        '3.96',
  location:   'Fairfax, VA',
  email:      'sathyapalpeddakkagari@gmail.com',
  phone:      '+1 (571) 337-0184',
  github:     'https://github.com/sathyapalreddypeddakkagari',
  linkedin:   'https://www.linkedin.com/in/sathyapalreddy-peddakkagari-14789b1a5/',
  resume:     'https://drive.google.com/file/d/1LN14ll4FYQfIG1g_NRus8FhEkBC-tirv/view?usp=sharing',
  bio: [
    "I'm an AI Data Engineer who builds production-grade data systems that ship intelligence — not just dashboards. I design end-to-end pipelines on AWS and Databricks, then layer LLMs, RAG, and ML models on top so data actually drives decisions.",
    "Proven impact at scale: reduced API latency by 40%, supported a 200% increase in query throughput at Virtusa, and built an FDA regulatory AI platform combining OCR, RAG, and python-docx generation for Precise Software Solutions.",
  ],
}

export const typingPhrases: string[] = [
  'AI Data Engineer',
  'GenAI & RAG Engineer',
  'Cloud Data Pipeline Architect',
  'ML Platform Engineer',
  'Open to AI Data Engineer Roles',
]

export const navLinks: NavLink[] = [
  { label: 'About',        href: '#about'        },
  { label: 'Skills',       href: '#skills'       },
  { label: 'Experience',   href: '#experience'   },
  { label: 'Projects',     href: '#projects'     },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact',      href: '#contact'      },
]

export const skills: SkillGroup[] = [
  {
    icon:  '☁️',
    label: 'Cloud & Data Engineering',
    color: 'sky',
    items: ['AWS S3','AWS RDS','AWS Redshift','AWS Lambda','AWS EMR','AWS Glue',
            'AWS DataBrew','AWS CloudWatch','Step Functions','Terraform',
            'Databricks','Snowflake','PySpark','Apache Spark','Hadoop','Hive','Kafka'],
  },
  {
    icon:  '🧠',
    label: 'AI / ML & GenAI',
    color: 'violet',
    items: ['LLMs','LangChain','Hugging Face','RAG','Vector Databases','FAISS',
            'BERT','ELECTRA','LLaMA 3.3','Google Gemini','Scikit-learn','LightGBM',
            'SHAP','NLTK','spaCy'],
  },
  {
    icon:  '🗄️',
    label: 'Databases & Modeling',
    color: 'amber',
    items: ['PostgreSQL','MSSQL','SQL Server','MongoDB','Vector DBs','Data Modeling',
            'Database Administration','Query Optimization','Indexing Strategies'],
  },
  {
    icon:  '💻',
    label: 'Languages & Backend',
    color: 'rose',
    items: ['Python','Scala','Java','R','TypeScript','SQL','FastAPI','Next.js',
            'ReactJS','HTML','CSS','JavaScript'],
  },
  {
    icon:  '🛠️',
    label: 'DevOps & Tooling',
    color: 'emerald',
    items: ['Docker','GitHub Actions','CI/CD','PyMuPDF','Tesseract OCR','python-docx',
            'Cursor','Claude Code','Jupyter','VS Code','Power BI','Streamlit'],
  },
]

export const experience: ExperienceItem[] = [
  {
    role:    'AI Operations Analyst',
    company: 'Precise Software Solutions, Inc.',
    type:    'Capstone Project',
    period:  'Jan 2026 — Present',
    active:  true,
    project: 'Smart Inspections — FDA Form 483 AI Drafting Platform',
    icon:    'fa-solid fa-microscope',
    bullets: [
      'Built an end-to-end AI-assisted FDA Form 483 drafting platform on AWS — uploads stored in S3, infrastructure provisioned via Terraform for secure, compliant deployments.',
      'Implemented OCR pipeline (PyMuPDF + Tesseract) for handwritten and typed notes; integrated LangChain + Google Gemini to generate draft observations with 21 CFR citations and evidence.',
      'Designed a RAG (Retrieval-Augmented Generation) system over FDA guidance PDFs using FAISS vector search, plus a Title 21 CFR citation service for matching and validating regulatory references.',
      'Shipped a document-generation pipeline (python-docx) producing FDA Form 483 and EIR .docx files in official format, integrated into a GitHub Actions CI/CD workflow.',
    ],
    tags: ['Python','FastAPI','TypeScript','LangChain','PostgreSQL','Next.js',
           'Google Gemini','FAISS','PyMuPDF','Tesseract','python-docx','AWS S3','Terraform'],
  },
  {
    role:    'Data Engineer Intern',
    company: 'Virtusa',
    type:    'Internship',
    period:  'Jun 2023 — Oct 2023',
    active:  false,
    icon:    'fa-solid fa-database',
    bullets: [
      'Scaled real-time data processing pipelines with Scala, AWS Lambda, Apache Spark, and Kafka — supporting a 200% increase in SQL Server query throughput for user-acquisition tracking.',
      'Migrated on-prem databases to AWS RDS Multi-AZ with high-availability data modeling; used statistical analysis of system metrics to drive performance and uptime for critical growth operations.',
      'Optimized SQL performance via advanced indexing and query restructuring; monitored with AWS CloudWatch — cutting API latency by 40%and accelerating product development cycles.',
      'Automated infrastructure with AWS Step Functions, EMR, and Terraform; configured MongoDB and A/B-experiment analysis frameworks within data pipelines to validate model accuracy and data integrity.',
    ],
    tags: ['Scala','AWS Lambda','Apache Spark','Kafka','AWS RDS','MongoDB',
           'Step Functions','AWS EMR','Terraform','AWS CloudWatch','SQL Server'],
  },
]

export const projects: Project[] = [
  {
    title:    'Smart Inspections',
    org:      'Precise Software Solutions, Inc.',
    period:   'Jan 2026',
    featured: true,
    badges:   ['Capstone', 'RAG Pipeline', 'FDA Regulatory AI', 'OCR + LLM'],
    desc:     'End-to-end AI-assisted FDA Form 483 drafting platform on AWS — OCR (PyMuPDF, Tesseract) for handwritten + typed inspection notes, LangChain + Google Gemini for draft generation with 21 CFR citations, RAG over FDA guidance PDFs (FAISS), and python-docx generation matching official format. Wired into GitHub Actions CI/CD; Terraform-provisioned infrastructure.',
    stats: [
      { val: 'RAG',    label: 'FAISS Vector Search' },
      { val: '21 CFR', label: 'Citation Validation' },
      { val: 'OCR',    label: 'Handwritten + Typed' },
    ],
    tags:   ['Python','FastAPI','LangChain','Next.js','Google Gemini','FAISS','PostgreSQL','Tesseract','python-docx','AWS S3','Terraform'],
    github: 'https://github.com/eshwaranish-varma/Smart-inspections',
    demo:   'https://qibk1k655lpvklywco4r50ba.177.7.42.159.sslip.io/',
  },
  {
    title:    'ReadmitAI',
    period:   'Nov 2025',
    featured: false,
    badges:   ['ML on Spark', 'Clinical AI', 'CI/CD'],
    desc:     'Diabetes hospital-readmission prediction at scale — processed 101,766 inpatient records on Databricks + AWS EMR with PySpark (ICD-9 grouping, patient-level splitting, imputation, scaling, SMOTE). Trained Logistic Regression, Random Forest, XGBoost, and LightGBM; deployed the winning LightGBM model via CI/CD to AWS Lambda for real-time risk stratification. SHAP explainability surfaces top clinical predictors.',
    stats: [
      { val: '0.852', label: 'ROC-AUC Score', accent: true },
      { val: '101K+', label: 'Records (Spark)' },
      { val: 'SHAP',  label: 'Explainability' },
    ],
    tags:   ['Python','PySpark','Databricks','AWS EMR','LightGBM','SHAP','AWS Lambda','Power BI','Streamlit'],
    github: 'https://github.com/sathyapalreddypeddakkagari/transparent-ai-diabetes-readmission',
    demo:   'https://transparent-ai-diabetes-readmission-bbciaodwnxuyg6xj53ae6s.streamlit.app/',
  },
  {
    title:    'DocIE',
    period:   'Aug 2025',
    featured: false,
    badges:   ['NLP', 'Document AI', 'LLM'],
    desc:     'Modular document-intelligence pipeline combining fine-tuned spaCy, ELECTRA (NER), and BERT (Relation Extraction) for structured information extraction from long documents. Integrated LLaMA-3.3 via Groq API with few-shot prompting for cross-section entity linking, plus RoBERTa-SQuAD2.0 QA for semantic search. Interactive Streamlit UI for real-time ingestion.',
    stats: [
      { val: 'NER', label: 'Entity Recognition'    },
      { val: 'LLM', label: 'Groq API (LLaMA 3.3)' },
      { val: 'QA',  label: 'RoBERTa SQuAD 2.0'    },
    ],
    tags:   ['Python','spaCy','ELECTRA','BERT','LLaMA-3.3','Groq API','Streamlit'],
    github: 'https://github.com/sathyapalreddypeddakkagari/Document-level-Information-Extraction',
    demo:   'https://document-level-information-extraction-ait.streamlit.app/',
  },
]

export const education: EducationItem[] = [
  {
    degree:   'M.S. Data Analytics Engineering',
    school:   'George Mason University',
    period:   'Aug 2024 — May 2026',
    gpa:      '3.96 / 4.0',
    location: 'Fairfax, Virginia, USA',
    current:  true,
    icon:     'fa-solid fa-graduation-cap',
  },
  {
    degree:   'B.Tech Computer Engineering',
    school:   'Institute of Aeronautical Engineering',
    period:   'Aug 2019 — May 2023',
    gpa:      '3.78 / 4.0',
    location: 'Hyderabad, India',
    current:  false,
    icon:     'fa-solid fa-microchip',
  },
]

export const certifications: Certification[] = [
  {
    name:   'Oracle PL/SQL Developer Certified Professional',
    issuer: 'Oracle',
    date:   'Jun 2023',
    link:   'https://catalog-education.oracle.com/ords/certview/sharebadge?id=6DBB560A74E97904C55C670D7E60CD1CB0B75F163A10D1CDD9F6FB0953D2AB91',
  },
  {
    name:   'Oracle Database SQL Certified Associate',
    issuer: 'Oracle',
    date:   'Apr 2023',
    link:   'https://catalog-education.oracle.com/ords/certview/sharebadge?id=5B288A6EEB56D089CC0C18BB39BA54F6B53CAA238AA78B72CD4F194122C6F690',
  },
]
