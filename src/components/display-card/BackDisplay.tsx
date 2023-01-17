import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import CSS from "csstype";

function BackDisplay(props: any) {
  const pokeType = (function () {
    if (props.pokemonData.types.length < 2) {
      return props.pokemonData.types.map((type: any) => {
        return (
          <>
            <div key={"pokeID-Type" + props.pokeID + type} className="row">
              <div className="col-5">Type</div>
              <div className="col">
                <span className="text-capitalize">{type.type.name}</span>
              </div>
            </div>
            <div
              className="row"
              key={"pokeID-Type" + props.pokeID + type + "spacer"}
            >
              <div className="col-12 text-capitalize">&nbsp;</div>
            </div>
          </>
        );
      });
    } else {
      return props.pokemonData.types.map((type: any) => {
        return (
          <>
            <div key={"pokeID-Type" + props.pokeID + type} className="row">
              <div className="col-5">Type</div>
              <div className="col">
                <span className="text-capitalize">{type.type.name}</span>
              </div>
            </div>
          </>
        );
      });
    }
  })();

  const pokeMoves = (function () {
    var moves = [].concat(props.pokemonData.moves).sort((a: any, b: any) => {
      var lvlA = a.version_group_details[0].level_learned_at;
      var lvlB = b.version_group_details[0].level_learned_at;
      return (lvlA < lvlB ? -1 : 1);
    });

    return moves.map((move: any) => {
      var methodDetails = move.version_group_details[0];
      if (methodDetails.level_learned_at === 0) {
        return <></>;
      }

      var learnData = "Lvl " + methodDetails.level_learned_at;

      return (
        <>
          <div key={"pokeID-Move" + props.pokeID + move.name} className="row">
            <div className="col-4 text-capitalize fs-6 mx-0 px-0">
              {learnData}
            </div>
            <div className="col-auto fs-6 mx-0 px-0">{move.move.name}</div>
          </div>
        </>
      );
    });
  })();

  const processText = (text: String) => {
    return text.replace(/\n/, " ").replace(/\u000c/, " ");
  };

  const flavourText = (function () {
    var flavorTextArr = props.speciesData.flavor_text_entries;

    for (let i = 0; i < flavorTextArr.length; i++) {
      if (flavorTextArr[i].language.name === "en") {
        return processText(flavorTextArr[i].flavor_text);
      }
    }
  })();

  const moveWindowStyle: CSS.Properties = {
    height: `${props.clientHeight * 0.75}`,
    maxHeight: `${props.clientHeight * 75}`,
  };

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
              <div className="col-5">Species</div>
              <div className="col">
                <span className="text-dark text-capitalize">
                  <u>{props.pokemonData.species.name}</u>
                </span>
              </div>
            </div>
            {pokeType}

            <hr />
            <div className="row">
              {flavourText}
            </div>
          </div>
        </Tab>
        <Tab
          eventKey="pokeMoves"
          title={
            <span>
              <i className="fa-solid fa-hand-fist"></i>
            </span>
          }
        >
          <div className="container overflow-scroll" style={moveWindowStyle}>
            {pokeMoves}
          </div>
        </Tab>
      </Tabs>
    </>
  );
}

export default BackDisplay;
