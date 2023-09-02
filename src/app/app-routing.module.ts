import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {HomeComponent} from "./components/home/home.component";
import {TracksComponent} from "./components/tracks/tracks.component";
import {AlbumsComponent} from "./components/albums/albums.component";
import {CreateComponent} from "./components/create/create.component";

const routes: Routes = [{
  path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'tracks', component: TracksComponent},
    {path: 'albums', component: AlbumsComponent},
    {path: 'create', component: CreateComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
