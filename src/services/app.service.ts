import { AuthService } from "./auth.service"
import { MovieService } from "./movie.service"
import { UserService } from "./user.service"
import { Web3Service } from "./web3.service"

export const Service = {
  auth: new AuthService(),
  user: new UserService(),
  web3: new Web3Service(),
  movie: new MovieService(),
}
