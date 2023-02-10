package B107.server.meerkat.controller;

import B107.server.meerkat.config.security.auth.PrincipalDetails;
import B107.server.meerkat.config.utils.Msg;
import B107.server.meerkat.config.utils.ResponseDTO;
import B107.server.meerkat.entity.Call;
import B107.server.meerkat.service.CallCheckService;
import B107.server.meerkat.service.CallService;
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

	private final CallService callService;
	private final CallCheckService callCheckService;

	@PostMapping("/regist")
	public ResponseEntity<ResponseDTO> registCall(@AuthenticationPrincipal PrincipalDetails principalDetails,
													@RequestBody Call call) {

		Long memberIdx = principalDetails.getMember().getIdx();

		// 첫 가입하고 나서 CallCheck의 member_idx 초기화 해주기
		if(!callCheckService.isCallCheck(memberIdx)) {
			// 요청 가능한 경우
			callCheckService.registCallCheck(memberIdx, true);
			String roomId = callService.registCall(memberIdx, call);
			// 요청 idx도 찾아서 보내주기
//			Long callIdx = callService.findIdxByRoomId(roomId);
			return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_CALL_REGISTER, roomId));
		}

		// 이미 등록 내역이 있는 경우
		return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.BAD_REQUEST, Msg.FAIL_CALL_REGISTER, "-1L"));

	}

	// 요청자 대기 페이지에서 2분 만료됨/ 5분 지났을때/ 둘 중 한명이 나갔을 때
	// 해당 방id 폐쇄하기
	// roomId 도 같이 들어와야겟구나



}
