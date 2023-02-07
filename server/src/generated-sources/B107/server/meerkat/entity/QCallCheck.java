package B107.server.meerkat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QCallCheck is a Querydsl query type for CallCheck
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCallCheck extends EntityPathBase<CallCheck> {

    private static final long serialVersionUID = 790938503L;

    public static final QCallCheck callCheck = new QCallCheck("callCheck");

    public final BooleanPath ccCheck = createBoolean("ccCheck");

    public final StringPath memberId = createString("memberId");

    public QCallCheck(String variable) {
        super(CallCheck.class, forVariable(variable));
    }

    public QCallCheck(Path<? extends CallCheck> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCallCheck(PathMetadata metadata) {
        super(CallCheck.class, metadata);
    }

}

