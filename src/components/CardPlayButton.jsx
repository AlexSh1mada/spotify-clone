import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore.js";

export function CardPlayButton ({ id }) {
    const { 
            currentMusic,
            isPlaying, 
            setIsPlaying, 
            setCurrentMusic
          } = usePlayerStore(state => state)

    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id

    const handleClick = () => {
        if(isPlayingPlaylist) {
            setIsPlaying(false)
            return
        }

        fetch(`/src/api/get-playlist-info.json?id=${id}`)
        .then(response => response.json())
        .then(data => {
            const { songs, playlist } = data

            setIsPlaying(true)
            setCurrentMusic({ songs, playlist, song: songs[0] })
        })
    }


   return (
    <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4">
        { isPlayingPlaylist ? <Pause /> : <Play /> }
    </button>
   ) 
}