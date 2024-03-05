import Order from "../entity/order";
import RespositoryInterface from "./repository-interface";

export default interface OrderRepositoryInterface
  extends RespositoryInterface<Order> {}
