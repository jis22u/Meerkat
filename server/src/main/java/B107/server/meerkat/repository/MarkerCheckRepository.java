package B107.server.meerkat.repository;

import B107.server.meerkat.entity.MarkerCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MarkerCheckRepository extends JpaRepository<MarkerCheck, Long> {

	@Query("select mc.mcCheck from MarkerCheck mc where mc.memberIdx = :memberIdx")
	boolean findMcCheckById(@Param("memberIdx") Long memberIdx);


}
