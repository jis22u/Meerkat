package B107.server.meerkat.controller;

import B107.server.meerkat.service.MarkerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/marker")
public class MarkerController {
	private final MarkerService markerService;

	public MarkerController(MarkerService markerService) {
		this.markerService = markerService;
	}
}
