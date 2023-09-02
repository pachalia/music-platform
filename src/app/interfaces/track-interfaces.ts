export interface Comments {
  id: number,
  username: string,
  text: string

}

export interface Tracks {
  id: number,
  name: string,
  artist: string,
  text: string,
  listens: number,
  picture: string,
  audio: string,
  comments: Comments[]
}
