package B107.server.meerkat.service;


import B107.server.meerkat.config.utils.RandomNumber;
import B107.server.meerkat.entity.Call;
import B107.server.meerkat.entity.Marker;
import B107.server.meerkat.repository.CallRepository;
import B107.server.meerkat.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CallService {

	private final CallRepository callRepository;
	private final MemberRepository memberRepository;

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

//	@Transactional
//	public Long findIdxByRoomName(String roomName) {
//		return callRepository.findIdxByRoomName(roomName);
//	}

}
