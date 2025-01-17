import { Component } from '@angular/core';
import { MessageService } from '../../../core/services/message.service';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {


  message:string=''

  constructor(private messageService:MessageService,private toastr:ToastrService){}

  ngOnInit(): void {
    this.loadMessage();

  }


  loadMessage(){
    this.messageService.getMessage().subscribe({
      next:(response)=>{
        this.message=response.message
        console.log(response)
      }
    })
  }


  updateMessage(){
    this.messageService.updateMessage(this.message).subscribe({
      next:()=>{
        this.toastr.success("Message updated successfully")
      }
    })
  }

}
