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
    _matIconRegistry.addSvgIcon(this.getSellerName("STEAM"), _domSanitizer.bypassSecurityTrustResourceUrl('../assets/steam.svg'))
    _matIconRegistry.addSvgIcon(this.getSellerName("EA_GAMES"), _domSanitizer.bypassSecurityTrustResourceUrl('../assets/electronic-arts.svg'))
    _matIconRegistry.addSvgIcon(this.getSellerName("HUMBLE_BUNDLE"), _domSanitizer.bypassSecurityTrustResourceUrl('../assets/humble-bundle.svg'))
  }

  ngOnInit(): void {
    const gameId = this._route.snapshot.paramMap.get("gameId")
    if (gameId === null) {
      this._router.navigate(['/error'])
      return
    }
    this.game$ = this._gameService.getGameDetail(gameId).pipe(map((response: Response<GameDetail>) => {
      return response.data
    }))
    this.page = this._gameService.page
  }

  onLinkClick(link: string) {
    window.open(link, "_blank")
  }

  onBackClick() {
    const navigateTo = this._gameService.isFavoritesPage ? 'favorites' : 'games'

    this._router.navigate([navigateTo], {queryParams: {"page": this.page}})
  }

  getSellerName(seller: string) {
    switch (seller) {
      case "HUMBLE_BUNDLE": {
        return "Humble Bundle"
      }
      case "EA_GAMES": {
        return "Electronic Arts(EA Games)"
      }
      case "STEAM": {
        return "Steam"
      }
      default: {
        return 'Unknown'
      }
    }
  }
}
