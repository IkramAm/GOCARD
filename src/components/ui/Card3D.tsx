import Spline from '@splinetool/react-spline';

const SCENE_WIDTH = 1030;
const SCENE_HEIGHT = 930;

export default function Card3D() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: SCENE_WIDTH,
          height: SCENE_HEIGHT,
          flexShrink: 0,
          transform: 'scale(var(--spline-scale, 0.4))',
          transformOrigin: 'center center',
        }}
      >
        <Spline
          scene="https://prod.spline.design/BOuWZcyfQVLrzXWp/scene.splinecode"
        />
      </div>
    </div>
  );
}
