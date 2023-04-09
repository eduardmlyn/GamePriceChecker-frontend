import {GameSeller} from "./game-seller.model";
import {PriceSnapshot} from "./price-snapshot.model";

export interface GameDetail {
  id: string,
  name: string,
  description: string,
  imageUrl: string,
  releaseDate: Date,
  sellerLinks: GameSeller[],
  history: PriceSnapshot[]
}
