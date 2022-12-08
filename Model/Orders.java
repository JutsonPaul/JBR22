package com.example.demo.Model;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
//@Table(name="Bill")
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int oid;
	public int getOid() {
		return oid;
	}
	public void setOid(int oid) {
		this.oid = oid;
	}
	public int getEid() {
		return eid;
	}
	public void setEid(int eid) {
		this.eid = eid;
	}
	public String getTabno() {
		return tabno;
	}
	public void setTabno(String tabno) {
		this.tabno = tabno;
	}

public int getTotal() {
	return total;
}
public void setTotal(int total) {
	this.total = total;
}
public int getTdid() {
	return tdid;
}
public void setTdid(int tdid) {
	this.tdid = tdid;
}
private int eid;
private String tabno;
private int total;
private String status;
private Date date=new Date();
private int tdid;
private int cash,upi;
public int getCash() {
	return cash;
}
public void setCash(int cash) {
	this.cash = cash;
}
public int getUpi() {
	return upi;
}
public void setUpi(int upi) {
	this.upi = upi;
}
public String getStatus() {
	return status;
}

public void setStatus(String status) {
	this.status = status;
}
public Date getDate() {
	return date;
}

public void setDate(Date date) {
	this.date = date;
}

}
