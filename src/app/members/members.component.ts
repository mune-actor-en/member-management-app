import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: Member[];

  constructor(private http: HttpClient, private memberService: MemberService) {}

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.memberService
      .getMembers() // Observales
      .subscribe((members) => (this.members = members));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.memberService.addMember({ name } as Member).subscribe((member) => {
      this.members.push(member);
    });
  }

  delete(member: Member): void {
    this.members = this.members.filter((m) => m !== member);
    this.memberService.deleteMember(member).subscribe();
  }
}
