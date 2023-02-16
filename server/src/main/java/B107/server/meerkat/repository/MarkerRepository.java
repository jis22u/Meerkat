package B107.server.meerkat.repository;

import B107.server.meerkat.dto.marker.MarkerDTO;
import B107.server.meerkat.entity.Marker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MarkerRepository extends JpaRepository<Marker, Long> {

	@Query("SELECT m.member.idx " +
			"FROM Marker m " +
			"WHERE (m.lat - :lat) * (m.lat - :lat) + (m.lng - :lng) * (m.lng - :lng) <= :range * :range " +
			"AND (m.member.idx <> :idx OR m.member.idx IS NULL)")
	List<Long> findValidMarkers(@Param("lat") Double lat, @Param("lng") Double lng, @Param("range") Double range, @Param("idx") Long idx);

	@Query("select m from Marker m where m.member.idx = :memberIdx and m.isExp = false")
	Marker findValidByMemberIdx(@Param("memberIdx") Long memberIdx);

	@Query("SELECT new B107.server.meerkat.dto.marker.MarkerDTO(m.lat, m.lng, m.location, m.regDate, m.expDate) " +
			"FROM Marker m " +
			"WHERE m.expDate >= CURRENT_TIMESTAMP ")
	List<MarkerDTO> findValidAllMarkers();
}
