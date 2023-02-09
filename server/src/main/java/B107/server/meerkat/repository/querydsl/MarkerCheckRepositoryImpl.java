package B107.server.meerkat.repository.querydsl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static B107.server.meerkat.entity.QMarkerCheck.markerCheck;

@Repository
@RequiredArgsConstructor
public class MarkerCheckRepositoryImpl {
	private final JPAQueryFactory jpaQueryFactory;

//	public List<Boolean> findMcCheck(Long memberIdx) {
//		return jpaQueryFactory
//				.select(markerCheck.mcCheck).from(markerCheck)
//				.where(markerCheck.memberIdx.eq(memberIdx))
//				.fetch();
//	}
}
