package B107.server.meerkat.repository;

import B107.server.meerkat.entity.Call;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CallRepository extends JpaRepository<Call, Long> {

}