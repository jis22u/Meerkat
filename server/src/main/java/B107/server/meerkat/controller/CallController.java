package B107.server.meerkat.controller;

import B107.server.meerkat.config.security.auth.PrincipalDetails;
import B107.server.meerkat.config.utils.Msg;
import B107.server.meerkat.config.utils.ResponseDTO;
import B107.server.meerkat.dto.call.CallDistanceReqDTO;
import B107.server.meerkat.dto.member.MemFcmReqDTO;
import B107.server.meerkat.entity.Call;
import B107.server.meerkat.service.CallCheckService;
import B107.server.meerkat.service.CallService;
import B107.server.meerkat.service.MemberService;
import B107.server.meerkat.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/call")
@RequiredArgsConstructor
public class CallController {

    private static final String METHOD_NAME = CallController.class.getName();

	private final CallService callService;
	private final CallCheckService callCheckService;
	private final RoomService roomService;
	private final MemberService memberService;


    @PostMapping("/regist")
    public ResponseEntity<ResponseDTO> registCall(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                                  @RequestBody Call call) {

        Long memberIdx = principalDetails.getMember().getIdx();

		// 첫 가입하고 나서 CallCheck의 member_idx 초기화 해주기
		if(!callCheckService.isCallCheck(memberIdx)) {
			// 요청 가능한 경우
			// 1) 요청 등록하고
			callCheckService.registCallCheck(memberIdx, true);
			String roomName = callService.registCall(memberIdx, call);

			// 2) 방 테이블에 insert
			Long roomIdx = roomService.registRoom(memberIdx, roomName);

			// 3) 근거리 미어캣들 fcm Token 뽑아내기
			CallDistanceReqDTO callDistanceReqDTO = CallDistanceReqDTO.builder()
																.lat(call.getLat())
																.lng(call.getLng())
																.build();
			// member idx 받아오기
			List<Long> markers = callService.findValidMarkers(callDistanceReqDTO, memberIdx);
			// 반환된 member idx 로 해당 멤버의 fcm 토큰 찾기
			List<String> fcmTokens = memberService.findFcm(markers);

			String name = principalDetails.getMember().getName();
			String content = call.getContent();

			// 4) MemFcmReqDTO 에 방idx, 방이름, fcm Token들 보내기
			MemFcmReqDTO res = MemFcmReqDTO.builder()
					.idx(roomIdx)
					.roomName(roomName)
					.content(content)
					.name(name)
					.fcmTokenList(fcmTokens)
					.build();

			// 요청 idx도 찾아서 보내주기
			return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_CALL_REGISTER, res));
		}

		// 이미 등록 내역이 있는 경우
		return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.BAD_REQUEST, Msg.FAIL_CALL_REGISTER));
    }


//    @PostMapping("/find")
//    public ResponseEntity<ResponseDTO> findValidMarkers(@RequestBody CallDistanceReqDTO callDistanceReqDTO, @AuthenticationPrincipal PrincipalDetails principalDetails) {
//        log.info(METHOD_NAME + "- findValidMarkers");
//
//		// member idx 받아오기
//		List<Long> markers = callService.findValidMarkers(callDistanceReqDTO, principalDetails.getMember().getIdx());
//		// 반환된 member idx 로 해당 멤버의 fcm 토큰 찾기
//		List<CallDistanceFcmDTO> fcmTokens = memberService.findFcm(markers);
//        return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_CALL_FIND, fcmTokens));
//    }

}
