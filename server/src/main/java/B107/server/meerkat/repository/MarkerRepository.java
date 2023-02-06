package B107.server.meerkat.repository;

import B107.server.meerkat.entity.Marker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MarkerRepository extends JpaRepository<Marker, Long> {

	@Query("update Marker m set m.expDate = :expDate where m.idx = :idx")
	int updateMarker(@Param("expDate") String expDate, @Param("idx") Long idx);


}
