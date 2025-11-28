import {
  MessageSquare,
  Globe,
  Code2,
  Image as ImageIcon,
  Video,
  Briefcase,
  Workflow,
  BarChart3,
} from 'lucide-react';

export const CATEGORIES = {
  chatbots: {
    label: 'Chatbots & Assistants',
    icon: MessageSquare,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  search: {
    label: 'Search & Research',
    icon: Globe,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  coding: {
    label: 'Coding & Dev Tools',
    icon: Code2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  image: {
    label: 'Image Gen & Design',
    icon: ImageIcon,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
  media: {
    label: 'Video, Audio & Media',
    icon: Video,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  productivity: {
    label: 'Productivity & Knowledge',
    icon: Briefcase,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  automation: {
    label: 'Automation & Agents',
    icon: Workflow,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  data: {
    label: 'Data & Enterprise',
    icon: BarChart3,
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/20',
  },
};
