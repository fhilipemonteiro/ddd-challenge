import Customer from "../entity/customer";
import RespositoryInterface from "../../@shared/repository/repository-interface";

export default interface CustomerRepositoryInterface
  extends RespositoryInterface<Customer> {}
