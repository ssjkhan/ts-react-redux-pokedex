import React, { useRef, useState } from "react";
import {
  useGetPokemonByNumberQuery,
  useGetSpeciesByNumberQuery,
} from "../../services/pokeApi";
import PokeStats from "../stat/PokeStats";
import PokeLogo from "../PokeLogo";
import PokeSprite from "../sprite/PokeSprite";
import FrontDisplay from "./FrontDisplay";
import BackDisplay from "./BackDisplay";

interface Props {
  number: number;
  underCon: Function;
}

function PokeDisplay(props: Props) {
  const {
    data: pokemonData,
    error: getPokemonError,
    isLoading: pokemonIsLoading,
  } = useGetPokemonByNumberQuery(props.number);
  const {
    data: speciesData,
    error: getSpeciesError,
    isLoading: speciesIsLoading,
  } = useGetSpeciesByNumberQuery(props.number);
  const [isFront, setFront] = useState(true);
  const [isGray, setGray] = useState(true);

  const classNameCardGray =
    "card border-left-dark  shadow h-100 py-2 mw-100 mh-100  ";

  const typeColorDict: any = {
    "normal": "warning",
    "water": "primary",
    "fire": "danger",
    "electric": "warning",
    "grass": "success",
    "ice": "info",
    "fighting": "danger",
    "poison": "dark",
    "ground": "warning",
    "flying": "seconday",
    "psychic": "info",
    "bug": "success",
    "ghost": "dark",
    "dragon": "primary",
    "dark": "dark",
    "steel": "secondary",
    "fairy": "danger",
  };
  const classNameCardColor = () => {
    if (!pokemonData) {
      return "card border border-dark border-5 shadow h-100 py-2 mw-100 mh-100 ";
    }
    var color = typeColorDict[pokemonData.types[0].type.name];
    return `card border border-${color} border-5 shadow h-100 py-2 mw-100 mh-100`;
  };

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
    setGray(val);
  };

  const onMouseEnter = () => {
    changeGrayScale(false);
  };

  const onMouseExit = () => {
    changeGrayScale(true);
    // setFront(true);
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  const onClickCard = (event: React.SyntheticEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <>
      <div
        ref={scrollRef}
        onClick={(e) => onClickCard(e)}
        className="col-xl-3 col-md-6 mb-4"
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseExit()}
      >
        <div className={isGray ? classNameCardGray : classNameCardColor()}>
          <div
            className={isGray
              ? "card-body border border-white border-5 "
              : "card-body"}
          >
            <div className="row no-gutters d-flex align-items-center justify-content-center">
              {getPokemonError
                ? <>Oh no, there was an error</>
                : pokemonIsLoading
                ? <PokeLogo />
                : pokemonData
                ? isFront
                  ? (
                    <FrontDisplay
                      pokeID={props.number}
                      pokemonData={pokemonData}
                      isError={getPokemonError}
                      isLoading={pokemonIsLoading}
                      onClickCard={onClickCard}
                      conAlert={props.underCon}
                      setFront={setFront}
                      onMountStats={onMountStats}
                      onMountPicture={onMountPicture}
                    />
                  )
                  : (
                    <BackDisplay
                      pokeID={props.number}
                      pokemonData={pokemonData}
                      speciesData={speciesData}
                      isLoading={pokemonIsLoading && speciesIsLoading}
                      isError={getPokemonError && getSpeciesError}
                      Error={{ getPokemonError, getSpeciesError }}
                      stats={pokemonData.stats}
                      conAlert={props.underCon}
                      setFront={setFront}
                      onMountPicture={onMountPicture}
                      onMountStats={onMountStats}
                      onClickCard={onClickCard}
                    />
                  )
                : <></>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokeDisplay;
