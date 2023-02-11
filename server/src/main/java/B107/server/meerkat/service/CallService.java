package B107.server.meerkat.service;


import B107.server.meerkat.config.utils.RandomNumber;
import B107.server.meerkat.dto.call.CallDistanceReqDTO;
import B107.server.meerkat.dto.call.CallDistanceResDTO;
import B107.server.meerkat.entity.Call;
import B107.server.meerkat.exception.ErrorCode;
import B107.server.meerkat.exception.MemberAlreadyExistException;
import B107.server.meerkat.exception.MemberNotFoundException;
import B107.server.meerkat.repository.CallRepository;
import B107.server.meerkat.repository.MemberRepository;
//import B107.server.meerkat.repository.querydsl.CallRepositoryImpl;
import B107.server.meerkat.repository.querydsl.CallRepositoryImpl;
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
    private final CallRepositoryImpl callRepositoryImpl;

    @Transactional
    public String registCall(Long memberIdx, Call call) {
        String ranNum = new RandomNumber().makeRanNum();
        StringBuilder sb = new StringBuilder();
        StringBuilder roomId = sb.append(memberIdx).append(ranNum);

        call.setMember(memberRepository.findById(memberIdx).orElse(null));
        call.setRoomId(roomId.toString());
        callRepository.save(call);
        return roomId.toString();
    }

//	@Transactional
//	public Long findIdxByRoomId(String roomId) {
//		return callRepository.findIdxByRoomId(roomId);
//	}

    @Transactional
    public List<CallDistanceResDTO> findValidMarkers(CallDistanceReqDTO callDistanceReqDTO, Long idx) {

        if (idx == null) {
            throw new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND);
        }
        Double lat = callDistanceReqDTO.getLat();
        Double lng = callDistanceReqDTO.getLng();
        return callRepositoryImpl.findValidMarkers(lat, lng);
    }

}
