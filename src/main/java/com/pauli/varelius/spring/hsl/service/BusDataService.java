package com.pauli.varelius.spring.hsl.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pauli.varelius.spring.hsl.domain.BusData;

@Service
public class BusDataService {

	private final String API_URL_BUS = "https://api.digitransit.fi/realtime/vehicle-positions/v1/hfp/journey/bus/#";
	private final String API_URL_TRAM = "https://api.digitransit.fi/realtime/vehicle-positions/v1/hfp/journey/tram/#";

	private final String API_URL = "http://api.digitransit.fi/realtime/vehicle-positions/v1/hfp/journey/+/+/";

	public List<BusData> getData(String busId) throws IOException {

		RestTemplate template = new RestTemplate();

		String originalJsonData = template.getForObject(API_URL_BUS, String.class);
		originalJsonData += template.getForEntity(API_URL_TRAM, String.class);

		ObjectMapper mapper = new ObjectMapper();
		JsonNode jsonNodes = mapper.readTree(originalJsonData);

		String json = jsonNodes.findParents("desi").toString();
		List<BusData> busDataList = null;

		busDataList = mapper.readValue(json, new TypeReference<List<BusData>>() {
		});

		List<BusData> busListWithId = new ArrayList<>();

		for (BusData bus : busDataList) {
			if (bus.getDesi().equals(busId)) {
				busListWithId.add(bus);
			}
		}
		return busListWithId;
	}

}
