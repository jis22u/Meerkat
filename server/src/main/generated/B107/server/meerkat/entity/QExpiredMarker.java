package B107.server.meerkat.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QExpiredMarker is a Querydsl query type for ExpiredMarker
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QExpiredMarker extends EntityPathBase<ExpiredMarker> {

    private static final long serialVersionUID = 1800441724L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QExpiredMarker expiredMarker = new QExpiredMarker("expiredMarker");

    public final B107.server.meerkat.config.utils.QBaseAtTime _super = new B107.server.meerkat.config.utils.QBaseAtTime(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final DateTimePath<java.time.LocalDateTime> expDate = createDateTime("expDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> idx = createNumber("idx", Long.class);

    public final NumberPath<Float> lat = createNumber("lat", Float.class);

    public final NumberPath<Float> lng = createNumber("lng", Float.class);

    public final StringPath location = createString("location");

    public final QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final DateTimePath<java.time.LocalDateTime> regDate = createDateTime("regDate", java.time.LocalDateTime.class);

    public QExpiredMarker(String variable) {
        this(ExpiredMarker.class, forVariable(variable), INITS);
    }

    public QExpiredMarker(Path<? extends ExpiredMarker> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QExpiredMarker(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QExpiredMarker(PathMetadata metadata, PathInits inits) {
        this(ExpiredMarker.class, metadata, inits);
    }

    public QExpiredMarker(Class<? extends ExpiredMarker> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

