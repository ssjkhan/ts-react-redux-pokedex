import React, { useEffect, useState, useRef } from "react";
import PokeLogo from "./PokeLogo";
import CSS from "csstype";
import "./pokeSprite.css";

function PokeSprite(props: any) {
	const [isGray, setGray] = useState(true);
	const [isLoading, setLoading] = useState(true);

	const imgEl = useRef<HTMLImageElement>(null)
	
	const hiddenCSS: CSS.Properties = {
		display: "none",
	};

	const onSpriteLoad = ()=> setLoading(false);

	useEffect(() => {
		props.onMount(setGray);
	});

	useEffect(()=>{
		if(isLoading){
			setTimeout(()=>{}, 1000)
		}
	},[])

	
	useEffect(()=>{
		const imgElCurrent = imgEl.current;

		if(imgElCurrent){
			imgElCurrent.addEventListener("load", onSpriteLoad);
			return ()=> imgElCurrent.removeEventListener("load",onSpriteLoad)
		}
	},[imgEl])
	

	return (
			
		<>
			<div style={isLoading ? {display: 'block'}: {display: 'none'}}>
			<PokeLogo />
			</div>
			<img
				ref={imgEl}
				style={isLoading ? hiddenCSS : {}}
				className={isGray ? "pokeImg pokeImgGray" : "pokeImg"}
				src={props.sprite}
				onLoad={() => setLoading(false)}
			></img>

        
		</>
		)	
}

export default PokeSprite;
