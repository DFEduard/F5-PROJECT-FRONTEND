import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  defaultUser = {
    "name": "John Doe",
    "title": "Full Stack Developer",
    "country": "Bay Area, San Francisco, CA",
    "email": "eduard94@gmail.com"
  }

  user1 = {
    "name": "Eduard",
    "title": "Software Engineer",
    "country": "Romania",
    "email": "eduard94@gmail.com"
  }
  user2 = {
    "name": "Robert",
    "title": "Web Developer",
    "country": "Romania",
    "email": "robert@gmail.com"
  }
  user3 = {
    "name": "Bianca",
    "title": "Public relationship",
    "country": "Romania",
    "email": "bianca@gmail.com"
  }
  user4 = {
    "name": "User 4",
    "title": "Test",
    "country": "Romania",
    "email": "user4@gmail.com"
  }

  inputNameID = "inputName"
  inputPasswordID = "inputPassword"
  inputEmailID = "inputEmail"
  inputTitleID = "inputTitle"
  inputCountryID = "inputCountry"

  public userCards = [this.defaultUser, this.user1, this.user2, this.user3]

  closeResult!: string;
  inputNameValue: string = "";
  inputEmailValue: string = "";
  inputTitleValue: string = "";
  inputPasswordValue: string = "";
  inputCountryValue: string = "";
  modalBtnText = "Create"
  modalBtnCreate = true;
  selectedCardIndex = -1;

  constructor(private modalService: NgbModal) {

  }

  ngOnInit(): void {
    console.log(this.userCards)
  }

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  addUser(content){
      // this.userCards.push(this.user4);
      // console.log(userCard)
      this.openModal(content)
      this.modalBtnText = "Create"
      this.inputNameValue = ""
      this.inputTitleValue = ""
      this.inputCountryValue = ""
      this.inputNameValue = ""
      this.inputEmailValue = ""
  }

  deleteUser(index:string){
    let i = parseInt(index)
    if (i > -1){
      this.userCards.splice(i,1)
    }
    console.log(index)
  }

  
  createUser(){
    // get user data
    this.inputNameValue = this.getElementValue(this.inputNameID)
    this.inputEmailValue = this.getElementValue(this.inputEmailID)
    this.inputPasswordValue = this.getElementValue(this.inputPasswordID)
    this.inputTitleValue = this.getElementValue(this.inputTitleID)
    this.inputCountryValue = this.getElementValue(this.inputCountryID)

    // check btn state from modal
    if (this.modalBtnText == "Create"){
      // create new user
      let userObj = {
        "name": this.inputNameValue,
        "title": this.inputTitleValue,
        "country": this.inputCountryValue,
        "email": this.inputEmailValue
      }
      // add user to card
      this.userCards.push(userObj)
    }
    else if(this.modalBtnText == "Save") {
      // save changes
        this.userCards[this.selectedCardIndex].name = this.inputNameValue
        this.userCards[this.selectedCardIndex].title = this.inputTitleValue
        this.userCards[this.selectedCardIndex].country = this.inputCountryValue

        
        console.log("edited")
        console.log(this.userCards[this.selectedCardIndex])
        this.selectedCardIndex = -1
    }

    console.log(this.inputNameValue, this.inputEmailValue, this.inputPasswordValue, this.inputTitleValue, this.inputCountryValue)
    this.modalService.dismissAll()
    
  }

  editUser(index:string, content){
    this.selectedCardIndex = parseInt(index)
    let card

    if (this.selectedCardIndex > -1){
      card = this.userCards[this.selectedCardIndex]
    }
    this.modalBtnText = "Save"
    this.inputNameValue = card.name
    this.inputTitleValue = card.title
    this.inputCountryValue = card.country
    this.openModal(content)
    console.log("edit user")
  }


  getElementValue(name:string){
    return (<HTMLInputElement>document.getElementById(name)).value;
  }

}
