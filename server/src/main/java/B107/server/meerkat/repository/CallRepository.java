package B107.server.meerkat.repository;

import B107.server.meerkat.dto.call.CallDistanceResDTO;
import B107.server.meerkat.entity.Call;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CallRepository extends JpaRepository<Call, Long> {

//    @Query("SELECT m.idx as idx, m.location as location, m.lat as lat, m.lng as lng, m.expDate as expDate, ((m.lat - :lat) * (m.lat - :lat) + (m.lng - :lng) * (m.lng - :lng)) AS distance FROM Marker m WHERE m.lat BETWEEN :minLat AND :maxLat AND m.lng BETWEEN :minLng AND :maxLng HAVING distance <= :range * :range ORDER BY 6")
//    List<CallDistanceResDTO> findValidMarkers(@Param("lat") Double lat, @Param("lng") Double lng, @Param("minLat") Double minLat, @Param("maxLat") Double maxLat, @Param("minLng") Double minLng, @Param("maxLng") Double maxLng, @Param("range") Double range);


//    @Query("SELECT m FROM Marker m WHERE m.lat BETWEEN :minLat AND :maxLat AND m.lng BETWEEN :minLng AND :maxLng")
//    List<CallDistanceResDTO> findValidMarkers(@Param("minLat") Double minLat, @Param("maxLat") Double maxLat, @Param("minLng") Double minLng, @Param("maxLng") Double maxLng);


//	@Query("select c.idx from Call c where c.roomId like :roomId")
//	Long findIdxByRoomId(@Param("roomId") String roomId);
}