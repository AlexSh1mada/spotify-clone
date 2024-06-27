import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore.js";

export function CardPlayButton ({ id, size = 'small' }) {
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

        fetch(`/api/get-playlist-info.json?id=${id}`)
        .then(response => response.json())
        .then(data => {
            const { songs, playlist } = data

            setIsPlaying(true)
            setCurrentMusic({ songs, playlist, song: songs[0] })
        })
        .catch(error => console.error('Error fetching playlist info:', error));
    }


    const iconClassName = size === 'small' ? 'size-4' : size === 'large' ? 'size-6' : 'size-2.5' 

   return (
    <button onClick={handleClick} className="card-play-button rounded-full shadow-md shadow-black/40 bg-[#1ED760] p-4 hover:scale-105 hover:bg-[#1FDF64]">
        { isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} /> }
    </button>
   ) 
}