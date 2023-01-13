import React, { useRef } from "react";
import { useGetPokemonByNumberQuery } from "../services/pokeApi";
import CSS from "csstype";
import PokeStats from "./PokeStats";
import PokeLogo from "./PokeLogo";
import PokeSprite from "./PokeSprite";
import "./pokeDisplay.css";

interface Props {
  number: number;
  underCon: Function;
}

function PokeDisplay(props: Props) {
  const { data, error, isLoading } = useGetPokemonByNumberQuery(props.number);

  // Get handles on bar and image isHover state
  let grayStatsArr: Function[] = [];
  let updateGrayStats = (val: boolean) => {
    grayStatsArr.forEach((stat) => {
      stat(val);
    });
  };

  let updateGrayPicture = (val: boolean) => {};

  const onMountStats = (fromStats: any) => {
    grayStatsArr.push(fromStats);
  };

  const onMountPicture = (fromPicture: any) => {
    updateGrayPicture = fromPicture;
  };

  // function to update isHover state
  const changeGrayScale = (val: boolean) => {
    updateGrayPicture(val);
    updateGrayStats(val);
  };

  const onMouseEnter = () => {
    changeGrayScale(false);
  };

  const onMouseExit = () => {
    changeGrayScale(true);
  };

  const myRef = useRef<HTMLDivElement>(null);

  const onClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (myRef.current) {
      myRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <>
      <div
        ref={myRef}
        onClick={(e) => onClick(e)}
        className="col-xl-3 col-md-6 mb-4"
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseExit()}
      >
        <div className="card border-left-dark border-top- shadow h-100 py-2 mw-100 mh-100 ">
          <div className="card-body">
            <div className="row no-gutters d-flex align-items-center justify-content-center">
              {error
                ? <>Oh no, there was an error</>
                : isLoading
                ? <PokeLogo />
                : data
                ? (
                  <>
                    <div className="row no-gutters d-flex align-items-center justify-content-center">
                      <div
                        id="pokePicture"
                        className="col-6 d-flex align-items-center justify-content-center"
                      >
                        <PokeSprite
                          isError={error}
                          isLoading={isLoading}
                          sprite={data.sprites.front_default}
                          onMount={onMountPicture}
                        />
                      </div>
                    </div>
                    <div className="row no-gutters d-flex align-items-center justify-content-center">
                      <PokeStats
                        number={props.number}
                        onMount={onMountStats}
                        stats={data.stats}
                      />
                    </div>
                    <div className="row no-gutters d-flex align-items-bottom justify-content-center mt-3 ">
                      <div className="d-flex align-items-bottom justify-content-center">
                        <i
                          onClick={() => props.underCon()}
                          className="fa-solid fa-bars"
                        >
                        </i>
                      </div>
                    </div>
                  </>
                )
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokeDisplay;
