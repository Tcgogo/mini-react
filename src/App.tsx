import React from '@mr/render'
import FunctionComp from './components/functionComp';

function App() {
  return (
    <div className="App">
      <div>hi mini-react</div>
      <FunctionComp num={1}></FunctionComp>
      <footer>end</footer>
    </div>
  );
}

export default App();
