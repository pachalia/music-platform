import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AudioStateInterface} from "../interfaces/audio.state-interface";

@Injectable({
  providedIn: 'root'
})
export class AudioStoreService {
  private audioState: AudioStateInterface = {
    volume:30,
    preVolume:0,
    volumeIcon: true,
    tracks: [],
    active: [],
    currentTrack: {
      nameTrack: {},
      status: true,
      duration: 0,
      currentTime: 0
    }
  }
  private readonly _audio = new BehaviorSubject<AudioStateInterface>(this.audioState);
  readonly audio$=this._audio.asObservable()

  constructor() { }

  get state(): AudioStateInterface {
    return this._audio.getValue()
  }
  set state(val:AudioStateInterface) {
    this._audio.next(val)
  }
}
