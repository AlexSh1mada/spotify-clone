import { useState, useRef, useEffect } from "react";
import { usePlayerStore } from "@/store/playerStore";

export const Pause = ({ className }) => (
	<svg
		className={className}
		role="img"
		height="16"
		width="16"
		aria-hidden="true"
		viewBox="0 0 16 16"
	>
		<path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
	</svg>
);

export const Play = ({ className }) => (
	<svg
		className={className}
		role="img"
		height="16"
		width="16"
		aria-hidden="true"
		viewBox="0 0 16 16"
	>
		<path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
	</svg>
);

const CurrentSong = ({ image, title, artists }) => {
	return (
		<div
			className={`
            flex items-center gap-5 relative
            overflow-hidden
        `}
		>
			<picture className="size-14 bg-zinc-800 rounded-md overflow-hidden">
				<img src={image} alt={title} />
			</picture>
			<div className="flex flex-col">
				<h3 className="text-sm block">{title}</h3>
				<h4 className="text-xs block text-zinc-400">
                    { artists?.join(",") }
                </h4>
			</div>
		</div>
	);
};

export function Player() {
	const { currentMusic, isPlaying, setIsPlaying } = usePlayerStore(
		(state) => state
	);
	const audioRef = useRef();

	useEffect(() => {
		isPlaying ? audioRef.current.play() : audioRef.current.pause();
	}, [isPlaying]);

	useEffect(() => {
		const { song, playlist, songs } = currentMusic;

		if (song) {
			const src = `/music/${playlist?.id}/0${song.id}.mp3`;
			audioRef.current.src = src;
			audioRef.current.play();
		}
	}, [currentMusic]);

	const handleClick = () => {
		setIsPlaying(!isPlaying);
	};

	return (
		<div className="flex flex-row justify-between w-full px-2 z-50">
			<div>
				<CurrentSong {...currentMusic.song} />
			</div>

			<div className="grid place-content-center gap-4 flex-1">
				<div className="flex justify-center">
					<button className="bg-white rounded-full p-2" onClick={handleClick}>
						{isPlaying ? <Pause /> : <Play />}
					</button>
				</div>
			</div>

			<div className="grid place-content-center">Volume</div>

			<audio ref={audioRef} />
		</div>
	);
}
