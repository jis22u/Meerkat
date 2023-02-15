package B107.server.meerkat.service;

import B107.server.meerkat.entity.Call;
import B107.server.meerkat.entity.Deal;
import B107.server.meerkat.entity.Room;
import B107.server.meerkat.repository.DealRepository;
import B107.server.meerkat.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {

	private final RoomRepository roomRepository;
	private final DealRepository dealRepository;


	private final CallService callService;
	private final CallCheckService callCheckService;
	private final DealService dealService;
	private final DepositService depositService;



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
	 *
	 * 방이 종료되고, 정보제공자 idx != null 일 경우, 거래 정상 완료로 간주
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

		// 거래 서비스 연동 - 거래 끝
		if(room.getResponseIdx() != null) {
			Call call = callService.findCallByRoomName(roomName);
			Deal deal = dealService.findDealByCallIdx(call.getIdx());
			deal.setExitTime(LocalDateTime.now());
			dealRepository.save(deal);
			
			// 입출금 내역
			depositService.registDeposit(deal.getReqMember().getIdx(), deal.getResMember().getIdx(), call.getCoin());
		}

	}

	@Transactional
	public boolean joinRoom(Long roomIdx) {
		return roomRepository.findValidByIdx(roomIdx);
	}

	/**
	 * 정보제공자가 방에 입장하는 순간 거래 시작으로 간주
	 */
	@Transactional
	public void memberToRoom(Long memberIdx, String roomName) {
		Room room = roomRepository.findRoomByRoomName(roomName);
		Long requestIdx = room.getRequestIdx();
		if(!memberIdx.equals(requestIdx)) {
			room.setResponseIdx(memberIdx);
			roomRepository.save(room);

			// 거래 시작 - 거래 등록
			Long callIdx = callService.findCallByRoomName(roomName).getIdx();
			dealService.registDeal(requestIdx, memberIdx, callIdx);
		}
	}


}
