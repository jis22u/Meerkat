package B107.server.meerkat.repository;

import B107.server.meerkat.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoomRepository extends JpaRepository<Room, Long> {

	/**
	 * roomName로 Room 객체 찾기
	 */
	@Query("select r from Room r where r.roomName like :roomName")
	Room findRoomByRoomName(@Param("roomName") String roomName);


	/**
	 * roomName로 room idx 객체 찾기
	 */
	@Query("select r.idx from Room r where r.roomName like :roomName")
	Long findIdxByRoomName(@Param("roomName") String roomName);

	/**
	 * roomIdx로 방상태 여부 조회
	 */
	@Query("select r.isValid from Room r where r.idx = :roomIdx")
	Boolean findValidByIdx(@Param("roomIdx") Long roomIdx);
}
