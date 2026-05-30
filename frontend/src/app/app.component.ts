import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { IconComponent } from './ui/icon.component';

type Tone = 'cyan' | 'violet' | 'mint' | 'amber' | 'rose' | 'sky';

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

interface SkillNode {
  category: string;
  name: string;
  years: string;
  proficiency: number;
  projects: string;
  tone: Tone;
}

interface ExperienceItem {
  company: string;
  period: string;
  role: string;
  highlights: string[];
  tone: Tone;
}

interface Project {
  id: number;
  title: string;
  category: string;
  summary: string;
  stack: string[];
  impact: string;
  architecture: string[];
  database: string;
  apiFlow: string;
  scalability: string;
  deployment: string;
  tone: Tone;
}

interface ChatMessage {
  role: 'assistant' | 'user';
  text: string;
}

interface BlogPost {
  title: string;
  tag: string;
  readTime: string;
  summary: string;
}

interface Snippet {
  label: string;
  language: string;
  code: string;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionLike;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<{ 0: { transcript: string } }>;
}

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'mk-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IconComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(18px)' }),
        animate('520ms cubic-bezier(.22,1,.36,1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas', { static: true }) private readonly heroCanvas?: ElementRef<HTMLCanvasElement>;

  readonly roles = ['Senior Python Backend Engineer', 'Full Stack Developer', 'AI Solutions Architect', 'System Architect'];
  readonly navItems = ['Assistant', 'Skills', 'Experience', 'Projects', 'Architecture', 'Contact'];
  readonly stats: Stat[] = [
    { label: 'Years Experience', value: 4, suffix: '+' },
    { label: 'Projects Delivered', value: 20, suffix: '+' },
    { label: 'Users Impacted', value: 500, suffix: 'K+' },
    { label: 'Production Apps', value: 10, suffix: '+' }
  ];
  readonly achievements = [
    { metric: '50%', label: 'Development effort reduced', tone: 'cyan' },
    { metric: '40%', label: 'Team efficiency improved', tone: 'mint' },
    { metric: 'Top 5%', label: 'Performance ranking', tone: 'amber' },
    { metric: '200+', label: 'Hours saved monthly', tone: 'rose' },
    { metric: '40%', label: 'Response time improved', tone: 'sky' },
    { metric: '500K+', label: 'Users served', tone: 'violet' }
  ];
  readonly skillNodes: SkillNode[] = [
    { category: 'Backend', name: 'Python', years: '4+ years', proficiency: 96, projects: 'APIs, ETL, AI orchestration', tone: 'cyan' },
    { category: 'Backend', name: 'Django', years: '4+ years', proficiency: 92, projects: 'ERP, CRM, auth systems', tone: 'mint' },
    { category: 'Backend', name: 'FastAPI', years: '3+ years', proficiency: 91, projects: 'AI services, realtime APIs', tone: 'sky' },
    { category: 'Backend', name: 'Flask', years: '3+ years', proficiency: 84, projects: 'Microservices and tools', tone: 'amber' },
    { category: 'Backend', name: 'Celery', years: '3+ years', proficiency: 86, projects: 'Async jobs and queues', tone: 'rose' },
    { category: 'Frontend', name: 'Angular', years: '3+ years', proficiency: 89, projects: 'Dashboards and SaaS panels', tone: 'violet' },
    { category: 'Frontend', name: 'TypeScript', years: '3+ years', proficiency: 88, projects: 'Reactive interfaces', tone: 'cyan' },
    { category: 'Frontend', name: 'RxJS', years: '3+ years', proficiency: 84, projects: 'State and streams', tone: 'mint' },
    { category: 'Frontend', name: 'NgRx', years: '2+ years', proficiency: 78, projects: 'Enterprise state', tone: 'amber' },
    { category: 'Databases', name: 'PostgreSQL', years: '4+ years', proficiency: 93, projects: 'Schema design, tuning', tone: 'sky' },
    { category: 'Databases', name: 'Redis', years: '3+ years', proficiency: 86, projects: 'Cache, queues, rate limits', tone: 'rose' },
    { category: 'Cloud', name: 'AWS', years: '3+ years', proficiency: 84, projects: 'EC2, S3, Lambda, CloudFront', tone: 'amber' },
    { category: 'AI', name: 'OpenAI', years: '2+ years', proficiency: 90, projects: 'Assistants, RAG, summarizers', tone: 'cyan' },
    { category: 'AI', name: 'LangChain', years: '2+ years', proficiency: 86, projects: 'Agents and retrieval flows', tone: 'violet' },
    { category: 'AI', name: 'Vector DB', years: '2+ years', proficiency: 82, projects: 'Pinecone, Chroma', tone: 'mint' },
    { category: 'DevOps', name: 'Docker', years: '4+ years', proficiency: 90, projects: 'Production deployments', tone: 'sky' },
    { category: 'DevOps', name: 'Kubernetes', years: '2+ years', proficiency: 76, projects: 'Scalable deployments', tone: 'rose' },
    { category: 'DevOps', name: 'GitHub Actions', years: '3+ years', proficiency: 86, projects: 'CI/CD pipelines', tone: 'amber' }
  ];
  readonly experience: ExperienceItem[] = [
    {
      company: 'AdGlobal360',
      period: 'May 2024 - Present',
      role: 'Senior Python Full Stack Developer',
      highlights: ['Developed 10+ applications', 'Served 500K+ users', 'Built high-throughput APIs', 'Created data pipelines', 'Shipped Docker deployments', 'Optimized response times by 40%'],
      tone: 'cyan'
    },
    {
      company: 'ToXSL Technologies',
      period: 'Nov 2021 - May 2024',
      role: 'Python Backend Developer',
      highlights: ['Built Django applications', 'Designed REST APIs', 'Implemented authentication systems', 'Modeled PostgreSQL architectures', 'Integrated modern frontends', 'Improved delivery velocity across teams'],
      tone: 'violet'
    }
  ];
  readonly projectCategories = ['All', 'AI Projects', 'Backend Projects', 'SaaS Projects', 'Real-Time Systems', 'Data Engineering', 'Enterprise Applications'];
  readonly projects: Project[] = [
    this.project(1, 'AI Resume Screener', 'AI Projects', 'Ranks candidates with RAG-backed role matching and explainable scorecards.', ['FastAPI', 'OpenAI', 'LangChain', 'PostgreSQL'], 'Cut resume review time by 60%', 'cyan'),
    this.project(2, 'AI Interview Assistant', 'AI Projects', 'Generates adaptive interview paths, transcripts, and hiring summaries.', ['Python', 'WebSockets', 'OpenAI', 'Redis'], 'Standardized interview feedback', 'violet'),
    this.project(3, 'AI Document Chat', 'AI Projects', 'Conversational document intelligence over PDFs, policies, and knowledge bases.', ['FastAPI', 'Chroma', 'RAG', 'Angular'], 'Reduced manual search by 200+ hours/month', 'mint'),
    this.project(4, 'AI Meeting Summarizer', 'AI Projects', 'Turns recordings into action items, owners, decisions, and searchable notes.', ['Python', 'OpenAI', 'Celery', 'S3'], 'Improved follow-through across teams', 'amber'),
    this.project(5, 'AI Customer Support Bot', 'AI Projects', 'Handles tier-one support with escalation, memory, and quality analytics.', ['LangChain', 'FastAPI', 'Redis', 'PostgreSQL'], 'Lowered first response time by 40%', 'rose'),
    this.project(6, 'ERP System', 'Backend Projects', 'Finance, inventory, approvals, and reporting modules for operations teams.', ['Django', 'PostgreSQL', 'Celery', 'Docker'], 'Unified core business workflows', 'sky'),
    this.project(7, 'CRM Platform', 'Backend Projects', 'Lead lifecycle, pipeline forecasting, role permissions, and activity timelines.', ['Django REST', 'Redis', 'Angular', 'AWS'], 'Improved sales visibility', 'cyan'),
    this.project(8, 'Inventory Management', 'Backend Projects', 'Stock, purchase, vendor, warehouse, and barcode workflows.', ['FastAPI', 'PostgreSQL', 'Redis', 'Docker'], 'Reduced stock mismatch incidents', 'mint'),
    this.project(9, 'Order Management', 'Backend Projects', 'Distributed order lifecycle with payment, dispatch, and status automation.', ['Python', 'RabbitMQ', 'PostgreSQL', 'Nginx'], 'Handled high-volume ordering', 'amber'),
    this.project(10, 'Payment Gateway System', 'Backend Projects', 'Secure payment orchestration, webhooks, reconciliation, and retries.', ['FastAPI', 'PostgreSQL', 'JWT', 'AWS'], 'Improved transaction reliability', 'rose'),
    this.project(11, 'Subscription Platform', 'SaaS Projects', 'Plan management, billing events, trialing, invoices, and entitlements.', ['Django', 'Stripe', 'Celery', 'PostgreSQL'], 'Enabled recurring revenue workflows', 'violet'),
    this.project(12, 'Analytics Dashboard', 'SaaS Projects', 'Executive metrics, anomaly detection, funnels, and drill-down dashboards.', ['Angular', 'FastAPI', 'Redis', 'Charts'], 'Improved decision speed', 'sky'),
    this.project(13, 'Multi-Tenant SaaS', 'SaaS Projects', 'Tenant isolation, billing, RBAC, audit logs, and configurable workflows.', ['FastAPI', 'PostgreSQL', 'Docker', 'AWS'], 'Scaled one platform across clients', 'cyan'),
    this.project(14, 'Chat Application', 'Real-Time Systems', 'Realtime rooms, typing states, receipts, moderation, and presence.', ['WebSockets', 'Redis', 'FastAPI', 'Angular'], 'Delivered low-latency messaging', 'mint'),
    this.project(15, 'Notification Engine', 'Real-Time Systems', 'Rules-based email, SMS, push, and in-app notification orchestration.', ['Celery', 'Redis', 'Python', 'PostgreSQL'], 'Centralized communication delivery', 'amber'),
    this.project(16, 'Live Tracking Platform', 'Real-Time Systems', 'Location ingestion, route updates, geofencing, and operational dashboards.', ['FastAPI', 'WebSockets', 'PostGIS', 'Angular'], 'Improved field operations visibility', 'rose'),
    this.project(17, 'Product Analytics Pipeline', 'Data Engineering', 'Event ingestion, transformations, cohorts, and downstream reports.', ['Python', 'PostgreSQL', 'S3', 'Airflow'], 'Processed product telemetry reliably', 'sky'),
    this.project(18, 'ETL Framework', 'Data Engineering', 'Reusable extraction, validation, retry, and quality-check framework.', ['Python', 'Pandas', 'Celery', 'Docker'], 'Reduced manual data repair', 'violet'),
    this.project(19, 'Web Scraping Engine', 'Data Engineering', 'Scheduler-driven crawling, deduplication, parsing, and monitoring.', ['Python', 'Playwright', 'Redis', 'PostgreSQL'], 'Automated market intelligence', 'mint'),
    this.project(20, 'HR Management', 'Enterprise Applications', 'Employees, leave, attendance, payroll, approvals, and reporting.', ['Django', 'PostgreSQL', 'Angular', 'JWT'], 'Streamlined HR operations', 'cyan'),
    this.project(21, 'Learning Management System', 'Enterprise Applications', 'Courses, assessments, progress tracking, certificates, and analytics.', ['Django REST', 'Angular', 'Redis', 'AWS'], 'Improved training delivery', 'amber'),
    this.project(22, 'Healthcare Management Portal', 'Enterprise Applications', 'Patients, appointments, reports, role access, and audit-ready workflows.', ['FastAPI', 'PostgreSQL', 'Docker', 'CloudFront'], 'Improved care coordination', 'rose')
  ];
  readonly architectures = [
    { title: 'Microservices', icon: 'cpu', nodes: ['API Gateway', 'Auth', 'Orders', 'Billing', 'Events', 'Observability'], tone: 'cyan' },
    { title: 'Event Driven Systems', icon: 'brain-circuit', nodes: ['Producer', 'Queue', 'Workers', 'Retry DLQ', 'Notifier', 'Audit'], tone: 'amber' },
    { title: 'AI RAG Pipeline', icon: 'sparkles', nodes: ['Documents', 'Chunker', 'Embeddings', 'Vector DB', 'Retriever', 'LLM'], tone: 'violet' },
    { title: 'Kubernetes Deployment', icon: 'cloud', nodes: ['Ingress', 'Pods', 'Services', 'HPA', 'Secrets', 'Logs'], tone: 'mint' },
    { title: 'CI/CD Workflow', icon: 'shield-check', nodes: ['Commit', 'Tests', 'Build', 'Scan', 'Deploy', 'Rollback'], tone: 'rose' }
  ];
  readonly snippets: Snippet[] = [
    {
      label: 'FastAPI',
      language: 'python',
      code: `@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest, ai: PortfolioAI = Depends(get_ai)):
    context = await ai.retrieve_context(payload.message)
    answer = await ai.answer(payload.message, context)
    return ChatResponse(answer=answer, sources=context.sources)`
    },
    {
      label: 'Angular',
      language: 'typescript',
      code: `readonly assistantState = signal<AssistantState>("idle");

streamResponse(prompt: string): void {
  this.socket.send(JSON.stringify({ prompt, memory: this.thread() }));
}`
    },
    {
      label: 'Docker',
      language: 'docker',
      code: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app ./app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]`
    },
    {
      label: 'SQL',
      language: 'sql',
      code: `create index concurrently idx_events_tenant_created
on analytics_events (tenant_id, created_at desc)
where deleted_at is null;`
    },
    {
      label: 'AI Pipeline',
      language: 'python',
      code: `chunks = splitter.split_documents(documents)
vectors = embeddings.embed_documents([chunk.page_content for chunk in chunks])
vector_store.upsert(vectors, metadata=[chunk.metadata for chunk in chunks])`
    }
  ];
  readonly blogPosts: BlogPost[] = [
    { title: 'Python Best Practices for Production APIs', tag: 'Python', readTime: '7 min', summary: 'Typing, dependency boundaries, validation, observability, and deployment practices for durable backend systems.' },
    { title: 'FastAPI Performance Playbook', tag: 'FastAPI', readTime: '6 min', summary: 'Async boundaries, caching, connection pooling, response models, and background workloads.' },
    { title: 'Django Architecture That Scales', tag: 'Django', readTime: '8 min', summary: 'Modular apps, services, selectors, tasks, and query tuning for long-lived enterprise products.' },
    { title: 'AI Engineering Beyond Prompting', tag: 'AI', readTime: '9 min', summary: 'RAG evaluation, tool calls, memory, streaming, safety rails, and traceable model behavior.' },
    { title: 'System Design for Product Teams', tag: 'Architecture', readTime: '10 min', summary: 'Tradeoffs for event systems, queues, caches, APIs, database partitions, and deployment patterns.' }
  ];
  readonly testimonials = [
    { name: 'Engineering Manager', quote: 'Mrityunjay turns vague product requirements into reliable systems with impressive speed and ownership.', tone: 'cyan' },
    { name: 'Team Lead', quote: 'He brings backend depth, frontend empathy, and strong instincts for automation.', tone: 'mint' },
    { name: 'Client Stakeholder', quote: 'The dashboards and workflows he shipped made our teams faster almost immediately.', tone: 'amber' }
  ];

  currentRoleIndex = 0;
  selectedProjectCategory = 'All';
  selectedProject: Project | null = null;
  selectedSnippet = this.snippets[0];
  assistantInput = '';
  commandInput = '';
  careerQuestion = 'Why should a company hire Mrityunjay?';
  careerAnswer = 'Mrityunjay combines backend depth, product-minded full stack delivery, and practical AI engineering. He can design the architecture, build the APIs, ship the UI, deploy the stack, and explain the tradeoffs clearly.';
  isAssistantTyping = false;
  isListening = false;
  mobileNavOpen = false;
  developerMode = false;
  hiringReportVisible = false;
  pointerTransform = 'translate3d(-100px, -100px, 0)';
  statDisplays = this.stats.map(() => 0);
  messages: ChatMessage[] = [
    {
      role: 'assistant',
      text: 'MK-AI online. Ask about experience, projects, architecture decisions, AI systems, or hiring fit.'
    }
  ];

  private readonly konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  private konamiIndex = 0;
  private roleTimer?: number;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;
  private particles?: THREE.Points;
  private animationFrameId = 0;
  private recognition?: SpeechRecognitionLike;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.initThree();
    this.startRoleRotation();
    this.animateCounters();
    this.bindScrollMotion();
  }

  ngOnDestroy(): void {
    if (this.roleTimer) {
      window.clearInterval(this.roleTimer);
    }
    window.cancelAnimationFrame(this.animationFrameId);
    this.renderer?.dispose();
    this.recognition?.stop();
    ScrollTrigger.getAll().forEach((triggerRef) => triggerRef.kill());
  }

  @HostListener('window:mousemove', ['$event'])
  onPointerMove(event: MouseEvent): void {
    this.pointerTransform = `translate3d(${event.clientX - 140}px, ${event.clientY - 140}px, 0)`;
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const expected = this.konami[this.konamiIndex];
    if (event.key === expected) {
      this.konamiIndex += 1;
      if (this.konamiIndex === this.konami.length) {
        this.developerMode = true;
        this.hiringReportVisible = true;
        this.konamiIndex = 0;
      }
    } else {
      this.konamiIndex = event.key === this.konami[0] ? 1 : 0;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeThree();
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.mobileNavOpen = false;
  }

  filteredProjects(): Project[] {
    if (this.selectedProjectCategory === 'All') {
      return this.projects;
    }
    return this.projects.filter((projectItem) => projectItem.category === this.selectedProjectCategory);
  }

  openProject(projectItem: Project): void {
    this.selectedProject = projectItem;
    document.body.style.overflow = 'hidden';
  }

  closeProject(): void {
    this.selectedProject = null;
    document.body.style.overflow = '';
  }

  askCareerCoach(question = this.careerQuestion): void {
    const normalized = question.toLowerCase();
    if (normalized.includes('strength')) {
      this.careerAnswer = 'His strengths are production backend engineering, AI-enabled product thinking, database design, deployment discipline, and the ability to translate business goals into maintainable systems.';
    } else if (normalized.includes('project')) {
      this.careerAnswer = 'He has built AI assistants, resume screeners, enterprise CRMs, ERP workflows, realtime messaging, analytics pipelines, healthcare portals, and multi-tenant SaaS platforms.';
    } else if (normalized.includes('experience')) {
      this.careerAnswer = 'Mrityunjay has 4+ years across Django, FastAPI, Angular, PostgreSQL, Docker, AWS, APIs, data pipelines, and AI integrations, including systems serving 500K+ users.';
    } else {
      this.careerAnswer = 'Hire Mrityunjay when you need someone who can own backend architecture, ship polished full stack features, introduce AI responsibly, and keep systems fast, observable, and scalable.';
    }
  }

  runCommand(): void {
    const command = this.commandInput.trim().toLowerCase();
    if (!command) {
      return;
    }
    if (command === 'sudo hire mrityunjay') {
      this.hiringReportVisible = true;
      this.developerMode = true;
    } else if (command === 'show achievements') {
      this.scrollTo('achievements');
    } else if (command === 'open projects') {
      this.scrollTo('projects');
    } else if (command === 'chat with ai') {
      this.scrollTo('assistant');
    }
    this.commandInput = '';
  }

  sendAssistantMessage(prompt = this.assistantInput): void {
    const trimmed = prompt.trim();
    if (!trimmed || this.isAssistantTyping) {
      return;
    }

    this.messages = [...this.messages, { role: 'user', text: trimmed }, { role: 'assistant', text: '' }];
    this.assistantInput = '';
    this.isAssistantTyping = true;
    const response = this.generateAssistantAnswer(trimmed);
    let index = 0;
    const interval = window.setInterval(() => {
      const nextMessages = [...this.messages];
      const last = nextMessages[nextMessages.length - 1];
      nextMessages[nextMessages.length - 1] = { ...last, text: response.slice(0, index) };
      this.messages = nextMessages;
      index += 3;
      if (index > response.length + 3) {
        window.clearInterval(interval);
        this.isAssistantTyping = false;
      }
      this.cdr.detectChanges();
    }, 18);
  }

  startVoiceInput(): void {
    const speechWindow = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const Recognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Recognition) {
      this.messages = [...this.messages, { role: 'assistant', text: 'Voice input is not available in this browser, but text chat is ready.' }];
      return;
    }

    this.recognition = new Recognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-IN';
    this.recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1];
      this.assistantInput = lastResult[0].transcript;
      this.sendAssistantMessage(this.assistantInput);
    };
    this.recognition.onend = () => {
      this.isListening = false;
      this.cdr.detectChanges();
    };
    this.recognition.onerror = () => {
      this.isListening = false;
      this.cdr.detectChanges();
    };
    this.isListening = true;
    this.recognition.start();
  }

  speakLatestAnswer(): void {
    const lastAssistantMessage = [...this.messages].reverse().find((message) => message.role === 'assistant' && message.text);
    if (!lastAssistantMessage || !('speechSynthesis' in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(lastAssistantMessage.text));
  }

  trackByLabel(_: number, item: { label?: string; title?: string; name?: string; company?: string }): string {
    return item.label ?? item.title ?? item.name ?? item.company ?? '';
  }

  trackByProject(_: number, projectItem: Project): number {
    return projectItem.id;
  }

  private initThree(): void {
    const canvas = this.heroCanvas?.nativeElement;
    if (!canvas) {
      return;
    }
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5.4;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.resizeThree();

    const geometry = new THREE.BufferGeometry();
    const count = 900;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00f5ff'),
      new THREE.Color('#7c3aed'),
      new THREE.Color('#34d399'),
      new THREE.Color('#f59e0b'),
      new THREE.Color('#fb7185')
    ];

    for (let i = 0; i < count; i += 1) {
      const radius = 1.4 + Math.random() * 4.2;
      const angle = Math.random() * Math.PI * 2;
      const spin = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(spin) * radius * 0.58;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      const color = palette[i % palette.length];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.68, 2),
      new THREE.MeshBasicMaterial({ color: '#00f5ff', wireframe: true, transparent: true, opacity: 0.42 })
    );
    this.scene.add(core);

    const animateScene = (): void => {
      this.animationFrameId = window.requestAnimationFrame(animateScene);
      if (this.particles) {
        this.particles.rotation.y += 0.0018;
        this.particles.rotation.x += 0.0006;
      }
      core.rotation.y -= 0.004;
      core.rotation.x += 0.002;
      this.renderer?.render(this.scene as THREE.Scene, this.camera as THREE.PerspectiveCamera);
    };
    animateScene();
  }

  private resizeThree(): void {
    if (!this.renderer || !this.camera) {
      return;
    }
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private startRoleRotation(): void {
    this.roleTimer = window.setInterval(() => {
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      this.cdr.detectChanges();
    }, 2200);
  }

  private animateCounters(): void {
    this.stats.forEach((stat, index) => {
      const counter = { value: 0 };
      gsap.to(counter, {
        value: stat.value,
        duration: 1.8,
        ease: 'power3.out',
        delay: index * 0.12,
        scrollTrigger: {
          trigger: '.hero-stats',
          start: 'top 85%',
          once: true
        },
        onUpdate: () => {
          this.statDisplays[index] = Math.round(counter.value);
          this.cdr.detectChanges();
        }
      });
    });
  }

  private bindScrollMotion(): void {
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 82%'
          }
        }
      );
    });

    gsap.to('.scan-line', {
      xPercent: 110,
      duration: 6,
      repeat: -1,
      ease: 'none'
    });
  }

  private generateAssistantAnswer(prompt: string): string {
    const query = prompt.toLowerCase();
    if (query.includes('hire') || query.includes('recommend')) {
      return 'Hiring recommendation: Mrityunjay is a strong fit for senior Python backend, AI product engineering, and full stack ownership. He has delivered 20+ projects, production apps serving 500K+ users, and measurable gains like 40% faster responses and 200+ hours/month saved.';
    }
    if (query.includes('project')) {
      return 'Project range: AI resume screening, interview assistants, document chat, meeting summarization, ERP, CRM, inventory, payments, SaaS platforms, realtime chat, notification engines, data pipelines, and enterprise portals. Each project emphasizes architecture, API design, database modeling, deployment, and measurable business impact.';
    }
    if (query.includes('architecture') || query.includes('scale')) {
      return 'Architecture style: FastAPI or Django services, PostgreSQL as the source of truth, Redis for cache and queues, Celery for background work, WebSockets for realtime flows, Docker for repeatable deployments, and AWS EC2/S3/CloudFront for production delivery. AI systems use RAG with embeddings, vector search, guardrails, and streaming responses.';
    }
    if (query.includes('skill') || query.includes('tech')) {
      return 'Core stack: Python, Django, FastAPI, Flask, Angular, TypeScript, RxJS, PostgreSQL, Redis, Docker, AWS, OpenAI, LangChain, vector databases, REST APIs, WebSockets, CI/CD, and system design.';
    }
    if (query.includes('resume') || query.includes('summary')) {
      return 'Resume summary: Mrityunjay Kumar is a Senior Python Full Stack Developer in India with 4+ years of experience building APIs, data pipelines, AI systems, dashboards, cloud deployments, and enterprise applications.';
    }
    if (query.includes('meeting') || query.includes('schedule')) {
      return 'For meetings, use the contact hub: email krmrityunjay13@gmail.com, WhatsApp through the contact action, or LinkedIn at linkedin.com/in/mrityunjay2000. The backend includes a contact API ready to connect Calendly or email scheduling.';
    }
    return 'Mrityunjay builds production-grade Python backends, Angular interfaces, AI assistants, RAG pipelines, realtime systems, and cloud deployments. Ask me about a project, architecture decision, hiring fit, resume summary, or technology depth.';
  }

  private project(id: number, title: string, category: string, summary: string, stack: string[], impact: string, tone: Tone): Project {
    return {
      id,
      title,
      category,
      summary,
      stack,
      impact,
      tone,
      architecture: ['Angular command UI', 'FastAPI service layer', 'PostgreSQL domain model', 'Redis cache and queue', 'Observability hooks'],
      database: 'Normalized PostgreSQL schema with indexed ownership, event, status, and audit tables.',
      apiFlow: 'JWT-secured REST APIs with async tasks, validation, retries, and clear response contracts.',
      scalability: 'Horizontally scalable services, cacheable read models, worker queues, and cloud-ready storage boundaries.',
      deployment: 'Dockerized services deployed through GitHub Actions to AWS EC2 with S3/CloudFront assets and rollback-ready images.'
    };
  }
}
