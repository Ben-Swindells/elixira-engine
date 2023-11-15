import { Canvas } from '@react-three/fiber'
import { TestBox } from '@components/3d/Box'
function App(): JSX.Element {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <TestBox />
      </Canvas>
    </div>
  )
}

export default App
