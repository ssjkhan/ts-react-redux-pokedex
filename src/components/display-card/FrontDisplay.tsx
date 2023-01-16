import React from "react";
import PokeLogo from "../PokeLogo";
import PokeSprite from "../sprite/PokeSprite";
import PokeStats from "../stat/PokeStats";

function FrontDisplay(props: any) {
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
            sprite={props.sprites.front_default}
            onMount={props.onMountPicture}
          />
        </div>
      </div>
      <div className="row no-gutters d-flex align-items-center justify-content-center">
        <PokeStats
          number={props.number}
          onMount={props.onMountStats}
          stats={props.stats}
        />
      </div>
      <div className="row no-gutters d-flex align-items-bottom justify-content-center mt-3 ">
        <div className="d-flex align-items-bottom justify-content-center">
          <i
            onClick={(e) => {
              props.setFront(false);
              props.conAlert();
              // props.onClickCard(e);
            }}
            className="fa-solid fa-bars"
          >
          </i>
        </div>
      </div>
    </>
  );
}

export default FrontDisplay;
