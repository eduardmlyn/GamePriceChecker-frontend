import {Component, Injectable, OnInit} from '@angular/core';
import {GameDetail} from "../model/game-detail.model";
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../service/game.service";
import {Response} from "../model/response.model";
import {map, Observable} from "rxjs";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Seller} from "../model/enum";

@Injectable()
@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  game$: Observable<GameDetail>
  private page: number

  constructor(
    private _gameService: GameService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) {
    _matIconRegistry.addSvgIcon(Seller.STEAM, _domSanitizer.bypassSecurityTrustResourceUrl('../assets/steam.svg'))
    _matIconRegistry.addSvgIcon(Seller.EA_GAMES, _domSanitizer.bypassSecurityTrustResourceUrl('../assets/electronic-arts.svg'))
    _matIconRegistry.addSvgIcon(Seller.HUMBLE_BUNDLE, _domSanitizer.bypassSecurityTrustResourceUrl('../assets/humble-bundle.svg'))
  }

  ngOnInit(): void {
    const gameId = this._route.snapshot.paramMap.get("gameId")
    if (gameId === null) {
      this._router.navigate(['/error'])
      return
    }
    this.game$ = this._gameService.getGameDetail(gameId).pipe(map((response: Response<GameDetail>) => {
      console.log(response.data.history)
      return response.data
    }))
    this.page = this._gameService.page
  }

  onLinkClick(link: string) {
    console.log(`clicked link: ${link}`)
  }

  onBackClick() {
    this._router.navigate(['games'], { queryParams: {"page": this.page} })
  }
}
