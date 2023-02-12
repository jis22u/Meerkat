package B107.server.meerkat.repository;

import B107.server.meerkat.entity.CallCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CallCheckRepository extends JpaRepository<CallCheck, Long> {

	@Query("select cc.ccCheck from CallCheck cc where cc.memberIdx = :memberIdx")
	boolean findCcCheckById(@Param("memberIdx") Long memberIdx);

	@Query("select cc from CallCheck cc where cc.memberIdx = :memberIdx")
	CallCheck findCallChkById(@Param("memberIdx") Long memberIdx);
}
