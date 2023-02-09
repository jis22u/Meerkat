package B107.server.meerkat.repository;

import B107.server.meerkat.entity.Marker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MarkerRepository extends JpaRepository<Marker, Long> {


	@Query("select m from Marker m where m.member.idx = :memberIdx and m.isExp = false")
	Marker findValidByMemberIdx(@Param("memberIdx") Long memberIdx);

}
