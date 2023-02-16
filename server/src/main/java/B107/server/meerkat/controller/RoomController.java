package B107.server.meerkat.controller;

import B107.server.meerkat.config.security.auth.PrincipalDetails;
import B107.server.meerkat.config.utils.Msg;
import B107.server.meerkat.config.utils.ResponseDTO;
import B107.server.meerkat.dto.room.RoomDTO;
import B107.server.meerkat.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/room")
@RequiredArgsConstructor
public class RoomController {

	private final RoomService roomService;

	@PutMapping("/join")
	public ResponseEntity<ResponseDTO> joinRoom (@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody RoomDTO roomDto) {
		// 방 테이블에 정보 입력
		Long memberIdx = principalDetails.getMember().getIdx();
		String roomName = roomDto.getRoomName();
		roomService.memberToRoom(memberIdx, roomName);

		// 입장 가능한 방이면 ok
		Long roomIdx = roomDto.getIdx();
		if(roomService.joinRoom(roomIdx)) {
			return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_ROOM_JOIN));
		}
		return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.BAD_REQUEST, Msg.FAIL_ROOM_CLOSED));
	}

	@PutMapping("/exp")
	public ResponseEntity<ResponseDTO> updateRoom (@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody RoomDTO roomDto) {
		// 요청 보낸 사용자 idx
		Long memberIdx = principalDetails.getMember().getIdx();

		// 폐쇄할 방 이름
		String roomName = roomDto.getRoomName();
		roomService.expiredRoom(roomName);

		return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_ACCESS));
	}


}
