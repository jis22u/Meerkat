package B107.server.meerkat.dto.call;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * B107.server.meerkat.dto.call.QCallDistanceResDTO is a Querydsl Projection type for CallDistanceResDTO
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QCallDistanceResDTO extends ConstructorExpression<CallDistanceResDTO> {

    private static final long serialVersionUID = -2092125589L;

    public QCallDistanceResDTO(com.querydsl.core.types.Expression<Long> idx, com.querydsl.core.types.Expression<String> location, com.querydsl.core.types.Expression<Double> lat, com.querydsl.core.types.Expression<Double> lng, com.querydsl.core.types.Expression<java.time.LocalDateTime> expDate) {
        super(CallDistanceResDTO.class, new Class<?>[]{long.class, String.class, double.class, double.class, java.time.LocalDateTime.class}, idx, location, lat, lng, expDate);
    }

}

