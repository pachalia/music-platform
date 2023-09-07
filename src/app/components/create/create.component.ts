import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form!: FormGroup
  imagePreview = ''
  image!: File
  audio!: File
  subscribe!: Subscription

  @ViewChild('imageInput') imageInput!: ElementRef
  @ViewChild('audioInput') audioInput!: ElementRef

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      name: new FormControl(null, Validators.required),
      artist: new FormControl(null, Validators.required),
      text: new FormControl(null),
      picture: new FormControl(null),
      audio: new FormControl(null, Validators.required)
    })
  }

  onSelectPicture(event:any) {
    const file = event.target.files[0]
    this.image = file
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result!.toString()
    };
    reader.readAsDataURL(file)
  }

  onSelectAudio(event:any) {
    const file = event.target.files[0]
    this.audio = file
  }

  closePicture() {
    this.imagePreview=''
    this.form.patchValue({picture: null})
    this.imageInput.nativeElement.value=null
  }

  submit() {
    const data = new FormData()
    data.append('name', this.form.value.name)
    data.append('artist', this.form.value.artist)
    data.append('text', this.form.value.text)
    data.append('picture', this.image, this.image.name )
    data.append('audio', this.audio, this.audio.name)
    this.subscribe = this.http.post(environment.host + 'tracks', data).subscribe({
      next:()=>{
        alert('Трэк успешно записан')
      },
      error:() =>{
        alert('Произошла ошибка')
      }})
  }

  closeAudio() {
    this.form.patchValue({audio:null})
    this.audioInput.nativeElement.value=null
  }
}
