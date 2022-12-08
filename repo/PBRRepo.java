package com.example.demo.repo;
import org.springframework.data.repository.CrudRepository;
import com.example.demo.Model.PBRTable;
import com.example.demo.Model.Users;
public interface PBRRepo extends CrudRepository<PBRTable,Integer>{

	void save(Users ad); 
}

