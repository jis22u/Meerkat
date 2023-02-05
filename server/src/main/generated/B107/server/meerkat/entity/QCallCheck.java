package B107.server.meerkat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCallCheck is a Querydsl query type for CallCheck
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCallCheck extends EntityPathBase<CallCheck> {

    private static final long serialVersionUID = 790938503L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCallCheck callCheck = new QCallCheck("callCheck");

    public final B107.server.meerkat.config.utils.QBaseAtTime _super = new B107.server.meerkat.config.utils.QBaseAtTime(this);

    public final BooleanPath ccCheck = createBoolean("ccCheck");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> idx = createNumber("idx", Long.class);

    public final QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public QCallCheck(String variable) {
        this(CallCheck.class, forVariable(variable), INITS);
    }

    public QCallCheck(Path<? extends CallCheck> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCallCheck(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCallCheck(PathMetadata metadata, PathInits inits) {
        this(CallCheck.class, metadata, inits);
    }

    public QCallCheck(Class<? extends CallCheck> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

