package B107.server.meerkat.service;

import B107.server.meerkat.entity.Marker;
import B107.server.meerkat.repository.MarkerRepository;
import jdk.nashorn.internal.objects.annotations.Setter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MarkerService {

	private final MarkerRepository markerRepository;

	
	@Transactional
	public Marker registMarker(Marker marker) {
		
		// marker_check T/F 체크해주기
		markerRepository.save(marker);
		return marker;
	}
}
