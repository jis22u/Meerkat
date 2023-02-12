package B107.server.meerkat.controller;

import B107.server.meerkat.config.security.auth.PrincipalDetails;
import B107.server.meerkat.config.utils.Msg;
import B107.server.meerkat.config.utils.ResponseDTO;
import B107.server.meerkat.dto.call.CallDistanceReqDTO;
import B107.server.meerkat.dto.room.RoomDTO;
import B107.server.meerkat.entity.Call;
import B107.server.meerkat.service.CallCheckService;
import B107.server.meerkat.service.CallService;
import B107.server.meerkat.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/call")
@RequiredArgsConstructor
public class CallController {

    private static final String METHOD_NAME = CallController.class.getName();

	private final CallService callService;
	private final CallCheckService callCheckService;
	private final RoomService roomService;

    @PostMapping("/regist")
    public ResponseEntity<ResponseDTO> registCall(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                                  @RequestBody Call call) {

        Long memberIdx = principalDetails.getMember().getIdx();

		// 첫 가입하고 나서 CallCheck의 member_idx 초기화 해주기
		if(!callCheckService.isCallCheck(memberIdx)) {
			// 요청 가능한 경우
			callCheckService.registCallCheck(memberIdx, true);
			String roomName = callService.registCall(memberIdx, call);

			// 방 테이블에 insert
			Long roomIdx = roomService.registRoom(memberIdx, roomName);

			// RoomReqDTO 생성
			RoomDTO res = RoomDTO.builder()
					.idx(roomIdx)
					.roomName(roomName)
					.build();

			// 요청 idx도 찾아서 보내주기
//			Long callIdx = callService.findIdxByRoomName(roomName);
			return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_CALL_REGISTER, res));
		}

		// 이미 등록 내역이 있는 경우
		return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.BAD_REQUEST, Msg.FAIL_CALL_REGISTER));
    }


    @PostMapping("/find")
    public ResponseEntity<ResponseDTO> findValidMarkers(@RequestBody CallDistanceReqDTO callDistanceReqDTO, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        log.info(METHOD_NAME + "- findValidMarkers");
        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_CALL_FIND, callService.findValidMarkers(callDistanceReqDTO, principalDetails.getMember().getIdx())));
    }

}
