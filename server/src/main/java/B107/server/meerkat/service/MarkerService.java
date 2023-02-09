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
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class MarkerService {

	private final MarkerRepository markerRepository;
	private final MarkerCheckRepository markerCheckRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public Marker registMarker(Long memberIdx, Marker marker) {
		marker.setMember(memberRepository.findById(memberIdx).orElse(null));
		markerRepository.save(marker);
		return marker;
	}

	@Transactional
	public Marker getValidMarker(Long memberIdx) {
		return markerRepository.findValidByMemberIdx(memberIdx);
	}

	@Transactional
	public Marker updateMarker(Long memberIdx, Marker marker) {
		Marker curMarker = markerRepository.findValidByMemberIdx(memberIdx);
		curMarker.setExpDate(marker.getExpDate());
		return curMarker;
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
