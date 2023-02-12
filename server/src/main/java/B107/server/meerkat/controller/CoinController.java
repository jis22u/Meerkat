package B107.server.meerkat.controller;

import B107.server.meerkat.config.security.auth.PrincipalDetails;
import B107.server.meerkat.config.utils.Msg;
import B107.server.meerkat.config.utils.ResponseDTO;
import B107.server.meerkat.entity.Coin;
import B107.server.meerkat.entity.Marker;
import B107.server.meerkat.service.CoinService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/coin")
@RequiredArgsConstructor
public class CoinController {

	private final CoinService coinService;

	@PutMapping("/charge")
	public ResponseEntity<ResponseDTO> registMarker(@AuthenticationPrincipal PrincipalDetails principalDetails,
													@RequestBody Coin coin) {
		Long memberIdx = principalDetails.getMember().getIdx();
		Integer coinN = coin.getCoin();
		coinService.chargeCoin(memberIdx, coinN);

		return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_COIN_CHARGE));
	}


}
