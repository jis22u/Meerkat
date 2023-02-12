package B107.server.meerkat.dto.call;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.Generated;

/**
 * B107.server.meerkat.dto.call.QCallDistanceReqDTO is a Querydsl Projection type for CallDistanceReqDTO
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QCallDistanceReqDTO extends ConstructorExpression<CallDistanceReqDTO> {

    private static final long serialVersionUID = -2092185171L;

    public QCallDistanceReqDTO(com.querydsl.core.types.Expression<Double> lat, com.querydsl.core.types.Expression<Double> lng) {
        super(CallDistanceReqDTO.class, new Class<?>[]{double.class, double.class}, lat, lng);
    }

}

