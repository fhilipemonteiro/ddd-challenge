import Order from "../entity/order";
import RespositoryInterface from "../../@shared/repository/repository-interface";

export default interface OrderRepositoryInterface
  extends RespositoryInterface<Order> {}
