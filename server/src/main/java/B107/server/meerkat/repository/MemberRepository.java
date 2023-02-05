package B107.server.meerkat.repository;

import B107.server.meerkat.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByMemberId(String memberId);

    boolean existsByMemberId(String memberId);

    @Query("update Member m set m.name = :name, m.email = :email, m.tel = :tel where m.idx= :idx")
    @Modifying(clearAutomatically = true)
    int updateMember(@Param("name") String name, @Param("email") String email, @Param("tel") String tel, @Param("idx") long idx);

}
