package com.example.demo.repo;
import org.springframework.data.repository.CrudRepository;
import com.example.demo.Model.Orders;
public interface Orderrepo extends CrudRepository<Orders,Integer>{

}
