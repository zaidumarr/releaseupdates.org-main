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
  { id: 't12b', name: 'Windsurf', vendor: 'Codeium', category: 'coding', description: 'Agentic VS Code fork with built-in planning and navigation.', tags: ['IDE', 'Agentic', 'VSCode'], website: 'https://codeium.com/windsurf', logoUrl: 'https://assets.releaseupdates.org/logos/windsurf.png' },
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
  // Chatbots (expansion)
  { id: 'cb1', name: 'Grok', vendor: 'xAI', category: 'chatbots', description: 'Real-time internet-connected assistant with edgy style.', tags: ['Real-time', 'Chat', 'xAI'], website: 'https://x.ai' },
  { id: 'cb2', name: 'Pi', vendor: 'Inflection AI', category: 'chatbots', description: 'Friendly personal AI for everyday conversations.', tags: ['Personal', 'Chat', 'Friendly'], website: 'https://pi.ai' },
  { id: 'cb3', name: 'HuggingChat', vendor: 'Hugging Face', category: 'chatbots', description: 'Open-source chat interface powered by community models.', tags: ['Open Source', 'Chat', 'Community'], website: 'https://huggingface.co/chat' },
  { id: 'cb4', name: 'Le Chat', vendor: 'Mistral AI', category: 'chatbots', description: 'Mistral’s lightweight, fast chat experience with open models.', tags: ['Mistral', 'Chat', 'Fast'], website: 'https://chat.mistral.ai' },
  { id: 'cb5', name: 'Reka Core', vendor: 'Reka', category: 'chatbots', description: 'Multimodal assistant focused on reasoning and citations.', tags: ['Multimodal', 'Reasoning', 'Citations'], website: 'https://reka.ai' },
  { id: 'cb6', name: 'Cohere Coral', vendor: 'Cohere', category: 'chatbots', description: 'Enterprise assistant with retrieval and grounding options.', tags: ['Enterprise', 'Grounding', 'Retrieval'], website: 'https://cohere.com' },
  { id: 'cb7', name: 'HuggingGPT', vendor: 'Microsoft', category: 'chatbots', description: 'Chatbot that routes tasks to specialized models and tools.', tags: ['Routing', 'Multimodel', 'Tools'], website: 'https://www.microsoft.com' },
  { id: 'cb8', name: 'Llama Chat', vendor: 'Meta', category: 'chatbots', description: 'Meta Llama-powered assistant for messaging and work.', tags: ['Llama', 'Chat', 'Meta'], website: 'https://ai.meta.com' },
  { id: 'cb9', name: 'Blackbox Chat', vendor: 'Blackbox', category: 'chatbots', description: 'Developer-focused chat for debugging and snippets.', tags: ['Dev', 'Debug', 'Chat'], website: 'https://www.useblackbox.io' },
  { id: 'cb10', name: 'Jan', vendor: 'Jan', category: 'chatbots', description: 'Local-first open-source chat app that runs models on your GPU.', tags: ['Local', 'Open Source', 'Offline'], website: 'https://jan.ai' },
  { id: 'cb11', name: 'Kimi Chat', vendor: 'Moonshot AI', category: 'chatbots', description: 'Chinese-market assistant with large context for research.', tags: ['CN', 'Research', 'Long-context'], website: 'https://kimi.moonshot.cn' },
  { id: 'cb12', name: 'Character.AI', vendor: 'Character AI', category: 'chatbots', description: 'Custom personas and multi-character chats for entertainment.', tags: ['Personas', 'Social', 'Fun'], website: 'https://beta.character.ai' },
  // Data & Analytics (expansion)
  { id: 'd1', name: 'Databricks Lakehouse', vendor: 'Databricks', category: 'data', description: 'Unified data warehouse + lake with Delta tables and AI.', tags: ['Lakehouse', 'Spark', 'Delta'], website: 'https://www.databricks.com' },
  { id: 'd2', name: 'Apache Spark', vendor: 'Apache', category: 'data', description: 'Distributed compute engine for ETL, SQL, and ML pipelines.', tags: ['ETL', 'Compute', 'ML'], website: 'https://spark.apache.org' },
  { id: 'd3', name: 'Google BigQuery', vendor: 'Google', category: 'data', description: 'Serverless data warehouse with fast SQL and AI integrations.', tags: ['Warehouse', 'SQL', 'Serverless'], website: 'https://cloud.google.com/bigquery' },
  { id: 'd4', name: 'Amazon Redshift', vendor: 'Amazon', category: 'data', description: 'Cloud data warehouse with RA3 managed storage and AQUA.', tags: ['Warehouse', 'AWS', 'SQL'], website: 'https://aws.amazon.com/redshift/' },
  { id: 'd5', name: 'ClickHouse Cloud', vendor: 'ClickHouse', category: 'data', description: 'Columnar OLAP database for sub-second analytics.', tags: ['OLAP', 'Fast', 'Analytics'], website: 'https://clickhouse.com' },
  { id: 'd6', name: 'DuckDB', vendor: 'DuckDB Labs', category: 'data', description: 'In-process OLAP database for analytics on the edge.', tags: ['OLAP', 'Embedded', 'Local'], website: 'https://duckdb.org' },
  { id: 'd7', name: 'dbt Cloud', vendor: 'dbt Labs', category: 'data', description: 'Analytics engineering platform for SQL-based transformations.', tags: ['SQL', 'Transform', 'Analytics'], website: 'https://www.getdbt.com' },
  { id: 'd8', name: 'Airbyte Cloud', vendor: 'Airbyte', category: 'data', description: 'ELT platform with 300+ connectors and open-source core.', tags: ['ELT', 'Connectors', 'Open Source'], website: 'https://airbyte.com' },
  { id: 'd9', name: 'Fivetran', vendor: 'Fivetran', category: 'data', description: 'Managed ELT pipelines with automated schema handling.', tags: ['ELT', 'Pipelines', 'Managed'], website: 'https://www.fivetran.com' },
  { id: 'd10', name: 'Looker', vendor: 'Google', category: 'data', description: 'Semantic modeling layer and BI for governed metrics.', tags: ['BI', 'Semantic', 'Metrics'], website: 'https://looker.com' },
  { id: 'd11', name: 'Power BI', vendor: 'Microsoft', category: 'data', description: 'Business intelligence with Power Platform integrations.', tags: ['BI', 'Dashboards', 'Microsoft'], website: 'https://powerbi.microsoft.com' },
  { id: 'd12', name: 'Tableau', vendor: 'Salesforce', category: 'data', description: 'Interactive visual analytics and dashboards.', tags: ['BI', 'Dashboards', 'Viz'], website: 'https://www.tableau.com' },
  { id: 'd13', name: 'Apache Superset', vendor: 'Apache', category: 'data', description: 'Open-source BI and dashboarding platform.', tags: ['Open Source', 'BI', 'Dashboards'], website: 'https://superset.apache.org' },
  { id: 'd14', name: 'Metabase', vendor: 'Metabase', category: 'data', description: 'Self-service analytics with easy queries and pulses.', tags: ['BI', 'Self-serve', 'Dashboards'], website: 'https://www.metabase.com' },
  { id: 'd15', name: 'Grafana Cloud', vendor: 'Grafana Labs', category: 'data', description: 'Observability dashboards for metrics, logs, and traces.', tags: ['Observability', 'Metrics', 'Logs'], website: 'https://grafana.com' },
  { id: 'd16', name: 'Prometheus', vendor: 'CNCF', category: 'data', description: 'Open-source metrics collection and alerting.', tags: ['Metrics', 'Monitoring', 'Open Source'], website: 'https://prometheus.io' },
  { id: 'd17', name: 'Elastic Cloud', vendor: 'Elastic', category: 'data', description: 'Search and observability platform on Elasticsearch.', tags: ['Search', 'Observability', 'Logs'], website: 'https://www.elastic.co' },
  { id: 'd18', name: 'OpenSearch', vendor: 'OpenSearch', category: 'data', description: 'Community-driven search and analytics suite.', tags: ['Search', 'Analytics', 'Open Source'], website: 'https://opensearch.org' },
  // Image Gen (expansion)
  { id: 'img1', name: 'Stable Diffusion XL', vendor: 'Stability AI', category: 'image', description: 'High-quality image generation with SDXL models.', tags: ['Generative', 'Open Models', 'Images'], website: 'https://stability.ai' },
  { id: 'img2', name: 'Stable Diffusion 3', vendor: 'Stability AI', category: 'image', description: 'Next-gen SD3 models with improved fidelity and spelling.', tags: ['Generative', 'Images', 'SD3'], website: 'https://stability.ai' },
  { id: 'img3', name: 'Ideogram', vendor: 'Ideogram', category: 'image', description: 'Image generator known for accurate text rendering.', tags: ['Text', 'Logos', 'Generative'], website: 'https://ideogram.ai' },
  { id: 'img4', name: 'Leonardo AI', vendor: 'Leonardo', category: 'image', description: 'Fine-tuned image generation for game assets and art.', tags: ['Assets', 'Styles', 'Generative'], website: 'https://leonardo.ai' },
  { id: 'img5', name: 'Playground AI', vendor: 'Playground', category: 'image', description: 'Fast image gen with control nets, upscaling, and styles.', tags: ['Styles', 'Control', 'Upscale'], website: 'https://playground.com' },
  { id: 'img6', name: 'Clipdrop', vendor: 'Stability AI', category: 'image', description: 'Background removal, relighting, and image cleanup tools.', tags: ['Cleanup', 'Background', 'Relight'], website: 'https://clipdrop.co' },
  { id: 'img7', name: 'Remove.bg', vendor: 'Canva', category: 'image', description: 'One-click background removal for photos.', tags: ['Background', 'Editing', 'Photo'], website: 'https://www.remove.bg' },
  { id: 'img8', name: 'NightCafe', vendor: 'NightCafe', category: 'image', description: 'Community-driven text-to-image platform with challenges.', tags: ['Community', 'Generative', 'Images'], website: 'https://creator.nightcafe.studio' },
  { id: 'img9', name: 'DreamStudio', vendor: 'Stability AI', category: 'image', description: 'Hosted Stable Diffusion UI with fine-tuning options.', tags: ['Hosted', 'Fine-tune', 'Images'], website: 'https://dreamstudio.ai' },
  { id: 'img10', name: 'Microsoft Designer', vendor: 'Microsoft', category: 'image', description: 'Design layouts and images with Copilot assistance.', tags: ['Design', 'Layouts', 'Copilot'], website: 'https://designer.microsoft.com' },
  { id: 'img11', name: 'Kittl', vendor: 'Kittl', category: 'image', description: 'Vector and logo design with AI text and templates.', tags: ['Logos', 'Vectors', 'Templates'], website: 'https://www.kittl.com' },
  { id: 'img12', name: 'Stockimg AI', vendor: 'Stockimg', category: 'image', description: 'Generate stock-style images and mockups for marketing.', tags: ['Stock', 'Marketing', 'Mockups'], website: 'https://stockimg.ai' },
  { id: 'img13', name: 'Canva Studio', vendor: 'Canva', category: 'image', description: 'Pro design suite with AI layout, resize, and magic edit.', tags: ['Design', 'Templates', 'Magic'], website: 'https://www.canva.com' },
  { id: 'img14', name: 'Photoroom', vendor: 'Photoroom', category: 'image', description: 'E-commerce photo editor with AI background and lighting.', tags: ['E-commerce', 'Photos', 'Editing'], website: 'https://www.photoroom.com' },
  { id: 'img15', name: 'VistaCreate', vendor: 'Vista', category: 'image', description: 'Design tool with AI images and brand kits.', tags: ['Design', 'Brand', 'Templates'], website: 'https://create.vista.com' },
  { id: 'img16', name: 'Picsart AI', vendor: 'Picsart', category: 'image', description: 'Mobile-first image generation and editing suite.', tags: ['Mobile', 'Editing', 'AI'], website: 'https://picsart.com' },
  // Media (audio/video) expansion
  { id: 'media1', name: 'Pika Labs', vendor: 'Pika', category: 'media', description: 'Text-to-video generation with motion controls.', tags: ['Video', 'Generative', 'Motion'], website: 'https://pika.art' },
  { id: 'media2', name: 'Luma Dream Machine', vendor: 'Luma AI', category: 'media', description: 'High-fidelity video generation from text or images.', tags: ['Video', 'Generative', 'Fidelity'], website: 'https://lumalabs.ai' },
  { id: 'media3', name: 'HeyGen', vendor: 'HeyGen', category: 'media', description: 'Avatar-led video creation and dubbing in many languages.', tags: ['Avatars', 'Dubbing', 'Video'], website: 'https://www.heygen.com' },
  { id: 'media4', name: 'Opus Clip', vendor: 'Opus', category: 'media', description: 'Auto-repurpose long videos into short, viral clips.', tags: ['Clips', 'Repurpose', 'Shorts'], website: 'https://www.opus.pro' },
  { id: 'media5', name: 'Veed.io', vendor: 'Veed', category: 'media', description: 'Browser-based video editor with AI captions and cleanup.', tags: ['Editor', 'Captions', 'Video'], website: 'https://www.veed.io' },
  { id: 'media6', name: 'Kapwing', vendor: 'Kapwing', category: 'media', description: 'Collaborative video editor with AI subtitling and cleanup.', tags: ['Editor', 'Collaboration', 'Video'], website: 'https://www.kapwing.com' },
  { id: 'media7', name: 'Riverside', vendor: 'Riverside', category: 'media', description: 'Remote podcast and video recording with AI notes.', tags: ['Podcast', 'Recording', 'Transcription'], website: 'https://riverside.fm' },
  { id: 'media8', name: 'Loom AI', vendor: 'Atlassian', category: 'media', description: 'Async video messaging with AI summaries.', tags: ['Async', 'Video', 'Summary'], website: 'https://www.loom.com' },
  { id: 'media9', name: 'InVideo', vendor: 'InVideo', category: 'media', description: 'Template-driven video creation with AI scripts.', tags: ['Templates', 'Scripts', 'Video'], website: 'https://invideo.io' },
  { id: 'media10', name: 'Wisecut', vendor: 'Wisecut', category: 'media', description: 'AI auto-cutting, jump cuts, and smart background music.', tags: ['Editing', 'Auto-cut', 'Audio'], website: 'https://www.wisecut.video' },
  { id: 'media11', name: 'Podcastle', vendor: 'Podcastle', category: 'media', description: 'Podcast recording and editing with AI cleanup.', tags: ['Podcast', 'Editing', 'Audio'], website: 'https://podcastle.ai' },
  { id: 'media12', name: 'Endel', vendor: 'Endel', category: 'media', description: 'AI-generated soundscapes for focus and sleep.', tags: ['Audio', 'Wellness', 'Soundscapes'], website: 'https://endel.io' },
  { id: 'media13', name: 'Aiva', vendor: 'Aiva', category: 'media', description: 'AI music composition for films and games.', tags: ['Music', 'Composition', 'AI'], website: 'https://www.aiva.ai' },
  { id: 'media14', name: 'Boomy', vendor: 'Boomy', category: 'media', description: 'Create and publish AI-generated music tracks quickly.', tags: ['Music', 'Creation', 'AI'], website: 'https://boomy.com' },
  { id: 'media15', name: 'AudioPen', vendor: 'AudioPen', category: 'media', description: 'Voice recorder that summarizes and cleans up notes.', tags: ['Voice', 'Summary', 'Notes'], website: 'https://audiopen.ai' },
  { id: 'media16', name: 'Otter.ai', vendor: 'Otter.ai', category: 'media', description: 'Meeting transcription and AI summaries.', tags: ['Transcription', 'Meetings', 'Notes'], website: 'https://otter.ai' },
  // Marketing & Growth expansion
  { id: 'mkt1', name: 'Mailchimp', vendor: 'Intuit', category: 'marketing', description: 'Email marketing platform with AI-assisted journeys.', tags: ['Email', 'Automation', 'Journeys'], website: 'https://mailchimp.com' },
  { id: 'mkt2', name: 'Marketo Engage', vendor: 'Adobe', category: 'marketing', description: 'Enterprise marketing automation with lead scoring.', tags: ['Automation', 'Leads', 'Enterprise'], website: 'https://business.adobe.com/products/marketo.html' },
  { id: 'mkt3', name: 'Salesforce Marketing Cloud', vendor: 'Salesforce', category: 'marketing', description: 'Omni-channel campaigns with Einstein AI.', tags: ['Omni-channel', 'Einstein', 'Enterprise'], website: 'https://www.salesforce.com/products/marketing-cloud/' },
  { id: 'mkt4', name: 'Klaviyo', vendor: 'Klaviyo', category: 'marketing', description: 'Ecommerce-focused email/SMS journeys and segments.', tags: ['Ecommerce', 'Email', 'SMS'], website: 'https://www.klaviyo.com' },
  { id: 'mkt5', name: 'Braze', vendor: 'Braze', category: 'marketing', description: 'Customer engagement platform for push, in-app, and email.', tags: ['Engagement', 'Mobile', 'Journeys'], website: 'https://www.braze.com' },
  { id: 'mkt6', name: 'Iterable', vendor: 'Iterable', category: 'marketing', description: 'Cross-channel campaigns with AI experimentation.', tags: ['Journeys', 'Email', 'Experimentation'], website: 'https://iterable.com' },
  { id: 'mkt7', name: 'Customer.io', vendor: 'Customer.io', category: 'marketing', description: 'Behavioral messaging and data activation platform.', tags: ['Behavioral', 'Messaging', 'Journeys'], website: 'https://customer.io' },
  { id: 'mkt8', name: 'Apollo.io', vendor: 'Apollo', category: 'marketing', description: 'Prospecting database with sequences and enrichment.', tags: ['Prospecting', 'Sequences', 'Enrichment'], website: 'https://www.apollo.io' },
  { id: 'mkt9', name: 'Outreach', vendor: 'Outreach', category: 'marketing', description: 'Sales engagement with AI scoring and sequences.', tags: ['Sales', 'Sequences', 'AI'], website: 'https://www.outreach.io' },
  { id: 'mkt10', name: 'Lemlist', vendor: 'Lemlist', category: 'marketing', description: 'Cold outreach with personalization and deliverability tools.', tags: ['Cold Email', 'Personalization', 'Deliverability'], website: 'https://www.lemlist.com' },
  { id: 'mkt11', name: 'Instantly', vendor: 'Instantly', category: 'marketing', description: 'Multi-inbox cold email sending with warmup.', tags: ['Cold Email', 'Warmup', 'Automation'], website: 'https://instantly.ai' },
  { id: 'mkt12', name: 'Campaign Monitor', vendor: 'CM Group', category: 'marketing', description: 'Email marketing with simple templates and automation.', tags: ['Email', 'Templates', 'Automation'], website: 'https://www.campaignmonitor.com' },
  { id: 'mkt13', name: 'Intercom', vendor: 'Intercom', category: 'marketing', description: 'Customer messaging platform with Fin AI agent.', tags: ['Messaging', 'Support', 'AI Agent'], website: 'https://www.intercom.com' },
  { id: 'mkt14', name: 'Zendesk', vendor: 'Zendesk', category: 'marketing', description: 'Support and messaging with AI for tickets and bots.', tags: ['Support', 'Bots', 'Tickets'], website: 'https://www.zendesk.com' },
  { id: 'mkt15', name: 'Drift', vendor: 'Drift', category: 'marketing', description: 'AI chat for B2B pipeline and ABM.', tags: ['Chat', 'ABM', 'B2B'], website: 'https://www.drift.com' },
  { id: 'mkt16', name: 'Gong Engage', vendor: 'Gong', category: 'marketing', description: 'Revenue engagement with AI coaching and insights.', tags: ['Revenue', 'Coaching', 'AI'], website: 'https://www.gong.io' },
  // Productivity expansion
  { id: 'prod1', name: 'Slack', vendor: 'Salesforce', category: 'productivity', description: 'Team collaboration with AI search and huddles.', tags: ['Chat', 'Collaboration', 'AI'], website: 'https://slack.com' },
  { id: 'prod2', name: 'Microsoft Teams', vendor: 'Microsoft', category: 'productivity', description: 'Enterprise collaboration with Copilot and telephony.', tags: ['Chat', 'Meetings', 'Enterprise'], website: 'https://www.microsoft.com/microsoft-teams' },
  { id: 'prod3', name: 'Zoom AI', vendor: 'Zoom', category: 'productivity', description: 'Meetings with AI summaries, clips, and whiteboard.', tags: ['Meetings', 'Summary', 'Clips'], website: 'https://zoom.us' },
  { id: 'prod4', name: 'Airtable', vendor: 'Airtable', category: 'productivity', description: 'Low-code tables with interfaces and AI fields.', tags: ['Low-code', 'Tables', 'Automation'], website: 'https://www.airtable.com' },
  { id: 'prod5', name: 'Coda', vendor: 'Coda', category: 'productivity', description: 'Docs and tables with AI blocks and packs.', tags: ['Docs', 'Tables', 'AI'], website: 'https://coda.io' },
  { id: 'prod6', name: 'ClickUp', vendor: 'ClickUp', category: 'productivity', description: 'Project management with docs, goals, and AI.', tags: ['Projects', 'Docs', 'AI'], website: 'https://clickup.com' },
  { id: 'prod7', name: 'Monday.com', vendor: 'Monday', category: 'productivity', description: 'Work OS for projects, CRM, and dev with AI.', tags: ['Projects', 'CRM', 'AI'], website: 'https://monday.com' },
  { id: 'prod8', name: 'Trello', vendor: 'Atlassian', category: 'productivity', description: 'Kanban boards with automation and AI summaries.', tags: ['Kanban', 'Boards', 'Automation'], website: 'https://trello.com' },
  { id: 'prod9', name: 'Todoist', vendor: 'Doist', category: 'productivity', description: 'Task management with natural language and AI planning.', tags: ['Tasks', 'Personal', 'Planning'], website: 'https://todoist.com' },
  { id: 'prod10', name: 'Obsidian', vendor: 'Obsidian', category: 'productivity', description: 'Local-first knowledge graph with community AI plugins.', tags: ['Notes', 'Graph', 'Local'], website: 'https://obsidian.md' },
  { id: 'prod11', name: 'Evernote', vendor: 'Bending Spoons', category: 'productivity', description: 'Cross-platform notes with search and templates.', tags: ['Notes', 'Archive', 'Templates'], website: 'https://www.evernote.com' },
  { id: 'prod12', name: 'Dropbox Paper', vendor: 'Dropbox', category: 'productivity', description: 'Collaborative docs integrated with Dropbox files.', tags: ['Docs', 'Collaboration', 'Cloud'], website: 'https://paper.dropbox.com' },
  { id: 'prod13', name: 'Quip', vendor: 'Salesforce', category: 'productivity', description: 'Docs and sheets with Salesforce integration.', tags: ['Docs', 'Sheets', 'CRM'], website: 'https://www.quip.com' },
  { id: 'prod14', name: 'Superhuman', vendor: 'Superhuman', category: 'productivity', description: 'AI-first email client focused on speed.', tags: ['Email', 'Productivity', 'AI'], website: 'https://superhuman.com' },
  { id: 'prod15', name: 'Shortwave', vendor: 'Shortwave', category: 'productivity', description: 'Gmail-based email with AI summaries and workflows.', tags: ['Email', 'Summaries', 'Workflows'], website: 'https://www.shortwave.com' },
  // Search expansion
  { id: 's1', name: 'Google Search', vendor: 'Google', category: 'search', description: 'Global web search with AI Overviews.', tags: ['Web', 'AI Overviews', 'Google'], website: 'https://www.google.com' },
  { id: 's2', name: 'Bing Search', vendor: 'Microsoft', category: 'search', description: 'Web search with Copilot answers and citations.', tags: ['Web', 'Copilot', 'Microsoft'], website: 'https://www.bing.com' },
  { id: 's3', name: 'Brave Search', vendor: 'Brave', category: 'search', description: 'Independent index with Summarizer and privacy focus.', tags: ['Privacy', 'Summaries', 'Independent'], website: 'https://search.brave.com' },
  { id: 's4', name: 'Kagi', vendor: 'Kagi', category: 'search', description: 'Subscription search with small web and AI lens.', tags: ['Subscription', 'Quality', 'AI Lens'], website: 'https://kagi.com' },
  { id: 's5', name: 'Andi Search', vendor: 'Andi', category: 'search', description: 'Chat-style answers with live web browsing.', tags: ['Chat', 'Web', 'Answers'], website: 'https://andisearch.com' },
  { id: 's6', name: 'NeevaAI', vendor: 'Neeva', category: 'search', description: 'Ad-free search with AI summaries (legacy/archived).', tags: ['Ad-free', 'Summaries', 'Legacy'], website: 'https://neeva.com' },
  { id: 's7', name: 'DuckDuckGo Search', vendor: 'DuckDuckGo', category: 'search', description: 'Privacy-first search with anonymous requests.', tags: ['Privacy', 'Web', 'No Tracking'], website: 'https://duckduckgo.com' },
  { id: 's8', name: 'Startpage', vendor: 'Startpage', category: 'search', description: 'Private search proxying Google results.', tags: ['Privacy', 'Proxy', 'Google'], website: 'https://www.startpage.com' },
  { id: 's9', name: 'Qwant', vendor: 'Qwant', category: 'search', description: 'European privacy search engine.', tags: ['Privacy', 'EU', 'Web'], website: 'https://www.qwant.com' },
  { id: 's10', name: 'Swisscows', vendor: 'Swisscows', category: 'search', description: 'Family-friendly private search from Switzerland.', tags: ['Privacy', 'Family', 'Web'], website: 'https://swisscows.com' },
  { id: 's11', name: 'SearxNG', vendor: 'Searx', category: 'search', description: 'Open-source metasearch you can self-host.', tags: ['Open Source', 'Metasearch', 'Privacy'], website: 'https://searx.space' },
  { id: 's12', name: 'Marginalia', vendor: 'Marginalia', category: 'search', description: 'Independent search focused on text-heavy sites.', tags: ['Indie', 'Text', 'Minimal'], website: 'https://search.marginalia.nu' },
  { id: 's13', name: 'Reddit Search', vendor: 'Reddit', category: 'search', description: 'Community Q&A search for discussions.', tags: ['Communities', 'Discussions', 'Social'], website: 'https://www.reddit.com' },
  { id: 's14', name: 'Stack Overflow Search', vendor: 'Stack Overflow', category: 'search', description: 'Developer Q&A search with accepted answers.', tags: ['Developers', 'Q&A', 'Code'], website: 'https://stackoverflow.com' },
  { id: 's15', name: 'ArXiv Search', vendor: 'Cornell', category: 'search', description: 'Search engine for academic preprints.', tags: ['Academic', 'Papers', 'Science'], website: 'https://arxiv.org' },
  { id: 's16', name: 'Semantic Scholar', vendor: 'AI2', category: 'search', description: 'AI-powered academic search with citations.', tags: ['Academic', 'AI', 'Citations'], website: 'https://www.semanticscholar.org' },
  { id: 's17', name: 'Lens.org', vendor: 'Lens', category: 'search', description: 'Patent and scholarly search with analytics.', tags: ['Patents', 'Scholarly', 'Analytics'], website: 'https://www.lens.org' },
  // Mobile & OS expansion
  { id: 'mob1', name: 'HarmonyOS', vendor: 'Huawei', category: 'mobile', description: 'Huawei distributed OS for phones, wearables, and IoT.', tags: ['Mobile OS', 'IoT', 'Huawei'], website: 'https://www.harmonyos.com' },
  { id: 'mob2', name: 'KaiOS', vendor: 'KaiOS', category: 'mobile', description: 'Lightweight mobile OS for feature phones.', tags: ['Feature Phone', 'Mobile OS', 'Lightweight'], website: 'https://www.kaiostech.com' },
  { id: 'mob3', name: 'Fire OS', vendor: 'Amazon', category: 'mobile', description: 'Amazon Android fork for Fire tablets and TV.', tags: ['Android', 'Amazon', 'Tablets'], website: 'https://developer.amazon.com/apps-and-games' },
  { id: 'mob4', name: 'LineageOS', vendor: 'LineageOS', category: 'mobile', description: 'Community Android distribution for many devices.', tags: ['Android', 'Open Source', 'Custom ROM'], website: 'https://lineageos.org' },
  { id: 'mob5', name: 'GrapheneOS', vendor: 'GrapheneOS', category: 'mobile', description: 'Privacy-hardened Android for Pixel devices.', tags: ['Privacy', 'Android', 'Security'], website: 'https://grapheneos.org' },
  { id: 'mob6', name: 'CalyxOS', vendor: 'Calyx Institute', category: 'mobile', description: 'Privacy-focused Android with microG and F-Droid.', tags: ['Privacy', 'Android', 'Open Source'], website: 'https://calyxos.org' },
  { id: 'mob7', name: 'Ubuntu Touch', vendor: 'UBports', category: 'mobile', description: 'Linux-based mobile OS with convergence goals.', tags: ['Linux', 'Mobile OS', 'Open Source'], website: 'https://ubuntu-touch.io' },
  { id: 'mob8', name: 'Wear OS', vendor: 'Google', category: 'mobile', description: 'Google smartwatch OS with Play Store apps.', tags: ['Wearables', 'Android', 'Smartwatch'], website: 'https://wearos.google.com' },
  { id: 'mob9', name: 'watchOS', vendor: 'Apple', category: 'mobile', description: 'Apple Watch operating system with fitness tracking.', tags: ['Wearables', 'Apple', 'Fitness'], website: 'https://www.apple.com/watchos' },
  { id: 'mob10', name: 'tvOS', vendor: 'Apple', category: 'mobile', description: 'Apple TV OS for streaming and gaming.', tags: ['TV', 'Apple', 'Media'], website: 'https://www.apple.com/tvos' },
  // Health expansion
  { id: 'h1', name: 'Nuance DAX', vendor: 'Nuance', category: 'health', description: 'Ambient clinical documentation with Copilot.', tags: ['Ambient', 'Notes', 'Clinical'], website: 'https://www.nuance.com/healthcare' },
  { id: 'h2', name: 'DeepScribe', vendor: 'DeepScribe', category: 'health', description: 'AI medical scribe for primary care.', tags: ['Scribe', 'Notes', 'Clinical'], website: 'https://www.deepscribe.ai' },
  { id: 'h3', name: 'Suki AI', vendor: 'Suki', category: 'health', description: 'Voice assistant for clinicians with EHR integrations.', tags: ['Voice', 'Assistant', 'EHR'], website: 'https://www.suki.ai' },
  { id: 'h4', name: '3M Fluency Direct', vendor: '3M', category: 'health', description: 'Speech recognition for clinical documentation.', tags: ['Speech', 'Documentation', 'Hospitals'], website: 'https://www.3m.com/healthcare' },
  { id: 'h5', name: 'Notable Health', vendor: 'Notable', category: 'health', description: 'AI automation for referrals, prior auth, and intake.', tags: ['Automation', 'Intake', 'Revenue'], website: 'https://www.notablehealth.com' },
  { id: 'h6', name: 'PathAI', vendor: 'PathAI', category: 'health', description: 'AI pathology platform for diagnostics.', tags: ['Pathology', 'Diagnostics', 'AI'], website: 'https://www.pathai.com' },
  { id: 'h7', name: 'Owkin', vendor: 'Owkin', category: 'health', description: 'Federated learning for biomedical research.', tags: ['Federated', 'Research', 'Biotech'], website: 'https://owkin.com' },
  { id: 'h8', name: 'Viz.ai', vendor: 'Viz', category: 'health', description: 'AI stroke and PE detection with alerting to care teams.', tags: ['Imaging', 'Stroke', 'Alerts'], website: 'https://www.viz.ai' },
];

const DEFAULT_PLATFORMS = ['Web'];
const DEFAULT_PRICING = 'Tiered plans';
const DEFAULT_VERSION = 'Latest';

const deriveLogoUrl = (tool) => {
  if (tool.logoUrl) return tool.logoUrl;
  if (!tool.website) return null;
  try {
    const host = new URL(tool.website).hostname;
    return `https://logo.clearbit.com/${host}`;
  } catch (error) {
    return null;
  }
};

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
  logoUrl: deriveLogoUrl(tool),
  ...tool,
}));
