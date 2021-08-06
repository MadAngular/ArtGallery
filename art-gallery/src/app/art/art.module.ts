import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArtComponent } from './create-art/create-art.component';
import { DetailsArtComponent } from './details-art/details-art.component';
import { EditArtComponent } from './edit-art/edit-art.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArtRoutingModule } from './art-routing.module';
import { CollectionArtComponent } from './collection-art/collection-art.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CreateArtComponent, DetailsArtComponent, EditArtComponent, CollectionArtComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArtRoutingModule,
    RouterModule,
  ]
})
export class ArtModule { }
