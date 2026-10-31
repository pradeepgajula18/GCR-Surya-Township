import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 64,
  height: 64,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          border: '4px solid #0B3064',
          position: 'relative',
          padding: 4,
        }}
      >
        {/* Top Sun Arc */}
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: 8,
            right: 8,
            height: 8,
            borderTop: '3px solid #F26522',
            borderRadius: '50%',
          }}
        />

        {/* House Silhouette & Text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 4,
          }}
        >
          {/* House Top */}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '14px solid transparent',
              borderRight: '14px solid transparent',
              borderBottom: '11px solid #0B3064',
            }}
          />
          {/* Window in House */}
          <div
            style={{
              width: 14,
              height: 8,
              background: '#0B3064',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 6,
                height: 5,
                background: '#F26522',
                borderRadius: 1,
              }}
            />
          </div>

          {/* GCR Brand */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: '#0B3064',
              fontFamily: 'serif',
              letterSpacing: 1,
              marginTop: 1,
              lineHeight: 1,
            }}
          >
            GCR
          </div>

          <div
            style={{
              fontSize: 6,
              fontWeight: 800,
              color: '#F26522',
              letterSpacing: 1,
              lineHeight: 1,
              marginTop: 1,
            }}
          >
            SURYA
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
