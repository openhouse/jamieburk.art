import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#eeefec',
          color: '#343435',
          padding: 72,
          fontFamily: 'Arial'
        }}
      >
        <div style={{ color: '#0b5f81', fontSize: 32, fontWeight: 700 }}>{site.name}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ maxWidth: 880, fontSize: 78, fontWeight: 700, lineHeight: 0.96 }}>{site.headline}</div>
          <div style={{ marginTop: 32, color: '#5e5f61', fontSize: 30 }}>{site.role}</div>
        </div>
      </div>
    ),
    size
  );
}
