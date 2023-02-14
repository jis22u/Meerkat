package B107.server.meerkat.service;


import B107.server.meerkat.config.utils.RandomNumber;
import B107.server.meerkat.dto.call.CallDistanceReqDTO;
import B107.server.meerkat.dto.call.CallDistanceResDTO;
import B107.server.meerkat.entity.Call;
import B107.server.meerkat.entity.Marker;
import B107.server.meerkat.exception.ErrorCode;
import B107.server.meerkat.exception.MemberAlreadyExistException;
import B107.server.meerkat.exception.MemberNotFoundException;
import B107.server.meerkat.repository.CallRepository;
import B107.server.meerkat.repository.MarkerRepository;
import B107.server.meerkat.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CallService {

    private final CallRepository callRepository;
    private final MemberRepository memberRepository;
    private final MarkerRepository markerRepository;


	@Transactional
	public String registCall(Long memberIdx, Call call) {
		String ranNum = new RandomNumber().makeRanNum();
		StringBuilder sb = new StringBuilder();
		StringBuilder roomName = sb.append(memberIdx).append(ranNum);

		call.setMember(memberRepository.findById(memberIdx).orElse(null));
		call.setRoomName(roomName.toString());
		callRepository.save(call);
		return roomName.toString();
	}

	@Transactional
	public Call findCallByRoomName(String roomName) {
		return callRepository.findCallByRoomName(roomName);
	}



    @Transactional
    public List<CallDistanceResDTO> findValidMarkers(CallDistanceReqDTO callDistanceReqDTO, Long idx) {

        if (idx == null) {
            throw new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND);
        }
        Double lat = callDistanceReqDTO.getLat();
        Double lng = callDistanceReqDTO.getLng();
        Double range = 0.005; // 500m 거리, 예시입니다. 경도 기준으로 500m이 얼마나 되는지는 위도에 따라 다릅니다.
        return markerRepository.findValidMarkers(lat, lng, range);
//        return callRepositoryImpl.findValidMarkers(lat, lng);
    }


}
