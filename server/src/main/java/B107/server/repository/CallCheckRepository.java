package B107.server.repository;

import B107.server.entity.CallCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CallCheckRepository extends JpaRepository<CallCheck, Long> {
}
