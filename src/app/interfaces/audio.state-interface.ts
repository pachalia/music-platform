import {Tracks} from "./track-interfaces";

export interface AudioStateInterface {
  volume: number;
  preVolume: number;
  volumeIcon: boolean,
  tracks: Tracks[];
  active: boolean[];
  currentTrack: {
    nameTrack: Object;
    status: boolean;
    duration?: number;
    currentTime?: number
  };
}
