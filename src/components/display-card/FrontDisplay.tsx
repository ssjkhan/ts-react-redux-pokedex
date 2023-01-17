import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import PokeSprite from "../sprite/PokeSprite";
import PokeStats from "../stat/PokeStats";

function FrontDisplay(props: any) {
  const [isGray, setGray] = useState(false);
  const targetRef = useRef<HTMLElement>(null);
  useEffect(() => {
    props.onMountStats(setGray);
  });

  const iconClassNameGray = "fa-solid fa-bars";
  const iconClassNameColor = "text-info fa-solid fa-bars";

  return (
    <>
      <div className="row no-gutters d-flex align-items-center justify-content-center">
        <div
          id="pokePicture"
          className="col-6 d-flex align-items-center justify-content-center"
        >
          <PokeSprite
            isError={props.isError}
            isLoading={props.isLoading}
            sprite={props.pokemonData.sprites.front_default}
            onMount={props.onMountPicture}
          />
        </div>
      </div>
      <div className="row no-gutters d-flex align-items-center justify-content-center">
        <PokeStats
          number={props.pokeID}
          onMount={props.onMountStats}
          stats={props.pokemonData.stats}
        />
      </div>
      <div className="row no-gutters d-flex align-items-bottom justify-content-center mt-3 ">
        <div
          className="d-flex align-items-bottom justify-content-center"
          onClick={(e) => {
            props.setFront(false);
            props.conAlert();
            props.onClickCard(e);
          }}
        >
          <i className={isGray ? iconClassNameGray : iconClassNameColor}>
          </i>
        </div>
      </div>
    </>
  );
}

export default FrontDisplay;
