import { ImageResponse } from 'next/og';


export const alt = 'Oluwasegun Design System';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = "force-static";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0F0E17',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(103, 80, 164, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(179, 136, 255, 0.25) 0%, transparent 50%)',
          fontFamily: 'sans-serif',
          color: '#FFFFFF',
          padding: '60px',
        }}
      >
        {/* Favicon Logo Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 28,
            background: 'linear-gradient(135deg, #6750A4 0%, #B388FF 100%)',
            boxShadow: '0 20px 40px rgba(103, 80, 164, 0.45)',
            marginBottom: 32,
          }}
        >
          {/* Outer Concentric Ring */}
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: '50%',
              border: '10px solid #E8DEF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.95,
            }}
          >
            {/* Inner Concentric Ring */}
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                border: '5px solid #FFFFFF',
                opacity: 0.6,
              }}
            />
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: 16,
            textAlign: 'center',
            color: '#FFFFFF',
          }}
        >
          Oluwasegun Design System
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: '#CAC4D0',
            textAlign: 'center',
            maxWidth: 720,
            lineHeight: 1.45,
          }}
        >
          Material Design 3 tokens, scales, components, and exportable style guides
        </div>

        {/* Pill Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 40,
            padding: '10px 24px',
            borderRadius: 100,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            fontSize: 16,
            color: '#E8DEF8',
            fontWeight: 600,
          }}
        >
          <span>MD3 Design Tokens</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
          <span>Configurable & Exportable</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
