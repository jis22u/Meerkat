package B107.server.meerkat.repository.querydsl;

import B107.server.meerkat.entity.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static B107.server.meerkat.entity.QMember.member;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Member> findMyProfile(long idx) {
        return jpaQueryFactory
                .select(member).from(member)
                .where(member.idx.eq(idx))
                .fetch();
    }
}
