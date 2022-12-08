package com.example.demo.repo;
import org.springframework.data.repository.CrudRepository;
import com.example.demo.Model.Users;

public interface UsersRepo extends CrudRepository<Users,Integer>{

}