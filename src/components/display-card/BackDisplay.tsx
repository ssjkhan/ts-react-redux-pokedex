import { useEffect, useRef, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CSS from "csstype";
import { Pokemon, Species } from "../../services/pokeApi";

type Prop = {
  pokeID: number;
  pokemonData: Pokemon;
  speciesData: Species;

  onMountSizing: Function;
};

function BackDisplay(props: Prop) {
  const heightRef = useRef(0);
  const widthRef = useRef(0);
  const [height, setHeight] = useState(heightRef.current);
  const [width, setWidth] = useState(widthRef.current);

  const updateSize = (clientHeight: number, clientWidth: number) => {
    heightRef.current = clientHeight;
    widthRef.current = clientWidth;
    setHeight(clientHeight);
    setWidth(clientWidth);
  };

  useEffect(() => {
    props.onMountSizing(updateSize);
  });

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
    const moves = Object.assign([], props.pokemonData.moves).sort(
      (a: any, b: any) => {
        var lvlA = a.version_group_details[0].level_learned_at;
        var lvlB = b.version_group_details[0].level_learned_at;
        return (lvlA < lvlB ? -1 : 1);
      },
    );

    return moves.map((move: any) => {
      var methodDetails = move.version_group_details[0];
      if (methodDetails.level_learned_at === 0) {
        return <></>;
      }

      var learnData = "Lvl " + methodDetails.level_learned_at;

      return (
        <>
          <div key={"pokeID-Move" + props.pokeID + move.name} className="row">
            <div className="col-4 text-capitalize fs-6 mx-0 pl-1">
              {learnData}
            </div>
            <div className="col-auto fs-6 mx-0 px-0 text-capitalize">
              {move.move.name}
            </div>
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

  const tabContentWindowStyle: CSS.Properties = {
    height: `${height * 0.7}px`,
    maxHeight: `${height * 0.7}px`,
    width: `${width}px`,
    maxWidth: `${width * 0.9}px`,
    overflowY: "scroll",
    overflowX: "hidden",
  };

  return (
    <>
      <div>
        <Tabs
          defaultActiveKey="pokedexEntry"
          id={"pokeID-" + props.pokeID}
          className="mb-3"
        >
          <Tab
            key={"pokedexTab" + props.pokeID}
            eventKey="pokedexEntry"
            title={
              <span>
                <i className="fa-solid fa-circle-info"></i>
              </span>
            }
          >
            <div style={tabContentWindowStyle}>
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
            </div>
          </Tab>
          <Tab
            key={"pokeMovesTab" + props.pokeID}
            eventKey="pokeMoves"
            title={
              <span>
                <i className="fa-solid fa-hand-fist"></i>
              </span>
            }
          >
            <div className="row">
              <div className="col-4 fx-6 mx-0 text-dark">
                <span>
                  <u>Level</u>
                </span>
              </div>
              <div className="col-auto mx-0 px-0">
                <span className="text-dark">
                  <u>Move</u>
                </span>
              </div>
              <div className="" style={tabContentWindowStyle}>
                <div className="row">
                </div>
                {pokeMoves}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default BackDisplay;
