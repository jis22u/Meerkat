package B107.server.meerkat.service;

import B107.server.meerkat.repository.MarkerCheckRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MarkerCheckService {

	private final MarkerCheckRepository markerCheckRepository;


	/**
	 * 첫 등록 여부 insert
	 */
	@Transactional
	public void addMarkerCheck() {


	}


	/**
	 * 마커 등록 혹은 만료될 때마다 update
	 */
	@Transactional
	public void updateMarkerCheck() {

	}

	/**
	 * 등록 가능 여부 조회 select
	 */
	@Transactional
	public void getMarkerCheck(Long memberId) {
//		markerCheckRepository.
	}
}
