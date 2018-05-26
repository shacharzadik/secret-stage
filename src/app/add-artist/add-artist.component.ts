import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { error } from 'util';

const URL = 'http://localhost:3000/api/artists';

@Component({
  selector: 'add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})

export class AddArtistComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  public socialMediaLinks: FormGroup;
  public linksToSongs: FormGroup;
  mainDescForm: FormGroup;
  genres: any;
  name: string;
  checkboxes: any[];
  eventTypes: any;
  checkedEventTypes: string[];
  ngOnInit() {
    // this.checkboxes = [];
    this.eventTypes = ["Bars And Restaurants","House Concerts", "Private Events", "Team Events"];
    this.checkedEventTypes = [];
    this.socialMediaLinks = this.formBuilder.group({
      socialMediaItems: this.formBuilder.array([this.createItem()])
    });
    this.linksToSongs = this.formBuilder.group({
      linksToSongItems: this.formBuilder.array([this.createItem()])
    });
    // this.genres = this.formBuilder.group({
    //   genres: this.formBuilder.array([this.createItem()])
    // });
    this.mainDescForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      genres: new FormControl(),
      eventType: new FormControl()
    });
    // this.http.get(URL + 'genres').subscribe(
    //   data => {
    //     this.genres = data;
    //   },
    //   error => {
    //     console.error(error);

    //   }
    // );
    // this.http.get(URL + 'eventTypes').subscribe(
    //   data => {
    //     this.eventTypes = data;
    //   },
    //   error => {
    //     console.error(error);

    //   }
    // )
  }
  // createItem(): FormGroup {
  //   return this.formBuilder.group({
  //     name: '',
  //   });
  // }
  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      genres: '',
      linksToSongItems: '',
      socialMediaItems: ''

    });
  }

  get socialMediaItems(): FormArray {
    return this.socialMediaLinks.get('socialMediaItems') as FormArray;
  };

  get linksToSongItems(): FormArray {
    return this.linksToSongs.get('linksToSongItems') as FormArray;

  };

  addToSocialMediaLinks(): void {
    this.socialMediaItems.push(this.createItem());
  }

  addLinkToSong(): void {
    this.linksToSongItems.push(this.createItem());
  }
  removeSocialMedia(i): void {
    this.socialMediaItems.controls.splice(i, 1);
  }

  removeLinkToSong(i): void {
    this.linksToSongItems.controls.splice(i, 1);
  }
 
  onCheckboxChange(event, value) {
    if (event.target.checked) {
      this.checkboxes.push(value);
    } else {
      let index = this.checkboxes.indexOf(value);
      this.checkboxes.splice(index, 1);
    }
  }

  onChangeEventType(event, value) {
    if (event.target.checked) {
      this.checkedEventTypes.push(value);
    } else {
      let index = this.checkedEventTypes.indexOf(value);
      this.checkedEventTypes.splice(index, 1);
    }
  }
  get socialMedia(): any[] {
    let arr = [];
    for (let i of this.socialMediaItems.controls) {
      let { value: { name } } = i;
      if (name != '') {
        arr.push(name);
      }
    }
    return arr;
  }

  get linktosongs(): any[] {
    let arr = [];
    for (let i of this.linksToSongItems.controls) {
      let { value: { name } } = i;
      if (name != '') {
        arr.push(name);
      }
    }
    return arr;
  }
  sendData() {
    // console.log(this.checkedEventTypes);
    let { name, description, genres } = this.mainDescForm.value;
    let objToSend = {
      name: name,
      description: description,
      genres: genres,
      socialMedia: this.socialMedia,
      linktosongs: this.linktosongs,
      eventTypes: this.checkedEventTypes
    }
    console.log(objToSend);
    
    this.http.post(URL, objToSend).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);

      }
    )
  }
}
