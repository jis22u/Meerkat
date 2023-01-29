package B107.server.repository;

import B107.server.entity.ExpiredMarker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpiredMarkerRepository extends JpaRepository<ExpiredMarker, Long> {
}
