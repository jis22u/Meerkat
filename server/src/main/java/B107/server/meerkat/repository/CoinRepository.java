package B107.server.meerkat.repository;

import B107.server.meerkat.entity.Coin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CoinRepository extends JpaRepository<Coin, Long> {

	@Query("select c from Coin c where c.memberIdx = :memberIdx")
	Coin findCoinById(@Param("memberIdx") Long memberIdx);

}
