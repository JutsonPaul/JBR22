package com.example.demo.Model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Model {
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int i;
	public int getI() {
		return i;
	}

	public void setI(int i) {
		this.i = i;
	}

	private String name,password;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
