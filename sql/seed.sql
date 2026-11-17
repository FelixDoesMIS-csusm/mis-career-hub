-- Seed data for the MIS Career Hub. Run this AFTER schema.sql.
-- Careers: the 12 career families from the MIS Career Fit Quiz (js/data.js).
-- Pay and growth figures are BLS 2025-35 projections, checked November 2026.

insert into public.careers
  (slug, name, tagline, description, weekly_tasks, entry_titles, leads_to, skills, certs_now, certs_later,
   outlook_occupation, growth, median_pay, outlook_url, ai_note, starter_project, sort_order)
values
  ('process', 'Process Improvement & Operational Excellence', 'Finding the waste in how work gets done, and fixing it.', 'You map how work actually flows, find the delays and errors, fix the root cause, and measure whether it improved. In MIS this usually means processes that run on software, data and automation.', 'Interviewing the people who do the work and mapping each step
Measuring delays, errors and rework
Proposing and testing a simpler future-state process', 'Process Analyst Intern
Continuous Improvement Intern
Operations Improvement Analyst', 'Process Excellence Manager
Operations Manager
Business Architect', 'Process maps and BPMN (a standard diagram notation)
Lean Six Sigma basics
Excel for measuring results
Power Automate', 'ASQ Six Sigma Yellow Belt (no prerequisites)
IASSC Lean Six Sigma Yellow or Green Belt (no prerequisites)', 'ASQ Six Sigma Green Belt (requires 3 years of work experience)', 'Management analysts', '+10%', '$101,860', 'https://www.bls.gov/ooh/business-and-financial/management-analysts.htm', 'BLS projects office and administrative support jobs to shrink 4% (about 752,100 jobs) in 2025–35, partly from AI-powered automation. Someone has to redesign the workflows those tools change.', 'Map a real campus or club process (event sign-ups, reimbursements) as it works today, then draw a simpler version and estimate the time saved.', 10),
  ('analysis', 'Business Analysis & Requirements', 'Making sure the right thing gets built.', 'Business analysts figure out what a business actually needs and turn it into clear requirements, user stories and acceptance criteria a tech team can build and test against.', 'Running interviews and workshops with stakeholders
Writing requirements, user stories and acceptance criteria
Testing that what was built matches what was needed', 'Business Analyst Intern
IT Business Analyst
QA / User Acceptance Testing Analyst', 'Senior Business Analyst
Product Owner
Business Architect', 'Interviewing and writing requirements
Process maps
SQL basics
Jira or a similar work tracker', 'IIBA ECBA, Entry Certificate in Business Analysis (exam updated July 2025)', 'IIBA CCBA
IIBA CBAP', 'Computer systems analysts', '+8%', '$105,850', 'https://www.bls.gov/ooh/computer-and-information-technology/computer-systems-analysts.htm', 'BLS lists the expansion of IT, including AI, as a reason it expects systems analyst jobs to grow. Requirements work now often includes defining what an AI tool should and shouldn''t do.', 'Interview two classmates about a frustrating app, then write five user stories with acceptance criteria for fixing it.', 20),
  ('systems', 'Business Systems & Enterprise Applications', 'Running the software a whole company depends on.', 'You configure, connect and improve business platforms like ERP (company-wide operations), CRM (sales and customers) and HR systems, then help roll out changes so people actually use them.', 'Configuring workflows, fields and permissions in a business platform
Translating a department''s request into system changes
Testing and rolling out updates with training for users', 'Business Systems Analyst Intern
ERP or CRM Analyst
Implementation Analyst', 'Senior Business Systems Analyst
Enterprise Applications Manager
Solutions Architect', 'A major platform (Salesforce, NetSuite, SAP or Dynamics 365)
SQL basics
Process maps
Excel for data cleanup', 'Microsoft PL-900 (Power Platform Fundamentals)
Microsoft AB-900 (Copilot and Agent Administration Fundamentals; replaced MS-900, retired March 2026)', 'Microsoft AB-series and Power Platform associate exams', 'Computer systems analysts', '+8%', '$105,850', 'https://www.bls.gov/ooh/computer-and-information-technology/computer-systems-analysts.htm', 'Business platforms are adding built-in AI assistants and agents, and someone has to configure and govern them. Microsoft''s newer fundamentals exam, AB-900, is built around exactly that.', 'Sign up for a free Salesforce Trailhead or Microsoft Power Apps developer account and build a simple club membership tracker.', 30),
  ('automation', 'Intelligent Automation & Applied AI', 'Taking repetitive work off people''s plates.', 'You find work that can be automated, then build it with low-code tools, scripts or AI workflows, with the right controls and human oversight. This is about deploying AI in a business, not researching AI models.', 'Spotting repetitive tasks worth automating
Building flows, scripts or AI-assisted workflows
Testing them, adding checks, and measuring the time saved', 'Automation Analyst Intern
Power Platform Intern
RPA (robotic process automation) Analyst', 'Automation Lead
AI Solutions Specialist
Solutions Architect', 'Power Automate or a similar tool
Python or JavaScript basics
APIs: how apps talk to each other
Process analysis', 'Microsoft PL-900 (Power Platform Fundamentals)
Microsoft AB-900 (Copilot and Agent Administration Fundamentals)', 'Microsoft AB-series associate exams for building AI agents', 'Software developers (closest BLS match)', '+10%', '$135,980', 'https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm', 'BLS names software development for AI as a reason developer demand stays strong. Low-code and AI-agent tools now let analysts automate a lot without being full-time developers.', 'Automate one boring task you actually do: a Power Automate flow that saves email attachments to a folder, or a script that renames files.', 40),
  ('analytics', 'Data Analytics & Business Intelligence', 'Turning messy numbers into decisions.', 'You clean, explore and visualize data so leaders can see what''s happening and why. BI (business intelligence) work centers on dashboards and the metrics a business runs on.', 'Writing SQL to pull and combine data
Building and maintaining dashboards
Explaining what the numbers mean to non-technical people', 'Data Analyst Intern
BI Intern
Reporting Analyst', 'Senior Data Analyst
Analytics Manager
Data Scientist', 'Excel (PivotTables, lookups)
SQL
Power BI or Tableau
Python basics', 'Microsoft PL-300 (Power BI Data Analyst; updated April 2026 to include Copilot in Power BI)', 'Microsoft DP-600 (Fabric Analytics Engineer)', 'Data scientists (closest BLS match; BLS has no "data analyst" category)', '+35%', '$120,230', 'https://www.bls.gov/ooh/math/data-scientists.htm', 'BLS expects firms to keep building AI-based systems into their workflows and says data scientists will be needed to help. Analysts increasingly use AI features inside tools like Power BI.', 'Download a free public dataset (city data, sports stats), clean it in Excel, and build a one-page Power BI dashboard with three insights.', 50),
  ('datagov', 'Data Governance & Information Management', 'Making sure data can be trusted.', 'You define what data means, who owns it, who may use it, and how its quality is checked. Data governance sits between the business and the database teams, and AI makes it more important.', 'Writing data definitions and ownership rules
Running data quality checks and chasing down errors
Reviewing who has access to which data', 'Data Quality Analyst
Data Steward
Data Governance Intern', 'Data Governance Lead
Chief Data Officer
Database Architect', 'SQL
Excel for data checks
Data catalogs and documentation
Privacy basics', 'Microsoft PL-300 (covers data modeling and security basics)', 'Credentials vary by employer; ask professionals at MIS Society events', 'Database administrators and architects', '+4%', '$126,760', 'https://www.bls.gov/ooh/computer-and-information-technology/database-administrators.htm', 'AI is only as good as its data. Rules like the EU AI Act and standards like ISO/IEC 42001 expect organizations to document and govern the data their AI systems use.', 'Take a messy spreadsheet (club roster, budget), write a short data dictionary for it, and list five quality rules it currently breaks.', 60),
  ('grc', 'Governance, Risk, Compliance & AI Governance', 'Proving that systems are safe, fair and following the rules.', 'GRC (governance, risk and compliance) professionals assess technology risk, test controls, gather audit evidence, and make sure the organization meets laws and standards. A fast-growing part of this is governing how AI is used.', 'Testing whether security and IT controls actually work
Writing and updating policies
Assessing the risk of vendors and new tools, including AI tools', 'IT Audit Intern
GRC Analyst Intern
Technology Risk Intern', 'IT Audit Manager
Risk and Compliance Manager
Chief Information Security Officer (CISO)', 'Frameworks: NIST, ISO 27001, SOC 2
AI frameworks: NIST AI RMF, ISO/IEC 42001
Clear policy and audit writing
Security fundamentals', 'CompTIA Security+
IAPP AIGP, Artificial Intelligence Governance Professional (check current requirements at iapp.org)', 'ISACA CISA
ISACA AAIA (AI audit; requires CISA or a similar audit credential)', 'Information security analysts (closest BLS match)', '+21%', '$129,180', 'https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm', 'AI governance is becoming real work: EU AI Act rules for high-risk AI systems apply from December 2, 2027, and organizations are preparing with the NIST AI Risk Management Framework and ISO/IEC 42001.', 'Pick an AI tool your school or club uses and write a one-page risk review: what data it sees, what could go wrong, and three controls you''d recommend.', 70),
  ('cyber', 'Cybersecurity Operations & Identity', 'Defending systems in real time.', 'You monitor for threats, investigate alerts, manage who can log in to what (identity and access management, or IAM), and respond to incidents. It''s more hands-on and technical than GRC.', 'Triaging security alerts in a monitoring tool
Granting, reviewing and removing user access
Investigating suspicious activity and documenting incidents', 'Security Operations Center (SOC) Intern
IAM Intern
Cybersecurity Intern', 'Security Engineer
Incident Response Lead
Security Architect', 'Networking basics
Hands-on security labs
Linux and Windows administration
Python or PowerShell scripting', 'CompTIA Security+ (new version, SY0-801, launches around November 17, 2026)', 'CompTIA SecAI+ (launched February 2026; 3-4 years of IT experience recommended)
ISACA AAISM (requires CISM or CISSP)', 'Information security analysts', '+21%', '$129,180', 'https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm', 'Attackers and defenders both use AI now. CompTIA launched SecAI+ in February 2026, its first certification focused on securing AI and using it in security work.', 'Complete a free beginner security lab path (for example on TryHackMe) and write up what you learned from one investigation.', 80),
  ('delivery', 'IT Project, Program & Product Delivery', 'Getting the right people to ship the right thing on time.', 'You plan the work, coordinate teams, manage risks and keep stakeholders informed. Some roles focus on delivering projects on time; product roles focus on deciding what gets built and why.', 'Running stand-ups and planning meetings
Tracking tasks, risks and deadlines
Updating stakeholders and negotiating trade-offs', 'IT Project Coordinator
Project Management Office (PMO) Intern
Product Operations Intern', 'IT Project Manager
Program Manager
Product Manager', 'Agile and Scrum basics
Jira, Asana or Microsoft Project
Running a real project
Clear status writing', 'PMI CAPM (Certified Associate in Project Management)
PMI-CPMAI, for managing AI projects (no experience required)', 'PMI PMP', 'Project management specialists', '+7%', '$102,320', 'https://www.bls.gov/ooh/business-and-financial/project-management-specialists.htm', 'AI projects fail without good delivery. PMI reports that the U.S. Office of Personnel Management has identified project management as a critical gap in agencies'' ability to scale AI, and PMI now certifies AI project management (PMI-CPMAI).', 'Run one MIS Society event or class project with a written plan: tasks, owners, deadlines and a risk list. Then write a one-page retrospective.', 90),
  ('ux', 'UX Research & Service Design', 'Making technology work for the people using it.', 'You study how people actually use a service, map their journey, test designs, and push for changes that make systems easier and more accessible. In MIS this focuses on research and service redesign more than visual design.', 'Interviewing and observing users
Mapping customer or employee journeys
Running usability tests and presenting findings', 'UX Research Intern
Service Design Intern
Digital Experience Analyst', 'UX Researcher
Service Designer
Product Manager', 'User interviews and usability testing
Journey maps
Figma basics
Accessibility basics (WCAG guidelines)', 'No standard certification; a portfolio of real usability studies matters most', 'Specialized UX courses and portfolios', 'Web and digital interface designers (closest BLS match)', '+6%', '$104,000', 'https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm', 'As AI features show up in everyday apps, someone has to test whether people can use them, understand them and trust them.', 'Run a five-person usability test on a campus website task (like finding a form), then write up the top three problems with screenshots.', 100),
  ('infra', 'IT Operations, Cloud & Infrastructure', 'Keeping the systems everyone depends on running.', 'You run and support the networks, devices, accounts and cloud services a company runs on. Many careers start in IT support and grow into systems, cloud or platform roles.', 'Resolving support tickets and outages
Managing user accounts, devices and access
Setting up and monitoring cloud resources', 'IT Operations Intern
Cloud Operations Intern
Service Desk Analyst', 'Systems Engineer
Cloud Engineer
IT Operations Manager', 'Networking basics
Microsoft 365 and Entra ID administration
PowerShell or Python scripting
Cloud fundamentals (Azure or AWS)', 'CompTIA A+ or Network+
Microsoft AB-900 (Microsoft 365 Copilot and Agent Administration Fundamentals)', 'Azure or AWS associate-level cloud certifications', 'Network and computer systems administrators', '−4%', '$99,130', 'https://www.bls.gov/ooh/computer-and-information-technology/network-and-computer-systems-administrators.htm', 'BLS projects these jobs to shrink, citing automation of routine tasks, outsourcing and chatbots in user support. Cloud, identity, security and automation skills are what keep this path growing.', 'Build a home lab: a free-tier cloud account with one virtual machine, then document how you secured it and set up a cost alert.', 110),
  ('strategy', 'Tech Consulting, Strategy & Architecture', 'Helping organizations decide what technology to invest in.', 'You diagnose business problems, compare options, build the business case, and design how systems should fit together. Many people start in analyst or consulting roles; architect titles usually come later.', 'Researching options and building business cases
Running workshops with client or department leaders
Presenting recommendations and supporting the rollout', 'Technology Consulting Intern
IT Advisory Intern
Vendor Management Analyst', 'Technology Consultant
Enterprise or Solutions Architect
Chief Information Officer (CIO)', 'Business cases and cost analysis
Presenting to leaders
Process and capability maps
Broad knowledge of business platforms', 'IIBA ECBA
Microsoft PL-900', 'PMI PMP
Cloud architect certifications (AWS or Azure)', 'Management analysts', '+10%', '$101,860', 'https://www.bls.gov/ooh/business-and-financial/management-analysts.htm', 'In the World Economic Forum''s 2025 survey, 7 in 10 employers called analytical thinking a core skill. Companies need advisors to decide where AI is actually worth the cost and risk.', 'Pick a real local business, research two software options for one of its problems, and write a one-page recommendation with costs and risks.', 120);

insert into public.resources (name, category, description, eligibility, how_to_get, url, sort_order)
values
  ('ChatGPT Edu', 'AI', 'CSU-licensed ChatGPT with higher usage limits. Your chats are not used to train OpenAI models. Sign-up is optional.', 'CSUSM students, faculty and staff', 'Sign in with your campus credentials and choose San Marcos.', 'https://www.csusm.edu/iits/iitsforyou/generativeai/chatgpt/index.html', 10),
  ('Microsoft 365 and Copilot', 'Productivity', 'Word, Excel, PowerPoint, Outlook, Teams and OneDrive, plus Copilot inside the apps. Installable on personal devices.', 'Active CSUSM students', 'Sign in at office.com with your CSUSM email (drop "cougars" from the address).', 'https://csusm.edu/iits/iitsforyou/office365/download-msoffice/index.html', 20),
  ('Adobe Creative Cloud', 'Design', 'Photoshop, Illustrator, Premiere and more, free on personal and campus computers.', 'Currently enrolled CSUSM students', 'Follow the CSUSM redemption steps.', 'https://www.csusm.edu/iits/iitsforyou/adobe/download-adobe/index.html', 30),
  ('Azure for Students', 'Cloud', '$100 of Azure credit to use within 12 months, plus free services. No credit card needed. Renewable while you are a student.', 'Students with a school email', 'Sign up with your CSUSM email.', 'https://azure.microsoft.com/en-us/pricing/offers/ms-azr-0170p/', 40),
  ('GitHub Student Developer Pack', 'Coding', 'GitHub Pro, GitHub Copilot and partner tools such as cloud credits and domains.', 'Verified students', 'Apply at education.github.com and verify your student status.', 'https://education.github.com/pack', 50);
