package B107.server.meerkat.repository;

import B107.server.meerkat.entity.ExpiredMarker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpiredMarkerRepository extends JpaRepository<ExpiredMarker, Long> {
}
