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
	public void updateCoin(Long memIdx, Integer coin) {
		Coin memCoin = coinRepository.findCoinById(memIdx);
		memCoin.setCoin(coin);
		coinRepository.save(memCoin);
	}

	@Transactional
	public Coin findCoinById(Long memIdx) {
		return coinRepository.findCoinById(memIdx);
	}
}
