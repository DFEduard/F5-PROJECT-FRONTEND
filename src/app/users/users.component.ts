import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../services/api.services';
import {User} from '../classes/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  defaultUserPic = "./assets/User-Icon.ico"
  logoutRedirectUrl = "/login"
  // IDs for form
  inputNameID = "inputName"
  inputPasswordID = "inputPassword"
  inputEmailID = "inputEmail"
  inputTitleID = "inputTitle"
  inputCountryID = "inputCountry"

  // variables for to save the form input 
  inputNameValue: string = "";
  inputEmailValue: string = "";
  inputTitleValue: string = "";
  inputPasswordValue: string = "";
  inputCountryValue: string = "";

  closeResult!: string;
  emailErrorMsg!: string;
  passwordErrorMsg!: string;
  fieldFormClass = {
    "email": {
      "is-invalid": false,
      "form-control": true
    },
    "password": {
      "is-invalid": false,
      "form-control": true
    },
    "name": {
      "is-invalid": false,
      "form-control": true
    },
    "title": {
      "is-invalid": false,
      "form-control": true
    },
    "country": {
      "is-invalid": false,
      "form-control": true
    }
    
  }
 
  // used to disbale password field when edit a user
  passwordIsDisabled = false;

  //used to change the modal based on the action
  modalBtnCreate = true;
  private modalBtnStateSave = "Save";
  private modalBtnStateCreate ="Create";
  modalBtnText = this.modalBtnStateCreate;

  // used to display an error message if the admin user gets deleted
  deleteModalErrorMsg = ""
  
  lstUsers!:User[];
  savedlstUserIndex: number = -1;

  // Useit to print the API results
  private DEBUG_API_RESPONSE = false;

  constructor(private modalService: NgbModal, private apiService: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    // get all users from backend 
    this.apiService.getUsers().subscribe(
      data => {
        this.lstUsers = data

        this.debugAPI(data, "SUCCESS: API get users")
      },
      error => {
        this.debugAPI(error, "ERROR: API get users")
      }
    );
  }

  // function to open a modal
  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  // used to open a modal to add a user
  addUser(content){

      this.clearFormError()
      this.openModal(content)
      this.userFormFields()
  }

  // used to open a modal to edit a user
  openToEditUser(id:string, content){

    this.clearFormError()
    this.userSelector(id)
    this.userFormFields(this.lstUsers[this.savedlstUserIndex], false)
    this.openModal(content)
  }

  createSaveUser(){
    // get user data
    this.inputNameValue = this.getElementValue(this.inputNameID);
    this.inputEmailValue = this.getElementValue(this.inputEmailID);
    this.inputPasswordValue = this.getElementValue(this.inputPasswordID);
    this.inputTitleValue = this.getElementValue(this.inputTitleID);
    this.inputCountryValue = this.getElementValue(this.inputCountryID);



    // check btn state from modal
    if (this.modalBtnText == this.modalBtnStateCreate){
      // create new user
      let user: User = new User();
      user.email = this.inputEmailValue;
      user.password = this.inputPasswordValue;
      user.name = this.inputNameValue;
      user.country = this.inputCountryValue;
      user.title = this.inputTitleValue;

      this.apiService.postUsers(user).subscribe(
        data => {
          
          this.lstUsers.push(data);
          this.modalService.dismissAll();

          this.debugAPI(data, "SUCCESS: API create user")
        },
        error => {
          this.formError(error)

          this.debugAPI(error, "ERROR: API create user");
        }
      )

    }
    else if(this.modalBtnText == this.modalBtnStateSave) {
      // save edited user
      let body = {
        "name": this.inputNameValue,
        "email": this.inputEmailValue,
        "title": this.inputTitleValue,
        "country": this.inputCountryValue
      };
        let userID = this.lstUsers[this.savedlstUserIndex].userID;
        this.apiService.editUser(userID.toString(), body).subscribe(
          (data) => {
              this.lstUsers[this.savedlstUserIndex] = data;
              console.log(data)
              this.savedlstUserIndex = -1;
              this.modalService.dismissAll();
              this.debugAPI(data, "SUCCESS: API edit user")
          },
          (error) => {
              this.formError(error)

              this.debugAPI(error, "ERROR: API edit user")
          }
        );
    };
  }

  deleteUser(id:string, deleteModal){
    this.userSelector(id);

    this.apiService.deleteUser(id).subscribe(
      (data) => {
        // remove user from the list
        this.lstUsers.splice(this.savedlstUserIndex)
        this.savedlstUserIndex = -1;

        this.debugAPI(data, "SUCCESS: API delete user")
      },
      (errorRes) => {
        this.deleteModalErrorMsg = errorRes.error.error;
        this.openModal(deleteModal)

        this.debugAPI(errorRes, "ERROR: API delete user")
      }
    )
  }

  logout(){
    localStorage.removeItem('accessTk')
    localStorage.removeItem('refreshTk')
    this.router.navigate([this.logoutRedirectUrl])
  }

  // get the value of a html input 
  getElementValue(name:string){
    return (<HTMLInputElement>document.getElementById(name)).value;
  }

  // used to clear or to populate the modal used to add or edit a user
  private userFormFields(user: User = new User(), clear: boolean= true){
    if (!clear){
      this.modalBtnText = this.modalBtnStateSave
      this.passwordIsDisabled = true;
    }
    else{
      this.modalBtnText = this.modalBtnStateCreate
      this.passwordIsDisabled = false;
    }
      this.inputEmailValue = user.email
      this.inputPasswordValue = user.password
      this.inputNameValue = user.name
      this.inputTitleValue = user.title
      this.inputCountryValue = user.country
  }

  private userSelector(id:string){
    // save the index of the user from the list - used for edit 
    for (var i=0; i < this.lstUsers.length; i++){

      if (this.lstUsers[i].userID.toString() == id){
        this.savedlstUserIndex = i;
        break;
      }

    }
  }

  private formError(error){
    this.clearFormError()

      this.fieldFormClass.email['is-invalid'] = !!error.error.email;
      this.fieldFormClass.password['is-invalid'] = !!error.error.password;
      this.fieldFormClass.name['is-invalid'] = !!error.error.name
      this.fieldFormClass.title['is-invalid'] = !!error.error.title;
      this.fieldFormClass.country['is-invalid'] = !!error.error.country;

      if(!!error.error.error){
        this.emailErrorMsg = error.error.error

        if(!!error.error.error.email){
          this.emailErrorMsg = error.error.error.email
        }
      }

      
      

      if(!!error.error.error.password){
        this.passwordErrorMsg = error.error.error.password
      }
  }

  private clearFormError(){
    // clear error messages
    this.emailErrorMsg = "";
    this.passwordErrorMsg = "";

    this.fieldFormClass.email['is-invalid'] = false;
    this.fieldFormClass.password['is-invalid'] = false;
    this.fieldFormClass.name['is-invalid'] = false;
    this.fieldFormClass.title['is-invalid'] = false;
    this.fieldFormClass.country['is-invalid'] = false;
  }

  // used to print API responses 
  private debugAPI(data, info:string = ""){
    if (this.DEBUG_API_RESPONSE){
      if (info != "")
      {
        console.log(info, data)
      }
      else{
        console.log("Console debug enabled:",data)
      }
        
    }
  }

}
