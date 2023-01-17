import React from "react";
import { Tab, Tabs } from "react-bootstrap";

function BackDisplay(props: any) {
  const pokeType = props.pokemonData.types.map((type: any) => {
    return (
      <>
        <div key={"pokeID-Type" + props.pokeID + type} className="row">
          <div className="col">Type</div>
          <div className="col">
            <span className="text-capitalize">{type.type.name}</span>
          </div>
        </div>
      </>
    );
  });

  const processText = (text: String) => {
    return text.replace(/\n/, " ").replace(/\u000c/, " ");
  };

  var flavourText = processText(
    props.speciesData.flavor_text_entries[0].flavor_text,
  );

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
                  <u>{props.pokemonData.species.name}</u>
                </span>
              </div>
            </div>
            <div className="row">
              {pokeType}
            </div>
            <div className="row">
              {flavourText}
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
          <div className=""></div>
        </Tab>
      </Tabs>
    </>
  );
}

export default BackDisplay;
