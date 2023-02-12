package B107.server.meerkat.service;

import B107.server.meerkat.entity.CallCheck;
import B107.server.meerkat.entity.Marker;
import B107.server.meerkat.entity.Room;
import B107.server.meerkat.repository.CallCheckRepository;
import B107.server.meerkat.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {
	private final RoomRepository roomRepository;

	private final CallCheckService callCheckService;
	/**
	 * 처음 방 생성 및 할당이 되면 실행
	 * */
	@Transactional
	public Long registRoom(Long request_idx, String roomName) {
		Room room = Room.builder()
				.roomName(roomName)
				.isValid(true)
				.requestIdx(request_idx)
				.build();
		roomRepository.save(room);

		return roomRepository.findIdxByRoomName(roomName);
	}

	/**
	 * 대기시간 2분이 지나서, 통화가능 시간 5분이 지나서, 둘 중 한명이 연결을 끊어서
	 * 해당 방은 닫힘
	 */
	@Transactional
	public void expiredRoom(String roomName) {
		// 방 폐쇄
		Room room = roomRepository.findRoomByRoomName(roomName);
		room.setIsValid(false);
		roomRepository.save(room);

		// 해당 방의 요청자 call 제한 풀어주기
		Long reqIdx = room.getRequestIdx();
		callCheckService.registCallCheck(reqIdx, false);
	}

	@Transactional
	public boolean joinRoom(Long roomIdx) {
		return roomRepository.findValidByIdx(roomIdx);
	}

	@Transactional
	public void memberToRoom(Long memberIdx, String roomName) {
		Room room = roomRepository.findRoomByRoomName(roomName);
		Long requestIdx = room.getRequestIdx();
		if(!memberIdx.equals(requestIdx)) {
			room.setResponseIdx(memberIdx);
			roomRepository.save(room);
		}
	}


}
