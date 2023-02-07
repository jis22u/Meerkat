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
	 * 해당 사용자의 등록 가능 여부 조회 select
	 */
	@Transactional
	public boolean isMarkerCheck(Long memberIdx) {
		return markerCheckRepository.findMarkerCheckById(memberIdx);
	}
}
