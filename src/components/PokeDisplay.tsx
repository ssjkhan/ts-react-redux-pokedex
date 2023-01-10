import React from "react";
import { useGetPokemonByNumberQuery } from "../services/pokeApi";
import CSS from "csstype";
import PokeStats from "./PokeStats";
import PokeLogo from "./PokeLogo";
import "./pokeDisplay.css"

interface Props {
	number: number;
	underCon: Function;
}

function PokeDisplay(props: Props) {
	const { data, error, isLoading } = useGetPokemonByNumberQuery(props.number);

	const imgStyle1: CSS.Properties = {
		// WebkitFilter: "grayscale(100%)",
		// filter: "grayscale(100%)",
		height: "10rem",
		width: "10rem",
	};

	const cardStyle: CSS.Properties = {
		borderLeft: "0.3rem solid var(--bs-yellow)",
		borderBottom: "0.25rem solid var(--bs-dark)",
		boxShadow: "0.25rem",
	};

	
	

	return (
		<>
			<div className="col-xl-3 col-md-6 mb-4">
				<div
					className="card border-left-darkborder-top- shadow h-100 py-2 mw-100 mh-100 "
					
				>
					<div className="card-body">
						<div className="row no-gutters d-flex align-items-center justify-content-center">
							<div
								id="pokePicture"
								className="col-6 d-flex align-items-center justify-content-center"
							>
								{error ? (
									<>Oh no, there was an error</>
								) : isLoading ? (
									<PokeLogo />
								) : data ? (
									<>
										<img
											className="pokeImg pokeCard"
											src={data.sprites.front_default}
										/>
									</>
								) : null}
							</div>
						</div>

						<div className="row no-gutters d-flex align-items-center justify-content-center">
							<PokeStats />
						</div>
						<div className="row no-gutters d-flex justify-content-end">
							<i
								className="fa-solid fa-ellipsis w-auto "
								onClick={() => {
									props.underCon();
								}}
							></i>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PokeDisplay;
