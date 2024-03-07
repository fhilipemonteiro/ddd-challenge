import Product from "../entity/product";
import RespositoryInterface from "../../@shared/repository/repository-interface";

export default interface ProductRespositoryInterface
  extends RespositoryInterface<Product> {}
