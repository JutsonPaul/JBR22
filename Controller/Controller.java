package com.example.demo.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.repo.Repo;
import com.example.demo.Model.Model;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
public class Controller {
	@Autowired
	Repo drepo;
	@PostMapping ("/add") 
	private String savedate(@RequestBody Model a)
	{
		System.out.println("yes");
		return "success";
	}
	@PostMapping ("/getall") 
	private ArrayList getall()
	{
		System.out.println("hi");
		ArrayList<Model> n=new ArrayList<Model>();
		for(Model k:drepo.findAll())
		{
			System.out.println(k.getName());
			n.add(k);
			
		}
		System.out.println(n);
		return n;
	}
	@PostMapping ("/getbyid") 
	private ArrayList getid(@RequestBody Model nx)
	{
		ArrayList<Model> n=new ArrayList();
		for(Model k:drepo.findAll())
		{
			System.out.println(k.getI());
			System.out.println(nx.getI());
			if(k.getI()==nx.getI())
			{
				n.add(k);	
			}
			
		}
		return n;
	}
	
	@PostMapping ("/login") 
	private String getregdata(@RequestBody Model nx)
	{
//		System.out.println(nx.getName());
	//	System.out.println(nx.getPassword());
		String u="";
		for(Model k:drepo.findAll())
		{
			System.out.println(k.getName());
			System.out.println(nx.getName());
			System.out.println(k.getPassword());
			System.out.println(nx.getPassword());
			if(k.getName().equals(nx.getName()) && k.getPassword().equals(nx.getPassword()))
			{
				u="Matched";
				break;
			}
			else {
				u="unmatched";
			}
		}
		return u;
	}
	
	@PostMapping ("/register") 
	private String getdata(@RequestBody Model reg)
	{
	    System.out.println(reg);
		drepo.save(reg);		
		return "s";
	}
	
	@GetMapping ("/getallu") 
	private ArrayList viewdata()
	{
		System.out.println("s");
		ArrayList<Model> n=new ArrayList<>();
		for(Model y:drepo.findAll())
		{
			n.add(y);		
		}
			return n;
	}

}
