package B107.server.meerkat.repository;

import B107.server.meerkat.entity.Call;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CallRepository extends JpaRepository<Call, Long> {

//	@Query("select c.idx from Call c where c.roomName like :roomName")
//	Long findIdxByRoomName(@Param("roomName") String roomName);
}