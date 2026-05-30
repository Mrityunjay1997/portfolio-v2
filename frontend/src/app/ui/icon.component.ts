import { Component, Input } from '@angular/core';

type IconName =
  | 'bot'
  | 'brain-circuit'
  | 'calendar'
  | 'chevron-right'
  | 'cloud'
  | 'code-2'
  | 'cpu'
  | 'download'
  | 'external-link'
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'menu'
  | 'message-circle'
  | 'mic'
  | 'play'
  | 'rocket'
  | 'send'
  | 'shield-check'
  | 'sparkles'
  | 'terminal'
  | 'volume-2'
  | 'x';

const ICONS: Record<IconName, string[]> = {
  bot: [
    'M12 8V4H8',
    'M2 14h2',
    'M20 14h2',
    'M15 13v2',
    'M9 13v2',
    'M8 20v2h8v-2',
    'M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z'
  ],
  'brain-circuit': [
    'M12 5a3 3 0 0 0-5.6-1.5 3 3 0 0 0-3.8 3.9A3 3 0 0 0 3 13a3 3 0 0 0 3 5h1',
    'M12 5a3 3 0 0 1 5.6-1.5 3 3 0 0 1 3.8 3.9A3 3 0 0 1 21 13a3 3 0 0 1-3 5h-1',
    'M8 13h2',
    'M14 13h2',
    'M10 9v8',
    'M14 9v8',
    'M12 17v4',
    'M8 21h8'
  ],
  calendar: [
    'M8 2v4',
    'M16 2v4',
    'M3 10h18',
    'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'
  ],
  'chevron-right': ['m9 18 6-6-6-6'],
  cloud: ['M17.5 19H8a6 6 0 1 1 1.2-11.9A8 8 0 0 1 22 12a5 5 0 0 1-4.5 7Z'],
  'code-2': ['m18 16 4-4-4-4', 'm6 8-4 4 4 4', 'm14.5 4-5 16'],
  cpu: [
    'M9 2v3',
    'M15 2v3',
    'M9 19v3',
    'M15 19v3',
    'M2 9h3',
    'M2 15h3',
    'M19 9h3',
    'M19 15h3',
    'M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
    'M9 9h6v6H9z'
  ],
  download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  'external-link': ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'],
  github: [
    'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-1.5 6-6.5a5 5 0 0 0-1.5-3.5 4.5 4.5 0 0 0-.1-3.5s-1.2-.4-3.8 1.4a13 13 0 0 0-6.8 0C5.2.6 4 .9 4 .9a4.5 4.5 0 0 0-.1 3.5A5 5 0 0 0 2.4 8c0 5 3 6.5 6 6.5A4.8 4.8 0 0 0 7.4 18v4',
    'M9 18c-4.5 2-5-2-7-2'
  ],
  linkedin: [
    'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z',
    'M2 9h4v12H2z',
    'M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z'
  ],
  mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', 'm22 6-10 7L2 6'],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  'message-circle': ['M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 17 0Z'],
  mic: ['M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z', 'M19 10v2a7 7 0 0 1-14 0v-2', 'M12 19v3'],
  play: ['M5 5v14l14-7Z'],
  rocket: ['M4.5 16.5c-1.3 1.1-1.7 3.8-1.7 3.8s2.7-.4 3.8-1.7c.6-.7.6-1.8-.1-2.4a1.8 1.8 0 0 0-2 0.3Z', 'M9 15 4 10l6-1 5-5c2.5-2.5 5.4-2 6-1.4.6.6 1.1 3.5-1.4 6l-5 5-1 6-5-5Z', 'M15 9h.01'],
  send: ['m22 2-7 20-4-9-9-4 20-7Z', 'M22 2 11 13'],
  'shield-check': ['M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z', 'm9 12 2 2 4-4'],
  sparkles: ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z', 'M5 3v4', 'M3 5h4', 'M19 17v4', 'M17 19h4'],
  terminal: ['m4 17 6-6-6-6', 'M12 19h8'],
  'volume-2': ['M11 5 6 9H2v6h4l5 4V5Z', 'M15.5 8.5a5 5 0 0 1 0 7', 'M19 5a10 10 0 0 1 0 14'],
  x: ['M18 6 6 18', 'M6 6l12 12']
};

@Component({
  selector: 'i-lucide',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (path of paths; track path) {
        <path [attr.d]="path"></path>
      }
    </svg>
  `
})
export class IconComponent {
  @Input() name = 'sparkles';
  @Input() size = 18;

  get paths(): string[] {
    return ICONS[this.name as IconName] ?? ICONS.sparkles;
  }
}
