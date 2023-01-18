import React, { useEffect, useRef, useState } from "react";
import {
  useGetPokemonByNumberQuery,
  useGetSpeciesByNumberQuery,
} from "../../services/pokeApi";
import PokeLogo from "../PokeLogo";
import FrontDisplay from "./FrontDisplay";
import BackDisplay from "./BackDisplay";

// typeColorMapping for PokeCard UIs
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

interface Props {
  number: number;
  underCon: Function;
}

function PokeDisplay(props: Props) {
  // API Queries for card Data
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

  // Set Up refs for color and inset height
  const [isFront, setFront] = useState(true);
  const [isGray, setGray] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  // Child Sizing Elements for fixed size children in flex parent

  const childSizingArr: Function[] = [];
  const updateSizingArr = (height: Number, width: Number) => {
    childSizingArr.forEach((childSizingFn) => childSizingFn(height, width));
  };
  const onMountSizing = (fn: Function) => {
    childSizingArr.push(fn);
  };

  useEffect(() => {
    console.log(cardRef.current?.clientHeight);
    if (cardRef.current) {
      let { clientHeight, clientWidth } = cardRef.current;
      updateSizingArr(clientHeight, clientWidth);
    }
  });

  // Get handles on bar and image isHover state
  const grayChildFnArr: Function[] = [];
  const updateGrayChild = (val: boolean) => {
    grayChildFnArr.forEach((stat) => {
      stat(val);
    });
  };

  let updateGrayPicture: Function = () => {};

  // callback to get callbacks for child components Gray Handles
  const onMountGray = (fn: Function) => {
    grayChildFnArr.push(fn);
  };
  // callback to get handl on sprite grayState
  const onMountPicture = (fn: Function) => {
    updateGrayPicture = fn;
  };

  // function to update isHover state
  const changeGrayScale = (val: boolean) => {
    updateGrayPicture(val);
    updateGrayChild(val);
    setGray(val);
  };

  // Styling Constants
  const classNameCardGray =
    "card border-left-dark shadow h-100 py-2 mw-100 mh-100  ";

  const classNameCardColor = () => {
    if (!pokemonData || isGray) {
      return "card border border-dark border-5 shadow h-100 py-2 mw-100 mh-100 ";
    }
    var color = typeColorDict[pokemonData.types[0].type.name];
    return `card border border-${color} border-5  shadow h-100 py-2 mw-100 mh-100`;
  };

  // Mouse event handlers
  const onMouseEnter = () => {
    changeGrayScale(false);
  };

  const onMouseExit = () => {
    changeGrayScale(true);
    setFront(true);
  };

  // scrolling event for card
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
            ref={cardRef}
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
                      onMountStats={onMountGray}
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
                      conAlert={props.underCon}
                      setFront={setFront}
                      onMountPicture={onMountPicture}
                      onMountStats={onMountGray}
                      onMountSizing={onMountSizing}
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
