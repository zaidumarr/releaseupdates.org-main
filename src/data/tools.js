const BASE_TOOLS = [
  { id: 't1', name: 'ChatGPT', vendor: 'OpenAI', category: 'chatbots', description: 'The industry-standard LLM assistant. Supports GPT-5.1, o1, code execution, and canvas.', tags: ['LLM', 'Multi-modal', 'Agents'], website: 'https://chat.openai.com' },
  { id: 't2', name: 'Claude', vendor: 'Anthropic', category: 'chatbots', description: 'Known for high safety standards, large context windows (Opus/Sonnet), and "Artifacts" UI.', tags: ['LLM', 'Enterprise', 'Reasoning'], website: 'https://claude.ai', logoUrl: 'https://logo.clearbit.com/anthropic.com' },
  { id: 't3', name: 'Gemini', vendor: 'Google', category: 'chatbots', description: 'Deeply integrated Google ecosystem AI. Multimodal native (text, image, code, voice).', tags: ['Google', 'Multimodal', 'Voice'], website: 'https://gemini.google.com' },
  { id: 't4', name: 'Microsoft Copilot', vendor: 'Microsoft', category: 'chatbots', description: 'AI assistant embedded in Windows, Edge, GitHub, and M365.', tags: ['Office', 'Windows', 'Productivity'], website: 'https://copilot.microsoft.com' },
  { id: 't5', name: 'Perplexity AI', vendor: 'Perplexity', category: 'chatbots', description: 'Conversational answer engine with live citations and research focus.', tags: ['Search', 'Citations', 'Research'], website: 'https://www.perplexity.ai' },
  { id: 't6', name: 'Meta AI', vendor: 'Meta', category: 'chatbots', description: 'Assistant integrated into WhatsApp, Instagram, and Facebook using Llama models.', tags: ['Social', 'Llama', 'Open Source'], website: 'https://www.meta.ai' },
  { id: 't7', name: 'Poe', vendor: 'Quora', category: 'chatbots', description: 'Aggregator platform allowing access to multiple models (GPT, Claude, Mistral) in one UI.', tags: ['Aggregator', 'Social'], website: 'https://poe.com' },
  { id: 't8', name: 'Arc Search', vendor: 'The Browser Company', category: 'search', description: 'Browser with "Browse for Me" AI summarization and ad-blocking built-in.', tags: ['Browser', 'Mobile', 'Summary'], website: 'https://arc.net' },
  { id: 't9', name: 'You.com', vendor: 'You.com', category: 'search', description: 'AI search engine with customizable "apps" for code, writing, and images.', tags: ['Search', 'Privacy'], website: 'https://you.com' },
  { id: 't10', name: 'Elicit', vendor: 'Elicit', category: 'search', description: 'AI research assistant that automates literature review and data extraction.', tags: ['Academic', 'Science', 'Data'], website: 'https://elicit.org' },
  { id: 't11', name: 'GitHub Copilot', vendor: 'Microsoft', category: 'coding', description: 'The most widely used code completion tool, now with "Copilot Workspace" for planning.', tags: ['Dev', 'IDE', 'Microsoft'], website: 'https://github.com/features/copilot' },
  { id: 't12', name: 'Cursor', vendor: 'Anysphere', category: 'coding', description: 'AI-first code editor (fork of VS Code) with deep codebase understanding.', tags: ['IDE', 'Editor', 'Agents'], website: 'https://cursor.sh' },
  { id: 't12a', name: 'Tabnine', vendor: 'Tabnine', category: 'coding', description: 'Privacy-focused AI code completions with on-prem options.', tags: ['Completion', 'On-prem', 'Secure'], website: 'https://www.tabnine.com' },
  { id: 't12b', name: 'Windsurf', vendor: 'Codeium', category: 'coding', description: 'Agentic VS Code fork with built-in planning and navigation.', tags: ['IDE', 'Agentic', 'VSCode'], website: 'https://codeium.com/windsurf' },
  { id: 't12c', name: 'Sourcegraph Cody', vendor: 'Sourcegraph', category: 'coding', description: 'Code graph aware assistant for large monorepos with embeddings.', tags: ['Repos', 'Embeddings', 'Search'], website: 'https://about.sourcegraph.com/cody' },
  { id: 't12d', name: 'JetBrains AI Assistant', vendor: 'JetBrains', category: 'coding', description: 'Native JetBrains IDE assistant for completions, refactors, and chat.', tags: ['JetBrains', 'IDE', 'Refactor'], website: 'https://www.jetbrains.com/ai/' },
  { id: 't12e', name: 'Amazon Q Developer', vendor: 'Amazon', category: 'coding', description: 'Agent that plans changes, writes code, and answers stack questions.', tags: ['AWS', 'Agent', 'Code'], website: 'https://aws.amazon.com/q/developer/' },
  { id: 't12f', name: 'Amazon CodeWhisperer', vendor: 'Amazon', category: 'coding', description: 'AWS-focused code completions with security scans.', tags: ['AWS', 'Completion', 'Security'], website: 'https://aws.amazon.com/codewhisperer/' },
  { id: 't13', name: 'Replit AI', vendor: 'Replit', category: 'coding', description: 'Online IDE with integrated AI for generating, explaining, and debugging code.', tags: ['Cloud', 'Education', 'Full Stack'], website: 'https://replit.com/ai' },
  { id: 't13a', name: 'Replit Ghostwriter', vendor: 'Replit', category: 'coding', description: 'Replit completion and chat for shipping code faster.', tags: ['Completion', 'Chat', 'Cloud IDE'], website: 'https://replit.com/site/ghostwriter' },
  { id: 't13b', name: 'Replit Agent', vendor: 'Replit', category: 'coding', description: 'Autonomous agent that edits files and proposes diffs in Replit.', tags: ['Agent', 'Automation', 'Cloud IDE'], website: 'https://replit.com/agent' },
  { id: 't14', name: 'Codeium', vendor: 'Codeium', category: 'coding', description: 'Fast, free AI coding extension supporting many IDEs with context awareness.', tags: ['Free', 'Extension', 'Fast'], website: 'https://www.codeium.com' },
  { id: 't14a', name: 'Phind', vendor: 'Phind', category: 'coding', description: 'Search + code assistant optimized for engineering answers and snippets.', tags: ['Search', 'Code', 'Fast'], website: 'https://www.phind.com' },
  { id: 't14b', name: 'Devin', vendor: 'Cognition', category: 'automation', description: 'Autonomous software engineer that plans, executes, and ships features.', tags: ['Agent', 'Autonomous', 'Full-stack'], website: 'https://www.cognitionlabs.com' },
  { id: 't14c', name: 'BLACKBOX AI', vendor: 'Blackbox', category: 'coding', description: 'Code autocomplete and chat with a focus on snippet recall.', tags: ['Completion', 'Snippets'], website: 'https://www.useblackbox.io' },
  { id: 't14d', name: 'CodeGeeX', vendor: 'CodeGeeX', category: 'coding', description: 'Multilingual code generation models with IDE extensions.', tags: ['Multilingual', 'Completion'], website: 'https://codegeex.ai' },
  { id: 't14e', name: 'Continue.dev', vendor: 'Continue', category: 'coding', description: 'Open-source VS Code/JetBrains copilot with local and remote models.', tags: ['Open Source', 'IDE', 'Extensible'], website: 'https://continue.dev' },
  { id: 't14f', name: 'Qodo', vendor: 'Qodo', category: 'coding', description: 'Code assistant tailored for learning and pair-programming.', tags: ['Learning', 'Pairing'], website: 'https://qodo.ai' },
  { id: 't14g', name: 'Sourcery', vendor: 'Sourcery', category: 'coding', description: 'Refactoring assistant that improves readability and patterns.', tags: ['Refactor', 'Quality'], website: 'https://sourcery.ai' },
  { id: 't14h', name: 'Snyk Code', vendor: 'Snyk', category: 'coding', description: 'Static analysis and AI suggestions to fix security issues.', tags: ['Security', 'SAST', 'Fixes'], website: 'https://snyk.io/product/snyk-code/' },
  { id: 't14i', name: 'Claude Code', vendor: 'Anthropic', category: 'coding', description: 'Anthropic’s coding-optimized assistant for deep repo reasoning.', tags: ['Coding', 'Claude', 'Repos'], website: 'https://claude.ai', logoUrl: 'https://logo.clearbit.com/anthropic.com' },
  { id: 't14j', name: 'Code Llama', vendor: 'Meta', category: 'coding', description: 'Open-source Llama family tuned for coding tasks.', tags: ['Open Source', 'Models', 'Coding'], website: 'https://ai.meta.com/resources/models-and-libraries/code-llama' },
  { id: 't14k', name: 'StarCoder', vendor: 'Hugging Face / ServiceNow', category: 'coding', description: 'Open code model for permissive use with strong multilingual support.', tags: ['Open Models', 'Coding'], website: 'https://huggingface.co/bigcode/starcoder' },
  { id: 't14l', name: 'StarCoder2', vendor: 'Hugging Face / ServiceNow', category: 'coding', description: 'Successor to StarCoder with improved context and quality.', tags: ['Open Models', 'Coding', 'Context'], website: 'https://huggingface.co/bigcode/starcoder2' },
  { id: 't14m', name: 'Supermaven', vendor: 'Supermaven', category: 'coding', description: 'Ultra-fast AI code completion with large context windows.', tags: ['Completion', 'AI', 'Context'], website: 'https://www.supermaven.com' },
  { id: 't14n', name: 'Warp', vendor: 'Warp', category: 'coding', description: 'Modern terminal with built-in AI command search and workflows.', tags: ['Terminal', 'AI', 'Productivity'], website: 'https://www.warp.dev' },
  { id: 't14o', name: 'VS Code', vendor: 'Microsoft', category: 'coding', description: 'Industry-standard code editor with rich extension ecosystem.', tags: ['Editor', 'Open Source', 'Extensions'], website: 'https://code.visualstudio.com' },
  { id: 't14p', name: 'IntelliJ IDEA', vendor: 'JetBrains', category: 'coding', description: 'Powerful IDE for Java/Kotlin and enterprise codebases.', tags: ['IDE', 'Java', 'Enterprise'], website: 'https://www.jetbrains.com/idea/' },
  { id: 't14q', name: 'WebStorm', vendor: 'JetBrains', category: 'coding', description: 'Specialized IDE for JavaScript and TypeScript.', tags: ['IDE', 'JavaScript', 'TypeScript'], website: 'https://www.jetbrains.com/webstorm/' },
  { id: 't14r', name: 'Fleet', vendor: 'JetBrains', category: 'coding', description: 'Lightweight, collaborative IDE by JetBrains.', tags: ['IDE', 'Lightweight', 'Collaborative'], website: 'https://www.jetbrains.com/fleet/' },
  { id: 't14s', name: 'Postman', vendor: 'Postman', category: 'coding', description: 'API platform for testing, collaboration, and monitoring.', tags: ['API', 'Testing', 'Collaboration'], website: 'https://www.postman.com' },
  { id: 't14t', name: 'Insomnia', vendor: 'Kong', category: 'coding', description: 'REST/GraphQL client for fast API testing.', tags: ['API', 'Testing', 'REST'], website: 'https://insomnia.rest' },
  { id: 't14u', name: 'Hoppscotch', vendor: 'Hoppscotch', category: 'coding', description: 'Lightweight open-source API testing tool.', tags: ['API', 'Testing', 'Open Source'], website: 'https://hoppscotch.io' },
  { id: 't14v', name: 'Git', vendor: 'Git', category: 'coding', description: 'Distributed version control system for source code history.', tags: ['VCS', 'Git', 'CLI'], website: 'https://git-scm.com' },
  { id: 't14w', name: 'GitHub', vendor: 'GitHub', category: 'coding', description: 'Platform for hosting, collaborating, and automating code.', tags: ['VCS', 'Collaboration', 'DevOps'], website: 'https://github.com' },
  { id: 't14x', name: 'GitLab', vendor: 'GitLab', category: 'coding', description: 'DevOps platform with source hosting, CI/CD, and security.', tags: ['VCS', 'CI/CD', 'DevOps'], website: 'https://gitlab.com' },
  { id: 't14y', name: 'GitKraken', vendor: 'GitKraken', category: 'coding', description: 'Visual Git client to manage branches and repos.', tags: ['VCS', 'GUI', 'Productivity'], website: 'https://www.gitkraken.com' },
  { id: 't14z', name: 'Oh My Zsh', vendor: 'Oh My Zsh', category: 'coding', description: 'Framework to manage Zsh configuration with plugins/themes.', tags: ['Terminal', 'Zsh', 'Productivity'], website: 'https://ohmyz.sh' },
  { id: 't14aa', name: 'Fig', vendor: 'Fig', category: 'coding', description: 'Autocomplete menus and snippets for your terminal.', tags: ['Terminal', 'Autocomplete', 'Productivity'], website: 'https://fig.io' },
  { id: 't15', name: 'Midjourney', vendor: 'Midjourney', category: 'image', description: 'High-fidelity artistic image generation known for distinct style and quality.', tags: ['Art', 'Generative', 'Discord'], website: 'https://www.midjourney.com' },
  { id: 't16', name: 'DALL·E 3', vendor: 'OpenAI', category: 'image', description: 'Natively integrated into ChatGPT for conversational image generation.', tags: ['Easy', 'Chat', 'Integration'], website: 'https://openai.com/dall-e-3' },
  { id: 't17', name: 'Canva Magic', vendor: 'Canva', category: 'image', description: 'Design suite with embedded text-to-image, magic edit, and erasure tools.', tags: ['Design', 'Marketing', 'Easy'], website: 'https://www.canva.com/ai' },
  { id: 't18', name: 'Runway', vendor: 'Runway', category: 'media', description: 'Pioneering generative video tools (Gen-3 Alpha) for cinematic motion.', tags: ['Video', 'Cinema', 'Professional'], website: 'https://runwayml.com' },
  { id: 't19', name: 'Synthesia', vendor: 'Synthesia', category: 'media', description: 'AI video generation platform using realistic AI avatars for enterprise training.', tags: ['Corporate', 'Avatars', 'Training'], website: 'https://www.synthesia.io' },
  { id: 't20', name: 'ElevenLabs', vendor: 'ElevenLabs', category: 'media', description: 'Industry-leading voice cloning and text-to-speech synthesis.', tags: ['Audio', 'Voice', 'Dubbing'], website: 'https://elevenlabs.io' },
  { id: 't21', name: 'Descript', vendor: 'Descript', category: 'media', description: 'Audio/Video editor that works like a doc, with AI voice overdubbing.', tags: ['Podcasting', 'Editing', 'Transcription'], website: 'https://www.descript.com' },
  { id: 't22', name: 'Notion AI', vendor: 'Notion', category: 'productivity', description: 'AI writing and database assistance directly inside Notion workspaces.', tags: ['Docs', 'Notes', 'Wiki'], website: 'https://www.notion.so/product/ai' },
  { id: 't23', name: 'Google Workspace', vendor: 'Google', category: 'productivity', description: 'Gemini integrated into Docs, Sheets, Slides, and Gmail.', tags: ['Office', 'Email', 'Enterprise'], website: 'https://workspace.google.com/gemini' },
  { id: 't24', name: 'Grammarly', vendor: 'Grammarly', category: 'productivity', description: 'Advanced writing assistant for tone, clarity, and correctness.', tags: ['Writing', 'Communication'], website: 'https://www.grammarly.com' },
  { id: 't25', name: 'Zapier', vendor: 'Zapier', category: 'automation', description: 'Connects 6000+ apps with "AI Steps" to automate complex logic.', tags: ['No-code', 'Workflow', 'Integration'], website: 'https://zapier.com' },
  { id: 't26', name: 'Make', vendor: 'Make', category: 'automation', description: 'Visual workflow automation platform with deep AI integration capabilities.', tags: ['Visual', 'Backend', 'Complex'], website: 'https://www.make.com' },
  { id: 't27', name: 'DataRobot', vendor: 'DataRobot', category: 'data', description: 'Unified AI platform for building, deploying, and monitoring ML models.', tags: ['MLOps', 'Enterprise', 'Analytics'], website: 'https://www.datarobot.com' },
  { id: 't28', name: 'Snowflake Cortex', vendor: 'Snowflake', category: 'data', description: 'Managed AI service bringing LLMs directly to your data in Snowflake.', tags: ['SQL', 'Big Data', 'Cloud'], website: 'https://www.snowflake.com/en/product/cortex/' },
  { id: 't29', name: 'Mistral AI', vendor: 'Mistral', category: 'chatbots', description: 'Lightweight, high-quality open models (Mixtral, Mistral Large) with strong coding and reasoning.', tags: ['Open Models', 'Reasoning', 'Coding'], website: 'https://mistral.ai' },
  { id: 't30', name: 'Adobe Firefly', vendor: 'Adobe', category: 'image', description: 'Generative imaging and style transfer built into Creative Cloud for production-grade assets.', tags: ['Design', 'Brand Safe', 'Photoshop'], website: 'https://www.adobe.com/sensei/generative-ai/firefly.html' },
  { id: 't31', name: 'Figma AI', vendor: 'Figma', category: 'productivity', description: 'AI for layout, content generation, and asset variations directly inside Figma.', tags: ['Design', 'Layout', 'Components'], website: 'https://www.figma.com/ai' },
  { id: 't32', name: 'Jasper', vendor: 'Jasper', category: 'productivity', description: 'Enterprise AI writing with brand voice controls and team collaboration.', tags: ['Marketing', 'Copy', 'Brand'], website: 'https://www.jasper.ai' },
  { id: 't33', name: 'Pinecone', vendor: 'Pinecone', category: 'data', description: 'Fully managed vector database for retrieval-augmented generation at scale.', tags: ['Vector', 'RAG', 'Search'], website: 'https://www.pinecone.io' },
  { id: 't34', name: 'LangChain', vendor: 'LangChain', category: 'automation', description: 'Orchestration framework for agents, tools, and retrieval pipelines.', tags: ['Framework', 'Agents', 'Pipelines'], website: 'https://www.langchain.com' },
  { id: 't35', name: 'Hippocratic AI', vendor: 'Hippocratic AI', category: 'health', description: 'Voice agent platform for clinical workflows with safety guardrails.', tags: ['Healthcare', 'Voice', 'Agents'], website: 'https://www.hippocratic.ai' },
  { id: 't36', name: 'Tempus AI', vendor: 'Tempus', category: 'health', description: 'Genomic and clinical AI platform delivering precision oncology insights.', tags: ['Genomics', 'Oncology', 'Clinical'], website: 'https://www.tempus.com' },
  { id: 't37', name: 'Epic Systems', vendor: 'Epic', category: 'health', description: 'Flagship EHR powering large hospital systems like Cleveland Clinic and Mayo Clinic.', tags: ['EHR', 'Enterprise', 'Hospitals'], website: 'https://www.epic.com' },
  { id: 't38', name: 'Oracle Health (Cerner)', vendor: 'Oracle', category: 'health', description: 'Large-scale EHR suite with major government and global health footprints.', tags: ['EHR', 'Enterprise', 'Government'], website: 'https://www.oracle.com/industries/health/' },
  { id: 't39', name: 'athenahealth', vendor: 'athenahealth', category: 'health', description: 'Cloud EHR and revenue cycle stack popular with independent practices and urgent care.', tags: ['EHR', 'Practice', 'Billing'], website: 'https://www.athenahealth.com' },
  { id: 't40', name: 'DrChrono', vendor: 'DrChrono', category: 'health', description: 'Mobile-first, iPad-friendly EHR tailored for modern private practices.', tags: ['EHR', 'Mobile', 'Practice'], website: 'https://www.drchrono.com' },
  { id: 't41', name: 'Doxy.me', vendor: 'Doxy', category: 'health', description: 'Simple, no-download telemedicine video platform built for clinicians.', tags: ['Telemedicine', 'Video', 'HIPAA'], website: 'https://doxy.me' },
  { id: 't42', name: 'Teladoc Health', vendor: 'Teladoc', category: 'health', description: 'Enterprise virtual care platform used across payers and health systems.', tags: ['Telemedicine', 'Virtual Care', 'Enterprise'], website: 'https://www.teladochealth.com' },
  { id: 't43', name: 'Zoom for Healthcare', vendor: 'Zoom', category: 'health', description: 'HIPAA-compliant Zoom offering for virtual visits and care collaboration.', tags: ['Telemedicine', 'Video', 'HIPAA'], website: 'https://explore.zoom.us/en/healthcare/' },
  { id: 't44', name: 'Abridge', vendor: 'Abridge', category: 'health', description: 'Ambient AI that listens to clinical visits and auto-generates visit notes.', tags: ['Medical AI', 'Ambient', 'Notes'], website: 'https://www.abridge.com' },
  { id: 't45', name: 'Aidoc', vendor: 'Aidoc', category: 'health', description: 'AI triage and imaging analysis for radiology to detect strokes and fractures.', tags: ['Medical AI', 'Imaging', 'Radiology'], website: 'https://www.aidoc.com' },
  { id: 't46', name: 'Google Med-Gemini / Med-PaLM', vendor: 'Google', category: 'health', description: 'Google’s medical-tuned LLMs for clinical reasoning and documentation.', tags: ['Medical AI', 'LLM', 'Clinical'], website: 'https://ai.google/discover/med-gemini' },
  // Mobile & OS
  { id: 'm1', name: 'iOS', vendor: 'Apple', category: 'mobile', description: 'Apple mobile operating system for iPhone and iPad with secure app ecosystem.', tags: ['Mobile OS', 'Apple', 'iPhone'], website: 'https://www.apple.com/ios' },
  { id: 'm2', name: 'Android', vendor: 'Google', category: 'mobile', description: 'Google’s open mobile OS powering the majority of global smartphones.', tags: ['Mobile OS', 'Android', 'Google'], website: 'https://www.android.com' },
  { id: 'm3', name: 'Windows', vendor: 'Microsoft', category: 'mobile', description: 'Desktop operating system powering PCs with strong enterprise footprint.', tags: ['Desktop OS', 'PC', 'Enterprise'], website: 'https://www.microsoft.com/windows' },
  { id: 'm4', name: 'macOS', vendor: 'Apple', category: 'mobile', description: 'Apple desktop OS optimized for M-series chips and creative workflows.', tags: ['Desktop OS', 'Apple', 'Mac'], website: 'https://www.apple.com/macos' },
  { id: 'm5', name: 'Ubuntu', vendor: 'Canonical', category: 'mobile', description: 'Popular Linux distribution for desktops and servers with long-term support.', tags: ['Linux', 'Desktop', 'Server'], website: 'https://ubuntu.com' },
  { id: 'm6', name: 'Red Hat Enterprise Linux', vendor: 'Red Hat', category: 'mobile', description: 'Enterprise-grade Linux platform with long-term support and security.', tags: ['Linux', 'Enterprise', 'Server'], website: 'https://www.redhat.com/rhel' },
  { id: 'm7', name: 'Debian', vendor: 'Debian', category: 'mobile', description: 'Stable community-driven Linux distribution serving as base for many OSes.', tags: ['Linux', 'Community', 'Stable'], website: 'https://www.debian.org' },
  { id: 'm8', name: 'Fedora', vendor: 'Fedora', category: 'mobile', description: 'Cutting-edge Linux distro showcasing the latest open-source tech.', tags: ['Linux', 'Desktop', 'Cutting-edge'], website: 'https://fedoraproject.org' },
  { id: 'm9', name: 'ChromeOS', vendor: 'Google', category: 'mobile', description: 'Lightweight OS built around the Chrome browser with Android app support.', tags: ['Desktop OS', 'Chromebook', 'Web'], website: 'https://www.google.com/chromebook/chrome-os/' },
  { id: 'm10', name: 'Tizen', vendor: 'Samsung', category: 'mobile', description: 'Linux-based OS used in Samsung wearables, TVs, and appliances.', tags: ['Embedded', 'Wearables', 'TV'], website: 'https://www.tizen.org' },
  // Automation: Cloud / IaC
  { id: 'a1', name: 'Terraform', vendor: 'HashiCorp', category: 'automation', description: 'Cloud-agnostic infrastructure as code standard.', tags: ['IaC', 'Cloud', 'Provisioning'], website: 'https://www.terraform.io' },
  { id: 'a2', name: 'AWS CloudFormation', vendor: 'Amazon', category: 'automation', description: 'Native AWS templates for provisioning cloud resources.', tags: ['AWS', 'IaC', 'Cloud'], website: 'https://aws.amazon.com/cloudformation/' },
  { id: 'a3', name: 'Azure Bicep / ARM', vendor: 'Microsoft', category: 'automation', description: 'Native Azure infrastructure as code for deployments.', tags: ['Azure', 'IaC', 'Cloud'], website: 'https://learn.microsoft.com/azure/azure-resource-manager/bicep/' },
  { id: 'a4', name: 'Google Deployment Manager', vendor: 'Google', category: 'automation', description: 'Native infrastructure automation for Google Cloud.', tags: ['GCP', 'IaC', 'Cloud'], website: 'https://cloud.google.com/deployment-manager' },
  { id: 'a5', name: 'Pulumi', vendor: 'Pulumi', category: 'automation', description: 'Infrastructure as code using TypeScript, Python, Go, and more.', tags: ['IaC', 'Cloud', 'Languages'], website: 'https://www.pulumi.com' },
  { id: 'a6', name: 'OpenTofu', vendor: 'OpenTofu', category: 'automation', description: 'Open-source Terraform-compatible infrastructure as code.', tags: ['IaC', 'Open Source', 'Cloud'], website: 'https://opentofu.org' },
  { id: 'a7', name: 'Ansible', vendor: 'Red Hat', category: 'automation', description: 'Agentless configuration management and deployment automation.', tags: ['Config', 'Deployment', 'Agentless'], website: 'https://www.ansible.com' },
  // Automation: Deployment / CI-CD
  { id: 'a8', name: 'Jenkins', vendor: 'Jenkins', category: 'automation', description: 'Open-source automation server for CI/CD pipelines.', tags: ['CI/CD', 'Open Source', 'Pipelines'], website: 'https://www.jenkins.io' },
  { id: 'a9', name: 'GitHub Actions', vendor: 'GitHub', category: 'automation', description: 'CI/CD workflows integrated directly with GitHub repos.', tags: ['CI/CD', 'GitHub', 'Pipelines'], website: 'https://github.com/features/actions' },
  { id: 'a10', name: 'GitLab CI/CD', vendor: 'GitLab', category: 'automation', description: 'DevOps platform with built-in CI/CD pipelines.', tags: ['CI/CD', 'GitLab', 'DevOps'], website: 'https://docs.gitlab.com/ee/ci/' },
  { id: 'a11', name: 'CircleCI', vendor: 'CircleCI', category: 'automation', description: 'Cloud CI/CD focused on speed and reliability.', tags: ['CI/CD', 'Cloud', 'Pipelines'], website: 'https://circleci.com' },
  { id: 'a12', name: 'Argo CD', vendor: 'Argo', category: 'automation', description: 'Declarative GitOps continuous delivery for Kubernetes.', tags: ['GitOps', 'Kubernetes', 'CD'], website: 'https://argo-cd.readthedocs.io' },
  { id: 'a13', name: 'Octopus Deploy', vendor: 'Octopus', category: 'automation', description: 'Release management and deployment automation platform.', tags: ['Deployment', 'Releases', 'DevOps'], website: 'https://octopus.com' },
  // Automation: Scheduling / Cron
  { id: 'a14', name: 'Linux Cron', vendor: 'Linux', category: 'automation', description: 'Standard Unix cron utility for scheduled jobs.', tags: ['Cron', 'Scheduling', 'Unix'], website: 'https://en.wikipedia.org/wiki/Cron' },
  { id: 'a15', name: 'Kubernetes CronJobs', vendor: 'Kubernetes', category: 'automation', description: 'Native Kubernetes resource for time-based jobs.', tags: ['Kubernetes', 'Cron', 'Jobs'], website: 'https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/' },
  { id: 'a16', name: 'Apache Airflow', vendor: 'Apache', category: 'automation', description: 'Workflow orchestrator for data and computational pipelines.', tags: ['Orchestration', 'Data', 'Scheduling'], website: 'https://airflow.apache.org' },
  { id: 'a17', name: 'Hangfire', vendor: 'Hangfire', category: 'automation', description: '.NET background job processing with dashboards.', tags: ['.NET', 'Jobs', 'Scheduling'], website: 'https://www.hangfire.io' },
  { id: 'a18', name: 'Celery', vendor: 'Celery', category: 'automation', description: 'Distributed task queue for Python/Django ecosystems.', tags: ['Python', 'Tasks', 'Queue'], website: 'https://docs.celeryq.dev' },
  { id: 'a19', name: 'AWS EventBridge Scheduler', vendor: 'Amazon', category: 'automation', description: 'Serverless scheduling for AWS services and events.', tags: ['AWS', 'Scheduler', 'Serverless'], website: 'https://aws.amazon.com/eventbridge/scheduler/' },
  // Automation: Containerization
  { id: 'a20', name: 'Kubernetes', vendor: 'CNCF', category: 'automation', description: 'Orchestrates container deployment, scaling, and management.', tags: ['Containers', 'Orchestration', 'Cloud'], website: 'https://kubernetes.io' },
  { id: 'a21', name: 'Docker Swarm', vendor: 'Docker', category: 'automation', description: 'Native Docker clustering and orchestration.', tags: ['Containers', 'Docker', 'Orchestration'], website: 'https://docs.docker.com/engine/swarm/' },
  { id: 'a22', name: 'Helm', vendor: 'CNCF', category: 'automation', description: 'Package manager for Kubernetes to automate complex installs.', tags: ['Kubernetes', 'Packages', 'Charts'], website: 'https://helm.sh' },
  { id: 'a23', name: 'Podman', vendor: 'Red Hat', category: 'automation', description: 'Daemonless container engine and Docker alternative.', tags: ['Containers', 'Linux', 'Daemonless'], website: 'https://podman.io' },
  // Automation: Testing / QA
  { id: 'a24', name: 'Selenium', vendor: 'Selenium', category: 'automation', description: 'Standard for browser automation and web testing.', tags: ['Testing', 'Browser', 'Automation'], website: 'https://www.selenium.dev' },
  { id: 'a25', name: 'Cypress', vendor: 'Cypress', category: 'automation', description: 'Fast end-to-end testing for anything that runs in a browser.', tags: ['Testing', 'E2E', 'JavaScript'], website: 'https://www.cypress.io' },
  { id: 'a26', name: 'Playwright', vendor: 'Microsoft', category: 'automation', description: 'Reliable cross-browser E2E testing for modern web apps.', tags: ['Testing', 'Browser', 'E2E'], website: 'https://playwright.dev' },
  { id: 'a27', name: 'Appium', vendor: 'Appium', category: 'automation', description: 'Open-source automation for native, hybrid, and mobile web apps.', tags: ['Testing', 'Mobile', 'Automation'], website: 'https://appium.io' },
  // Automation: Workflow & RPA
  { id: 'a28', name: 'n8n', vendor: 'n8n', category: 'automation', description: 'Self-hostable fair-code workflow automation.', tags: ['Workflow', 'Self-hosted', 'No-code'], website: 'https://n8n.io' },
  { id: 'a29', name: 'Power Automate', vendor: 'Microsoft', category: 'automation', description: 'Microsoft automation platform for enterprise workflows.', tags: ['Workflow', 'RPA', 'Enterprise'], website: 'https://powerautomate.microsoft.com' },
  { id: 'a30', name: 'UiPath', vendor: 'UiPath', category: 'automation', description: 'Robotic Process Automation for desktop and legacy systems.', tags: ['RPA', 'Automation', 'Enterprise'], website: 'https://www.uipath.com' },
  // Automation: Mobile OS
  { id: 'a31', name: 'Shortcuts', vendor: 'Apple', category: 'automation', description: 'Native Apple automation for iPhone, iPad, and Mac.', tags: ['Mobile', 'Automation', 'Apple'], website: 'https://support.apple.com/guide/shortcuts/welcome/ios' },
  { id: 'a32', name: 'Tasker', vendor: 'Tasker', category: 'automation', description: 'Advanced Android automation app for custom workflows.', tags: ['Mobile', 'Android', 'Automation'], website: 'https://tasker.joaoapps.com' },
  { id: 'a33', name: 'IFTTT', vendor: 'IFTTT', category: 'automation', description: 'Simple applets to automate apps, devices, and services.', tags: ['Automation', 'No-code', 'Apps'], website: 'https://ifttt.com' },
  // Automation: Creative & Marketing
  { id: 'a34', name: 'HubSpot', vendor: 'HubSpot', category: 'marketing', description: 'Marketing automation with CRM and email sequences.', tags: ['Marketing', 'CRM', 'Automation'], website: 'https://www.hubspot.com' },
  { id: 'a35', name: 'ActiveCampaign', vendor: 'ActiveCampaign', category: 'marketing', description: 'Customer experience automation for email and journeys.', tags: ['Marketing', 'Email', 'Automation'], website: 'https://www.activecampaign.com' },
  { id: 'a36', name: 'Phantombuster', vendor: 'Phantombuster', category: 'marketing', description: 'Automates social network actions and scraping.', tags: ['Social', 'Automation', 'Growth'], website: 'https://phantombuster.com' },
  { id: 'a37', name: 'ComfyUI', vendor: 'ComfyUI', category: 'marketing', description: 'Node-based GUI for automating Stable Diffusion workflows.', tags: ['Generative', 'Images', 'Workflow'], website: 'https://www.comfy.org' },
  // Browsers - Big 5
  { id: 'b1', name: 'Google Chrome', vendor: 'Google', category: 'browsers', description: 'Chromium-based default browser with massive extension ecosystem.', tags: ['Chromium', 'General', 'Extensions'], website: 'https://www.google.com/chrome', platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'] },
  { id: 'b2', name: 'Apple Safari', vendor: 'Apple', category: 'browsers', description: 'WebKit browser optimized for Apple devices and battery life.', tags: ['WebKit', 'General', 'Apple'], website: 'https://www.apple.com/safari', platforms: ['macOS', 'iOS'] },
  { id: 'b3', name: 'Mozilla Firefox', vendor: 'Mozilla', category: 'browsers', description: 'Gecko engine browser with strong privacy and customization.', tags: ['Gecko', 'General', 'Privacy'], website: 'https://www.mozilla.org/firefox', platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'] },
  { id: 'b4', name: 'Microsoft Edge', vendor: 'Microsoft', category: 'browsers', description: 'Chromium-based browser with enterprise features and Copilot.', tags: ['Chromium', 'General', 'Enterprise'], website: 'https://www.microsoft.com/edge', platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'] },
  { id: 'b5', name: 'Opera', vendor: 'Opera', category: 'browsers', description: 'Feature-rich Chromium browser with VPN and sidebar apps.', tags: ['Chromium', 'General', 'VPN'], website: 'https://www.opera.com', platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'] },
  // Browsers - Privacy
  { id: 'b6', name: 'Brave', vendor: 'Brave', category: 'browsers', description: 'Privacy-first Chromium browser blocking ads/trackers by default.', tags: ['Chromium', 'Privacy', 'Ad-block'], website: 'https://brave.com', platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'] },
  { id: 'b7', name: 'Tor Browser', vendor: 'Tor Project', category: 'browsers', description: 'Gecko-based browser routing traffic through Tor for anonymity.', tags: ['Gecko', 'Privacy', 'Anonymity'], website: 'https://www.torproject.org/download', platforms: ['Windows', 'macOS', 'Linux', 'Android'] },
  { id: 'b8', name: 'DuckDuckGo Browser', vendor: 'DuckDuckGo', category: 'browsers', description: 'Privacy-focused browser enforcing encryption and blocking trackers.', tags: ['Privacy', 'Mobile', 'Tracking Protection'], website: 'https://duckduckgo.com/browser', platforms: ['Windows', 'macOS', 'Android', 'iOS'] },
  { id: 'b9', name: 'Mullvad Browser', vendor: 'Mullvad', category: 'browsers', description: 'Gecko-based privacy browser minimizing fingerprinting.', tags: ['Gecko', 'Privacy', 'Anti-fingerprinting'], website: 'https://mullvad.net/en/browser', platforms: ['Windows', 'macOS', 'Linux'] },
  { id: 'b10', name: 'LibreWolf', vendor: 'LibreWolf', category: 'browsers', description: 'Telemetry-free Firefox fork focused on privacy.', tags: ['Gecko', 'Privacy', 'Open Source'], website: 'https://librewolf.net', platforms: ['Windows', 'macOS', 'Linux'] },
  { id: 'b11', name: 'Waterfox', vendor: 'Waterfox', category: 'browsers', description: 'Performance-oriented Firefox fork without telemetry.', tags: ['Gecko', 'Privacy', 'Performance'], website: 'https://www.waterfox.net', platforms: ['Windows', 'macOS', 'Linux'] },
  { id: 'b12', name: 'Ghostery Dawn', vendor: 'Ghostery', category: 'browsers', description: 'Gecko-based browser with built-in tracker/ad blocking.', tags: ['Gecko', 'Privacy', 'Ad-block'], website: 'https://www.ghostery.com/dawn', platforms: ['Windows', 'macOS', 'Linux'] },
  // Browsers - Productivity & New Wave
  { id: 'b13', name: 'Arc', vendor: 'The Browser Company', category: 'browsers', description: 'Sidebar-first Chromium browser with spaces and auto cleanup.', tags: ['Chromium', 'Productivity', 'Spaces'], website: 'https://arc.net', platforms: ['macOS', 'Windows'] },
  { id: 'b14', name: 'Sidekick', vendor: 'Sidekick', category: 'browsers', description: 'Chromium browser focused on focus mode and sidebar apps.', tags: ['Chromium', 'Productivity', 'Apps'], website: 'https://www.meetsidekick.com', platforms: ['Windows', 'macOS', 'Linux'] },
  { id: 'b15', name: 'Vivaldi', vendor: 'Vivaldi', category: 'browsers', description: 'Highly customizable Chromium browser with tab stacking.', tags: ['Chromium', 'Customization', 'Tabs'], website: 'https://vivaldi.com', platforms: ['Windows', 'macOS', 'Linux', 'Android'] },
  { id: 'b16', name: 'SigmaOS', vendor: 'SigmaOS', category: 'browsers', description: 'Mac-only WebKit browser designed like a todo list.', tags: ['WebKit', 'Productivity', 'Mac'], website: 'https://sigmaos.com', platforms: ['macOS'] },
  { id: 'b17', name: 'Stack', vendor: 'Stack', category: 'browsers', description: 'Chromium browser using cards instead of tabs for multitasking.', tags: ['Chromium', 'Productivity', 'Cards'], website: 'https://stackbrowser.com', platforms: ['Windows', 'macOS'] },
  { id: 'b18', name: 'Dia', vendor: 'The Browser Company', category: 'browsers', description: 'Upcoming AI-first successor to Arc.', tags: ['AI', 'Productivity', 'Coming Soon'], website: 'https://thebrowser.company', platforms: ['Web'] },
  // Browsers - Developers
  { id: 'b19', name: 'Firefox Developer Edition', vendor: 'Mozilla', category: 'browsers', description: 'Firefox variant with advanced CSS/Grid debugging tools.', tags: ['Gecko', 'Developer', 'CSS'], website: 'https://www.mozilla.org/firefox/developer', platforms: ['Windows', 'macOS', 'Linux', 'Android'] },
  { id: 'b20', name: 'Polypane', vendor: 'Polypane', category: 'browsers', description: 'Responsive design browser showing multiple viewports side-by-side.', tags: ['Developer', 'Responsive', 'Design'], website: 'https://polypane.app', platforms: ['Windows', 'macOS', 'Linux'] },
  { id: 'b21', name: 'Blisk', vendor: 'Blisk', category: 'browsers', description: 'Browser with built-in device emulation for testing.', tags: ['Developer', 'Emulation', 'Testing'], website: 'https://blisk.io', platforms: ['Windows', 'macOS'] },
  { id: 'b22', name: 'Sizzy', vendor: 'Sizzy', category: 'browsers', description: 'Responsive testing browser for web apps.', tags: ['Developer', 'Responsive', 'Testing'], website: 'https://sizzy.co', platforms: ['Windows', 'macOS', 'Linux'] },
  { id: 'b23', name: 'LT Browser', vendor: 'LambdaTest', category: 'browsers', description: 'Responsive testing browser with many device presets.', tags: ['Developer', 'Responsive', 'Testing'], website: 'https://www.lambdatest.com/lt-browser' },
  // Browsers - Gaming
  { id: 'b24', name: 'Opera GX', vendor: 'Opera', category: 'browsers', description: 'Gaming browser with resource limits and Twitch/Discord built in.', tags: ['Gaming', 'Chromium', 'Opera'], website: 'https://www.opera.com/gx', platforms: ['Windows', 'macOS'] },
  // Browsers - Lightweight
  { id: 'b25', name: 'Min', vendor: 'Min', category: 'browsers', description: 'Minimal, low-RAM browser with almost no UI.', tags: ['Lightweight', 'Minimal', 'Fast'], website: 'https://minbrowser.org' },
  { id: 'b26', name: 'Pale Moon', vendor: 'Pale Moon', category: 'browsers', description: 'Firefox fork optimized for older hardware.', tags: ['Lightweight', 'Gecko', 'Legacy'], website: 'https://www.palemoon.org', platforms: ['Windows', 'Linux'] },
  { id: 'b27', name: 'K-Meleon', vendor: 'K-Meleon', category: 'browsers', description: 'Extremely lightweight Windows browser using Gecko.', tags: ['Lightweight', 'Windows', 'Legacy'], website: 'https://kmeleonbrowser.org', platforms: ['Windows'] },
  { id: 'b28', name: 'Midori', vendor: 'Midori', category: 'browsers', description: 'Open-source, lightweight browser often used on Linux.', tags: ['Lightweight', 'Linux', 'Open Source'], website: 'https://astian.org/en/midori' },
  // Browsers - Text-based
  { id: 'b29', name: 'Lynx', vendor: 'Lynx', category: 'browsers', description: 'Classic text-only browser for terminals.', tags: ['Text', 'Terminal', 'CLI'], website: 'https://lynx.browser.org', platforms: ['Linux', 'macOS', 'Windows'] },
  { id: 'b30', name: 'w3m', vendor: 'w3m', category: 'browsers', description: 'Text-based browser that can display images inline in terminals.', tags: ['Text', 'Terminal', 'CLI'], website: 'https://w3m.sourceforge.net', platforms: ['Linux', 'macOS'] },
  { id: 'b31', name: 'Browsh', vendor: 'Browsh', category: 'browsers', description: 'Modern text-based browser that renders rich content in terminals.', tags: ['Text', 'Terminal', 'CLI'], website: 'https://www.brow.sh', platforms: ['Linux', 'macOS', 'Windows'] },
  // Product & Strategy
  { id: 'p1', name: 'Jira', vendor: 'Atlassian', category: 'product', description: 'Enterprise standard for Agile issue tracking and release management.', tags: ['Execution', 'Agile', 'Docs', 'AI Notes'], website: 'https://www.atlassian.com/software/jira' },
  { id: 'p2', name: 'Linear', vendor: 'Linear', category: 'product', description: 'Fast, keyboard-first issue tracker favored by startups.', tags: ['Execution', 'Bugs', 'Triaging', 'Insights'], website: 'https://linear.app' },
  { id: 'p3', name: 'Notion', vendor: 'Notion', category: 'product', description: 'All-in-one docs, wikis, and lightweight project management.', tags: ['Docs', 'PRDs', 'Q&A', 'Summaries'], website: 'https://www.notion.so' },
  { id: 'p4', name: 'Confluence', vendor: 'Atlassian', category: 'product', description: 'Enterprise wiki paired with Jira for knowledge and team docs.', tags: ['Knowledge', 'Enterprise', 'Search'], website: 'https://www.atlassian.com/software/confluence' },
  { id: 'p5', name: 'Asana', vendor: 'Asana', category: 'product', description: 'Cross-functional project management with timelines and status.', tags: ['Projects', 'Status', 'Risk'], website: 'https://asana.com' },
  { id: 'p6', name: 'Productboard', vendor: 'Productboard', category: 'product', description: 'Roadmapping that connects user feedback to prioritization.', tags: ['Roadmaps', 'Feedback', 'Summaries'], website: 'https://www.productboard.com' },
  { id: 'p7', name: 'Aha!', vendor: 'Aha! Labs', category: 'product', description: 'Portfolio and strategy suite for large enterprises.', tags: ['Portfolio', 'Strategy', 'Stories'], website: 'https://www.aha.io' },
  { id: 'p8', name: 'Roadmunk', vendor: 'Tempo', category: 'product', description: 'Visual roadmap tool for board-ready presentations.', tags: ['Roadmaps', 'Visualization'], website: 'https://roadmunk.com' },
  { id: 'p9', name: 'Figma', vendor: 'Figma', category: 'product', description: 'Industry-standard interface design platform.', tags: ['Design', 'Text-to-UI', 'Search'], website: 'https://www.figma.com' },
  { id: 'p10', name: 'Miro', vendor: 'Miro', category: 'product', description: 'Collaborative whiteboard for brainstorming and retros.', tags: ['Whiteboard', 'Mindmap', 'Summaries'], website: 'https://miro.com' },
  { id: 'p11', name: 'Lucidchart', vendor: 'Lucid', category: 'product', description: 'Diagramming and architecture visuals for teams.', tags: ['Diagrams', 'Architecture', 'Collaboration'], website: 'https://www.lucidchart.com' },
  { id: 'p12', name: 'Amplitude', vendor: 'Amplitude', category: 'product', description: 'Product analytics for retention, funnels, and cohorts.', tags: ['Analytics', 'Retention', 'Funnels'], website: 'https://amplitude.com' },
  { id: 'p13', name: 'Mixpanel', vendor: 'Mixpanel', category: 'product', description: 'Event analytics to track usage and behavior.', tags: ['Analytics', 'Events', 'Anomalies'], website: 'https://mixpanel.com' },
  { id: 'p14', name: 'Typeform', vendor: 'Typeform', category: 'product', description: 'Survey platform for user feedback collection.', tags: ['Surveys', 'Feedback', 'Interviews'], website: 'https://www.typeform.com' },
  { id: 'p15', name: 'Pendo', vendor: 'Pendo', category: 'product', description: 'In-app guides and onboarding with sentiment insights.', tags: ['Guides', 'Sentiment', 'Onboarding'], website: 'https://www.pendo.io' },
  // AI-native disruptors
  { id: 'p16', name: 'ChatPRD', vendor: 'ChatPRD', category: 'product', description: 'AI copilot trained to write PRDs and specs.', tags: ['PRDs', 'Specs', 'AI-native'], website: 'https://chatprd.com' },
  { id: 'p17', name: 'Kraftful', vendor: 'Kraftful', category: 'product', description: 'Feedback analysis from app reviews and support tickets.', tags: ['Feedback', 'App Store', 'Analysis'], website: 'https://www.kraftful.com' },
  { id: 'p18', name: 'Collato', vendor: 'Collato', category: 'product', description: 'Semantic search across internal knowledge (Drive, Slack, Notion).', tags: ['Search', 'Knowledge', 'Semantic'], website: 'https://www.collato.com' },
  { id: 'p19', name: 'Uizard', vendor: 'Uizard', category: 'product', description: 'Text-to-design prototyping for product flows.', tags: ['Prototyping', 'Text-to-UI', 'AI-native'], website: 'https://uizard.io' },
  { id: 'p20', name: 'Dovetail', vendor: 'Dovetail', category: 'product', description: 'User research hub that tags interviews and pain points automatically.', tags: ['Research', 'Tagging', 'Interviews'], website: 'https://dovetail.com' },
];

const DEFAULT_PLATFORMS = ['Web'];
const DEFAULT_PRICING = 'Tiered plans';
const DEFAULT_VERSION = 'Latest';

const inferPlatforms = (tool) => {
  if (tool.platforms) return tool.platforms;
  const platforms = new Set(DEFAULT_PLATFORMS);
  const vendor = (tool.vendor || '').toLowerCase();
  const name = (tool.name || '').toLowerCase();
  const category = (tool.category || '').toLowerCase();

  if (category === 'mobile') {
    // Mobile OS entries use their own name as platform
    return [tool.name];
  }

  if (vendor.includes('apple') || name.includes('ios') || name.includes('mac')) {
    platforms.add('macOS');
    platforms.add('iOS');
  }

  if (vendor.includes('microsoft') || name.includes('windows')) {
    platforms.add('Windows');
  }

  if (vendor.includes('google') || name.includes('android') || name.includes('chromeos')) {
    platforms.add('Android');
    platforms.add('ChromeOS');
  }

  if (vendor.includes('linux') || name.includes('linux') || name.includes('ubuntu') || name.includes('debian') || name.includes('fedora') || name.includes('red hat') || name.includes('podman')) {
    platforms.add('Linux');
  }

  if (vendor.includes('jetbrains')) {
    platforms.add('macOS');
    platforms.add('Windows');
    platforms.add('Linux');
  }

  // Terminals/CLI often run on desktop OSes
  if (['terminal', 'zsh', 'shell', 'git', 'warp', 'oh my zsh', 'fig'].some((keyword) => name.includes(keyword))) {
    platforms.add('macOS');
    platforms.add('Windows');
    platforms.add('Linux');
  }

  return Array.from(platforms);
};

export const TOOLS_CATALOG = BASE_TOOLS.map((tool) => ({
  version: DEFAULT_VERSION,
  pricing: DEFAULT_PRICING,
  platforms: inferPlatforms(tool),
  ...tool,
}));
