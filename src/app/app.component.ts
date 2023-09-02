import {Component, OnInit} from '@angular/core';
import {TracksService} from "./services/tracks.service";
import {AudioService} from "./services/audio.service";
import {AudioStoreService} from "./services/audio-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client';
  active:boolean[]=[]

  constructor(private trackService: TracksService, private audio: AudioService,
              public store: AudioStoreService) {
  }

  ngOnInit(): void {
    this.trackService.getAll().subscribe(res => {
      this.store.state={
        ...this.store.state,
        tracks: res
      }
      const tracks = this.store.state.tracks
      tracks.forEach((val:any, i:number) => {
        this.active[i]=true
      })
      this.store.state={
        ...this.store.state,
        active: this.active
      }
      // this.audio.getAudioTrack().tracks=res
      // this.audio.getAudioTrack().tracks.forEach((val, i)=>{
      //   this.audio.getAudioTrack().active[i]=true
      // })
    })
  }
}
