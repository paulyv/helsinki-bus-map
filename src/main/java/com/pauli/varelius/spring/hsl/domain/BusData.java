package com.pauli.varelius.spring.hsl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BusData {
	
    private String desi;
    private String dir;
    private String oper;
    private String veh;
    private String tst;
    private String tsi;
    private String spd;
    private String lat;
    private String lon;
    private String dl;
    private String oday;
    private String jrn;
    private String line;
    private String start;
    private String source;
    
	public String getDesi() {
		return desi;
	}
	public void setDesi(String desi) {
		this.desi = desi;
	}
	public String getDir() {
		return dir;
	}
	public void setDir(String dir) {
		this.dir = dir;
	}
	public String getOper() {
		return oper;
	}
	public void setOper(String oper) {
		this.oper = oper;
	}
	public String getVeh() {
		return veh;
	}
	public void setVeh(String veh) {
		this.veh = veh;
	}
	public String getTst() {
		return tst;
	}
	public void setTst(String tst) {
		this.tst = tst;
	}
	public String getTsi() {
		return tsi;
	}
	public void setTsi(String tsi) {
		this.tsi = tsi;
	}
	public String getSpd() {
		return spd;
	}
	public void setSpd(String spd) {
		this.spd = spd;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public String getLon() {
		return lon;
	}
	@JsonProperty("long")
	public void setLon(String lon) {
		this.lon = lon;
	}
	public String getDl() {
		return dl;
	}
	public void setDl(String dl) {
		this.dl = dl;
	}
	public String getOday() {
		return oday;
	}
	public void setOday(String oday) {
		this.oday = oday;
	}
	public String getJrn() {
		return jrn;
	}
	public void setJrn(String jrn) {
		this.jrn = jrn;
	}
	public String getLine() {
		return line;
	}
	public void setLine(String line) {
		this.line = line;
	}
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
    
}
