package B107.server.meerkat.controller;

import B107.server.meerkat.config.security.auth.PrincipalDetails;
import B107.server.meerkat.config.utils.Msg;
import B107.server.meerkat.config.utils.ResponseDTO;
import B107.server.meerkat.entity.Coin;
import B107.server.meerkat.entity.Marker;
import B107.server.meerkat.service.CoinService;
import B107.server.meerkat.service.DepositService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/coin")
@RequiredArgsConstructor
public class CoinController {

	private final CoinService coinService;
	private final DepositService depositService;

	@GetMapping("/")
	public ResponseEntity<ResponseDTO> getCoin(@AuthenticationPrincipal PrincipalDetails principalDetails) {
		Long memberIdx = principalDetails.getMember().getIdx();
		Integer coin = coinService.findCoinById(memberIdx).getCoin();

		return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_COIN_READ, coin));
	}

	@PutMapping("/charge")
	public ResponseEntity<ResponseDTO> chargeCoin(@AuthenticationPrincipal PrincipalDetails principalDetails,
													@RequestBody Coin coin) {
		Long memberIdx = principalDetails.getMember().getIdx();
		Coin memCoin = coinService.findCoinById(memberIdx);
		Integer ori = memCoin.getCoin();
		Integer charge = coin.getCoin();
		coinService.updateCoin(memberIdx, ori+charge);

		// 입출금내역 저장
		depositService.coinDeposit(memberIdx, ori, charge, 1);

		return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_COIN_CHARGE));
	}

	@PutMapping("/exchange")
	public ResponseEntity<ResponseDTO> exchangeCoin(@AuthenticationPrincipal PrincipalDetails principalDetails,
												  @RequestBody Coin coin) {
		Long memberIdx = principalDetails.getMember().getIdx();
		Coin memCoin = coinService.findCoinById(memberIdx);
		Integer ori = memCoin.getCoin();
		Integer exchange = coin.getCoin();
		coinService.updateCoin(memberIdx, ori-exchange);

		// 입출금내역 저장
		depositService.coinDeposit(memberIdx, ori, exchange, 2);

		return ResponseEntity.ok().body(ResponseDTO.of(HttpStatus.OK, Msg.SUCCESS_COIN_EXCHANGE));
	}

}
