package com.example.demo.repo;
import org.springframework.data.repository.CrudRepository;
import com.example.demo.Model.Bill;

public interface Billrepo extends CrudRepository<Bill,Integer>{

}
