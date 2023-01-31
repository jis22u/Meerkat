package B107.server.meerkat.repository;

import B107.server.meerkat.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByMemberId(String memberId);
}
