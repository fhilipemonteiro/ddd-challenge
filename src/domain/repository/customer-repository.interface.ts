import Customer from "../entity/customer";
import RespositoryInterface from "./repository-interface";

export default interface CustomerRepositoryInterface
  extends RespositoryInterface<Customer> {}
