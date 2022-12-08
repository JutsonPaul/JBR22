package com.example.demo.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.PBRTable;
import com.example.demo.Model.Users;
import com.example.demo.Model.Orders;
import com.example.demo.Model.Bill;
import com.example.demo.repo.Billrepo;
import com.example.demo.repo.Orderrepo;
import com.example.demo.repo.PBRRepo;
import com.example.demo.repo.UsersRepo;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
@CrossOrigin
@RestController
@RequestMapping("/PBR")
public class PBRController {
	@Autowired
	PBRRepo drepo;
	
	@Autowired
	UsersRepo urepo;

	@Autowired
	Orderrepo orepo;
	
	@Autowired
	Billrepo brepo;

    Date date=new Date();
    @PostMapping ("/data") 
	private ArrayList getdata()
	{
		ArrayList<PBRTable> n=new ArrayList();
		for(PBRTable k:drepo.findAll())
		{
				n.add(k);
		}
		return n;		
	}
	
	@PostMapping("/adduser")
	private String adduser(@RequestBody Users ad)	
	{
		urepo.save(ad);
		return "";
	}
	
	@PostMapping("/getuser")
	private ArrayList getuser()	
	{
		ArrayList<Users> n=new ArrayList<>();
		for(Users t:urepo.findAll())
		{
		   	n.add(t);
		}
		return n;
	}
	
	@PostMapping ("/adddata") 
	private String adddata(@RequestBody PBRTable pt)
	{
		drepo.save(pt);
		return "Added";
	}
	
	@PostMapping ("/edit") 
	private String editdata(@RequestBody PBRTable pt)
	{
		for(PBRTable k:drepo.findAll())
		{
			  if(k.getId()==pt.getId())
              {
            	  k.setCategory(pt.getCategory());
            	  k.setDish(pt.getDish());
            	  k.setPrice(pt.getPrice());
            	  drepo.save(k);
              }
		}
		return "";		
	}
	
	@PostMapping ("/delete") 
	private String deletedata(@RequestBody PBRTable pt)
	{
		System.out.println(pt.getId());
		for(PBRTable k:drepo.findAll())
		{	      	  
			  if(k.getId()==pt.getId())
              {
            	  drepo.deleteById(pt.getId());
              }
		}
		return "";		
	}
	
	@PostMapping("/dishstatusupdate")
	private String dishstatusupdate(@RequestBody PBRTable pt)
	{	
		String status="";
        for(PBRTable d:drepo.findAll())
        {
        	if(d.getId()==pt.getId())
        	{
        		d.setStatus(pt.getStatus());
        		status=d.getStatus();
        		drepo.save(d);
        	}
        }
		return status;
	}
	
	@PostMapping ("/placeorder")
	private int placeorder(@RequestBody Orders pt)
	{	
		pt.setDate(date);
//		pt.setTdid(orepo.)
		orepo.save(pt);
		return pt.getOid();
	}
	
	@PostMapping ("/genbill")
	private String genbill(@RequestBody Bill pt)
	{	
		pt.setDate(date);
		brepo.save(pt);
     	return "placed";
	}
		
	@PostMapping ("/getoid")
	private Integer getoid(@RequestBody Orders pt)
	{
        int id=0;
		for(Orders t:orepo.findAll())
		{
	            		
				if(pt.getTabno().equals(t.getTabno()) && t.getStatus().equals("started") || t.getStatus().equals("accepted") || t.getStatus().equals("delivered"))
				{
					id=t.getOid();
				}
		}
		return id;
	}
	
	@PostMapping ("/gettable")
	private ArrayList gettable()
	{
		ArrayList<String> n=new ArrayList<>();
		for(Orders t:orepo.findAll())
		{	
			if(t.getStatus().equals("started"))
				{
					n.add(t.getTabno());
				}
		}
		return n;
	}
	
	@PostMapping ("/getbill")
	private ArrayList getbill(@RequestBody Bill pt)
	{
		ArrayList<Bill> n=new ArrayList<>();
		for(Bill t:brepo.findAll())
		{
			if(pt.getTabno().equals(t.getTabno()) && ( t.getStatus().equals("ordered") || t.getStatus().equals("accepted") || t.getStatus().equals("delivered"))) 
		   	{
		   		n.add(t);		   	
		   	}
		}
		return n;
	}
	
	@PostMapping("/statusupdate")
	private String statusupdate(@RequestBody Bill pt)
	{	
		String status="";
		System.out.println(pt.getBid());
	    for(Bill b:brepo.findAll())
        {
        	if(b.getBid()==pt.getBid())
        	{
        		b.setStatus(pt.getStatus());
        		brepo.save(b);
        		status=b.getStatus();
        		if(pt.getOid()!=0)
            	{
            		b.setStatus(pt.getStatus());
            		brepo.save(b);
            		status=b.getStatus();
            	}
        	}
        	if(pt.getBid()==0)
        	{
        		if(b.getOid()==pt.getOid())
        		{
        			b.setStatus(pt.getStatus());
        			brepo.save(b);
        		}
        	}
        }
		return status;
	}
		
	@PostMapping("/orderstatusupdate")
	private String orderstatusupdate(@RequestBody Orders pt)
	{	
		String status="";
        System.out.println(pt.getStatus());
        for(Orders o:orepo.findAll())
        {
        	if(pt.getOid()==o.getOid())
        	{
                System.out.println(pt.getStatus());
        		o.setStatus(pt.getStatus());
        		o.setCash(pt.getCash());
        		o.setUpi(pt.getUpi());
                orepo.save(o);
            }
        }
		return status;
	}
	
	@PostMapping("/getdeliveredtable")
	private ArrayList getdeliveredtable()
	{
		ArrayList<String> n=new ArrayList<>();
		for(Orders t:orepo.findAll())
		{
				if(t.getStatus().equals("delivered") )
				{
					n.add(t.getTabno());
				}
		}
		return n;
	}
	
	@PostMapping("/getbilltotal")
	private Integer getbilltotal(@RequestBody Orders pt)
	{
		int tot=0;
		for(Orders t:orepo.findAll())
		{
			System.out.println(pt.getTabno());	
			if(t.getTabno().equals(pt.getTabno()) && t.getStatus().equals("delivered"))
				{
                     tot=t.getTotal();
 					System.out.println(tot);
				}
		}
		return tot;
	}
	
	@PostMapping("/getbilltoprint")
	private ArrayList getbilltoprint(@RequestBody Bill pt)
	{
		ArrayList<Bill>n=new ArrayList<>();
		for(Bill t:brepo.findAll())
		{
			if(t.getTabno().equals(pt.getTabno()) && t.getStatus().equals("delivered"))
				{
            		System.out.println();
				}
		}
		return n;
	}
	
	@PostMapping("/getbillreport")
	private ArrayList getbillreport(@RequestBody Bill pt)
	{
		ArrayList<Bill> n=new ArrayList<>();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String date1=dateFormat.format(pt.getDate());
		//System.out.println(date1);
		if(pt.getDate()==null)
		{
			return n;
		}
		else {
		   		for(Bill t:brepo.findAll())
				{
					String date2=dateFormat.format(t.getDate());
					if(date2.contains(date1) && t.getStatus().equals("paid"))
						{
						  n.add(t);
						}
				}
		}   		
		return n;
	}
	
	@PostMapping("/todayorders")
	private ArrayList todayorders(@RequestBody Orders pt)
	{
		ArrayList<Orders> n=new ArrayList<>();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String date1=dateFormat.format(pt.getDate());
		if(pt.getDate()==null)
		{
			return n;
		}
		else {
		   		for(Orders t:orepo.findAll())
				{
					String date2=dateFormat.format(t.getDate());
					if(date2.contains(date1))
						{
						  n.add(t);
						}
				}
		}   		
		return n;
	}
	
	@PostMapping("/getdeliveredbill")
	private ArrayList getdeliveredbill(@RequestBody Bill pt)
	{
		ArrayList<Bill> n=new ArrayList<>();
		for(Bill t:brepo.findAll())
		{
				if(t.getTabno().equals(pt.getTabno()) && t.getStatus().equals("delivered"))
				{
					n.add(t);
				}
		}
		return n;
	}
}
