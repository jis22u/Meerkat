package B107.server.repository;

import B107.server.entity.MarkerCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkerCheckRepository extends JpaRepository<MarkerCheck, Long> {

}
