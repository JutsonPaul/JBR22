package com.example.demo.repo;
import org.springframework.data.repository.CrudRepository;
import com.example.demo.Model.Model;
public interface Repo extends CrudRepository<Model,Integer>{

}
