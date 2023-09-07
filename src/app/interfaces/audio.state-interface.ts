import {Tracks} from "./track-interfaces";
interface Track {
  id?: number
  name?: string
  artist?:string
  text?:string
  listens?:number
}

export interface AudioStateInterface {
  volume: number;
  preVolume: number;
  volumeIcon: boolean,
  tracks: Tracks[];
  active: boolean[];
  currentTrack: {
    nameTrack: Track;
    status: boolean;
    duration?: number;
    currentTime?: number
  };
}
