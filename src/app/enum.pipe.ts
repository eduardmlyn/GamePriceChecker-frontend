import { Injectable } from "@angular/core";
import { Pipe, PipeTransform } from "@angular/core";
import { Seller } from "./model/enum";


@Pipe({
  name: 'sellerEnum'
})
@Injectable({
  providedIn: 'root'
})
export class SellerEnumPipe implements PipeTransform {

  transform(value: string): string {
    // bruh
    switch (value) {
      case "HUMBLE_BUNDLE": {
        return Seller.HUMBLE_BUNDLE.toString()
      }
      case "EA_GAMES": {
        return Seller.EA_GAMES.toString()
      }
      case "STEAM": {
        return Seller.STEAM.toString()
      }
    }
    return 'Unknown'
  }
}