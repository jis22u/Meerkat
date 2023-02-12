package B107.server.meerkat.repository;

import B107.server.meerkat.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DealRepository extends JpaRepository<Deal, Long> {

	@Query("select d from Deal d where d.call.idx = :callIdx")
	Deal findDealByCallIdx(@Param("callIdx") Long callIdx);
}
