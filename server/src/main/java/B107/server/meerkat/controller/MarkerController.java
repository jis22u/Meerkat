package B107.server.meerkat.controller;

import B107.server.meerkat.config.utils.Msg;
import B107.server.meerkat.config.utils.ResponseDTO;
import B107.server.meerkat.dto.marker.MarkerDTO;
import B107.server.meerkat.entity.Marker;
import B107.server.meerkat.entity.MarkerCheck;
import B107.server.meerkat.service.MarkerCheckService;
import B107.server.meerkat.service.MarkerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/marker")
@RequiredArgsConstructor
public class MarkerController {

	private final MarkerService markerService;
	private final MarkerCheckService markerCheckService;

	@PostMapping("/regist/{memberId}")
	public ResponseEntity<ResponseDTO> registMarker(@PathVariable("memberId") Long memberId,
										  @RequestBody Marker marker) {

		// 등록 가능한지 판단
		//   등록 가능한 경우
		//   일단 marker 엔티티로 받아서 바로
		markerService.registMarker(marker);
		// 등록된 마커 정보 넘겨줄지??
		return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.CREATED, Msg.SUCCESS_MARKER_REGISTER));

		// 이미 등록내역이 있는 경우
	}
	
	// 하나 조회하는 것
	@GetMapping("/{memberId}")
	public ResponseEntity<ResponseDTO> getMarker() {
		MarkerDTO marker = null;
		return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MARKER_UPDATE, marker));
	}

	@PutMapping("/update/{memberId}")
	public ResponseEntity<ResponseDTO> updateMarker () {
		return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MARKER_UPDATE));
	}



	@DeleteMapping("/delete/{memberId}")
	public ResponseEntity<ResponseDTO> deleteMarker() {
		return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_MARKER_DELETE));
	}
}
