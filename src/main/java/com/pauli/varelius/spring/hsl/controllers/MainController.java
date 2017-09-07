package com.pauli.varelius.spring.hsl.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pauli.varelius.spring.hsl.domain.BusData;
import com.pauli.varelius.spring.hsl.facade.Facade;

@Controller
public class MainController {

	@Autowired
	Facade facade;

	@RequestMapping("/{busId}")
	public String mainPage(@PathVariable("busId") String busId, ModelMap modelMap) throws IOException {
		List<BusData> busList = facade.getBusData(busId);
		modelMap.addAttribute("busList", busList);
		return "index";
	}
}
