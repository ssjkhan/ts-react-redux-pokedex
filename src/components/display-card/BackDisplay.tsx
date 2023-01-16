import React from "react";
import { Tab, Tabs } from "react-bootstrap";

function BackDisplay(props: any) {
  const pokeType = props.data.types.map((type: any) => {
    return (
      <>
        <div className="row">
          <div className="col">Type</div>
          <div className="col">
            <span className="text-capitalize">{type.type.name}</span>
          </div>
        </div>
      </>
    );
  });
  return (
    <>
      <Tabs
        defaultActiveKey="pokedexEntry"
        id={"pokeID-" + props.pokeID}
        className="mb-3"
      >
        <Tab
          eventKey="pokedexEntry"
          title={
            <span>
              <i className="fa-solid fa-circle-info"></i>
            </span>
          }
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-auto e-auto">Species</div>
              <div className="col-auto">
                <span className="text-dark text-capitalize">
                  <u>{props.data.species.name}</u>
                </span>
              </div>
            </div>
            <div className="row">
              {pokeType}
            </div>
          </div>
        </Tab>
        <Tab
          eventKey="pokeStats"
          title={
            <span>
              <i className="fa-solid fa-hand-fist"></i>
            </span>
          }
        >
          <div className="bg-primary d-flex flex-row h-100">{pokeType}</div>
        </Tab>
      </Tabs>
    </>
  );
}

export default BackDisplay;
