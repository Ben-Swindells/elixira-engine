import "./App.css";
import { TextBox } from "@components/scripts/3D/TestBox";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <Canvas>
      <TextBox />
    </Canvas>
  );
}

export default App;
