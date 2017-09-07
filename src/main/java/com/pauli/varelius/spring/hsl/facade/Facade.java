package com.pauli.varelius.spring.hsl.facade;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pauli.varelius.spring.hsl.domain.BusData;
import com.pauli.varelius.spring.hsl.service.BusDataService;

@Service
public class Facade {

	@Autowired
	BusDataService busDataService;

	public List<BusData> getBusData(String busId) throws IOException {
		List<BusData> busList = busDataService.getData(busId);
		return busList;
	}
}
