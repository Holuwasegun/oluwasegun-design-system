import { NextRequest, NextResponse } from 'next/server';

export interface LayoutInput {
  heroImage?: string;
  primaryText: string;
  secondaryText: string;
  content: string;
  format: 'flyer-a5' | 'social-square' | 'banner-16x9';
  tokens: {
    colors: Record<string, string>;
    typography: { baseSize: number; scale: number; fontFamily?: string };
    spacing: { baseUnit: number };
  };
}

export interface LayoutSuggestion {
  id: string;
  name: string;
  description: string;
  layout: {
    type: 'centered-hero' | 'split-horizontal' | 'split-vertical' | 'card-overlay' | 'minimalist';
    heroPosition: 'top' | 'left' | 'right' | 'background' | 'none';
    textAlignment: 'left' | 'center' | 'right';
    colorUsage: {
      background: string;
      text: string;
      accent: string;
      card: string;
    };
    spacing: { padding: number; gap: number; borderRadius: number };
  };
}

const FORMAT_DIMENSIONS: Record<string, { width: number; height: number; label: string }> = {
  'flyer-a5': { width: 3000, height: 4250, label: 'Flyer (A5)' },
  'social-square': { width: 3000, height: 3000, label: 'Social Post (Square)' },
  'banner-16x9': { width: 3000, height: 1688, label: 'Banner (16:9)' },
};

function generateLayouts(input: LayoutInput): LayoutSuggestion[] {
  const { tokens } = input;
  const { colors, typography, spacing } = tokens;
  const base = spacing.baseUnit;

  const layouts: LayoutSuggestion[] = [
    {
      id: 'centered-hero',
      name: 'Centered Hero',
      description: 'Bold centered layout with hero image on top and text below',
      layout: {
        type: 'centered-hero',
        heroPosition: input.heroImage ? 'top' : 'none',
        textAlignment: 'center',
        colorUsage: {
          background: colors.surface || '#FFFBFE',
          text: colors.onSurface || '#1C1B1F',
          accent: colors.primary || '#6750A4',
          card: colors.surfaceContainer || '#F3EDF7',
        },
        spacing: { padding: base * 6, gap: base * 4, borderRadius: base * 3 },
      },
    },
    {
      id: 'split-horizontal',
      name: 'Split Horizontal',
      description: 'Side-by-side composition with image and text panels',
      layout: {
        type: 'split-horizontal',
        heroPosition: input.heroImage ? 'left' : 'none',
        textAlignment: 'left',
        colorUsage: {
          background: colors.primaryContainer || '#EADDFF',
          text: colors.onPrimaryContainer || '#21005D',
          accent: colors.primary || '#6750A4',
          card: colors.surface || '#FFFBFE',
        },
        spacing: { padding: base * 5, gap: base * 4, borderRadius: base * 2 },
      },
    },
    {
      id: 'split-vertical',
      name: 'Split Vertical',
      description: 'Top and bottom split with contrasting color blocks',
      layout: {
        type: 'split-vertical',
        heroPosition: input.heroImage ? 'top' : 'none',
        textAlignment: 'left',
        colorUsage: {
          background: colors.secondaryContainer || '#E8DEF8',
          text: colors.onSecondaryContainer || '#1D192B',
          accent: colors.secondary || '#625B71',
          card: colors.surface || '#FFFBFE',
        },
        spacing: { padding: base * 4, gap: base * 3, borderRadius: base * 4 },
      },
    },
    {
      id: 'card-overlay',
      name: 'Card Overlay',
      description: 'Image background with semi-transparent text card overlay',
      layout: {
        type: 'card-overlay',
        heroPosition: input.heroImage ? 'background' : 'none',
        textAlignment: 'left',
        colorUsage: {
          background: colors.inverseSurface || '#313033',
          text: colors.inverseOnSurface || '#F4EFF4',
          accent: colors.inversePrimary || '#D0BCFF',
          card: `${colors.inverseSurface || '#313033'}CC`,
        },
        spacing: { padding: base * 5, gap: base * 3, borderRadius: base * 3 },
      },
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Clean, minimal layout with generous whitespace and strong typography',
      layout: {
        type: 'minimalist',
        heroPosition: input.heroImage ? 'top' : 'none',
        textAlignment: 'right',
        colorUsage: {
          background: colors.surface || '#FFFBFE',
          text: colors.onSurface || '#1C1B1F',
          accent: colors.tertiary || '#7D5260',
          card: colors.surfaceContainerHigh || '#ECE6F0',
        },
        spacing: { padding: base * 8, gap: base * 5, borderRadius: base * 1 },
      },
    },
  ];

  return layouts;
}

export async function POST(request: NextRequest) {
  try {
    const body: LayoutInput = await request.json();

    if (!body.primaryText?.trim()) {
      return NextResponse.json({ error: 'Primary text is required' }, { status: 400 });
    }

    if (!body.format || !FORMAT_DIMENSIONS[body.format]) {
      return NextResponse.json({ error: 'Invalid format selected' }, { status: 400 });
    }

    // Simulate processing delay (real AI service would take longer)
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

    const suggestions = generateLayouts(body);
    const dimensions = FORMAT_DIMENSIONS[body.format];

    return NextResponse.json({
      suggestions,
      dimensions,
      input: {
        primaryText: body.primaryText,
        secondaryText: body.secondaryText,
        content: body.content,
        format: body.format,
        hasImage: !!body.heroImage,
      },
    });
  } catch (error) {
    console.error('Layout generation error:', error);
    return NextResponse.json(
      { error: 'Layout generation is taking longer than expected. Please try again.' },
      { status: 500 }
    );
  }
}
