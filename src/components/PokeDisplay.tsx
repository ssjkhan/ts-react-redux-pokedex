import React from "react";
import { useGetPokemonByNumberQuery } from "../services/pokeApi";
import CSS from "csstype";
import PokeStats from "./PokeStats";

interface Props {
	number: number;
}

function PokeDisplay(props: Props) {
	const { data, error, isLoading } = useGetPokemonByNumberQuery(props.number);

	const imgStyle: CSS.Properties = {
		WebkitFilter: "grayscale(100%)",
		filter: "grayscale(100%)",
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
					style={cardStyle}
				>
					<div className="card-body">
						<div className="row no-gutters align-items-center">
							<div id="pokePicture col-6">
								{error ? (
									<>Oh no, there was an error</>
								) : isLoading ? (
									<>Loading...</>
								) : data ? (
									<>
										<img
											style={imgStyle}
											src={data.sprites.front_default}
											alt={data.species.name}
										/>
									</>
								) : null}
							</div>
							<PokeStats />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PokeDisplay;
