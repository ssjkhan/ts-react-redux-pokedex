import TopBar from "./components/layout/Topbar";
import PokeDisplay from "./components/display-card/PokeDisplay";
import ConstructionAlert from "./components/ConstructionAlert";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./styles/css/styles.css";

function App() {
  let setShow: any = null;

  const onAlertMount = (dataFromAlert: any) => {
    setShow = dataFromAlert[1];
  };

  const myArr: number[] = Array.from(Array.from({ length: 151 }).keys());
  return (
    <div className="App page-top bg-white">
      <TopBar
        underCon={() => {
          setShow(true);
        }}
      />
      <ConstructionAlert onMount={onAlertMount}></ConstructionAlert>
      <div className="d-flex justify-content-center"></div>
      <div className="container justify-content-md-center">
        <div className="row">
          {myArr.map((_, index) => (
            <PokeDisplay
              key={index + 1}
              number={index + 1}
              underCon={() => {
                setShow(true);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
