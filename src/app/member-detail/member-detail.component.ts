import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  @Input() member: Member;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    // pathのidをコンポーネントから取得する
    // idは文字列で帰ってくるため、実行分の先頭に「+」をつけて数値に変換する
    const id = +this.route.snapshot.paramMap.get('id');
    this.memberService
      .getMember(id)
      .subscribe((member) => (this.member = member));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.memberService.updateMember(this.member).subscribe(() => this.goBack());
  }
}
