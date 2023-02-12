package B107.server.meerkat.service;

import B107.server.meerkat.entity.Coin;
import B107.server.meerkat.repository.CoinRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CoinService {

	private final CoinRepository coinRepository;

	@Transactional
	public void chargeCoin(Long memberIdx, Integer coinN) {
		Coin coin = coinRepository.findCoinById(memberIdx);
		coin.setCoin(coinN);
		coinRepository.save(coin);
	}
}
