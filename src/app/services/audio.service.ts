import { Injectable } from '@angular/core';
import {AudioStoreService} from "./audio-store.service";
import {environment} from "../../environments/environment";




@Injectable({
  providedIn: 'root'
})
export class AudioService {

private audio = new Audio()

  constructor(public store: AudioStoreService) { }

  pause(idx:any) {
  this.audio.pause()
  const active = this.store.state.active
  active[idx]=true
  this.store.state={
    ...this.store.state,
    active: active,

    currentTrack: {
      nameTrack: this.store.state.currentTrack.nameTrack,
      duration: this.store.state.currentTrack.duration,
      currentTime: this.store.state.currentTrack.currentTime,
      status:true
      }
    }
  }

  vol(vol:number) {
    this.store.state={
      ...this.store.state,
      volume: vol
    }
    this.audio.volume = vol / 100
    return
  }

  playful(idx: number) {
    const list = this.store.state.tracks
    const active=this.store.state.active
    this.currentTime()

    active.forEach((val:any, i:number) =>{
      active[i]=true
    })
    active[idx]=false
    this.store.state={
      ...this.store.state,
      active: active,
      currentTrack: {
        nameTrack: list[idx],
        duration: this.store.state.currentTrack.duration,
        status: false
      }
    }
    this.audio.volume=this.store.state.volume / 100
    this.audio.src=environment.host + list[idx].audio
    this.audio.onloadedmetadata=()=>{
      this.store.state={
        ...this.store.state,
        active: active,
        currentTrack: {
          nameTrack: list[idx],
          duration: this.audio.duration,
          currentTime: this.audio.currentTime,
          status: this.store.state.currentTrack.status
        }
      }
    }

    this.audio.oncanplay=()=> {
      this.audio.play()
    }
    this.audio.addEventListener('ended', () => {
      idx++
      list.length===idx ? active[idx-1]=true : this.playful(idx)
      this.store.state={
        ...this.store.state,
        active: active,
        currentTrack: {
          nameTrack: this.store.state.currentTrack.nameTrack,
          duration: this.store.state.currentTrack.duration,
          currentTime: 0,
          status: true
        }
      }
    })
  }

  audioChangeTime(t:any) {
    this.audio.currentTime=t
    this.currentTime()
    const activeId=this.store.state.currentTrack.nameTrack.id
    const tracks = this.store.state.tracks
    const active:boolean[] = []
    tracks.forEach((val, i) =>{
      activeId===val.id ? active[i] = false : active[i]=true
    })
    this.store.state={...this.store.state, currentTrack:{...this.store.state.currentTrack, status: false}, active}
  }

  currentTime() {
  let timer = setInterval(()=> {
    this.store.state={
      ...this.store.state,
      currentTrack: {
        nameTrack: this.store.state.currentTrack.nameTrack,
        duration: this.store.state.currentTrack.duration,
        currentTime: this.audio.currentTime,
        status: this.store.state.currentTrack.status
      }
    }
  },1000)
    this.audio.onpause=()=> {
      clearInterval(timer)
    }
  }
}








