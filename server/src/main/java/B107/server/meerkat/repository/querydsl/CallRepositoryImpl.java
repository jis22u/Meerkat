//package B107.server.meerkat.repository.querydsl;
//
//import B107.server.meerkat.dto.call.CallDistanceResDTO;
//import B107.server.meerkat.dto.call.QCallDistanceResDTO;
//import com.querydsl.core.types.Expression;
//import com.querydsl.core.types.dsl.DateTimeExpression;
//import com.querydsl.core.types.dsl.Expressions;
//import com.querydsl.core.types.dsl.MathExpressions;
//import com.querydsl.core.types.dsl.NumberExpression;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Repository;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import static B107.server.meerkat.entity.QMarker.marker;
//
//@Repository
//@RequiredArgsConstructor
//public class CallRepositoryImpl {
//    private final JPAQueryFactory jpaQueryFactory;
//
//    public List<CallDistanceResDTO> findValidMarkers(Double lat, Double lng) {
//
//        Expression<Double> eLat = Expressions.constant(lat);
//        Expression<Double> eLng = Expressions.constant(lng);
//        Expression<Double> mLat = marker.lat;
//        Expression<Double> mLng = marker.lng;
//        Expression<Double> cons = Expressions.constant((double) 6371);
//
//        NumberExpression<Double> distance =
//                MathExpressions.max(cons, cons).multiply(MathExpressions.acos(
//                        MathExpressions.cos(MathExpressions.radians(eLat))
//                                .multiply(MathExpressions.cos(MathExpressions.radians(mLat)))
//                                .multiply(MathExpressions.cos(MathExpressions.radians(mLng).subtract(MathExpressions.radians(eLng))))
//                                .add(MathExpressions.sin(MathExpressions.radians(eLat)).multiply(MathExpressions.sin(MathExpressions.radians(mLat))))
//                ));
//
//        return jpaQueryFactory
//                .select(new QCallDistanceResDTO(
//                        marker.idx,
//                        marker.location,
//                        distance,
//                        marker.expDate
//                ))
//                .from(marker)
//                .where(marker.expDate.goe(LocalDateTime.now()), distance.lt(0.5))
//                .orderBy(distance.asc())
//                .fetch();
//    }
//}