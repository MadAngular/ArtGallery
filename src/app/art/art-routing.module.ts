import { RouterModule, Routes } from '@angular/router';

//components
import { CollectionArtComponent } from './collection-art/collection-art.component';
import { CreateArtComponent } from './create-art/create-art.component';
import { DetailsArtComponent } from './details-art/details-art.component';
import { EditArtComponent } from './edit-art/edit-art.component';

// guards
import { AuthGuard } from '../services-and-guards/auth.guard';

const routes: Routes = [
  {
    path: 'art',
    component: CollectionArtComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'art/create',
    component: CreateArtComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'art/details/:id',
    component: DetailsArtComponent,
    canActivate: [AuthGuard]
  },
    {
    path: 'art/edit/:id',
    component: EditArtComponent,
    canActivate: [AuthGuard]
  }
]

export const ArtRoutingModule = RouterModule.forChild(routes);