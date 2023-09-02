import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Tracks} from "../../interfaces/track-interfaces";
import {TracksService} from "../../services/tracks.service";
import {Subscription} from "rxjs";
import {AudioService} from "../../services/audio.service";
import {AudioStoreService} from "../../services/audio-store.service";


@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

  active: boolean[]
  tracks: Tracks[]
  dSub: Subscription
  vol
  volIcon: boolean
  currentTrack
  status = false
  duration: number
  currentTime:number
  prevVolume: number
  progress


  constructor(private router: Router, private http: HttpClient,
              private trackService: TracksService,
              private audio: AudioService,
              public store: AudioStoreService) {}


 ngOnInit(): void {
    this.store.audio$.subscribe((res)=>{
      this.tracks=res.tracks
      this.active=res.active
      this.vol=res.volume
      this.volIcon=res.volumeIcon
      this.currentTrack=res.currentTrack.nameTrack
      this.status=res.currentTrack.status
      this.duration=res.currentTrack.duration
      this.currentTime=res.currentTrack.currentTime
      this.progress=this.currentTime / this.duration * 100 || 0
    })
 }

  downloadTracks() {
    this.router.navigate(['create'])
  }

   playful (idx: number ) {
    this.audio.playful(idx)
     return
   }

   volume(e) {
    return this.audio.vol(e.target.value)
   }


   pause(idx: number) {
    this.audio.pause(idx)
   }

  delete(id:number) {
    this.dSub = this.trackService.delete(id).subscribe(() =>{
      this.tracks = this.tracks.filter(track => track.id !== id)
    })
  }

  vol_mute() {
    this.store.state={
      ...this.store.state,
      volumeIcon: false,
      preVolume: this.store.state.volume
    }
    return this.audio.vol(0)
  }

  vol_up() {
    const preVolume=this.store.state.preVolume
    this.store.state={
      ...this.store.state,
      volumeIcon:true,
      preVolume: 0
    }
    return this.audio.vol(preVolume)
  }

  player(id: number) {
    const idx = this.tracks.findIndex((val)=>{
      return val.id===id
    })
    if(Object.keys(this.currentTrack).length===0){
      return
    }else {
      this.status ? this.playful(idx) : this.pause(idx)
    }
  }

  currentTimeChange(e) {
  return this.audio.audioChangeTime(Math.round(this.duration * e.target.value /100))
  }
}

