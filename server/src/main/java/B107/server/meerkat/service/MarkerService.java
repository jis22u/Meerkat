package B107.server.meerkat.service;

import B107.server.meerkat.entity.Marker;
import B107.server.meerkat.entity.MarkerCheck;
import B107.server.meerkat.repository.MarkerCheckRepository;
import B107.server.meerkat.repository.MarkerRepository;
import B107.server.meerkat.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class MarkerService {

	private final MarkerRepository markerRepository;
	private final MarkerCheckRepository markerCheckRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public Marker registMarker(Long memberIdx, Marker marker) {
		// 등록 여부 true 처리
		MarkerCheck markerCheck = MarkerCheck.builder()
				.memberIdx(memberIdx)
				.mcCheck(true)
				.build();
		markerCheckRepository.save(markerCheck);

		// marker에 Member 세팅
		marker.setMember(memberRepository.findById(memberIdx).orElse(null));
		markerRepository.save(marker);
		return marker;
	}

	@Transactional
	public Marker getValidMarker(Long memberIdx) {
		return markerRepository.findValidByMemberIdx(memberIdx);
	}

	@Transactional
	public Marker updateMarker(Long memberIdx, LocalDateTime expDate) {
		Marker marker = markerRepository.findValidByMemberIdx(memberIdx);

		if(marker.getMember().getIdx() == memberIdx) {
			marker.setExpDate(expDate);
			return markerRepository.save(marker);
		}
		return null;
	}

	@Transactional
	public Long deleteMarker(Long memberIdx) {
		Marker marker = markerRepository.findValidByMemberIdx(memberIdx);

		if(marker.getMember().getIdx() == memberIdx) {
			markerRepository.deleteById(marker.getIdx());
			return marker.getIdx();
		}
		return -1L;
	}

}
