package B107.server.meerkat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCall is a Querydsl query type for Call
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCall extends EntityPathBase<Call> {

    private static final long serialVersionUID = 1248807425L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCall call = new QCall("call");

    public final B107.server.meerkat.config.utils.QBaseAtTime _super = new B107.server.meerkat.config.utils.QBaseAtTime(this);

    public final NumberPath<Integer> coin = createNumber("coin", Integer.class);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> idx = createNumber("idx", Long.class);

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final NumberPath<Double> lng = createNumber("lng", Double.class);

    public final StringPath location = createString("location");

    public final QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final StringPath roomId = createString("roomId");

    public QCall(String variable) {
        this(Call.class, forVariable(variable), INITS);
    }

    public QCall(Path<? extends Call> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCall(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCall(PathMetadata metadata, PathInits inits) {
        this(Call.class, metadata, inits);
    }

    public QCall(Class<? extends Call> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

