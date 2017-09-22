package com.pauli.varelius.spring.hsl.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.pauli.varelius.spring.hsl.domain.BusData;
import com.pauli.varelius.spring.hsl.facade.Facade;

@RestController
public class ControllerRest<T> {
	
	@Autowired
	Facade facade;
	
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public ResponseEntity<List<BusData>> getBusData(@RequestBody List<String> busIds, ModelMap modelMap) throws IOException {
			List<BusData> busList = facade.getBusData(busIds);
			return new ResponseEntity<>(busList, HttpStatus.OK);
	}

}
