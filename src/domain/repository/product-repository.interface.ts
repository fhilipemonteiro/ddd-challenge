import Product from "../entity/product";
import RespositoryInterface from "./repository-interface";

export default interface ProductRespositoryInterface
  extends RespositoryInterface<Product> {}
